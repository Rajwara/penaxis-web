import { insights } from "@/lib/data";

/**
 * Blog data for /blog and /blog/[slug] (the content-pages blog design).
 * Posts are the existing Penaxis `insights` in lib/data.ts, so the two stay
 * in sync; the newest post is featured. Body blocks are "p" and "h3"
 * ("h3" renders as the article's section heading).
 */

export type Post = (typeof insights)[number];
export type Block = Post["body"][number];

export const AUTHOR = {
  name: "Penaxis Team",
  bio: "Practical notes from the Penaxis team on AI-powered MVPs, custom software, digital transformation and sales growth.",
  avatar: "/images/logo/penaxis-mark.png",
};

/** Newest first. */
export const POSTS: Post[] = [...insights].sort((a, b) => b.date.localeCompare(a.date));

export const FEATURED = POSTS[0];

/** Categories in order of first appearance (newest post first). */
export const CATEGORIES = Array.from(new Set(POSTS.map((p) => p.category)));

export const formatDate = (iso: string) =>
  new Date(iso + "T00:00:00Z").toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

export const getPost = (slug: string) => POSTS.find((p) => p.slug === slug);
