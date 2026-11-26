import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import PageHeroBanner from "@/components/PageHeroBanner";
import CaseStudyV2Grid from "@/components/CaseStudyV2Grid";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Case Studies - Penaxis",
  description: "Real projects and real impact - explore Penaxis's work by industry.",
  alternates: {
    canonical: "/case-studies",
  },
};

export default function CaseStudiesPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHeroBanner
          lines={[{ text: "Real work" }, { text: "that drives", indent: true }, { text: "results" }]}
          text="Websites, platforms, CRMs and AI products we've shipped for clients across 12+ industries."
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
