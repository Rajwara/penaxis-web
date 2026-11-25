"use client";

import { useRef } from "react";
import { pressLogos } from "@/lib/data";
import "@fontsource-variable/big-shoulders/opsz.css";
import "@fontsource-variable/wix-madefor-display/index.css";

// Large photo hero, ported as-is from the supplied hero-banner template and
// used on /case-studies and /industries: zoom-in background, big title
// whose letters rise in (middle line indented, round play button beside
// it), spinning badge, intro text, fill-up button, and a logo marquee
// along the bottom. Penaxis swaps: client logos (white) instead of the
// template's brand marks, Penaxis badge text + mark, the founders video,
// purple accent.
// TEMP IMAGE: the template's background photo (its own CDN) — replace BG.

const BG = "https://cdn.prod.website-files.com/6ae1b423d7bb90956e94a0c5/6ae2f23a220861febdf1d7e5_h1_bg-1.webp";
const VIDEO_SRC = "/videos/founders-video.mp4";
const VIDEO_POSTER = "/images/hero/founders-video-poster.webp";
const BADGE = "STRATEGY • DESIGN • TECHNOLOGY • GROWTH •";

type Line = { text: string; indent?: boolean };
type Props = { lines: Line[]; text: string; cta: { label: string; href: string } };

function Arrow() {
  return (
    <span className="phb-btn-icon">
      <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
        <path d="M18.256 23.076l-0.944-0.959 5.451-5.451h-16.097v-1.333h16.097l-5.451-5.451 0.944-0.959 7.077 7.077-7.077 7.077z" />
      </svg>
    </span>
  );
}

export default function PageHeroBanner({ lines, text, cta }: Props) {
  const modalRef = useRef<HTMLDialogElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const title = lines.map((l) => l.text).join(" ");

  const open = () => {
    modalRef.current?.showModal();
    videoRef.current?.play().catch(() => {});
  };
  const close = () => {
    videoRef.current?.pause();
    modalRef.current?.close();
  };

  return (
    <section className="phb">
      <div className="phb-card" data-nav-theme="dark">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="phb-bg" src={BG} alt="" fetchPriority="high" />
        <div className="phb-overlay" aria-hidden="true" />

        <div className="phb-content">
          <div className="phb-title-wrap">
            <h1 className="phb-title" aria-label={title}>
              {lines.map((l, li) => {
                let i = 0;
                return (
                  <span key={li} className={`phb-line${l.indent ? " is-indent" : ""}`} aria-hidden="true">
                    {l.text.split(" ").map((w, wi) => (
                      <span key={wi}>
                        {wi > 0 && " "}
                        <span className="w">
                          {[...w].map((ch, ci) => (
                            <span key={ci} className="ch" style={{ ["--i" as string]: i++ } as React.CSSProperties}>
                              {ch}
                            </span>
                          ))}
                        </span>
                      </span>
                    ))}
                  </span>
                );
              })}
            </h1>
            <button
              className="phb-video"
              type="button"
              aria-label="Play video"
              onClick={open}
              style={{ backgroundImage: `url(${VIDEO_POSTER})` }}
            >
              <span className="phb-video-icon">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M6 3.5v17l14.5-8.5z" />
                </svg>
              </span>
            </button>
          </div>

          <div className="phb-aside">
            <div className="phb-badge">
              <div className="phb-badge-ring">
                <svg viewBox="0 0 160 160" fill="currentColor" role="img" aria-label="Strategy, design, technology, growth">
                  <defs>
                    <path id="phb-badge-path" d="M80 80 m-62 0 a62 62 0 1 1 124 0 a62 62 0 1 1 -124 0" />
                  </defs>
                  <text fontSize="13" fontWeight="600" letterSpacing="3">
                    <textPath href="#phb-badge-path" textLength="382">
                      {BADGE}
                    </textPath>
                  </text>
                </svg>
              </div>
              <div className="phb-badge-icon">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/logo/penaxis-mark.png" alt="" />
              </div>
            </div>

            <p className="phb-text">{text}</p>

            <a className="phb-btn" href={cta.href}>
              <span className="phb-btn-fill" aria-hidden="true" />
              <span className="phb-btn-clip">
                <span className="phb-btn-inner">
                  <span>{cta.label}</span>
                  <Arrow />
                </span>
                <span className="phb-btn-inner is-hover" aria-hidden="true">
                  <span>{cta.label}</span>
                  <Arrow />
                </span>
              </span>
            </a>
          </div>
        </div>

        <div className="phb-brands" aria-label="Our clients">
          <div className="phb-brands-track">
            {[0, 1].map((copy) => (
              <div key={copy} className="phb-brands-list" aria-hidden={copy === 1}>
                {pressLogos.map((l) => (
                  <div key={l.src} className="phb-brand">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={l.src} alt={copy === 0 ? l.alt : ""} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <dialog
        ref={modalRef}
        className="phb-modal"
        onClick={(e) => {
          if (e.target === modalRef.current) close();
        }}
        onClose={() => videoRef.current?.pause()}
      >
        <button className="phb-modal-close" type="button" aria-label="Close video" onClick={close}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
        <video ref={videoRef} className="phb-player" src={VIDEO_SRC} poster={VIDEO_POSTER} controls playsInline preload="none" />
      </dialog>
    </section>
  );
}
