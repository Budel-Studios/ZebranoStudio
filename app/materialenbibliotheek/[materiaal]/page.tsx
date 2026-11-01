import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MaterialCard } from "@/components/library/material-card";
import { Swatch } from "@/components/library/swatch";
import { Arrow } from "@/components/ui/arrow";
import { button } from "@/components/ui/button";
import { Breadcrumbs, container, DotTitle, Eyebrow } from "@/components/ui/primitives";
import { company } from "@/data/company";
import {
  MATERIALS,
  applicationLabel,
  getCategory,
  getMaterial,
  type Material,
} from "@/data/materialenbibliotheek";
import { serviceTabs } from "@/data/service";
import { isModuleOn } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const dynamicParams = false;

export function generateStaticParams() {
  return MATERIALS.map((m) => ({ materiaal: m.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ materiaal: string }> }): Promise<Metadata> {
  const { materiaal } = await params;
  const m = getMaterial(materiaal);
  if (!m) return {};
  return pageMetadata({
    title: `${m.name} (${getCategory(m.category).label.toLowerCase()})`,
    description: `${m.description} Bekijk tint, stijl en toepassingen in de materialenbibliotheek van Zebrano Studio.`,
    path: `/materialenbibliotheek/${m.slug}`,
  });
}

/** "Lak in RAL-kleur" → "lak in RAL-kleur" (for use mid-sentence). */
const lowerFirst = (s: string) => s.charAt(0).toLowerCase() + s.slice(1);

function careText(m: Material): string[] | null {
  const key = getCategory(m.category).care;
  if (!key) return null;
  const tab = serviceTabs.find((t) => t.slug === "onderhoud");
  return tab?.items.find((i) => i.question === key)?.answer ?? null;
}

/** One material — laid out like a glass design: image left, sticky details right. */
export default async function MaterialPage({ params }: { params: Promise<{ materiaal: string }> }) {
  if (!isModuleOn("materialenbibliotheek")) notFound();
  const { materiaal } = await params;
  const m = getMaterial(materiaal);
  if (!m) notFound();

  const category = getCategory(m.category);
  const pairings = m.pairings.map(getMaterial).filter((p): p is Material => !!p);
  const sameCategory = MATERIALS.filter((o) => o.category === m.category && o.slug !== m.slug);
  const more = [...sameCategory, ...pairings.filter((p) => !sameCategory.includes(p))].slice(0, 4);
  const care = careText(m);

  const specs: Array<[string, React.ReactNode]> = [
    [
      "Categorie",
      <Link key="c" href={`/materialenbibliotheek?categorie=${m.category}`} className="link-line">
        {category.label}
      </Link>,
    ],
    ["Kenmerk", m.characteristic],
    ["Tint", m.tone.join(", ")],
    ["Intensiteit", m.intensity],
    ["Interieurstijl", m.styles.join(", ")],
    [
      "Toepassingen",
      <span key="t" className="flex flex-wrap gap-x-3 gap-y-1">
        {m.applications.map((a) => (
          <Link key={a} href={`/${a}`} className="link-line">
            {applicationLabel(a)}
          </Link>
        ))}
      </span>,
    ],
    ...(m.edges ? ([["Randafwerking", m.edges.join(", ")]] as Array<[string, React.ReactNode]>) : []),
  ];

  return (
    <div className={cn(container, "pb-24 pt-28 lg:pt-32")}>
      <Breadcrumbs
        className="mb-8"
        items={[
          { name: "Materialen", path: "/materialen" },
          { name: "Materialenbibliotheek", path: "/materialenbibliotheek" },
          { name: m.name, path: `/materialenbibliotheek/${m.slug}` },
        ]}
      />

      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <div className="relative aspect-[4/5] animate-unveil overflow-hidden rounded-sm bg-muted">
            {m.image ? (
              <Image src={m.image.src} alt={m.image.alt} fill priority sizes="(min-width: 1024px) 58vw, 100vw" className="object-cover" />
            ) : (
              <Swatch material={m} priority sizes="(min-width: 1024px) 58vw, 100vw" />
            )}
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <div className="animate-rise">
              <Eyebrow>
                {category.label} · {m.code}
              </Eyebrow>
              <div className="mt-6 flex items-end gap-4 sm:gap-5">
                <div className="relative size-16 shrink-0 overflow-hidden rounded-sm ring-1 ring-border sm:size-24">
                  <Swatch material={m} sizes="96px" />
                </div>
                <h1 lang="nl" className="min-w-0 hyphens-auto break-words text-4xl leading-none sm:text-6xl lg:text-7xl">
                  <DotTitle>{m.name}</DotTitle>
                </h1>
              </div>
              <p className="mt-6 text-xl leading-snug">{m.description}</p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{category.intro}</p>
            </div>

            <dl className="mt-10 animate-rise border-t [animation-delay:120ms]">
              {specs.map(([label, value]) => (
                <div key={label} className="grid grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-4 border-b py-3.5 text-[0.9375rem]">
                  <dt className="text-muted-foreground">{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>

            {pairings.length > 0 && (
              <div className="mt-8 animate-rise [animation-delay:180ms]">
                <p className="text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-muted-foreground">Combineert met</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {pairings.map((p) => (
                    <li key={p.slug}>
                      <Link
                        href={`/materialenbibliotheek/${p.slug}`}
                        className="group inline-flex items-center gap-2.5 rounded-sm border border-foreground/20 py-1 pl-1 pr-3 text-sm transition-colors duration-300 hover:border-foreground"
                      >
                        <span className="relative size-7 overflow-hidden rounded-[2px]">
                          <Swatch material={p} sizes="28px" />
                        </span>
                        {p.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {care && (
              <details className="group mt-8 animate-rise border-y [animation-delay:200ms]">
                <summary className="flex cursor-pointer items-center justify-between py-4 text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-muted-foreground">
                  Onderhoud
                  <span aria-hidden className="text-lg leading-none transition-transform duration-300 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <div className="pb-5 text-sm leading-relaxed text-muted-foreground">
                  {care.map((c) => (
                    <p key={c}>{c}</p>
                  ))}
                  <Link href="/service#onderhoud" className="link-line mt-3 inline-block text-foreground">
                    Meer over onderhoud
                  </Link>
                </div>
              </details>
            )}

            <div className="mt-10 flex animate-rise flex-wrap items-center gap-4 [animation-delay:240ms]">
              <Link href={`/contact?materiaal=${m.slug}`} className={button({ size: "lg" })}>
                Vraag een voorstel met {lowerFirst(m.name)} <Arrow />
              </Link>
              <a href={`tel:${company.telefoonHref}`} className={button({ variant: "text" })}>
                of bel {company.telefoon}
              </a>
            </div>
          </div>
        </div>
      </div>

      {more.length > 0 && (
        <section className="mt-24 border-t pt-12 lg:mt-32">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="text-3xl sm:text-4xl">Meer uit de bibliotheek</h2>
            <Link href="/materialenbibliotheek" className={button({ variant: "outline", size: "sm" })}>
              Alle materialen <Arrow diagonal={false} />
            </Link>
          </div>
          <ul className="mt-10 grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4">
            {more.map((o) => (
              <li key={o.slug}>
                <MaterialCard material={o} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
