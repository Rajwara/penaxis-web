// Uploaded industry images (public/images/industries-page), keyed by the
// navbar industry label. Used by the /industries showcase cards (each card
// takes its image's own shape) and by each single industry page.
import { slugify } from "./data";
import { INDUSTRY_MENU } from "./industryMenu";

const DIR = "/images/industries-page/";

// file slug -> [width, height]
const FILES: Record<string, [number, number]> = {
  "architecture-interiors-and-fit-out": [420, 558],
  "automotive-and-mobility": [420, 415],
  "construction-and-engineering": [420, 558],
  "cybersecurity-and-information-security": [420, 558],
  "education-and-edtech": [420, 415],
  "facilities-management-and-home-services": [420, 639],
  "fashion-beauty-and-lifestyle": [420, 639],
  "food-delivery-and-grocery": [420, 415],
  "sports-fitness-and-wellness": [420, 639], // uploaded as "Healthcare & Medical Clinics" (basketball photo)
  "hospitality-and-tourism": [402, 558],
  "it-and-managed-services": [420, 558],
  "logistics-and-transportation": [420, 558],
  "manufacturing-and-industrial": [420, 558],
  "mental-health-and-psychology": [420, 415],
  "personal-brands-and-professionals": [420, 558],
  "pharmaceuticals-and-life-sciences": [420, 415],
  "physiotherapy-and-rehabilitation": [420, 558],
  "professional-and-business-services": [420, 639],
  "real-estate-and-property-management": [420, 558],
  "recruitment-and-human-resources": [420, 415],
  "retail-and-e-commerce": [420, 558],
  "technology-saas-and-startups": [420, 639],
  "wholesale-and-distribution": [420, 639],
};

// Navbar labels whose file is named differently.
const ALIAS: Record<string, string> = { "Food & Beverage": "food-delivery-and-grocery" };

export type IndustryImage = { src: string; width: number; height: number };

export function industryImageForLabel(label: string): IndustryImage | undefined {
  const slug = ALIAS[label] ?? slugify(label);
  const f = FILES[slug];
  return f ? { src: DIR + slug + ".webp", width: f[0], height: f[1] } : undefined;
}

// For a single industry page: find the navbar entry that links to it.
export function industryImageForPage(pageTitle: string): IndustryImage | undefined {
  const href = `/industries/${slugify(pageTitle)}`;
  const item = INDUSTRY_MENU.flatMap((g) => g.items).find((i) => i.href === href);
  return item ? industryImageForLabel(item.label) : undefined;
}

export const INDUSTRIES_FAQ_IMAGE = DIR + "faq.webp";
