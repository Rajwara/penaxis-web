"use client";

import { useEffect, useRef } from "react";
import PillButton from "./PillButton";
import "@fontsource-variable/big-shoulders/opsz.css";
import "@fontsource-variable/wix-madefor-display/index.css";

// /services: "Engagement models" section in the home-v2 style (Big Shoulders
// + Wix Madefor, purple accent, "• label •" eyebrow). Models are the ones
// already listed in lib/data.ts (service `engagements`) and lib/faq.ts
// (pricing & payments answers) — no new commercial claims.

const MODELS = [
  {
    title: "Fixed-price project",
    text: "A defined scope, timeline and price agreed upfront, paid against clear milestones.",
    best: "MVPs, websites and builds with a clear brief",
    points: ["Scope and estimate after a discovery call", "Milestone-based payments", "Handover period included"],
  },
  {
    title: "Time & materials",
    text: "You pay for the time we spend, so the scope can change as you learn what users need.",
    best: "Evolving products, integrations and new features",
    points: ["Flexible scope, priorities set together", "Clear reporting on time spent", "Scale effort up or down"],
  },
  {
    title: "Dedicated team",
    text: "A project lead, engineers and a designer working as an extension of your own team.",
    best: "Long-running products and platforms",
    points: ["A team matched to your project", "Backed by our wider specialists", "Recurring monthly billing"],
  },
  {
    title: "Monthly retainer",
    text: "Ongoing support, improvements and growth work after launch, for a recurring monthly fee.",
    best: "Post-launch support, growth and sales",
    points: ["Maintenance and continuous improvement", "Sales & BD: retainer plus commission", "Agreed upfront, no hidden fees"],
  },
];

function Check() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8.5l3 3 7-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function EngagementModels() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    root.classList.add("em-js");
    const els = Array.from(root.querySelectorAll<HTMLElement>("[data-em-anim]"));
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
    return () => io.disconnect();
  }, []);

  return (
    <section ref={rootRef} className="em-section" aria-labelledby="em-title">
      <div className="em-container">
        <div className="em-head" data-em-anim>
          <div>
            <div className="em-sub">
              <span className="em-dot is-start" />
              <span className="em-sub-mask">
                <span className="em-sub-track">
                  <span>Engagement models</span>
                  <span className="em-dot is-end" />
                </span>
              </span>
            </div>
            <h2 id="em-title" className="em-title">Ways to work with us</h2>
          </div>
          <p className="em-intro">
            Every project is different, so we offer a few clear ways to work together. We&apos;ll recommend the right
            fit after a short discovery call and agree everything upfront.
          </p>
        </div>

        <div className="em-grid" data-em-anim>
          {MODELS.map((m, i) => (
            <article key={m.title} className="em-card" style={{ ["--d" as string]: `${(i * 0.1).toFixed(1)}s` } as React.CSSProperties}>
              <div className="em-num">{String(i + 1).padStart(2, "0")}</div>
              <h3 className="em-card-title">{m.title}</h3>
              <p className="em-card-text">{m.text}</p>
              <ul className="em-points">
                {m.points.map((p) => (
                  <li key={p}>
                    <Check />
                    {p}
                  </li>
                ))}
              </ul>
              <div className="em-best">
                <span>Best for</span>
                {m.best}
              </div>
            </article>
          ))}
        </div>

        <div className="em-foot" data-em-anim>
          <p>Not sure which model fits? Tell us about your project and we&apos;ll suggest one.</p>
          <PillButton href="/contact-us" label="Book a discovery call" variant="light" />
        </div>
      </div>
    </section>
  );
}
