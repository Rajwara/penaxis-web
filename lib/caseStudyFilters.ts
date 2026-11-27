// Filters for the /case-studies grid. A "parent" filter (industry, service or
// tools & technology) decides which options appear in the pill bar.
// Only options that match at least one case study are shown.
import { caseStudies, services } from "./data";

type Study = (typeof caseStudies)[number];
export type FilterMode = "industry" | "service" | "tech";
export type FilterOption = { id: string; label: string; match: (s: Study) => boolean };

export const FILTER_MODES: { id: FilterMode; label: string }[] = [
  { id: "industry", label: "By industry" },
  { id: "service", label: "By service" },
  { id: "tech", label: "By tools & technology" },
];

// Which service(s) each case study shows. Matches the service pages' "Proof"
// picks. Assigned from each project write-up - REVIEW before launch.
export const CASE_STUDY_SERVICES: Record<string, string[]> = {
  "drivelo-logistics-platform": ["web-crm-software"],
  "ai-receptionist-visitor-kiosk": ["ai-mvp"],
  "bidlogics-tender-intelligence": ["ai-mvp"],
  "seka-gravel-cycling-platform": ["web-crm-software"],
  "hotel-booking-revenue-platform": ["ai-mvp", "web-crm-software"],
  "the-plate-agent-marketplace": ["ai-mvp", "web-crm-software"],
  "dry-cleaning-delivery-platform": ["web-crm-software", "digital-transformation"],
  "cybersecurity-hr-platform": ["digital-transformation", "web-crm-software"],
  "ai-automotive-search-oktabytes": ["ai-mvp"],
  "patient-care-management-platform": ["web-crm-software", "digital-transformation"],
  "recruitment-talent-platform": ["digital-transformation", "ai-mvp"],
  "luxury-furniture-ecommerce": ["web-crm-software"],
};

// Tools & technology groups, matched against each case study's tech stack.
const TECH: { label: string; re: RegExp }[] = [
  { label: "AI & LLMs", re: /OpenAI|Claude|Gemini|Llama|LangChain|GPT|Whisper|SageMaker/i },
  { label: "React & Next.js", re: /\bReact\b|Next\.js/ },
  { label: "Mobile apps", re: /React Native|Kotlin|iOS|Android/ },
  { label: "Node.js & NestJS", re: /Node\.js|NestJS/ },
  { label: "Python & FastAPI", re: /Python|FastAPI/ },
  { label: "PostgreSQL", re: /PostgreSQL/ },
  { label: "AWS", re: /\bAWS\b|Amazon/ },
  { label: "Azure", re: /Azure/ },
  { label: "Docker", re: /Docker/ },
  { label: "Stripe & payments", re: /Stripe|Checkout\.com|PayPal/ },
  { label: "Shopify", re: /Shopify/ },
  { label: "Webflow", re: /Webflow/ },
];

const stackText = (s: Study) =>
  ("techStack" in s && Array.isArray(s.techStack) ? s.techStack.map((g) => g.items).join(", ") : "");

const keep = (opts: FilterOption[]) => opts.filter((o) => caseStudies.some(o.match));

// Industries: the ones our case studies are tagged with, most projects first.
const industryCounts = new Map<string, number>();
caseStudies.forEach((s) => s.tags.forEach((t) => industryCounts.set(t, (industryCounts.get(t) ?? 0) + 1)));
const INDUSTRY_OPTIONS: FilterOption[] = [...industryCounts.entries()]
  .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
  .map(([t]) => ({ id: t, label: t, match: (s) => s.tags.includes(t) }));

const SERVICE_OPTIONS: FilterOption[] = keep(
  services.map((sv) => ({ id: sv.slug, label: sv.title, match: (s) => (CASE_STUDY_SERVICES[s.slug] ?? []).includes(sv.slug) }))
);

const TECH_OPTIONS: FilterOption[] = keep(TECH.map((t) => ({ id: t.label, label: t.label, match: (s) => t.re.test(stackText(s)) })));

export const FILTER_OPTIONS: Record<FilterMode, FilterOption[]> = {
  industry: INDUSTRY_OPTIONS,
  service: SERVICE_OPTIONS,
  tech: TECH_OPTIONS,
};
