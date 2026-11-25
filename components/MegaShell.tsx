import type { ReactNode } from "react";

// Shared layout for the navbar mega menus (Services, Industries, Case
// Studies), in the /home-v2 style: a black intro panel on the left
// (purple "• label •" eyebrow, Big Shoulders title, one line of text, white
// pill button) and a white content area on the right with a header row
// ("• section •" + "View all" link). Styles: .mm-* in app/globals.css.

type Props = {
  eyebrow: string;
  title: string;
  text: string;
  cta: { label: string; href: string };
  sectionLabel: string;
  viewAll: { label: string; href: string };
  children: ReactNode;
};

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

export default function MegaShell({ eyebrow, title, text, cta, sectionLabel, viewAll, children }: Props) {
  return (
    <div className="mega-panel mm">
      <div className="mm-intro">
        <p className="mm-eyebrow">{eyebrow}</p>
        <p className="mm-title">{title}</p>
        <p className="mm-text">{text}</p>
        <a href={cta.href} className="mm-cta">
          <span>{cta.label}</span>
          <span className="mm-cta-icon">
            <Arrow />
          </span>
        </a>
      </div>
      <div className="mm-main">
        <div className="mm-head">
          <p className="mm-eyebrow">{sectionLabel}</p>
          <a href={viewAll.href} className="mm-viewall">
            {viewAll.label}
            <Arrow />
          </a>
        </div>
        {children}
      </div>
    </div>
  );
}

export function MmArrow() {
  return <Arrow />;
}
