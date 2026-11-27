import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import NxHero from "@/components/industry/NxHero";
import IndustrySearch from "@/components/industry/IndustrySearch";
import DetailReveal from "@/components/detail/DetailReveal";
import { NxFeaturesSection } from "@/components/industry/NxFeatures";
import NxMarquee from "@/components/industry/NxMarquee";
import IndustryShowcase from "@/components/industry/IndustryShowcase";
import IndustryCaseSlider from "@/components/industry/IndustryCaseSlider";
import FaqSections from "@/components/FaqSections";
import HomeV2Cta from "@/components/HomeV2Cta";
import { INDUSTRY_MENU } from "@/lib/industryMenu";

const INDUSTRY_FAQS = [
  { q: "What if my industry is not listed?", a: "Our expertise is not limited to the industries listed. We assess your requirements and can develop tailored technology and growth solutions for your sector." },
  { q: "Do you offer pre-built solutions or custom development?", a: "We primarily develop solutions tailored to your objectives, operations and existing technology. Where suitable, we can integrate and customize established platforms." },
  { q: "Can you work with businesses of different sizes?", a: "We adapt our approach for startups, small and medium-sized businesses and established enterprises." },
  { q: "Can you integrate with our existing systems?", a: "Subject to technical assessment, we can integrate CRMs, ERPs, payment gateways and third-party applications." },
  { q: "How do you address industry-specific requirements?", a: "We assess workflows, objectives, the technical environment and applicable regulatory requirements before defining the solution." },
  { q: "Can you help us identify AI opportunities?", a: "We evaluate processes and identify practical opportunities for AI and automation to improve efficiency, customer experience or decision-making." },
  { q: "Do you provide ongoing support?", a: "Maintenance, technical support, optimization and growth services can be included in the agreed scope." },
  { q: "Do you work internationally?", a: "We can collaborate across markets through remote delivery, structured project management and ongoing communication." },
].map((f) => ({ ...f, image: "" }));
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Industries - Penaxis",
  description: "24 industries, one team - see how Penaxis builds for each one.",
  alternates: {
    canonical: "/industries",
  },
};

export default function IndustriesPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Same banner as the single industry pages */}
        <DetailReveal>
        <div className="nx">
          <NxHero
            eyebrow="Industries we serve"
            title={<>Different Industries.<br />Limitless Possibilities.</>}
            text="From emerging startups to established enterprises, we solve industry-specific challenges through intelligent software, AI-powered innovation, digital transformation and growth strategies."
            search={<IndustrySearch placeholder="Find your industry…" />}
            chipsLabel="Popular searches:"
            chips={[
              { label: "Hospitality", href: "/industries/hospitality-and-tourism" },
              { label: "Healthcare", href: "/industries/healthcare-and-wellness" },
              { label: "Restaurants", href: "/industries/food-delivery-and-grocery" },
              { label: "Real Estate", href: "/industries/real-estate-and-property" },
              { label: "Sports & Fitness", href: "/industries/sports-and-fitness" },
            ]}
          />
          {/* 03 Industry expertise */}
          <NxFeaturesSection
            variant="light"
            label="Expertise without boundaries"
            heading="Different challenges. One technology partner."
            intro="Every industry operates differently. We combine industry understanding, intelligent technology and business expertise to develop solutions tailored to the way your business operates, competes and grows."
            items={[
              { icon: "ai", title: "Applied AI & Intelligence", text: "Practical AI applications that address real industry challenges." },
              { icon: "automation", title: "Business Automation", text: "Streamline repetitive processes and improve operational efficiency." },
              { icon: "software", title: "Custom Software Solutions", text: "Purpose-built platforms, applications, CRMs and ERP systems." },
              { icon: "experience", title: "Digital Experiences", text: "High-performing websites and intuitive customer experiences." },
              { icon: "ecosystem", title: "Connected Ecosystems", text: "Integrate existing tools, systems and business data." },
              { icon: "growth", title: "Sales & Business Growth", text: "Build scalable acquisition strategies and revenue operations." },
              { icon: "security", title: "Security & Compliance", text: "Consider relevant security and regulatory requirements." },
              { icon: "scale", title: "Scalable Architecture", text: "Build technology that evolves alongside your business." },
            ]}
          />
          {/* 04 Dual animated marquees (opposite directions) */}
          <NxMarquee
            text="Transforming Industries • Engineering Possibilities • Empowering Businesses"
            bottom="Artificial Intelligence • Digital Transformation • Technology & Growth"
            flush
          />
        </div>
        </DetailReveal>
        {/* 05 Industries showcase gallery */}
        <IndustryShowcase />
        {/* 07 Featured case studies (published, delivered projects only) */}
        <IndustryCaseSlider />
        {/* 08 FAQs (FAQs page design, numbered) */}
        <div className="fq-solo">
          <FaqSections
            nav={false}
            numbered
            heading="Everything you need to know."
            image="/images/hero/lets-work-together.webp"
            topics={[{ id: "industries-faq", title: "Frequently asked questions", items: INDUSTRY_FAQS }]}
          />
        </div>
        {/* 09 CTA & enquiry form (same banner as the homepage) */}
        <div className="hv2-page">
          <HomeV2Cta
            source="Industries page — enquiry"
            eyebrow="Let’s build what’s next"
            heading="Your Industry. Your Challenges. Our Expertise."
            intro="Whether you’re modernizing an established business, building a new digital product or exploring the possibilities of AI, we’re here to help you take the next step."
            formTitle="Let’s Discuss Your Project"
            formText="Tell us about your business and what you want to achieve. We’ll get back to you within one business day."
            submitLabel="Let’s Discuss Your Project"
            extended={{
              industries: INDUSTRY_MENU.flatMap((g) => g.items.map((i) => i.label)),
              services: ["AI-Powered MVP Development", "Digital Transformation", "Fractional Sales & Growth", "Web, CRM & Software Solutions", "Not Sure Yet"],
            }}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
