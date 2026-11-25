import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DetailLayout, { DetailArticle, DetailGallery, DetailH2, DetailImage, DetailList, DetailMeta, DetailNav, DetailP } from "@/components/detail/DetailLayout";
import { industries, caseStudies, slugify } from "@/lib/data";
import { CASE_STUDY_SHORT_TITLES } from "@/lib/caseStudyCards";

// Single industry page in the supplied portfolio-single design (shared
// DetailLayout, also used by case studies and blog posts).

export function generateStaticParams() {
  return industries.map((ind) => ({ slug: slugify(ind.title) }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const industry = industries.find((ind) => slugify(ind.title) === params.slug);
  if (!industry) return { title: "Industries - Penaxis" };
  return {
    title: `${industry.title} - Penaxis`,
    description: industry.copy,
    alternates: { canonical: `/industries/${slugify(industry.title)}` },
  };
}

export default function IndustrySlugPage({ params }: { params: { slug: string } }) {
  const index = industries.findIndex((ind) => slugify(ind.title) === params.slug);
  const industry = industries[index];
  if (!industry) notFound();

  const n = industries.length;
  const prev = industries[(index - 1 + n) % n];
  const next = industries[(index + 1) % n];
  const related = caseStudies.filter((s) => s.tags.includes(industry.title));

  return (
    <>
      <Navbar />
      <main>
        <DetailLayout eyebrow="Industry" title={industry.title}>
          <DetailMeta
            items={[
              { label: "Industry", value: industry.title },
              { label: "Case studies", value: related.length ? String(related.length) : "Coming soon" },
              { label: "Engagement", value: "Project or dedicated team" },
              { label: "Offices", value: "Lahore & Dubai" },
            ]}
          />
          <DetailImage src={industry.image} alt={industry.title} />

          <DetailArticle>
            <DetailH2>The challenge</DetailH2>
            <DetailP>{industry.copy}</DetailP>
            <DetailP>{industry.challenge}</DetailP>

            <DetailH2>How we help</DetailH2>
            <DetailList items={industry.solutions} />

            <DetailH2>What you get</DetailH2>
            <DetailList items={industry.outcomes} />

            {related.length >= 2 && (
              <>
                <DetailH2>Related work</DetailH2>
                <DetailGallery
                  images={related.slice(0, 2).map((s) => ({
                    src: s.gridImage || s.image,
                    href: `/case-studies/${s.slug}`,
                    caption: CASE_STUDY_SHORT_TITLES[s.slug] ?? s.title,
                  }))}
                />
              </>
            )}
            {related.length === 1 && (
              <>
                <DetailH2>Related work</DetailH2>
                <DetailP>
                  See how we built{" "}
                  <a className="pd-inline-link" href={`/case-studies/${related[0].slug}`}>
                    {related[0].title}
                  </a>
                  .
                </DetailP>
              </>
            )}
          </DetailArticle>

          <DetailNav
            prev={{ href: `/industries/${slugify(prev.title)}`, title: prev.title, image: prev.image }}
            next={{ href: `/industries/${slugify(next.title)}`, title: next.title, image: next.image }}
          />
        </DetailLayout>
      </main>
      <Footer />
    </>
  );
}
