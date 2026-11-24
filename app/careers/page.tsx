import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
// Same type system as /home-v2 (Big Shoulders + Wix Madefor Display).
import "@fontsource-variable/big-shoulders/opsz.css";
import "@fontsource-variable/wix-madefor-display/index.css";
import CareersHero from "@/components/CareersHero";
import CareersHub from "@/components/CareersHub";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Careers - Penaxis",
  description: "Open roles at Penaxis - join the team building AI-powered products, software, and growth systems for real clients.",
  alternates: {
    canonical: "/careers",
  },
};

export default function CareersPage() {
  return (
    <>
      <Navbar />
      <main className="car-page">
        <CareersHero />
        <CareersHub />
      </main>
      <Footer />
    </>
  );
}
