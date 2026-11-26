// Search index for the "Find your industry…" bar on /industries: all 24
// navbar industries (plus Fintech and Pet Care, which have pages) with
// synonyms and business segments, each linking to its page.
import { slugify } from "./data";
import { INDUSTRY_MENU } from "./industryMenu";

export type SearchEntry = { label: string; group: string; href: string; keywords: string[] };

const SYNONYMS: Record<string, string[]> = {
  "Hospitality & Tourism": ["hotel", "hotels", "resort", "motel", "hostel", "b&b", "bed and breakfast", "travel", "tourism", "tour operator", "travel agency", "airbnb", "holiday", "vacation rental", "booking", "guest house", "events", "venue"],
  "Food & Beverage": ["restaurant", "restaurants", "cafe", "coffee shop", "bakery", "bar", "pub", "catering", "cloud kitchen", "food delivery", "grocery", "supermarket", "takeaway", "fast food", "food truck", "beverage", "drinks"],
  "Retail & E-commerce": ["ecommerce", "e-commerce", "online store", "shop", "store", "retail", "shopify", "marketplace", "dropshipping", "boutique", "d2c", "dtc"],
  "Fashion, Beauty & Lifestyle": ["fashion", "clothing", "apparel", "beauty", "cosmetics", "skincare", "perfume", "fragrance", "salon", "hair salon", "barber", "spa", "nails", "makeup", "jewellery", "jewelry", "lifestyle", "accessories"],
  "Healthcare & Medical Clinics": ["healthcare", "health", "clinic", "medical", "doctor", "gp", "hospital", "dentist", "dental", "telehealth", "telemedicine", "patient", "nursing", "care home", "wellness"],
  "Pharmaceuticals & Life Sciences": ["pharma", "pharmaceutical", "pharmacy", "chemist", "drug", "biotech", "life sciences", "laboratory", "lab", "clinical trials", "medical devices"],
  "Physiotherapy & Rehabilitation": ["physio", "physiotherapy", "physical therapy", "chiropractor", "chiropractic", "osteopath", "rehab", "rehabilitation", "sports injury", "massage therapy", "occupational therapy"],
  "Mental Health & Psychology": ["mental health", "psychology", "psychologist", "therapy", "therapist", "counselling", "counseling", "psychiatrist", "wellbeing", "mindfulness", "coaching therapy"],
  "Real Estate & Property Management": ["real estate", "property", "realtor", "estate agent", "broker", "brokerage", "property management", "landlord", "lettings", "rentals", "tenants", "housing", "developer", "proptech"],
  "Architecture, Interiors & Fit-Out": ["architecture", "architect", "interior design", "interiors", "interior designer", "fit out", "fit-out", "furniture", "decor", "design studio", "renovation design"],
  "Construction & Engineering": ["construction", "contractor", "builder", "engineering", "civil engineering", "infrastructure", "site", "building", "mep", "subcontractor", "quantity surveyor"],
  "Facilities Management & Home Services": ["facilities management", "fm", "home services", "maintenance", "cleaning", "plumber", "plumbing", "electrician", "hvac", "handyman", "pest control", "landscaping", "laundry", "dry cleaning", "repairs"],
  "Automotive & Mobility": ["automotive", "car", "cars", "car dealer", "dealership", "garage", "auto repair", "mechanic", "car wash", "auto care", "mobility", "ev", "electric vehicles", "ride hailing", "car rental", "fleet"],
  "Logistics & Transportation": ["logistics", "transport", "transportation", "shipping", "freight", "courier", "delivery", "trucking", "haulage", "fleet management", "last mile", "dispatch", "supply chain", "3pl"],
  "Manufacturing & Industrial": ["manufacturing", "manufacturer", "factory", "production", "industrial", "plant", "machinery", "fabrication", "assembly", "oem", "iot"],
  "Wholesale & Distribution": ["wholesale", "wholesaler", "distribution", "distributor", "b2b", "trade", "import", "export", "supplier", "warehouse", "inventory", "fmcg"],
  "Technology, SaaS & Startups": ["technology", "tech", "saas", "software", "startup", "startups", "app", "platform", "product", "mvp", "b2b saas", "ai startup"],
  "Cybersecurity & Information Security": ["cybersecurity", "cyber security", "security", "infosec", "information security", "soc", "mssp", "penetration testing", "pentest", "siem", "iso 27001", "soc 2", "threat"],
  "Education & EdTech": ["education", "edtech", "school", "schools", "college", "university", "academy", "tutoring", "e-learning", "elearning", "lms", "courses", "training", "students"],
  "IT & Managed Services": ["it services", "managed services", "msp", "it support", "helpdesk", "cloud", "hosting", "devops", "infrastructure services"],
  "Professional & Business Services": ["consulting", "consultancy", "consultant", "accounting", "accountant", "law firm", "legal", "lawyer", "agency", "marketing agency", "business services", "immigration", "visa"],
  "Recruitment & Human Resources": ["recruitment", "recruiter", "staffing", "hr", "human resources", "hiring", "talent", "jobs", "ats", "payroll", "headhunting"],
  "Personal Brands & Professionals": ["personal brand", "coach", "coaching", "creator", "influencer", "speaker", "author", "freelancer", "consultant personal", "portfolio", "course creator"],
  "Sports, Fitness & Wellness": ["sports", "fitness", "gym", "gyms", "personal trainer", "yoga", "pilates", "crossfit", "studio", "club", "football", "cycling", "martial arts", "wellness", "membership"],
  "Fintech & Financial Services": ["fintech", "finance", "financial services", "bank", "banking", "payments", "lending", "loans", "insurance", "insurtech", "wealth", "investment", "crypto", "accounting software"],
  "Pet Care & Veterinary": ["pet", "pets", "vet", "veterinary", "veterinarian", "animal", "grooming", "pet shop", "dog", "cat", "kennel"],
};

export const SEARCH_INDEX: SearchEntry[] = [
  ...INDUSTRY_MENU.flatMap((g) => g.items.map((it) => ({ label: it.label, group: g.title, href: it.href, keywords: SYNONYMS[it.label] ?? [] }))),
  { label: "Fintech & Financial Services", group: "More industries", href: `/industries/${slugify("Fintech & Financial Services")}`, keywords: SYNONYMS["Fintech & Financial Services"] },
  { label: "Pet Care & Veterinary", group: "More industries", href: `/industries/${slugify("Pet Care & Veterinary")}`, keywords: SYNONYMS["Pet Care & Veterinary"] },
];

const norm = (s: string) =>
  s.toLowerCase().replace(/&/g, " and ").replace(/[^a-z0-9 ]/g, " ").replace(/\s+/g, " ").trim();

// Best matches first: exact label/keyword > label/keyword starts with the
// query > a word in it starts with the query > contains it anywhere.
export function searchIndustries(query: string, limit = 6): SearchEntry[] {
  const q = norm(query);
  if (!q) return [];
  const scored = SEARCH_INDEX.map((e) => {
    let best = 0;
    for (const [text, weight] of [[e.label, 1.2], ...e.keywords.map((k) => [k, 1] as const)] as const) {
      const t = norm(text);
      let s = 0;
      if (t === q) s = 100;
      else if (t.startsWith(q)) s = 80;
      else if (t.split(" ").some((w) => w.startsWith(q))) s = 60;
      else if (t.includes(q)) s = 40;
      else if (q.length > 3 && q.includes(t) && t.length > 2) s = 30; // "hotel booking" matches "hotel"
      best = Math.max(best, s * weight);
    }
    return { e, best };
  }).filter((x) => x.best > 0);
  scored.sort((a, b) => b.best - a.best || a.e.label.localeCompare(b.e.label));
  return scored.slice(0, limit).map((x) => x.e);
}
