import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import AboutHeroBanner from "@/components/AboutHeroBanner";
import AboutTestimonials from "@/components/AboutTestimonials";
import AboutMission from "@/components/AboutMission";
import AboutShowcase from "@/components/AboutShowcase";
import AboutWhyChoose from "@/components/AboutWhyChoose";
import AboutTeamSlider from "@/components/AboutTeamSlider";
import HomeV2Cta from "@/components/HomeV2Cta";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Who We Are - Penaxis",
  description: "Meet the team behind Penaxis - the strategists, engineers, and growth specialists building for our clients.",
  alternates: {
    canonical: "/who-we-are",
  },
};

export default function AboutV2Page() {
  return (
    <>
      <Navbar />
      <main>
        {/* New banner first; the previous first section (team photo) is now second */}
        <AboutHeroBanner />
        <AboutMission />
        <AboutShowcase />
        <AboutWhyChoose />
        <AboutTeamSlider />
        <AboutTestimonials />
        {/* Same banner as /home-v2; .hv2-page gives it the purple/home-v2 styling */}
        <div className="hv2-page">
          <HomeV2Cta source="Who we are — Request a quote banner" />
        </div>
      </main>
      <Footer />
    </>
  );
}
