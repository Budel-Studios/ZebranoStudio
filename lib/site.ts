/**
 * Canonical site URL — one source for metadata, sitemap, robots and JSON-LD.
 * Hosted on Vercel; set `NEXT_PUBLIC_SITE_URL` in Vercel → Settings →
 * Environment Variables once the primary domain is chosen (.com or .nl).
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.zebranostudio.com"
).replace(/\/$/, "");

export const SITE_NAME = "Zebrano Studio";

/**
 * Module switches — which optional parts of the site are public (same
 * pattern as De Kozijnstudio). A module that is off is left out of the menu
 * and the sitemap, and its routes do not exist, so nothing half-finished is
 * published. Switch one on only when its content is real.
 */
export const MODULES = {
  /** Door configurator. Off until there is a real configurator. */
  configurator: false,
  /** "Alle projecten" — only real projects with permission (data/projecten.ts). */
  projecten: false,
  /** "Het Studiojournaal" — articles (later as MDX, like the Kozijnstudio kennisbank). */
  journal: false,
  /** "Catalogi & downloads" — needs real PDF catalogues. */
  downloads: false,
  /** "Materialenbibliotheek" (/materialenbibliotheek) — rebuilt from the old site with a starter set (data/materialenbibliotheek.ts). */
  materialenbibliotheek: true,
} as const;

export type ModuleKey = keyof typeof MODULES;

export function isModuleOn(key?: ModuleKey): boolean {
  return key ? MODULES[key] : true;
}

/** Internal design pages are never public in production. */
export const SHOW_INTERNAL_PAGES = process.env.NODE_ENV !== "production";
