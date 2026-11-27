"use client";

import { useEffect, useRef, useState } from "react";

// Project-overview stats bar on single case study pages. Numbers count up
// once when the bar scrolls into view; any prefix/suffix (≤, %, "-Second")
// is kept as written.

type Metric = { value: string; label: string };

function parse(v: string) {
  const m = v.match(/^([^\d]*)([\d,]*\.?\d+)(.*)$/);
  if (!m) return null;
  const raw = m[2];
  return { pre: m[1], num: parseFloat(raw.replace(/,/g, "")), dec: raw.includes(".") ? raw.split(".")[1].length : 0, comma: raw.includes(","), post: m[3] };
}

function fmt(n: number, dec: number, comma: boolean) {
  const s = n.toFixed(dec);
  return comma ? Number(s).toLocaleString("en-US", { minimumFractionDigits: dec, maximumFractionDigits: dec }) : s;
}

function Stat({ m, run }: { m: Metric; run: boolean }) {
  const p = parse(m.value);
  const [shown, setShown] = useState(p ? fmt(0, p.dec, p.comma) : m.value);
  useEffect(() => {
    if (!p || !run) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return setShown(fmt(p.num, p.dec, p.comma));
    let raf = 0;
    const t0 = performance.now();
    const dur = 1600;
    const tick = (t: number) => {
      const k = Math.min(1, (t - t0) / dur);
      const e = 1 - Math.pow(1 - k, 3);
      setShown(fmt(p.num * e, p.dec, p.comma));
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [run]);
  return (
    <div className="csx-stat">
      <div className="csx-stat-value" aria-label={m.value}>
        <span aria-hidden="true">{p ? `${p.pre}${shown}${p.post}` : m.value}</span>
      </div>
      <div className="csx-stat-label">{m.label}</div>
    </div>
  );
}

export default function CaseStudyStats({ metrics }: { metrics: Metric[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [run, setRun] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setRun(true), io.disconnect()), { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  if (!metrics.length) return null;
  return (
    <div ref={ref} className="csx-stats" style={{ ["--n" as string]: metrics.length } as React.CSSProperties}>
      {metrics.map((m) => (
        <Stat key={m.label} m={m} run={run} />
      ))}
    </div>
  );
}
