"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { industries, slugify } from "@/lib/data";
import { moreIndustries } from "@/lib/industriesMore";
import { INDUSTRY_MENU } from "@/lib/industryMenu";

// /industries "showcase" gallery, ported from the supplied
// community-showcase file: dark rounded box, "/ label /" + heading that
// reveals letter by letter, 4-column masonry (each card goes into the
// shortest column, same ratios as the file), image zoom + overlay with
// number, title and short copy on hover,
// cut off with a bottom fade and a pill button. Cards = Penaxis industries,
// each linking to its page. Styles: .isc-* in app/globals.css.

const RATIOS = [322 / 428, 322 / 318, 322 / 428, 322 / 490, 322 / 428, 322 / 428, 322 / 490, 322 / 318, 322 / 428, 322 / 490, 322 / 318, 322 / 428];
const TITLE = "Industry Expertise. Real-World Solutions.";
const INTRO =
  "Explore how Penaxis addresses the unique challenges of businesses across diverse industries through tailored technology, intelligent automation and growth-focused solutions.";

// Priority order + short card copy (supplied). The first 12 show on load;
// "Load more industries" adds the remaining 12. This order balances existing
// experience and target opportunities - it is not a claim that every sector
// has completed projects.
const CARDS: [string, string][] = [
  ["Hospitality & Tourism", "Connected guest experiences, booking platforms and smarter operations."],
  ["Food & Beverage", "Intelligent ordering, restaurant management and customer engagement."],
  ["Healthcare & Medical Clinics", "Patient platforms, connected healthcare and clinical automation."],
  ["Sports, Fitness & Wellness", "Membership platforms, bookings and smarter fitness management."],
  ["Retail & E-commerce", "Connected commerce, intelligent inventory and personalized journeys."],
  ["Real Estate & Property Management", "Property operations, leasing platforms and intelligent CRMs."],
  ["Fashion, Beauty & Lifestyle", "Digital storefronts and customer engagement strategies."],
  ["Automotive & Mobility", "Fleet management, digital bookings and connected operations."],
  ["Architecture, Interiors & Fit-Out", "Digital portfolios, project management and client experiences."],
  ["Technology, SaaS & Startups", "Product validation, scalable software and AI-powered innovation."],
  ["Pharmaceuticals & Life Sciences", "Professional portals and connected business operations."],
  ["Cybersecurity & Information Security", "Digital platforms, sales enablement and growth for security firms."],
  ["Physiotherapy & Rehabilitation", "Appointment systems, patient journeys and practice workflows."],
  ["Mental Health & Psychology", "Accessible digital experiences and secure practice workflows."],
  ["Construction & Engineering", "Project visibility, procurement and operational management."],
  ["Facilities Management & Home Services", "Service scheduling, workforce coordination and maintenance tracking."],
  ["Logistics & Transportation", "Fleet visibility, delivery workflows and connected operations."],
  ["Manufacturing & Industrial", "Production visibility, workflow automation and reporting."],
  ["Wholesale & Distribution", "B2B ordering, inventory and distribution workflows."],
  ["Education & EdTech", "Learning platforms, admissions and connected administration."],
  ["IT & Managed Services", "Client portals, service workflows and growth enablement."],
  ["Professional & Business Services", "Client management, digital presence and business automation."],
  ["Recruitment & Human Resources", "Candidate workflows, staffing platforms and HR systems."],
  ["Personal Brands & Professionals", "Premium portfolio websites and digital presence."],
];

const MENU = INDUSTRY_MENU.flatMap((g) => g.items);
const PAGES = [...industries, ...moreIndustries];

const ITEMS = CARDS.map(([title, copy], i) => {
  const href = MENU.find((m) => m.label === title)?.href ?? "/industries";
  const page = PAGES.find((p) => `/industries/${slugify(p.title)}` === href);
  return { title, copy, href, image: page?.image ?? industries[0].image, ratio: RATIOS[i % RATIOS.length], num: String(i + 1).padStart(2, "0") };
});
const FIRST = 12;

const colsFor = (w: number) => (w <= 767 ? 1 : w <= 1024 ? 2 : 4);

function Chevron() {
  return (
    <svg viewBox="0 0 6 10" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M1 1l4 4-4 4" />
    </svg>
  );
}

export default function IndustryShowcase() {
  const [cols, setCols] = useState(4);
  const [shown, setShown] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [fullH, setFullH] = useState<number | null>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  // All 24 are laid out from the start (placement is deterministic, so the
  // first 12 never move); the panel's height animates between the cut-off
  // height and the full content height.
  const visible = ITEMS;
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const update = () => setCols(colsFor(window.innerWidth));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    const h = titleRef.current;
    if (!h) return;
    const io = new IntersectionObserver(
      (es) => {
        if (es.some((e) => e.isIntersecting)) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(h);
    return () => io.disconnect();
  }, []);

  const measure = () => boxRef.current && setFullH(boxRef.current.scrollHeight);
  useEffect(() => {
    if (!expanded) return;
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [expanded, cols]);

  const expand = () => {
    measure();
    setExpanded(true);
  };
  const collapse = () => {
    setExpanded(false);
    const top = sectionRef.current?.getBoundingClientRect().top ?? 0;
    if (top < 0) sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // masonry: shortest column first (as in the file)
  const columns: (typeof visible)[] = Array.from({ length: cols }, () => []);
  const heights = new Array(cols).fill(0);
  visible.forEach((it) => {
    let min = 0;
    for (let i = 1; i < cols; i++) if (heights[i] < heights[min] - 1e-6) min = i;
    columns[min].push(it);
    heights[min] += 1 / it.ratio + 0.0932;
  });

  let li = 0;
  return (
    <section ref={sectionRef} className="isc-section" aria-labelledby="isc-title">
      <div ref={boxRef} className={`isc${expanded ? " is-expanded" : ""}`} data-nav-theme="dark" style={expanded && fullH ? { height: fullH } : undefined}>
        <div className="isc-head">
          <span className="isc-sub">industries we empower</span>
          <h2 ref={titleRef} id="isc-title" className={`isc-title${shown ? " is-visible" : ""}`} aria-label={TITLE}>
            {TITLE.split(" ").map((w, wi) => (
              <span key={wi}>
                {wi > 0 && " "}
                <span className="isc-word" aria-hidden="true">
                  {[...w].map((ch, ci) => (
                    <span key={ci} className="isc-letter" style={{ transitionDelay: `${(li++ * 0.03).toFixed(2)}s` }}>
                      {ch}
                    </span>
                  ))}
                </span>
              </span>
            ))}
          </h2>
          <p className="isc-intro">{INTRO}</p>
        </div>

        <div id="isc-gallery" className="isc-gallery" aria-live="polite">
          {columns.map((col, ci) => (
            <div key={ci} className="isc-col">
              {col.map((it) => {
                const extra = ITEMS.indexOf(it) >= FIRST;
                return (
                <Link key={it.title} href={it.href} className={`isc-item${extra ? " is-extra" : ""}`} tabIndex={extra && !expanded ? -1 : undefined} aria-hidden={extra && !expanded ? true : undefined}>
                  <span className="isc-media" style={{ aspectRatio: String(it.ratio) }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={it.image} alt="" loading="lazy" />
                  </span>
                  <span className="isc-content">
                    <span className="isc-num">{it.num}</span>
                    <span className="isc-item-title">{it.title}</span>
                    <span className="isc-item-copy">{it.copy}</span>
                    <span className="isc-item-more">Explore industry ➚</span>
                  </span>
                </Link>
                );
              })}
            </div>
          ))}
        </div>

        <div className="isc-fade" aria-hidden={expanded}>
          <button type="button" className="isc-btn" onClick={expand} aria-expanded={expanded} aria-controls="isc-gallery" tabIndex={expanded ? -1 : undefined}>
            <span className="isc-arrow is-left"><Chevron /></span>
            Load more industries
            <span className="isc-arrow is-right"><Chevron /></span>
          </button>
        </div>
        <div className="isc-end" aria-hidden={!expanded}>
          <button type="button" className="isc-btn is-up" onClick={collapse} aria-expanded={expanded} aria-controls="isc-gallery" tabIndex={expanded ? undefined : -1}>
            <span className="isc-arrow is-left"><Chevron /></span>
            Show fewer industries
            <span className="isc-arrow is-right"><Chevron /></span>
          </button>
        </div>
      </div>
    </section>
  );
}
