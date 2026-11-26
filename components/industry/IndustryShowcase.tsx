"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { industries, slugify } from "@/lib/data";
import { moreIndustries } from "@/lib/industriesMore";

// /industries "showcase" gallery, ported from the supplied
// community-showcase file: dark rounded box, "/ label /" + heading that
// reveals letter by letter, 4-column masonry (each card goes into the
// shortest column, same ratios as the file), image zoom + title on hover,
// cut off with a bottom fade and a pill button. Cards = Penaxis industries,
// each linking to its page. Styles: .isc-* in app/globals.css.

const RATIOS = [322 / 428, 322 / 318, 322 / 428, 322 / 490, 322 / 428, 322 / 428, 322 / 490, 322 / 318, 322 / 428, 322 / 490, 322 / 318, 322 / 428];
const TITLE = "Industries we help move forward";

// First 12 shown on load; "Load more industries" adds the next 12 (the
// 13th original industry + the 11 newer ones, whose photos are temporary
// duplicates until real images are uploaded).
const ITEMS = [...industries, ...moreIndustries].slice(0, 24).map((ind, i) => ({
  title: ind.title,
  href: `/industries/${slugify(ind.title)}`,
  image: ind.image,
  ratio: RATIOS[i % RATIOS.length],
}));
const FIRST = 12;

const colsFor = (w: number) => (w <= 767 ? 1 : w <= 1024 ? 2 : 4);

function Chevron() {
  return (
    <svg viewBox="0 0 6 10" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M1 1l4 4-4 4" />
    </svg>
  );
}

export default function IndustryShowcase() {
  const [cols, setCols] = useState(4);
  const [shown, setShown] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? ITEMS : ITEMS.slice(0, FIRST);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const update = () => setCols(colsFor(window.innerWidth));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    const h = titleRef.current;
    if (!h) return;
    const io = new IntersectionObserver(
      (es) => {
        if (es.some((e) => e.isIntersecting)) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(h);
    return () => io.disconnect();
  }, []);

  // masonry: shortest column first (as in the file)
  const columns: (typeof visible)[] = Array.from({ length: cols }, () => []);
  const heights = new Array(cols).fill(0);
  visible.forEach((it) => {
    let min = 0;
    for (let i = 1; i < cols; i++) if (heights[i] < heights[min] - 1e-6) min = i;
    columns[min].push(it);
    heights[min] += 1 / it.ratio + 0.0932;
  });

  let li = 0;
  return (
    <section className="isc-section" aria-labelledby="isc-title">
      <div className={`isc${expanded ? " is-expanded" : ""}`} data-nav-theme="dark">
        <div className="isc-head">
          <span className="isc-sub">industries</span>
          <h2 ref={titleRef} id="isc-title" className={`isc-title${shown ? " is-visible" : ""}`} aria-label={TITLE}>
            {TITLE.split(" ").map((w, wi) => (
              <span key={wi}>
                {wi > 0 && " "}
                <span className="isc-word" aria-hidden="true">
                  {[...w].map((ch, ci) => (
                    <span key={ci} className="isc-letter" style={{ transitionDelay: `${(li++ * 0.03).toFixed(2)}s` }}>
                      {ch}
                    </span>
                  ))}
                </span>
              </span>
            ))}
          </h2>
        </div>

        <div id="isc-gallery" className="isc-gallery" aria-live="polite">
          {columns.map((col, ci) => (
            <div key={ci} className="isc-col">
              {col.map((it) => (
                <Link key={it.title} href={it.href} className="isc-item">
                  <span className="isc-media" style={{ aspectRatio: String(it.ratio) }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={it.image} alt="" loading="lazy" />
                  </span>
                  <span className="isc-content">
                    <span className="isc-item-title">{it.title}</span>
                  </span>
                </Link>
              ))}
            </div>
          ))}
        </div>

        {!expanded && (
          <div className="isc-fade">
            <button type="button" className="isc-btn" onClick={() => setExpanded(true)} aria-controls="isc-gallery">
              <span className="isc-arrow is-left"><Chevron /></span>
              Load more industries
              <span className="isc-arrow is-right"><Chevron /></span>
            </button>
          </div>
        )}
        {expanded && (
          <div className="isc-end">
            <a className="isc-btn" href="#all-industries">
              <span className="isc-arrow is-left"><Chevron /></span>
              Explore all industries
              <span className="isc-arrow is-right"><Chevron /></span>
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
