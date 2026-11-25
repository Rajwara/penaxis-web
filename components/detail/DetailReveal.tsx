"use client";

import { useEffect, useRef, type ReactNode } from "react";

// Adds the scroll reveal from the supplied portfolio-single template to every
// .pd-reveal inside it (fade + 30px rise, play once).
export default function DetailReveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    root.classList.add("pd-js");
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12 }
    );
    root.querySelectorAll(".pd-reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className="pd">
      {children}
    </div>
  );
}
