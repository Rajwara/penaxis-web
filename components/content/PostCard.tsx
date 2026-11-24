import Link from "next/link";
import { AUTHOR } from "@/lib/blog";

export type PostSummary = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
};

export function Avatar({ large, className = "" }: { large?: boolean; className?: string }) {
  return (
    <span className={`avatar${large ? " avatar-lg" : ""} ${className}`} aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={AUTHOR.avatar} alt="" />
    </span>
  );
}

// Blog card in the /home-v2 look: white rounded card, inset image that
// zooms on hover, glass category chip (top-left) and read-time chip
// (bottom-right) on the image, Big Shoulders
// uppercase title and 2-line excerpt. The whole card is one link.
export default function PostCard({ post }: { post: PostSummary; author?: string }) {
  const href = `/blog/${post.slug}`;
  return (
    <article className="pc" data-category={post.category}>
      <div className="pc-media">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={post.image} alt="" loading="lazy" />
        <span className="pc-chip pc-chip--cat">{post.category}</span>
        <span className="pc-chip pc-chip--time">
          <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v5l3 2" />
          </svg>
          {post.readTime}
        </span>
      </div>
      <div className="pc-body">
        <h3 className="pc-title">
          <Link href={href} className="pc-link">
            {post.title}
          </Link>
        </h3>
        <p className="pc-excerpt">{post.excerpt}</p>
      </div>
    </article>
  );
}
