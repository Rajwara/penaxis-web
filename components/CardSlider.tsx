"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

// Reusable pinned card slider (homepage "Featured Work" card design): the
// block pins while you scroll and the page scroll moves the cards sideways,
// with a progress bar and a button underneath. Same behaviour and styles
// (.ics-*, .hv2c-card) as the /industries case-study slider.

export type SliderCard = {
  key: string;
  href: string;
  title: string;
  blurb: string;
  image: string;
  highlightTag?: string;
  tags?: string[];
  metrics?: { value: string; label: string }[];
};

type Props = {
  id: string;
  eyebrow: string;
  title: string;
  intro: string;
  cards: SliderCard[];
  hoverLabel: string;
  cta: { label: string; href: string };
  ariaLabel: string;
};

function CardIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <path d="M58.75 30.0004V16.0004C58.75 15.7254 58.6 15.4754 58.3625 15.3379L47.3625 9.33789C47.1375 9.21289 46.875 9.21289 46.65 9.33789L43.75 10.8754V8.00039C43.75 7.72539 43.6 7.47539 43.3625 7.33789L32.3625 1.33789C32.1375 1.21289 31.875 1.21289 31.65 1.33789L5.65 15.3379C5.4125 15.4629 5.25 15.7254 5.25 16.0004V30.0004C5.25 30.2754 5.4 30.5254 5.6375 30.6629L8.075 32.0004L5.6375 33.3504C5.4 33.4879 5.25 33.7379 5.25 34.0129V48.0129C5.25 48.2879 5.4 48.5379 5.65 48.6754L31.65 62.6754C31.875 62.8004 32.1375 62.8004 32.3625 62.6754L43.3625 56.6754C43.6 56.5379 43.75 56.2879 43.75 56.0129V53.1379L46.65 54.6754C46.875 54.8004 47.1375 54.8004 47.3625 54.6754L58.3625 48.6754C58.6 48.5379 58.75 48.2879 58.75 48.0129V34.0004C58.75 33.7254 58.6 33.4754 58.35 33.3379L55.85 32.0004L58.3625 30.6629C58.6 30.5254 58.75 30.2754 58.75 30.0004ZM47 10.8504L56.425 16.0004L32 29.1504L22.575 24.0004L47 10.8504ZM17.75 22.4504L42.25 9.26289V11.6879L20.6375 23.3504C20.4 23.4754 20.2375 23.7379 20.25 24.0129V33.4129L17.75 34.7504V22.4504ZM21.75 25.2629L31.25 30.4379V42.7254L21.75 37.5379V25.2629ZM32 2.85039L41.425 8.00039L17 21.1504L7.575 16.0004L32 2.85039ZM6.75 29.5629V17.2629L16.25 22.4379V34.7379L9.9875 31.3379L6.75 29.5629ZM9.625 32.8504L16.6375 36.6504C16.8625 36.7754 17.125 36.7754 17.35 36.6504L20.25 35.0879V38.0004C20.25 38.2754 20.4 38.5254 20.6375 38.6629L31.6375 44.6629C31.8625 44.7879 32.125 44.7879 32.35 44.6629L39.35 40.8879L41.425 42.0004L32 47.1504L7.5625 33.9879L9.625 32.8504ZM43.2 38.8129L46.25 40.4504V52.7504L43.75 51.4254V42.0004C43.75 41.7254 43.6 41.4754 43.35 41.3379L40.925 40.0379L43.2 38.8129ZM6.75 35.2504L31.25 48.4379V60.7504L6.75 47.5504V35.2504ZM42.25 55.5504L32.75 60.7379V48.4504L42.25 43.2629V55.5504ZM47.75 52.7379V40.4504L57.25 35.2629V47.5504L47.75 52.7379ZM56.425 34.0129L47 39.1504L44.7875 37.9629L54.25 32.8629L56.425 34.0129ZM32.75 42.7504V30.4504L57.25 17.2629V29.5504L32.75 42.7504Z" fill="currentColor" />
    </svg>
  );
}

export default function CardSlider({ id, eyebrow, title, intro, cards, hoverLabel, cta, ariaLabel }: Props) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);

  // Like the homepage "Featured Work": while you scroll through this block it
  // pins, and the page scroll moves the cards sideways (no arrows needed).
  useEffect(() => {
    const scroller = scrollerRef.current;
    const track = trackRef.current;
    if (!scroller || !track) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      scroller.classList.add("is-static");
      return;
    }
    let dist = 0;
    const measure = () => {
      const pad = parseFloat(getComputedStyle(track).paddingLeft) || 0;
      dist = Math.max(0, track.scrollWidth - window.innerWidth + pad);
      scroller.style.height = `${window.innerHeight + dist}px`;
    };
    measure();
    window.addEventListener("resize", measure);
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    let cur = 0, raf = 0;
    const tick = () => {
      const top = scroller.getBoundingClientRect().top;
      const target = dist > 0 ? Math.min(1, Math.max(0, -top / dist)) : 0;
      cur += (target - cur) * 0.12;
      if (Math.abs(target - cur) < 0.0005) cur = target;
      track.style.transform = `translate3d(${(-cur * dist).toFixed(1)}px,0,0)`;
      if (barRef.current) barRef.current.style.transform = `scaleX(${Math.max(0.08, cur)})`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("resize", measure);
      ro.disconnect();
      cancelAnimationFrame(raf);
      scroller.style.height = "";
    };
  }, []);

  if (!cards.length) return null;

  return (
    <section className="ics" aria-labelledby={id}>
      <div className="ics-container">
        <div className="ics-head">
          <div>
            <span className="ics-eyebrow">{eyebrow}</span>
            <h2 id={id} className="ics-title">{title}</h2>
            <p className="ics-intro">{intro}</p>
          </div>
        </div>
      </div>

      <div ref={scrollerRef} className="ics-scroller">
        <div className="ics-sticky">
          <div ref={trackRef} className="ics-track hv2c-wrap" aria-label={ariaLabel}>
            {cards.map((s, i) => (
              <Link key={s.key} href={s.href} className="ics-card" aria-label={`${s.title}: ${hoverLabel.toLowerCase()}`}>
                <div className="hv2c-card">
                  <div className="hv2c-card-icon"><CardIcon /></div>
                  <div className="hv2c-card-bg">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img className="hv2c-card-img" src={s.image} alt="" loading="lazy" draggable={false} />
                    <div className="hv2c-card-overlay" />
                    <div className="hv2c-card-btn">
                      <span className="hv2-btn hv2-btn--light" aria-hidden="true">
                        <span className="hv2-btn-label">{hoverLabel}</span>
                        <span className="hv2-btn-icon">
                          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7M8 7h9v9" /></svg>
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className="hv2c-card-content">
                    <div className="hv2c-card-head">
                      <h3 className="hv2c-card-title">{s.title}</h3>
                      <div className="hv2c-card-num">{String(i + 1).padStart(2, "0")}</div>
                    </div>
                    <p className="hv2c-card-desc">{s.blurb}</p>
                    {(s.highlightTag || s.tags?.length) && (
                      <span className="ics-tags">
                        {s.highlightTag && <span className="ics-tag is-industry">{s.highlightTag}</span>}
                        {s.tags?.map((x) => <span key={x} className="ics-tag">{x}</span>)}
                      </span>
                    )}
                    {s.metrics?.length ? (
                      <span className="ics-metrics">
                        {s.metrics.map((m) => (
                          <span key={m.label} className="ics-metric">
                            <span className="ics-metric-value">{m.value}</span>
                            <span className="ics-metric-label">{m.label}</span>
                          </span>
                        ))}
                      </span>
                    ) : null}
                    <div className="hv2c-card-bottom" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="ics-container ics-foot">
            <div className="ics-progress" aria-hidden="true"><span ref={barRef} /></div>
            <Link href={cta.href} className="hv2-btn">
              <span className="hv2-btn-label">{cta.label}</span>
              <span className="hv2-btn-icon">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" /></svg>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
