"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { caseStudies } from "@/lib/data";
import { CASE_STUDY_SHORT_TITLES } from "@/lib/caseStudyCards";

// /industries "07 Featured case studies": a premium horizontal slider of
// published, delivered case studies only (real imagery + the metrics already
// shown on each case study page). Aleafiate, PharmaCrop and FP Global are
// NOT included until their case studies are approved and published.
// "services" = our reading of what each project delivered - confirm before launch.

const FEATURED: { slug: string; industry: string; services: string[] }[] = [
  { slug: "hotel-booking-revenue-platform", industry: "Hospitality & Tourism", services: ["Custom software", "Dashboards", "AI forecasting"] },
  { slug: "drivelo-logistics-platform", industry: "Logistics & Transportation", services: ["Mobile apps", "Dispatch platform", "Website"] },
  { slug: "the-plate-agent-marketplace", industry: "Automotive & Mobility", services: ["Marketplace", "AI valuation", "Payments"] },
  { slug: "cybersecurity-hr-platform", industry: "Cybersecurity & Information Security", services: ["Corporate website", "HR platform"] },
  { slug: "seka-gravel-cycling-platform", industry: "Sports, Fitness & Wellness", services: ["CMS website", "Memberships", "Marketplace"] },
];

const SLIDES = FEATURED.flatMap((f) => {
  const c = caseStudies.find((s) => s.slug === f.slug);
  if (!c) return [];
  const image = ("bannerImages" in c && c.bannerImages?.[0]) || c.gridImage || c.image;
  return [{ ...f, title: CASE_STUDY_SHORT_TITLES[c.slug] ?? c.title, blurb: c.blurb, image, metrics: (c.metrics ?? []).slice(0, 2) }];
});

function Arrow({ dir }: { dir: "prev" | "next" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={dir === "prev" ? { transform: "scaleX(-1)" } : undefined}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export default function IndustryCaseSlider() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const t = trackRef.current;
    if (!t) return;
    const on = () => {
      const max = t.scrollWidth - t.clientWidth;
      setEdge({ start: t.scrollLeft < 4, end: t.scrollLeft > max - 4 });
      setProgress(max > 0 ? t.scrollLeft / max : 1);
    };
    on();
    t.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    // mouse drag (touch scrolls natively)
    let down = false, x0 = 0, l0 = 0, moved = false;
    const md = (e: MouseEvent) => { down = true; moved = false; x0 = e.pageX; l0 = t.scrollLeft; t.classList.add("is-drag"); };
    const mm = (e: MouseEvent) => { if (!down) return; const dx = e.pageX - x0; if (Math.abs(dx) > 4) moved = true; t.scrollLeft = l0 - dx; };
    const mu = () => { down = false; t.classList.remove("is-drag"); };
    const ck = (e: MouseEvent) => { if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; } };
    t.addEventListener("mousedown", md);
    window.addEventListener("mousemove", mm);
    window.addEventListener("mouseup", mu);
    t.addEventListener("click", ck, true);
    return () => {
      t.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
      t.removeEventListener("mousedown", md);
      window.removeEventListener("mousemove", mm);
      window.removeEventListener("mouseup", mu);
      t.removeEventListener("click", ck, true);
    };
  }, []);

  const step = (d: 1 | -1) => {
    const t = trackRef.current;
    const card = t?.querySelector<HTMLElement>(".ics-card");
    if (!t || !card) return;
    t.scrollBy({ left: d * (card.offsetWidth + 24), behavior: "smooth" });
  };

  if (!SLIDES.length) return null;

  return (
    <section className="ics" aria-labelledby="ics-title">
      <div className="ics-container">
        <div className="ics-head">
          <div>
            <span className="ics-eyebrow">/ Our work across industries /</span>
            <h2 id="ics-title" className="ics-title">From Insights to Outcome.</h2>
            <p className="ics-intro">Explore how we translate industry knowledge and technological expertise into practical solutions for real businesses.</p>
          </div>
          <div className="ics-nav">
            <button type="button" className="ics-arrow" onClick={() => step(-1)} disabled={edge.start} aria-label="Previous case study"><Arrow dir="prev" /></button>
            <button type="button" className="ics-arrow" onClick={() => step(1)} disabled={edge.end} aria-label="Next case study"><Arrow dir="next" /></button>
          </div>
        </div>
      </div>

      <div ref={trackRef} className="ics-track" tabIndex={0} aria-label="Featured case studies">
        {SLIDES.map((s, i) => (
          <Link key={s.slug} href={`/case-studies/${s.slug}`} className="ics-card" draggable={false}>
            <span className="ics-media">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={s.image} alt="" loading="lazy" draggable={false} />
              <span className="ics-industry">{s.industry}</span>
              <span className="ics-count">{String(i + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}</span>
            </span>
            <span className="ics-body">
              <span className="ics-name">{s.title}</span>
              <span className="ics-blurb">{s.blurb}</span>
              <span className="ics-services">
                {s.services.map((x) => <span key={x}>{x}</span>)}
              </span>
              {s.metrics.length > 0 && (
                <span className="ics-metrics">
                  {s.metrics.map((m) => (
                    <span key={m.label} className="ics-metric">
                      <span className="ics-metric-value">{m.value}</span>
                      <span className="ics-metric-label">{m.label}</span>
                    </span>
                  ))}
                </span>
              )}
              <span className="ics-link">View case study <Arrow dir="next" /></span>
            </span>
          </Link>
        ))}
      </div>

      <div className="ics-container ics-foot">
        <div className="ics-progress" aria-hidden="true"><span style={{ transform: `scaleX(${Math.max(0.12, progress)})` }} /></div>
        <Link href="/case-studies" className="hv2-btn">
          <span className="hv2-btn-label">Explore Our Work</span>
          <span className="hv2-btn-icon">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" /></svg>
          </span>
        </Link>
      </div>
    </section>
  );
}
