"use client";

import AboutHeroBanner from "./AboutHeroBanner";
import ServiceWhyUs from "./ServiceWhyUs";
import ServiceOurProcess from "./ServiceOurProcess";
import ServiceBenefits from "./ServiceBenefits";
import ServiceProof from "./ServiceProof";
import ServiceTicker from "./ServiceTicker";
import { services } from "@/lib/data";

// Single service page: About-page banner, ticker, Why us, Our process,
// Key benefits and Proof (relevant case studies).

export default function ServiceDetail({ slug }: { slug: string }) {
  const index = services.findIndex((s) => s.slug === slug);
  const service = services[index];
  if (!service) return null;

  // Split the title over the banner's two lines ("Fractional Sales &" / "Growth").
  const amp = service.title.lastIndexOf(" & ");
  const sp = service.title.lastIndexOf(" ");
  const titleLines: [string, string] =
    amp > 0 ? [service.title.slice(0, amp + 2), service.title.slice(amp + 3)] : [service.title.slice(0, sp), service.title.slice(sp + 1)];

  return (
    <>
      {/* Same banner as the About page (AboutHeroBanner), as-is */}
      <AboutHeroBanner label="Our services" line1={titleLines[0]} line2={titleLines[1]} text={service.short} />

      <ServiceTicker />

      {/* Why us */}
      <ServiceWhyUs serviceTitle={service.title} />

      {/* Our process */}
      <ServiceOurProcess />

      {/* Our initiative: key benefits and outcomes */}
      <ServiceBenefits slug={service.slug} serviceTitle={service.title} />

      {/* Proof: relevant case studies */}
      <ServiceProof slug={service.slug} />
    </>
  );
}
