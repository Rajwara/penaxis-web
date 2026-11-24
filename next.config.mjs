import { allowIndexing } from "./lib/indexing.mjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  // Keep every response (pages, images, videos, files) out of search
  // engines until ALLOW_INDEXING=true is set. See lib/indexing.mjs.
  async headers() {
    if (allowIndexing) return [];
    return [
      {
        source: "/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/contact",
        destination: "/contact-us",
        permanent: true,
      },
      // The legal/blog template pages are now the main ones.
      { source: "/privacy-policy", destination: "/policies/privacy", permanent: true },
      { source: "/terms-conditions", destination: "/policies/terms", permanent: true },
      { source: "/insights", destination: "/blog", permanent: true },
      { source: "/insights/:slug", destination: "/blog/:slug", permanent: true },
      // The /contact-v2 design is now the main contact page.
      {
        source: "/contact-v2",
        destination: "/contact-us",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
