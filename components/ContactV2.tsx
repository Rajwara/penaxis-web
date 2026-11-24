"use client";

import { FormEvent, useState } from "react";
import { contact, offices } from "@/lib/data";
import { submitForm } from "@/lib/submitForm";
import OfficeLocator from "@/components/contact-v2/OfficeLocator";
import ContactBanner from "@/components/contact-v2/ContactBanner";
// Same fonts as the supplied template (self-hosted, used only here).
import "@fontsource-variable/manrope/index.css";
import "@fontsource-variable/sora/index.css";

// Main contact page content (/contact-us; first built at /contact-v2), ported from a client-supplied contact page template:
// a photo banner (ContactBanner), a "get in touch" section with contact info
// and a form card, and an office locator map (components/contact-v2). Colours, sizes and spacing follow
// the template. The form posts to the site's /api/contact endpoint.

const SOCIALS = [
  {
    label: "LinkedIn",
    href: `https://www.linkedin.com${contact.linkedin}`,
    viewBox: "0 0 448 512",
    d: "M100 448H7V149h93zM54 108C24 108 0 83 0 53a54 54 0 01108 0c0 30-24 55-54 55zm394 340h-93V302c0-35-1-79-48-79-48 0-56 37-56 77v148h-93V149h89v41h1c13-24 43-48 88-48 94 0 112 62 112 142v164z",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/share/1F47cKGB3T/?mibextid=wwXIfr",
    viewBox: "0 0 320 512",
    d: "M279 288l14-93h-89v-60c0-25 12-50 52-50h40V6S260 0 225 0c-73 0-121 44-121 125v70H23v93h81v224h100V288z",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/penaxis.official?igsh=djg4MWdsaHNiNHdi",
    viewBox: "0 0 448 512",
    d: "M224 141c-63.6 0-115 51.4-115 115s51.4 115 115 115 115-51.4 115-115-51.4-115-115-115zm0 190c-41.1 0-75-33.6-75-75s33.6-75 75-75 75 33.6 75 75-33.9 75-75 75zm146.4-194.7c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1S2.3 125.5.5 161.4c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z",
  },
  {
    label: "YouTube",
    href: "https://youtube.com/@penaxis",
    viewBox: "0 0 576 512",
    d: "M550 124c-6-24-25-42-49-49C458 64 288 64 288 64S118 64 75 75c-24 7-43 25-49 49C14 167 14 256 14 256s0 89 12 132c6 24 25 41 49 48 43 12 213 12 213 12s170 0 213-12c24-7 43-24 49-48 12-43 12-132 12-132s0-89-12-132zM232 338V174l142 82z",
  },
];


type Status = "idle" | "sending" | "sent" | "error";

export default function ContactV2() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "", company_website: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const update = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setError("");
    try {
      await submitForm("Contact page", {
        name: form.name.trim(),
        email: form.email.trim(),
        subject: form.subject.trim(),
        message: form.message.trim(),
        company_website: form.company_website,
      });
      setForm({ name: "", email: "", subject: "", message: "", company_website: "" });
      setStatus("sent");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setStatus("error");
    }
  };

  const tel = (n: string) => `tel:${n.replace(/[^+\d]/g, "")}`;

  return (
    <div className="cv2">
      {/* faint vertical grid lines in background */}
      <div className="cv2-grid-lines" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      {/* Banner (ported from the supplied contact banner) */}
      <ContactBanner />

      {/* Contact section */}
      <section className="cv2-contact">
        <div className="cv2-container cv2-contact-grid">
          <div className="cv2-left">
            <div className="cv2-subtitle">/ get in touch /</div>
            <h2>We are always ready to help you and answer your questions</h2>
            <p className="cv2-lead">
              Have a project in mind or a question about our services? Reach out and our team will get
              back to you within one business day.
            </p>

            <div className="cv2-info-grid">
              <div>
                <h6>Call Us</h6>
                <p>
                  <a href={tel(contact.phone)}>{contact.phone}</a>
                </p>
              </div>
              <div>
                <h6>Email</h6>
                <p>
                  <a href={`mailto:${contact.email}`}>{contact.email}</a>
                </p>
              </div>
              {offices.map((o) => (
                <div key={o.city}>
                  <h6>{o.city} Office</h6>
                  <p>{o.address}</p>
                </div>
              ))}
              <div>
                <h6>Social network</h6>
                <div className="cv2-socials">
                  {SOCIALS.map((s) => (
                    <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
                      <svg viewBox={s.viewBox} aria-hidden="true">
                        <path d={s.d} />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="cv2-form-card" id="contact-form">
            <h3>Get in Touch</h3>
            <p className="cv2-lead">Tell us about your goals and we&apos;ll show you how we can help your business grow.</p>
            <form onSubmit={onSubmit}>
              <div className="cv2-field">
                <label htmlFor="cv2-name">Full Name *</label>
                <input id="cv2-name" type="text" placeholder="Full name" required maxLength={256} value={form.name} onChange={update("name")} />
              </div>
              <div className="cv2-field">
                <label htmlFor="cv2-email">Email *</label>
                <input id="cv2-email" type="email" placeholder="Email" required maxLength={256} value={form.email} onChange={update("email")} />
              </div>
              <div className="cv2-field">
                <label htmlFor="cv2-subject">Subject</label>
                <input id="cv2-subject" type="text" placeholder="Subject" maxLength={256} value={form.subject} onChange={update("subject")} />
              </div>
              <div className="cv2-field">
                <label htmlFor="cv2-message">Message</label>
                <textarea id="cv2-message" placeholder="Message" maxLength={5000} value={form.message} onChange={update("message")} />
              </div>
              {/* Honeypot — hidden from people, filled by bots */}
              <input className="cv2-hp" type="text" name="company_website" tabIndex={-1} autoComplete="off" aria-hidden="true" value={form.company_website} onChange={update("company_website")} />
              <button type="submit" className="cv2-btn-dark" disabled={status === "sending"}>
                <span className="cv2-arrow">&gt;</span> {status === "sending" ? "Sending…" : "Send a message"}
              </button>
              {status === "sent" && <p className="cv2-form-msg" role="status">Thanks! Your message has been sent.</p>}
              {status === "error" && <p className="cv2-form-msg is-error" role="alert">{error}</p>}
            </form>
          </div>
        </div>
      </section>

      {/* Office locator map (replaces the old embedded Google map) */}
      <div className="cv2-locator">
        <OfficeLocator />
      </div>
    </div>
  );
}
