import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/brand";

/**
 * Indexable marketing pages only. Not listed: /studio (the app), /bedankt and
 * the legal drafts (/privacy, /voorwaarden are noindex until reviewed).
 */
const ROUTES: Array<{ path: string; priority: number }> = [
  { path: "/", priority: 1 },
  { path: "/het-boek", priority: 0.9 },
  { path: "/hoofdstukken", priority: 0.8 },
  { path: "/reisboeken", priority: 0.8 },
  { path: "/accessoires", priority: 0.7 },
  { path: "/voor-fotografen", priority: 0.9 },
  { path: "/werkwijze", priority: 0.7 },
  { path: "/over", priority: 0.5 },
  { path: "/veelgestelde-vragen", priority: 0.6 },
  { path: "/contact", priority: 0.7 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((r) => ({
    url: r.path === "/" ? SITE_URL : `${SITE_URL}${r.path}`,
    changeFrequency: "monthly",
    priority: r.priority,
  }));
}
