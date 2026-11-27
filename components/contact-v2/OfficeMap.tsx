"use client";

import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import type * as Leaflet from "leaflet";
import { directionsUrl, telHref, typeLabels, type Office } from "./offices";
import s from "./locator.module.css";

/**
 * Map tiles. OpenStreetMap's tiles need no key (shown in greyscale via CSS). For heavy traffic, use a provider
 * with a key, e.g. set NEXT_PUBLIC_MAP_TILES="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png?api_key=YOUR_KEY"
 * and NEXT_PUBLIC_MAP_ATTRIBUTION to that provider's credit line.
 */
const TILE_URL = process.env.NEXT_PUBLIC_MAP_TILES || "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
const TILE_ATTRIBUTION = process.env.NEXT_PUBLIC_MAP_ATTRIBUTION || '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

// The offices are ~1,700 km apart, so the overview is zoomed out; selecting
// an office zooms in to street level so the pin is actually useful.
const DETAIL_ZOOM = 14;

type Props = { offices: Office[]; selected: string | null; onSelect: (id: string | null) => void };

/**
 * Leaflet map: round photo markers, dark numbered clusters and a React card
 * above the selected office (kept in place as the map moves). Ported from
 * the supplied store locator.
 */
export default function OfficeMap({ offices, selected, onSelect }: Props) {
  const box = useRef<HTMLDivElement>(null);
  const map = useRef<Leaflet.Map | null>(null);
  const L = useRef<typeof Leaflet | null>(null);
  const cluster = useRef<Leaflet.MarkerClusterGroup | null>(null);
  const markers = useRef(new Map<string, Leaflet.Marker>());
  const [ready, setReady] = useState(false);
  const [point, setPoint] = useState<{ x: number; y: number } | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [place, setPlace] = useState<{ left: number; top: number; below: boolean; arrow: number } | null>(null);

  // Put the card above the pin, or below it when there's no room under the filter bar; keep it inside the map
  useLayoutEffect(() => {
    const card = cardRef.current, wrap = box.current;
    if (!point || !card || !wrap) { setPlace(null); return; }
    const W = wrap.clientWidth, H = wrap.clientHeight, w = card.offsetWidth, h = card.offsetHeight;
    const GAP = 40; // pin radius + arrow
    const bar = wrap.parentElement?.parentElement?.querySelector<HTMLElement>("[data-filter-bar]");
    const topLimit = bar ? bar.offsetTop + bar.offsetHeight + 10 : 12;
    const fitsAbove = point.y - GAP - h >= topLimit;
    const fitsBelow = point.y + GAP + h <= H - 12;
    const below = !fitsAbove && fitsBelow;
    const left = Math.min(Math.max(point.x, w / 2 + 12), W - w / 2 - 12);
    const top = below ? point.y + GAP : Math.max(point.y - GAP - h, topLimit);
    setPlace({ left, top, below, arrow: Math.min(Math.max(point.x - left, -w / 2 + 24), w / 2 - 24) });
  }, [point, selected]);
  const office = offices.find((x) => x.id === selected) ?? null;

  const icon = (o: Office, active: boolean) =>
    L.current!.divIcon({
      className: "",
      html: `<span class="tv-pin${active ? " is-active" : ""}${o.type === "regional" ? " is-service" : ""}"><img src="${o.image}" alt="" /></span>`,
      iconSize: [52, 52],
      iconAnchor: [26, 26],
    });

  // Create the map once
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const lf = (await import("leaflet")).default;
      await import("leaflet.markercluster");
      if (cancelled || !box.current || map.current) return;
      L.current = lf;
      const m = lf.map(box.current, { zoomControl: false, scrollWheelZoom: false, attributionControl: true }).setView([28.5, 64.5], 5);
      lf.tileLayer(TILE_URL, { attribution: TILE_ATTRIBUTION, maxZoom: 19 }).addTo(m);
      lf.control.zoom({ position: "bottomright" }).addTo(m);
      // Scroll-to-zoom only after the visitor clicks into the map, so the page still scrolls normally
      m.on("click", () => m.scrollWheelZoom.enable());
      m.on("mouseout", () => m.scrollWheelZoom.disable());
      map.current = m;
      setReady(true);
    })();
    return () => {
      cancelled = true;
      map.current?.remove();
      map.current = null;
    };
  }, []);

  // (Re)build markers whenever the filtered list changes
  useEffect(() => {
    const m = map.current, lf = L.current;
    if (!ready || !m || !lf) return;
    cluster.current?.remove();
    markers.current.clear();
    const group = lf.markerClusterGroup({
      showCoverageOnHover: false,
      maxClusterRadius: 56,
      spiderfyOnMaxZoom: true,
      iconCreateFunction: (c) => lf.divIcon({ className: "", html: `<span class="tv-cluster">${c.getChildCount()}</span>`, iconSize: [48, 48], iconAnchor: [24, 24] }),
    });
    offices.forEach((o) => {
      const mk = lf.marker([o.lat, o.lng], { icon: icon(o, o.id === selected), title: o.name, keyboard: true, riseOnHover: true });
      mk.on("click", () => onSelect(o.id));
      markers.current.set(o.id, mk);
      group.addLayer(mk);
    });
    group.addTo(m);
    cluster.current = group;
    if (offices.length > 1) m.fitBounds(lf.latLngBounds(offices.map((x) => [x.lat, x.lng] as [number, number])), { padding: [110, 110], maxZoom: 13 });
    else if (offices.length === 1) m.setView([offices[0].lat, offices[0].lng], 12);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, offices]);

  // Highlight + reveal the selected office, and keep its card positioned
  useEffect(() => {
    const m = map.current;
    if (!ready || !m) return;
    markers.current.forEach((mk, id) => {
      const o = offices.find((x) => x.id === id);
      if (o) mk.setIcon(icon(o, id === selected));
    });
    if (!office) { setPoint(null); return; }
    const place = () => {
      const p = m.latLngToContainerPoint([office.lat, office.lng]);
      setPoint({ x: p.x, y: p.y });
    };
    // Slide the map so the card fits above the pin, below the filter bar
    const fit = () => {
      const wrap = box.current;
      const bar = wrap?.parentElement?.parentElement?.querySelector<HTMLElement>("[data-filter-bar]");
      const topLimit = bar ? bar.offsetTop + bar.offsetHeight + 10 : 12;
      const h = cardRef.current?.offsetHeight || 330;
      const W = wrap?.clientWidth ?? 0, H = wrap?.clientHeight ?? 0;
      const p = m.latLngToContainerPoint([office.lat, office.lng]);
      // Centre the pin horizontally; vertically, centre pin + card together
      // (card sits above the pin), keeping the card below the filter bar.
      const wantX = W / 2;
      const wantY = Math.min(Math.max(H / 2 + (h + 40) / 2, topLimit + 40 + h), H - 40);
      if (Math.abs(wantY - p.y) > 1 || Math.abs(wantX - p.x) > 1) m.panBy([p.x - wantX, p.y - wantY], { animate: true, duration: 0.5 });
      place();
    };
    // Always fly to the chosen office (Lahore and Dubai are ~1,700 km apart),
    // then centre it.
    m.once("moveend", fit);
    m.flyTo([office.lat, office.lng], DETAIL_ZOOM, { duration: 1.1 });
    m.on("move zoom viewreset", place);
    return () => {
      m.off("move zoom viewreset", place);
      m.off("moveend", fit);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, selected, offices]);

  // Escape closes the card
  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onSelect(null);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [selected, onSelect]);

  return (
    <div className={s.mapBox}>
      <div ref={box} className={s.map} role="region" aria-label="Map of Penaxis offices" />
      {!ready && <div className={s.mapLoading}>Loading map…</div>}

      {office && point && (
        <div
          ref={cardRef}
          className={`${s.card} ${place?.below ? s.cardBelow : ""}`}
          style={{ left: place?.left ?? point.x, top: place?.top ?? point.y, visibility: place ? "visible" : "hidden", "--arrow": `${place?.arrow ?? 0}px` } as CSSProperties}
          role="dialog"
          aria-label={office.name}
        >
          <div className={s.cardImg}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={office.image} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
            <button type="button" className={s.cardClose} aria-label="Close" onClick={() => onSelect(null)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true"><path d="M7 7l10 10M17 7 7 17" /></svg>
            </button>
          </div>
          <div className={s.cardBody}>
            <h3>{office.name}</h3>
            <p className={s.cardLine}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></svg>
              {office.city}, {office.country}
            </p>
            <ul className={s.cardMeta}>
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1z" /></svg>
                <a href={telHref(office.phone)}>{office.phone}</a>
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
                <a href={`mailto:${office.email}`}>{office.email}</a>
              </li>
            </ul>
            <div className={s.cardFoot}>
              <span className={s.cardType}>{typeLabels[office.type]}</span>
              <a className={s.cardBtn} href={directionsUrl(office)} target="_blank" rel="noopener noreferrer">Get directions</a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
