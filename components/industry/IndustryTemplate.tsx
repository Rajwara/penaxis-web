import Link from "next/link";
import DetailReveal from "@/components/detail/DetailReveal";
import HomeV2Cta from "@/components/HomeV2Cta";
import IndustryFaq from "./IndustryFaq";
import { caseStudies, industries, services, slugify } from "@/lib/data";
import { CASE_STUDY_SHORT_TITLES } from "@/lib/caseStudyCards";
import { GENERAL_FAQS, INDUSTRY_EXTRAS, SECURITY_BASELINE } from "@/lib/industryExtras";
import "@fontsource-variable/big-shoulders/opsz.css";
import "@fontsource-variable/wix-madefor-display/index.css";

// Single industry page. The 11 sections (01 hero, 02 challenges, 03 what
// we can build, 04 AI use cases, 05 compliance & security, 06 case
// studies, 07 services, 08 FAQs, 09 related industries, 10 CTA & form,
// 11 footer) laid out like the supplied "neuro" home layout: dark hero
// with an image collage, dark about block with a big outlined word,
// features grid, mock-app + numbered steps, rotated marquee ribbons,
// dark boxed gallery, numbered FAQ rows and blog-style cards. Penaxis
// fonts and purple instead of the template's fonts and blue/red.
// Styles: .nx-* in app/globals.css.

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
  <path key="a" d="M4 5h16v11H4zM8 20h8M12 16v4" />,
  <path key="b" d="M12 3l8 4v6c0 4-3.5 7-8 8-4.5-1-8-4-8-8V7z" />,
  <path key="c" d="M4 19V9M10 19V5M16 19v-7M22 19H2" />,
  <path key="d" d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM16.5 13v7M13 16.5h7" />,
  <path key="e" d="M12 3a9 9 0 1 0 9 9M12 7v5l3 3M21 3l-6 6" />,
  <path key="f" d="M3 12h4l3-8 4 16 3-8h4" />,
];

function Icon({ i }: { i: number }) {
  return (
    <span className="nx-ico">
      <svg viewBox="0 0 24 24" aria-hidden="true">{ICONS[i % ICONS.length]}</svg>
    </span>
  );
}

export default function IndustryTemplate({ industry }: { industry: Industry }) {
  const extra = INDUSTRY_EXTRAS[industry.title];
  const idx = industries.findIndex((i) => i.title === industry.title);
  const related = [1, 2, 3, 4, 5, 6].map((k) => industries[(idx + k) % industries.length]);
  const own = caseStudies.filter((s) => s.tags.includes(industry.title));
  const studies = [...own, ...caseStudies.filter((s) => !own.includes(s))].slice(0, 2);
  const svc = (extra?.services ?? services.map((s) => s.slug))
    .map((slug) => services.find((s) => s.slug === slug))
    .filter((s): s is (typeof services)[number] => !!s);
  const faqs = [...(extra?.faqs ?? []), ...GENERAL_FAQS];
  const word = industry.title.split(/[ ,&]/)[0];
  // Big centre tile (t2) = this industry; the rest = neighbouring industries.
  const near = [1, 2, 3, 4, 5].map((k) => industries[(idx + k) % industries.length].image);
  const collage = [near[0], industry.image, ...near.slice(1)];
  const mockImage = studies[0]?.gridImage || studies[0]?.image || industry.image;
  const ribbon = `${industry.title} / AI / Software / Growth / `.repeat(4);

  return (
    <DetailReveal>
      <div className="nx">
        {/* 01 Hero & industry introduction */}
        <section className="nx-hero" data-nav-theme="dark">
          <div className="nx-collage" aria-hidden="true">
            {collage.map((src, i) => (
              <div key={i} className={`nx-tile nx-t${i + 1}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="" />
              </div>
            ))}
          </div>
          <div className="nx-hero-content">
            <Label>industry</Label>
            <h1 className="nx-h1">{industry.title}</h1>
            <p>{industry.copy} We design, build and grow the software that makes it work.</p>
            <div className="nx-hero-cta">
              <Link href="/contact-us" className="nx-hero-btn is-solid">Start a project ➚</Link>
              <a href="#case-studies" className="nx-hero-btn">See our work</a>
            </div>
          </div>
        </section>

        {/* 02 Industry challenges (dark "about" block) */}
        <section className="nx-about" data-nav-theme="dark">
          <span className="nx-blob" style={{ width: 520, height: 520, left: -200, top: 150 }} />
          <span className="nx-blob" style={{ width: 300, height: 300, left: 380, top: 160 }} />
          <span className="nx-blob" style={{ width: 420, height: 420, left: 40, top: 480 }} />
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
                  <text x="0" y="150" fontSize="190" letterSpacing="-4" fill="none" stroke="url(#nx-og)" strokeWidth="1.4" textLength={word.length > 6 ? 560 : undefined} lengthAdjust="spacingAndGlyphs">
                    {word.toUpperCase()}
                  </text>
                </svg>
              </div>
            </div>
            <div className="nx-grid2 nx-about-row">
              <div className="nx-big-logo" aria-hidden="true">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/logo/penaxis-mark.png" alt="" />
              </div>
              <div className="pd-reveal">
                <Label>the challenge</Label>
                <h2 className="nx-h2">What makes {industry.title.split(" & ")[0].toLowerCase()} hard</h2>
                <div className="nx-copy">
                  <p>{industry.challenge}</p>
                  <Btn href="/contact-us" light>Talk to us</Btn>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 03 What we can build (features grid) */}
        <section className="nx-features nx-lines">
          <svg className="nx-waves" viewBox="0 0 760 300" fill="none" stroke="#b9a9d1" strokeWidth=".6" aria-hidden="true">
            {Array.from({ length: 34 }, (_, i) => {
              const o = i * 4;
              return <path key={i} d={`M${o} 0 C${120 + o} ${180 + o / 2} ${220 + o} ${140 + o} ${330 + o / 2} ${140 + o} S${520 - o / 2} ${260 - o} ${700 - o} 0`} />;
            })}
          </svg>
          <div className="nx-container">
            <div className="pd-reveal">
              <Label>what we can build</Label>
              <h2 className="nx-h2 nx-features-h2">Practical solutions for {industry.title}</h2>
            </div>
            <div className="nx-fgrid">
              {industry.solutions.map((s, i) => (
                <div key={s} className="pd-reveal">
                  <h5>Solution {String(i + 1).padStart(2, "0")}</h5>
                  <p>{s}</p>
                  <Icon i={i} />
                </div>
              ))}
              {industry.outcomes.map((o, i) => (
                <div key={o} className="pd-reveal">
                  <h5>Outcome {String(i + 1).padStart(2, "0")}</h5>
                  <p>{o}</p>
                  <Icon i={i + 3} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 04 AI use cases (mock app + numbered steps) */}
        {extra && (
          <section className="nx-how nx-lines">
            <div className="nx-container">
              <div className="nx-grid2 nx-how-grid">
                <div className="nx-mock-wrap pd-reveal" aria-hidden="true">
                  <div className="nx-mock">
                    <aside>
                      <small>GENERAL</small>
                      <div>⌕ Search</div>
                      <div>▭ Reports</div>
                      <small>AI TOOLS</small>
                      {extra.ai.map((a, i) => (
                        <div key={a.title} className={i === 0 ? "on" : ""}>
                          <i /> {a.title}
                        </div>
                      ))}
                      <div className="nx-mock-muted">⊕ Add workflow</div>
                    </aside>
                    <main>
                      <h6>{industry.title}</h6>
                      <span className="nx-mock-sub">AI assistant workspace</span>
                      <div className="nx-mock-tabs"><span>▲ Studio</span><span>◯ Chat</span><span>▭ Library</span></div>
                      <div className="nx-mock-ttl">‹ &nbsp;{extra.ai[0].title} <span>AI</span></div>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={mockImage} alt="" />
                    </main>
                  </div>
                </div>
                <div className="pd-reveal">
                  <Label>AI use cases</Label>
                  <h2 className="nx-h2">Where AI makes a difference</h2>
                  <p className="nx-intro">Practical AI, built into the tools your team and customers already use, with people staying in control of every decision.</p>
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

        {/* Marquee ribbons */}
        <div className="nx-marquee" aria-hidden="true">
          <div className="nx-ribbon nx-r1"><div className="nx-track">{ribbon}{ribbon}</div></div>
          <div className="nx-ribbon nx-r2"><div className="nx-track">{ribbon}{ribbon}</div></div>
        </div>

        {/* 05 Compliance & security */}
        {extra && (
          <section className="nx-comp nx-lines">
            <div className="nx-container">
              <div className="nx-comp-top">
                <div className="pd-reveal">
                  <Label>compliance &amp; security</Label>
                  <h2 className="nx-h2">Built to be trusted</h2>
                </div>
                <ul className="nx-check pd-reveal">
                  {SECURITY_BASELINE.map((b) => <li key={b}>{b}</li>)}
                </ul>
              </div>
              <div className="nx-comp-grid">
                {extra.compliance.map((c, i) => (
                  <div key={c.title} className="nx-comp-card pd-reveal">
                    <Icon i={i + 1} />
                    <h5>{c.title}</h5>
                    <p>{c.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 06 Industry case studies (blog-style cards) */}
        <section id="case-studies" className="nx-blog nx-lines">
          <div className="nx-container">
            <div className="nx-blog-top pd-reveal">
              <div>
                <Label>{own.length ? "case studies" : "recent work"}</Label>
                <h2 className="nx-h2">Proof from real projects we&apos;ve delivered</h2>
              </div>
              <Btn href="/case-studies">All case studies</Btn>
            </div>
            <div className="nx-posts">
              {studies.map((s) => (
                <Link key={s.slug} href={`/case-studies/${s.slug}`} className="nx-post pd-reveal">
                  <span className="nx-post-media">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={s.gridImage || s.image} alt="" loading="lazy" />
                    <span className="nx-post-date">{s.region} / {s.status === "delivered" ? "Delivered" : "Concept"}</span>
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

        {/* 07 Relevant services (features-style row) */}
        <section className="nx-services nx-lines">
          <div className="nx-container">
            <div className="pd-reveal">
              <Label>relevant services</Label>
              <h2 className="nx-h2 nx-features-h2">How we can help you build it</h2>
            </div>
            <div className="nx-fgrid nx-fgrid-3">
              {svc.map((s, i) => (
                <Link key={s.slug} href={`/services/${s.slug}`} className="nx-svc pd-reveal">
                  <h5>{s.title}</h5>
                  <p>{s.short}</p>
                  <span className="nx-svc-foot">
                    <Icon i={i} />
                    <span className="nx-svc-more">Learn more ❯</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 08 FAQs (numbered rows) */}
        <section className="nx-faq nx-boxed">
          <div className="nx-faq-head pd-reveal">
            <Label>faq</Label>
            <h2 className="nx-h2">Everything you need to know</h2>
          </div>
          <IndustryFaq items={faqs} />
          <div className="nx-faq-btn">
            <Btn href="/faqs">All FAQs</Btn>
          </div>
        </section>

        {/* 09 Related industries (dark boxed gallery) */}
        <section className="nx-gallery nx-boxed" data-nav-theme="dark">
          <div className="nx-gallery-head pd-reveal">
            <Label>related industries</Label>
            <h2 className="nx-h2">Explore more industries we build for</h2>
          </div>
          <div className="nx-masonry">
            {related.map((ind, i) => (
              <Link key={ind.title} href={`/industries/${slugify(ind.title)}`} className={`nx-mtile pd-reveal${i % 3 === 1 ? " is-tall" : ""}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={ind.image} alt="" loading="lazy" />
                <span className="nx-mtile-cap">{ind.title} ➚</span>
              </Link>
            ))}
          </div>
          <div className="nx-center">
            <Btn href="/industries" light>All industries</Btn>
          </div>
        </section>
      </div>

      {/* 10 CTA & enquiry form (same as the homepage) */}
      <div className="hv2-page nx-cta-wrap">
        <HomeV2Cta source={`Industry page — ${industry.title}`} />
      </div>
    </DetailReveal>
  );
}
