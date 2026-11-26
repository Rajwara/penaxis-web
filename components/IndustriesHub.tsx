"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { industries, slugify } from "@/lib/data";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// /industries: scroll-revealed card grid of Penaxis's 13 industries and a
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
      gsap.set(".ih-card", { opacity: 0, y: 40 });
      gsap.set(".ih-cta-inner", { opacity: 0, y: 40 });

      gsap.to(".ih-card", {
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
        <div className="ih-grid">
          {industries.map((ind) => (
            <article className="ih-card" key={ind.title}>
              <div className="ih-card-media">
                <img src={ind.image} alt="" />
              </div>
              <div className="ih-card-body">
                <h3>{ind.title}</h3>
                <p>{ind.copy}</p>
                <a href={`/industries/${slugify(ind.title)}`} className="ih-card-link">
                  Learn More
                </a>
              </div>
            </article>
          ))}
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
