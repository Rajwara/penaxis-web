import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import NxHero from "@/components/industry/NxHero";
import IndustrySearch from "@/components/industry/IndustrySearch";
import DetailReveal from "@/components/detail/DetailReveal";
import { NxFeaturesSection } from "@/components/industry/NxFeatures";
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
              { label: "Hospitality", href: "/industries#all-industries" },
              { label: "Healthcare", href: "/industries/healthcare-and-wellness" },
              { label: "Restaurants", href: "/industries/food-delivery-and-grocery" },
              { label: "Real Estate", href: "/industries/real-estate-and-property" },
              { label: "Sports & Fitness", href: "/industries/sports-and-fitness" },
            ]}
          />
          {/* Same features section as the single industry pages */}
          <NxFeaturesSection
            label="what we can build"
            heading="Practical solutions & the results they deliver"
            items={[
              { title: "Custom platforms", text: "Web platforms and SaaS products built around how your business actually works.", href: "/services/web-crm-software" },
              { title: "Customer & mobile apps", text: "Booking, ordering and self-service apps your customers enjoy using." },
              { title: "CRMs & portals", text: "CRMs, client portals and internal tools that replace spreadsheets and workarounds.", href: "/services/web-crm-software" },
              { title: "AI assistants", text: "Assistants and smart search that answer questions and cut manual work.", href: "/services/ai-mvp" },
              { title: "Workflow automation", text: "Repetitive tasks automated so your team can focus on higher-value work.", href: "/services/digital-transformation" },
              { title: "Integrations", text: "Payments, maps, messaging and the tools you already use, connected cleanly." },
              { title: "Dashboards & insights", text: "Clear dashboards that turn operational data into decisions." },
              { title: "Sales & growth", text: "Pipelines, outreach and digital presence that turn products into revenue.", href: "/services/sales-growth" },
            ]}
          />
        </div>
        </DetailReveal>
        <IndustriesHub />
      </main>
      <Footer />
    </>
  );
}
