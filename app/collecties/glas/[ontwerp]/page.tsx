import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Arrow } from "@/components/ui/arrow";
import { button } from "@/components/ui/button";
import { Breadcrumbs, container, DotTitle, Eyebrow } from "@/components/ui/primitives";
import { company } from "@/data/company";
import { FINISHES, GLASS_DOORS, getGlassDoor } from "@/data/glasdeuren";
import { pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const dynamicParams = false;

export function generateStaticParams() {
  return GLASS_DOORS.map((d) => ({ ontwerp: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ ontwerp: string }> }): Promise<Metadata> {
  const { ontwerp } = await params;
  const door = getGlassDoor(ontwerp);
  if (!door) return {};
  return pageMetadata({
    title: `${door.name}: ${door.type.toLowerCase()} van glas`,
    description: `${door.tagline} ${door.description}`,
    path: `/collecties/glas/${door.slug}`,
  });
}

/** One glass design — the Lovable product page: image left, sticky details right. */
export default async function GlassDoorPage({ params }: { params: Promise<{ ontwerp: string }> }) {
  const { ontwerp } = await params;
  const door = getGlassDoor(ontwerp);
  if (!door) notFound();

  const index = GLASS_DOORS.findIndex((d) => d.slug === door.slug);
  const next = GLASS_DOORS[(index + 1) % GLASS_DOORS.length]!;
  const others = GLASS_DOORS.filter((d) => d.slug !== door.slug);

  const specs: Array<[string, string]> = [
    ["Deurtype", door.type],
    ["Glas", door.glass],
    ["Indeling", door.layout],
    ["Standaard profiel", FINISHES[door.finish].label],
    ["Afmetingen", "Volledig op maat"],
    ["Montage", "Op aanvraag"],
  ];

  return (
    <div className={cn(container, "pb-24 pt-28 lg:pt-32")}>
      <Breadcrumbs
        className="mb-8"
        items={[
          { name: "Collecties", path: "/collecties" },
          { name: "Glascollectie", path: "/collecties/glas" },
          { name: door.name, path: `/collecties/glas/${door.slug}` },
        ]}
      />

      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <div className="relative aspect-[4/5] animate-unveil overflow-hidden rounded-sm bg-muted">
            <Image src={door.image.src} alt={door.image.alt} fill priority sizes="(min-width: 1024px) 58vw, 100vw" className="object-cover" />
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <div className="animate-rise">
              <Eyebrow>
                Ontwerp {String(index + 1).padStart(2, "0")} / {String(GLASS_DOORS.length).padStart(2, "0")}
              </Eyebrow>
              <h1 className="mt-6 text-6xl leading-none sm:text-7xl lg:text-8xl">
                <DotTitle>{door.name}</DotTitle>
              </h1>
              <p className="mt-6 text-xl leading-snug">{door.tagline}</p>
              <p className="mt-5 leading-relaxed text-muted-foreground">{door.description}</p>
            </div>

            <dl className="mt-10 animate-rise border-t [animation-delay:120ms]">
              {specs.map(([label, value]) => (
                <div key={label} className="grid grid-cols-2 gap-4 border-b py-3.5 text-[0.9375rem]">
                  <dt className="text-muted-foreground">{label}</dt>
                  <dd>
                    {label === "Deurtype" ? (
                      <Link href={door.typeHref} className="link-line">
                        {value}
                      </Link>
                    ) : (
                      value
                    )}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-8 animate-rise [animation-delay:180ms]">
              <p className="text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-muted-foreground">Verkrijgbaar in</p>
              <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-3">
                {door.finishes.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <span
                      className={`size-4 rounded-full ring-1 ring-border ring-offset-2 ring-offset-background ${FINISHES[f].swatch}`}
                    />
                    {FINISHES[f].label}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10 flex animate-rise flex-wrap items-center gap-4 [animation-delay:240ms]">
              <Link href={`/contact?ontwerp=${door.slug}`} className={button({ size: "lg" })}>
                Vraag een voorstel voor {door.name} <Arrow />
              </Link>
              <a href={`tel:${company.telefoonHref}`} className={button({ variant: "text" })}>
                of bel {company.telefoon}
              </a>
            </div>
          </div>
        </div>
      </div>

      <section className="mt-24 border-t pt-12 lg:mt-32">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="text-3xl sm:text-4xl">Andere ontwerpen</h2>
          <Link href={`/collecties/glas/${next.slug}`} className={button({ variant: "outline", size: "sm" })}>
            Volgende: {next.name} <Arrow diagonal={false} />
          </Link>
        </div>
        <ul className="mt-10 grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4">
          {others.map((d) => (
            <li key={d.slug}>
              <Link href={`/collecties/glas/${d.slug}`} className="group block">
                <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-muted">
                  <Image src={d.image.src} alt={d.image.alt} fill sizes="(min-width: 1024px) 25vw, 50vw" className="img-zoom object-cover" />
                </div>
                <div className="mt-4 flex items-baseline justify-between gap-3">
                  <h3 className="text-2xl">
                    <span className="link-line">{d.name}</span>
                  </h3>
                  <span className="text-[0.8125rem] text-muted-foreground">{d.type}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
