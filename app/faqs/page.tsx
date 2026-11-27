import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactBanner from "@/components/contact-v2/ContactBanner";
import FaqSections from "@/components/FaqSections";
import { FAQ } from "@/lib/faq";

// /faqs: photo banner (same design as /contact-us and /blog), then one
// section per topic in the supplied faq-section design (FaqSections).
// The site's main FAQ page; /faq redirects here.
export const metadata: Metadata = {
  title: "FAQs - Penaxis",
  description: "What Penaxis does, where we are based, our services, AI and automation, how we work, pricing and ownership: answers to common questions about working with Penaxis.",
  alternates: { canonical: "/faqs" },
};

// FAQPage structured data (every question on the page) for search results.
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.flatMap((t) => t.items).map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function FaqPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c") }} />
      <Navbar />
      <main>
        <ContactBanner
          image="/images/faq/faq-banner.webp"
          shade={0.1}
          label="FAQs"
          title="Questions & answers"
          intro="Everything about Penaxis, our services, AI, how we work and pricing, answered by the Penaxis team."
        />
        <FaqSections topics={FAQ} />
      </main>
      <Footer />
    </>
  );
}
