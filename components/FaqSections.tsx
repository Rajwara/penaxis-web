"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { FaqTopic } from "@/lib/faq";
import "@fontsource-variable/big-shoulders/opsz.css";
import "@fontsource-variable/wix-madefor-display/index.css";

// /faqs: one section per FAQ topic, built from the supplied faq-section
// template: "• label •" eyebrow + rolling "Have a question" link, a big
// heading whose letters rise in, an image revealed with a clip + zoom-out,
// and an accordion (one open at a time, rows fade up one after another).
// GSAP timings re-done with CSS transitions + IntersectionObserver.
// TEMP IMAGE: the template's photo (its own CDN) for every topic for now.

const TEMP_IMG = "https://cdn.prod.website-files.com/6ae1b423d7bb90956e94a0c5/6aea8ebe8d133aab9451baed_faq-image.webp";

// Image beside each FAQs-page topic (falls back to TEMP_IMG).
const TOPIC_IMAGES: Record<string, string> = {
  about: "/images/who-we-are/team-photo.webp",
  ai: "/images/who-we-are/why-choose-us.webp",
  "getting-started": "/images/faq/faq-getting-started.webp",
  services: "/images/faq/faq-services.webp",
  process: "/images/faq/faq-process.webp",
  pricing: "/images/faq/faq-pricing.webp",
};

const HEADINGS: Record<string, string> = {
  about: "Penaxis at a glance",
  ai: "AI for your business",
  "getting-started": "Starting a project with Penaxis",
  services: "What we build and how",
  process: "How we work together",
  pricing: "Pricing, payment & ownership",
};

function Arrow() {
  return (
    <span className="fq-btn-icon">
      <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M2 8h11M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.3" />
      </svg>
    </span>
  );
}

function Topic({ topic, index, heading, numbered, image }: { topic: FaqTopic; index: number; heading?: string; numbered?: boolean; image?: string }) {
  const [open, setOpen] = useState(0);
  const title = heading ?? HEADINGS[topic.id] ?? topic.title;
  let li = 0;

  return (
    <section id={topic.id} className={`fq-section${index % 2 ? " is-alt" : ""}`} aria-labelledby={`fq-${topic.id}`}>
      <div className="fq-container">
        <div className="fq-top" data-fq-anim>
          <div className="fq-sub">
            <span className="fq-dot is-start" />
            <span className="fq-sub-mask">
              <span className="fq-sub-track">
                <span>{topic.title}</span>
                <span className="fq-dot is-end" />
              </span>
            </span>
          </div>
          <Link href="/contact-us" className="fq-btn">
            <span className="fq-btn-clip">
              <span className="fq-btn-inner">
                <span>Have a question</span>
                <Arrow />
              </span>
              <span className="fq-btn-inner is-hover" aria-hidden="true">
                <span>Have a question</span>
                <Arrow />
              </span>
            </span>
          </Link>
        </div>

        <h2 id={`fq-${topic.id}`} className="fq-title" data-fq-anim aria-label={title}>
          {title.split(" ").map((w, wi) => (
            <span key={wi}>
              {wi > 0 && " "}
              <span className="fq-word" aria-hidden="true">
                {[...w].map((ch, ci) => (
                  <span key={ci} className="fq-letter" style={{ transitionDelay: `${(li++ * 0.02).toFixed(2)}s` }}>
                    {ch}
                  </span>
                ))}
              </span>
            </span>
          ))}
        </h2>

        <div className="fq-grid" data-fq-anim>
          <div className="fq-image">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={image ?? TOPIC_IMAGES[topic.id] ?? TEMP_IMG} alt="" loading="lazy" />
          </div>

          <div className="fq-list">
            {topic.items.map((f, i) => {
              const isOpen = open === i;
              const id = `fq-${topic.id}-${i}`;
              return (
                <div key={f.q} className={`fq-item${isOpen ? " is-open" : ""}`} style={{ ["--d" as string]: `${(i * 0.1).toFixed(1)}s` } as React.CSSProperties}>
                  <button
                    type="button"
                    className="fq-q"
                    aria-expanded={isOpen}
                    aria-controls={id}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                  >
                    <span className="fq-q-text">
                      {numbered && <span className="fq-num">{String(i + 1).padStart(2, "0")}</span>}
                      <span>{f.q}</span>
                    </span>
                    <span className="fq-icon" aria-hidden="true">
                      <span className="fq-line" />
                      <span className="fq-line-v" />
                    </span>
                  </button>
                  <div className="fq-body" id={id} role="region">
                    <div className="fq-answer">
                      <p>{f.a}</p>
                      {f.link && (
                        <Link href={f.link.href} className="fq-link">
                          {f.link.label} &rarr;
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

type FaqProps = {
  topics: FaqTopic[];
  nav?: boolean; // topic jump links (FAQs page)
  heading?: string; // single-topic use: override the big heading
  numbered?: boolean; // 01, 02… before each question
  image?: string;
};

export default function FaqSections({ topics, nav = true, heading, numbered, image }: FaqProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    root.classList.add("fq-js");
    const els = Array.from(root.querySelectorAll<HTMLElement>("[data-fq-anim]"));
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { rootMargin: "0px 0px -15% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div ref={rootRef} className="fq">
      {nav && (
      <nav className="fq-topics" aria-label="FAQ topics">
        <div className="fq-container">
          {topics.map((t) => (
            <a key={t.id} href={`#${t.id}`}>
              {t.title}
            </a>
          ))}
        </div>
      </nav>
      )}
      {topics.map((t, i) => (
        <Topic key={t.id} topic={t} index={i} heading={heading} numbered={numbered} image={image} />
      ))}
    </div>
  );
}
