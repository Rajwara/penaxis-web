import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContentShell from "@/components/content/ContentShell";
import PolicyToc from "@/components/content/PolicyToc";
import { contact } from "@/lib/data";
import { POLICIES, getPolicy, type Inline, type PolicyBlock, type PolicyIcon } from "@/lib/policies";
import "../policies.css";
import "@/components/content/home-v2-theme.css";

// /policies/privacy and /policies/terms: the content-pages policy design
// (grey hero with tabs, key-point cards, sticky contents list, numbered
// sections, black CTA panel) with the Penaxis policy text from
// lib/policies.ts. These are the site's main legal pages; the old
// /privacy-policy and /terms-conditions addresses redirect here.

type Props = { params: { slug: string } };

export const dynamicParams = false;

export function generateStaticParams() {
  return POLICIES.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const p = getPolicy(params.slug);
  if (!p) return {};
  return {
    title: `${p.title} - Penaxis`,
    description: p.intro,
    alternates: { canonical: `/policies/${p.slug}` },
  };
}

const ICONS: Record<PolicyIcon, React.ReactNode> = {
  shield: <><path d="M12 3 5 6v5c0 5 3 8 7 10 4-2 7-5 7-10V6z" /><path d="m9 12 2 2 4-4" /></>,
  lock: <><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></>,
  user: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
  file: <><path d="M14 3H6v18h12V7z" /><path d="M14 3v4h4M9 12h6M9 16h6" /></>,
  chart: <><path d="M4 20h16" /><path d="M7 16v-4M12 16V8M17 16v-7" /></>,
};

const PHONE_HREF = `tel:${contact.phone.replace(/[^+\d]/g, "")}`;
const EMAIL_HREF = `mailto:${contact.email}`;

const date = (iso: string) => new Date(iso + "T00:00:00Z").toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

function Runs({ parts }: { parts: Inline[] }) {
  return (
    <>
      {parts.map((r, k) =>
        typeof r === "string" ? (
          r
        ) : "b" in r ? (
          <strong key={k}>{r.b}</strong>
        ) : "a" in r ? (
          <a key={k} href={r.href}>
            {r.a}
          </a>
        ) : (
          <br key={k} />
        ),
      )}
    </>
  );
}

function Block({ block }: { block: PolicyBlock }) {
  if (typeof block === "string") return <p>{block}</p>;
  if ("p" in block)
    return (
      <p>
        <Runs parts={block.p} />
      </p>
    );
  if ("h3" in block) return <h3>{block.h3}</h3>;
  return (
    <ul>
      {block.list.map((li) => (
        <li key={li}>{li}</li>
      ))}
    </ul>
  );
}

export default function PolicyPage({ params }: Props) {
  const policy = getPolicy(params.slug);
  if (!policy) notFound();

  return (
    <>
      <Navbar />
      <main>
        <ContentShell>
          <div className="pol">
            <section className="pol-hero">
              <nav className="pol-tabs" aria-label="Policies">
                {POLICIES.map((p) => (
                  <Link key={p.slug} href={`/policies/${p.slug}`} className={p.slug === policy.slug ? "on" : undefined} aria-current={p.slug === policy.slug ? "page" : undefined}>
                    {p.tab}
                  </Link>
                ))}
              </nav>
              <span className="pol-label">Policies</span>
              <h1>{policy.title}</h1>
              <p className="pol-intro">{policy.intro}</p>
              <span className="pol-updated">Last updated: {date(policy.updated)}</span>
            </section>

            {policy.points.length > 0 && (
              <section className="pol-points pol-container" aria-label="Key points">
                {policy.points.map((pt, i) => (
                  <article className="pol-point" key={pt.title}>
                    <div className="pol-point-top">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        {ICONS[pt.icon]}
                      </svg>
                      <b>{String(i + 1).padStart(2, "0")}</b>
                    </div>
                    <h3>{pt.title}</h3>
                    <p>{pt.text}</p>
                  </article>
                ))}
              </section>
            )}

            <div className="pol-body pol-container">
              <aside className="pol-toc">
                <span className="pol-label">On this page</span>
                <PolicyToc items={policy.sections.map((s) => ({ id: s.id, title: s.title }))} />
                <div className="pol-help">
                  <b>Need help?</b>
                  <p>Email our team or give us a call.</p>
                  <a href={EMAIL_HREF}>{contact.email}</a>
                  <a href={PHONE_HREF}>{contact.phone}</a>
                </div>
              </aside>
              <article className="pol-article">
                {policy.lead.length > 0 && (
                  <div className="pol-lead">
                    {policy.lead.map((b, j) => (
                      <Block key={j} block={b} />
                    ))}
                  </div>
                )}
                {policy.sections.map((s, i) => (
                  <section className="pol-section" id={s.id} key={s.id}>
                    <span className="pol-num">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <h2>{s.title}</h2>
                      {s.body.map((b, j) => (
                        <Block key={j} block={b} />
                      ))}
                    </div>
                  </section>
                ))}
              </article>
            </div>
          </div>
        </ContentShell>
      </main>
      <Footer />
    </>
  );
}
