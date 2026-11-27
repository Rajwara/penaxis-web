import Link from "next/link";
import DetailReveal from "@/components/detail/DetailReveal";
import HomeV2Cta from "@/components/HomeV2Cta";
import FaqSections from "@/components/FaqSections";
import { INDUSTRY_MENU } from "@/lib/industryMenu";
import AboutHeroBanner from "@/components/AboutHeroBanner";
import ServiceTabs from "./ServiceTabs";
import { caseStudies, industries, services, slugify } from "@/lib/data";
import { CASE_STUDY_SHORT_TITLES } from "@/lib/caseStudyCards";
import { INDUSTRY_CHALLENGES } from "@/lib/industryChallenges";
import { frameworksFor } from "@/lib/complianceFrameworks";
import { industryImageForPage } from "@/lib/industryImages";
import { GENERAL_FAQS, INDUSTRY_EXTRAS } from "@/lib/industryExtras";
import "@fontsource-variable/big-shoulders/opsz.css";
import "@fontsource-variable/wix-madefor-display/index.css";

// Single industry page, built on the supplied "neuro home 4" layout
// (neuro-home4-layout_1.html): same hero collage + prompt bar, about block,
// features grid, dashboard + numbered steps, marquee ribbons, boxed
// gallery, numbered FAQ rows, blog cards and image CTA. Sections in the
// agreed order: 01 hero, 02 challenges, 03 what we can build, 04 AI use
// cases, 05 compliance & security, 06 case studies, 07 services, 08 FAQs,
// 09 related industries, 10 CTA & enquiry form, 11 footer (page).
// TEMP IMAGES: the template's own images (NX_IMG) until Penaxis uploads
// replacements. Penaxis fonts and purple accent. Styles: .nx-* in
// app/globals.css.



type Industry = (typeof industries)[number];

// Closest real project for industries that have no case study tagged with them.
const RELATED_CASES: Record<string, string[]> = {
  "Hospitality & Tourism": ["hotel-booking-revenue-platform"],
  "Fashion, Beauty & Lifestyle": ["luxury-furniture-ecommerce"],
  "Architecture, Interiors & Fit-Out": ["luxury-furniture-ecommerce"],
  "Pharmaceuticals & Life Sciences": ["patient-care-management-platform"],
  "Physiotherapy & Rehabilitation": ["patient-care-management-platform"],
  "Mental Health & Psychology": ["patient-care-management-platform"],
  "Wholesale & Distribution": ["drivelo-logistics-platform"],
  "Cybersecurity & Information Security": ["cybersecurity-hr-platform"],
};

const Label = ({ children }: { children: React.ReactNode }) => <span className="nx-label">{children}</span>;

function Btn({ href, children, light }: { href: string; children: React.ReactNode; light?: boolean }) {
  return (
    <Link href={href} className={`nx-btn${light ? " is-light" : ""}`}>
      <span className="nx-chev">❯</span> {children}
    </Link>
  );
}


export default function IndustryTemplate({ industry }: { industry: Industry }) {
  const extra = INDUSTRY_EXTRAS[industry.title];
  // Real projects for this industry: case studies tagged with it, plus a
  // hand-picked closest match for industries without a tagged project.
  // Delivered projects first, max 2. No match -> the section is hidden.
  const own = caseStudies.filter((s) => s.tags.includes(industry.title) || (RELATED_CASES[industry.title] ?? []).includes(s.slug));
  const studies = [...own].sort((a, b) => Number(b.status === "delivered") - Number(a.status === "delivered")).slice(0, 2);
  const svc = (extra?.services ?? services.map((s) => s.slug))
    .map((slug) => services.find((s) => s.slug === slug))
    .filter((s): s is (typeof services)[number] => !!s);
  const faqs = [...(extra?.faqs ?? []), ...GENERAL_FAQS];
  const challenges = INDUSTRY_CHALLENGES[industry.title] ?? [];
  const frameworks = frameworksFor(industry.title);
  // Split the title over the banner's two lines ("Healthcare &" / "Wellness").
  const amp = industry.title.lastIndexOf(" & ");
  const titleLines: [string, string] =
    amp > 0 ? [industry.title.slice(0, amp + 2), industry.title.slice(amp + 3)] : [industry.title, "Solutions"];

  return (
    <DetailReveal>
      <div className="nx">
        {/* 01 Hero: same banner as the About page (AboutHeroBanner), as-is */}
        <AboutHeroBanner
          label="Industry"
          line1={titleLines[0]}
          line2={titleLines[1]}
          text={`${industry.copy} We design, build and grow the technology that helps businesses like yours succeed.`}
        />

        {/* 02 Industry challenges */}
        <section className="nx-chal" aria-labelledby="nx-chal-title">
          <div className="nx-container">
            <div className="nx-chal-head">
              <div className="pd-reveal">
                <span className="nx-label">industry challenges</span>
                <h2 id="nx-chal-title" className="nx-h2">What makes {industry.title.split(" & ")[0].toLowerCase()} hard to get right</h2>
              </div>
              <p className="nx-chal-intro pd-reveal">{industry.challenge}</p>
            </div>
            <div className="nx-chal-grid">
              {challenges.map((c, i) => (
                <article key={c.title} className="nx-chal-card pd-reveal">
                  <span className="nx-chal-num">{String(i + 1).padStart(2, "0")}</span>
                  <h3>{c.title}</h3>
                  <p>{c.text}</p>
                </article>
              ))}
            </div>
            <div className="nx-chal-cta pd-reveal">
              <span>Facing these challenges?</span>
              <Btn href="#enquiry">Talk to us</Btn>
            </div>
          </div>
        </section>

        {/* Real projects in this industry */}
        {studies.length > 0 && (
          <section id="case-studies" className="nx-proj" aria-labelledby="nx-proj-title">
            <div className="nx-container">
              <div className="nx-proj-head pd-reveal">
                <div>
                  <Label>case studies</Label>
                  <h2 id="nx-proj-title" className="nx-h2">Real projects in this industry</h2>
                </div>
                <Btn href="/case-studies">All case studies</Btn>
              </div>
              <div className={`nx-proj-list${studies.length === 1 ? " is-single" : ""}`}>
                {studies.map((s) => {
                  const img = ("bannerImages" in s && s.bannerImages?.[0]) || s.gridImage || s.image;
                  return (
                    <Link key={s.slug} href={`/case-studies/${s.slug}`} className="nx-proj-card pd-reveal">
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
        )}

        {/* 05 Compliance: what we deliver against each framework */}
        <section className="nx-cf" aria-labelledby="nx-cf-title">
          <div className="nx-container">
            <div className="nx-cf-head">
              <div className="pd-reveal">
                <Label>compliance</Label>
                <h2 id="nx-cf-title" className="nx-h2">What we deliver against each framework</h2>
              </div>
              <p className="nx-cf-intro pd-reveal">
                Every build follows secure-by-design practice. For {industry.title.toLowerCase()}, these are the frameworks we
                design around and the concrete features we deliver to support your compliance.
              </p>
            </div>
            <div className="nx-cf-list">
              {frameworks.map((f, i) => (
                <div key={f.id} className="nx-cf-row pd-reveal">
                  <div className="nx-cf-name">
                    <span className="nx-cf-num">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <h3>{f.name}</h3>
                      <p>{f.scope}</p>
                    </div>
                  </div>
                  <ul className="nx-cf-deliver">
                    {f.deliver.map((d) => (
                      <li key={d}>
                        <svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="10" /><path d="M6 10.2l2.6 2.6L14 7.6" /></svg>
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <p className="nx-cf-note pd-reveal">
              We build software that supports your compliance programme. Certification and regulatory responsibility remain with your
              organisation, and we&apos;re happy to work alongside your legal, security and audit teams.
            </p>
          </div>
        </section>


        {/* 07 Relevant services (tabs) */}
        <section className="nx-svc-tabs" aria-labelledby="nx-svc-title">
          <div className="nx-container">
            <div className="nx-cf-head pd-reveal">
              <div>
                <Label>relevant services</Label>
                <h2 id="nx-svc-title" className="nx-h2">Services that power {industry.title}</h2>
              </div>
              <p className="nx-cf-intro">
                The services most relevant to {industry.title.toLowerCase()}, ordered by fit. Pick one to see what we deliver and how we can work together.
              </p>
            </div>
            <ServiceTabs
              industry={industry.title}
              items={svc.map((x) => ({
                slug: x.slug,
                title: x.title,
                long: x.long,
                image: ("listImage" in x && x.listImage) || x.heroImage,
                pillars: x.pillars.map((p) => ({ title: p.title, copy: p.copy })),
                engagements: x.engagements ?? [],
              }))}
            />
          </div>
        </section>

      </div>

      {/* 08 FAQs (FAQs page design, numbered) */}
      <div className="fq-solo">
        <FaqSections
          nav={false}
          numbered
          heading="Everything you need to know."
          image={industryImageForPage(industry.title)?.src ?? industry.image}
          topics={[{ id: "industry-faq", title: `${industry.title} FAQs`, items: faqs.map((f) => ({ ...f, image: "" })) }]}
        />
      </div>

      {/* 09 CTA & enquiry form (same as the Industries page) */}
      <div id="enquiry" className="hv2-page nx-cta-wrap">
        <HomeV2Cta
          source={`Industry page — ${industry.title}`}
          eyebrow="Let’s build what’s next"
          heading="Your Industry. Your Challenges. Our Expertise."
          intro="Whether you’re modernizing an established business, building a new digital product or exploring the possibilities of AI, we’re here to help you take the next step."
          formTitle="Let’s Discuss Your Project"
          formText="Tell us about your business and what you want to achieve. We’ll get back to you within one business day."
          submitLabel="Let’s Discuss Your Project"
          extended={{
            industries: INDUSTRY_MENU.flatMap((g) => g.items.map((i) => i.label)),
            services: ["AI-Powered MVP Development", "Digital Transformation", "Fractional Sales & Growth", "Web, CRM & Software Solutions", "Not Sure Yet"],
            defaultIndustry: INDUSTRY_MENU.flatMap((g) => g.items).find((i) => i.href === `/industries/${slugify(industry.title)}`)?.label,
          }}
        />
      </div>
    </DetailReveal>
  );
}
