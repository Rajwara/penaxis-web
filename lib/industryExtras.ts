// Extra content for the single industry page template (sections 04, 05,
// 07 and 08): AI use cases, compliance & security points, relevant
// services and industry FAQs. Keyed by industry title (lib/data.ts).
//
// DRAFT COPY - written to describe what Penaxis can design and build, not
// certifications Penaxis holds. Review before launch; compliance points
// name regulations we design *around*, which the client remains
// responsible for.

export type IndustryExtra = {
  ai: { title: string; text: string }[];
  compliance: { title: string; text: string }[];
  services: string[]; // service slugs, most relevant first
  faqs: { q: string; a: string }[];
};

// Security practices that apply to every build (section 05 base list).
export const SECURITY_BASELINE = [
  "Role-based access and least-privilege permissions",
  "Encryption in transit and at rest",
  "Audit logs for sensitive actions",
  "Secure, regular backups and recovery plans",
];

// General FAQs added under each industry's own questions (section 08).
export const GENERAL_FAQS = [
  {
    q: "How long does a typical build take?",
    a: "It depends on scope. A focused MVP can be ready in weeks, while larger platforms are delivered in phases. We agree milestones and a timeline after a short discovery call.",
  },
  {
    q: "Who owns the code and data?",
    a: "You do. Once the final payment clears, full ownership of the code, designs and any custom IP built for you transfers to your business.",
  },
];

export const INDUSTRY_EXTRAS: Record<string, IndustryExtra> = {
  "Software, IT & SaaS": {
    ai: [
      { title: "In-product AI assistants", text: "Assistants that answer user questions from your docs and data, inside your product." },
      { title: "Smart search & matching", text: "Semantic search and recommendations that understand intent, not just keywords." },
      { title: "Support automation", text: "Ticket triage, suggested replies and summaries that cut response times." },
    ],
    compliance: [
      { title: "GDPR-ready data handling", text: "Consent, data export and deletion flows designed in from the start." },
      { title: "Enterprise security features", text: "SSO, granular permissions and audit trails that enterprise buyers ask for." },
      { title: "Secure multi-tenancy", text: "Tenant data separated by design, so one customer never sees another's data." },
    ],
    services: ["ai-mvp", "web-crm-software", "digital-transformation"],
    faqs: [
      { q: "Can you work on an existing SaaS product?", a: "Yes. We regularly extend existing products, pay down technical debt and add features like SSO, billing or AI without a full rewrite." },
      { q: "Do you build multi-tenant platforms?", a: "Yes. We design tenant separation, roles and billing so the platform can grow from first customers to enterprise accounts." },
    ],
  },
  "Education & EdTech": {
    ai: [
      { title: "AI tutors & study help", text: "Assistants that explain topics and answer questions from approved course content." },
      { title: "Automated marking support", text: "First-pass grading and feedback suggestions that teachers review and approve." },
      { title: "Multilingual support", text: "Translation and voice features that help students and parents in their own language." },
    ],
    compliance: [
      { title: "Student data protection", text: "Designed around GDPR and student-privacy rules, with clear data ownership." },
      { title: "Safe, controlled AI", text: "AI limited to approved content, so answers stay accurate and age-appropriate." },
      { title: "Safeguarding by role", text: "Separate access for students, parents, teachers and admins." },
    ],
    services: ["ai-mvp", "web-crm-software", "digital-transformation"],
    faqs: [
      { q: "Can you integrate with our existing LMS?", a: "Yes. We connect with common learning platforms and student systems through their APIs, or build a portal around what you already use." },
      { q: "Can students and parents use it on mobile?", a: "Yes. We build responsive web apps and native mobile apps so learning and updates work on any device." },
    ],
  },
  "Automotive & Auto Care": {
    ai: [
      { title: "Conversational vehicle search", text: "Buyers describe what they need and get matching vehicles, not endless filters." },
      { title: "Service reminders", text: "Predicted service dates and automated reminders that bring customers back." },
      { title: "Lead qualification", text: "AI that scores and routes enquiries so sales teams follow up on the best leads first." },
    ],
    compliance: [
      { title: "Customer data privacy", text: "Customer and vehicle records handled in line with GDPR and local privacy rules." },
      { title: "Secure payments", text: "Payments handled by PCI-compliant providers, never stored on your servers." },
      { title: "Access by location", text: "Branch and workshop staff see only the bookings and records they need." },
    ],
    services: ["web-crm-software", "ai-mvp", "sales-growth"],
    faqs: [
      { q: "Can you connect to our dealer or workshop system?", a: "In most cases, yes. We integrate with existing DMS and workshop tools through their APIs or data exports." },
      { q: "Do you build online booking for service bays?", a: "Yes. We build booking, scheduling and status updates that sync with your bays and technicians." },
    ],
  },
  "Home Services & Maintenance": {
    ai: [
      { title: "Smart dispatch", text: "Jobs assigned to the right technician based on location, skills and availability." },
      { title: "Instant quotes", text: "AI-assisted estimates from photos and job details, reviewed before sending." },
      { title: "24/7 booking assistant", text: "An assistant that answers questions and books jobs outside office hours." },
    ],
    compliance: [
      { title: "Customer address privacy", text: "Home addresses and contact details visible only to assigned staff." },
      { title: "Secure payments", text: "Card payments through PCI-compliant providers, with digital receipts." },
      { title: "Job records & proof", text: "Photos, notes and sign-offs stored for every job." },
    ],
    services: ["web-crm-software", "digital-transformation", "ai-mvp"],
    faqs: [
      { q: "Can technicians use the app offline?", a: "Yes. We can build field apps that work offline and sync job updates once a connection is back." },
      { q: "Can customers track their technician?", a: "Yes. We build live status and arrival updates so customers know when to expect someone." },
    ],
  },
  "Logistics & Transportation": {
    ai: [
      { title: "Route optimisation", text: "Routes planned around traffic, time windows and vehicle capacity." },
      { title: "ETA predictions", text: "More accurate arrival times that update automatically as conditions change." },
      { title: "Document extraction", text: "Delivery notes and invoices read automatically, reducing manual data entry." },
    ],
    compliance: [
      { title: "Proof of delivery", text: "Signatures, photos and timestamps stored for every delivery." },
      { title: "Driver & customer privacy", text: "Location data used only for active jobs and handled under GDPR." },
      { title: "Role-based dispatch access", text: "Customers, drivers and dispatchers each see only what they need." },
    ],
    services: ["web-crm-software", "ai-mvp", "digital-transformation"],
    faqs: [
      { q: "Can you build driver and customer apps together?", a: "Yes. We've delivered connected customer, driver and dispatch apps that share one backend and live tracking." },
      { q: "Do you integrate with mapping and GPS providers?", a: "Yes. We regularly integrate Google Maps, routing APIs and vehicle GPS data." },
    ],
  },
  "Consulting, Staffing & Immigration": {
    ai: [
      { title: "CV parsing & matching", text: "Resumes turned into searchable profiles and matched to roles automatically." },
      { title: "Document checks", text: "AI that flags missing or inconsistent documents before a case is submitted." },
      { title: "Client update assistant", text: "Automated updates that keep clients informed about their case or placement." },
    ],
    compliance: [
      { title: "Sensitive document security", text: "Passports and personal files stored encrypted, with access logs." },
      { title: "GDPR-ready candidate data", text: "Consent, retention periods and deletion built into the workflow." },
      { title: "Case-level access", text: "Staff see only the clients and cases assigned to them." },
    ],
    services: ["web-crm-software", "digital-transformation", "sales-growth"],
    faqs: [
      { q: "Can you replace our spreadsheets with a CRM?", a: "Yes. We build CRMs around how your team already works, then move your existing data across." },
      { q: "Can clients upload documents securely?", a: "Yes. We build client portals with secure uploads, checklists and progress tracking." },
    ],
  },
  "E-Commerce & Retail": {
    ai: [
      { title: "Product recommendations", text: "Personalised suggestions that raise basket size and repeat purchases." },
      { title: "AI product content", text: "Descriptions, tags and translations generated for large catalogues, then reviewed." },
      { title: "Demand forecasting", text: "Stock predictions that reduce overstock and missed sales." },
    ],
    compliance: [
      { title: "Secure checkout", text: "Payments through PCI-compliant providers like Stripe or Shopify Payments." },
      { title: "Customer data privacy", text: "GDPR-ready consent, cookie and account deletion flows." },
      { title: "Fraud signals", text: "Order checks that flag unusual activity before fulfilment." },
    ],
    services: ["web-crm-software", "digital-transformation", "sales-growth"],
    faqs: [
      { q: "Do you work with Shopify?", a: "Yes. We build custom Shopify storefronts and apps, as well as fully custom e-commerce platforms." },
      { q: "Can you connect online and in-store sales?", a: "Yes. We integrate POS, inventory and online orders so stock and customers stay in sync." },
    ],
  },
  "Sports & Fitness": {
    ai: [
      { title: "Personalised plans", text: "Training and nutrition suggestions based on each member's goals and progress." },
      { title: "Churn prediction", text: "Early warnings when members are likely to cancel, so you can step in." },
      { title: "Member assistant", text: "Answers to class, booking and membership questions at any time." },
    ],
    compliance: [
      { title: "Health data care", text: "Health and fitness data handled with consent and GDPR in mind." },
      { title: "Secure memberships", text: "Recurring payments through PCI-compliant providers." },
      { title: "Member privacy", text: "Members control what they share with coaches and the community." },
    ],
    services: ["web-crm-software", "ai-mvp", "digital-transformation"],
    faqs: [
      { q: "Can you build class booking and memberships?", a: "Yes. We build booking, memberships, payments and check-ins in one platform." },
      { q: "Do you integrate with wearables?", a: "Yes. We can connect popular fitness trackers and health platforms through their APIs." },
    ],
  },
  "Food Delivery & Grocery": {
    ai: [
      { title: "Smart reordering", text: "Quick reorder suggestions based on each customer's past orders." },
      { title: "Delivery time predictions", text: "Realistic ETAs based on kitchen load, distance and traffic." },
      { title: "Stock & substitution help", text: "Suggested substitutes when items run out, to save the order." },
    ],
    compliance: [
      { title: "Secure payments", text: "Card and wallet payments through PCI-compliant providers." },
      { title: "Allergen information", text: "Clear allergen and ingredient data shown before checkout." },
      { title: "Customer & rider privacy", text: "Addresses and live locations shared only for active orders." },
    ],
    services: ["web-crm-software", "ai-mvp", "digital-transformation"],
    faqs: [
      { q: "Can you build customer, rider and store apps?", a: "Yes. We build all three, connected to one dashboard for orders, riders and stock." },
      { q: "Can it handle peak-time orders?", a: "Yes. We design for peak load with scalable cloud infrastructure and queue-based order handling." },
    ],
  },
  "Real Estate & Property": {
    ai: [
      { title: "Property matching", text: "Buyers and tenants matched to listings that fit their needs and budget." },
      { title: "Valuation support", text: "AI-assisted price estimates from comparable listings and market data." },
      { title: "Listing content", text: "Descriptions and translations generated from property details, then reviewed." },
    ],
    compliance: [
      { title: "Client data privacy", text: "Buyer, tenant and owner records handled under GDPR and local rules." },
      { title: "Secure documents", text: "Contracts and IDs stored encrypted, with access logs." },
      { title: "Role-based access", text: "Agents, owners and tenants each see only their own records." },
    ],
    services: ["web-crm-software", "sales-growth", "ai-mvp"],
    faqs: [
      { q: "Can you build a property CRM?", a: "Yes. We build CRMs for listings, leads, viewings and deals, shaped around your process." },
      { q: "Can tenants report issues online?", a: "Yes. We build tenant portals for maintenance requests, payments and documents." },
    ],
  },
  "Fintech & Financial Services": {
    ai: [
      { title: "Fraud & anomaly detection", text: "Unusual transactions flagged for review in real time." },
      { title: "Document processing", text: "Statements and applications read and checked automatically." },
      { title: "Client insights", text: "Dashboards that turn transaction data into clear, actionable trends." },
    ],
    compliance: [
      { title: "KYC & AML workflows", text: "Identity checks and screening integrated through trusted providers." },
      { title: "PCI-aware payments", text: "Card data handled only by PCI-compliant payment partners." },
      { title: "Full audit trails", text: "Every sensitive action logged for compliance reviews." },
    ],
    services: ["web-crm-software", "ai-mvp", "digital-transformation"],
    faqs: [
      { q: "Do you integrate KYC and payment providers?", a: "Yes. We integrate established KYC, banking and payment providers rather than building those regulated parts ourselves." },
      { q: "How do you handle security for financial data?", a: "Encryption, strict access control, audit logs and regular reviews are part of every financial build." },
    ],
  },
  "Healthcare & Wellness": {
    ai: [
      { title: "Smart scheduling", text: "Appointments balanced across practitioners, with fewer no-shows." },
      { title: "Clinical note support", text: "AI that drafts summaries and notes for practitioners to review." },
      { title: "Patient assistant", text: "Answers to common questions and booking help, around the clock." },
    ],
    compliance: [
      { title: "Patient data protection", text: "Designed around HIPAA and GDPR requirements for health data." },
      { title: "Consent management", text: "Clear patient consent for data use and communication." },
      { title: "Access by role", text: "Patients, practitioners and admins each see only what they should." },
    ],
    services: ["web-crm-software", "ai-mvp", "digital-transformation"],
    faqs: [
      { q: "Can you build patient and practitioner portals?", a: "Yes. We've built connected patient and practitioner portals with booking, records and messaging." },
      { q: "Do you support telehealth?", a: "Yes. We can integrate secure video consultations and remote follow-ups." },
    ],
  },
  "Pet Care & Veterinary": {
    ai: [
      { title: "Care reminders", text: "Vaccination and check-up reminders predicted for each pet." },
      { title: "Symptom triage", text: "An assistant that helps owners decide how urgently to book, then routes to the clinic." },
      { title: "Visit summaries", text: "AI-drafted visit notes that vets review and share with owners." },
    ],
    compliance: [
      { title: "Owner data privacy", text: "Owner contact and payment details handled under GDPR." },
      { title: "Secure records", text: "Pet medical records stored encrypted and backed up." },
      { title: "Secure payments", text: "Payments and plans through PCI-compliant providers." },
    ],
    services: ["web-crm-software", "ai-mvp", "digital-transformation"],
    faqs: [
      { q: "Can owners book and pay online?", a: "Yes. We build booking, payments and care plans that owners can manage from their phone." },
      { q: "Can you connect to our practice software?", a: "Often, yes. We integrate with practice management systems where they offer APIs or exports." },
    ],
  },
};
