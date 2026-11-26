"use client";

import { useState } from "react";

// Numbered FAQ rows (one open at a time), like the supplied neuro layout.
export default function IndustryFaq({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="nx-qas">
      {items.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.q} className={`nx-qa pd-reveal${isOpen ? " is-open" : ""}`}>
            <button type="button" className="nx-qa-btn" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? -1 : i)}>
              <span className="nx-qa-n">{String(i + 1).padStart(2, "0")}</span>
              <span className="nx-qa-q">{f.q}</span>
              <span className="nx-qa-arr" aria-hidden="true">◢</span>
            </button>
            <div className="nx-qa-ans">
              <p>{f.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
