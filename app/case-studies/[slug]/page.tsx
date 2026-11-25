import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DetailLayout, { DetailArticle, DetailGallery, DetailH2, DetailImage, DetailList, DetailMeta, DetailNav, DetailP } from "@/components/detail/DetailLayout";
import { caseStudies } from "@/lib/data";

// Single case study in the supplied portfolio-single design (shared
// DetailLayout, also used by blog posts and industries).

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
  const firstMetric = study.metrics?.[0];
  const stack = study.techStack?.[0]?.items.split(",").slice(0, 3).map((s) => s.trim()).join(", ");

  const meta = [
    { label: "Industry", value: study.tags.join(", ") },
    { label: "Region", value: study.region },
    { label: "Status", value: study.status === "delivered" ? "Delivered" : "Concept & design" },
    ...(firstMetric ? [{ label: "Scope", value: `${firstMetric.value} ${firstMetric.label}` }] : []),
    ...(stack ? [{ label: "Built with", value: stack }] : []),
  ];

  return (
    <>
      <Navbar />
      <main>
        <DetailLayout eyebrow="Case study" title={study.title}>
          <DetailMeta items={meta} />
          <DetailImage src={hero} alt={study.title} />

          <DetailArticle>
            <DetailH2>Project overview</DetailH2>
            <DetailP>{study.overview}</DetailP>
            <DetailP>{study.challenge}</DetailP>

            <DetailGallery images={imgs.slice(1, 3).map((src) => ({ src }))} />

            <DetailH2>What we built</DetailH2>
            <DetailP>{study.solutionIntro}</DetailP>
            <DetailList items={study.solutionPoints} />
            {study.solutionNote && <DetailP>{study.solutionNote}</DetailP>}

            {study.techStack?.length ? (
              <>
                <DetailH2>Tech stack</DetailH2>
                <DetailMeta items={study.techStack.map((t) => ({ label: t.label, value: t.items }))} />
              </>
            ) : null}

            <DetailH2>The impact</DetailH2>
            <DetailP>{study.impactIntro}</DetailP>
            <DetailList items={study.impactPoints} />
            {study.metrics?.length ? (
              <DetailMeta items={study.metrics.map((m) => ({ label: m.label, value: m.value }))} />
            ) : null}
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
