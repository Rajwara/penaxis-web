import Link from "next/link";
import DetailReveal from "@/components/detail/DetailReveal";
import HomeV2Cta from "@/components/HomeV2Cta";
import IndustryFaq from "./IndustryFaq";
import NxHero, { NX_IMG } from "./NxHero";
import { Feature } from "./NxFeatures";
import NxMarquee from "./NxMarquee";
import { caseStudies, industries, services, slugify } from "@/lib/data";
import { CASE_STUDY_SHORT_TITLES } from "@/lib/caseStudyCards";
import { GENERAL_FAQS, INDUSTRY_EXTRAS, SECURITY_BASELINE } from "@/lib/industryExtras";
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
  const own = caseStudies.filter((s) => s.tags.includes(industry.title));
  const studies = [...own, ...caseStudies.filter((s) => !own.includes(s))].slice(0, 2);
  const svc = (extra?.services ?? services.map((s) => s.slug))
    .map((slug) => services.find((s) => s.slug === slug))
    .filter((s): s is (typeof services)[number] => !!s);
  const faqs = [...(extra?.faqs ?? []), ...GENERAL_FAQS];
  const word = industry.title.split(/[ ,&]/)[0];

  return (
    <DetailReveal>
      <div className="nx">
        {/* 01 Hero (same banner as the template) */}
        <NxHero
          title={<>Digital solutions for<br />{industry.title}</>}
          text={`${industry.copy} Tell us what you want to build and we'll turn it into a working product.`}
          chips={svc.map((s) => ({ label: SHORT_SERVICE[s.slug] ?? s.title, href: `/services/${s.slug}` }))}
        />

        {/* 02 Industry challenges (about block) */}
        <section className="nx-about" data-nav-theme="dark" style={{ backgroundImage: `url(${NX_IMG.aboutBg})` }}>
          <div className="nx-container nx-rel">
            <div className="nx-grid2">
              <div />
              <div className="nx-word pd-reveal" aria-hidden="true">
                <svg viewBox="0 0 560 170">
                  <defs>
                    <linearGradient id="nx-og" x1="0" x2="1">
                      <stop offset="0" stopColor="#6A449A" />
                      <stop offset="1" stopColor="#c2a8e6" />
                    </linearGradient>
                  </defs>
                  <text x="0" y="150" fontSize="175" letterSpacing="-2" fill="none" stroke="url(#nx-og)" strokeWidth="1.2" textLength={word.length > 5 ? 520 : undefined} lengthAdjust="spacingAndGlyphs">
                    {word}
                  </text>
                </svg>
                <span className="nx-word-tag">AI</span>
              </div>
            </div>
            <div className="nx-grid2 nx-about-row">
              <div className="nx-big-logo" aria-hidden="true">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={NX_IMG.aboutShape} alt="" />
              </div>
              <div className="pd-reveal">
                <Label>the challenge</Label>
                <h2 className="nx-h2">What makes {industry.title.split(" & ")[0].toLowerCase()} hard to get right</h2>
                <div className="nx-copy">
                  <p>{industry.challenge}</p>
                  <Btn href="/contact-us" light>Talk to us</Btn>
                </div>
              </div>
            </div>
          </div>
        </section>

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

        {/* 05 Compliance & security (features grid) */}
        {extra && (
          <section className="nx-features nx-comp nx-lines">
            <div className="nx-container">
              <div className="pd-reveal">
                <Label>compliance &amp; security</Label>
                <h2 className="nx-h2 nx-features-h2">Built to be trusted with your data</h2>
              </div>
              <div className="nx-fgrid">
                {extra.compliance.map((c, i) => (
                  <Feature key={c.title} title={c.title} text={c.text} i={i + 2} />
                ))}
                {SECURITY_BASELINE.map((b, i) => (
                  <Feature key={b} title={b.split(" and ")[0].split(",")[0]} text={b + "."} i={i + 4} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 06 Case studies (blog cards) */}
        <section id="case-studies" className="nx-blog nx-lines">
          <div className="nx-container">
            <div className="nx-blog-top pd-reveal">
              <div>
                <Label>case studies</Label>
                <h2 className="nx-h2">Real projects: the problems we solved and what we built</h2>
              </div>
              <Btn href="/case-studies">More case studies</Btn>
            </div>
            <div className="nx-posts">
              {studies.map((s) => (
                <Link key={s.slug} href={`/case-studies/${s.slug}`} className="nx-post pd-reveal">
                  <span className="nx-post-media">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={s.gridImage || s.image} alt="" loading="lazy" />
                    <span className="nx-post-date">{s.region} / {s.status === "delivered" ? "delivered" : "concept"}</span>
                  </span>
                  <span className="nx-post-body">
                    <h3>{CASE_STUDY_SHORT_TITLES[s.slug] ?? s.title}</h3>
                    <p>{s.blurb}</p>
                    <span className="nx-tags">/ {s.tags.join(" / ")} /</span>
                  </span>
                </Link>
              ))}
            </div>
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
