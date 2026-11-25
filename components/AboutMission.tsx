"use client";

import { useEffect, useRef } from "react";
import { missionVision } from "@/lib/data";
import "@fontsource-variable/big-shoulders/opsz.css";
import "@fontsource-variable/wix-madefor-display/index.css";

// About page "Our mission / vision / values", from the supplied
// about-mission-section template: animated "• label •" eyebrow, letter-by-
// letter title scrubbed with scroll, and three sticky stacking rows (heading · text · image sliding in from the
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

const clamp = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

export default function AboutMission() {
  const rootRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

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

    // Heading reveal scrubbed with scroll ("top 85%" -> "bottom 40%")
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const chars = Array.from(titleRef.current?.querySelectorAll<HTMLElement>(".c") ?? []);
    let cur = 0;
    let raf = 0;
    const tick = () => {
      const t = titleRef.current;
      if (t && chars.length) {
        const vh = window.innerHeight;
        const b = t.getBoundingClientRect();
        const target = reduce ? 1 : clamp((vh * 0.85 - b.top) / (vh * 0.45 + b.height));
        cur += (target - cur) * 0.12;
        const n = chars.length, d = 0.2662, s = 0.05324, tt = cur * (d + (n - 1) * s);
        for (let k = 0; k < n; k++) {
          const p = clamp((tt - k * s) / d);
          chars[k].style.opacity = String(0.3 + 0.7 * p);
          chars[k].style.transform = `translateX(${(10 * (1 - p)).toFixed(2)}px)`;
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

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
          <h2 ref={titleRef} id="cs-title" className="cs-title" aria-label={TITLE}>
            {TITLE.split(" ").map((w, wi) => (
              <span key={wi}>
                {wi > 0 && " "}
                <span className="w" aria-hidden="true">
                  {[...w].map((ch, ci) => (
                    <span key={ci} className="c">
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
