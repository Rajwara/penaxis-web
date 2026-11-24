"use client";

import { useMemo, useRef, useState } from "react";
import BtnContent from "./BtnContent";
import PostCard, { type PostSummary } from "./PostCard";

const POSTS_PER_PAGE = 6;

/** "Browse by topic" header with search, category filter and pagination for the blog grid. */
export default function BlogList({ posts, categories, author }: { posts: PostSummary[]; categories: string[]; author: string }) {
  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(0);
  const filtersRef = useRef<HTMLDivElement>(null);

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter(
      (p) =>
        (category === "all" || p.category === category) &&
        (!q || `${p.title} ${p.excerpt} ${p.category}`.toLowerCase().includes(q))
    );
  }, [posts, category, query]);
  const pages = Math.max(1, Math.ceil(matches.length / POSTS_PER_PAGE));
  const current = Math.min(page, pages - 1);
  const visible = matches.slice(current * POSTS_PER_PAGE, (current + 1) * POSTS_PER_PAGE);

  const changePage = (delta: number) => {
    setPage(current + delta);
    filtersRef.current?.scrollIntoView({ block: "start" });
  };

  return (
    <>
      <div className="blog-browse" ref={filtersRef}>
        <span className="blog-browse-label">Archive</span>
        <h2 className="blog-browse-title">Browse by topic</h2>
        <label className="blog-search">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <span className="sr-only">Search articles</span>
          <input
            type="search"
            placeholder="Search articles"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(0);
            }}
          />
        </label>
      </div>
      <div className="filters" role="group" aria-label="Filter posts by category">
        {["all", ...categories].map((c) => (
          <button
            key={c}
            className="filter"
            type="button"
            aria-pressed={category === c}
            onClick={() => {
              setCategory(c);
              setPage(0);
            }}
          >
            {c === "all" ? "All" : c}
          </button>
        ))}
      </div>
      <div className="post-grid">
        {visible.map((p) => (
          <PostCard key={p.slug} post={p} author={author} />
        ))}
      </div>
      <p className="empty-state" hidden={matches.length > 0}>
        {query ? "No articles match your search." : "No posts in this category yet."}
      </p>
      <div className="pager" hidden={pages < 2}>
        <button className="btn am-btn am-line am-back" type="button" hidden={current === 0} onClick={() => changePage(-1)}>
          <BtnContent label="Previous" icon="back" />
        </button>
        <button className="btn am-btn" type="button" hidden={current >= pages - 1} onClick={() => changePage(1)}>
          <BtnContent label="Next Blog" />
        </button>
      </div>
    </>
  );
}
