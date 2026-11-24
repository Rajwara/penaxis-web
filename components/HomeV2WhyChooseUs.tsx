import Reveal from "./Reveal";

// /home-v2 "Why Choose Us": side label + heading/intro/CTA on top, then a
// row of three cards — a headline stat, a photo card, and a client quote.
// Copy comes from Penaxis's real stats, whyUs points and testimonials.

const CLIENTS = [
  { src: "/images/team/zohaib-khalid.webp" },
  { src: "/images/team/malih.webp" },
  { src: "/images/team/amar-jeet.webp" },
];

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

export default function HomeV2WhyChooseUs() {
  return (
    <section className="hv2-why" aria-labelledby="hv2-why-title">
      <div className="hv2-why-inner">
        <div className="hv2-why-top">
          <Reveal>
            <p className="hv2-why-label">/ Why Choose Us</p>
          </Reveal>

          <div className="hv2-why-intro">
            <Reveal delay={0.05}>
              <h2 id="hv2-why-title" className="section-heading hv2-why-heading">
                We Help Businesses Grow With Clarity And Build What Comes Next
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="hv2-why-copy">
                Penaxis combines AI, software development, digital strategy, and sales expertise
                to help businesses operate smarter and grow faster. From websites and CRMs to MVPs
                and sales pipelines, we focus on outcomes that matter: leads, sales, and measurable
                growth.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <a href="/who-we-are" className="hv2-btn">
                Our Approach
                <span className="hv2-btn-icon">
                  <ArrowIcon />
                </span>
              </a>
            </Reveal>
          </div>
        </div>

        <div className="hv2-why-cards">
          {/* 1 — headline stat */}
          <Reveal delay={0} className="hv2-card hv2-card--stat">
            <div>
              <div className="hv2-stat-value">100%</div>
              <div className="hv2-stat-label">Milestones delivered on time</div>
            </div>
            <p className="hv2-stat-foot">
              We measure our success by the outcomes we deliver and the confidence our clients
              have in every launch.
            </p>
          </Reveal>

          {/* 2 — photo card */}
          <Reveal delay={0.08} className="hv2-card hv2-card--photo">
            <img className="hv2-photo-bg" src="/images/hero/team-huddle.jpg" alt="The Penaxis team working together" loading="lazy" />
            <div className="hv2-photo-shade" aria-hidden="true" />
            <img className="hv2-photo-logo" src="/images/logo/penaxis-logo-white.png" alt="Penaxis" />
            <div className="hv2-photo-text">
              <h3>A smarter way to build and grow</h3>
              <p>Strategy, design, technology and growth, delivered by one team.</p>
            </div>
          </Reveal>

          {/* 3 — client quote */}
          <Reveal delay={0.16} className="hv2-card hv2-card--quote">
            <div className="hv2-quote-head">
              <div className="hv2-avatars hv2-avatars--sm" aria-hidden="true">
                {CLIENTS.map((c) => (
                  <img key={c.src} src={c.src} alt="" />
                ))}
              </div>
              <span className="hv2-quote-stat">12+ industries</span>
            </div>
            <p className="hv2-quote-trust">Trusted by founders and teams across 10+ markets</p>

            <blockquote className="hv2-quote-text">
              &ldquo;Penaxis has been a great extension of our team. They&apos;ve supported us with
              software development when we needed extra resources.&rdquo;
            </blockquote>
            <div className="hv2-quote-author">
              <img src="/images/team/malih.webp" alt="" />
              <div>
                <div className="hv2-quote-name">Rohail Malih</div>
                <div className="hv2-quote-role">CTO, Oktabytes</div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
