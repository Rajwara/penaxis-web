// The 11 industries from the navbar menu that had no page of their own.
// Same shape as `industries` in lib/data.ts so the single industry template
// renders them. Kept separate so the /industries grid ("All 13") and other
// lists that use `industries` are unchanged.
//
// DRAFT COPY + TEMP IMAGES (borrowed from the closest existing industry) -
// review the text and upload a photo for each before launch.

const IMG = (slug: string) => `/images/industries/${slug}.webp`;

export const moreIndustries = [
  {
    title: "Hospitality & Tourism",
    copy: "Booking platforms, guest apps and revenue tools for hotels, resorts and travel businesses.",
    challenge:
      "Hotels and travel businesses juggle bookings across their own site, OTAs and walk-ins, while guests expect instant answers and a smooth stay. When channels, rates and guest data live in separate systems, double bookings, missed upsells and slow service follow.",
    outcomes: [
      "One view of bookings, rates and availability across every channel",
      "More direct bookings with fewer commission fees",
      "Guest service that feels personal at every step",
    ],
    image: IMG("real-estate-and-property"),
    solutions: [
      "Direct booking websites and engines connected to your channel manager",
      "Guest apps for check-in, requests, upsells and local recommendations",
      "Revenue and occupancy dashboards that show where to adjust rates",
    ],
  },
  {
    title: "Fashion, Beauty & Lifestyle",
    copy: "Online stores, booking apps and brand experiences for fashion, beauty and lifestyle brands.",
    challenge:
      "Fashion and beauty brands compete on experience: customers expect to discover, try and buy seamlessly across social, web and stores. Disconnected stock, generic storefronts and manual booking for salons or consultations hold growth back.",
    outcomes: [
      "A storefront that reflects your brand, not a template",
      "Stock and orders in sync across online and in-store",
      "Repeat customers through personalised offers and loyalty",
    ],
    image: IMG("e-commerce-and-retail"),
    solutions: [
      "Custom Shopify and headless storefronts built to convert",
      "Booking and loyalty apps for salons, studios and services",
      "Product recommendations and personalised campaigns",
    ],
  },
  {
    title: "Pharmaceuticals & Life Sciences",
    copy: "Secure portals, data platforms and compliance-ready tools for pharma and life-science teams.",
    challenge:
      "Pharma and life-science organisations work with sensitive data, strict regulations and complex supply chains. Spreadsheets and legacy tools make it hard to track batches, documents and approvals while staying audit-ready.",
    outcomes: [
      "Documents, approvals and audit trails in one controlled system",
      "Better visibility of stock, batches and distribution",
      "Faster reporting without manual data gathering",
    ],
    image: IMG("healthcare-and-wellness"),
    solutions: [
      "Document and approval workflows with full audit trails",
      "Inventory, batch and distribution tracking platforms",
      "Partner and distributor portals with role-based access",
    ],
  },
  {
    title: "Physiotherapy & Rehabilitation",
    copy: "Booking, patient management and home-exercise apps for physio, chiropractic and rehab clinics.",
    challenge:
      "Physio and rehab clinics depend on patients booking, attending and following their programmes between visits. Phone-based booking, paper notes and printed exercise sheets make it hard to fill the diary and track progress.",
    outcomes: [
      "Fuller diaries with fewer no-shows",
      "Patients who follow their programme between sessions",
      "Clinical notes and progress in one secure place",
    ],
    image: IMG("healthcare-and-wellness"),
    solutions: [
      "Online booking with reminders and package management",
      "Home-exercise apps with videos and progress tracking",
      "Patient records and treatment notes built for clinics",
    ],
  },
  {
    title: "Mental Health & Psychology",
    copy: "Secure booking, therapy platforms and wellbeing apps for practices and mental-health services.",
    challenge:
      "Mental-health services need software that is easy for clients, private by design and flexible enough for in-person and online sessions. Generic tools rarely balance confidentiality, scheduling and client engagement.",
    outcomes: [
      "Private, simple booking and session management",
      "Secure online sessions and messaging",
      "Better client engagement between appointments",
    ],
    image: IMG("healthcare-and-wellness"),
    solutions: [
      "Confidential booking and practice management systems",
      "Secure video sessions and client portals",
      "Wellbeing and journaling apps that support ongoing care",
    ],
  },
  {
    title: "Architecture, Interiors & Fit-Out",
    copy: "Portfolio sites, project portals and visual tools for architects, designers and fit-out firms.",
    challenge:
      "Design and fit-out firms win work through their portfolio and deliver it through countless drawings, approvals and site updates. Without a shared system, clients chase updates and teams lose time to email and version confusion.",
    outcomes: [
      "A portfolio that wins better projects",
      "Clients who always know where their project stands",
      "Fewer delays from approvals and version mix-ups",
    ],
    image: IMG("home-services-and-maintenance"),
    solutions: [
      "Portfolio websites that showcase projects beautifully",
      "Client portals for drawings, approvals and progress updates",
      "Visual configurators and quote tools for interiors",
    ],
  },
  {
    title: "Construction & Engineering",
    copy: "Project management, site apps and reporting tools for construction and engineering firms.",
    challenge:
      "Construction projects run on tight margins, many subcontractors and constant change. When progress, costs and site reports live in paper forms and spreadsheets, delays and overruns are spotted too late.",
    outcomes: [
      "Live visibility of progress and costs across sites",
      "Faster, more accurate site reporting",
      "Fewer disputes thanks to clear records",
    ],
    image: IMG("home-services-and-maintenance"),
    solutions: [
      "Project and cost-tracking platforms across sites",
      "Mobile site apps for reports, photos and snag lists",
      "Subcontractor and document portals",
    ],
  },
  {
    title: "Manufacturing & Industrial",
    copy: "Production tracking, ERP integrations and dashboards for manufacturers and industrial firms.",
    challenge:
      "Manufacturers need clear visibility of orders, production and stock, but data often sits across machines, ERPs and spreadsheets. Without it, planning is reactive and downtime and waste are hard to reduce.",
    outcomes: [
      "Real-time view of production and stock",
      "Better planning with less downtime and waste",
      "Systems that talk to each other instead of manual re-entry",
    ],
    image: IMG("logistics-and-transportation"),
    solutions: [
      "Production and order tracking dashboards",
      "ERP, inventory and machine-data integrations",
      "Quality and maintenance apps for the shop floor",
    ],
  },
  {
    title: "Wholesale & Distribution",
    copy: "B2B ordering portals, inventory and delivery systems for wholesalers and distributors.",
    challenge:
      "Wholesalers still take many orders by phone, email and WhatsApp, then re-key them into stock and accounting systems. That slows fulfilment, causes errors and makes it hard to give customers self-service.",
    outcomes: [
      "Customers who order and reorder online, 24/7",
      "Accurate stock across warehouses",
      "Faster fulfilment with fewer order errors",
    ],
    image: IMG("logistics-and-transportation"),
    solutions: [
      "B2B ordering portals with customer-specific pricing",
      "Inventory and warehouse management integrations",
      "Delivery scheduling and proof-of-delivery apps",
    ],
  },
  {
    title: "Cybersecurity & Information Security",
    copy: "Platforms, portals and internal tools for cybersecurity firms, SOC teams and MSSPs.",
    challenge:
      "Security firms run on trust, expertise and fast response. Many still manage clients, assessments and SOC workflows across scattered tools, which makes reporting slow and hides the value they deliver.",
    outcomes: [
      "A professional digital presence that wins enterprise clients",
      "Client reporting that clearly shows your value",
      "Streamlined internal workflows for SOC and assessment teams",
    ],
    image: IMG("software-it-and-saas"),
    solutions: [
      "Client portals for reports, findings and remediation tracking",
      "Internal tools for SOC, assessments and ticket workflows",
      "Websites and HR platforms for growing security firms",
    ],
  },
  {
    title: "Personal Brands & Professionals",
    copy: "Websites, booking and content platforms for coaches, consultants, creators and professionals.",
    challenge:
      "Coaches, consultants and creators grow through trust and visibility, but often stitch together link pages, booking tools and payment apps. That makes it harder to look established and turn followers into clients.",
    outcomes: [
      "A personal brand site that builds credibility",
      "Bookings and payments in one place",
      "A steady flow of leads from your content",
    ],
    image: IMG("consulting-staffing-and-immigration"),
    solutions: [
      "Personal brand websites with booking and payments",
      "Course, membership and community platforms",
      "Social media strategy and content systems",
    ],
  },
];
