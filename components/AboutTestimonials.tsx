import { testimonials } from "@/lib/data";
import PillButton from "./PillButton";
// Same fonts as the supplied section (self-hosted, used only here).
import "@fontsource-variable/big-shoulders/opsz.css";
import "@fontsource-variable/wix-madefor-display/index.css";

// About page testimonials. Ported from a client-supplied "Testimonials"
// section (static HTML/CSS): eyebrow + 100px title with a button, then a
// grey frame holding three cards (client logo on top, big uppercase quote,
// author). Fonts, sizes and spacing match the supplied file; accent is
// Penaxis purple. Uses the real client testimonials from lib/data.ts. The
// company is named once, by its logo; the author line shows only the
// job title. A 5-star row sits opposite the logo.

export default function AboutTestimonials() {
  return (
    <section className="tst" aria-labelledby="tst-title">
      <div className="tst-container">
        <div className="tst-head-split">
          <div className="tst-head">
            <div className="tst-subtitle">
              <span className="tst-dot" />
              Our testimonials
              <span className="tst-dot" />
            </div>
            <h2 id="tst-title" className="tst-title">True stories from trusted clients</h2>
          </div>
          <PillButton href="/contact-us" label="Start a project" className="tst-btn" />
        </div>

        <div className="tst-frame">
          {testimonials.map((t) => (
            <figure key={t.name} className="tst-card">
              <div className="tst-box is-head">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="tst-logo" src={t.logo} alt={t.company} />
                <span className="tst-stars" role="img" aria-label="Rated 5 out of 5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} viewBox="0 0 20 20" aria-hidden="true">
                      <path d="M10 1.5l2.6 5.27 5.82.85-4.21 4.1 1 5.8L10 14.9l-5.21 2.62 1-5.8-4.21-4.1 5.82-.85z" />
                    </svg>
                  ))}
                </span>
              </div>
              <div className="tst-box is-testi">
                <blockquote className="tst-quote">&ldquo;{t.quote}&rdquo;</blockquote>
                <figcaption className="tst-author">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className="tst-avatar" src={t.image} alt="" />
                  <span>
                    <span className="tst-name">{t.name}</span>
                    <span className="tst-meta">{t.title}</span>
                  </span>
                </figcaption>
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
