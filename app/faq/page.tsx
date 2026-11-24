import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContentShell from "@/components/content/ContentShell";
import FaqList from "@/components/content/FaqList";
import { FAQ } from "@/lib/faq";
import "./faq.css";
import "@/components/content/home-v2-theme.css";

// /faq: the content-pages FAQ design (photo banner, topic tabs, numbered
// rows that blur on hover with a tilted photo, click to open) with the Penaxis FAQs from lib/faq.ts. The site's main FAQ page;
// the old /faqs address redirects here.
export const metadata: Metadata = {
  title: "FAQs - Penaxis",
  description: "Answers to common questions about working with Penaxis: getting started, our services, how we work, pricing and ownership.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  const total = FAQ.reduce((n, g) => n + g.items.length, 0);

  return (
    <>
      <Navbar />
      <main>
        <ContentShell className="shop-fw">
          <div className="cat-hero">
            <div className="cat-hero-copy">
              <div className="crumb">
                <Link href="/">Home</Link> / FAQ
              </div>
              <span className="eyebrow">Help centre</span>
              <h1>Questions &amp; Answers</h1>
              <p>Everything about getting started, our services, how we work and pricing, answered by the Penaxis team.</p>
            </div>
            <div className="cat-hero-pic">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/who-we-are/team-photo.webp" alt="" />
            </div>
          </div>

          <div className="faq-wrap">
            <div className="faq-head">
              <div>
                <span className="faq-label">Frequently asked</span>
                <h2>How can we help?</h2>
              </div>
              <p>
                {total} answers across {FAQ.length} topics. Browse them all, or pick a topic; click a question to open it.
              </p>
            </div>
            <FaqList groups={FAQ} />
          </div>
        </ContentShell>
      </main>
      <Footer />
    </>
  );
}
