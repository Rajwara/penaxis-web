"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { industries, caseStudies } from "@/lib/data";
import {
  FILTER_MODES,
  FILTER_OPTIONS,
  type FilterMode,
} from "@/lib/caseStudyFilters";
import { CASE_STUDY_CAPABILITIES, CASE_STUDY_SHORT_TITLES } from "@/lib/caseStudyCards";

// /case-studies grid: industry filter pills + the homepage case-study card
// design (dark card, big title + number, description, icon; hovering fades
// in the project image with a "View more" button). Card styles are the
// homepage's .hv2c-card rules; the section wears .hv2c-wrap for its
// variables. A parent filter (by industry / service / tools & technology)
// decides which options appear in the pill bar (lib/caseStudyFilters.ts).

const PLACEHOLDER_STUDIES = caseStudies;

function CardIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <path
        d="M58.75 30.0004V16.0004C58.75 15.7254 58.6 15.4754 58.3625 15.3379L47.3625 9.33789C47.1375 9.21289 46.875 9.21289 46.65 9.33789L43.75 10.8754V8.00039C43.75 7.72539 43.6 7.47539 43.3625 7.33789L32.3625 1.33789C32.1375 1.21289 31.875 1.21289 31.65 1.33789L5.65 15.3379C5.4125 15.4629 5.25 15.7254 5.25 16.0004V30.0004C5.25 30.2754 5.4 30.5254 5.6375 30.6629L8.075 32.0004L5.6375 33.3504C5.4 33.4879 5.25 33.7379 5.25 34.0129V48.0129C5.25 48.2879 5.4 48.5379 5.65 48.6754L31.65 62.6754C31.875 62.8004 32.1375 62.8004 32.3625 62.6754L43.3625 56.6754C43.6 56.5379 43.75 56.2879 43.75 56.0129V53.1379L46.65 54.6754C46.875 54.8004 47.1375 54.8004 47.3625 54.6754L58.3625 48.6754C58.6 48.5379 58.75 48.2879 58.75 48.0129V34.0004C58.75 33.7254 58.6 33.4754 58.35 33.3379L55.85 32.0004L58.3625 30.6629C58.6 30.5254 58.75 30.2754 58.75 30.0004ZM47 10.8504L56.425 16.0004L32 29.1504L22.575 24.0004L47 10.8504ZM17.75 22.4504L42.25 9.26289V11.6879L20.6375 23.3504C20.4 23.4754 20.2375 23.7379 20.25 24.0129V33.4129L17.75 34.7504V22.4504ZM21.75 25.2629L31.25 30.4379V42.7254L21.75 37.5379V25.2629ZM32 2.85039L41.425 8.00039L17 21.1504L7.575 16.0004L32 2.85039ZM6.75 29.5629V17.2629L16.25 22.4379V34.7379L9.9875 31.3379L6.75 29.5629ZM9.625 32.8504L16.6375 36.6504C16.8625 36.7754 17.125 36.7754 17.35 36.6504L20.25 35.0879V38.0004C20.25 38.2754 20.4 38.5254 20.6375 38.6629L31.6375 44.6629C31.8625 44.7879 32.125 44.7879 32.35 44.6629L39.35 40.8879L41.425 42.0004L32 47.1504L7.5625 33.9879L9.625 32.8504ZM43.2 38.8129L46.25 40.4504V52.7504L43.75 51.4254V42.0004C43.75 41.7254 43.6 41.4754 43.35 41.3379L40.925 40.0379L43.2 38.8129ZM6.75 35.2504L31.25 48.4379V60.7504L6.75 47.5504V35.2504ZM42.25 55.5504L32.75 60.7379V48.4504L42.25 43.2629V55.5504ZM47.75 52.7379V40.4504L57.25 35.2629V47.5504L47.75 52.7379ZM56.425 34.0129L47 39.1504L44.7875 37.9629L54.25 32.8629L56.425 34.0129ZM32.75 42.7504V30.4504L57.25 17.2629V29.5504L32.75 42.7504Z"
        fill="currentColor"
      />
    </svg>
  );
}

const findIndustry = (title: string) =>
  industries.find((i) => i.title === title);

export default function CaseStudyV2Grid() {
  const [mode, setMode] = useState<FilterMode>("industry");
  const [active, setActive] = useState<string>("all");
  const [menuOpen, setMenuOpen] = useState(false);
  const filterScrollRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const options = FILTER_OPTIONS[mode];
  const modeLabel = FILTER_MODES.find((m) => m.id === mode)!.label;

  // Close the parent-filter menu on outside click or Escape.
  useEffect(() => {
    if (!menuOpen) return;
    const onDown = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node))
        setMenuOpen(false);
    };
    const onKey = (e: KeyboardEvent) =>
      e.key === "Escape" && setMenuOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  // Links from the Case Studies mega menu: /case-studies?by=industry&filter=<option id>#browse
  // preselect that parent filter + option, then bring the grid into view
  // (re-scroll once the pinned sections above have their final height).
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const by = q.get("by") as FilterMode | null;
    const f = q.get("filter");
    if (!by || !(by in FILTER_OPTIONS)) return;
    setMode(by);
    if (f && FILTER_OPTIONS[by].some((o) => o.id === f)) setActive(f);
    const go = () => document.getElementById("browse")?.scrollIntoView({ block: "start" });
    const t1 = setTimeout(go, 200);
    const t2 = setTimeout(go, 900);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const chooseMode = (m: FilterMode) => {
    setMode(m);
    setActive("all");
    setMenuOpen(false);
    filterScrollRef.current?.scrollTo({ left: 0 });
  };

  const scrollFilters = (dir: 1 | -1) => {
    filterScrollRef.current?.scrollBy({ left: dir * 260, behavior: "smooth" });
  };

  const filtered = useMemo(() => {
    const opt = options.find((o) => o.id === active);
    return opt ? PLACEHOLDER_STUDIES.filter(opt.match) : PLACEHOLDER_STUDIES;
  }, [active, options]);

  return (
    <section id="browse" className="csv2-grid-section hv2c-wrap" data-nav-theme="dark">
      <div className="hv2c-inner">
        <div className="hv2c-container">
          <div className="csv2-head">
            <div className="hv2c-sub in-view">
              <span className="hv2c-dot is-start" />
              <span className="hv2c-sub-mask">
                <span className="hv2c-sub-track">
                  <span>Our case studies</span>
                  <span className="hv2c-dot is-end" />
                </span>
              </span>
            </div>
            <h2 className="csv2-title">Browse our work</h2>
            <p className="csv2-lead">
              Real projects we&apos;ve delivered for clients across industries,
              services and technologies. Choose how you&apos;d like to explore
              our work, then narrow it down.
            </p>
          </div>

          <div className="csv2-parent" ref={menuRef}>
            <span className="csv2-parent-label" id="csv2-parent-label">
              Explore case studies
            </span>
            <div className="csv2-parent-pick">
              <button
                type="button"
                className={`csv2-parent-btn${menuOpen ? " is-open" : ""}`}
                aria-haspopup="listbox"
                aria-expanded={menuOpen}
                aria-labelledby="csv2-parent-label csv2-parent-btn"
                id="csv2-parent-btn"
                onClick={() => setMenuOpen((o) => !o)}
              >
                {modeLabel}
                <svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
              {menuOpen && (
                <ul
                  className="csv2-parent-menu"
                  role="listbox"
                  aria-labelledby="csv2-parent-label"
                >
                  {FILTER_MODES.map((m) => (
                    <li key={m.id} role="option" aria-selected={m.id === mode}>
                      <button
                        type="button"
                        className={m.id === mode ? "is-active" : ""}
                        onClick={() => chooseMode(m.id)}
                      >
                        {m.label}
                        {m.id === mode && (
                          <svg
                            viewBox="0 0 24 24"
                            width="16"
                            height="16"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                          >
                            <path d="M5 12.5l4.5 4.5L19 7.5" />
                          </svg>
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="csv2-filters-wrap">
            <button
              type="button"
              onClick={() => scrollFilters(-1)}
              className="csv2-filter-arrow"
              aria-label="Scroll filters left"
            >
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
              >
                <path d="M15 6l-6 6 6 6" />
              </svg>
            </button>
            <div
              ref={filterScrollRef}
              className="csv2-filters"
              role="tablist"
              aria-label={`Filter case studies ${modeLabel.toLowerCase()}`}
            >
              <button
                type="button"
                onClick={() => setActive("all")}
                className={`csv2-filter ${active === "all" ? "is-active" : ""}`}
              >
                See all
              </button>
              {options.map((o) => (
                <button
                  key={o.id}
                  type="button"
                  onClick={() => setActive(o.id)}
                  className={`csv2-filter ${active === o.id ? "is-active" : ""}`}
                >
                  {o.label}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => scrollFilters(1)}
              className="csv2-filter-arrow"
              aria-label="Scroll filters right"
            >
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
              >
                <path d="M9 6l6 6-6 6" />
              </svg>
            </button>
          </div>

          <div className="csv2-cardgrid">
            {filtered.map((study) => {
              const num = String(caseStudies.indexOf(study) + 1).padStart(
                2,
                "0",
              );
              const img =
                ("cardImage" in study && study.cardImage) ||
                ("bannerImages" in study && study.bannerImages?.[0]) ||
                study.gridImage ||
                study.image;
              return (
                <a
                  key={study.slug}
                  href={`/case-studies/${study.slug}`}
                  className="csv2-cardlink"
                  aria-label={study.title}
                >
                  <div className="hv2c-card">
                    <div className="hv2c-card-icon">
                      <CardIcon />
                    </div>
                    <div className="hv2c-card-bg">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        className="hv2c-card-img"
                        src={img}
                        alt=""
                        loading="lazy"
                      />
                      <div className="hv2c-card-overlay" />
                      <div className="hv2c-card-btn">
                        {/* visual only: the whole card is the link */}
                        <span
                          className="hv2-btn hv2-btn--light"
                          aria-hidden="true"
                        >
                          <span className="hv2-btn-label">View more</span>
                          <span className="hv2-btn-icon">
                            <svg
                              viewBox="0 0 24 24"
                              width="16"
                              height="16"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M7 17 17 7M8 7h9v9" />
                            </svg>
                          </span>
                        </span>
                      </div>
                    </div>
                    <div className="hv2c-card-content">
                      <div className="hv2c-card-head">
                        <h3 className="hv2c-card-title">
                          {CASE_STUDY_SHORT_TITLES[study.slug] ?? study.title}
                        </h3>
                        <div className="hv2c-card-num">{num}</div>
                      </div>
                      <p className="hv2c-card-desc">{study.blurb}</p>
                      <div className="csv2-card-tags">
                        {study.tags.map((tag) => (
                          <span
                            key={tag}
                            className="csv2-tag"
                            title={findIndustry(tag)?.copy}
                          >
                            {tag}
                          </span>
                        ))}
                        {(CASE_STUDY_CAPABILITIES[study.slug] ?? []).map((cap) => (
                          <span key={cap} className="csv2-tag is-cap">
                            {cap}
                          </span>
                        ))}
                      </div>
                      <div className="hv2c-card-bottom" />
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
