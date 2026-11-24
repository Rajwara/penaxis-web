import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import ContactV2 from "@/components/ContactV2";
import Footer from "@/components/Footer";

// /contact-v2: new contact page design, built from a client-supplied HTML
// template. Uses the site's own Navbar and Footer; everything between is
// the template's banner, contact section and map, filled with Penaxis
// details. Work in progress, kept out of search.
export const metadata: Metadata = {
  title: "Contact - Penaxis",
  description: "Get in touch with Penaxis to start a project.",
  robots: { index: false, follow: false },
};

export default function ContactV2Page() {
  return (
    <>
      <Navbar />
      <main>
        <ContactV2 />
      </main>
      <Footer />
    </>
  );
}
