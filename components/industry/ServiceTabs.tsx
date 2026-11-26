"use client";

import Link from "next/link";
import { useRef, useState } from "react";

// "Relevant services" tabs on single industry pages: one tab per service
// that fits the industry (most relevant first). Accessible tablist:
// click or Left/Right/Home/End to switch; the panel fades in.

export type TabService = {
  slug: string;
  title: string;
  long: string;
  image: string;
  pillars: { title: string; copy: string }[];
  engagements: string[];
};

export default function ServiceTabs({ industry, items }: { industry: string; items: TabService[] }) {
  const [active, setActive] = useState(0);
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const s = items[active];

  const onKey = (e: React.KeyboardEvent) => {
    let n = active;
    if (e.key === "ArrowRight") n = (active + 1) % items.length;
    else if (e.key === "ArrowLeft") n = (active - 1 + items.length) % items.length;
    else if (e.key === "Home") n = 0;
    else if (e.key === "End") n = items.length - 1;
    else return;
    e.preventDefault();
    setActive(n);
    tabsRef.current[n]?.focus();
  };

  if (!s) return null;
  return (
    <div className="nx-st">
      <div className="nx-st-tabs" role="tablist" aria-label="Relevant services" onKeyDown={onKey}>
        {items.map((it, i) => (
          <button
            key={it.slug}
            ref={(el) => { tabsRef.current[i] = el; }}
            type="button"
            role="tab"
            id={`nx-st-tab-${i}`}
            aria-selected={i === active}
            aria-controls="nx-st-panel"
            tabIndex={i === active ? 0 : -1}
            className={`nx-st-tab${i === active ? " is-active" : ""}`}
            onClick={() => setActive(i)}
          >
            <span className="nx-st-tab-num">{String(i + 1).padStart(2, "0")}</span>
            {it.title}
          </button>
        ))}
      </div>

      <div key={s.slug} id="nx-st-panel" role="tabpanel" aria-labelledby={`nx-st-tab-${active}`} className="nx-st-panel">
        <div className="nx-st-media">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={s.image} alt="" />
        </div>
        <div className="nx-st-body">
          <span className="nx-st-for">For {industry}</span>
          <h3 className="nx-st-title">{s.title}</h3>
          <p className="nx-st-long">{s.long}</p>
          <ul className="nx-st-pillars">
            {s.pillars.slice(0, 4).map((p) => (
              <li key={p.title}>
                <strong>{p.title}</strong>
                <span>{p.copy}</span>
              </li>
            ))}
          </ul>
          {s.engagements.length > 0 && (
            <div className="nx-st-eng">
              <span>Ways to engage:</span>
              {s.engagements.map((e) => <em key={e}>{e}</em>)}
            </div>
          )}
          <div className="nx-st-actions">
            <Link href={`/services/${s.slug}`} className="hv2-btn">
              <span className="hv2-btn-label">Explore service</span>
              <span className="hv2-btn-icon">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" /></svg>
              </span>
            </Link>
            <a href="#enquiry" className="nx-st-link">Discuss your project ➚</a>
          </div>
        </div>
      </div>
    </div>
  );
}
