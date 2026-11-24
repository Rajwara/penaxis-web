"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { OFFICES, typeLabels, type OfficeType } from "./offices";
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
  const [type, setType] = useState<"all" | OfficeType>("all");
  const [selected, setSelected] = useState<string | null>(null);
  const mapTop = useRef<HTMLDivElement>(null);

  const list = useMemo(() => OFFICES.filter((o) => type === "all" || o.type === type), [type]);
  useEffect(() => {
    if (selected && !list.some((o) => o.id === selected)) setSelected(null);
  }, [list, selected]);

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
        <form className={s.filterBar} data-filter-bar onSubmit={(e) => e.preventDefault()} aria-label="Filter offices">
          <label className={s.select}>
            <span className="sr-only">Office type</span>
            <select value={type} onChange={(e) => setType(e.target.value as typeof type)}>
              <option value="all">All offices</option>
              <option value="head">{typeLabels.head}</option>
              <option value="regional">{typeLabels.regional}</option>
            </select>
          </label>
          <span className={s.count} aria-live="polite">
            {list.length} {list.length === 1 ? "office" : "offices"}
          </span>
        </form>

        <OfficeMap offices={list} selected={selected} onSelect={select} />
      </div>

    </section>
  );
}
