"use client";

import Reveal from "./Reveal";
import { contact } from "@/lib/data";

// Footer layout matching a purchased template's structure (confirmed
// owned by the user): a full-bleed giant background wordmark with a
// centered gradient email pill overlapping it, five link columns
// (eyebrow + big title), a four-column social row with dividers, and
// a bottom bar with address/copyright/phone/back-to-top. Colors are
// Penaxis purple, in the homepage style (dark rounded panel, Big
// Shoulders uppercase headings, white pill button); link destinations are real site pages. All four social
// links (Facebook, Instagram, LinkedIn, YouTube) are confirmed real
// accounts.

const LINK_COLUMNS = [
  { eyebrow: "What we do?", title: "Services", href: "/services/ai-mvp" },
  { eyebrow: "Who we are?", title: "About Us", href: "/who-we-are" },
  { eyebrow: "How we deliver", title: "Contact Us", href: "/contact-us" },
  { eyebrow: "What we think", title: "Insights", href: "/blog" },
];

const OFFICES = [
  {
    city: "Lahore, Pakistan",
    address: "2nd floor, 3, DHA Block P Tip Block Rahbar, Lahore, Pakistan",
  },
  {
    city: "Dubai, United Arab Emirates",
    address: "Leaders Building - Office No. 1 - 409 Sheikh Zayed Rd - Al Qouz First - Al Quoz - Dubai - United Arab Emirates",
  },
];

const SOCIALS = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/share/1F47cKGB3T/?mibextid=wwXIfr",
    icon: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.91h-2.33V22c4.78-.79 8.44-4.94 8.44-9.94z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/penaxis.official?igsh=djg4MWdsaHNiNHdi",
    icon: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: `https://www.linkedin.com${contact.linkedin}`,
    icon: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://youtube.com/@penaxis",
    icon: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="5" width="20" height="14" rx="4" />
        <path d="M10 9.5v5l4.5-2.5z" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
];

function PinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2a7 7 0 0 0-7 7c0 5.25 6.14 11.6 6.4 11.86a.85.85 0 0 0 1.2 0C12.86 20.6 19 14.25 19 9a7 7 0 0 0-7-7z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer data-nav-theme="dark" className="ft">
      <div className="ft-panel">
        {/* Giant wordmark with the email pill centred over it */}
        <div className="ft-hero">
          <span className="ft-giant" aria-hidden="true">PENAXIS</span>
          <a href={`mailto:${contact.email}`} className="ft-email">
            <span>{contact.email}</span>
            <span className="ft-email-icon">
              <ArrowIcon />
            </span>
          </a>
        </div>

        {/* Link columns */}
        <div className="ft-cols">
          {LINK_COLUMNS.map((col, i) => (
            <Reveal as="div" key={col.title} delay={i * 0.08} y={0} x={-30}>
              <div className="ft-eyebrow">{col.eyebrow}</div>
              <a href={col.href} className="ft-col-title">
                {col.title}
              </a>
            </Reveal>
          ))}
        </div>

        {/* Social row */}
        <div className="ft-row">
          <div className="ft-socials">
            {SOCIALS.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="ft-social">
                <span className="ft-social-label">
                  <span className="ft-social-icon">{s.icon}</span>
                  {s.label}
                </span>
                <ArrowIcon />
              </a>
            ))}
          </div>
        </div>

        {/* Office locations */}
        <div className="ft-row">
          <div className="ft-offices">
            {OFFICES.map((office) => (
              <div key={office.city} className="ft-office">
                <span className="ft-pin">
                  <PinIcon />
                </span>
                <div>
                  <div className="ft-office-city">{office.city}</div>
                  <div className="ft-office-addr">{office.address}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="ft-row">
          <div className="ft-bottom">
            <span className="ft-legal">
              <a href="/policies/privacy">Privacy Policy</a>
              <span aria-hidden="true">|</span>
              <a href="/policies/terms">Terms &amp; Conditions</a>
            </span>
            <span>© {new Date().getFullYear()} Penaxis. All rights reserved.</span>
            <a href={`tel:${contact.phone.replace(/[^+\d]/g, "")}`} className="ft-phone">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.7a2 2 0 0 1-.4 2.1L8 9.9a16 16 0 0 0 6 6l1.4-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.5 2.7.6a2 2 0 0 1 1.8 2z" />
              </svg>
              {contact.phone}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
