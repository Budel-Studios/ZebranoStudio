import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/cta-band";
import { ArrowRightIcon } from "@/components/icons";
import { PillLink } from "@/components/ui/pill-link";
import { Breadcrumbs, Container, Eyebrow } from "@/components/ui/primitives";
import { collecties, getCollectie } from "@/data/collecties";
import { primaryCta } from "@/lib/navigation";
import { pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return collecties.map((c) => ({ collectie: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ collectie: string }> }): Promise<Metadata> {
  const { collectie } = await params;
  const c = getCollectie(collectie);
  if (!c) return {};
  return pageMetadata({ title: c.meta.title, description: c.meta.description, path: `/collecties/${c.slug}` });
}

export default async function CollectiePage({ params }: { params: Promise<{ collectie: string }> }) {
  const { collectie } = await params;
  const c = getCollectie(collectie);
  if (!c) notFound();
  const others = collecties.filter((o) => o.slug !== c.slug);

  return (
    <>
      <section className="bg-sand/60 pb-16 pt-32 sm:pb-24 sm:pt-36">
        <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Breadcrumbs
              items={[
                { name: "Collecties", path: "/collecties" },
                { name: c.name, path: `/collecties/${c.slug}` },
              ]}
              className="mb-8"
            />
            <Eyebrow>Collectie</Eyebrow>
            <h1 className="font-display text-5xl font-light leading-none tracking-tight text-ink sm:text-6xl">{c.name}</h1>
            <p className="mt-6 font-display text-xl font-light leading-snug text-ink/90 sm:text-2xl">{c.tagline}</p>
            <p className="mt-5 max-w-xl leading-relaxed text-ink/80">{c.text}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <PillLink href={primaryCta.href}>{primaryCta.label}</PillLink>
            </div>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-lg sm:aspect-[4/3] lg:aspect-[4/5]">
            <Image src={c.hero.src} alt={c.hero.alt} fill priority sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container>
          <Eyebrow>Beschikbaar als</Eyebrow>
          <h2 className="font-display text-3xl font-light text-ink sm:text-4xl">Deurtypes in deze collectie</h2>
          <ul className="mt-8 flex flex-wrap gap-3">
            {c.deurtypes.map((d) => (
              <li key={d.href}>
                <Link
                  href={d.href}
                  className="group inline-flex items-center gap-2 rounded-full border border-line/50 px-5 py-2.5 text-[15px] transition-colors hover:border-forest hover:bg-forest hover:text-paper"
                >
                  {d.label}
                  <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </li>
            ))}
          </ul>

          {c.gallery.length > 0 && (
            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {c.gallery.map((g) => (
                <div key={g.src} className="relative aspect-[4/5] overflow-hidden rounded-lg">
                  <Image src={g.src} alt={g.alt} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-700 hover:scale-[1.04]" />
                </div>
              ))}
            </div>
          )}
        </Container>
      </section>

      <section className="bg-sand/60 py-16 sm:py-20">
        <Container>
          <h2 className="font-display text-2xl font-light text-ink sm:text-3xl">Andere collecties</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {others.map((o) => (
              <Link key={o.slug} href={`/collecties/${o.slug}`} className="group flex items-center justify-between gap-4 rounded-lg border border-line/30 bg-paper px-6 py-5 transition-colors hover:bg-white">
                <span className="font-display text-lg text-ink">{o.name}</span>
                <ArrowRightIcon className="size-5 text-forest transition-transform group-hover:translate-x-1 group-hover:text-accent" />
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <div className="h-3" />
      <CtaBand />
    </>
  );
}
