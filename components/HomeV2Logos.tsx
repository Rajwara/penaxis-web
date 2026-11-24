import { pressLogos } from "@/lib/data";

// /home-v2 trust strip under the video banner: overlapping client avatars
// + short proof line on the left, an endlessly scrolling row of client
// logos (in soft pills) on the right. Uses the same client logos as the
// live homepage's "Featured in" strip.

const AVATARS = [
  { src: "/images/team/zohaib-khalid.webp", alt: "Zohaib Khalid, NAS Enterprises" },
  { src: "/images/team/malih.webp", alt: "Rohail Malih, Oktabytes" },
  { src: "/images/team/amar-jeet.webp", alt: "Amarjit, The Plate Agent" },
  { src: "/images/team/adeel-aslam.webp", alt: "Adeel Aslam, Penaxis" },
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
            Trusted by 50+ businesses
            <br />
            &amp; founders worldwide
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
