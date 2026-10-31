import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DoorPageView } from "@/components/door/door-page";
import { doorPages, getDoorPage } from "@/data/producten";
import { pageMetadata } from "@/lib/seo";

/**
 * Door-type pages live at the top level (/taatsdeuren, /schuifdeuren, …) for
 * clean, searchable URLs. Only the slugs in data/producten.ts exist; every
 * other top-level path is a real 404.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return doorPages.map((p) => ({ deur: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ deur: string }> }): Promise<Metadata> {
  const { deur } = await params;
  const page = getDoorPage(deur);
  if (!page) return {};
  return pageMetadata({
    title: page.meta.title,
    description: page.meta.description,
    path: `/${page.slug}`,
  });
}

export default async function DoorRoute({ params }: { params: Promise<{ deur: string }> }) {
  const { deur } = await params;
  const page = getDoorPage(deur);
  if (!page) notFound();
  return <DoorPageView page={page} />;
}
