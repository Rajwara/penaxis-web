"use client";

import { caseStudies, industries, slugify } from "@/lib/data";

// Industries mega menu, laid out like the supplied reference: dark panel,
// intro column on the left (label pill, heading, "Explore all" link and a
// featured case study card) and a 3-column grid of groups on the right,
// each with a title, a one-line description and its industry links.
// Penaxis's 13 industries in 6 groups. Styles: .im-* in app/globals.css.

const GROUPS = [
  {
    title: "Technology & SaaS",
    text: "Platforms, portals and AI tools for software companies and learning businesses.",
    items: ["Software, IT & SaaS", "Education & EdTech"],
  },
  {
    title: "Finance & Professional",
    text: "Secure, compliant systems for financial services and people-driven firms.",
    items: ["Fintech & Financial Services", "Consulting, Staffing & Immigration"],
  },
  {
    title: "Commerce & Retail",
    text: "Stores, marketplaces and ordering apps built to convert and scale.",
    items: ["E-Commerce & Retail", "Food Delivery & Grocery"],
  },
  {
    title: "Health & Lifestyle",
    text: "Booking, care and membership platforms that people enjoy using.",
    items: ["Healthcare & Wellness", "Sports & Fitness", "Pet Care & Veterinary"],
  },
  {
    title: "Mobility & Logistics",
    text: "Dispatch, fleet and service systems that keep operations moving.",
    items: ["Logistics & Transportation", "Automotive & Auto Care"],
  },
  {
    title: "Property & Home",
    text: "Listings, CRMs and on-demand service apps for property and home businesses.",
    items: ["Real Estate & Property", "Home Services & Maintenance"],
  },
];

const FEATURED = caseStudies.find((c) => c.slug === "drivelo-logistics-platform") ?? caseStudies[0];

export default function IndustriesMegaMenu() {
  return (
    <div className="mega-panel im">
      <div className="im-intro">
        <span className="im-pill">Industries</span>
        <p className="im-title">{industries.length} industries, one team</p>
        <a href="/industries" className="im-explore">
          Explore all industries
        </a>

        <a href={`/case-studies/${FEATURED.slug}`} className="im-feature">
          <span className="im-feature-img">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={FEATURED.gridImage || FEATURED.image} alt="" loading="lazy" />
          </span>
          <span className="im-feature-label">Featured work</span>
          <span className="im-feature-title">{FEATURED.title}</span>
          <span className="im-feature-text">{FEATURED.blurb}</span>
        </a>
      </div>

      <div className="im-grid">
        {GROUPS.map((g) => (
          <div key={g.title} className="im-group">
            <p className="im-group-title">{g.title}</p>
            <p className="im-group-text">{g.text}</p>
            <ul className="im-links">
              {g.items.map((t) => (
                <li key={t}>
                  <a href={`/industries/${slugify(t)}`} title={industries.find((i) => i.title === t)?.copy}>
                    {t}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
