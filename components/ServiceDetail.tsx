"use client";

import Reveal from "./Reveal";
import AboutHeroBanner from "./AboutHeroBanner";
import ServiceWhyUs from "./ServiceWhyUs";
import ServiceTicker from "./ServiceTicker";
import ServiceProcess from "./ServiceProcess";
import ServiceHighlights from "./ServiceHighlights";
import { services, stats } from "@/lib/data";

// Template for a single service's detail page. Ported the "we craft
// detailed service solutions" layout (pixel-block corner decoration,
// heading + subtext, a framed visual, an approach paragraph, a
// checklist beside a photo, and stat cards) — this time applied per
// service, using each service's own real title/short/long/engagements —
// plus a fuller pillars grid, tools/stack chips, and prev/next nav.
//
// Frame/split photos cycle through Penaxis's real team/office photos for
// services without dedicated photos yet. Digital Transformation has real,
// topic-matched images (service.heroImage / service.highlightImage) that
// take priority when present; stat cards reuse Penaxis's own real,
// already-published stats rather than inventing numbers.

const FRAME_PHOTOS = [
  "/images/hero/office-logo-desk.jpg",
  "/images/hero/team-huddle.jpg",
  "/images/hero/office-logo-desk.jpg",
  "/images/hero/team-huddle.jpg",
];
const STAT_PAIRS: [number, number][] = [
  [0, 3],
  [1, 3],
  [1, 4],
  [0, 1],
];

export default function ServiceDetail({ slug }: { slug: string }) {
  const index = services.findIndex((s) => s.slug === slug);
  const service = services[index];
  if (!service) return null;

  const prev = services[(index - 1 + services.length) % services.length];
  const next = services[(index + 1) % services.length];
  const [statAIdx] = STAT_PAIRS[index % STAT_PAIRS.length];
  const statA = stats[statAIdx];
  // Split the title over the banner's two lines ("Fractional Sales &" / "Growth").
  const amp = service.title.lastIndexOf(" & ");
  const sp = service.title.lastIndexOf(" ");
  const titleLines: [string, string] =
    amp > 0 ? [service.title.slice(0, amp + 2), service.title.slice(amp + 3)] : [service.title.slice(0, sp), service.title.slice(sp + 1)];

  return (
    <>
      {/* Same banner as the About page (AboutHeroBanner), as-is */}
      <AboutHeroBanner label="Our services" line1={titleLines[0]} line2={titleLines[1]} text={service.short} />

      <ServiceTicker />

      {/* Why us */}
      <ServiceWhyUs serviceTitle={service.title} />

      <section className="svi-section svi-section--service">
        <div className="mx-auto max-w-6xl px-6">
          <div className="svi-approach">
            <Reveal>
              <h2 className="svi-eyebrow">About This Service</h2>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="svi-copy">{service.long}</p>
            </Reveal>
          </div>

          <Reveal delay={0.12} className="svi-frame">
            <img
              src={service.heroImage || FRAME_PHOTOS[index % FRAME_PHOTOS.length]}
              alt="Penaxis at work"
            />
          </Reveal>
        </div>
      </section>

      <ServiceProcess pillars={service.pillars} />

      <ServiceHighlights
        stat={statA}
        photo={service.highlightImage || FRAME_PHOTOS[(index + 1) % FRAME_PHOTOS.length]}
        pillars={service.pillars}
      />

      <section className="svd-section svd-section--alt">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <h2 className="section-heading svd-h2">Tools &amp; stack</h2>
            <div className="svd-chips">
              {service.stack.map((t) => (
                <span key={t} className="svd-chip">
                  {t}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="svd-nav-section">
        <div className="mx-auto max-w-7xl px-6 svd-nav-row">
          <a href={`/services/${prev.slug}`} className="svd-nav-link svd-nav-link--prev">
            <span className="svd-nav-label">Previous</span>
            <span className="svd-nav-title">{prev.title}</span>
          </a>
          <a href={`/services/${next.slug}`} className="svd-nav-link svd-nav-link--next">
            <span className="svd-nav-label">Next</span>
            <span className="svd-nav-title">{next.title}</span>
          </a>
        </div>
      </section>
    </>
  );
}
