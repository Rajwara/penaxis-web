"use client";

import { industries, slugify } from "@/lib/data";
import MegaShell, { MmArrow } from "./MegaShell";

// Industries mega menu: shared MegaShell layout with Penaxis's 13
// industries grouped into 5 categories.

const CATEGORIES = [
  {
    heading: "Technology & Digital",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
      </svg>
    ),
    items: ["Software, IT & SaaS", "Education & EdTech", "Fintech & Financial Services"],
  },
  {
    heading: "Commerce & Retail",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M3 6h18l-1.5 11a2 2 0 0 1-2 1.7H6.5a2 2 0 0 1-2-1.7L3 6z" />
        <path d="M8 6V5a4 4 0 0 1 8 0v1" />
      </svg>
    ),
    items: ["E-Commerce & Retail", "Food Delivery & Grocery", "Real Estate & Property"],
  },
  {
    heading: "Health & Lifestyle",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M20.8 8.6c0 5.4-8.8 10.4-8.8 10.4S3.2 14 3.2 8.6a4.6 4.6 0 0 1 8.8-1.8 4.6 4.6 0 0 1 8.8 1.8z" />
      </svg>
    ),
    items: ["Healthcare & Wellness", "Sports & Fitness", "Pet Care & Veterinary"],
  },
  {
    heading: "Operations & Mobility",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="1" y="7" width="13" height="10" rx="1" />
        <path d="M14 10h4l4 4v3h-8z" />
      </svg>
    ),
    items: ["Logistics & Transportation", "Automotive & Auto Care", "Home Services & Maintenance"],
  },
  {
    heading: "Professional Services",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-3.5 3.5-6 8-6s8 2.5 8 6" />
      </svg>
    ),
    items: ["Consulting, Staffing & Immigration"],
  },
];

export default function IndustriesMegaMenu() {
  return (
    <MegaShell
      eyebrow="Industries"
      title="13 industries, one team"
      text="From software and healthcare to logistics and real estate, we build for how each one actually works."
      cta={{ label: "Explore industries", href: "/industries" }}
      sectionLabel="Where we work"
      viewAll={{ label: "All industries", href: "/industries" }}
    >
      <div className="mm-cats">
        {CATEGORIES.map((cat) => (
          <div key={cat.heading} className="mm-cat">
            <span className="mm-icon">{cat.icon}</span>
            <p className="mm-item-title">{cat.heading}</p>
            <ul className="mm-links">
              {cat.items.map((title) => (
                <li key={title}>
                  <a href={`/industries/${slugify(title)}`} title={industries.find((i) => i.title === title)?.copy}>
                    <span>{title}</span>
                    <MmArrow />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </MegaShell>
  );
}
