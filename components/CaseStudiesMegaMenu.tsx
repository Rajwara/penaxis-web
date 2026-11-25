"use client";

import { caseStudies } from "@/lib/data";
import MegaShell from "./MegaShell";

// Case Studies mega menu: shared MegaShell layout with the 6 latest real
// case studies as thumbnail cards, each linking to its own page.

const LATEST = caseStudies.slice(0, 6);

export default function CaseStudiesMegaMenu() {
  return (
    <MegaShell
      eyebrow="Case studies"
      title="Work that speaks for itself"
      text={`${caseStudies.length} projects across logistics, healthcare, SaaS, e-commerce and more.`}
      cta={{ label: "Talk to us", href: "/contact-us" }}
      sectionLabel="Latest work"
      viewAll={{ label: "All case studies", href: "/case-studies" }}
    >
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
