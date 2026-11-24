import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import IndustriesHeroBanner from "@/components/IndustriesHeroBanner";
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
        {/* New hero banner first; the previous banner (inside IndustriesHub) is now the second section */}
        <IndustriesHeroBanner />
        <IndustriesHub />
      </main>
      <Footer />
    </>
  );
}
