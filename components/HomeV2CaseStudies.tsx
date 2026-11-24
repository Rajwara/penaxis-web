"use client";

import { useEffect, useRef } from "react";
import { caseStudies } from "@/lib/data";
// Same fonts as the supplied section: variable Big Shoulders (with its
// optical-size axis) + Wix Madefor Display. Self-hosted, used only here.
import "@fontsource-variable/big-shoulders/opsz.css";
import "@fontsource-variable/wix-madefor-display/index.css";

// /home-v2 case studies. Ported from a client-supplied "Creative Solutions"
// section (static HTML/CSS/JS): the section pins while scrolling and the
// card track slides sideways; the heading letters brighten left-to-right
// as it scrolls in; hovering a card fades in its image with a "View more"
// button. Fonts, sizes, colours and timings match the supplied files.
// Content: the first six case studies from lib/data.ts (same order the
// live homepage features them in).

const HEADING = "Featured Work";
const SPREAD = 5; // how many letters animate at once (from the zip)

// Short card titles — the full case-study titles are too long for the
// 48px uppercase card heading.
const SHORT_TITLES: Record<string, string> = {
  "drivelo-logistics-platform": "Drivelo Logistics",
  "ai-receptionist-visitor-kiosk": "AI Visitor Kiosk",
  "bidlogics-tender-intelligence": "BidLogics Tender AI",
  "seka-gravel-cycling-platform": "Seka Gravel Cycling",
  "hotel-booking-revenue-platform": "Hotel Revenue Hub",
  "the-plate-agent-marketplace": "The Plate Agent",
};

const ITEMS = caseStudies.slice(0, 6).map((c, i) => ({
  slug: c.slug,
  num: String(i + 1).padStart(2, "0"),
  title: SHORT_TITLES[c.slug] ?? c.title,
  desc: c.blurb,
  image: ("bannerImages" in c && c.bannerImages?.[0]) || c.gridImage || c.image,
}));

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));

function Arrow() {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
      <path d="M18.256 23.076l-0.944-0.959 5.451-5.451h-16.097v-1.333h16.097l-5.451-5.451 0.944-0.959 7.077 7.077-7.077 7.077z" />
    </svg>
  );
}

function CardIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <path d="M58.75 30.0004V16.0004C58.75 15.7254 58.6 15.4754 58.3625 15.3379L47.3625 9.33789C47.1375 9.21289 46.875 9.21289 46.65 9.33789L43.75 10.8754V8.00039C43.75 7.72539 43.6 7.47539 43.3625 7.33789L32.3625 1.33789C32.1375 1.21289 31.875 1.21289 31.65 1.33789L5.65 15.3379C5.4125 15.4629 5.25 15.7254 5.25 16.0004V30.0004C5.25 30.2754 5.4 30.5254 5.6375 30.6629L8.075 32.0004L5.6375 33.3504C5.4 33.4879 5.25 33.7379 5.25 34.0129V48.0129C5.25 48.2879 5.4 48.5379 5.65 48.6754L31.65 62.6754C31.875 62.8004 32.1375 62.8004 32.3625 62.6754L43.3625 56.6754C43.6 56.5379 43.75 56.2879 43.75 56.0129V53.1379L46.65 54.6754C46.875 54.8004 47.1375 54.8004 47.3625 54.6754L58.3625 48.6754C58.6 48.5379 58.75 48.2879 58.75 48.0129V34.0004C58.75 33.7254 58.6 33.4754 58.35 33.3379L55.85 32.0004L58.3625 30.6629C58.6 30.5254 58.75 30.2754 58.75 30.0004ZM47 10.8504L56.425 16.0004L32 29.1504L22.575 24.0004L47 10.8504ZM17.75 22.4504L42.25 9.26289V11.6879L20.6375 23.3504C20.4 23.4754 20.2375 23.7379 20.25 24.0129V33.4129L17.75 34.7504V22.4504ZM21.75 25.2629L31.25 30.4379V42.7254L21.75 37.5379V25.2629ZM32 2.85039L41.425 8.00039L17 21.1504L7.575 16.0004L32 2.85039ZM6.75 29.5629V17.2629L16.25 22.4379V34.7379L9.9875 31.3379L6.75 29.5629ZM9.625 32.8504L16.6375 36.6504C16.8625 36.7754 17.125 36.7754 17.35 36.6504L20.25 35.0879V38.0004C20.25 38.2754 20.4 38.5254 20.6375 38.6629L31.6375 44.6629C31.8625 44.7879 32.125 44.7879 32.35 44.6629L39.35 40.8879L41.425 42.0004L32 47.1504L7.5625 33.9879L9.625 32.8504ZM43.2 38.8129L46.25 40.4504V52.7504L43.75 51.4254V42.0004C43.75 41.7254 43.6 41.4754 43.35 41.3379L40.925 40.0379L43.2 38.8129ZM6.75 35.2504L31.25 48.4379V60.7504L6.75 47.5504V35.2504ZM42.25 55.5504L32.75 60.7379V48.4504L42.25 43.2629V55.5504ZM47.75 52.7379V40.4504L57.25 35.2629V47.5504L47.75 52.7379ZM56.425 34.0129L47 39.1504L44.7875 37.9629L54.25 32.8629L56.425 34.0129ZM32.75 42.7504V30.4504L57.25 17.2629V29.5504L32.75 42.7504Z" fill="currentColor" />
    </svg>
  );
}

function ButtonContent({ label }: { label: string }) {
  return (
    <>
      <span className="hv2c-btn-fill" />
      <span className="hv2c-btn-clip">
        <span className="hv2c-btn-inner">
          <span>{label}</span>
          <span className="hv2c-btn-icon"><Arrow /></span>
        </span>
        <span className="hv2c-btn-inner is-hover" aria-hidden="true">
          <span>{label}</span>
          <span className="hv2c-btn-icon"><Arrow /></span>
        </span>
      </span>
    </>
  );
}

export default function HomeV2CaseStudies() {
  const rootRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const shiftRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const spaceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    root.classList.add("hv2c-js");

    // One-time reveal for the sub-title and top line.
    const once = root.querySelectorAll("[data-anim]");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in-view");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    once.forEach((el) => io.observe(el));

    const letters = Array.from(headingRef.current?.querySelectorAll<HTMLElement>(".hv2c-letter") ?? []);

    // Scroll-scrubbed: (a) heading letters 0.3 -> 1 opacity, 10px -> 0 x,
    // left to right; (b) while pinned, slide the track left until the last
    // card lines up with the container's right edge.
    const update = () => {
      const vh = window.innerHeight;
      const heading = headingRef.current;
      if (heading && letters.length) {
        const top = heading.getBoundingClientRect().top;
        const p = clamp((vh - top) / (vh * 0.6));
        const n = letters.length;
        letters.forEach((l, i) => {
          const lp = clamp((p * (n + SPREAD) - i) / SPREAD);
          l.style.opacity = (0.3 + 0.7 * lp).toFixed(3);
          l.style.transform = `translate3d(${(10 * (1 - lp)).toFixed(2)}px,0,0)`;
        });
      }
      const wrap = wrapRef.current, sticky = stickyRef.current, shift = shiftRef.current, track = trackRef.current, space = spaceRef.current;
      if (wrap && sticky && shift && track && space) {
        const stickyTop = parseFloat(getComputedStyle(sticky).top) || 0;
        const distance = space.offsetHeight;
        const p = clamp((stickyTop - wrap.getBoundingClientRect().top) / distance);
        const max = Math.max(0, track.scrollWidth - shift.clientWidth);
        track.style.transform = `translate3d(${(-max * p).toFixed(2)}px,0,0)`;
      }
    };

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        update();
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("load", update);
    document.fonts?.ready.then(update);
    update();

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("load", update);
    };
  }, []);

  const words = HEADING.split(" ");

  return (
    <section ref={rootRef} className="hv2c-wrap" data-nav-theme="dark" aria-labelledby="hv2c-title">
      <div className="hv2c-inner">
        <div className="hv2c-container">
          <div ref={wrapRef} className="hv2c-carousel">
            {/* Pinned part */}
            <div ref={stickyRef} className="hv2c-sticky">
              <div className="hv2c-top">
                <div className="hv2c-sub" data-anim>
                  <span className="hv2c-dot is-start" />
                  <span className="hv2c-sub-mask">
                    <span className="hv2c-sub-track">
                      <span>Our case studies</span>
                      <span className="hv2c-dot is-end" />
                    </span>
                  </span>
                </div>

                <a href="/case-studies" className="hv2c-btn is-link">
                  <ButtonContent label="View all case studies" />
                </a>

                <div className="hv2c-top-line" data-anim aria-hidden="true" />
              </div>

              <h2 ref={headingRef} id="hv2c-title" className="hv2c-heading" aria-label={HEADING}>
                {words.map((w, wi) => (
                  <span key={wi}>
                    {wi > 0 && " "}
                    <span className="hv2c-word" aria-hidden="true">
                      {[...w].map((ch, ci) => (
                        <span key={ci} className="hv2c-letter">{ch}</span>
                      ))}
                    </span>
                  </span>
                ))}
              </h2>

              <div ref={shiftRef} className="hv2c-shift">
                <div ref={trackRef} className="hv2c-track">
                  {ITEMS.map((item) => (
                    <div key={item.slug} className="hv2c-item">
                      <div className="hv2c-card">
                        <div className="hv2c-card-icon"><CardIcon /></div>
                        <div className="hv2c-card-bg">
                          <img className="hv2c-card-img" src={item.image} alt="" />
                          <div className="hv2c-card-overlay" />
                          <div className="hv2c-card-btn">
                            <a href={`/case-studies/${item.slug}`} className="hv2c-btn is-solid">
                              <ButtonContent label="View more" />
                            </a>
                          </div>
                        </div>
                        <div className="hv2c-card-content">
                          <div className="hv2c-card-head">
                            <h3 className="hv2c-card-title">{item.title}</h3>
                            <div className="hv2c-card-num">{item.num}</div>
                          </div>
                          <p className="hv2c-card-desc">{item.desc}</p>
                          <div className="hv2c-card-bottom" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Scroll distance while pinned */}
            <div ref={spaceRef} className="hv2c-space" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}
