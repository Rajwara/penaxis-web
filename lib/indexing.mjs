// Single switch for search-engine indexing.
//
// The site is kept OUT of Google (noindex, nofollow) unless the
// ALLOW_INDEXING environment variable is set to exactly "true".
// To go live for SEO: Vercel → Project → Settings → Environment Variables →
// add ALLOW_INDEXING = true (Production), then redeploy.
export const allowIndexing = process.env.ALLOW_INDEXING === "true";
