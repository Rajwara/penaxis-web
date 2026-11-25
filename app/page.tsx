import Navbar from "@/components/Navbar";
// The whole page uses the services section's type system: Big Shoulders
// (headings) + Wix Madefor Display (body). See .hv2-page in globals.css.
import "@fontsource-variable/big-shoulders/opsz.css";
import "@fontsource-variable/wix-madefor-display/index.css";
import VideoBanner from "@/components/VideoBanner";
import HomeV2Logos from "@/components/HomeV2Logos";
import HomeV2WhyChooseUs from "@/components/HomeV2WhyChooseUs";
import HomeV2Services from "@/components/HomeV2Services";
import HomeV2HowWeWork from "@/components/HomeV2HowWeWork";
import HomeV2CaseStudies from "@/components/HomeV2CaseStudies";
import HomeV2Cta from "@/components/HomeV2Cta";
import Footer from "@/components/Footer";

// Homepage (formerly the /home-v2 preview; /home-v2 now redirects here).
export default function Home() {
  return (
    <>
      <Navbar />
      <main className="hv2-page">
        <VideoBanner />
        <HomeV2Logos />
        <HomeV2WhyChooseUs />
        <HomeV2Services />
        <HomeV2HowWeWork />
        <HomeV2CaseStudies />
        <HomeV2Cta source="Homepage — Request a quote banner" />
      </main>
      <Footer />
    </>
  );
}
