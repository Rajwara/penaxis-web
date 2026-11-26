import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import NxHero from "@/components/industry/NxHero";
import IndustrySearch from "@/components/industry/IndustrySearch";
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
        </div>
        <IndustriesHub />
      </main>
      <Footer />
    </>
  );
}
