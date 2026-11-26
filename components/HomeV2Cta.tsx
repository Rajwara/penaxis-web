"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { contact } from "@/lib/data";
import { submitForm } from "@/lib/submitForm";
import PillButton from "./PillButton";
// Same fonts as the supplied section (self-hosted, used only here).
import "@fontsource-variable/big-shoulders/opsz.css";
import "@fontsource-variable/wix-madefor-display/index.css";

// /home-v2 CTA banner. Ported from a client-supplied "Request a Quote"
// section (static HTML/CSS/JS): a big "request a quote" marquee, a red
// panel with a multiply-blended photo, a scroll-scrubbed letter reveal on
// the heading, contacts sliding in from the left and a glass form card
// from the right. Fonts, sizes, colours and timings match the supplied
// files. The form posts to the site's existing /api/contact endpoint, so
// submissions are emailed like every other form on the site.

const HEADING = "Let's work together.";
const SPREAD = 5;
const MARQUEE_SPEED = 55; // px per second (from the zip)
const MARQUEE_COPIES = 8; // ~9,000px of text: covers 2x even ultra-wide screens
const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));

type Status = "idle" | "sending" | "success" | "error";

export default function HomeV2Cta({ source = "Home v2 — Request a quote banner" }: { source?: string }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [slidIn, setSlidIn] = useState(false);
  const [jsReady, setJsReady] = useState(false);

  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "", company_website: "" });
  const [invalid, setInvalid] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [errorText, setErrorText] = useState("");

  useEffect(() => {
    setJsReady(true);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;

    // 1) Marquee — constant 55px/s to the left, seamless loop. Enough
    //    copies are rendered up front (see MARQUEE_COPIES) instead of
    //    cloning DOM nodes, so React re-renders never fight the marquee.
    const track = trackRef.current;
    if (track) {
      let x = 0;
      let last = performance.now();
      const loop = (now: number) => {
        const dt = Math.min(0.1, (now - last) / 1000);
        last = now;
        const step = (track.children[0] as HTMLElement).offsetWidth;
        if (!reduceMotion) {
          x -= MARQUEE_SPEED * dt;
          if (-x >= step) x += step;
        }
        track.style.transform = `translate3d(${x.toFixed(2)}px,0,0)`;
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    }

    // 2) Heading letter reveal, scrubbed with scroll.
    const heading = headingRef.current;
    const letters = Array.from(heading?.querySelectorAll<HTMLElement>(".hv2q-letter") ?? []);
    const scrub = () => {
      if (!heading || !letters.length) return;
      const vh = window.innerHeight;
      const p = clamp((vh - heading.getBoundingClientRect().top) / (vh * 0.6));
      const n = letters.length;
      letters.forEach((l, i) => {
        const lp = reduceMotion ? 1 : clamp((p * (n + SPREAD) - i) / SPREAD);
        l.style.opacity = (0.3 + 0.7 * lp).toFixed(3);
        l.style.transform = `translate3d(${(10 * (1 - lp)).toFixed(2)}px,0,0)`;
      });
    };
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        scrub();
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    scrub();

    // 3) Contacts slide in from the left, form card from the right.
    let io: IntersectionObserver | null = null;
    if (gridRef.current && "IntersectionObserver" in window) {
      io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            setSlidIn(true);
            io?.disconnect();
          }
        },
        { rootMargin: "0px 0px -25% 0px" }
      );
      io.observe(gridRef.current);
    } else {
      setSlidIn(true);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      io?.disconnect();
    };
  }, []);

  const update = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    setInvalid((v) => ({ ...v, [key]: false }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("idle");
    const bad = {
      name: form.name.trim() === "",
      email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()),
    };
    setInvalid(bad);
    if (bad.name || bad.email) return;

    setStatus("sending");
    try {
      await submitForm(source, {
        name: form.name.trim(),
        email: form.email.trim(),
        subject: form.subject.trim(),
        message: form.message.trim(),
        company_website: form.company_website,
      });
      setStatus("success");
    } catch (err) {
      setErrorText(err instanceof Error ? err.message : "");
      setStatus("error");
    }
  };

  const slide = (dir: "left" | "right") => `${jsReady ? `hv2q-slide is-${dir}` : ""}${slidIn ? " in-view" : ""}`;
  const telHref = `tel:${contact.phone.replace(/[^+\d]/g, "")}`;
  const btnLabel = status === "sending" ? "Please wait" : "Send a message";

  return (
    <div className="hv2q-root">
      {/* "Request a quote" marquee */}
      <div className="hv2q-marquee" aria-hidden="true">
        <div ref={trackRef} className="hv2q-track">
          {Array.from({ length: MARQUEE_COPIES }, (_, i) => (
            <div key={i} className="hv2q-values-text">request a quote</div>
          ))}
        </div>
      </div>

      {/* CTA section */}
      <section className="hv2q-wrap" data-nav-theme="dark" aria-labelledby="hv2q-title">
        <div className="hv2q-inner">
          <img className="hv2q-bg" src="/images/hero/lets-work-together.webp" alt="" />
          <div className="hv2q-overlay" />

          <div className="hv2q-container">
            <div ref={gridRef} className="hv2q-grid">
              {/* Left column */}
              <div className="hv2q-col">
                <h2 ref={headingRef} id="hv2q-title" className="hv2q-heading" aria-label={HEADING}>
                  {HEADING.split(" ").map((w, wi) => (
                    <span key={wi}>
                      {wi > 0 && " "}
                      <span className="hv2q-word" aria-hidden="true">
                        {[...w].map((ch, ci) => (
                          <span key={ci} className="hv2q-letter">{ch}</span>
                        ))}
                      </span>
                    </span>
                  ))}
                </h2>

                <div className="hv2q-contacts">
                  <div className={`hv2q-contact ${slide("left")}`}>
                    <div>
                      <div className="hv2q-text-s is-light">Call us</div>
                      <a href={telHref} className="hv2q-link">{contact.phone}</a>
                    </div>
                  </div>

                  <div className={`hv2q-contact ${slide("left")}`}>
                    <img className="hv2q-avatar" src="/images/team/adeel-aslam.webp" alt="" />
                    <div>
                      <div className="hv2q-text-s is-light">Email us</div>
                      <a href={`mailto:${contact.email}`} className="hv2q-link is-underline">{contact.email}</a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right column: form card */}
              <div className={`hv2q-form-card ${slide("right")}`}>
                <h3 className="hv2q-form-title">Ready to start your project?</h3>
                <p className="hv2q-text-s is-light">
                  Let&apos;s turn your ideas into products, systems and growth. Tell us what you&apos;re
                  building and we&apos;ll get back to you within one business day.
                </p>

                <div className="hv2q-form-wrap">
                  {status !== "success" ? (
                    <form className="hv2q-form" onSubmit={onSubmit} noValidate>
                      <label className="hv2q-label" htmlFor="hv2q-name">Name*</label>
                      <input className={`hv2q-input${invalid.name ? " is-invalid" : ""}`} id="hv2q-name" type="text" name="name" maxLength={256} placeholder="Name*" required value={form.name} onChange={update("name")} />

                      <label className="hv2q-label" htmlFor="hv2q-email">Email Address*</label>
                      <input className={`hv2q-input${invalid.email ? " is-invalid" : ""}`} id="hv2q-email" type="email" name="email" maxLength={256} placeholder="Email Address*" required value={form.email} onChange={update("email")} />

                      <label className="hv2q-label" htmlFor="hv2q-subject">Subject</label>
                      <input className="hv2q-input" id="hv2q-subject" type="text" name="subject" maxLength={256} placeholder="Subject" value={form.subject} onChange={update("subject")} />

                      <label className="hv2q-label" htmlFor="hv2q-message">Message</label>
                      <textarea className="hv2q-input is-textarea" id="hv2q-message" name="message" maxLength={5000} placeholder="Message" value={form.message} onChange={update("message")} />

                      {/* Honeypot — hidden from people, filled by bots */}
                      <input className="hv2q-hp" type="text" name="company_website" tabIndex={-1} autoComplete="off" aria-hidden="true" value={form.company_website} onChange={update("company_website")} />

                      <PillButton type="submit" label={btnLabel} variant="light" block disabled={status === "sending"} />
                    </form>
                  ) : (
                    <div className="hv2q-success" role="status">
                      <div className="hv2q-state">
                        <div className="hv2q-state-icon">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><path d="M7.5 12.5l3 3 6-6.5" /></svg>
                        </div>
                        <p className="hv2q-state-title">Thank you</p>
                        <p className="hv2q-state-text">Your request has been sent. We will get back to you within one business day.</p>
                      </div>
                    </div>
                  )}

                  {status === "error" && (
                    <div className="hv2q-message" role="alert">
                      <div className="hv2q-state-row">
                        <div className="hv2q-state-icon is-small">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><path d="M12 7v6M12 16.5v.5" /></svg>
                        </div>
                        <div>
                          <p className="hv2q-state-title is-small">Something went wrong</p>
                          <p className="hv2q-state-text">
                            {errorText || `We couldn't send your request. Please try again or email us at ${contact.email}.`}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
