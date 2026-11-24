import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
// The whole page uses the services section's type system: Big Shoulders
// (headings) + Wix Madefor Display (body). See .hv2-page in globals.css.
import "@fontsource-variable/big-shoulders/opsz.css";
import "@fontsource-variable/wix-madefor-display/index.css";
import VideoBanner from "@/components/VideoBanner";
import HomeV2Logos from "@/components/HomeV2Logos";
import HomeV2WhyChooseUs from "@/components/HomeV2WhyChooseUs";
import HomeV2Services from "@/components/HomeV2Services";
import HomeV2HowWeWork from "@/components/HomeV2HowWeWork";
import HomeV2CaseStudies from "@/components/HomeV2CaseStudies";
import HomeV2Cta from "@/components/HomeV2Cta";
import Footer from "@/components/Footer";

// /home-v2: new homepage built from scratch between the Navbar and Footer.
// Add new sections inside <main> below. Once approved it replaces
// app/page.tsx.

// Work in progress, kept out of search.
export const metadata: Metadata = {
  title: "Penaxis | Home v2 (preview)",
  robots: {
    index: false,
    follow: false,
  },
};

export default function HomeV2() {
  return (
    <>
      <Navbar />
      <main className="hv2-page">
        <VideoBanner />
        <HomeV2Logos />
        <HomeV2WhyChooseUs />
        <HomeV2Services />
        <HomeV2HowWeWork />
        <HomeV2CaseStudies />
        <HomeV2Cta />
        {/* New homepage sections go here */}
      </main>
      <Footer />
    </>
  );
}
