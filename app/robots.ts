import type { MetadataRoute } from "next";
import { allowIndexing } from "@/lib/indexing.mjs";

// While the site is noindexed, crawling is still allowed on purpose: Google
// has to fetch a page to see its "noindex" tag/header. Blocking it here
// would hide that tag, and Google could still list bare URLs it finds via
// links. The sitemap is only advertised once indexing is switched on.
export default function robots(): MetadataRoute.Robots {
  if (!allowIndexing) {
    return { rules: { userAgent: "*", allow: "/" } };
  }
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://www.penaxis.com/sitemap.xml",
  };
}
