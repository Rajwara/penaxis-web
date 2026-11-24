import { careers, pressLogos, team } from "@/lib/data";
import Reveal from "./Reveal";
import PillButton from "./PillButton";

// Careers page hero, built from a supplied reference layout: centred eyebrow,
// big two-tone headline with an inline icon tile, intro line, then a dark
// "life at Penaxis" card beside a team photo with two stat cards, and a row
// of client logos. Uses Penaxis purple (#6A449A) as the accent and only
// real figures from lib/data.ts (team size, open roles, offices).

function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 7c3 5 8 6 14 4" />
      <path d="m15 7 3 4-4 2" />
    </svg>
  );
}

function UpArrow() {
  return (
    <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 19V5M6 11l6-6 6 6" />
    </svg>
  );
}

export default function CareersHero() {
  const openRoles = careers.length;
  const logos = [...pressLogos, ...pressLogos];

  return (
    <section className="crh" aria-labelledby="crh-title">
      <div className="crh-inner">
        <Reveal>
          <p className="crh-eyebrow">
            <ArrowIcon className="crh-eyebrow-icon" />
            Careers at Penaxis
          </p>
          <h1 id="crh-title" className="crh-title">
            <span className="crh-line">Your Next Best</span>
            <span className="crh-line">
              Career
              <span className="crh-tile" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17 17 7M8 7h9v9" />
                </svg>
              </span>
              <span className="crh-muted">Move</span>
            </span>
            <span className="crh-line crh-muted">Starts Here</span>
          </h1>
          <p className="crh-intro">
            Join a small, hands-on team across Pakistan, the UAE and beyond, building AI-powered
            products, software and growth systems for real clients.
          </p>
        </Reveal>

        <div className="crh-grid">
          {/* Dark card */}
          <Reveal delay={0.05} className="crh-dark">
            <p className="crh-label">
              <ArrowIcon className="crh-label-icon" />
              Life at Penaxis
            </p>
            <h2 className="crh-dark-title">
              People first.
              <br />
              <span className="crh-dark-muted">Always.</span>
            </h2>
            <p className="crh-dark-text">
              We work in small teams with real ownership: strategy, design, engineering and growth
              side by side, with AI and modern tools built into how we deliver every project.
            </p>
            <div className="crh-btns">
              <PillButton href="#open-roles" label="See open roles" variant="light" />
              <PillButton href="/who-we-are" label="About us" variant="outline" />
            </div>

            <a href="/case-studies" className="crh-mini">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/hero/team-huddle.jpg" alt="" />
              <span className="crh-mini-body">
                <span className="crh-mini-title">Shipping 50+ websites, platforms and CRMs across 12+ industries</span>
                <span className="crh-mini-link">
                  See our work <ArrowIcon className="crh-btn-icon" />
                </span>
              </span>
            </a>
          </Reveal>

          {/* Photo card with stats */}
          <Reveal delay={0.1} className="crh-photo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="crh-photo-img" src="/images/hero/careers-hero.webp" alt="Sitara from the Penaxis team" />
            <div className="crh-stats">
              <div className="crh-stat">
                <div className="crh-stat-value">
                  {team.length}<span>+</span>
                </div>
                <div className="crh-stat-label">People on the team</div>
                <div className="crh-stat-chip">
                  <UpArrow /> Lahore &amp; Dubai offices
                </div>
              </div>
              <div className="crh-stat">
                <div className="crh-stat-value">
                  {openRoles}
                  <span> roles</span>
                </div>
                <div className="crh-stat-label">Open right now</div>
                <div className="crh-stat-chip">
                  <UpArrow /> Full-time, on-site
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="crh-logos" aria-label="Clients our team works with">
          <ul className="crh-logos-track">
            {logos.map((l, i) => (
              <li key={i} aria-hidden={i >= pressLogos.length}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={l.src} alt={i < pressLogos.length ? l.alt : ""} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
