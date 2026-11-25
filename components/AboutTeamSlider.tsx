"use client";

import { useEffect, useRef } from "react";
import { team } from "@/lib/data";
import PillButton from "./PillButton";
import "@fontsource-variable/big-shoulders/opsz.css";
import "@fontsource-variable/wix-madefor-display/index.css";

// /who-we-are: dark team strip after "Why choose us". Card design taken
// from the supplied team template (tall photo card, zoom on hover, glass
// LinkedIn pill sliding up, uppercase name + role). The section pins while
// you scroll and the cards slide sideways with the page scroll (no arrows).
// Only the selected members, in this order; full list is on /game-changers.

const ORDER = ["Adeel Aslam", "Shahzad Ali", "Muhammad Akram", "Sopio Pipia", "Saad Sultan", "Laiba Zafar", "Sumaira Hussain"];
const MEMBERS = ORDER.map((n) => team.find((m) => m.name === n)).filter((m): m is (typeof team)[number] => !!m && !!m.image);

const clamp = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.1c.5-1 1.8-2 3.8-2 4 0 4.8 2.6 4.8 6V21h-4v-5.6c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9V21H9z" />
    </svg>
  );
}

export default function AboutTeamSlider() {
  const rootRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const track = trackRef.current;
    if (!root || !track) return;
    root.classList.add("ts-js");
    const els = Array.from(root.querySelectorAll<HTMLElement>("[data-ts-anim]"));
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

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      root.classList.add("ts-static");
      return () => io.disconnect();
    }

    // Pin: the section is as tall as the sideways distance the track needs
    // to travel, plus one screen; a sticky inner box holds the cards.
    let dist = 0;
    const measure = () => {
      const pad = parseFloat(getComputedStyle(track).paddingLeft) || 0;
      dist = Math.max(0, track.scrollWidth - track.clientWidth + pad);
      root.style.height = `${window.innerHeight + dist}px`;
    };
    measure();
    window.addEventListener("resize", measure);
    const ro = new ResizeObserver(measure);
    ro.observe(track);

    let cur = 0;
    let raf = 0;
    const tick = () => {
      const top = root.getBoundingClientRect().top;
      const target = dist > 0 ? clamp(-top / dist) : 0;
      cur += (target - cur) * 0.12;
      if (Math.abs(target - cur) < 0.0005) cur = target;
      track.style.transform = `translate3d(${(-cur * dist).toFixed(1)}px,0,0)`;
      if (barRef.current) barRef.current.style.transform = `scaleX(${Math.max(0.06, cur)})`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("resize", measure);
      cancelAnimationFrame(raf);
      root.style.height = "";
    };
  }, []);

  return (
    <section ref={rootRef} className="ts-section" data-nav-theme="dark" aria-labelledby="ts-title">
      <div className="ts-sticky">
        <div className="ts-container">
          <div className="ts-head" data-ts-anim>
            <div>
              <div className="ts-sub">Our team</div>
              <h2 id="ts-title" className="ts-title">The people behind Penaxis</h2>
            </div>
            <PillButton href="/game-changers" variant="light" label="Meet the whole team" />
          </div>
        </div>

        <div className="ts-viewport">
          <div ref={trackRef} className="ts-track" data-ts-anim aria-label="Team members">
            {MEMBERS.map((m) => (
              <article key={m.name} className="ts-card">
                <div className="ts-media">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className="ts-img" src={m.image} alt={m.name} draggable={false} />
                  {"linkedin" in m && m.linkedin && (
                    <div className="ts-hover">
                      <div className="ts-social">
                        <a href={m.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${m.name} on LinkedIn`}>
                          <LinkedInIcon />
                        </a>
                      </div>
                    </div>
                  )}
                </div>
                <h3 className="ts-name">{m.name}</h3>
                <div className="ts-role">{m.role}</div>
              </article>
            ))}
          </div>
        </div>

        <div className="ts-container">
          <div className="ts-progress" aria-hidden="true">
            <span ref={barRef} />
          </div>
        </div>
      </div>
    </section>
  );
}
