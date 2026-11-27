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

// Reusable: /who-we-are uses the defaults; /services passes its own copy.
type Props = { label?: string; line1?: string; line2?: string; text?: string; bg?: string; pill?: string };

export default function AboutHeroBanner({
  label = "About us",
  line1 = "Growth & tech",
  line2 = "Partner",
  text = "We combine AI, software development, digital strategy and sales expertise to help businesses operate smarter and grow faster. One team, from strategy to scale.",
  bg = BG_IMAGE,
  pill = PILL_IMAGE,
}: Props) {
  return (
    <section className="abh" aria-labelledby="abh-title">
      <div className="abh-card" data-nav-theme="dark">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="abh-bg" src={bg} alt="" />
        <div className="abh-overlay" aria-hidden="true" />

        <div className="abh-content">
          <div className="abh-left">
            <div className="abh-subtitle">
              <span className="abh-dot" />
              {label}
              <span className="abh-dot" />
            </div>
            <h1 id="abh-title" className="abh-title">
              {line1}
              <span className="abh-line">
                {line2}
                <span className="abh-pill">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={pill} alt="" />
                </span>
              </span>
            </h1>
          </div>

          <p className="abh-text">{text}</p>
        </div>
      </div>
    </section>
  );
}
