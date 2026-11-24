"use client";

import { useEffect, useRef } from "react";

// /home-v2 "How We Work". Ported from a client-supplied "AI-native practice"
// section: a vertical timeline whose progress rail fills as you scroll and
// whose steps light up as their dot passes ~65% down the screen. Restyled
// to the /home-v2 branding (Big Shoulders + Wix Madefor Display, #6A449A).

const STEPS = [
  {
    name: "Understand",
    title: "Start with the right context.",
    tags: ["Business goal", "Existing systems", "People & constraints"],
    output: "A problem worth solving.",
  },
  {
    name: "Explore",
    title: "Put AI to work on the possibilities.",
    tags: ["Explore approaches", "Connect knowledge", "Develop the direction"],
    output: "Options you can evaluate.",
  },
  {
    name: "Review",
    title: "Keep engineering judgment in the loop.",
    tags: ["Challenge assumptions", "Review the outputs", "Refine the approach"],
    output: "A considered next step.",
  },
  {
    name: "Build",
    title: "Turn the direction into working software.",
    tags: ["Design the experience", "Engineer the system", "Test and iterate"],
    output: "Move the work forward.",
  },
];

export default function HomeV2HowWeWork() {
  const practiceRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);
  const headRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const practice = practiceRef.current, rail = railRef.current, fill = fillRef.current;
    if (!practice || !rail || !fill) return;
    const steps = Array.from(practice.querySelectorAll<HTMLElement>(".hv2w-step"));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let current = 0, target = 0, ticking = false, raf = 0;

    const tick = () => {
      current += (target - current) * (reduce ? 1 : 0.18); // smooth easing toward target
      if (Math.abs(target - current) < 0.001) current = target;
      fill.style.transform = `scaleY(${current.toFixed(6)})`;
      if (current !== target) raf = requestAnimationFrame(tick);
      else ticking = false;
    };
    const measure = () => {
      const line = window.innerHeight * 0.65; // progress line ~65% down the viewport
      const r = rail.getBoundingClientRect();
      target = Math.min(1, Math.max(0, (line - r.top) / r.height));
      steps.forEach((step) => step.classList.toggle("on", step.getBoundingClientRect().top + 44 < line));
      if (!ticking) {
        ticking = true;
        raf = requestAnimationFrame(tick);
      }
    };
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    measure();

    // Heading slides up into place once (the original's reveal)
    const head = headRef.current;
    let io: IntersectionObserver | null = null;
    if (head) {
      io = new IntersectionObserver(
        (entries) => entries.forEach((e) => e.isIntersecting && (head.classList.add("is-in"), io?.disconnect())),
        { threshold: 0.15 }
      );
      io.observe(head);
    }
    return () => {
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
      cancelAnimationFrame(raf);
      io?.disconnect();
    };
  }, []);

  return (
    <section className="hv2w" aria-labelledby="hv2w-title">
      <div className="hv2w-inner">
        <div ref={headRef} className="hv2w-head">
          <p className="hv2w-label">How We Work</p>
          <h2 id="hv2w-title" className="hv2w-heading">How AI and engineers share the work</h2>
        </div>

        <div ref={practiceRef} className="hv2w-practice">
          <div ref={railRef} className="hv2w-rail" aria-hidden="true">
            <span ref={fillRef} />
          </div>
          <ol className="hv2w-steps">
            {STEPS.map((s) => (
              <li key={s.name} className="hv2w-step">
                <p className="hv2w-name">{s.name}</p>
                <h3>{s.title}</h3>
                <ul>
                  {s.tags.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
                <p className="hv2w-output">
                  <span aria-hidden="true">→</span> {s.output}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
