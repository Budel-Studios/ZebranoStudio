import { company } from "@/data/company";
import { SITE_NAME, SITE_URL } from "@/lib/site";

/**
 * Structured data. One organisation node with a fixed @id, referenced from
 * page-level nodes. Zebrano Studio is a trade name of MTB Bouw B.V.
 * No FAQPage schema (Google no longer shows FAQ results) and no ratings.
 */

export const ORG_ID = `${SITE_URL}/#organization`;

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": ORG_ID,
    name: SITE_NAME,
    legalName: company.entiteit,
    url: SITE_URL,
    logo: `${SITE_URL}/brand/logo-512.png`,
    image: `${SITE_URL}/og/default.jpg`,
    description:
      "Exclusieve binnendeuren op maat: elk ontwerp als taatsdeur, schuifdeur, draaideur (ook wandvlak) of roomdivider, en boiserie.",
    email: company.email,
    telephone: company.telefoonHref,
    address: {
      "@type": "PostalAddress",
      streetAddress: company.adres,
      postalCode: company.postcode,
      addressLocality: company.plaats,
      addressCountry: "NL",
    },
    areaServed: { "@type": "Country", name: "Nederland" },
    parentOrganization: {
      "@type": "Organization",
      name: company.moeder,
      legalName: company.entiteit,
      url: "https://www.mtbbouw.com",
    },
    sameAs: [company.instagram, company.pinterest],
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

export function serviceSchema({ name, description, path }: { name: string; description: string; path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: `${SITE_URL}${path}`,
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "Country", name: "Nederland" },
  };
}

/** Serialise for a <script type="application/ld+json"> tag. */
export function jsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
