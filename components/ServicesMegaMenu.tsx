"use client";

import { services } from "@/lib/data";
import MegaShell from "./MegaShell";
import { SERVICE_MENU_TEXT, SERVICE_TAGS } from "@/lib/serviceTags";

// Services mega menu: shared MegaShell layout (black intro panel + white
// area) with Penaxis's 4 services as cards: icon + title (links to the
// service), one line of text and sub-service tags (pill links).

const ICONS: Record<string, JSX.Element> = {
  "ai-mvp": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 2a5 5 0 0 0-5 5c0 1.8.9 3 1.5 4.2C9 12.6 9 13 9 14v2h6v-2c0-1 0-1.4.5-2.8.6-1.2 1.5-2.4 1.5-4.2a5 5 0 0 0-5-5z" />
      <path d="M9 19h6M10 22h4" />
    </svg>
  ),
  "digital-transformation": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M21 12a9 9 0 1 1-2.6-6.4M21 3v5h-5" />
    </svg>
  ),
  "sales-growth": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M3 17l6-6 4 4 8-8M21 7v6" />
    </svg>
  ),
  "web-crm-software": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="4" width="18" height="14" rx="2" />
      <path d="M3 9h18M8 21h8" />
    </svg>
  ),
};

export default function ServicesMegaMenu() {
  return (
    <MegaShell
      eyebrow="Services"
      title="Build, transform & grow"
      text="From first build to ongoing growth: AI products, digital transformation, software and sales support."
      cta={{ label: "Start a project", href: "/services#lets-work-together" }}
      sectionLabel="What we do"
      viewAll={{ label: "All services", href: "/services" }}
    >
      <div className="mm-grid mm-grid--2 mm-svc-grid">
        {services.map((s) => (
          <div key={s.slug} className="mm-svc">
            <a href={`/services/${s.slug}`} className="mm-svc-head">
              <span className="mm-svc-icon">{ICONS[s.slug]}</span>
              <span className="mm-svc-title">{s.title}</span>
            </a>
            <p className="mm-svc-text">{SERVICE_MENU_TEXT[s.slug] ?? s.short}</p>
            <ul className="mm-svc-tags">
              {(SERVICE_TAGS[s.slug] ?? []).map((t) => (
                <li key={t}>
                  <a href={`/services/${s.slug}`} className="svc-tag">
                    {t}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" /></svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </MegaShell>
  );
}
