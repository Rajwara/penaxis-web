// About page hero banner. Ported from a client-supplied "About Hero Banner"
// (static HTML/CSS): rounded photo card with a dark overlay, "• About us •"
// label, big uppercase title with a rounded image pill on the second line,
// and an intro line on the right. Fonts, sizes and breakpoints match the
// supplied file. Images: the uploaded banner background and pill image in
// public/images/who-we-are; replace BG_IMAGE / PILL_IMAGE to change them.
import "@fontsource-variable/big-shoulders/opsz.css";
import "@fontsource-variable/wix-madefor-display/index.css";

const BG_IMAGE = "/images/who-we-are/about-banner-bg.webp"; // uploaded banner background
const PILL_IMAGE = "/images/who-we-are/about-banner-pill.jpg"; // uploaded pill image

export default function AboutHeroBanner() {
  return (
    <section className="abh" aria-labelledby="abh-title">
      <div className="abh-card" data-nav-theme="dark">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="abh-bg" src={BG_IMAGE} alt="" />
        <div className="abh-overlay" aria-hidden="true" />

        <div className="abh-content">
          <div className="abh-left">
            <div className="abh-subtitle">
              <span className="abh-dot" />
              About us
              <span className="abh-dot" />
            </div>
            <h1 id="abh-title" className="abh-title">
              Growth &amp; tech
              <span className="abh-line">
                Partner
                <span className="abh-pill">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={PILL_IMAGE} alt="" />
                </span>
              </span>
            </h1>
          </div>

          <p className="abh-text">
            We combine AI, software development, digital strategy and sales expertise to help
            businesses operate smarter and grow faster.
          </p>
        </div>
      </div>
    </section>
  );
}
