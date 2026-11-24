import "./btn.css";

type IconKind = "arrow" | "back" | "phone" | "mail";

const PATHS: Record<IconKind, React.ReactNode> = {
  arrow: <path d="M4 12h16M14 6l6 6-6 6" />,
  back: <path d="M20 12H4M10 6l-6 6 6 6" />,
  phone: <path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2z" />,
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
};

/**
 * Inside of a content-page button: the label rolls up on hover and a round
 * icon (an arrow by default) sits at the end and turns. Put it in any
 * element with className="am-btn" (add am-light on dark backgrounds,
 * am-line for an outlined button, am-back to put the icon first).
 */
export default function BtnContent({ label, icon = "arrow" }: { label: string; icon?: IconKind }) {
  return (
    <>
      <span className="am-roll">
        <span data-t={label}>{label}</span>
      </span>
      <span className={icon === "arrow" || icon === "back" ? "am-ico" : "am-ico am-ico-still"} aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          {PATHS[icon]}
        </svg>
      </span>
    </>
  );
}
