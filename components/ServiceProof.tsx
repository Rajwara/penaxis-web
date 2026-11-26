import Link from "next/link";
import { caseStudies } from "@/lib/data";
import { CASE_STUDY_SHORT_TITLES } from "@/lib/caseStudyCards";

// Single service page "Proof" (after Key benefits): real case studies that
// show this service delivered. Uses the same project cards as the industry
// pages (.nx-proj-*). Services without a clearly matching case study show no
// section rather than unrelated work.

const PROOF: Record<string, string[]> = {
  "ai-mvp": ["ai-automotive-search-oktabytes", "the-plate-agent-marketplace", "hotel-booking-revenue-platform"],
  "digital-transformation": ["cybersecurity-hr-platform", "recruitment-talent-platform", "dry-cleaning-delivery-platform"],
  "web-crm-software": ["drivelo-logistics-platform", "patient-care-management-platform", "luxury-furniture-ecommerce"],
};

export default function ServiceProof({ slug }: { slug: string }) {
  const studies = (PROOF[slug] ?? [])
    .map((s) => caseStudies.find((c) => c.slug === s))
    .filter((c): c is (typeof caseStudies)[number] => !!c)
    .slice(0, 2);
  if (!studies.length) return null;

  return (
    <section className="nx-proj spf" aria-labelledby="spf-title">
      <div className="spf-container">
        <div className="nx-proj-head">
          <div>
            <span className="swu-eyebrow">Proof</span>
            <h2 id="spf-title" className="spf-title">Results from real projects</h2>
          </div>
          <Link href="/case-studies" className="hv2-btn">
            <span className="hv2-btn-label">All case studies</span>
            <span className="hv2-btn-icon">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" /></svg>
            </span>
          </Link>
        </div>
        <div className={`nx-proj-list${studies.length === 1 ? " is-single" : ""}`}>
          {studies.map((s) => {
            const img = ("bannerImages" in s && s.bannerImages?.[0]) || s.gridImage || s.image;
            return (
              <Link key={s.slug} href={`/case-studies/${s.slug}`} className="nx-proj-card">
                <span className="nx-proj-media">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img} alt="" loading="lazy" />
                  <span className="nx-proj-status">{s.status === "delivered" ? "Delivered" : "Concept"}</span>
                </span>
                <span className="nx-proj-body">
                  <span className="nx-proj-tags">
                    {s.tags.map((t) => <span key={t}>{t}</span>)}
                    <span className="is-region">{s.region}</span>
                  </span>
                  <span className="nx-proj-title">{CASE_STUDY_SHORT_TITLES[s.slug] ?? s.title}</span>
                  <span className="nx-proj-text">{s.blurb}</span>
                  {s.metrics?.length ? (
                    <span className="nx-proj-metrics">
                      {s.metrics.slice(0, 2).map((m) => (
                        <span key={m.label}><b>{m.value}</b>{m.label}</span>
                      ))}
                    </span>
                  ) : null}
                  <span className="nx-proj-link">View case study ➚</span>
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
