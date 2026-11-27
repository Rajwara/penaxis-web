"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import EngagementModal from "./engagement/EngagementModal";
import { isEngagementModel, type EngagementModel } from "@/lib/engagementForms";
import "@fontsource-variable/big-shoulders/opsz.css";
import "@fontsource-variable/wix-madefor-display/index.css";

// /services: "Engagement models": dark section, label pill, big heading and
// three cards (Project / Hourly / Team as a Service) from the engagement
// forms spec. Each CTA links to /get-started/<model>; on this page a plain
// click opens the same 3-step enquiry form in a modal instead (the address
// bar shows the form's URL while it's open, so Back closes it).

const MODELS: { model: EngagementModel; tag: string; title: string; text: string; points: string[]; cta: string }[] = [
  {
    model: "project",
    tag: "Defined scope",
    title: "Project-based engagement",
    text: "A structured engagement built around clear objectives, defined deliverables and agreed milestones.",
    points: [
      "Scope, timelines and deliverables agreed upfront",
      "Dedicated specialists aligned with your project",
      "Milestone-based payments and structured handover",
    ],
    cta: "Start a project",
  },
  {
    model: "hourly",
    tag: "Flexible engagement",
    title: "Hourly-based engagement",
    text: "Access specialised expertise on demand, with the flexibility to adapt as your requirements evolve.",
    points: [
      "Pay for the hours and expertise you need",
      "Flexible scope and evolving priorities",
      "Transparent time tracking and reporting",
    ],
    cta: "Hire on demand",
  },
  {
    model: "dedicated-team",
    tag: "Dedicated resources",
    title: "Team as a Service",
    text: "A dedicated extension of your business, combining the right talent and expertise to support your long-term goals.",
    points: [
      "Dedicated engineering, design and growth specialists",
      "Scale your team as business priorities evolve",
      "Seamless integration with your tools and workflows",
    ],
    cta: "Build your team",
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
  const [open, setOpen] = useState<EngagementModel | null>(null);
  const pushed = useRef(false);

  const openModel = (e: React.MouseEvent, m: EngagementModel) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return; // new tab etc.: follow the link
    e.preventDefault();
    try {
      sessionStorage.setItem("penaxis-engagement-origin", window.location.href); // real source page + UTM, for the enquiry
    } catch {}
    window.history.pushState({ engagement: m }, "", `/get-started/${m}`);
    pushed.current = true;
    setOpen(m);
  };

  const close = useCallback(() => {
    setOpen(null);
    if (pushed.current) {
      pushed.current = false;
      window.history.back();
    }
  }, []);

  useEffect(() => {
    const onPop = (e: PopStateEvent) => {
      const m = (e.state as { engagement?: string } | null)?.engagement;
      if (m && isEngagementModel(m)) {
        pushed.current = true;
        setOpen(m);
      } else {
        pushed.current = false;
        setOpen(null);
      }
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

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
                <a href={`/get-started/${m.model}`} className="em-link" onClick={(e) => openModel(e, m.model)}>
                  {m.cta}
                  <Arrow />
                </a>
              </article>
            ))}
          </div>
        </div>
      </div>
      <EngagementModal model={open} onClose={close} />
    </section>
  );
}
