import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/site";

/**
 * Per-page metadata helper (same pattern as De Kozijnstudio). Every indexable
 * route gets its own title, description and absolute self-canonical
 * (resolved against metadataBase = SITE_URL), plus a complete Open Graph /
 * Twitter block — Next.js replaces (not merges) a parent's openGraph object.
 *
 * `title` is the page part only; the root layout template appends
 * " | Zebrano Studio". Pass `absoluteTitle` to set the full title yourself.
 */

export const DEFAULT_OG_IMAGE = {
  url: "/og/default.jpg",
  width: 1200,
  height: 630,
  alt: "Zebrano Studio — exclusieve binnendeuren op maat",
};

export function pageMetadata({
  title,
  absoluteTitle,
  description,
  path,
  noindex = false,
  type = "website",
  image,
}: {
  title?: string;
  absoluteTitle?: string;
  description: string;
  /** Route path starting with "/", without trailing slash ("/" for home). */
  path: string;
  noindex?: boolean;
  type?: "website" | "article";
  /** Optional page-specific share image (path under /public). */
  image?: { url: string; alt: string };
}): Metadata {
  const fullTitle = absoluteTitle ?? `${title} | ${SITE_NAME}`;
  const og = image ? { ...image, width: 1200, height: 630 } : DEFAULT_OG_IMAGE;
  return {
    title: absoluteTitle ? { absolute: absoluteTitle } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      siteName: SITE_NAME,
      locale: "nl_NL",
      type,
      images: [og],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [og.url],
    },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}
