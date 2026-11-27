import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EngagementForm from "@/components/engagement/EngagementForm";
import { ENGAGEMENTS, isEngagementModel } from "@/lib/engagementForms";

// Standalone pages for the three engagement enquiry flows
// (/get-started/project, /hourly, /dedicated-team). Same form as the modal
// on /services; direct links and new tabs land here.

const META: Record<string, { title: string; description: string }> = {
  project: { title: "Start a Project", description: "Tell us about your project: what you need, your budget and timeline. Penaxis will help you define the right approach." },
  hourly: { title: "Hire Specialists On Demand", description: "Access experienced Penaxis specialists by the hour, without the commitment of a full-time hire." },
  "dedicated-team": { title: "Build Your Dedicated Team", description: "Build a dedicated Penaxis team around your business objectives, backed by our expertise and infrastructure." },
};

export function generateStaticParams() {
  return Object.keys(ENGAGEMENTS).map((model) => ({ model }));
}

export function generateMetadata({ params }: { params: { model: string } }): Metadata {
  const m = META[params.model];
  if (!m) return { title: "Get started - Penaxis" };
  return { title: `${m.title} - Penaxis`, description: m.description, alternates: { canonical: `/get-started/${params.model}` } };
}

export default function GetStartedPage({ params }: { params: { model: string } }) {
  if (!isEngagementModel(params.model)) notFound();
  return (
    <>
      <Navbar />
      <main className="ef-page">
        <div className="ef-page-card">
          <EngagementForm model={params.model} variant="page" />
        </div>
      </main>
      <Footer />
    </>
  );
}
