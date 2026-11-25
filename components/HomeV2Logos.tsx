import { pressLogos } from "@/lib/data";

// /home-v2 trust strip under the video banner: overlapping client avatars
// + short proof line on the left, an endlessly scrolling row of client
// logos (in soft pills) on the right. Uses the same client logos as the
// live homepage's "Featured in" strip.

const AVATARS = [
  { src: "/images/team/amar-jeet.webp", alt: "Amarjit, The Plate Agent" },
  { src: "/images/team/client-eric.webp", alt: "Eric" },
  { src: "/images/team/client-ismat.webp", alt: "Ismat" },
  { src: "/images/team/client-johana.webp", alt: "Johana" },
];

export default function HomeV2Logos() {
  // Two copies back to back so the -50% marquee loop is seamless.
  const track = [...pressLogos, ...pressLogos];

  return (
    <section className="hv2-logos" aria-label="Businesses we work with">
      <div className="hv2-logos-inner">
        <div className="hv2-logos-proof">
          <div className="hv2-avatars" aria-hidden="true">
            {AVATARS.map((a) => (
              <img key={a.src} src={a.src} alt="" />
            ))}
          </div>
          <p>
            Trusted by 30+ global brands
            <br />
            &amp; Enterprises
          </p>
        </div>

        <div className="hv2-logos-divider" aria-hidden="true" />

        <div className="hv2-logos-viewport">
          <ul className="hv2-logos-track">
            {track.map((logo, i) => (
              <li key={i} className="hv2-logo-pill" aria-hidden={i >= pressLogos.length}>
                <img src={logo.src} alt={i < pressLogos.length ? logo.alt : ""} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
