import Link from "next/link";
import { NX_IMG } from "./NxHero";

// Features block from the supplied neuro layout ("/ label /", big heading,
// wave graphic, 4-column grid of title + text + icon). Used by the single
// industry pages and, as a section of its own, on /industries.

const ICONS = [
  <><rect x="3" y="5" width="18" height="14" rx="1" /><circle cx="8" cy="10" r="1.5" /><path d="m3 17 5-5 4 4 3-3 6 6" /></>,
  <path d="M3 8l6 3 4-6 2 6 6-2-5 6 2 5-6-3-4 3 1-6z" />,
  <><rect x="3" y="13" width="8" height="8" /><rect x="8" y="3" width="13" height="13" strokeDasharray="2 2" /><path d="m11 13 6-6m0 0h-4m4 0v4" /></>,
  <path d="M12 3s6 7 6 11a6 6 0 0 1-12 0c0-4 6-11 6-11z" />,
  <><rect x="4" y="4" width="16" height="16" /><path d="M8 8h8M12 8v9M10 17h4" /></>,
  <><path d="M7 3h10v14H7zM10 7h4M10 10h4M10 13h2" /><circle cx="7" cy="18" r="3" /></>,
  <><rect x="4" y="4" width="16" height="16" /><circle cx="10" cy="10" r="2" /><path d="m4 17 6-4 10 6" /></>,
  <><rect x="3" y="5" width="11" height="11" rx="1" /><rect x="10" y="9" width="11" height="11" rx="1" /></>,
];

export function Feature({ title, text, i, href }: { title: string; text: string; i: number; href?: string }) {
  const inner = (
    <>
      <h5>{title}</h5>
      <p>{text}</p>
      <div className="nx-ico">
        <svg viewBox="0 0 24 24" aria-hidden="true">{ICONS[i % ICONS.length]}</svg>
      </div>
    </>
  );
  return href ? (
    <Link href={href} className="nx-feat pd-reveal">{inner}</Link>
  ) : (
    <div className="nx-feat pd-reveal">{inner}</div>
  );
}


type Item = { title: string; text: string; href?: string; icon?: keyof typeof LIGHT_ICONS };

// Lightweight line icons for the "light" variant (no boxes), one per capability.
const LIGHT_ICONS = {
  ai: <path d="M12 3l1.8 4.6L18.5 9l-4.7 1.4L12 15l-1.8-4.6L5.5 9l4.7-1.4zM18 15l.9 2.1L21 18l-2.1.9L18 21l-.9-2.1L15 18l2.1-.9z" />,
  automation: <><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1 7 17M17 7l2.1-2.1" /></>,
  software: <><rect x="3" y="4" width="18" height="14" rx="2" /><path d="M8 21h8M9 9l-2 2 2 2M15 9l2 2-2 2" /></>,
  experience: <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 9h18M7 6.5h.01M10 6.5h.01" /><path d="M8 14l3 2 5-4" /></>,
  ecosystem: <><circle cx="6" cy="6" r="2.5" /><circle cx="18" cy="6" r="2.5" /><circle cx="12" cy="18" r="2.5" /><path d="M8.2 7.4 10.6 16M15.8 7.4 13.4 16M8.5 6h7" /></>,
  growth: <><path d="M3 20h18" /><path d="M5 16l5-5 3 3 6-7" /><path d="M15 7h4v4" /></>,
  security: <><path d="M12 3l8 3v6c0 4.5-3.4 8-8 9-4.6-1-8-4.5-8-9V6z" /><path d="M9 12l2 2 4-4" /></>,
  scale: <><rect x="3" y="14" width="5" height="7" rx="1" /><rect x="10" y="9" width="5" height="12" rx="1" /><rect x="17" y="4" width="4" height="17" rx="1" /></>,
};

export function NxFeaturesSection({
  label,
  heading,
  intro,
  items,
  variant,
}: {
  label: string;
  heading: string;
  intro?: string;
  items: Item[];
  variant?: "light";
}) {
  const light = variant === "light";
  return (
    <section className={`nx-features nx-lines${light ? " nx-features--light" : ""}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="nx-waves" src={NX_IMG.waves} alt="" aria-hidden="true" />
      <div className="nx-container">
        <div className="pd-reveal">
          <span className="nx-label">/ {label} /</span>
          <h2 className="nx-h2 nx-features-h2">{heading}</h2>
          {intro && <p className="nx-features-intro">{intro}</p>}
        </div>
        <div className="nx-fgrid">
          {items.map((it, i) =>
            light ? (
              <div key={it.title} className="nx-cap pd-reveal">
                <svg className="nx-cap-ico" viewBox="0 0 24 24" aria-hidden="true">{LIGHT_ICONS[it.icon ?? "ai"]}</svg>
                <h5>{it.title}</h5>
                <p>{it.text}</p>
              </div>
            ) : (
              <Feature key={it.title} title={it.title} text={it.text} i={i} href={it.href} />
            )
          )}
        </div>
      </div>
    </section>
  );
}
