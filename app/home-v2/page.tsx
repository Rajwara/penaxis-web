import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import VideoBanner from "@/components/VideoBanner";
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
        {/* New homepage sections go here */}
      </main>
      <Footer />
    </>
  );
}
