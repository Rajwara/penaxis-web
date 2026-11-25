"use client";

import { useEffect, useRef } from "react";
import { team } from "@/lib/data";
import PillButton from "./PillButton";
import ContactBanner from "./contact-v2/ContactBanner";
import "@fontsource-variable/big-shoulders/opsz.css";
import "@fontsource-variable/wix-madefor-display/index.css";

// /game-changers (our team), built from the supplied "Our Team" template:
// photo banner (shared ContactBanner, like /contact-us), a 3-column grid of tall photo cards
// (image zooms on hover; members with a LinkedIn profile get a glass
// LinkedIn pill), and a dark "Join our team" banner with flowing lines.
// Branded like /home-v2: Big Shoulders + Wix Madefor, purple #6A449A.

const PLACEHOLDER =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 338 512"><rect width="338" height="512" fill="#eceaf1"/>' +
      '<circle cx="169" cy="200" r="72" fill="#d8d3e3"/><path d="M40 512c0-90 58-170 129-170s129 80 129 170z" fill="#d8d3e3"/></svg>'
  );

const DIR = ["from-left", "", "from-right"];

function Waves() {
  const paths: string[] = [];
  for (let i = 0; i < 38; i++) {
    const o = i * 9;
    paths.push(`M${-50 + o} 620 C ${120 + o} ${380 - o * 0.4}, ${-40 + o} ${120 + o * 0.3}, ${260 + o * 1.2} ${-20 + o * 0.2}`);
    paths.push(`M1150 ${300 + o * 0.8} C ${900 - o} ${420 + o * 0.5}, ${700 - o * 0.5} 640, ${450 - o} 640`);
  }
  return (
    <svg className="tm-cta-bg" viewBox="0 0 1100 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="tm-g1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#a988d3" />
          <stop offset=".55" stopColor="#6A449A" />
          <stop offset="1" stopColor="#1d1130" />
        </linearGradient>
        <linearGradient id="tm-g2" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8b67bf" />
          <stop offset=".5" stopColor="#c2a8e6" stopOpacity=".6" />
          <stop offset="1" stopColor="#6A449A" stopOpacity="0" />
        </linearGradient>
      </defs>
      <g fill="none" stroke="url(#tm-g1)" strokeWidth="1.4" opacity=".9">
        {paths.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>
      <path d="M700 0 C 820 120, 980 60, 1100 160 L1100 0Z" fill="url(#tm-g2)" opacity=".85" />
    </svg>
  );
}

export default function TeamPage() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    root.classList.add("tm-js");
    const els = Array.from(root.querySelectorAll<HTMLElement>(".tm-reveal"));
    // Reveal anything whose top has reached 85% of the screen, including
    // items scrolled past quickly, so nothing is ever left hidden.
    let raf = 0;
    const check = () => {
      raf = 0;
      const line = window.innerHeight * 0.85;
      for (const el of els) {
        if (!el.classList.contains("in") && el.getBoundingClientRect().top < line) el.classList.add("in");
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(check);
    };
    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={rootRef} className="tm">
      {/* Photo banner, same design as /contact-us */}
      <ContactBanner
        image="/images/hero/game-changers-banner.webp"
        shade={0.45}
        label="Our team"
        title="Small team, big results"
        intro="Meet the people behind Penaxis's strategy, technology and growth work, across Pakistan, the UAE and beyond."
      />
      <section className="tm-section tm-after-banner">
        <div className="tm-container">
          <div className="tm-grid">
            {team.map((m, i) => (
              <article
                key={m.name}
                className={`tm-card tm-reveal ${DIR[i % 3]}`}
                style={{ transitionDelay: `${(i % 3) * 0.1}s` }}
              >
                <div className="tm-media">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className="tm-img" src={m.image || PLACEHOLDER} alt={m.name} loading="lazy" />
                  {m.linkedin && (
                    <div className="tm-hover">
                      <a className="tm-social" href={m.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${m.name} on LinkedIn`}>
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.1c.5-1 1.8-2 3.8-2 4 0 4.8 2.6 4.8 6V21h-4v-5.6c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9V21H9z" />
                        </svg>
                        LinkedIn
                      </a>
                    </div>
                  )}
                </div>
                <h3 className="tm-name">{m.name}</h3>
                <div className="tm-role">{m.role}</div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="tm-wide">
        <div className="tm-cta tm-reveal" data-nav-theme="dark">
          <Waves />
          <p className="tm-subtitle is-light">Join our team</p>
          <h2>
            Start a career with <span className="tm-fade">Penaxis</span>
          </h2>
          <PillButton href="/careers" label="See open roles" variant="light" />
        </div>
      </section>
    </div>
  );
}
