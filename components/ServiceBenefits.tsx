// Single service page "Our initiative - Key benefits and outcomes" (after
// Our process). Four benefits per service. DRAFT COPY - review before launch.

const BENEFITS: Record<string, { title: string; text: string }[]> = {
  "ai-mvp": [
    { title: "Faster time to market", text: "Validate your idea with real users in weeks, not months, by building only what matters first." },
    { title: "Lower risk, smarter spend", text: "Test your riskiest assumptions early so investment goes into features users actually want." },
    { title: "Practical AI built in", text: "Assistants, smart search and automation that solve real problems, not features for a pitch deck." },
    { title: "Ready to scale", text: "A clean, modern foundation that grows from first users to a full product without a rewrite." },
  ],
  "digital-transformation": [
    { title: "Leaner operations", text: "Automated workflows replace manual work, spreadsheets and repetitive admin." },
    { title: "Clearer decisions", text: "Connected data and dashboards give leaders a real-time view of the business." },
    { title: "Stronger digital presence", text: "Consistent branding and social media that build trust and attract the right audience." },
    { title: "A roadmap you can follow", text: "Practical, step-by-step plans aligned with your goals, budget and team." },
  ],
  "sales-growth": [
    { title: "A predictable pipeline", text: "Consistent outreach and qualified conversations instead of feast-or-famine sales." },
    { title: "Senior expertise, flexibly", text: "Experienced sales support without the cost and time of a full in-house hire." },
    { title: "Aligned incentives", text: "A retainer plus commission model means we're invested in the deals we help close." },
    { title: "Clear reporting", text: "Visibility into activity, leads and opportunities so you always know what's working." },
  ],
  "web-crm-software": [
    { title: "Systems that fit your workflow", text: "Software shaped around how your team actually works, not a generic template." },
    { title: "One source of truth", text: "CRMs, portals and dashboards that connect data across your business." },
    { title: "Better customer experience", text: "Fast, intuitive websites and portals that make it easy to buy from and work with you." },
    { title: "Built to grow", text: "Scalable, secure platforms with integrations and support as your business evolves." },
  ],
};

const ICONS = [
  <path key="a" d="M13 2 4 14h7l-1 8 9-12h-7z" />,
  <><path key="b1" d="M12 3l8 3v6c0 4.5-3.4 8-8 9-4.6-1-8-4.5-8-9V6z" /><path key="b2" d="M9 12l2 2 4-4" /></>,
  <><path key="c1" d="M12 3l1.8 4.6L18.5 9l-4.7 1.4L12 15l-1.8-4.6L5.5 9l4.7-1.4z" /><path key="c2" d="M18 15l.9 2.1L21 18l-2.1.9L18 21l-.9-2.1L15 18l2.1-.9z" /></>,
  <><path key="d1" d="M3 20h18" /><path key="d2" d="M5 16l5-5 3 3 6-7" /><path key="d3" d="M15 7h4v4" /></>,
];

export default function ServiceBenefits({ slug, serviceTitle }: { slug: string; serviceTitle: string }) {
  const items = BENEFITS[slug];
  if (!items) return null;
  return (
    <section className="sbn" aria-labelledby="sbn-title">
      <div className="sbn-panel" data-nav-theme="dark">
        <div className="sbn-container">
          <div className="sbn-head">
            <span className="sbn-eyebrow">Our initiative</span>
            <h2 id="sbn-title" className="sbn-title">Key benefits and outcomes</h2>
            <p className="sbn-intro">What {serviceTitle} delivers for your business, from day one to long-term growth.</p>
          </div>
          <div className="sbn-grid">
            {items.map((b, i) => (
              <article key={b.title} className="sbn-card">
                <span className="sbn-ico" aria-hidden="true">
                  <svg viewBox="0 0 24 24">{ICONS[i % ICONS.length]}</svg>
                </span>
                <span className="sbn-num">{String(i + 1).padStart(2, "0")}</span>
                <h3>{b.title}</h3>
                <p>{b.text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
