"use client";

import { useEffect, useRef, useState } from "react";
import { pressLogos } from "@/lib/data";
import "@fontsource-variable/big-shoulders/opsz.css";
import "@fontsource-variable/wix-madefor-display/index.css";

// About page: logo marquee + dark card with video pill, scroll-scrubbed
// title and a coloured showcase (zooming background, sliding big text),
// ported as-is from the supplied logo-marquee-and-showcase template.
// Penaxis details swapped in: client logos alternate with the template's
// photo pills, the founders video, purple accent. The coloured showcase now
// holds the Momentum timeline (quarter tabs left, projects delivered right,
// background cross-fades to that quarter's team photo).

// One themed photo per client, shown just before that client's logo
// (same order as the first five pressLogos).
const MARQUEE_PHOTOS = [
  "/images/who-we-are/marquee-meerab-properties.webp",
  "/images/who-we-are/marquee-meerab-dubai.webp",
  "/images/who-we-are/marquee-devmindz.webp",
  "/images/who-we-are/marquee-bidmore.webp",
  "/images/who-we-are/marquee-seka.webp",
];
// Penaxis journey: one tab per milestone (same design as the old quarterly
// momentum tabs). Images reuse the five uploaded showcase backgrounds in order.
const MILESTONES = [
  { tab: "2024", label: "2024 · The Beginning", title: "From Ambition to Action", text: "What began as an independent venture in a coworking space laid the foundation for Penaxis and its larger vision.", value: "01", caption: "Founder", image: "/images/who-we-are/momentum-show-q2-2025.webp" },
  { tab: "2025", label: "2025 · The Foundation", title: "Turning Vision into an Organisation", text: "We established our first physical office and a dedicated onsite team, specialising in business development and digital marketing.", value: "02", caption: "Founding service verticals", image: "/images/who-we-are/momentum-show-q3-2025.webp" },
  { tab: "Q2 2026", label: "Q2 2026 · The Transformation", title: "Beyond Growth. Into Technology.", text: "With the introduction of in-house software engineering, we began our evolution into an integrated growth and technology partner, expanding towards four core service verticals.", value: "04", caption: "Core service verticals", image: "/images/who-we-are/momentum-show-q4-2025.webp" },
  { tab: "Q4 2026", label: "Q4 2026 · The Expansion", title: "Growing Beyond Borders", text: "With a multidisciplinary team of 20 and an established office presence in Pakistan and the UAE, our capabilities and geographical footprint continue to grow.", value: "20", caption: "Team members", image: "/images/who-we-are/momentum-show-q1-2026.webp" },
  { tab: "2027", label: "2027 · The Vision", title: "Engineering the Next Frontier", text: "With Berlin envisioned as our European regional headquarters, we aim to expand our international footprint and explore new frontiers in technology.", value: "03", caption: "Target countries", image: "/images/who-we-are/momentum-show-q2-2026.webp" },
];
const photoFor = (index: number) => MILESTONES[index].image;
const PHOTOS = Array.from(new Set(MILESTONES.map((_, i) => photoFor(i))));
const VIDEO_SRC = "/videos/founders-video.mp4";
const VIDEO_POSTER = "/images/hero/founders-video-poster.webp";

const TITLE = "Global partner in AI, software, and business growth";
const BIG = "Building what's next";

// photo, logo, photo, logo … (5 photos + 5 client logos)
const PILLS = MARQUEE_PHOTOS.flatMap((src, i) => [
  { kind: "photo" as const, src, alt: "" },
  { kind: "logo" as const, src: pressLogos[i].src, alt: pressLogos[i].alt },
]);

function Arrow() {
  return (
    <svg fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
      <path d="M18.256 23.076l-.944-.959 5.451-5.451H6.666v-1.333h16.097l-5.451-5.451.944-.959 7.077 7.077z" />
    </svg>
  );
}

const clamp = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

export default function AboutShowcase() {
  const rootRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const showRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const bigRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDialogElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(0);
  const current = MILESTONES[active];

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    root.classList.add("cz-js");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Play-once triggers (top of element reaches 85% of the viewport)
    const els = Array.from(root.querySelectorAll<HTMLElement>("[data-cz-anim]"));
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

    // Scroll-scrubbed title reveal + showcase parallax (smoothed)
    const chars = Array.from(titleRef.current?.querySelectorAll<HTMLElement>(".c") ?? []);
    let revealCur = 0;
    let parCur = 0;
    let raf = 0;
    const tick = () => {
      const vh = window.innerHeight;
      const t = titleRef.current;
      if (t && chars.length) {
        const b = t.getBoundingClientRect();
        const target = reduce ? 1 : clamp((vh * 0.85 - b.top) / (vh * 0.45 + b.height));
        revealCur += (target - revealCur) * 0.12;
        const n = chars.length, d = 0.2662, s = 0.05324, T = d + (n - 1) * s, tt = revealCur * T;
        for (let i = 0; i < n; i++) {
          const p = clamp((tt - i * s) / d);
          chars[i].style.opacity = String(0.3 + 0.7 * p);
          chars[i].style.transform = `translateX(${(10 * (1 - p)).toFixed(2)}px)`;
        }
      }
      const show = showRef.current;
      if (show) {
        const b = show.getBoundingClientRect();
        const target = reduce ? 1 : clamp((vh - b.top) / (vh + b.height));
        parCur += (target - parCur) * 0.12;
        if (bgRef.current) bgRef.current.style.transform = `scale(${(1.25 - 0.25 * parCur).toFixed(4)})`;
        if (bigRef.current) bigRef.current.style.transform = `translateX(${(20 - 30 * parCur).toFixed(3)}%)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  const openVideo = () => {
    modalRef.current?.showModal();
    videoRef.current?.play().catch(() => {});
  };
  const closeVideo = () => {
    videoRef.current?.pause();
    modalRef.current?.close();
  };

  return (
    <div ref={rootRef} className="cz">
      {/* Logo marquee */}
      <div className="cz-marquee" data-cz-anim aria-label="Our clients">
        <div className="cz-marquee-in">
          <div className="cz-track">
            {[0, 1].map((copy) =>
              PILLS.map((p, i) => (
                <div key={`${copy}-${i}`} className={`cz-pill${p.kind === "photo" ? " is-image" : " is-logo"}`} aria-hidden={copy === 1 || p.kind === "photo"}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.src} alt={copy === 0 ? p.alt : ""} />
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Dark card + showcase */}
      <section className="cz-wrap" aria-labelledby="cz-title">
        <div className="cz-dark" data-nav-theme="dark">
          <div className="cz-head" data-cz-anim>
            <button className="cz-video-pill" type="button" onClick={openVideo} aria-label="Play video">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={VIDEO_POSTER} alt="" />
              <span className="cz-play">
                <svg fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M6 4l14 8-14 8z" />
                </svg>
              </span>
            </button>
            <h2 ref={titleRef} id="cz-title" className="cz-title" aria-label={TITLE}>
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

          <dialog
            ref={modalRef}
            className="cz-modal"
            onClick={(e) => {
              if (e.target === modalRef.current) closeVideo();
            }}
            onClose={() => videoRef.current?.pause()}
          >
            <button className="cz-modal-close" type="button" onClick={closeVideo} aria-label="Close">
              &times;
            </button>
            <video ref={videoRef} controls playsInline preload="none" src={VIDEO_SRC} poster={VIDEO_POSTER} />
          </dialog>

          <div ref={showRef} className="cz-show">
            <div ref={bgRef} className="cz-show-bg" aria-hidden="true">
              {PHOTOS.map((src) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={src} src={src} alt="" className={src === photoFor(active) ? "is-on" : ""} />
              ))}
            </div>

            <div className="cz-services" data-cz-anim role="tablist" aria-label="Our journey">
              {MILESTONES.map((m, i) => (
                <button
                  key={m.tab}
                  type="button"
                  role="tab"
                  aria-selected={i === active}
                  onClick={() => setActive(i)}
                  className={`cz-service cz-q${i === active ? " is-active" : ""}`}
                >
                  <span className="cz-arrow">
                    <Arrow />
                  </span>
                  {m.tab}
                </button>
              ))}
            </div>

            <div className="cz-contact" data-cz-anim aria-live="polite">
              <div className="cz-label">{current.label}</div>
              <div className="cz-mo-title">{current.title}</div>
              <div className="cz-mo-num">{current.value}</div>
              <div className="cz-link">{current.caption}</div>
              <p className="cz-mo-copy">{current.text}</p>
            </div>

            <div ref={bigRef} className="cz-big" aria-hidden="true">
              {BIG}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
