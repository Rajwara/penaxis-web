import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import NxHero from "@/components/industry/NxHero";
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
            title={<>Digital solutions for<br />every industry</>}
            text="From healthcare and logistics to retail and real estate, we build the software each industry actually runs on. Tell us what you want to build and we'll turn it into a working product."
            chipsLabel="Popular industries:"
            chips={[
              { label: "Software & SaaS", href: "/industries/software-it-and-saas" },
              { label: "Healthcare", href: "/industries/healthcare-and-wellness" },
              { label: "Logistics", href: "/industries/logistics-and-transportation" },
            ]}
          />
        </div>
        <IndustriesHub />
      </main>
      <Footer />
    </>
  );
}
