import type { ReactNode } from "react";
import Link from "next/link";
import DetailReveal from "./DetailReveal";
import "@fontsource-variable/big-shoulders/opsz.css";
import "@fontsource-variable/wix-madefor-display/index.css";

// Shared single-page layout for case studies, blog posts and industries,
// built from the supplied portfolio-single template: centred "• eyebrow •"
// + big title, a row of facts, a large image, the article (big section
// headings, two-image gallery, two-column dotted list) and previous/next
// links with thumbnails. Site navbar and footer wrap it. Styles: .pd-*.

export type Meta = { label: string; value: string };
export type NavLink = { href: string; title: string; image: string };

export function DetailHero({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <section className="pd-hero pd-container">
      <div className="pd-eyebrow">{eyebrow}</div>
      <h1 className="pd-display pd-h1">{title}</h1>
    </section>
  );
}

export function DetailMeta({ items }: { items: Meta[] }) {
  return (
    <div className="pd-meta pd-reveal" style={{ ["--cols" as string]: items.length } as React.CSSProperties}>
      {items.map((m) => (
        <div key={m.label} className="pd-meta-item">
          <div className="pd-meta-label">{m.label}:</div>
          <div className="pd-meta-value">{m.value}</div>
        </div>
      ))}
    </div>
  );
}

export function DetailImage({ src, alt = "" }: { src: string; alt?: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img className="pd-img is-large pd-reveal" src={src} alt={alt} />;
}

export function DetailGallery({ images }: { images: { src: string; href?: string; caption?: string }[] }) {
  if (images.length < 2) return null;
  return (
    <div className="pd-gallery">
      {images.slice(0, 2).map((g) =>
        g.href ? (
          <Link key={g.src} href={g.href} className="pd-gallery-link pd-reveal">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="pd-img" src={g.src} alt="" />
            {g.caption && <span className="pd-gallery-cap">{g.caption}</span>}
          </Link>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={g.src} className="pd-img pd-reveal" src={g.src} alt="" />
        )
      )}
    </div>
  );
}

export function DetailH2({ children }: { children: ReactNode }) {
  return <h2 className="pd-display pd-h2 pd-reveal">{children}</h2>;
}

export function DetailP({ children }: { children: ReactNode }) {
  return <p className="pd-p pd-reveal">{children}</p>;
}

export function DetailList({ items }: { items: string[] }) {
  return (
    <ul className="pd-features pd-reveal">
      {items.map((t) => (
        <li key={t}>{t}</li>
      ))}
    </ul>
  );
}

export function DetailNav({ prev, next }: { prev: NavLink; next: NavLink }) {
  return (
    <nav className="pd-nav pd-reveal" aria-label="More">
      <Link className="pd-link" href={prev.href}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="pd-thumb" src={prev.image} alt="" />
        <div>
          <div className="pd-dir">‹ Previous</div>
          <div className="pd-title">{prev.title}</div>
        </div>
      </Link>
      <Link className="pd-link is-next" href={next.href}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="pd-thumb" src={next.image} alt="" />
        <div>
          <div className="pd-dir">Next ›</div>
          <div className="pd-title">{next.title}</div>
        </div>
      </Link>
    </nav>
  );
}

export default function DetailLayout({ eyebrow, title, children }: { eyebrow: string; title: string; children: ReactNode }) {
  return (
    <DetailReveal>
      <DetailHero eyebrow={eyebrow} title={title} />
      <section className="pd-container pd-body">{children}</section>
    </DetailReveal>
  );
}

export function DetailArticle({ children }: { children: ReactNode }) {
  return <article className="pd-content">{children}</article>;
}
