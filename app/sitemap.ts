import type { MetadataRoute } from "next";
import { collecties } from "@/data/collecties";
import { doorPages } from "@/data/producten";
import { SITE_URL } from "@/lib/site";

/**
 * Sitemap: only published, canonical, indexable URLs that return 200.
 * `lastModified` is the date of the last real content change — update it when
 * you change a page's content, not on every deploy. Flow pages (/bedankt) and
 * switched-off modules are left out on purpose.
 */
const CONTENT_UPDATED = "2026-10-31";

const paths = [
  "/",
  ...doorPages.map((p) => `/${p.slug}`),
  "/materialen",
  "/collecties",
  ...collecties.map((c) => `/collecties/${c.slug}`),
  "/architecten",
  "/ons-verhaal",
  "/de-makers",
  "/bewust-vakmanschap",
  "/mtb-bouw",
  "/service",
  "/veelgestelde-vragen",
  "/contact",
  "/privacy",
  "/algemene-voorwaarden",
  "/cookiebeleid",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map((path) => ({
    url: path === "/" ? SITE_URL : `${SITE_URL}${path}`,
    lastModified: new Date(CONTENT_UPDATED),
  }));
}
