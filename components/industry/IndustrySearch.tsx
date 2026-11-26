"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { industries, slugify } from "@/lib/data";
import { INDUSTRY_MENU } from "@/lib/industryMenu";

// "Find your industry…" bar for the /industries banner: matches the typed
// text against the 13 industry pages and the navbar's 24 menu labels and
// opens the best match; anything else jumps to the full list below.
const NORM = (s: string) => s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9 ]/g, " ").replace(/\s+/g, " ").trim();
const TARGETS = [
  ...industries.map((i) => ({ label: i.title, href: `/industries/${slugify(i.title)}` })),
  ...INDUSTRY_MENU.flatMap((g) => g.items).filter((i) => i.href !== "/industries"),
  { label: "Restaurants", href: "/industries/food-delivery-and-grocery" },
];

export default function IndustrySearch({ placeholder }: { placeholder: string }) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const go = (e: React.FormEvent) => {
    e.preventDefault();
    const n = NORM(q);
    if (!n) return router.push("/industries#all-industries");
    const words = n.split(" ").filter((w) => w.length > 2);
    const hit =
      TARGETS.find((t) => NORM(t.label).includes(n)) ??
      TARGETS.find((t) => words.some((w) => NORM(t.label).includes(w)));
    router.push(hit ? hit.href : "/industries#all-industries");
  };
  return (
    <form className="nx-prompt" onSubmit={go} role="search">
      <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={placeholder} aria-label={placeholder} />
      <button type="submit">➚ Search</button>
    </form>
  );
}
