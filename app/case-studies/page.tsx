import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import PageHeroBanner from "@/components/PageHeroBanner";
import CaseStudyV2Grid from "@/components/CaseStudyV2Grid";
import Footer from "@/components/Footer";
import { caseStudies } from "@/lib/data";

export const metadata: Metadata = {
  title: "Case Studies: AI, Software & Digital Projects - Penaxis",
  description:
    "Explore real Penaxis projects: AI products, web platforms, mobile apps and business software delivered for clients in logistics, healthcare, e-commerce, fintech and more. Browse by industry, service or technology.",
  alternates: {
    canonical: "/case-studies",
  },
};

// Structured data: the case studies listed on this page.
const listJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Penaxis case studies",
  url: "https://www.penaxis.com/case-studies",
  mainEntity: {
    "@type": "ItemList",
    itemListElement: caseStudies.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: s.title,
      url: `https://www.penaxis.com/case-studies/${s.slug}`,
    })),
  },
};

export default function CaseStudiesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(listJsonLd).replace(/</g, "\\u003c") }} />
      <Navbar />
      <main>
        <PageHeroBanner
          lines={[{ text: "Real work" }, { text: "that drives", indent: true }, { text: "results" }]}
          text="Websites, platforms, CRMs and AI products we've delivered for clients across 10+ industries."
          cta={{ label: "Start a project", href: "/contact-us" }}
          bg="/images/hero/case-studies-bg.webp"
          person="/images/hero/case-studies-person.webp"
        />
        <CaseStudyV2Grid />
      </main>
      <Footer />
    </>
  );
}
