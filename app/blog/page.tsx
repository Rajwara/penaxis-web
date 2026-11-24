import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContentShell from "@/components/content/ContentShell";
import BtnContent from "@/components/content/BtnContent";
import BlogList from "@/components/content/BlogList";
import { Avatar, type PostSummary } from "@/components/content/PostCard";
import { AUTHOR, FEATURED, POSTS, formatDate, type Post } from "@/lib/blog";
import "./blog.css";

// /blog: the content-pages blog design (featured post, category filters,
// paginated grid) with the Penaxis insights from lib/data.ts. Work in
// progress, kept out of search; the live blog is still /insights.
export const metadata: Metadata = {
  title: "Blog - Penaxis",
  description: "Ideas, lessons, and practical advice from the Penaxis team on building software and AI products.",
  robots: { index: false, follow: false },
};

const summary = (p: Post): PostSummary => ({
  slug: p.slug,
  title: p.title,
  excerpt: p.excerpt,
  category: p.category,
  date: formatDate(p.date),
  readTime: p.readTime,
  image: p.image,
});

export default function BlogPage() {
  const rest = POSTS.filter((p) => p !== FEATURED).map(summary);
  const used = Array.from(new Set(rest.map((p) => p.category)));
  const f = summary(FEATURED);

  return (
    <>
      <Navbar />
      <main>
        <ContentShell>
          <div className="bl">
            <section className="page-hero">
              <span className="eyebrow eyebrow-dot">From the blog</span>
              <h1>Penaxis Insights</h1>
              <p>Notes from the projects we build, the teams we work with, and what we&apos;re learning about shipping software and AI products well.</p>
            </section>

            <section className="section">
              <div className="container">
                <article className="featured">
                  <div className="featured-media">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={f.image} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                    <span className="featured-badge">Featured article</span>
                  </div>
                  <div className="featured-body">
                    <span className="eyebrow">{f.category}</span>
                    <h2>{f.title}</h2>
                    <p>{f.excerpt}</p>
                    <div className="featured-foot">
                      <div className="author">
                        <Avatar large />
                        <div>
                          <div className="author-name">{AUTHOR.name}</div>
                          <div className="author-date">{f.date}</div>
                        </div>
                      </div>
                      <Link className="btn am-btn" href={`/blog/${f.slug}`}>
                        <BtnContent label="Read Blog" />
                      </Link>
                    </div>
                  </div>
                </article>
              </div>
            </section>

            <section className="section section-tight-top">
              <div className="container">
                <BlogList posts={rest} categories={used} author={AUTHOR.name} />
              </div>
            </section>
          </div>
        </ContentShell>
      </main>
      <Footer />
    </>
  );
}
