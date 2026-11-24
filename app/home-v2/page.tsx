import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import VideoBanner from "@/components/VideoBanner";
import Footer from "@/components/Footer";

// /home-v2: the new homepage being built section by section.
// Starts from the live homepage's Navbar, VideoBanner and Footer; new
// sections get added inside <main> below the banner. Once approved it
// replaces app/page.tsx.

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
      </main>
      <Footer />
    </>
  );
}
