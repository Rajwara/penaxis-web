import Link from "next/link";
import DetailReveal from "@/components/detail/DetailReveal";
import HomeV2Cta from "@/components/HomeV2Cta";
import IndustryFaq from "./IndustryFaq";
import { NX_IMG } from "./NxHero";
import AboutHeroBanner from "@/components/AboutHeroBanner";
import { Feature } from "./NxFeatures";
import NxMarquee from "./NxMarquee";
import { caseStudies, industries, services, slugify } from "@/lib/data";
import { CASE_STUDY_SHORT_TITLES } from "@/lib/caseStudyCards";
import { INDUSTRY_CHALLENGES } from "@/lib/industryChallenges";
import { frameworksFor } from "@/lib/complianceFrameworks";
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


const SHORT_SERVICE: Record<string, string> = {
  "ai-mvp": "AI & MVPs",
  "digital-transformation": "Automation",
  "sales-growth": "Sales & growth",
  "web-crm-software": "Web & CRM",
};

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

const Label = ({ children }: { children: React.ReactNode }) => <span className="nx-label">/ {children} /</span>;

function Btn({ href, children, light }: { href: string; children: React.ReactNode; light?: boolean }) {
  return (
    <Link href={href} className={`nx-btn${light ? " is-light" : ""}`}>
      <span className="nx-chev">❯</span> {children}
    </Link>
  );
}

const MASONRY_H = [530, 360, 400, 480, 420, 600, 530, 400, 620, 400, 500, 360];

export default function IndustryTemplate({ industry }: { industry: Industry }) {
  const extra = INDUSTRY_EXTRAS[industry.title];
  const idx = industries.findIndex((i) => i.title === industry.title);
  const related = industries.slice(idx + 1).concat(industries.slice(0, idx));
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
                <span className="nx-label">/ industry challenges /</span>
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

        {/* 03 What we can build (features) */}
        <section className="nx-features nx-lines">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="nx-waves" src={NX_IMG.waves} alt="" aria-hidden="true" />
          <div className="nx-container">
            <div className="pd-reveal">
              <Label>what we can build</Label>
              <h2 className="nx-h2 nx-features-h2">Practical solutions &amp; the results they deliver</h2>
            </div>
            <div className="nx-fgrid">
              {industry.solutions.map((s, i) => (
                <Feature key={s} title={`Solution ${String(i + 1).padStart(2, "0")}`} text={s} i={i} />
              ))}
              {industry.outcomes.map((o, i) => (
                <Feature key={o} title={`Outcome ${String(i + 1).padStart(2, "0")}`} text={o} i={i + 3} />
              ))}
              {svc.slice(0, 2).map((s, i) => (
                <Feature key={s.slug} title={s.title} text={s.short} i={i + 6} href={`/services/${s.slug}`} />
              ))}
            </div>
          </div>
        </section>

        {/* 04 AI use cases (how it works) */}
        {extra && (
          <section className="nx-how nx-lines">
            <div className="nx-container">
              <div className="nx-grid2 nx-how-grid">
                <div className="nx-mock-wrap pd-reveal">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={NX_IMG.dashboard} alt="AI dashboard" />
                </div>
                <div className="pd-reveal">
                  <Label>AI use cases</Label>
                  <h2 className="nx-h2">How AI works for {industry.title.split(" & ")[0].toLowerCase()}</h2>
                  <p className="nx-intro">Practical AI built into the tools your team and customers already use, with people staying in control of every decision.</p>
                  {extra.ai.map((a, i) => (
                    <div key={a.title} className="nx-step">
                      <span className="nx-num">{String(i + 1).padStart(2, "0")}</span>
                      <div>
                        <h6>{a.title}</h6>
                        <p>{a.text}</p>
                      </div>
                    </div>
                  ))}
                  <div className="nx-step-btn">
                    <Btn href="/services/ai-mvp">Explore AI development</Btn>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Marquee */}
        <NxMarquee text={`${industry.title} is shaping the future of technology.`} />

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


        {/* 07 Relevant services (features grid) */}
        <section className="nx-features nx-services nx-lines">
          <div className="nx-container">
            <div className="pd-reveal">
              <Label>relevant services</Label>
              <h2 className="nx-h2 nx-features-h2">Services that power {industry.title}</h2>
            </div>
            <div className="nx-fgrid">
              {svc.map((s, i) => (
                <Feature key={s.slug} title={s.title} text={s.short} i={i} href={`/services/${s.slug}`} />
              ))}
              <Feature title="Not sure where to start?" text="Book a short discovery call and we'll recommend the right service and engagement model." i={5} href="/contact-us" />
            </div>
          </div>
        </section>

        {/* 08 FAQs */}
        <section className="nx-faq nx-boxed">
          <div className="nx-faq-head pd-reveal">
            <Label>faq</Label>
            <h2 className="nx-h2">Everything you need<br />to know about</h2>
          </div>
          <IndustryFaq items={faqs} />
          <div className="nx-faq-btn">
            <Btn href="/faqs">Explore more</Btn>
          </div>
        </section>

        {/* 09 Related industries (gallery) */}
        <section className="nx-gallery nx-boxed" data-nav-theme="dark">
          <div className="nx-gallery-head pd-reveal">
            <Label>related industries</Label>
            <h2 className="nx-h2">More industries<br />we build for</h2>
          </div>
          <div className="nx-masonry">
            {related.map((ind, i) => (
              <Link key={ind.title} href={`/industries/${slugify(ind.title)}`} className="nx-mtile">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={ind.image} alt="" loading="lazy" style={{ height: MASONRY_H[i % MASONRY_H.length] * 0.6 }} />
                <span className="nx-mtile-cap">{ind.title}</span>
              </Link>
            ))}
          </div>
          <div className="nx-center">
            <Btn href="/industries" light>See all industries</Btn>
          </div>
        </section>

        {/* 10 CTA */}
        <section className="nx-cta nx-boxed" data-nav-theme="dark">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={NX_IMG.cta} alt="" />
          <h2 className="nx-h2">
            Drive efficiency
            <br />
            &amp; growth in
            <br />
            {industry.title}
          </h2>
          <Btn href="#enquiry" light>Start a project</Btn>
        </section>
      </div>

      {/* 10 Enquiry form (same as the homepage) */}
      <div id="enquiry" className="hv2-page nx-cta-wrap">
        <HomeV2Cta source={`Industry page — ${industry.title}`} />
      </div>
    </DetailReveal>
  );
}
