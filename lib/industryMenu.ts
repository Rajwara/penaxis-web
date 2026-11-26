// Industries as listed in the navbar (desktop mega menu + phone menu):
// 6 groups, 24 industries. Items that match one of the 13 industry pages
// in lib/data.ts link to that page; the rest link to /industries until
// they get pages of their own.
export type MenuIndustry = { label: string; href: string };
export type MenuIndustryGroup = { title: string; icon: "bag" | "heart" | "building" | "truck" | "chip" | "briefcase"; items: MenuIndustry[] };

const page = (slug: string) => `/industries/${slug}`;
const ALL = "/industries";

export const INDUSTRY_MENU: MenuIndustryGroup[] = [
  {
    title: "Consumer, Retail & Hospitality",
    icon: "bag",
    items: [
      { label: "Hospitality & Tourism", href: ALL },
      { label: "Food & Beverage", href: page("food-delivery-and-grocery") },
      { label: "Retail & E-commerce", href: page("e-commerce-and-retail") },
      { label: "Fashion, Beauty & Lifestyle", href: ALL },
    ],
  },
  {
    title: "Healthcare & Life Sciences",
    icon: "heart",
    items: [
      { label: "Healthcare & Medical Clinics", href: page("healthcare-and-wellness") },
      { label: "Pharmaceuticals & Life Sciences", href: ALL },
      { label: "Physiotherapy & Rehabilitation", href: ALL },
      { label: "Mental Health & Psychology", href: ALL },
    ],
  },
  {
    title: "Real Estate & Built Environment",
    icon: "building",
    items: [
      { label: "Real Estate & Property Management", href: page("real-estate-and-property") },
      { label: "Architecture, Interiors & Fit-Out", href: ALL },
      { label: "Construction & Engineering", href: ALL },
      { label: "Facilities Management & Home Services", href: page("home-services-and-maintenance") },
    ],
  },
  {
    title: "Automotive, Logistics & Industrial",
    icon: "truck",
    items: [
      { label: "Automotive & Mobility", href: page("automotive-and-auto-care") },
      { label: "Logistics & Transportation", href: page("logistics-and-transportation") },
      { label: "Manufacturing & Industrial", href: ALL },
      { label: "Wholesale & Distribution", href: ALL },
    ],
  },
  {
    title: "Technology & Innovation",
    icon: "chip",
    items: [
      { label: "Technology, SaaS & Startups", href: page("software-it-and-saas") },
      { label: "Cybersecurity & Information Security", href: ALL },
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
      { label: "Personal Brands & Professionals", href: ALL },
      { label: "Sports, Fitness & Wellness", href: page("sports-and-fitness") },
    ],
  },
];
