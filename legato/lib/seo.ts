import type { Metadata } from "next";
import { BRAND } from "@/lib/brand";

/**
 * Per-page metadata helper (same pattern as the Zebrano Studio site). Every
 * indexable route gets its own title, description and self-canonical
 * (resolved against metadataBase = SITE_URL) plus a complete Open Graph block.
 *
 * `title` is the page part only; the root layout template appends the brand.
 * Pass `absoluteTitle` to set the full title yourself. There is no share image
 * yet (no photography exists), so none is declared.
 */
export function pageMetadata({
  title,
  absoluteTitle,
  description,
  path,
  noindex = false,
}: {
  title?: string;
  absoluteTitle?: string;
  description: string;
  /** Route path starting with "/", without trailing slash ("/" for home). */
  path: string;
  noindex?: boolean;
}): Metadata {
  const fullTitle = absoluteTitle ?? `${title} | ${BRAND.name}`;
  return {
    title: absoluteTitle ? { absolute: absoluteTitle } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      siteName: BRAND.name,
      locale: "nl_NL",
      type: "website",
    },
    twitter: { card: "summary", title: fullTitle, description },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}
