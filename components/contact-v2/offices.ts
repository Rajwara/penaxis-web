import { contact, offices } from "@/lib/data";

// Penaxis offices for the /contact-v2 map (from lib/data.ts). Pin coordinates
// are approximate (neighbourhood level); "Get directions" uses the full
// street address, so it always routes to the right place.

export type OfficeType = "head" | "regional";

export type Office = {
  id: string;
  name: string;
  city: string;
  country: string;
  address: string;
  blurb: string;
  lat: number;
  lng: number;
  phone: string;
  email: string;
  type: OfficeType;
  image: string;
};

const coords: Record<string, { lat: number; lng: number }> = {
  Lahore: { lat: 31.3735, lng: 74.2295 }, // DHA Rahbar, Lahore
  Dubai: { lat: 25.1452, lng: 55.2235 }, // Al Quoz First, off Sheikh Zayed Rd
};

const images: Record<string, string> = {
  Lahore: "/images/hero/office-logo-desk.jpg",
  Dubai: "/images/hero/trusted-partner-office.webp",
};

export const OFFICES: Office[] = offices.map((o, i) => ({
  id: o.city.toLowerCase(),
  name: `${o.city} Office`,
  city: o.city,
  country: o.country,
  address: o.address,
  blurb: o.blurb,
  ...coords[o.city],
  phone: contact.phone,
  email: contact.email,
  type: i === 0 ? "head" : "regional",
  image: images[o.city],
}));

export const typeLabels: Record<OfficeType, string> = { head: "Head office", regional: "Regional hub" };

export const directionsUrl = (o: Office) => `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(o.address)}`;
export const telHref = (phone: string) => `tel:${phone.replace(/[^+\d]/g, "")}`;
