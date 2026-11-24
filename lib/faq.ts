/**
 * FAQ for /faqs (the content-pages FAQ design), grouped by topic.
 *
 * Questions, answers and images were copied word for word from the original
 * /faqs page; this file is now the only source for the FAQs. Topics group the original
 * per-question tags (noted on each item). Items whose original link was
 * /contact-us have no link here: the page's contact panel covers them.
 * `image` is shown, tilted, beside the list while a question is hovered or open.
 */
export type Faq = { q: string; a: string; image: string; link?: { label: string; href: string } };
export type FaqTopic = { id: string; title: string; items: Faq[] };

export const FAQ: FaqTopic[] = [
  {
    id: "getting-started",
    title: "Getting started",
    items: [
      // Getting Started
      {
        q: "What do we need to start?",
        a: "A clear problem statement, access to any existing data or systems, and a stakeholder who can make decisions. We'll run a kickoff call to align on scope.",
        image: "/images/hero/faq-getting-started.webp",
      },
      // Industries
      {
        q: "Which industries do you work with?",
        a: "13 and counting - from software and healthcare to logistics, retail, and real estate. If yours isn't listed yet, tell us about it.",
        image: "/images/hero/faq-industries.webp",
        link: { label: "Industries we work with", href: "/industries" },
      },
      // Proof of Work
      {
        q: "Can we see examples of what you've built before?",
        a: "Yes - explore our case studies for real, delivered projects across industries like logistics, healthcare, and e-commerce, with the actual problems we solved and what we built.",
        image: "/images/case-studies/grid/drivelo-logistics-platform-grid.webp",
        link: { label: "Case studies", href: "/case-studies" },
      },
      // Getting Started
      {
        q: "Is there a minimum project size you work with?",
        a: "We're set up for everything from a focused 5-day MVP sprint to multi-month platform builds. If you're not sure where your project fits, the fastest way to find out is a quick call.",
        image: "/images/panels/service-panel-team-1.webp",
      },
    ],
  },
  {
    id: "services",
    title: "Services & technology",
    items: [
      // Services
      {
        q: "Do you only build software, or do you help with growth too?",
        a: "Both. Penaxis combines AI-powered product development with fractional sales and digital transformation support, so the systems we build actually get used.",
        image: "/images/hero/faq-software-growth.webp",
        link: { label: "AI-Powered MVP Development", href: "/services/ai-mvp" },
      },
      // Tech Stack
      {
        q: "What technologies do you build with?",
        a: "We pick the stack to fit the project, not the other way around - commonly React, Next.js, Node, Django, Flutter, and AI tooling, plus whatever your existing systems already run on.",
        image: "/images/services/web-crm-software-about.webp",
        link: { label: "Web, CRM & Software Solutions", href: "/services/web-crm-software" },
      },
      // Existing Products
      {
        q: "Can you work with an existing codebase, or only build from scratch?",
        a: "Both. We regularly take over existing products - auditing the code first, then improving, extending, or migrating it rather than starting over unless that's genuinely the better path.",
        image: "/images/services/digital-transformation-about.webp",
        link: { label: "Digital Transformation", href: "/services/digital-transformation" },
      },
      // Design
      {
        q: "Do you handle design, or just development?",
        a: "Both, under one roof. Our designers and engineers work side by side, so what you approve in design is what actually ships - no handoff gaps.",
        image: "/images/services/ai-mvp-about.webp",
        link: { label: "AI-Powered MVP Development", href: "/services/ai-mvp" },
      },
      // AI
      {
        q: "What do you mean by \"AI-powered\" development?",
        a: "We use AI to speed up the parts of building software that are mechanical - scaffolding, boilerplate, testing - so our engineers spend their time on the decisions that actually need a human. It also shows up directly in some products, like AI assistants or smart search.",
        image: "/images/services/pillar-ai-assistants-intelligent-features.webp",
        link: { label: "AI-Powered MVP Development", href: "/services/ai-mvp" },
      },
      // Security
      {
        q: "How do you handle data security and compliance?",
        a: "Security is built in from the start, not bolted on - proper authentication, encrypted data, and access controls by default, with extra compliance work (like healthcare or fintech requirements) scoped in up front when relevant.",
        image: "/images/services/pillar-custom-software-integrated-systems.webp",
        link: { label: "Fintech & Financial Services", href: "/industries/fintech-and-financial-services" },
      },
    ],
  },
  {
    id: "process",
    title: "Process & team",
    items: [
      // Process
      {
        q: "What's the typical timeline from idea to v1?",
        a: "Most MVPs launch in about 5 business days. We scope tight, ship something real fast, and iterate from there based on what we learn.",
        image: "/images/hero/faq-timeline.webp",
        link: { label: "AI-Powered MVP Development", href: "/services/ai-mvp" },
      },
      // Team
      {
        q: "Who actually works on my project?",
        a: "A dedicated team matched to your project - typically a project lead, engineers, and a designer, backed by our wider team of 27+ specialists across product, engineering, and growth.",
        image: "/images/hero/team-group.webp",
        link: { label: "Meet the team", href: "/game-changers" },
      },
      // Support
      {
        q: "Do you offer support after launch?",
        a: "Yes. Every engagement includes a handover period, and most clients move into an ongoing support or retainer arrangement afterward so the product keeps improving post-launch.",
        image: "/images/hero/trusted-partner-office.webp",
      },
      // Process
      {
        q: "How do you communicate during a project?",
        a: "Weekly check-ins at minimum, plus a shared channel for day-to-day questions. You'll always know what's shipped, what's in progress, and what's next.",
        image: "/images/hero/team-huddle.jpg",
      },
      // Remote Work
      {
        q: "We're in a different time zone - how does that work?",
        a: "We work with clients across North America, Europe, and the Gulf already, with team overlap hours built into the schedule and async updates so nothing waits on a single meeting slot.",
        image: "/images/hero/industries-network.webp",
      },
      // Scope Changes
      {
        q: "What happens if we need to change scope mid-project?",
        a: "It happens on almost every project, and that's fine - we document the change, its impact on timeline and cost, and get your sign-off before any work starts, so there are never surprise invoices.",
        image: "/images/hero/team-celebration.webp",
      },
    ],
  },
  {
    id: "pricing",
    title: "Pricing & ownership",
    items: [
      // Pricing
      {
        q: "How much does a typical project cost?",
        a: "It depends on scope, but most engagements fall into a few clear models - fixed-price for a defined MVP, or a monthly retainer for ongoing work. We'll give you a real number after a short discovery call, not a generic range.",
        image: "/images/hero/momentum-team.webp",
      },
      // Ownership
      {
        q: "Who owns the code and IP once the project is done?",
        a: "You do. Once the final payment clears, full ownership of the code, designs, and any custom IP built for you transfers entirely to your business.",
        image: "/images/hero/office-logo-desk.jpg",
      },
      // Engagement
      {
        q: "Do you only do fixed projects, or can we hire your team on retainer?",
        a: "Both. Some clients need a defined project with a clear end date; others keep our team on as a fractional extension of theirs for ongoing development, sales, or growth work.",
        image: "/images/services/sales-growth-about.webp",
        link: { label: "Fractional Sales & Growth", href: "/services/sales-growth" },
      },
      // Payments
      {
        q: "How are payments structured?",
        a: "Typically a milestone-based schedule tied to project phases, or a recurring monthly payment for retainer work - agreed upfront before any work starts, with no hidden fees.",
        image: "/images/hero/lets-connect-team.webp",
      },
    ],
  },
];
