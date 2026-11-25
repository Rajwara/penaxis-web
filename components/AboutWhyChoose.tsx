"use client";

import { useEffect, useRef } from "react";
import "@fontsource-variable/big-shoulders/opsz.css";
import "@fontsource-variable/wix-madefor-display/index.css";

// About page "Why choose us", ported as-is from the supplied
// why-choose-us-section template: animated eyebrow, scroll-scrubbed title,
// rolling-label button, lead text, two big stats sliding in from the left,
// and a round image with a spinning text badge sliding in from the right.
// Penaxis facts instead of the template's (stats from lib/data.ts `stats`),
// Penaxis mark in the badge, purple accent.
// TEMP IMAGE: template photo from its own CDN (MEDIA_IMG) — replace later.

const MEDIA_IMG = "https://cdn.prod.website-files.com/6ae1b423d7bb90956e94a0c5/6aeae122c3847ced88bb43a7_about-img5.webp";
const TITLE = "Growth powered by AI & technology";
const BADGE = "STRATEGY • DESIGN • TECHNOLOGY • GROWTH •";

const STATS = [
  { num: "50+", label: "Platforms launched", text: "Websites, platforms and CRMs shipped for clients across 12+ industries." },
  { num: "100%", label: "Milestones on time", text: "Clear scopes, fast feedback and delivery you can plan around." },
];

const clamp = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

function BtnArrow() {
  return (
    <span className="wc-btn-icon">
      <svg fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
        <path d="M18.256 23.076l-.944-.959 5.451-5.451H6.666v-1.333h16.097l-5.451-5.451.944-.959 7.077 7.077z" />
      </svg>
    </span>
  );
}

export default function AboutWhyChoose() {
  const rootRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    root.classList.add("wc-js");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const els = Array.from(root.querySelectorAll<HTMLElement>("[data-wc-anim]"));
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { rootMargin: "0px 0px -15% 0px" }
    );
    els.forEach((el) => io.observe(el));

    const chars = Array.from(titleRef.current?.querySelectorAll<HTMLElement>(".c") ?? []);
    let cur = 0;
    let raf = 0;
    const tick = () => {
      const t = titleRef.current;
      if (t && chars.length) {
        const vh = window.innerHeight;
        const b = t.getBoundingClientRect();
        const target = reduce ? 1 : clamp((vh * 0.85 - b.top) / (vh * 0.45 + b.height));
        cur += (target - cur) * 0.12;
        const n = chars.length, d = 0.2662, s = 0.05324, tt = cur * (d + (n - 1) * s);
        for (let i = 0; i < n; i++) {
          const p = clamp((tt - i * s) / d);
          chars[i].style.opacity = String(0.3 + 0.7 * p);
          chars[i].style.transform = `translateX(${(10 * (1 - p)).toFixed(2)}px)`;
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={rootRef} className="wc-section" aria-labelledby="wc-title">
      <div className="wc-container">
        <div className="wc-head-split">
          <div className="wc-head">
            <div className="wc-sub" data-wc-anim>
              <span className="wc-sub-dot is-start" />
              <span className="wc-sub-mask">
                <span className="wc-sub-track">
                  <span>Why choose us</span>
                  <span className="wc-sub-dot is-end" />
                </span>
              </span>
            </div>
            <h2 ref={titleRef} id="wc-title" className="wc-title" aria-label={TITLE}>
              {TITLE.split(" ").map((w, wi) => (
                <span key={wi}>
                  {wi > 0 && " "}
                  <span className="w" aria-hidden="true">
                    {[...w].map((ch, ci) => (
                      <span key={ci} className="c">
                        {ch}
                      </span>
                    ))}
                  </span>
                </span>
              ))}
            </h2>
          </div>

          <a href="/careers" className="wc-btn">
            <span className="wc-btn-fill" />
            <span className="wc-btn-clip">
              <span className="wc-btn-inner">
                <span>Join us now</span>
                <BtnArrow />
              </span>
              <span className="wc-btn-inner is-hover" aria-hidden="true">
                <span>Join us now</span>
                <BtnArrow />
              </span>
            </span>
          </a>
        </div>

        <div className="wc-grid" data-wc-anim>
          <div>
            <p className="wc-lead">
              Penaxis combines AI, software development, digital strategy and sales expertise to help
              businesses operate smarter, win trust and grow faster.
            </p>
            <div className="wc-stats">
              {STATS.map((s) => (
                <div key={s.label} className="wc-stat">
                  <div className="wc-stat-num">{s.num}</div>
                  <div className="wc-stat-label">{s.label}</div>
                  <p>{s.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="wc-media">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={MEDIA_IMG} alt="" loading="lazy" />
            <div className="wc-badge">
              <div className="wc-badge-ring">
                <svg viewBox="0 0 160 160" fill="currentColor" role="img" aria-label="Strategy, design, technology, growth">
                  <defs>
                    <path id="wc-badge-path" d="M80 80 m-62 0 a62 62 0 1 1 124 0 a62 62 0 1 1 -124 0" />
                  </defs>
                  <text fontSize="13" fontWeight="600" letterSpacing="3">
                    <textPath href="#wc-badge-path" textLength="382">
                      {BADGE}
                    </textPath>
                  </text>
                </svg>
              </div>
              <div className="wc-badge-icon">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/logo/penaxis-mark.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
