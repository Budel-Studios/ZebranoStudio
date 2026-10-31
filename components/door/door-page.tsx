import Image from "next/image";
import Link from "next/link";
import { CtaBand } from "@/components/cta-band";
import { DoorIllustration } from "@/components/door/door-illustration";
import { ArrowRightIcon } from "@/components/icons";
import { PillLink } from "@/components/ui/pill-link";
import { Breadcrumbs, Container, Eyebrow, JsonLd } from "@/components/ui/primitives";
import { doorPages, type DoorBlock, type DoorPage } from "@/data/producten";
import { serviceSchema } from "@/lib/jsonld";
import { primaryCta } from "@/lib/navigation";
import { cn } from "@/lib/utils";

/** Template for every door-type page (taatsdeuren, schuifdeuren, …). */
export function DoorPageView({ page }: { page: DoorPage }) {
  return (
    <>
      <DoorHero page={page} />

      <section className="bg-paper py-20 sm:py-28">
        <Container className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          {page.basics.map((b) => (
            <TextBlock key={b.title} block={b} />
          ))}
        </Container>
      </section>

      <section className="pb-20 sm:pb-28">
        <Container className="space-y-20 sm:space-y-28">
          {page.rows.map((row, i) => (
            <div key={row.title} className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
              {row.image && (
                <div
                  className={cn(
                    "relative aspect-[4/3] overflow-hidden rounded-lg lg:col-span-6",
                    i % 2 === 1 && "lg:order-2",
                  )}
                >
                  <Image
                    src={row.image.src}
                    alt={row.image.alt}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 hover:scale-[1.03]"
                  />
                </div>
              )}
              <div className={cn("lg:col-span-5", i % 2 === 1 ? "lg:col-start-1 lg:order-1" : "lg:col-start-8")}>
                <TextBlock block={row} />
              </div>
            </div>
          ))}
        </Container>
      </section>

      <OtherDoors current={page.slug} />
      <CtaBand />
      <JsonLd data={serviceSchema({ name: page.h1, description: page.meta.description, path: `/${page.slug}` })} />
    </>
  );
}

function DoorHero({ page }: { page: DoorPage }) {
  return (
    <section className="relative isolate flex min-h-[86svh] items-end overflow-hidden bg-forest text-paper">
      {page.hero.kind === "image" ? (
        <>
          <Image src={page.hero.src} alt={page.hero.alt} fill priority sizes="100vw" className="-z-20 object-cover" />
          <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-[rgb(20_24_18/0.78)] via-[rgb(20_24_18/0.35)] to-[rgb(20_24_18/0.15)]" />
        </>
      ) : (
        <DoorIllustration
          kind={page.hero.icon}
          className="absolute -right-10 top-1/2 -z-10 h-[78%] w-auto -translate-y-1/2 text-paper/45 sm:right-[4%]"
        />
      )}
      <Container className="pb-12 pt-32 sm:pb-16">
        <Breadcrumbs tone="light" items={[{ name: page.name, path: `/${page.slug}` }]} className="mb-6" />
        <h1 className="font-display text-5xl font-light leading-none tracking-tight sm:text-6xl lg:text-7xl">{page.h1}</h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-paper/85 sm:text-lg">{page.intro}</p>
        <div className="mt-8">
          <PillLink href={primaryCta.href} tone="paper" size="lg">
            {primaryCta.label}
          </PillLink>
        </div>
      </Container>
    </section>
  );
}

function TextBlock({ block }: { block: DoorBlock }) {
  return (
    <div>
      <Eyebrow>{block.label}</Eyebrow>
      <h2 className="font-display text-3xl font-light leading-tight text-ink sm:text-4xl">{block.title}</h2>
      <p className="mt-5 text-base leading-relaxed text-ink/80 sm:text-[17px]">{block.text}</p>
      {block.cta && (
        <Link
          href={block.cta.href}
          className="group mt-6 inline-flex items-center gap-2 text-[15px] font-medium text-forest transition-colors hover:text-accent"
        >
          {block.cta.label}
          <ArrowRightIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      )}
    </div>
  );
}

function OtherDoors({ current }: { current: string }) {
  const others = doorPages.filter((p) => p.slug !== current);
  return (
    <section className="bg-sand/60 py-20 sm:py-24">
      <Container>
        <Eyebrow>Andere deurtypes</Eyebrow>
        <h2 className="font-display text-3xl font-light text-ink sm:text-4xl">Ontdek ook</h2>
        <div className="mt-10 grid gap-px overflow-hidden rounded-lg border border-line/40 bg-line/40 sm:grid-cols-2 lg:grid-cols-5">
          {others.map((p) => (
            <Link key={p.slug} href={`/${p.slug}`} className="group flex flex-col justify-between gap-6 bg-paper p-6 transition-colors hover:bg-white">
              <div>
                <p className="font-display text-xl text-ink">{p.name}</p>
                <p className="mt-2 text-sm leading-relaxed text-ink/70">{p.teaser}</p>
              </div>
              <ArrowRightIcon className="size-5 text-forest transition-transform duration-300 group-hover:translate-x-1 group-hover:text-accent" />
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
