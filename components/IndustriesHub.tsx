"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { industries, slugify } from "@/lib/data";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// /industries: scroll-revealed card grid (3 per row, card design from the
// supplied service-cards file: photo card, notched corner + round button) of Penaxis's 13 industries and a
// closing CTA. (The hub-and-spoke "Where we work" diagram that used to sit
// above the grid was removed on request.)

export default function IndustriesHub() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      if (prefersReduced) return;
      gsap.set(".sc-col", { opacity: 0, y: 40 });
      gsap.set(".ih-cta-inner", { opacity: 0, y: 40 });

      gsap.to(".sc-col", {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: ".ih-grid", start: "top 85%" },
      });

      gsap.to(".ih-cta-inner", {
        opacity: 1,
        y: 0,
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".ih-cta-section", start: "top 85%" },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef}>
      <section id="all-industries" className="ih-section-grid">
        <div className="ih-grid-head">
          <div className="ih-eyebrow2">All 13, in detail</div>
          <h2 className="section-heading">Every industry we build for.</h2>
        </div>
        <div className="sc-grid ih-grid">
          {industries.map((ind, i) => {
            const href = `/industries/${slugify(ind.title)}`;
            return (
              <div className="sc-col" key={ind.title}>
                <article className={`sc-card${i % 2 ? " is-bottom" : ""}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className="sc-bg" src={ind.image} alt="" loading="lazy" />
                  <div className="sc-shade" aria-hidden="true" />
                  <div className="sc-body">
                    <h3 className="sc-title">
                      <a href={href} className="sc-stretch">
                        {ind.title}
                      </a>
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
            );
          })}
        </div>
      </section>

      <section className="ih-cta-section">
        <div className="ih-cta-inner">
          <div className="ih-cta-tag">START A PROJECT</div>
          <h2 className="section-heading">
            Whatever your industry, <em>we build for it.</em>
          </h2>
          <p>
            13 industries and counting. If yours isn't on the list yet,
            that's usually just because we haven't met you.
          </p>
          <a href="/contact-us" className="ih-cta-btn">
            Start a project
          </a>
        </div>
      </section>
    </div>
  );
}
