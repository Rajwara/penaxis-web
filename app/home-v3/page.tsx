import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
// Inter Tight Light (300) for the 14px body text; 400-800 load site-wide.
import "@fontsource/inter-tight/300.css";
import VideoBanner from "@/components/VideoBanner";
import HomeV2Logos from "@/components/HomeV2Logos";
import HomeV2WhyChooseUs from "@/components/HomeV2WhyChooseUs";
import HomeV2Services from "@/components/HomeV2Services";
import HomeV2CaseStudies from "@/components/HomeV2CaseStudies";
import HomeV2Cta from "@/components/HomeV2Cta";
import Footer from "@/components/Footer";

// /home-v3: same sections as /home-v2, restyled with an Awwwards-style
// type system (Inter Tight everywhere, 14px/300/28px body, 14px/400
// labels, 600-weight fluid headings, #222 on #F8F8F8). All styling lives
// under .hv3-page in globals.css, so /home-v2 is unaffected.

// Work in progress, kept out of search.
export const metadata: Metadata = {
  title: "Penaxis | Home v3 (preview)",
  robots: {
    index: false,
    follow: false,
  },
};

export default function HomeV3() {
  return (
    <>
      <Navbar />
      <main className="hv3-page">
        <VideoBanner />
        <HomeV2Logos />
        <HomeV2WhyChooseUs />
        <HomeV2Services />
        <HomeV2CaseStudies />
        <HomeV2Cta />
      </main>
      <Footer />
    </>
  );
}
