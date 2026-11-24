import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import VideoBanner from "@/components/VideoBanner";
import HomeV2Logos from "@/components/HomeV2Logos";
import HomeV2WhyChooseUs from "@/components/HomeV2WhyChooseUs";
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
      <main>
        <VideoBanner />
        <HomeV2Logos />
        <HomeV2WhyChooseUs />
        {/* New homepage sections go here */}
      </main>
      <Footer />
    </>
  );
}
