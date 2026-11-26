import Link from "next/link";
import DetailReveal from "@/components/detail/DetailReveal";
import HomeV2Cta from "@/components/HomeV2Cta";
import IndustryFaq from "./IndustryFaq";
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

const CDN = "https://8ded8880.delivery.rocketcdn.me/themes/neuros/wp-content/uploads/";
const NX_IMG = {
  t1: CDN + "2024/03/home-4-1-min.jpg",
  t2a: CDN + "2024/03/home-4-2-min.jpg",
  t2b: CDN + "2024/02/mitchell-luo-mkNOHMD3a-I-unsplash-2-min.jpg",
  t3: CDN + "2024/03/home-4-4-min.jpg",
  t4: CDN + "2024/03/closeup-red-pattern-with-hexagon-holes-1-min.jpg",
  t5: CDN + "2024/03/home-4-3-min.jpg",
  t6: CDN + "2024/03/home-4-5-min.jpg",
  aboutBg: CDN + "2024/03/Vector.png",
  aboutShape: CDN + "2024/03/2.png",
  waves: CDN + "2024/04/home-4-bg-1.png",
  dashboard: CDN + "2024/04/Dashboard-min-1-1024x994.png",
  cta: CDN + "2024/02/service-video-poster.jpg",
};

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

function Feature({ title, text, i, href }: { title: string; text: string; i: number; href?: string }) {
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
  const ribbon = `${industry.title} is shaping the future of technology. / `.repeat(4);

  return (
    <DetailReveal>
      <div className="nx">
        {/* 01 Hero (same banner as the template) */}
        <section className="nx-hero" data-nav-theme="dark">
          <div className="nx-collage" aria-hidden="true">
            {/* eslint-disable @next/next/no-img-element */}
            <div className="nx-tile nx-t1"><img src={NX_IMG.t1} alt="" /></div>
            <div className="nx-t2 nx-stack">
              <div className="nx-tile"><img src={NX_IMG.t2a} alt="" /></div>
              <div className="nx-tile"><img src={NX_IMG.t2b} alt="" /></div>
            </div>
            <div className="nx-tile nx-t3"><img src={NX_IMG.t3} alt="" /></div>
            <div className="nx-tile nx-t4"><img src={NX_IMG.t4} alt="" /></div>
            <div className="nx-tile nx-t5"><img src={NX_IMG.t5} alt="" /></div>
            <div className="nx-tile nx-t6"><img src={NX_IMG.t6} alt="" /></div>
            {/* eslint-enable @next/next/no-img-element */}
          </div>
          <div className="nx-hero-content">
            <h1 className="nx-h1">
              Digital solutions for
              <br />
              {industry.title}
            </h1>
            <p>{industry.copy} Tell us what you want to build and we&apos;ll turn it into a working product.</p>
            <form className="nx-prompt" action="/contact-us" method="get">
              <input type="text" name="project" placeholder="Describe what you want to build" aria-label="Describe what you want to build" />
              <button type="submit">➚ Get started</button>
            </form>
            <div className="nx-queries">
              <span>Popular services:</span>
              {svc.map((s) => (
                <Link key={s.slug} href={`/services/${s.slug}`}>{SHORT_SERVICE[s.slug] ?? s.title}</Link>
              ))}
            </div>
          </div>
        </section>

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
        <div className="nx-marquee" aria-hidden="true">
          <div className="nx-ribbon nx-r1"><div className="nx-track">{ribbon}{ribbon}</div></div>
          <div className="nx-ribbon nx-r2"><div className="nx-track">{ribbon}{ribbon}</div></div>
        </div>

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
