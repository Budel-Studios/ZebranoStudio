import Link from "next/link";
import { DoorLineup } from "@/components/home/door-lineup";
import { PillLink } from "@/components/ui/pill-link";
import { SpotlightWordmark, StudioWordmark } from "@/components/wordmark";
import { primaryCta } from "@/lib/navigation";

const DEURTYPES = [
  { label: "Taatsdeuren", href: "/taatsdeuren" },
  { label: "Schuifdeuren", href: "/schuifdeuren" },
  { label: "Draaideuren", href: "/draaideuren" },
  { label: "Wandvlakke deuren", href: "/wandvlakke-deuren" },
  { label: "Roomdividers", href: "/roomdividers" },
  { label: "Boiserie", href: "/boiserie" },
];

/**
 * Homepage hero — after the budelstudios.com hero, in Zebrano's own way:
 * clean white, the wordmark big top-left with a green spotlight that follows
 * the pointer, a short title with the door types top-right, architect's
 * crosshairs, and a row of doors that open on hover.
 * Elements fade up one after another; after the intro screen (first visit
 * of a session) the delays start later — see --intro-delay in globals.css.
 */
export function HomeHero() {
  return (
    <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-white text-ink">
      <div className="mx-auto flex w-full max-w-[1600px] flex-1 flex-col px-5 pt-24 sm:px-8 md:px-10 md:pt-28">
        {/* Wordmark + title */}
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="intro-fade min-w-0" style={{ "--d": "0s" } as React.CSSProperties}>
            <h1 className="sr-only">Zebrano Studio — exclusieve binnendeuren op maat</h1>
            <SpotlightWordmark sweep className="w-[min(88vw,1080px)] cursor-crosshair" />
            <StudioWordmark className="mt-[clamp(0.6rem,1.4vw,1.25rem)] text-[clamp(14px,2.6vw,34px)]" />
          </div>

          <div className="intro-fade md:pt-3 md:text-right" style={{ "--d": "0.25s" } as React.CSSProperties}>
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-ink/50">Op maat gemaakt</p>
            <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 md:flex-col md:gap-1.5">
              {DEURTYPES.map((d) => (
                <li key={d.href}>
                  <Link href={d.href} className="text-[0.95rem] font-medium text-ink/85 transition-colors hover:text-accent">
                    {d.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Crosshair markers */}
        <div aria-hidden className="pointer-events-none mt-10 hidden grid-cols-4 md:grid">
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className="intro-fade text-lg text-ink/25" style={{ "--d": `${0.4 + i * 0.08}s` } as React.CSSProperties}>
              +
            </span>
          ))}
        </div>

        {/* Tagline + CTA | doors */}
        <div className="mt-auto grid gap-10 pb-10 pt-12 lg:grid-cols-12 lg:items-end lg:gap-12 lg:pb-12">
          <div className="intro-fade lg:col-span-4" style={{ "--d": "0.55s" } as React.CSSProperties}>
            <p className="max-w-sm text-lg leading-snug sm:text-xl">
              <span className="text-ink">Luxe deuren, op maat gemaakt.</span>{" "}
              <span className="text-ink/45">Exclusiviteit, nu binnen handbereik.</span>
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <PillLink href={primaryCta.href} size="lg">
                {primaryCta.label}
              </PillLink>
              <Link href="/collecties" className="text-sm text-ink/70 underline-offset-4 transition-colors hover:text-accent hover:underline">
                Bekijk de collecties
              </Link>
            </div>
            <p className="mt-8 font-sans text-xs text-ink/45">Een merk van MTB Bouw</p>
          </div>
          <div className="intro-fade lg:col-span-8" style={{ "--d": "0.7s" } as React.CSSProperties}>
            <DoorLineup />
          </div>
        </div>
      </div>
    </section>
  );
}
