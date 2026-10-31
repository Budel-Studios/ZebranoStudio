import Image from "next/image";

const SLIDES = [
  { src: "/images/hero-villa.webp", alt: "Moderne villa met zwembad in de avondzon" },
  { src: "/images/hero-paviljoen.webp", alt: "Overdekt zwembad onder een houten dak" },
  { src: "/images/hero-zwembad.webp", alt: "Zwembad met ligbedden en uitzicht over zee" },
];

const ROWS = [
  { title: "Luxe deuren", sub: "Exclusiviteit, nu binnen handbereik", align: "left" as const },
  { title: "Unieke ontwerpen", sub: "Deuren die jouw verhaal vertellen", align: "right" as const },
  { title: "Tijdloze kwaliteit", sub: "Deuren ontworpen om trends te overstijgen", align: "left" as const },
];

/**
 * Homepage hero, as on the original site: full-screen photo slideshow under a
 * dark veil, three rows divided by hairlines, the big words alternating left
 * and right with a small line on the opposite side. Pure CSS crossfade.
 */
export function HomeHero() {
  return (
    <section className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden bg-forest text-paper">
      <div aria-hidden className="absolute inset-0 -z-10">
        {SLIDES.map((s, i) => (
          <Image
            key={s.src}
            src={s.src}
            alt=""
            fill
            priority={i === 0}
            sizes="100vw"
            className="hero-slide object-cover"
            style={{ animationDelay: `${(i * 6 - 1.08).toFixed(2)}s` }}
          />
        ))}
        <div className="absolute inset-0 bg-[rgb(20_24_18/0.45)]" />
      </div>
      <h1 className="sr-only">Zebrano Studio — exclusieve binnendeuren op maat</h1>
      <div className="pb-10 pt-28 sm:pb-14">
        {ROWS.map((row) => (
          <div key={row.title} className="border-t border-paper/35 px-5 py-6 sm:px-8 md:px-12 md:py-8">
            <div
              className={
                row.align === "left"
                  ? "flex flex-col gap-2 md:flex-row-reverse md:items-start md:justify-between"
                  : "flex flex-col gap-2 md:flex-row md:items-start md:justify-between"
              }
            >
              <p className={row.align === "left" ? "text-base sm:text-lg md:pt-2 md:text-right" : "text-base sm:text-lg md:pt-2"}>
                {row.sub}
              </p>
              <p
                className={
                  "font-display text-[2.6rem] font-light leading-none tracking-tight sm:text-6xl lg:text-7xl " +
                  (row.align === "right" ? "md:text-right" : "")
                }
              >
                {row.title}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
