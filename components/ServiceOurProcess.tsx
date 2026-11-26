"use client";

import { useEffect, useRef, useState } from "react";

// Single service page "Our process" (after Why us): five numbered steps on
// a timeline whose purple line draws across as the section scrolls into
// view; steps light up one after another. Vertical on phones.

const STEPS = [
  { title: "Discover", text: "We learn your goals, users and constraints through a focused discovery call and workshop." },
  { title: "Define", text: "We align business goals with user needs and agree scope, priorities and milestones." },
  { title: "Design", text: "We map journeys and design the experience, validating ideas with you before we build." },
  { title: "Build & test", text: "We develop in short iterations with regular demos, testing quality at every step." },
  { title: "Launch & grow", text: "We launch, measure and keep improving, with support and growth built into the plan." },
];

export default function ServiceOurProcess() {
  const ref = useRef<HTMLElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return setOn(true);
    const io = new IntersectionObserver((es) => {
      if (es.some((e) => e.isIntersecting)) {
        setOn(true);
        io.disconnect();
      }
    }, { rootMargin: "0px 0px -25% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} className={`spr${on ? " is-on" : ""}`} aria-labelledby="spr-title">
      <div className="spr-container">
        <div className="spr-head">
          <span className="spr-eyebrow">Our process</span>
          <h2 id="spr-title" className="spr-title">Transforming visions into reality by aligning goals with user needs</h2>
        </div>
        <ol className="spr-steps">
          <span className="spr-line" aria-hidden="true"><span /></span>
          {STEPS.map((s, i) => (
            <li key={s.title} className="spr-step" style={{ ["--d" as string]: `${0.25 + i * 0.18}s` } as React.CSSProperties}>
              <span className="spr-dot">{String(i + 1).padStart(2, "0")}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
