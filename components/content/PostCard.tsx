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

export default function PostCard({ post, author }: { post: PostSummary; author: string }) {
  const href = `/blog/${post.slug}`;
  return (
    <article className="post-card" data-category={post.category}>
      <Link className="post-media" href={href} tabIndex={-1} aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={post.image} alt="" loading="lazy" />
        <span className="post-tag">{post.category}</span>
      </Link>
      <div className="post-body">
        <h3>
          <Link href={href}>{post.title}</Link>
        </h3>
        <p>{post.excerpt}</p>
        <div className="post-foot-rule" />
        <div className="post-foot">
          <div className="author">
            <Avatar />
            <span className="author-name">{author}</span>
          </div>
          <span className="post-meta">
            {post.date} &bull; {post.readTime}
          </span>
        </div>
      </div>
    </article>
  );
}
