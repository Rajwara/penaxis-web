import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContentShell from "@/components/content/ContentShell";
import BtnContent from "@/components/content/BtnContent";
import FaqList from "@/components/content/FaqList";
import { contact } from "@/lib/data";
import { FAQ } from "@/lib/faq";
import "./faq.css";
import "@/components/content/home-v2-theme.css";

// /faq: the content-pages FAQ design (photo banner, topic tabs, numbered
// rows that blur on hover with a tilted photo, click to open, contact
// panel) with the Penaxis FAQs from lib/faq.ts. Work in progress, kept out
// of search; the live FAQ page is still /faqs.
export const metadata: Metadata = {
  title: "FAQs - Penaxis",
  description: "Answers to common questions about working with Penaxis: getting started, our services, how we work, pricing and ownership.",
  robots: { index: false, follow: false },
};

const PHONE_HREF = `tel:${contact.phone.replace(/[^+\d]/g, "")}`;

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

          <div className="faq-cta">
            <div>
              <h2>Still have a question?</h2>
              <p>Send us a message and the team will get back to you, or email or call us directly.</p>
            </div>
            <div className="faq-cta-btns">
              <Link className="am-btn am-light" href="/contact-us">
                <BtnContent label="Contact us" />
              </Link>
              <a className="am-btn am-line am-dark" href={`mailto:${contact.email}`}>
                <BtnContent label="Email us" icon="mail" />
              </a>
              <a className="am-btn am-line am-dark" href={PHONE_HREF}>
                <BtnContent label="Call us" icon="phone" />
              </a>
            </div>
          </div>
        </ContentShell>
      </main>
      <Footer />
    </>
  );
}
