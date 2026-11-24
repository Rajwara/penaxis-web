import type { Metadata } from "next";

// /home-v2: blank page for building the new homepage from scratch.
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
  return <main className="min-h-screen" />;
}
