import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DetailLayout, { DetailArticle, DetailH2, DetailImage, DetailMeta, DetailNav, DetailP } from "@/components/detail/DetailLayout";
import { AUTHOR, POSTS, formatDate, getPost } from "@/lib/blog";

// /blog/[slug]: single post in the supplied portfolio-single design (shared
// DetailLayout). Old /insights/[slug] addresses redirect here.

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

export default function BlogPostPage({ params }: Props) {
  const post = getPost(params.slug);
  if (!post) notFound();

  // POSTS is newest first: "previous" = older, "next" = newer (wrapping).
  const i = POSTS.findIndex((p) => p.slug === post.slug);
  const n = POSTS.length;
  const prev = POSTS[(i + 1) % n];
  const next = POSTS[(i - 1 + n) % n];

  return (
    <>
      <Navbar />
      <main>
        <DetailLayout eyebrow={post.category} title={post.title}>
          <DetailMeta
            items={[
              { label: "Written by", value: AUTHOR.name },
              { label: "Category", value: post.category },
              { label: "Published", value: formatDate(post.date) },
              { label: "Reading time", value: post.readTime },
            ]}
          />
          <DetailImage src={post.image} alt="" />

          <DetailArticle>
            {post.body.map((b, k) =>
              b.type === "h3" ? <DetailH2 key={k}>{b.text}</DetailH2> : <DetailP key={k}>{b.text}</DetailP>
            )}
          </DetailArticle>

          <DetailNav
            prev={{ href: `/blog/${prev.slug}`, title: prev.title, image: prev.image }}
            next={{ href: `/blog/${next.slug}`, title: next.title, image: next.image }}
          />
        </DetailLayout>
      </main>
      <Footer />
    </>
  );
}
