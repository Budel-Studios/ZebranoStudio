import Image from "next/image";
import Link from "next/link";
import { Arrow } from "@/components/ui/arrow";
import { button } from "@/components/ui/button";
import { Breadcrumbs, container, DotTitle, Eyebrow } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { OtherCollections } from "@/components/collection/other-collections";
import { UitvoeringTabs } from "@/components/uitvoering/uitvoering-tabs";
import { company } from "@/data/company";
import { FINISHES, GLASS_DOORS } from "@/data/glasdeuren";
import { pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "Glascollectie: vijf ontwerpen in glas en staal",
  description:
    "Ontdek de glasdeuren Jesse, Bo, Merle, Lucas en Guus: elk ontwerp als taatsdeur, schuifdeur, draaideur of roomdivider, van glas en staal en volledig op maat.",
  path: "/collecties/glas",
});

/** Glascollectie — the five designs as in the Lovable design. */
export default function GlassCollectionPage() {
  return (
    <>
      <div className={cn(container, "pb-24 pt-32 lg:pt-40")}>
        <Breadcrumbs
          items={[
            { name: "Collecties", path: "/collecties" },
            { name: "Glascollectie", path: "/collecties/glas" },
          ]}
        />
        <header className="grid gap-8 border-b pb-12 lg:grid-cols-12 lg:items-end">
          <div className="animate-rise lg:col-span-7">
            <Eyebrow>Collecties · Glas</Eyebrow>
            <h1 className="mt-6 text-5xl leading-[1.02] sm:text-6xl lg:text-7xl">
              <DotTitle>Glascollectie</DotTitle>
            </h1>
          </div>
          <div className="animate-rise [animation-delay:120ms] lg:col-span-5">
            <p className="text-lg leading-relaxed text-muted-foreground">
              Vijf ontwerpen van glas en staal, elk met een eigen karakter. Ieder ontwerp maken we volledig op maat, in het
              profiel en glas dat bij jouw huis past, met veiligheidsglas en verfijnde afwerkingen. En in de uitvoering die jij
              kiest.
            </p>
          </div>
        </header>

        <UitvoeringTabs className="mt-10 animate-rise [animation-delay:200ms]" />

        <ul className="mt-14 grid gap-x-5 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {GLASS_DOORS.map((door, i) => (
            <Reveal as="li" key={door.slug} delay={(i % 3) * 70}>
              <Link href={`/collecties/glas/${door.slug}`} className="group block">
                <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-muted">
                  <Image
                    src={door.image.src}
                    alt={door.image.alt}
                    fill
                    priority={i < 3}
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="img-zoom object-cover"
                  />
                </div>
                <div className="mt-5 flex items-baseline justify-between gap-4 border-b pb-4">
                  <div className="flex items-baseline gap-4">
                    <span className="text-[0.6875rem] tabular-nums tracking-[0.2em] text-copper">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h2 className="text-3xl">
                      <span className="link-line">{door.name}</span>
                    </h2>
                  </div>
                  <Arrow className="text-muted-foreground" />
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{door.tagline}</p>
                <dl className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-[0.8125rem]">
                  <div className="flex gap-1.5">
                    <dt className="text-muted-foreground">Op de foto:</dt>
                    <dd>{door.type.toLowerCase()}</dd>
                  </div>
                  <div className="flex gap-1.5 text-muted-foreground">
                    <dt className="sr-only">Glas</dt>
                    <dd>{door.glass}</dd>
                  </div>
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <dt className="sr-only">Profiel</dt>
                    <dd className="flex items-center gap-1.5">
                      <span className={`size-2.5 rounded-full ${FINISHES[door.finish].swatch}`} />
                      {FINISHES[door.finish].label}
                    </dd>
                  </div>
                </dl>
              </Link>
            </Reveal>
          ))}

          <Reveal as="li" delay={140} className="flex">
            <div className="flex w-full flex-col justify-between rounded-sm bg-forest p-8 text-forest-foreground lg:p-10">
              <div>
                <p className="eyebrow text-forest-muted">Op maat</p>
                <h2 className="mt-6 text-3xl leading-tight sm:text-4xl">Twijfel je tussen twee ontwerpen?</h2>
                <p className="mt-5 leading-relaxed text-forest-muted">
                  Maak een afspraak in Enschede, dan bespreken we glas, profiel en maat samen.
                </p>
              </div>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <Link href="/contact" className={button({ variant: "light" })}>
                  Maak een afspraak <Arrow />
                </Link>
                <a href={`tel:${company.telefoonHref}`} className={button({ variant: "outlineLight" })}>
                  {company.telefoon}
                </a>
              </div>
            </div>
          </Reveal>
        </ul>
      </div>

      <OtherCollections current="glas" />
    </>
  );
}
