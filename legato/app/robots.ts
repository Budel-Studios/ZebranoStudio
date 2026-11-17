import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/brand";

/** The studio app and the API are not for search engines. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/studio", "/api/"] },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
