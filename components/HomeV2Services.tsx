"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { services } from "@/lib/data";

// /home-v2 services list. Ported from a client-supplied "Creative Portfolio"
// section (static HTML/CSS/JS) and filled with Penaxis's real services data:
// dark inset panel, animated eyebrow + top rule, letter-by-letter heading
// reveal, and a list of rows where the hovered row "opens" its image,
// brightens its number and fills its arrow. Restyled to the site standard
// (Inter Tight, #FC6607 accent, 50px/600 section heading).

const HEADING = "Services Built For Growth";

function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
      <path d="M18.256 23.076l-0.944-0.959 5.451-5.451h-16.097v-1.333h16.097l-5.451-5.451 0.944-0.959 7.077 7.077-7.077 7.077z" />
    </svg>
  );
}

export default function HomeV2Services() {
  const rootRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  // Scroll-in animations: add .in-view once each target enters the viewport.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    root.classList.add("hv2s-js");
    const targets = root.querySelectorAll("[data-anim]");
    if (!("IntersectionObserver" in window)) {
      targets.forEach((t) => t.classList.add("in-view"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in-view");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  let letterIndex = 0;

  return (
    <section ref={rootRef} className="hv2s-wrap" data-nav-theme="dark" aria-labelledby="hv2s-title">
      <div className="hv2s-inner">
        <div className="hv2s-container">
          {/* Top bar: eyebrow + "View all services" */}
          <div className="hv2s-top">
            <div className="hv2s-sub" data-anim>
              <span className="hv2s-dot is-start" />
              <span className="hv2s-sub-mask">
                <span className="hv2s-sub-track">
                  <span>Our Services</span>
                  <span className="hv2s-dot is-end" />
                </span>
              </span>
            </div>

            <a href="/services" className="hv2s-link">
              <span className="hv2s-link-clip">
                <span className="hv2s-link-inner">
                  View all services
                  <Arrow className="hv2s-link-icon" />
                </span>
                <span className="hv2s-link-inner is-hover" aria-hidden="true">
                  View all services
                  <Arrow className="hv2s-link-icon" />
                </span>
              </span>
            </a>

            <div className="hv2s-top-line" data-anim aria-hidden="true" />
          </div>

          {/* Heading + description */}
          <div className="hv2s-head">
            <h2 id="hv2s-title" className="section-heading hv2s-heading" data-anim aria-label={HEADING}>
              {HEADING.split(" ").map((word, w) => (
                <Fragment key={w}>
                  {w > 0 && " "}
                  <span className="hv2s-word" aria-hidden="true">
                    {[...word].map((ch, c) => (
                      <span key={c} className="hv2s-letter" style={{ ["--i" as string]: letterIndex++ }}>
                        {ch}
                      </span>
                    ))}
                  </span>
                </Fragment>
              ))}
            </h2>
            <p className="hv2s-desc" data-anim>
              From AI-powered MVPs to fractional sales support, everything you need to launch,
              scale and grow, under one team.
            </p>
          </div>

          {/* Service rows */}
          <div className="hv2s-list">
            {services.map((s, i) => (
              <a
                key={s.slug}
                href={`/services/${s.slug}`}
                className={`hv2s-row${active === i ? " is-active" : ""}`}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                data-anim
              >
                <div className="hv2s-media">
                  <img className="hv2s-img" src={s.heroImage} alt="" />
                </div>
                <div className="hv2s-body">
                  <div className="hv2s-info">
                    <div className="hv2s-num">{s.number}</div>
                    <h3 className="hv2s-title">{s.title}</h3>
                    <p className="hv2s-short">{s.short}</p>
                  </div>
                  <div className="hv2s-bottom">
                    <span className="hv2s-arrow">
                      <Arrow className="hv2s-arrow-icon" />
                    </span>
                    <div className="hv2s-tags">
                      {s.pillars.map((p) => (
                        <span key={p.title} className="hv2s-tag">
                          {p.title}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
