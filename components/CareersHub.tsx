"use client";

import Reveal from "./Reveal";
import { careers } from "@/lib/data";

// /careers page (below CareersHero): a banner and the list of open roles
// (condensed from the team's real LinkedIn postings — see lib/data.ts).
// Each role links to its own /careers/[slug] page, which has the
// application form (sent to the careers inbox via /api/contact).

export default function CareersHub() {
  return (
    <>
      <section className="car-banner">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <span className="car-eyebrow">Careers</span>
            <h2 className="car-heading">Help us build what&apos;s next</h2>
            <p className="car-intro">
              We&apos;re a small, hands-on team across Pakistan, the UAE, and beyond - building
              AI-powered products, software, and growth systems for real clients. Here&apos;s
              what we&apos;re hiring for right now.
            </p>
          </Reveal>
        </div>
      </section>

      <section id="open-roles" className="car-roles car-roles--list" aria-labelledby="car-roles-title">
        <div className="car-roles-inner" data-nav-theme="dark">
          <div className="car-roles-head">
            <div>
              <span className="car-roles-pill">Open roles</span>
              <h2 id="car-roles-title" className="car-roles-title">Open roles</h2>
            </div>
            <p className="car-roles-note">
              These are the roles we&apos;re hiring for right now. Open a role to see the full
              details and apply for it directly.
            </p>
          </div>

          <ul className="car-list">
            {careers.map((role) => {
              const kind = role.type.split(" - ")[0];
              return (
                <li key={role.slug} className="car-row">
                  <a href={`/careers/${role.slug}`} className="car-row-head">
                    <span className="car-row-text">
                      <span className="car-row-title">{role.title}</span>
                      <span className="car-row-meta">
                        {role.location} &middot; {kind} &middot; {role.experience}
                      </span>
                      <span className="car-row-desc">{role.summary}</span>
                    </span>
                    <span className="car-row-cta">
                      View role
                      <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M7 17 17 7M8 7h9v9" />
                      </svg>
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
}
