"use client";

import { useEffect, useRef, useState } from "react";
import { pressLogos } from "@/lib/data";
// Same fonts as the supplied section (self-hosted, used only here).
import "@fontsource-variable/big-shoulders/opsz.css";
import "@fontsource-variable/wix-madefor-display/index.css";

// /industries hero banner. Ported from a client-supplied "Hero Banner"
// (static HTML/CSS/JS): photo card with intro zoom, letter-by-letter title,
// round video button that opens a video popup, rotating text badge, dark
// CTA button, and an endlessly scrolling logo strip. Fonts, sizes,
// colours and timings match the supplied files; content is Penaxis's.

const TITLE_LINES = [
  { text: "Industries", indent: false },
  { text: "We help", indent: true },
  { text: "Grow", indent: false },
];
const BADGE_TEXT = "13 INDUSTRIES • ONE TEAM • PENAXIS •";
const BG_IMAGE = "/images/hero/trusted-partner-office.webp";
const VIDEO_SRC = "/videos/founders-video.mp4";
const VIDEO_POSTER = "/images/hero/founders-video-poster.webp";
const LOGO_COPIES = 3; // the zip clones the list until it covers 2x the screen

function Arrow() {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
      <path d="M18.256 23.076l-0.944-0.959 5.451-5.451h-16.097v-1.333h16.097l-5.451-5.451 0.944-0.959 7.077 7.077-7.077 7.077z" />
    </svg>
  );
}

export default function IndustriesHeroBanner() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);
  const modalRef = useRef<HTMLDialogElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [jsReady, setJsReady] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setJsReady(true);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const letters = Array.from(titleRef.current?.querySelectorAll<HTMLElement>(".ihb-letter") ?? []);
    letters.forEach((l) => {
      l.style.opacity = "0.3";
      l.style.transform = "translate3d(10px,0,0)";
    });

    // Intro: start once the background image is ready.
    let started = false;
    const start = () => {
      if (started) return;
      started = true;
      requestAnimationFrame(() => {
        setLoaded(true);
        letters.forEach((l, i) => {
          l.style.transition = "opacity 0.35s cubic-bezier(0.22,1,0.36,1), transform 0.35s cubic-bezier(0.22,1,0.36,1)";
          l.style.transitionDelay = reduceMotion ? "0s" : `${i * 0.05}s`;
          l.style.opacity = "1";
          l.style.transform = "translate3d(0,0,0)";
        });
      });
    };
    const bg = bgRef.current;
    let safety: ReturnType<typeof setTimeout> | undefined;
    if (bg && !bg.complete) {
      bg.addEventListener("load", start, { once: true });
      bg.addEventListener("error", start, { once: true });
      safety = setTimeout(start, 1500);
    } else {
      start();
    }

    // Rotating badge (9°/s) + logo strip (52.5px/s), seamless loop.
    let angle = 0;
    let x = 0;
    let last = performance.now();
    let raf = 0;
    const loop = (now: number) => {
      const dt = Math.min(0.1, (now - last) / 1000);
      last = now;
      const list = listRef.current;
      if (!reduceMotion) {
        angle = (angle + 9 * dt) % 360;
        if (list) {
          x -= 52.5 * dt;
          const w = list.offsetWidth;
          if (w && -x >= w) x += w;
        }
      }
      if (ringRef.current) ringRef.current.style.transform = `rotate(${angle.toFixed(2)}deg)`;
      if (trackRef.current) trackRef.current.style.transform = `translate3d(${x.toFixed(2)}px,0,0)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      if (safety) clearTimeout(safety);
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

  const cardClass = `ihb-card${jsReady ? " ihb-js" : ""}${loaded ? " is-loaded" : ""}`;

  return (
    <section className="ihb-section" data-nav-theme="dark">
      <div className={cardClass}>
        <img ref={bgRef} className="ihb-bg" src={BG_IMAGE} alt="" />
        <div className="ihb-overlay" />

        <div className="ihb-content">
          {/* Title + round video button */}
          <div className="ihb-title-wrap">
            <h1 ref={titleRef} className="ihb-title" aria-label={TITLE_LINES.map((l) => l.text).join(" ")}>
              {TITLE_LINES.map((line) => (
                <span key={line.text} className={`ihb-title-line${line.indent ? " is-indent" : ""}`} aria-hidden="true">
                  {line.text.split(" ").map((word, wi) => (
                    <span key={wi}>
                      {wi > 0 && " "}
                      <span className="ihb-word">
                        {[...word].map((c, i) => (
                          <span key={i} className="ihb-letter">{c}</span>
                        ))}
                      </span>
                    </span>
                  ))}
                </span>
              ))}
            </h1>
            <button
              type="button"
              className="ihb-video"
              aria-label="Play video"
              onClick={openVideo}
              style={{ backgroundImage: `url(${VIDEO_POSTER})` }}
            >
              <span className="ihb-video-icon">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6 3.5v17l14.5-8.5z" /></svg>
              </span>
            </button>
          </div>

          {/* Right side */}
          <div className="ihb-aside">
            <div className="ihb-badge">
              <div ref={ringRef} className="ihb-badge-ring">
                <svg viewBox="0 0 160 160" width="100%" height="100%" fill="currentColor" role="img" aria-label="13 industries, one team">
                  <defs>
                    <path id="ihb-badge-path" d="M80 80 m-62 0 a62 62 0 1 1 124 0 a62 62 0 1 1 -124 0" />
                  </defs>
                  <text fontSize="13" fontWeight="600" letterSpacing="3">
                    <textPath href="#ihb-badge-path" textLength="382">{BADGE_TEXT}</textPath>
                  </text>
                </svg>
              </div>
              <div className="ihb-badge-icon">
                <img src="/images/logo/penaxis-mark.png" alt="" />
              </div>
            </div>

            <p className="ihb-text">
              13 industries, one team. From software and healthcare to logistics and real estate, we
              build for how each one actually works.
            </p>

            <a href="#all-industries" className="ihb-button">
              <span className="ihb-button-fill" />
              <span className="ihb-button-clip">
                <span className="ihb-button-inner">
                  <span>Explore industries</span>
                  <span className="ihb-button-icon"><Arrow /></span>
                </span>
                <span className="ihb-button-inner is-hover" aria-hidden="true">
                  <span>Explore industries</span>
                  <span className="ihb-button-icon"><Arrow /></span>
                </span>
              </span>
            </a>
          </div>
        </div>

        {/* Logo strip (infinite) */}
        <div className="ihb-brands" aria-label="Businesses we work with">
          <div ref={trackRef} className="ihb-brands-track">
            {Array.from({ length: LOGO_COPIES }, (_, copy) => (
              <div key={copy} ref={copy === 0 ? listRef : undefined} className="ihb-brands-list" aria-hidden={copy > 0}>
                {pressLogos.map((logo) => (
                  <div key={logo.src} className="ihb-brand">
                    <div className="ihb-brand-logo">
                      <img className="ihb-brand-img" src={logo.src} alt={copy === 0 ? logo.alt : ""} />
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Video popup */}
      <dialog
        ref={modalRef}
        className="ihb-video-modal"
        onClick={(e) => {
          if (e.target === modalRef.current) closeVideo();
        }}
        onClose={() => videoRef.current?.pause()}
      >
        <button type="button" className="ihb-video-close" aria-label="Close video" onClick={closeVideo}>
          <svg className="ihb-video-close-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
        </button>
        <video ref={videoRef} className="ihb-video-player" src={VIDEO_SRC} poster={VIDEO_POSTER} controls playsInline preload="none" />
      </dialog>
    </section>
  );
}
