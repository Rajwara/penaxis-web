import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import NxHero from "@/components/industry/NxHero";
import IndustrySearch from "@/components/industry/IndustrySearch";
import DetailReveal from "@/components/detail/DetailReveal";
import { NxFeaturesSection } from "@/components/industry/NxFeatures";
import NxMarquee from "@/components/industry/NxMarquee";
import IndustryShowcase from "@/components/industry/IndustryShowcase";
import IndustriesHub from "@/components/IndustriesHub";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Industries - Penaxis",
  description: "13 industries, one team - see how Penaxis builds for each one.",
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
        <IndustriesHub />
      </main>
      <Footer />
    </>
  );
}
