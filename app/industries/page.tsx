import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import PageHeroBanner from "@/components/PageHeroBanner";
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
        <PageHeroBanner
          lines={[{ text: "Technology" }, { text: "for every", indent: true }, { text: "industry" }]}
          text="From healthcare and logistics to retail and real estate, we build technology that fits how your industry works."
          cta={{ label: "Discuss your project", href: "/contact-us" }}
        />
        <IndustriesHub />
      </main>
      <Footer />
    </>
  );
}
