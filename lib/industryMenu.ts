// Industries as listed in the navbar (desktop mega menu + phone menu):
// 6 groups, 24 industries. Each links to its industry page (13 in
// lib/data.ts, 11 in lib/industriesMore.ts); a few share a page.
export type MenuIndustry = { label: string; href: string };
export type MenuIndustryGroup = { title: string; icon: "bag" | "heart" | "building" | "truck" | "chip" | "briefcase"; items: MenuIndustry[] };

import { slugify } from "./data";

const page = (slug: string) => `/industries/${slug}`;
const ALL = "/industries";

export const INDUSTRY_MENU: MenuIndustryGroup[] = [
  {
    title: "Consumer, Retail & Hospitality",
    icon: "bag",
    items: [
      { label: "Hospitality & Tourism", href: page(slugify("Hospitality & Tourism")) },
      { label: "Food & Beverage", href: page("food-delivery-and-grocery") },
      { label: "Retail & E-commerce", href: page("e-commerce-and-retail") },
      { label: "Fashion, Beauty & Lifestyle", href: page(slugify("Fashion, Beauty & Lifestyle")) },
    ],
  },
  {
    title: "Healthcare & Life Sciences",
    icon: "heart",
    items: [
      { label: "Healthcare & Medical Clinics", href: page("healthcare-and-wellness") },
      { label: "Pharmaceuticals & Life Sciences", href: page(slugify("Pharmaceuticals & Life Sciences")) },
      { label: "Physiotherapy & Rehabilitation", href: page(slugify("Physiotherapy & Rehabilitation")) },
      { label: "Mental Health & Psychology", href: page(slugify("Mental Health & Psychology")) },
    ],
  },
  {
    title: "Real Estate & Built Environment",
    icon: "building",
    items: [
      { label: "Real Estate & Property Management", href: page("real-estate-and-property") },
      { label: "Architecture, Interiors & Fit-Out", href: page(slugify("Architecture, Interiors & Fit-Out")) },
      { label: "Construction & Engineering", href: page(slugify("Construction & Engineering")) },
      { label: "Facilities Management & Home Services", href: page("home-services-and-maintenance") },
    ],
  },
  {
    title: "Automotive, Logistics & Industrial",
    icon: "truck",
    items: [
      { label: "Automotive & Mobility", href: page("automotive-and-auto-care") },
      { label: "Logistics & Transportation", href: page("logistics-and-transportation") },
      { label: "Manufacturing & Industrial", href: page(slugify("Manufacturing & Industrial")) },
      { label: "Wholesale & Distribution", href: page(slugify("Wholesale & Distribution")) },
    ],
  },
  {
    title: "Technology & Innovation",
    icon: "chip",
    items: [
      { label: "Technology, SaaS & Startups", href: page("software-it-and-saas") },
      { label: "Cybersecurity & Information Security", href: page(slugify("Cybersecurity & Information Security")) },
      { label: "Education & EdTech", href: page("education-and-edtech") },
      { label: "IT & Managed Services", href: page("software-it-and-saas") },
    ],
  },
  {
    title: "Professional & Specialized Services",
    icon: "briefcase",
    items: [
      { label: "Professional & Business Services", href: page("consulting-staffing-and-immigration") },
      { label: "Recruitment & Human Resources", href: page("consulting-staffing-and-immigration") },
      { label: "Personal Brands & Professionals", href: page(slugify("Personal Brands & Professionals")) },
      { label: "Sports, Fitness & Wellness", href: page("sports-and-fitness") },
    ],
  },
];
