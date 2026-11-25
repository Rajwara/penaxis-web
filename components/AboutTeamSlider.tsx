"use client";

import { useEffect, useRef, useState } from "react";
import { team } from "@/lib/data";
import PillButton from "./PillButton";
import "@fontsource-variable/big-shoulders/opsz.css";
import "@fontsource-variable/wix-madefor-display/index.css";

// /who-we-are: dark team slider after "Why choose us". Card design taken
// from the supplied team template (tall photo card, zoom on hover, glass
// social pill sliding up, uppercase name + role). Native scroll-snap track
// with prev/next arrows, mouse drag and a progress bar. Members without a
// photo yet are left out here; the full list lives on /game-changers.

const MEMBERS = team.filter((m) => m.image);

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.1c.5-1 1.8-2 3.8-2 4 0 4.8 2.6 4.8 6V21h-4v-5.6c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9V21H9z" />
    </svg>
  );
}

function Chevron({ dir }: { dir: "prev" | "next" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" style={dir === "prev" ? { transform: "scaleX(-1)" } : undefined}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export default function AboutTeamSlider() {
  const rootRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [edges, setEdges] = useState({ start: true, end: false });

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

    const onScroll = () => {
      const max = track.scrollWidth - track.clientWidth;
      const p = max > 0 ? track.scrollLeft / max : 1;
      setProgress(p);
      setEdges({ start: track.scrollLeft < 4, end: track.scrollLeft > max - 4 });
    };
    onScroll();
    track.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    // Mouse drag (touch already scrolls natively)
    let down = false, startX = 0, startLeft = 0, moved = false;
    const md = (e: MouseEvent) => {
      down = true; moved = false; startX = e.pageX; startLeft = track.scrollLeft;
      track.classList.add("is-drag");
    };
    const mm = (e: MouseEvent) => {
      if (!down) return;
      const dx = e.pageX - startX;
      if (Math.abs(dx) > 4) moved = true;
      track.scrollLeft = startLeft - dx;
    };
    const mu = () => {
      if (!down) return;
      down = false;
      track.classList.remove("is-drag");
    };
    const click = (e: MouseEvent) => {
      if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; }
    };
    track.addEventListener("mousedown", md);
    window.addEventListener("mousemove", mm);
    window.addEventListener("mouseup", mu);
    track.addEventListener("click", click, true);

    return () => {
      io.disconnect();
      track.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      track.removeEventListener("mousedown", md);
      window.removeEventListener("mousemove", mm);
      window.removeEventListener("mouseup", mu);
      track.removeEventListener("click", click, true);
    };
  }, []);

  const step = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>(".ts-card");
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    track.scrollBy({ left: dir * ((card?.offsetWidth ?? 300) + gap), behavior: "smooth" });
  };

  return (
    <section ref={rootRef} className="ts-section" data-nav-theme="dark" aria-labelledby="ts-title">
      <div className="ts-container">
        <div className="ts-head" data-ts-anim>
          <div>
            <div className="ts-sub">Our team</div>
            <h2 id="ts-title" className="ts-title">The people behind Penaxis</h2>
          </div>
          <div className="ts-nav">
            <button type="button" className="ts-arrow" onClick={() => step(-1)} disabled={edges.start} aria-label="Previous team members">
              <Chevron dir="prev" />
            </button>
            <button type="button" className="ts-arrow" onClick={() => step(1)} disabled={edges.end} aria-label="Next team members">
              <Chevron dir="next" />
            </button>
          </div>
        </div>
      </div>

      <div ref={trackRef} className="ts-track" data-ts-anim tabIndex={0} aria-label="Team members">
        {MEMBERS.map((m) => (
          <article key={m.name} className="ts-card">
            <div className="ts-media">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="ts-img" src={m.image} alt={m.name} loading="lazy" draggable={false} />
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

      <div className="ts-container">
        <div className="ts-foot" data-ts-anim>
          <div className="ts-progress" aria-hidden="true">
            <span style={{ transform: `scaleX(${Math.max(0.08, progress)})` }} />
          </div>
          <PillButton href="/game-changers" variant="light" label="Meet the whole team" />
        </div>
      </div>
    </section>
  );
}
