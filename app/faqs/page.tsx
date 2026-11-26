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
  description: "Answers to common questions about working with Penaxis: getting started, our services, how we work, pricing and ownership.",
  alternates: { canonical: "/faqs" },
};

export default function FaqPage() {
  return (
    <>
      <Navbar />
      <main>
        <ContactBanner
          image="/images/faq/faq-banner.webp"
          shade={0.1}
          label="FAQs"
          title="Questions & answers"
          intro="Everything about getting started, our services, how we work and pricing, answered by the Penaxis team."
        />
        <FaqSections topics={FAQ} />
      </main>
      <Footer />
    </>
  );
}
