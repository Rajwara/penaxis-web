import Link from "next/link";
import DetailReveal from "@/components/detail/DetailReveal";
import HomeV2Cta from "@/components/HomeV2Cta";
import { caseStudies, industries, services, slugify } from "@/lib/data";
import { CASE_STUDY_SHORT_TITLES } from "@/lib/caseStudyCards";
import { GENERAL_FAQS, INDUSTRY_EXTRAS, SECURITY_BASELINE } from "@/lib/industryExtras";
import "@fontsource-variable/big-shoulders/opsz.css";
import "@fontsource-variable/wix-madefor-display/index.css";

// Single industry page template, 11 sections in this order:
// 01 hero & introduction, 02 challenges, 03 what we can build,
// 04 AI use cases, 05 compliance & security, 06 case studies,
// 07 relevant services, 08 FAQs, 09 related industries,
// 10 CTA & enquiry form, 11 global footer (rendered by the page).
// Styles: .ix-* (plus .pd-* basics and .sc-* cards) in app/globals.css.

type Industry = (typeof industries)[number];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <div className="ix-eyebrow">{children}</div>;
}

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

function Check() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <circle cx="10" cy="10" r="10" fill="currentColor" />
      <path d="M6 10.2l2.6 2.6L14 7.6" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function IndustryTemplate({ industry }: { industry: Industry }) {
  const extra = INDUSTRY_EXTRAS[industry.title];
  const idx = industries.findIndex((i) => i.title === industry.title);
  const related = [1, 2, 3].map((k) => industries[(idx + k) % industries.length]);
  const own = caseStudies.filter((s) => s.tags.includes(industry.title));
  // This industry's case studies first, topped up to 3 with other recent work.
  const studies = [...own, ...caseStudies.filter((s) => !own.includes(s))].slice(0, 3);
  const svc = (extra?.services ?? services.map((s) => s.slug))
    .map((slug) => services.find((s) => s.slug === slug))
    .filter((s): s is (typeof services)[number] => !!s);
  const faqs = [...(extra?.faqs ?? []), ...GENERAL_FAQS];

  return (
    <DetailReveal>
      {/* 01 Hero & industry introduction */}
      <section className="pd-hero pd-container ix-hero">
        <div className="pd-eyebrow">Industry</div>
        <h1 className="pd-display pd-h1">{industry.title}</h1>
        <p className="ix-hero-intro">{industry.copy}</p>
        <div className="ix-hero-btns">
          <Link href="/contact-us" className="hv2-btn">
            <span className="hv2-btn-label">Start a project</span>
            <span className="hv2-btn-icon"><Arrow /></span>
          </Link>
          <a href="#case-studies" className="hv2-btn hv2-btn--outline">
            <span className="hv2-btn-label">See our work</span>
            <span className="hv2-btn-icon"><Arrow /></span>
          </a>
        </div>
      </section>
      <div className="pd-container">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="pd-img is-large ix-hero-img pd-reveal" src={industry.image} alt={industry.title} />
      </div>

      {/* 02 Industry challenges */}
      <section className="ix-section">
        <div className="pd-container ix-split">
          <div className="pd-reveal">
            <Eyebrow>The challenge</Eyebrow>
            <h2 className="pd-display ix-h2">What makes {industry.title.split(" & ")[0].toLowerCase()} hard</h2>
          </div>
          <div className="pd-reveal">
            <p className="ix-lead">{industry.challenge}</p>
          </div>
        </div>
      </section>

      {/* 03 What we can build */}
      <section className="ix-section">
        <div className="pd-container">
          <div className="ix-head pd-reveal">
            <Eyebrow>What we can build</Eyebrow>
            <h2 className="pd-display ix-h2">Practical solutions</h2>
          </div>
          <div className="ix-cards">
            {industry.solutions.map((s, i) => (
              <article key={s} className="ix-card pd-reveal">
                <div className="ix-num">{String(i + 1).padStart(2, "0")}</div>
                <p>{s}</p>
              </article>
            ))}
          </div>
          <div className="ix-outcomes pd-reveal">
            <div className="ix-outcomes-label">What you get</div>
            <ul>
              {industry.outcomes.map((o) => (
                <li key={o}><Check />{o}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 04 AI use cases */}
      {extra && (
        <section className="ix-dark" data-nav-theme="dark">
          <div className="ix-dark-panel">
            <div className="pd-container">
              <div className="ix-head pd-reveal">
                <Eyebrow>AI use cases</Eyebrow>
                <h2 className="pd-display ix-h2">Where AI makes a difference</h2>
              </div>
              <div className="ix-cards">
                {extra.ai.map((a) => (
                  <article key={a.title} className="ix-card is-dark pd-reveal">
                    <span className="ix-ai-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l1.8 4.6L18.5 9l-4.7 1.4L12 15l-1.8-4.6L5.5 9l4.7-1.4zM18 15l.9 2.1L21 18l-2.1.9L18 21l-.9-2.1L15 18l2.1-.9z" /></svg>
                    </span>
                    <h3 className="ix-card-title">{a.title}</h3>
                    <p>{a.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 05 Compliance & security */}
      {extra && (
        <section className="ix-section">
          <div className="pd-container ix-split">
            <div className="pd-reveal">
              <Eyebrow>Compliance &amp; security</Eyebrow>
              <h2 className="pd-display ix-h2">Built to be trusted</h2>
              <ul className="ix-checklist">
                {SECURITY_BASELINE.map((b) => (
                  <li key={b}><Check />{b}</li>
                ))}
              </ul>
            </div>
            <div className="ix-comp">
              {extra.compliance.map((c) => (
                <div key={c.title} className="ix-comp-item pd-reveal">
                  <h3 className="ix-card-title">{c.title}</h3>
                  <p>{c.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 06 Industry case studies */}
      <section id="case-studies" className="ix-section">
        <div className="pd-container">
          <div className="ix-head ix-head-row pd-reveal">
            <div>
              <Eyebrow>{own.length ? "Case studies" : "Recent work"}</Eyebrow>
              <h2 className="pd-display ix-h2">{own.length ? "Proof from the field" : "Recent projects"}</h2>
            </div>
            <Link href="/case-studies" className="ix-textlink">All case studies <Arrow /></Link>
          </div>
          <div className="ix-cases">
            {studies.map((s) => (
              <Link key={s.slug} href={`/case-studies/${s.slug}`} className="ix-case pd-reveal">
                <span className="ix-case-img">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={s.gridImage || s.image} alt="" loading="lazy" />
                </span>
                <span className="ix-case-tag">{s.tags[0]}</span>
                <span className="ix-case-title">{CASE_STUDY_SHORT_TITLES[s.slug] ?? s.title}</span>
                <span className="ix-case-text">{s.blurb}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 07 Relevant services */}
      <section className="ix-section">
        <div className="pd-container">
          <div className="ix-head pd-reveal">
            <Eyebrow>Relevant services</Eyebrow>
            <h2 className="pd-display ix-h2">How we can help</h2>
          </div>
          <div className="ix-services">
            {svc.map((s, i) => (
              <Link key={s.slug} href={`/services/${s.slug}`} className="ix-service pd-reveal">
                <span className="ix-service-num">{String(i + 1).padStart(2, "0")}</span>
                <span className="ix-service-body">
                  <span className="ix-service-title">{s.title}</span>
                  <span className="ix-service-text">{s.short}</span>
                </span>
                <span className="ix-service-arrow"><Arrow /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 08 FAQs */}
      <section className="ix-section">
        <div className="pd-container ix-split">
          <div className="pd-reveal">
            <Eyebrow>FAQs</Eyebrow>
            <h2 className="pd-display ix-h2">Common questions</h2>
          </div>
          <div className="ix-faqs">
            {faqs.map((f, i) => (
              <details key={f.q} className="ix-faq pd-reveal" open={i === 0}>
                <summary>
                  <span>{f.q}</span>
                  <span className="ix-faq-icon" aria-hidden="true" />
                </summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 09 Related industries */}
      <section className="ix-section ix-related">
        <div className="pd-container">
          <div className="ix-head ix-head-row pd-reveal">
            <div>
              <Eyebrow>Related industries</Eyebrow>
              <h2 className="pd-display ix-h2">Explore more</h2>
            </div>
            <Link href="/industries" className="ix-textlink">All industries <Arrow /></Link>
          </div>
        </div>
        <div className="sc-grid">
          {related.map((ind, i) => (
            <div className="sc-col pd-reveal" key={ind.title}>
              <article className={`sc-card${i % 2 ? " is-bottom" : ""}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="sc-bg" src={ind.image} alt="" loading="lazy" />
                <div className="sc-shade" aria-hidden="true" />
                <div className="sc-body">
                  <h3 className="sc-title">
                    <a href={`/industries/${slugify(ind.title)}`} className="sc-stretch">{ind.title}</a>
                  </h3>
                  <p className="sc-text">{ind.copy}</p>
                </div>
                <div className="sc-btn-wrap">
                  <div className="sc-btn-inner">
                    <span className="sc-btn" aria-hidden="true">
                      <svg viewBox="0 0 13 13"><path d="M4 2.5 8.2 6.5 4 10.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      <svg viewBox="0 0 13 13"><path d="M4 2.5 8.2 6.5 4 10.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </span>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
      </section>

      {/* 10 CTA & enquiry form (same banner as the homepage) */}
      <div className="hv2-page">
        <HomeV2Cta source={`Industry page — ${industry.title}`} />
      </div>
    </DetailReveal>
  );
}
