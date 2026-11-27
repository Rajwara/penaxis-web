"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  COUNTRIES,
  ENGAGEMENTS,
  SERVICE_PRESELECT,
  type EngagementModel,
  type Step2Field,
} from "@/lib/engagementForms";
import "@fontsource-variable/big-shoulders/opsz.css";
import "@fontsource-variable/wix-madefor-display/index.css";

// One reusable 3-step enquiry form for the three engagement models
// (Project / Hourly / Team as a Service), from the engagement-forms spec,
// styled with the site's own design (Big Shoulders headings, Wix Madefor
// text, purple accent, pill buttons). Used inside the modal on /services and
// as the standalone /get-started/<model> pages. Submits to /api/contact
// (emailed to the Penaxis inbox), with the engagement model, every answer,
// the source page and any UTM parameters. Answers persist for the session
// when moving between steps or closing and reopening.

type Details = { name: string; company: string; email: string; phone: string; website: string; country: string; discovery: boolean };
type Saved = { step: number; picked: string[]; values: Record<string, string>; details: Details };

const EMPTY_DETAILS: Details = { name: "", company: "", email: "", phone: "", website: "", country: "", discovery: false };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^\+?[\d\s()-]{7,20}$/;
const URL_RE = /^(https?:\/\/)?([\w-]+\.)+[a-z]{2,}(\/\S*)?$/i;
const MAX_FILE = 3 * 1024 * 1024;
const FILE_TYPES = ".pdf,.doc,.docx,.png,.jpg,.jpeg,.webp";

function Check() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path d="M3.5 8.4l3 3 6-6.6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function Arrow() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

export default function EngagementForm({
  model,
  variant = "page",
  onClose,
}: {
  model: EngagementModel;
  variant?: "modal" | "page";
  onClose?: () => void;
}) {
  const cfg = ENGAGEMENTS[model];
  const key = `penaxis-engagement-${model}`;
  const [step, setStep] = useState(0); // 0,1,2 = steps; 3 = success
  const [picked, setPicked] = useState<string[]>([]);
  const [values, setValues] = useState<Record<string, string>>(() =>
    Object.fromEntries(cfg.step2.fields.filter((f) => f.kind === "radio" && f.defaultValue).map((f) => [f.name, (f as { defaultValue: string }).defaultValue]))
  );
  const [details, setDetails] = useState<Details>(EMPTY_DETAILS);
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [serverError, setServerError] = useState("");
  const [honey, setHoney] = useState("");
  const loaded = useRef(false);
  const topRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  // Restore in-session answers, then apply ?service= preselection if nothing was picked yet.
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(key);
      if (raw) {
        const s: Saved = JSON.parse(raw);
        setStep(Math.min(s.step ?? 0, 2));
        setPicked(s.picked ?? []);
        setValues((v) => ({ ...v, ...(s.values ?? {}) }));
        setDetails({ ...EMPTY_DETAILS, ...(s.details ?? {}) });
        loaded.current = true;
        return;
      }
    } catch {}
    const svc = new URLSearchParams(window.location.search).get("service");
    const pre = svc ? SERVICE_PRESELECT[model][svc] : undefined;
    if (pre) setPicked([pre]);
    loaded.current = true;
  }, [key, model]);

  useEffect(() => {
    if (!loaded.current || step === 3) return;
    try {
      sessionStorage.setItem(key, JSON.stringify({ step, picked, values, details } satisfies Saved));
    } catch {}
  }, [key, step, picked, values, details]);

  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);

  const go = (n: number) => {
    setErrors({});
    setStep(n);
    topRef.current?.scrollIntoView({ block: "start" });
  };

  const toggle = (label: string) => {
    setPicked((p) => (p.includes(label) ? p.filter((x) => x !== label) : [...p, label]));
    setErrors({});
  };

  const validateStep = (s: number) => {
    const e: Record<string, string> = {};
    if (s === 0 && picked.length === 0) e.picked = "Please choose at least one option.";
    if (s === 1 && file && file.size > MAX_FILE) e.file = "That file is larger than 3MB. Please attach a smaller file.";
    if (s === 2) {
      if (!details.name.trim()) e.name = "Please enter your full name.";
      if (!details.company.trim()) e.company = "Please enter your company name.";
      if (!EMAIL_RE.test(details.email.trim())) e.email = "Please enter a valid work email.";
      if (details.phone.trim() && !PHONE_RE.test(details.phone.trim())) e.phone = "Please enter a valid phone number, e.g. +971 50 000 0000.";
      if (details.website.trim() && !URL_RE.test(details.website.trim())) e.website = "Please enter a valid website, e.g. https://yourcompany.com.";
      if (!COUNTRIES.includes(details.country)) e.country = "Please choose your country from the list.";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (validateStep(step)) go(step + 1);
  };

  const submit = async () => {
    if (sending || !validateStep(2)) return;
    setSending(true);
    setServerError("");
    let origin = window.location.href;
    try {
      if (variant === "modal") origin = sessionStorage.getItem("penaxis-engagement-origin") || origin;
    } catch {}
    const originUrl = new URL(origin);
    const params = new URLSearchParams([...new URLSearchParams(originUrl.search), ...new URLSearchParams(window.location.search)]);
    const utm = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"]
      .filter((k) => params.get(k))
      .map((k) => `${k}=${params.get(k)}`)
      .join(", ");
    const fields: Record<string, string> = {
      "Engagement model": cfg.crumb,
      [cfg.steps[0]]: picked.join(", "),
      ...Object.fromEntries(cfg.step2.fields.filter((f) => f.kind !== "file").map((f) => [f.name, values[f.name] ?? ""])),
      name: details.name.trim(),
      Company: details.company.trim(),
      email: details.email.trim(),
      "Phone / WhatsApp": details.phone.trim(),
      "Company website": details.website.trim(),
      Country: details.country,
      ...(cfg.discoveryCallOption ? { "Prefers a discovery call": details.discovery ? "Yes" : "No" } : {}),
      "Source page": origin,
      Referrer: document.referrer,
      "UTM parameters": utm,
      company_website: honey, // honeypot (hidden field), checked server-side
    };
    const source = `Engagement enquiry — ${cfg.crumb}`;
    try {
      let res: Response;
      if (file) {
        const fd = new FormData();
        fd.append("source", source);
        fd.append("fields", JSON.stringify(fields));
        fd.append("attachments", file);
        res = await fetch("/api/contact", { method: "POST", body: fd });
      } else {
        res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ source, fields }) });
      }
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Something went wrong. Please try again.");
      try {
        sessionStorage.removeItem(key);
      } catch {}
      go(3);
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  };

  const setVal = (name: string, v: string) => setValues((s) => ({ ...s, [name]: v }));
  const setDet = <K extends keyof Details>(k: K, v: Details[K]) => {
    setDetails((d) => ({ ...d, [k]: v }));
    setErrors((e) => {
      const { [k]: _drop, ...rest } = e;
      return rest;
    });
  };

  const field = (f: Step2Field) => {
    const id = `ef-${model}-${f.name.replace(/\W+/g, "-").toLowerCase()}`;
    switch (f.kind) {
      case "radio":
        return (
          <fieldset key={f.name} className="ef-group">
            <legend className="ef-label">{f.label}</legend>
            <div className={`ef-radios cols-${f.cols ?? 1}`}>
              {f.options.map((o) => (
                <label key={o} className={`ef-radio${values[f.name] === o ? " is-on" : ""}`}>
                  <input type="radio" name={id} value={o} checked={values[f.name] === o} onChange={() => setVal(f.name, o)} />
                  <span className="ef-dot" aria-hidden="true" />
                  {o}
                </label>
              ))}
            </div>
          </fieldset>
        );
      case "select":
        return (
          <div key={f.name} className="ef-group">
            <label className="ef-label" htmlFor={id}>{f.label}</label>
            <select id={id} className="ef-input ef-select" value={values[f.name] ?? ""} onChange={(e) => setVal(f.name, e.target.value)}>
              <option value="">{f.placeholder}</option>
              {f.options.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
        );
      case "date":
        return (
          <div key={f.name} className="ef-group">
            <label className="ef-label" htmlFor={id}>{f.label} <span className="ef-opt">(optional)</span></label>
            <input id={id} type="date" min={today} className="ef-input" value={values[f.name] ?? ""} onChange={(e) => setVal(f.name, e.target.value)} />
          </div>
        );
      case "text":
        return (
          <div key={f.name} className="ef-group">
            <label className="ef-label" htmlFor={id}>{f.label}</label>
            <input id={id} type="text" className="ef-input" placeholder={f.placeholder} value={values[f.name] ?? ""} onChange={(e) => setVal(f.name, e.target.value)} />
          </div>
        );
      case "textarea":
        return (
          <div key={f.name} className={`ef-group${f.full ? " is-full" : ""}`}>
            <label className="ef-label" htmlFor={id}>{f.label}</label>
            <textarea id={id} rows={4} className="ef-input ef-textarea" placeholder={f.placeholder} value={values[f.name] ?? ""} onChange={(e) => setVal(f.name, e.target.value)} />
          </div>
        );
      case "file":
        return (
          <div key={f.name} className="ef-group is-full">
            <div className="ef-file">
              <div>
                <span className="ef-file-title">+ {f.label}</span>
                <span className="ef-file-hint">{f.hint}</span>
              </div>
              {file ? (
                <span className="ef-file-chosen">
                  {file.name}
                  <button type="button" onClick={() => { setFile(null); if (fileRef.current) fileRef.current.value = ""; }} aria-label={`Remove ${file.name}`}>×</button>
                </span>
              ) : (
                <button type="button" className="ef-btn is-ghost is-small" onClick={() => fileRef.current?.click()}>Browse files</button>
              )}
              <input ref={fileRef} type="file" accept={FILE_TYPES} hidden onChange={(e) => { setFile(e.target.files?.[0] ?? null); setErrors({}); }} />
            </div>
            {errors.file && <p className="ef-error" role="alert">{errors.file}</p>}
          </div>
        );
    }
  };

  const input = (k: keyof Omit<Details, "discovery">, label: string, opts: { required?: boolean; type?: string; placeholder: string; auto?: string }) => (
    <div className="ef-group">
      <label className="ef-label" htmlFor={`ef-${model}-${k}`}>
        {label}
        {opts.required && <span aria-hidden="true"> *</span>}
      </label>
      <input
        id={`ef-${model}-${k}`}
        type={opts.type ?? "text"}
        className={`ef-input${errors[k] ? " is-invalid" : ""}`}
        placeholder={opts.placeholder}
        autoComplete={opts.auto}
        required={opts.required}
        aria-invalid={!!errors[k]}
        aria-describedby={errors[k] ? `ef-${model}-${k}-err` : undefined}
        value={details[k]}
        onChange={(e) => setDet(k, e.target.value)}
      />
      {errors[k] && <p id={`ef-${model}-${k}-err`} className="ef-error">{errors[k]}</p>}
    </div>
  );

  return (
    <div ref={topRef} className={`ef ef--${variant}`}>
      <div className="ef-top">
        <p className="ef-crumb">Penaxis / {step === 3 ? "Enquiry received" : cfg.crumb}</p>
        {onClose && (
          <button type="button" className="ef-close" onClick={onClose} aria-label="Close">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
          </button>
        )}
      </div>

      {step === 3 ? (
        <div className="ef-success" role="status">
          <span className="ef-success-icon"><Check /></span>
          <h2 className="ef-title">Great things start with a conversation.</h2>
          <p className="ef-intro">We&apos;ve received your enquiry. Our team will review your requirements and get in touch to discuss the next steps.</p>
          <hr className="ef-rule" />
          <p className="ef-success-q">Want to get things moving sooner?</p>
          <a href="/contact-us" className="hv2-btn">
            <span className="hv2-btn-label">Book a discovery call</span>
            <span className="hv2-btn-icon"><Arrow /></span>
          </a>
          <p className="ef-success-note">Complimentary · 30 minutes · No obligation</p>
          {onClose ? (
            <button type="button" className="ef-textlink" onClick={onClose}>Return to services</button>
          ) : (
            <a href="/services" className="ef-textlink">Return to services</a>
          )}
        </div>
      ) : (
        <>
          <h2 className="ef-title">{cfg.title}</h2>
          <p className="ef-intro">{cfg.intro}</p>

          <ol className="ef-progress" aria-label="Progress">
            {cfg.steps.map((s, i) => (
              <li key={s} className={`${i <= step ? "is-done" : ""}${i === step ? " is-current" : ""}`} aria-current={i === step ? "step" : undefined}>
                <span>{String(i + 1).padStart(2, "0")}</span> {s}
              </li>
            ))}
          </ol>

          <div className="ef-body">
            {step === 0 && (
              <fieldset className="ef-group">
                <legend className="ef-q">{cfg.step1.question}</legend>
                <p className="ef-sub">Select all that apply.</p>
                <div className={`ef-choices${cfg.step1.rich ? " is-rich" : ""}`}>
                  {cfg.step1.choices.map((c) => {
                    const on = picked.includes(c.label);
                    return (
                      <label key={c.label} className={`ef-choice${on ? " is-on" : ""}`}>
                        <input type="checkbox" checked={on} onChange={() => toggle(c.label)} />
                        <span className="ef-box" aria-hidden="true">{on && <Check />}</span>
                        <span className="ef-choice-text">
                          <span className="ef-choice-label">{c.label}</span>
                          {c.hint && <span className="ef-choice-hint">{c.hint}</span>}
                        </span>
                      </label>
                    );
                  })}
                </div>
                {errors.picked && <p className="ef-error" role="alert">{errors.picked}</p>}
              </fieldset>
            )}

            {step === 1 && <div className={`ef-fields is-${cfg.step2.layout}`}>{cfg.step2.fields.map(field)}</div>}

            {step === 2 && (
              <>
                <p className="ef-q">Tell us a little about yourself.</p>
                <p className="ef-sub">We&apos;ll use these details to get back to you about your enquiry.</p>
                <div className="ef-fields is-grid">
                  {input("name", "Full name", { required: true, placeholder: "e.g. Alex Morgan", auto: "name" })}
                  {input("company", "Company name", { required: true, placeholder: "e.g. Acme Ltd", auto: "organization" })}
                  {input("email", "Work email", { required: true, type: "email", placeholder: "name@company.com", auto: "email" })}
                  {input("phone", "Phone / WhatsApp", { type: "tel", placeholder: "+971 50 000 0000", auto: "tel" })}
                  {input("website", "Company website", { type: "url", placeholder: "https://yourcompany.com", auto: "url" })}
                  <div className="ef-group">
                    <label className="ef-label" htmlFor={`ef-${model}-country`}>Country<span aria-hidden="true"> *</span></label>
                    <input
                      id={`ef-${model}-country`}
                      list={`ef-${model}-countries`}
                      className={`ef-input ef-select${errors.country ? " is-invalid" : ""}`}
                      placeholder="Start typing your country"
                      autoComplete="country-name"
                      aria-invalid={!!errors.country}
                      value={details.country}
                      onChange={(e) => setDet("country", e.target.value)}
                    />
                    <datalist id={`ef-${model}-countries`}>
                      {COUNTRIES.map((c) => <option key={c} value={c} />)}
                    </datalist>
                    {errors.country && <p className="ef-error">{errors.country}</p>}
                  </div>
                </div>
                {cfg.discoveryCallOption && (
                  <label className="ef-check">
                    <input type="checkbox" checked={details.discovery} onChange={(e) => setDet("discovery", e.target.checked)} />
                    <span className="ef-box" aria-hidden="true">{details.discovery && <Check />}</span>
                    I&apos;d prefer an introductory discovery call.
                  </label>
                )}
                <input className="ef-honey" tabIndex={-1} autoComplete="off" aria-hidden="true" value={honey} onChange={(e) => setHoney(e.target.value)} />
                <p className="ef-note">* Required fields. Your information is only used to respond to your enquiry.</p>
                {serverError && <p className="ef-error is-server" role="alert">{serverError}</p>}
              </>
            )}
          </div>

          <div className="ef-foot">
            {step === 0 ? (
              <span className="ef-stepnote">Step 1 of 3</span>
            ) : (
              <button type="button" className="ef-btn is-ghost" onClick={() => go(step - 1)} disabled={sending}>Back</button>
            )}
            {step < 2 ? (
              <button type="button" className="hv2-btn" onClick={next}>
                <span className="hv2-btn-label">Continue</span>
                <span className="hv2-btn-icon"><Arrow /></span>
              </button>
            ) : (
              <button type="button" className="hv2-btn" onClick={submit} disabled={sending} aria-busy={sending}>
                <span className="hv2-btn-label">{sending ? "Sending…" : cfg.submitLabel}</span>
                <span className="hv2-btn-icon"><Arrow /></span>
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
