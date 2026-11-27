"use client";

import { INDUSTRY_MENU, type MenuIndustryGroup } from "@/lib/industryMenu";

// Industries mega menu, laid out like the supplied reference: dark panel,
// intro column on the left (label pill, heading, "Explore all" link and a
// "Start a project" button to the /industries enquiry form) and a 3-column grid of 6 industry groups on
// the right (icon, title, links) from lib/industryMenu.ts. Styles: .im-* in app/globals.css.

const ICONS: Record<MenuIndustryGroup["icon"], React.ReactNode> = {
  bag: <path d="M6 8h12l-1 12H7L6 8zM9 8V6a3 3 0 0 1 6 0v2" />,
  heart: <path d="M20.8 8.6c0 5.4-8.8 10.4-8.8 10.4S3.2 14 3.2 8.6a4.6 4.6 0 0 1 8.8-1.8 4.6 4.6 0 0 1 8.8 1.8zM8 11h2l1-2 2 4 1-2h2" />,
  building: <path d="M4 21V5l8-2v18M12 7l8 2v12M4 21h16M8 8v.01M8 12v.01M8 16v.01M16 12v.01M16 16v.01" />,
  truck: <path d="M2 7h11v9H2zM13 10h4l4 4v2h-8M6.5 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM17.5 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />,
  chip: <path d="M7 7h10v10H7zM10 10h4v4h-4zM10 3v4M14 3v4M10 17v4M14 17v4M3 10h4M3 14h4M17 10h4M17 14h4" />,
  briefcase: <path d="M3 8h18v11H3zM9 8V5h6v3M3 13h18" />,
};

export default function IndustriesMegaMenu() {
  return (
    <div className="mega-panel im">
      <div className="im-intro">
        <span className="im-pill">Industries</span>
        <p className="im-title">Industries we serve</p>
        <a href="/industries" className="im-explore">
          Explore all industries
        </a>

        <a href="/industries#lets-work-together" className="mm-cta im-cta">
          <span>Start a project</span>
          <span className="mm-cta-icon">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" /></svg>
          </span>
        </a>
      </div>

      <div className="im-grid">
        {INDUSTRY_MENU.map((g) => (
          <div key={g.title} className="im-group">
            <span className="im-group-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                {ICONS[g.icon]}
              </svg>
            </span>
            <p className="im-group-title">{g.title}</p>
            <ul className="im-links">
              {g.items.map((t) => (
                <li key={t.label}>
                  <a href={t.href}>{t.label}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
