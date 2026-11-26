import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import IndustryTemplate from "@/components/industry/IndustryTemplate";
import { industries, slugify } from "@/lib/data";

// Single industry page: the 11-section industry template
// (components/industry/IndustryTemplate.tsx) + the global footer.

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
  const industry = industries.find((ind) => slugify(ind.title) === params.slug);
  if (!industry) notFound();

  return (
    <>
      <Navbar />
      <main>
        <IndustryTemplate industry={industry} />
      </main>
      {/* 11 Global footer */}
      <Footer />
    </>
  );
}
