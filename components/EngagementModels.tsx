"use client";

import { useEffect, useRef } from "react";
import "@fontsource-variable/big-shoulders/opsz.css";
import "@fontsource-variable/wix-madefor-display/index.css";

// /services: "Engagement models", laid out like the supplied reference:
// dark section, label pill, big heading and two cards (tag pill, title,
// one line, three ticked points, link). The two models are the ones the
// site already describes (lib/faq.ts: defined projects, or our team kept
// on as an extension of yours) — no new commercial claims.

const MODELS = [
  {
    tag: "Defined scope",
    title: "Project-based engagement",
    text: "A delivery team built around one product or system, with a clear plan from start to launch.",
    points: [
      "Scope, milestones and deliverables agreed upfront",
      "A team put together for your project",
      "Milestone-based payments and a handover period",
    ],
    link: { label: "Start a project", href: "/contact-us" },
  },
  {
    tag: "Dedicated team",
    title: "Team as a Service",
    text: "A dedicated Penaxis team that joins your roadmap and works the way you do.",
    points: [
      "Engineers, designers and a project lead on your product",
      "Scale the team up or down as priorities change",
      "Works inside your tools, rituals and processes",
    ],
    link: { label: "Build your team", href: "/contact-us" },
  },
];

function Check() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <circle cx="10" cy="10" r="10" fill="currentColor" />
      <path d="M6 10.2l2.6 2.6L14 7.6" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 17 17 7M8 7h9v9" />
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
    <section ref={rootRef} className="em-section" data-nav-theme="dark" aria-labelledby="em-title">
      <div className="em-panel">
        <div className="em-container">
          <div className="em-head" data-em-anim>
            <span className="em-pill">Engagement models</span>
            <h2 id="em-title" className="em-title">Choose how we work together</h2>
          </div>

          <div className="em-grid" data-em-anim>
            {MODELS.map((m, i) => (
              <article key={m.title} className="em-card" style={{ ["--d" as string]: `${(i * 0.12).toFixed(2)}s` } as React.CSSProperties}>
                <span className="em-tag">{m.tag}</span>
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
                <a href={m.link.href} className="em-link">
                  {m.link.label}
                  <Arrow />
                </a>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
