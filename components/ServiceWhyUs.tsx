import { stats, whyUs } from "@/lib/data";

// Single service page "Why us" (after the banner): heading + intro + key
// stats on the left, the six reasons to choose Penaxis on the right.
// Uses the site's existing whyUs points and stats from lib/data.ts.

const ICONS: Record<string, React.ReactNode> = {
  target: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.5" /></>,
  rocket: <><path d="M5 15c-1 1-1.5 4-1.5 4.5S6 19 7 18" /><path d="M9 15l-3-3c1-4 4-8 10-9 0 6-4 9-8 10z" /><circle cx="14.5" cy="9.5" r="1.5" /></>,
  badge: <><circle cx="12" cy="9" r="6" /><path d="M8.5 13.8 7 21l5-3 5 3-1.5-7.2" /></>,
  layers: <><path d="M12 3 2 8l10 5 10-5z" /><path d="M2 13l10 5 10-5" /></>,
  cpu: <><rect x="6" y="6" width="12" height="12" rx="2" /><rect x="9.5" y="9.5" width="5" height="5" /><path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3" /></>,
  chat: <><path d="M4 5h16v11H8l-4 4z" /><path d="M8 10h8M8 13h5" /></>,
};

const STAT_KEYS = ["Milestones delivered on time", "Websites, platforms, or CRMs launched", "Industries Served"];

export default function ServiceWhyUs({ serviceTitle }: { serviceTitle: string }) {
  const picked = STAT_KEYS.map((k) => stats.find((s) => s.label === k)).filter((s): s is (typeof stats)[number] => !!s);
  return (
    <section className="swu" aria-labelledby="swu-title">
      <div className="swu-container">
        <div className="swu-left">
          <span className="swu-eyebrow">Why us</span>
          <h2 id="swu-title" className="swu-title">Why choose Penaxis for {serviceTitle}</h2>
          <p className="swu-intro">
            One team for strategy, design, technology and growth, focused on outcomes you can measure and a partnership you can rely on.
          </p>
          <div className="swu-stats">
            {picked.map((s) => (
              <div key={s.label} className="swu-stat">
                <span className="swu-stat-value">{s.prefix}{s.value}{s.suffix}</span>
                <span className="swu-stat-label">{s.label}</span>
              </div>
            ))}
          </div>
          <a href="/contact-us" className="hv2-btn">
            <span className="hv2-btn-label">Start a project</span>
            <span className="hv2-btn-icon">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" /></svg>
            </span>
          </a>
        </div>
        <ul className="swu-grid">
          {whyUs.map((w, i) => (
            <li key={w.title} className="swu-item">
              <span className="swu-num">{String(i + 1).padStart(2, "0")}</span>
              <svg className="swu-ico" viewBox="0 0 24 24" aria-hidden="true">{ICONS[w.icon] ?? ICONS.target}</svg>
              <h3>{w.title}</h3>
              <p>{w.copy}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
