import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import AboutHeroBanner from "@/components/AboutHeroBanner";
import AboutV2TeamPhoto from "@/components/AboutV2TeamPhoto";
import AboutV2Bento from "@/components/AboutV2Bento";
import AboutV2Banner from "@/components/AboutV2Banner";
import AboutV2Values from "@/components/AboutV2Values";
import AboutV2Timeline from "@/components/AboutV2Timeline";
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
        <AboutV2TeamPhoto />
        <AboutV2Banner />
        <AboutV2Bento />
        <AboutV2Values />
        <AboutV2Timeline />
      </main>
      <Footer />
    </>
  );
}
