import CardSlider, { type SliderCard } from "./CardSlider";
import { caseStudies } from "@/lib/data";
import { CASE_STUDY_CAPABILITIES, CASE_STUDY_SHORT_TITLES } from "@/lib/caseStudyCards";
import { CASE_STUDY_SERVICES } from "@/lib/caseStudyFilters";

// Single service page: case studies for this service as a pinned slider
// (same design as the /industries case-study slider). Case studies come from
// the same service mapping as the /case-studies "By service" filter,
// delivered projects first. A service with fewer than 3 mapped projects is
// topped up with other delivered work, and the heading then says "Featured
// work" rather than claiming they were all this service.

type Study = (typeof caseStudies)[number];

const toCard = (c: Study): SliderCard => ({
  key: c.slug,
  href: `/case-studies/${c.slug}`,
  title: CASE_STUDY_SHORT_TITLES[c.slug] ?? c.title,
  blurb: c.blurb,
  image: ("cardImage" in c && c.cardImage) || ("bannerImages" in c && c.bannerImages?.[0]) || c.gridImage || c.image,
  highlightTag: c.tags[0],
  tags: (CASE_STUDY_CAPABILITIES[c.slug] ?? []).slice(0, 2),
  metrics: (c.metrics ?? []).slice(0, 2),
});

const delivered = (a: Study, b: Study) => Number(b.status === "delivered") - Number(a.status === "delivered");

export default function ServiceCaseSlider({ slug, serviceTitle }: { slug: string; serviceTitle: string }) {
  const own = caseStudies.filter((c) => (CASE_STUDY_SERVICES[c.slug] ?? []).includes(slug)).sort(delivered);
  const topUp = own.length >= 3 ? [] : caseStudies.filter((c) => !own.includes(c) && c.status === "delivered").slice(0, 4 - own.length);
  const studies = [...own, ...topUp].slice(0, 8);
  const isOwn = topUp.length === 0;

  return (
    <CardSlider
      id="svc-cases-title"
      eyebrow="Case studies"
      title={isOwn ? "Results from real projects." : "Featured work."}
      intro={
        isOwn
          ? `Real projects where we delivered ${serviceTitle.toLowerCase()} for our clients.`
          : "A selection of real projects we have designed, built and delivered for our clients."
      }
      cards={studies.map(toCard)}
      hoverLabel="View case study"
      cta={{ label: "All case studies", href: "/case-studies" }}
      ariaLabel="Case studies"
    />
  );
}
