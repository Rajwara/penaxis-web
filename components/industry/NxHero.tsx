import Link from "next/link";
import type { ReactNode } from "react";

// Hero banner from the supplied neuro-home4 layout: dark 6-tile image
// collage with a centred title, intro, frosted "describe what you want to
// build" bar and chip links. Used on /industries and every single industry
// page. Wrap-free: brings its own .nx scope. Styles: .nx-* in globals.css.
// TEMP IMAGES: the template's own images until Penaxis uploads replacements.

const CDN = "https://8ded8880.delivery.rocketcdn.me/themes/neuros/wp-content/uploads/";
export const NX_IMG = {
  t1: CDN + "2024/03/home-4-1-min.jpg",
  t2a: CDN + "2024/03/home-4-2-min.jpg",
  t2b: CDN + "2024/02/mitchell-luo-mkNOHMD3a-I-unsplash-2-min.jpg",
  t3: CDN + "2024/03/home-4-4-min.jpg",
  t4: CDN + "2024/03/closeup-red-pattern-with-hexagon-holes-1-min.jpg",
  t5: CDN + "2024/03/home-4-3-min.jpg",
  t6: CDN + "2024/03/home-4-5-min.jpg",
  aboutBg: CDN + "2024/03/Vector.png",
  aboutShape: CDN + "2024/03/2.png",
  waves: CDN + "2024/04/home-4-bg-1.png",
  dashboard: CDN + "2024/04/Dashboard-min-1-1024x994.png",
  cta: CDN + "2024/02/service-video-poster.jpg",
};

type Props = {
  eyebrow?: string;
  title: ReactNode;
  search?: ReactNode; // replaces the default "describe what you want to build" bar
  text: string;
  chipsLabel?: string;
  chips: { label: string; href: string }[];
};

export default function NxHero({ eyebrow, title, text, search, chipsLabel = "Popular services:", chips }: Props) {
  return (
    <section className="nx-hero" data-nav-theme="dark">
      <div className="nx-collage" aria-hidden="true">
        {/* eslint-disable @next/next/no-img-element */}
        <div className="nx-tile nx-t1"><img src={NX_IMG.t1} alt="" /></div>
        <div className="nx-t2 nx-stack">
          <div className="nx-tile"><img src={NX_IMG.t2a} alt="" /></div>
          <div className="nx-tile"><img src={NX_IMG.t2b} alt="" /></div>
        </div>
        <div className="nx-tile nx-t3"><img src={NX_IMG.t3} alt="" /></div>
        <div className="nx-tile nx-t4"><img src={NX_IMG.t4} alt="" /></div>
        <div className="nx-tile nx-t5"><img src={NX_IMG.t5} alt="" /></div>
        <div className="nx-tile nx-t6"><img src={NX_IMG.t6} alt="" /></div>
        {/* eslint-enable @next/next/no-img-element */}
      </div>
      <div className="nx-hero-content">
        {eyebrow && <span className="nx-label nx-hero-eyebrow">{eyebrow}</span>}
        <h1 className="nx-h1">{title}</h1>
        <p>{text}</p>
        {search ?? (
          <form className="nx-prompt" action="/contact-us" method="get">
            <input type="text" name="project" placeholder="Describe what you want to build" aria-label="Describe what you want to build" />
            <button type="submit">➚ Get started</button>
          </form>
        )}
        <div className="nx-queries">
          <span>{chipsLabel}</span>
          {chips.map((c) => (
            <Link key={c.label} href={c.href}>{c.label}</Link>
          ))}
        </div>
      </div>
    </section>
  );
}
