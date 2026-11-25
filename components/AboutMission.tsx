"use client";

import { useEffect, useRef } from "react";
import { missionVision } from "@/lib/data";
import "@fontsource-variable/big-shoulders/opsz.css";
import "@fontsource-variable/wix-madefor-display/index.css";

// About page "Our mission / vision / values", from the supplied
// about-mission-section template: animated "• label •" eyebrow, letter-by-
// letter title, and three rows (heading · text · image sliding in from the
// right). Mission and vision text come from lib/data.ts; values is written
// from the site's "why choose us" points.
// TEMP IMAGES: the template's placeholder photos, loaded from the template's
// own CDN. Replace ROW_IMAGES with Penaxis photos (e.g. /images/who-we-are/…).

const ROW_IMAGES = [
  "https://cdn.prod.website-files.com/6ae1b423d7bb90956e94a0c5/6aeadcbaf0b6dfc8f2d4f7e3_about-img4.webp",
  "https://cdn.prod.website-files.com/6ae1b423d7bb90956e94a0c5/6aeadcba4c41f5c21033b605_about-img3.webp",
  "https://cdn.prod.website-files.com/6ae1b423d7bb90956e94a0c5/6aeadcbb28cd5488d6441173_about-img2.webp",
];

const ROWS = [
  { title: "Our mission", text: missionVision.find((m) => m.label === "Mission")?.copy ?? "" },
  { title: "Our vision", text: missionVision.find((m) => m.label === "Vision")?.copy ?? "" },
  {
    title: "Our values",
    text: "We focus on outcomes that matter, communicate clearly and stay hands-on, using AI and the right technology to deliver results our clients can measure.",
  },
];

const TITLE = "Your growth & technology partner";

export default function AboutMission() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    root.classList.add("cs-js");
    const els = Array.from(root.querySelectorAll<HTMLElement>("[data-cs-anim]"));
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

  let i = 0;
  return (
    <section ref={rootRef} className="cs-section" aria-labelledby="cs-title">
      <div className="cs-container">
        <div className="cs-head">
          <div className="cs-sub" data-cs-anim>
            <span className="cs-sub-dot is-start" />
            <span className="cs-sub-mask">
              <span className="cs-sub-track">
                <span>Who we are</span>
                <span className="cs-sub-dot is-end" />
              </span>
            </span>
          </div>
          <h2 id="cs-title" className="cs-title" data-cs-anim aria-label={TITLE}>
            {TITLE.split(" ").map((w, wi) => (
              <span key={wi}>
                {wi > 0 && " "}
                <span className="w" aria-hidden="true">
                  {[...w].map((ch, ci) => (
                    <span key={ci} className="c" style={{ transitionDelay: `${(i++ * 0.053).toFixed(3)}s` }}>
                      {ch}
                    </span>
                  ))}
                </span>
              </span>
            ))}
          </h2>
        </div>

        <div className="cs-list">
          {ROWS.map((r, ri) => (
            <div key={r.title} className="cs-row" data-cs-anim>
              <h3>{r.title}</h3>
              <p>{r.text}</p>
              <div className="cs-img-wrap">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={ROW_IMAGES[ri]} alt="" loading="lazy" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
