import { techItem } from "@/lib/techLogos";

// Case-study tech stack as a table: one row per group (Core Stack,
// Integrations…), tools with a logo as logo tiles, the rest as text chips.
export default function TechStackTable({ groups }: { groups: { label: string; items: string }[] }) {
  return (
    <div className="csx-tech pd-reveal" role="table" aria-label="Tech stack">
      {groups.map((g) => {
        const items = g.items.split(",").map((s) => techItem(s.trim())).filter((i) => i.name);
        const withLogo = items.filter((i) => i.logos.length);
        const text = items.filter((i) => !i.logos.length);
        return (
          <div key={g.label} className="csx-tech-row" role="row">
            <div className="csx-tech-label" role="rowheader">{g.label}</div>
            <div className="csx-tech-cell" role="cell">
              {withLogo.length > 0 && (
                <ul className="csx-tech-logos">
                  {withLogo.map((i) => (
                    <li key={i.name} className="csx-tech-tile" title={i.name}>
                      <span className="csx-tech-imgs">
                        {i.logos.map((src) => (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img key={src} src={src} alt="" loading="lazy" />
                        ))}
                      </span>
                      <span className="csx-tech-name">{i.name}</span>
                    </li>
                  ))}
                </ul>
              )}
              {text.length > 0 && (
                <ul className="csx-tech-chips">
                  {text.map((i) => (
                    <li key={i.name}>{i.name}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
