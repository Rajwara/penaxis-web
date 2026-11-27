"use client";

import { caseStudies } from "@/lib/data";
import MegaShell from "./MegaShell";
import { FILTER_OPTIONS, type FilterMode } from "@/lib/caseStudyFilters";

// Case Studies mega menu: shared MegaShell layout with the 6 latest real
// case studies as thumbnail cards, each linking to its own page, plus filter
// shortcuts (industry / service) that open /case-studies with that filter on.

const LATEST = caseStudies.slice(0, 6);

// Filter shortcuts: each opens /case-studies with that filter selected.
const INDUSTRY_PICKS = ["Software, IT & SaaS", "Logistics & Transportation", "Healthcare & Wellness", "E-Commerce & Retail", "Automotive & Auto Care", "Real Estate & Property"];
const FILTER_ROWS: { by: FilterMode; label: string; options: { id: string; label: string }[] }[] = [
  { by: "industry", label: "Industry", options: INDUSTRY_PICKS.map((id) => FILTER_OPTIONS.industry.find((o) => o.id === id)).filter((o): o is (typeof FILTER_OPTIONS.industry)[number] => !!o) },
  { by: "service", label: "Service", options: FILTER_OPTIONS.service },
];
const filterHref = (by: FilterMode, id: string) => `/case-studies?by=${by}&filter=${encodeURIComponent(id)}#browse`;

export default function CaseStudiesMegaMenu() {
  return (
    <MegaShell
      eyebrow="Case studies"
      title="Work that speaks for itself"
      text={`${caseStudies.length} projects across logistics, healthcare, SaaS, e-commerce and more.`}
      cta={{ label: "Talk to us", href: "/case-studies#lets-work-together" }}
      sectionLabel="Latest work"
      viewAll={{ label: "All case studies", href: "/case-studies" }}
    >
      <div className="mm-filters">
        {FILTER_ROWS.map((r) => (
          <div key={r.by} className="mm-filter-row">
            <span className="mm-filter-label">{r.label}:</span>
            {r.options.map((o) => (
              <a key={o.id} href={filterHref(r.by, o.id)} className="svc-tag">
                {o.label}
              </a>
            ))}
          </div>
        ))}
      </div>
      <div className="mm-grid mm-grid--3">
        {LATEST.map((c) => (
          <a key={c.slug} href={`/case-studies/${c.slug}`} className="mm-work">
            <span className="mm-work-img">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={c.gridImage || c.image} alt="" loading="lazy" />
            </span>
            <span className="mm-work-tag">{c.tags[0]}</span>
            <span className="mm-work-title">{c.title}</span>
          </a>
        ))}
      </div>
    </MegaShell>
  );
}
