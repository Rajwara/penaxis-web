import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContentShell from "@/components/content/ContentShell";
import BtnContent from "@/components/content/BtnContent";
import PostCard, { Avatar } from "@/components/content/PostCard";
import { AUTHOR, POSTS, formatDate, getPost, type Block } from "@/lib/blog";
import "../blog.css";
import "@/components/content/home-v2-theme.css";

// /blog/[slug]: single post in the content-pages design (hero, image,
// article, author card, related posts). The site's main blog post page;
// old /insights/[slug] addresses redirect here.

type Props = { params: { slug: string } };

export const dynamicParams = false;

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const p = getPost(params.slug);
  if (!p) return {};
  return { title: `${p.title} - Penaxis`, description: p.excerpt, alternates: { canonical: `/blog/${p.slug}` } };
}

function Content({ block }: { block: Block }) {
  // "h3" blocks are the post's section headings: render them in the
  // design's article heading style (h2 under the page's h1).
  return block.type === "h3" ? <h2>{block.text}</h2> : <p>{block.text}</p>;
}

export default function BlogPostPage({ params }: Props) {
  const post = getPost(params.slug);
  if (!post) notFound();

  const others = POSTS.filter((p) => p.slug !== post.slug).sort(
    (a, b) => Number(b.category === post.category) - Number(a.category === post.category) || b.date.localeCompare(a.date),
  );
  const related = others.slice(0, 3).map((p) => ({
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    category: p.category,
    date: formatDate(p.date),
    readTime: p.readTime,
    image: p.image,
  }));

  return (
    <>
      <Navbar />
      <main>
        <ContentShell className="fwb--post">
          <div className="bl">
            <section className="page-hero page-hero-post">
              <span className="eyebrow eyebrow-dot">{post.category}</span>
              <h1>{post.title}</h1>
            </section>

            <section className="section">
              <div className="container">
                <div className="post-hero-image">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={post.image} alt="" />
                </div>
                <article className="article">
                  {post.body.map((b, i) => (
                    <Content key={i} block={b} />
                  ))}

                  <aside className="author-card" aria-label="About the author">
                    <Avatar className="author-card-avatar" />
                    <div className="author-card-info">
                      <span className="eyebrow">Written by</span>
                      <h2>{AUTHOR.name}</h2>
                      <p>{AUTHOR.bio}</p>
                    </div>
                    <dl className="author-card-stats">
                      <div>
                        <dd>{formatDate(post.date)}</dd>
                        <dt>Published</dt>
                      </div>
                      <div>
                        <dd>{post.readTime}</dd>
                        <dt>Read</dt>
                      </div>
                    </dl>
                  </aside>

                  <Link className="btn am-btn article-back" href="/blog">
                    <BtnContent label="All articles" />
                  </Link>
                </article>
              </div>
            </section>

            <section className="section related">
              <div className="container">
                <div className="related-head">
                  <div>
                    <span className="eyebrow">Keep reading</span>
                    <h2>More From the Blog</h2>
                  </div>
                  <Link className="btn am-btn" href="/blog">
                    <BtnContent label="View All Articles" />
                  </Link>
                </div>
                <div className="post-grid">
                  {related.map((p) => (
                    <PostCard key={p.slug} post={p} author={AUTHOR.name} />
                  ))}
                </div>
              </div>
            </section>
          </div>
        </ContentShell>
      </main>
      <Footer />
    </>
  );
}
