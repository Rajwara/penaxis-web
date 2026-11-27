"use client";

import { useEffect, useRef, useState } from "react";
import { momentum, pressLogos } from "@/lib/data";
import "@fontsource-variable/big-shoulders/opsz.css";
import "@fontsource-variable/wix-madefor-display/index.css";

// About page: logo marquee + dark card with video pill, scroll-scrubbed
// title and a coloured showcase (zooming background, sliding big text),
// ported as-is from the supplied logo-marquee-and-showcase template.
// Penaxis details swapped in: client logos alternate with the template's
// photo pills, the founders video, purple accent. The coloured showcase now
// holds the Momentum timeline (quarter tabs left, projects delivered right,
// background cross-fades to that quarter's team photo).
// TEMP IMAGES: marquee photos from the template's CDN — replace later.

const CDN = "https://cdn.prod.website-files.com/6ae1b423d7bb90956e94a0c5/";
const MARQUEE_PHOTOS = [
  CDN + "6aeae1228074077a434839a6_about-img11.webp",
  CDN + "6aeae121199c20f44f764427_about-img10.webp",
  CDN + "6aeae1224c41f5c210357cc5_about-img9.webp",
  CDN + "6aeae122c48e48733c76b36f_about-img8.webp",
  CDN + "6aeae12b61093d5fbe155d1a_about-img7.webp",
];
// Showcase background per quarter (Penaxis artwork, already purple-graded).
const SHOW_BG: Record<string, string> = {
  "Q2 2025": "/images/who-we-are/momentum-show-q2-2025.webp",
  "Q3 2025": "/images/who-we-are/momentum-show-q3-2025.webp",
  "Q4 2025": "/images/who-we-are/momentum-show-q4-2025.webp",
  "Q1 2026": "/images/who-we-are/momentum-show-q1-2026.webp",
  "Q2 2026": "/images/who-we-are/momentum-show-q2-2026.webp",
};
const photoFor = (index: number) => SHOW_BG[momentum[index].period] ?? momentum[index].image ?? momentum[0].image!;
const PHOTOS = Array.from(new Set(momentum.map((_, i) => photoFor(i))));
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
  const [active, setActive] = useState(momentum.length - 1);
  const current = momentum[active];

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

            <div className="cz-services" data-cz-anim role="tablist" aria-label="Momentum by quarter">
              {momentum.map((m, i) => (
                <button
                  key={m.period}
                  type="button"
                  role="tab"
                  aria-selected={i === active}
                  onClick={() => setActive(i)}
                  className={`cz-service cz-q${i === active ? " is-active" : ""}`}
                >
                  <span className="cz-arrow">
                    <Arrow />
                  </span>
                  {m.period}
                </button>
              ))}
            </div>

            <div className="cz-contact" data-cz-anim aria-live="polite">
              <div className="cz-label">Momentum · {current.period}</div>
              <div className="cz-mo-num">{current.value}</div>
              <div className="cz-link">Projects delivered</div>
              <p className="cz-mo-copy">
                Part of a steady, quarter-over-quarter climb as our team and client base keep growing.
              </p>
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
