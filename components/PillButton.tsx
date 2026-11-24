import type { ReactNode } from "react";

// The "Our Approach" pill button, used for every button on /home-v2 (and
// /home-v3, which recolours it): uppercase label + round icon with a
// diagonal arrow that turns on hover.
//   variant "dark"    black pill, white circle   (on light backgrounds)
//   variant "light"   white pill, black circle   (on dark backgrounds)
//   variant "outline" transparent pill with a border in the text colour
// Pass `href` for a link, or `type` for a <button>.

type Common = {
  label: ReactNode;
  variant?: "dark" | "light" | "outline";
  block?: boolean; // full width
  className?: string;
};
type LinkProps = Common & { href: string; type?: never; disabled?: never; target?: string; rel?: string };
type ButtonProps = Common & { href?: never; type?: "button" | "submit"; disabled?: boolean; onClick?: () => void };

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

export default function PillButton(props: LinkProps | ButtonProps) {
  const { label, variant = "dark", block, className = "" } = props;
  const cls = `hv2-btn${variant !== "dark" ? ` hv2-btn--${variant}` : ""}${block ? " hv2-btn--block" : ""} ${className}`.trim();
  const inner = (
    <>
      <span className="hv2-btn-label">{label}</span>
      <span className="hv2-btn-icon">
        <Arrow />
      </span>
    </>
  );
  if ("href" in props && props.href) {
    const l = props as LinkProps;
    return (
      <a href={l.href} className={cls} target={l.target} rel={l.rel}>
        {inner}
      </a>
    );
  }
  const b = props as ButtonProps;
  return (
    <button type={b.type ?? "button"} className={cls} disabled={b.disabled} onClick={b.onClick}>
      {inner}
    </button>
  );
}
