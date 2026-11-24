"use client";

import dynamic from "next/dynamic";
import { useCallback, useRef, useState } from "react";
import { OFFICES } from "./offices";
import s from "./locator.module.css";
// Same fonts as the supplied store-locator section (self-hosted, used only here).
import "@fontsource-variable/big-shoulders/opsz.css";
import "@fontsource-variable/space-grotesk/index.css";

// Office locator for /contact-v2. Ported from a client-supplied "store
// locator" section: photo pins, numbered clusters, a floating filter bar,
// and a card above the selected pin (office list cards removed). Filled with
// Penaxis's two offices. Opening hours / "Open now" from the original are
// left out because the site has no office hours to show.

// Leaflet needs the browser, so the map is only rendered client-side
const OfficeMap = dynamic(() => import("./OfficeMap"), {
  ssr: false,
  loading: () => (
    <div className={s.mapBox}>
      <div className={s.mapLoading}>Loading map…</div>
    </div>
  ),
});

export default function OfficeLocator() {
  // Tabs pick an office; the map zooms to it and opens its card. Lahore
  // (head office) is selected to start with.
  const [selected, setSelected] = useState<string | null>(OFFICES[0]?.id ?? null);
  const mapTop = useRef<HTMLDivElement>(null);

  const select = useCallback((id: string | null) => setSelected(id), []);

  return (
    <section className={`${s.page} ${s.locator}`} aria-labelledby="cv2-offices-title">
      <div className={s.head}>
        <div>
          <span className={s.label}>Our offices</span>
          <h2 id="cv2-offices-title">Find us</h2>
        </div>
        <p>Strategy, delivery and engineering from our Lahore head office, with client partnerships across the Gulf from Dubai.</p>
      </div>

      <div className={s.mapWrap} ref={mapTop}>
        <div className={s.filterBar} data-filter-bar role="tablist" aria-label="Choose an office">
          {OFFICES.map((o) => (
            <button
              key={o.id}
              type="button"
              role="tab"
              aria-selected={selected === o.id}
              className={`${s.tab} ${selected === o.id ? s.tabOn : ""}`}
              onClick={() => setSelected(o.id)}
            >
              {o.name}
            </button>
          ))}
        </div>

        <OfficeMap offices={OFFICES} selected={selected} onSelect={select} />
      </div>

    </section>
  );
}
