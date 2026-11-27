import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import AboutHeroBanner from "@/components/AboutHeroBanner";
import HomeV2Services from "@/components/HomeV2Services";
import EngagementModels from "@/components/EngagementModels";
import IndustrySlider from "@/components/industry/IndustrySlider";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Services - Penaxis",
  description: "AI-powered MVPs, digital transformation, fractional sales and growth, and web/CRM software - everything Penaxis builds, in one place.",
  alternates: {
    canonical: "/services",
  },
};

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Same banner as /who-we-are, with services copy */}
        <AboutHeroBanner
          label="Our services"
          line1="Build, launch"
          line2="& grow"
          text="AI-powered MVPs, digital transformation, fractional sales and growth, and web, CRM and software solutions, delivered by one team."
        />
        {/* Same services section as /home-v2 (the .hv2-page wrapper gives it
            the /home-v2 purple accent, type and spacing) */}
        <div className="hv2-page svc-page-list">
          <HomeV2Services />
        </div>
        {/* Industries slider (same design as the case-study slider on /industries) */}
        <IndustrySlider />
        <EngagementModels />
      </main>
      <Footer />
    </>
  );
}
