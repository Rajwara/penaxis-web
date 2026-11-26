// Two angled scrolling ribbons (brand-purple + black) from the supplied
// neuro layout. They scroll in opposite directions and loop seamlessly
// (each track holds the line twice and moves exactly -50%); motion stops
// for prefers-reduced-motion. Used on /industries and single industry pages.
export default function NxMarquee({ text, bottom, flush }: { text: string; bottom?: string; flush?: boolean }) {
  const top = `${text} • `.repeat(4);
  const bot = `${bottom ?? text} • `.repeat(4);
  return (
    <div className={`nx-marquee${flush ? " is-flush" : ""}`} aria-hidden="true">
      <div className="nx-ribbon nx-r1"><div className="nx-track">{top}{top}</div></div>
      <div className="nx-ribbon nx-r2"><div className="nx-track">{bot}{bot}</div></div>
    </div>
  );
}
