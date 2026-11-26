// Three key challenges per industry for the "Industry challenges" section on
// each single industry page (keyed by industry title).
// DRAFT COPY - review before launch.

export type Challenge = { title: string; text: string };

export const INDUSTRY_CHALLENGES: Record<string, Challenge[]> = {
  "Software, IT & SaaS": [
    { title: "Shipping without breaking things", text: "Pressure to release fast while an early MVP's technical debt slows every new feature." },
    { title: "Enterprise-ready features", text: "Buyers expect SSO, audit logs and granular permissions long before the roadmap is ready." },
    { title: "Integration overload", text: "Customers want your product to connect with the dozen tools they already use." },
  ],
  "Education & EdTech": [
    { title: "Engaging every learner", text: "Students expect modern, mobile-first experiences that keep them motivated." },
    { title: "Disconnected systems", text: "Admissions, learning, payments and communication often live in separate tools." },
    { title: "Protecting student data", text: "Sensitive records demand strict privacy, safeguarding and access control." },
  ],
  "Automotive & Auto Care": [
    { title: "Modern buying expectations", text: "Customers want to search, compare and book online as easily as any other purchase." },
    { title: "Fragmented operations", text: "Bookings, stock and service bays still run on spreadsheets and disconnected software." },
    { title: "Turning interest into sales", text: "Leads go cold when follow-up is slow or inconsistent." },
  ],
  "Home Services & Maintenance": [
    { title: "Fast, reliable response", text: "Customers want to book in a few taps and know exactly when someone will arrive." },
    { title: "Coordinating the field team", text: "Dispatch, routing and technician status are hard to manage manually." },
    { title: "Trust and proof of work", text: "Without photos, notes and sign-offs, disputes and callbacks increase." },
  ],
  "Logistics & Transportation": [
    { title: "Limited delivery visibility", text: "Customers and dispatchers can't see where jobs are in real time." },
    { title: "Manual coordination", text: "Calls, spreadsheets and messaging apps slow down every job assignment." },
    { title: "Proof and accountability", text: "Missing proof of delivery leads to disputes and delayed payments." },
  ],
  "Consulting, Staffing & Immigration": [
    { title: "Spreadsheet-driven workflows", text: "Clients, candidates and cases are tracked across sheets and inboxes." },
    { title: "Sensitive documents", text: "Passports and personal files need secure storage and controlled access." },
    { title: "Keeping clients informed", text: "Clients expect clear, regular updates without constant chasing." },
  ],
  "E-Commerce & Retail": [
    { title: "Converting visitors", text: "Generic storefronts struggle to turn traffic into sales and repeat customers." },
    { title: "Stock across channels", text: "Online, marketplace and in-store inventory easily falls out of sync." },
    { title: "Rising acquisition costs", text: "Growth depends on personalisation and loyalty, not just more ads." },
  ],
  "Sports & Fitness": [
    { title: "Member retention", text: "Members cancel quietly when engagement drops between visits." },
    { title: "Bookings and payments", text: "Classes, memberships and payments often sit in separate tools." },
    { title: "Community and content", text: "Members expect an app experience, not just a timetable." },
  ],
  "Food Delivery & Grocery": [
    { title: "Peak-time pressure", text: "Order spikes overwhelm kitchens, riders and systems at the busiest moments." },
    { title: "Accurate delivery times", text: "Unreliable ETAs hurt reviews and repeat orders." },
    { title: "Stock and substitutions", text: "Out-of-stock items lead to cancelled orders and unhappy customers." },
  ],
  "Real Estate & Property": [
    { title: "Lead management", text: "Enquiries from portals, social and calls get lost without a proper CRM." },
    { title: "Listings everywhere", text: "Keeping listings accurate across channels takes constant manual effort." },
    { title: "Tenant and owner service", text: "Maintenance requests, payments and documents need one simple portal." },
  ],
  "Fintech & Financial Services": [
    { title: "Security and trust", text: "Financial data demands strong security, encryption and audit trails." },
    { title: "Regulatory requirements", text: "KYC, AML and reporting obligations shape every product decision." },
    { title: "Legacy systems", text: "Modern experiences must connect with older core systems and partners." },
  ],
  "Healthcare & Wellness": [
    { title: "Fitting clinical workflows", text: "Generic tools rarely match how clinics and practitioners actually work." },
    { title: "Protecting patient data", text: "Health records require strict privacy, consent and access control." },
    { title: "Administrative load", text: "Scheduling, intake and records eat into time with patients." },
  ],
  "Pet Care & Veterinary": [
    { title: "Booking and reminders", text: "Missed vaccinations and check-ups mean lost care and revenue." },
    { title: "Owner communication", text: "Owners want quick answers, updates and records on their phone." },
    { title: "Practice systems", text: "Records, payments and plans are often spread across tools." },
  ],
  "Hospitality & Tourism": [
    { title: "Channel and rate complexity", text: "Bookings from your site, OTAs and walk-ins must stay perfectly in sync." },
    { title: "Commission costs", text: "Heavy reliance on OTAs eats into margins on every stay." },
    { title: "Guest expectations", text: "Guests expect instant answers and a personal experience throughout their stay." },
  ],
  "Fashion, Beauty & Lifestyle": [
    { title: "Standing out online", text: "Template storefronts make it hard to express a distinctive brand." },
    { title: "Online and in-store", text: "Stock, orders and customer data need to work across every channel." },
    { title: "Bookings and loyalty", text: "Salons and studios need simple booking, packages and repeat visits." },
  ],
  "Pharmaceuticals & Life Sciences": [
    { title: "Compliance and audit", text: "Documents, approvals and changes must be traceable and inspection-ready." },
    { title: "Supply chain visibility", text: "Batches, stock and distribution are hard to track across partners." },
    { title: "Secure collaboration", text: "Partners and distributors need controlled access to the right data." },
  ],
  "Physiotherapy & Rehabilitation": [
    { title: "Filling the diary", text: "Phone-based booking and no-shows leave gaps in the schedule." },
    { title: "Patient adherence", text: "Progress stalls when patients don't follow their programme at home." },
    { title: "Notes and records", text: "Treatment notes and progress need one secure, accessible place." },
  ],
  "Mental Health & Psychology": [
    { title: "Confidentiality", text: "Client data must be private by design, with strictly limited access." },
    { title: "Flexible sessions", text: "Practices need to support both in-person and secure online sessions." },
    { title: "Ongoing engagement", text: "Clients benefit from support and check-ins between appointments." },
  ],
  "Architecture, Interiors & Fit-Out": [
    { title: "Winning the right projects", text: "A strong portfolio is essential, but many sites undersell the work." },
    { title: "Approvals and versions", text: "Drawings and changes get lost across email threads." },
    { title: "Client updates", text: "Clients want to know where their project stands without chasing." },
  ],
  "Construction & Engineering": [
    { title: "Cost and schedule overruns", text: "Delays and overspend are spotted too late without live data." },
    { title: "Paper-based site reporting", text: "Site reports, photos and snag lists are slow to collect and share." },
    { title: "Many subcontractors", text: "Coordinating documents and updates across teams is complex." },
  ],
  "Manufacturing & Industrial": [
    { title: "Limited production visibility", text: "Orders, production and stock data sit in separate systems." },
    { title: "Downtime and waste", text: "Reactive maintenance and planning cost time and materials." },
    { title: "Manual data entry", text: "Re-keying data between machines, ERPs and spreadsheets causes errors." },
  ],
  "Wholesale & Distribution": [
    { title: "Orders by phone and chat", text: "Orders arrive by phone, email and WhatsApp, then get re-keyed by hand." },
    { title: "Stock accuracy", text: "Inventory across warehouses is hard to keep accurate in real time." },
    { title: "Customer self-service", text: "B2B buyers expect to order, reorder and track online, 24/7." },
  ],
  "Cybersecurity & Information Security": [
    { title: "Showing your value", text: "Clients struggle to see the value of work that prevents incidents." },
    { title: "Scattered tools", text: "Assessments, SOC workflows and reporting run across many tools." },
    { title: "Winning enterprise trust", text: "A professional digital presence is essential to win larger clients." },
  ],
  "Personal Brands & Professionals": [
    { title: "Looking established", text: "Link pages and generic tools make it harder to build credibility." },
    { title: "Stitched-together tools", text: "Booking, payments and content live in separate apps." },
    { title: "Turning followers into clients", text: "Content attracts attention, but converting it takes a clear journey." },
  ],
};
