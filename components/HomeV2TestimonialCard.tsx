"use client";

import { useEffect, useState } from "react";
import { testimonials } from "@/lib/data";

// Auto-sliding client testimonials for the /home-v2 Why Choose Us card.
// Real testimonials (same ones used elsewhere on the site). Slides every
// 5s, pauses while hovered, and the dots let visitors jump to a quote.

const TESTIMONIALS = testimonials;

const INTERVAL = 5000;

export default function HomeV2TestimonialCard() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setTimeout(() => setIndex((i) => (i + 1) % TESTIMONIALS.length), INTERVAL);
    return () => clearTimeout(id);
  }, [index, paused]);

  return (
    <div
      className="hv2-tst"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Client testimonials"
    >
      <div className="hv2-tst-top">
        <span className="hv2-tst-label">Client testimonials</span>
        <svg className="hv2-tst-mark" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
          <path d="M9.3 25.5c-2.4 0-4.3-.8-5.6-2.3C2.4 21.7 1.7 19.7 1.7 17.2c0-2.7.8-5.3 2.4-7.7 1.6-2.4 3.9-4.4 7-6L12.6 6c-1.8 1-3.3 2.2-4.4 3.6-1.1 1.4-1.6 2.8-1.6 4.2 0 .6.2 1 .5 1.3.3.3.9.6 1.7.8 1.7.5 3 1.2 3.7 2.1.8.9 1.2 2 1.2 3.4 0 1.3-.5 2.3-1.4 3-.9.8-1.9 1.1-3 1.1zm16.8 0c-2.4 0-4.3-.8-5.6-2.3-1.3-1.5-2-3.5-2-6 0-2.7.8-5.3 2.4-7.7 1.6-2.4 3.9-4.4 7-6L29.4 6c-1.8 1-3.3 2.2-4.4 3.6-1.1 1.4-1.6 2.8-1.6 4.2 0 .6.2 1 .5 1.3.3.3.9.6 1.7.8 1.7.5 3 1.2 3.7 2.1.8.9 1.2 2 1.2 3.4 0 1.3-.5 2.3-1.4 3-.9.8-1.9 1.1-3 1.1z" />
        </svg>
      </div>

      <div className="hv2-tst-slides">
        {TESTIMONIALS.map((t, i) => (
          <figure
            key={t.name}
            className={`hv2-tst-slide${i === index ? " is-active" : ""}`}
            aria-hidden={i !== index}
          >
            <blockquote className="hv2-tst-quote">&ldquo;{t.quote}&rdquo;</blockquote>
            <figcaption className="hv2-quote-author">
              <img src={t.image} alt="" />
              <div>
                <div className="hv2-quote-name">{t.name}</div>
                <div className="hv2-quote-role">{t.role}</div>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="hv2-tst-dots">
        {TESTIMONIALS.map((t, i) => (
          <button
            key={t.name}
            type="button"
            className={`hv2-tst-dot${i === index ? " is-active" : ""}`}
            aria-label={`Show testimonial from ${t.name}`}
            aria-current={i === index}
            onClick={() => setIndex(i)}
          >
            {i === index && !paused && <span className="hv2-tst-progress" style={{ animationDuration: `${INTERVAL}ms` }} key={index} />}
          </button>
        ))}
      </div>
    </div>
  );
}
