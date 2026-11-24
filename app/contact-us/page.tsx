import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import ContactV2 from "@/components/ContactV2";
import Footer from "@/components/Footer";

// Main contact page. Uses the design first built at /contact-v2 (which now
// redirects here): red page-title banner, get-in-touch section with the
// contact form, and the office locator map.
export const metadata: Metadata = {
  title: "Contact - Penaxis",
  description: "Get in touch with Penaxis to start a project.",
  alternates: {
    canonical: "/contact-us",
  },
};

export default function ContactPage() {
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
