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


type Item = { title: string; text: string; href?: string };

export function NxFeaturesSection({ label, heading, items }: { label: string; heading: string; items: Item[] }) {
  return (
    <section className="nx-features nx-lines">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="nx-waves" src={NX_IMG.waves} alt="" aria-hidden="true" />
      <div className="nx-container">
        <div className="pd-reveal">
          <span className="nx-label">/ {label} /</span>
          <h2 className="nx-h2 nx-features-h2">{heading}</h2>
        </div>
        <div className="nx-fgrid">
          {items.map((it, i) => (
            <Feature key={it.title} title={it.title} text={it.text} i={i} href={it.href} />
          ))}
        </div>
      </div>
    </section>
  );
}
