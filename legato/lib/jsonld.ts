import { BRAND, SITE_URL } from "@/lib/brand";

/**
 * Structured data. Kept deliberately small: an organisation node and
 * breadcrumbs. No ratings, no FAQPage schema, no address or phone (the
 * company details are not known yet).
 */

export const ORG_ID = `${SITE_URL}/#organization`;

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: BRAND.name,
    url: SITE_URL,
    description:
      "Trouwboeken en reisboeken van koffietafelkwaliteit: hoofdstukken, geloften, speeches en foto's in één boek.",
  };
}

export function breadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.path === "/" ? SITE_URL : `${SITE_URL}${item.path}`,
    })),
  };
}

/** Serialise for a <script type="application/ld+json"> tag. */
export function jsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
