import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DetailLayout, { DetailArticle, DetailGallery, DetailH2, DetailList, DetailNav, DetailP } from "@/components/detail/DetailLayout";
import Link from "next/link";
import { caseStudies, services, slugify } from "@/lib/data";
import { CASE_STUDY_SERVICES } from "@/lib/caseStudyFilters";
import { CASE_STUDY_AI } from "@/lib/caseStudyAI";
import CaseStudyStats from "@/components/case-study/CaseStudyStats";
import TechStackTable from "@/components/case-study/TechStackTable";

// Single case study in the supplied portfolio-single design (shared
// DetailLayout, also used by blog posts and industries). Order: title ->
// facts (industries, services, built with: as tags) -> hero in a browser
// mockup -> project overview + stats counter -> gallery -> what we built ->
// AI in this project -> tech stack -> impact -> prev/next.

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const study = caseStudies.find((c) => c.slug === params.slug);
  if (!study) return { title: "Case Study - Penaxis" };
  return {
    title: `${study.title} - Penaxis`,
    description: study.blurb,
    alternates: { canonical: `/case-studies/${study.slug}` },
  };
}

export default function CaseStudySlugPage({ params }: { params: { slug: string } }) {
  const index = caseStudies.findIndex((c) => c.slug === params.slug);
  const study = caseStudies[index];
  if (!study) notFound();

  const n = caseStudies.length;
  const prev = caseStudies[(index - 1 + n) % n];
  const next = caseStudies[(index + 1) % n];
  const imgs = study.bannerImages ?? [];
  const hero = imgs[0] || study.gridImage || study.image;
  const thumb = (c: (typeof caseStudies)[number]) => c.gridImage || c.image;
  const stack = study.techStack?.[0]?.items.split(",").slice(0, 3).map((x) => x.trim());
  const svc = (CASE_STUDY_SERVICES[study.slug] ?? [])
    .map((id) => services.find((x) => x.slug === id))
    .filter((x): x is (typeof services)[number] => !!x);
  const ai = CASE_STUDY_AI[study.slug];
  const facts: { label: string; tags: { text: string; href?: string }[] }[] = [
    { label: study.tags.length > 1 ? "Industries" : "Industry", tags: study.tags.map((t) => ({ text: t, href: `/industries/${slugify(t)}` })) },
    ...(svc.length ? [{ label: svc.length > 1 ? "Services" : "Service", tags: svc.map((x) => ({ text: x.title, href: `/services/${x.slug}` })) }] : []),
    ...(stack?.length ? [{ label: "Built with", tags: stack.map((t) => ({ text: t })) }] : []),
  ];

  return (
    <>
      <Navbar />
      <main>
        <DetailLayout eyebrow="Case study" title={study.title}>
          <div className="csx-facts pd-reveal" style={{ ["--cols" as string]: facts.length } as React.CSSProperties}>
            {facts.map((f) => (
              <div key={f.label} className="csx-fact">
                <div className="pd-meta-label">{f.label}:</div>
                <div className="csx-fact-tags">
                  {f.tags.map((t) =>
                    t.href ? (
                      <Link key={t.text} href={t.href} className="csx-tag is-link">{t.text}</Link>
                    ) : (
                      <span key={t.text} className="csx-tag">{t.text}</span>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Hero image presented in a browser-window mockup */}
          <div className="csx-mockup pd-reveal">
            <div className="csx-mockup-window">
              <div className="csx-mockup-bar" aria-hidden="true">
                <span className="csx-mockup-dots"><i /><i /><i /></span>
                <span className="csx-mockup-url">penaxis.com/case-studies/{study.slug}</span>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={hero} alt={study.title} />
            </div>
          </div>

          <DetailArticle>
            <DetailH2>Project overview</DetailH2>
            <DetailP>{study.overview}</DetailP>
            <DetailP>{study.challenge}</DetailP>
            {study.metrics?.length ? <CaseStudyStats metrics={study.metrics} /> : null}

            <DetailGallery images={imgs.slice(1, 3).map((src) => ({ src }))} />

            <DetailH2>What we built</DetailH2>
            <DetailP>{study.solutionIntro}</DetailP>
            <DetailList items={study.solutionPoints} />
            {study.solutionNote && <DetailP>{study.solutionNote}</DetailP>}

            {ai ? (
              <section className="csx-ai pd-reveal" aria-labelledby="csx-ai-title">
                <span className="csx-ai-label">{ai.kind === "built" ? "AI in this project" : "AI-ready"}</span>
                <h2 id="csx-ai-title" className="pd-display csx-ai-title">
                  {ai.kind === "built" ? "AI in this project" : "Where AI fits next"}
                </h2>
                <p className="csx-ai-intro">{ai.intro}</p>
                <div className="csx-ai-grid">
                  {ai.points.map((pt, i) => (
                    <div key={pt.title} className="csx-ai-card">
                      <span className="csx-ai-num">{String(i + 1).padStart(2, "0")}</span>
                      <h3>{pt.title}</h3>
                      <p>{pt.text}</p>
                    </div>
                  ))}
                </div>
                {ai.tools?.length ? (
                  <div className="csx-ai-tools">
                    <span>Models & tools:</span>
                    {ai.tools.map((t) => <span key={t} className="csx-tag is-dark">{t}</span>)}
                  </div>
                ) : null}
              </section>
            ) : null}

            {study.techStack?.length ? (
              <>
                <DetailH2>Tech stack</DetailH2>
                <TechStackTable groups={study.techStack} />
              </>
            ) : null}

            <DetailH2>The impact</DetailH2>
            <DetailP>{study.impactIntro}</DetailP>
            <DetailList items={study.impactPoints} />
          </DetailArticle>

          <DetailNav
            prev={{ href: `/case-studies/${prev.slug}`, title: prev.title, image: thumb(prev) }}
            next={{ href: `/case-studies/${next.slug}`, title: next.title, image: thumb(next) }}
          />
        </DetailLayout>
      </main>
      <Footer />
    </>
  );
}
