// "Compliance - what we deliver against each framework" on single industry
// pages. A shared library of frameworks (what each covers + the concrete
// things we build to support it) and which ones apply to each industry.
//
// Wording is deliberate: we build software that SUPPORTS a client's
// compliance. We do not claim Penaxis holds these certifications, and
// legal/regulatory responsibility stays with the client. Review before launch.

export type Framework = { id: string; name: string; scope: string; deliver: string[] };

export const FRAMEWORKS: Record<string, Framework> = {
  gdpr: {
    id: "gdpr",
    name: "GDPR & UK GDPR",
    scope: "Personal data of people in the EU and UK.",
    deliver: ["Consent capture and preference management", "Data export and right-to-erasure workflows", "Data minimisation and retention rules", "Records of processing to support your DPO"],
  },
  pdpl: {
    id: "pdpl",
    name: "UAE & KSA PDPL",
    scope: "Personal data protection laws across the GCC.",
    deliver: ["Consent and purpose-limited data collection", "Access, correction and deletion requests", "Hosting options that respect data-residency needs", "Breach logging and notification support"],
  },
  hipaa: {
    id: "hipaa",
    name: "HIPAA",
    scope: "Protected health information in the US.",
    deliver: ["Encryption in transit and at rest", "Role-based access to patient records", "Audit logs of every record access", "Hosting with providers that sign BAAs"],
  },
  pci: {
    id: "pci",
    name: "PCI DSS",
    scope: "Card payments and cardholder data.",
    deliver: ["Payments through PCI-certified providers", "Tokenised cards, never stored on your servers", "Secure, hosted checkout flows", "Reduced compliance scope for your business"],
  },
  soc2: {
    id: "soc2",
    name: "SOC 2",
    scope: "Security and availability for SaaS and service providers.",
    deliver: ["Access control and least-privilege roles", "Logging, monitoring and alerting", "Documented change and release process", "Evidence-ready records for your audits"],
  },
  iso27001: {
    id: "iso27001",
    name: "ISO 27001",
    scope: "Information security management.",
    deliver: ["Security controls built into the product", "Risk-based access and permissions", "Secure development lifecycle", "Documentation that supports your ISMS"],
  },
  owasp: {
    id: "owasp",
    name: "OWASP Top 10",
    scope: "Secure web and mobile application development.",
    deliver: ["Secure coding and code review", "Dependency and vulnerability scanning", "Protection against injection, XSS and auth flaws", "Penetration-test-ready builds"],
  },
  wcag: {
    id: "wcag",
    name: "WCAG 2.2 accessibility",
    scope: "Digital accessibility for all users.",
    deliver: ["Keyboard-friendly navigation", "Accessible colour contrast and type", "Screen-reader labels and structure", "Accessibility checks before launch"],
  },
  kyc: {
    id: "kyc",
    name: "KYC & AML",
    scope: "Customer verification and anti-money-laundering.",
    deliver: ["Identity checks through trusted providers", "Screening and risk-flag workflows", "Full audit trails of decisions", "Secure storage of verification records"],
  },
  gxp: {
    id: "gxp",
    name: "GxP & 21 CFR Part 11",
    scope: "Regulated life-science records and e-signatures.",
    deliver: ["Tamper-evident audit trails", "Controlled e-signatures and approvals", "Version-controlled documents", "Support for your validation process"],
  },
  ferpa: {
    id: "ferpa",
    name: "FERPA & student privacy",
    scope: "Student records and children's data.",
    deliver: ["Role-based access for students, parents and staff", "Parental consent where required", "Safe, controlled AI and content", "Clear data ownership for the institution"],
  },
};

const BASE = ["gdpr", "owasp"];

export const INDUSTRY_FRAMEWORKS: Record<string, string[]> = {
  "Software, IT & SaaS": [...BASE, "soc2", "iso27001"],
  "Education & EdTech": [...BASE, "ferpa", "wcag"],
  "Automotive & Auto Care": [...BASE, "pci", "pdpl"],
  "Home Services & Maintenance": [...BASE, "pci", "pdpl"],
  "Logistics & Transportation": [...BASE, "pdpl", "iso27001"],
  "Consulting, Staffing & Immigration": [...BASE, "pdpl", "iso27001"],
  "E-Commerce & Retail": [...BASE, "pci", "wcag"],
  "Sports & Fitness": [...BASE, "pci", "wcag"],
  "Food Delivery & Grocery": [...BASE, "pci", "pdpl"],
  "Real Estate & Property": [...BASE, "pdpl", "pci"],
  "Fintech & Financial Services": [...BASE, "pci", "kyc", "soc2"],
  "Healthcare & Wellness": [...BASE, "hipaa", "wcag"],
  "Pet Care & Veterinary": [...BASE, "pci", "wcag"],
  "Hospitality & Tourism": [...BASE, "pci", "pdpl"],
  "Fashion, Beauty & Lifestyle": [...BASE, "pci", "wcag"],
  "Pharmaceuticals & Life Sciences": [...BASE, "gxp", "hipaa", "iso27001"],
  "Physiotherapy & Rehabilitation": [...BASE, "hipaa", "pci"],
  "Mental Health & Psychology": [...BASE, "hipaa", "wcag"],
  "Architecture, Interiors & Fit-Out": [...BASE, "iso27001", "wcag"],
  "Construction & Engineering": [...BASE, "iso27001", "pdpl"],
  "Manufacturing & Industrial": [...BASE, "iso27001", "soc2"],
  "Wholesale & Distribution": [...BASE, "pci", "iso27001"],
  "Cybersecurity & Information Security": [...BASE, "iso27001", "soc2"],
  "Personal Brands & Professionals": [...BASE, "pci", "wcag"],
};

export const frameworksFor = (industry: string) =>
  (INDUSTRY_FRAMEWORKS[industry] ?? BASE).map((id) => FRAMEWORKS[id]).filter(Boolean);
