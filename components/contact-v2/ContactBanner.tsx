"use client";

import { useEffect, useRef, useState } from "react";
// Same fonts as the supplied banner (self-hosted, used only here).
import "@fontsource-variable/big-shoulders/opsz.css";
import "@fontsource-variable/wix-madefor-display/index.css";

// Contact page banner (also used on /blog). Ported from a client-supplied "contact banner"
// (static HTML/CSS/JS): rounded photo card, animated "• Contact •" label,
// and a big title whose letters fade/slide in one after another (0.065s
// apart). Fonts, sizes and timings match the supplied files. Background:
// Penaxis's own banner artwork.

const BG_IMAGE = "/images/hero/contact-banner.webp"; // supplied banner artwork

// Reusable: the Contact page uses the defaults; other pages (e.g. /blog)
// pass their own label, title, optional intro line and image.
type Props = { label?: string; title?: string; intro?: string; image?: string; shade?: number };

export default function ContactBanner({ label = "Contact", title = "Get in touch", intro, image = BG_IMAGE, shade }: Props) {
  const TITLE = title;
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [jsReady, setJsReady] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setJsReady(true);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const letters = Array.from(titleRef.current?.querySelectorAll<HTMLElement>(".cb-letter") ?? []);
    letters.forEach((l) => {
      l.style.opacity = "0.3";
      l.style.transform = "translate3d(10px,0,0)";
    });

    let started = false;
    const start = () => {
      if (started) return;
      started = true;
      requestAnimationFrame(() => {
        setLoaded(true);
        letters.forEach((l, i) => {
          l.style.transition = "opacity 0.45s cubic-bezier(0.22,1,0.36,1), transform 0.45s cubic-bezier(0.22,1,0.36,1)";
          l.style.transitionDelay = reduceMotion ? "0s" : `${i * 0.065}s`;
          l.style.opacity = "1";
          l.style.transform = "translate3d(0,0,0)";
        });
      });
    };

    const img = imgRef.current;
    let safety: ReturnType<typeof setTimeout> | undefined;
    if (img && !img.complete) {
      img.addEventListener("load", start, { once: true });
      img.addEventListener("error", start, { once: true });
      safety = setTimeout(start, 1200);
    } else {
      start();
    }
    return () => {
      if (safety) clearTimeout(safety);
    };
  }, []);

  return (
    <section ref={sectionRef} className={`cb-section${jsReady ? " cb-js" : ""}${loaded ? " is-loaded" : ""}`}>
      <div className="cb-card" data-nav-theme="dark">
        <img ref={imgRef} className="cb-bg" src={image} alt="" />
        <div className="cb-shade" aria-hidden="true" style={shade !== undefined ? { background: `rgba(0, 0, 0, ${shade})` } : undefined} />

        <div className="cb-content">
          <div className="cb-sub">
            <span className="cb-dot is-start" />
            <span className="cb-sub-mask">
              <span className="cb-sub-track">
                <span>{label}</span>
                <span className="cb-dot is-end" />
              </span>
            </span>
          </div>

          <h1 ref={titleRef} className="cb-title" aria-label={TITLE}>
            {TITLE.split(" ").map((w, wi) => (
              <span key={wi}>
                {wi > 0 && " "}
                <span className="cb-word" aria-hidden="true">
                  {[...w].map((c, ci) => (
                    <span key={ci} className="cb-letter">{c}</span>
                  ))}
                </span>
              </span>
            ))}
          </h1>
          {intro && <p className="cb-intro">{intro}</p>}
        </div>
      </div>
    </section>
  );
}
