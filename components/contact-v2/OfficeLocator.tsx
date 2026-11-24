"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { OFFICES, directionsUrl, telHref, typeLabels, type OfficeType } from "./offices";
import s from "./locator.module.css";
// Same fonts as the supplied store-locator section (self-hosted, used only here).
import "@fontsource-variable/big-shoulders/opsz.css";
import "@fontsource-variable/space-grotesk/index.css";

// Office locator for /contact-v2. Ported from a client-supplied "store
// locator" section: photo pins, numbered clusters, a floating filter bar,
// a card above the selected pin, and the location list below. Filled with
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
  const showOnMap = (id: string) => {
    setSelected(id);
    mapTop.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

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

      <div className={s.storeGrid}>
        {list.map((o) => (
          <article key={o.id} className={`${s.store} ${selected === o.id ? s.storeOn : ""}`}>
            <div className={s.storeImg}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={o.image} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
              <span className={s.storeType}>{typeLabels[o.type]}</span>
            </div>
            <div className={s.storeBody}>
              <h3>{o.name}</h3>
              <p className={s.storeAddr}>{o.address}</p>
              <p className={s.storeBlurb}>{o.blurb}</p>
              <div className={s.storeFoot}>
                <div className={s.storeContacts}>
                  <a href={telHref(o.phone)} className={s.storePhone}>{o.phone}</a>
                  <a href={`mailto:${o.email}`} className={s.storeEmail}>{o.email}</a>
                </div>
                <div className={s.storeBtns}>
                  <button type="button" className={s.ghostBtn} onClick={() => showOnMap(o.id)}>Show on map</button>
                  <a className={s.darkBtn} href={directionsUrl(o)} target="_blank" rel="noopener noreferrer">Directions</a>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
