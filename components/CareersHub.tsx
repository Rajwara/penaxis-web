"use client";

import { useRef, useState } from "react";
import Reveal from "./Reveal";
import { careers, contact } from "@/lib/data";
import { submitForm } from "@/lib/submitForm";

// /careers page: a banner, a list of open roles (rows that open in place) (condensed from the team's
// real LinkedIn postings — see lib/data.ts) each expandable for the full
// requirements list, and a single shared application form below with a
// role dropdown + resume upload. Submits via the same /api/contact
// endpoint used site-wide, tagged with formType "careers" so the server
// routes the email to hr@penaxis.com instead of the general inbox.

const MAX_FILE_BYTES = 3 * 1024 * 1024; // 3MB
const ACCEPTED_TYPES = ".pdf,.doc,.docx";

function formatFileSize(bytes: number) {
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)}KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
}

export default function CareersHub() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", role: "", message: "" });
  const [resume, setResume] = useState<File | null>(null);
  const [fileError, setFileError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const [openRole, setOpenRole] = useState<string | null>(null);

  const applyFor = (title: string) => {
    setForm((f) => ({ ...f, role: title }));
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleFileSelected = (selected: FileList | null) => {
    if (!selected || selected.length === 0) return;
    const file = selected[0];
    if (file.size > MAX_FILE_BYTES) {
      setFileError(`"${file.name}" is over the 3MB limit.`);
      return;
    }
    setFileError("");
    setResume(file);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!resume) {
      setError("Please attach your resume.");
      setStatus("error");
      return;
    }
    setSubmitting(true);
    try {
      await submitForm("Careers page", form, [resume], "careers");
      setStatus("success");
      setForm({ name: "", email: "", phone: "", role: "", message: "" });
      setResume(null);
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <section className="car-banner">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <span className="car-eyebrow">Careers</span>
            <h2 className="car-heading">Help us build what&apos;s next</h2>
            <p className="car-intro">
              We&apos;re a small, hands-on team across Pakistan, the UAE, and beyond - building
              AI-powered products, software, and growth systems for real clients. Here&apos;s
              what we&apos;re hiring for right now.
            </p>
          </Reveal>
        </div>
      </section>

      <section id="open-roles" className="car-roles car-roles--list" aria-labelledby="car-roles-title">
        <div className="car-roles-inner" data-nav-theme="dark">
          <div className="car-roles-head">
            <div>
              <span className="car-roles-pill">Open roles</span>
              <h2 id="car-roles-title" className="car-roles-title">Open roles</h2>
            </div>
            <p className="car-roles-note">
              These are the roles we&apos;re hiring for right now. Open a role to see the full
              requirements, then apply with the form below.
            </p>
          </div>

          <ul className="car-list">
            {careers.map((role) => {
              const isOpen = openRole === role.slug;
              const kind = role.type.split(" - ")[0];
              return (
                <li key={role.slug} className={`car-row${isOpen ? " is-open" : ""}`}>
                  <button
                    type="button"
                    className="car-row-head"
                    onClick={() => setOpenRole(isOpen ? null : role.slug)}
                    aria-expanded={isOpen}
                    aria-controls={`role-${role.slug}`}
                  >
                    <span className="car-row-text">
                      <span className="car-row-title">{role.title}</span>
                      <span className="car-row-meta">
                        {role.location} &middot; {kind} &middot; {role.experience}
                      </span>
                    </span>
                    <span className="car-row-cta">
                      {isOpen ? "Close" : "View role"}
                      <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M7 17 17 7M8 7h9v9" />
                      </svg>
                    </span>
                  </button>

                  {isOpen && (
                    <div className="car-row-body" id={`role-${role.slug}`}>
                      <p className="car-row-summary">{role.summary}</p>
                      <p className="car-row-type">{role.department} &middot; {role.type}</p>
                      <ul className="car-row-reqs">
                        {role.requirements.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                      {role.note && <p className="car-row-note">{role.note}</p>}
                      <button type="button" className="car-row-apply" onClick={() => applyFor(role.title)}>
                        Apply for this role
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
                          <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="car-form-section" ref={formRef}>
        <div className="mx-auto max-w-2xl px-6">
          <Reveal>
            <h2 className="section-heading car-form-heading">Apply now</h2>
            <p className="car-form-sub">
              Don&apos;t see the right fit? Apply anyway - tell us what you&apos;re looking for, or
              reach out directly at {contact.email}.
            </p>
          </Reveal>

          <Reveal delay={0.08} className="car-form-card">
            {status === "success" ? (
              <div className="rounded-2xl border border-emerald-600/20 bg-emerald-50 px-6 py-8 text-center">
                <p className="font-semibold text-emerald-800 mb-1">Thanks - application sent!</p>
                <p className="text-sm text-emerald-700/80">Our team will review it and get back to you.</p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="mt-4 text-sm font-medium text-violet-700 underline"
                >
                  Submit another application
                </button>
              </div>
            ) : (
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="border-b border-ink/10 pb-2">
                  <label className="text-xs font-semibold text-ink/70">Your Name</label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    className="block w-full mt-1 bg-transparent text-ink placeholder:text-ink/35 focus:outline-none"
                  />
                </div>
                <div className="border-b border-ink/10 pb-2">
                  <label className="text-xs font-semibold text-ink/70">Your Email</label>
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                    className="block w-full mt-1 bg-transparent text-ink placeholder:text-ink/35 focus:outline-none"
                  />
                </div>
                <div className="border-b border-ink/10 pb-2">
                  <label className="text-xs font-semibold text-ink/70">Your Phone</label>
                  <input
                    type="text"
                    placeholder="Enter your phone number"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="block w-full mt-1 bg-transparent text-ink placeholder:text-ink/35 focus:outline-none"
                  />
                </div>
                <div className="border-b border-ink/10 pb-2">
                  <label className="text-xs font-semibold text-ink/70">Role You&apos;re Applying For</label>
                  <select
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                    required
                    className="block w-full mt-1 bg-transparent text-ink focus:outline-none"
                  >
                    <option value="" disabled>
                      Select a role
                    </option>
                    {careers.map((role) => (
                      <option key={role.slug} value={role.title}>
                        {role.title}
                      </option>
                    ))}
                    <option value="General application">General application</option>
                  </select>
                </div>
                <div className="border-b border-ink/10 pb-2">
                  <label className="text-xs font-semibold text-ink/70">Anything else we should know?</label>
                  <textarea
                    rows={3}
                    placeholder="A short note, your portfolio/LinkedIn link, etc. (optional)"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="block w-full mt-1 bg-transparent text-ink placeholder:text-ink/35 focus:outline-none resize-none"
                  />
                </div>

                <div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept={ACCEPTED_TYPES}
                    onChange={(e) => handleFileSelected(e.target.files)}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-2 text-sm text-ink/60 hover:text-violet-700 transition-colors"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21.44 11.05l-9.19 9.19a5 5 0 0 1-7.07-7.07l9.19-9.19a3.5 3.5 0 0 1 4.95 4.95l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.49" />
                    </svg>
                    {resume ? "Change resume" : "Attach your resume"}
                    <span className="text-xs text-ink/35">(PDF or Word - max 3MB)</span>
                  </button>

                  {resume && (
                    <div className="mt-3 flex items-center justify-between gap-3 rounded-lg bg-ink/[0.04] px-3 py-2 text-sm">
                      <span className="truncate text-ink/75">
                        {resume.name} <span className="text-ink/40">({formatFileSize(resume.size)})</span>
                      </span>
                      <button
                        type="button"
                        onClick={() => setResume(null)}
                        aria-label={`Remove ${resume.name}`}
                        className="shrink-0 text-ink/40 hover:text-red-600 transition-colors"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                          <path d="M6 6l12 12M18 6L6 18" />
                        </svg>
                      </button>
                    </div>
                  )}

                  {fileError && <p className="mt-2 text-xs text-red-600">{fileError}</p>}
                </div>

                {status === "error" && (
                  <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-2.5">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-grad w-full py-4 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? "Submitting…" : "Submit Application"}
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </section>
    </>
  );
}
