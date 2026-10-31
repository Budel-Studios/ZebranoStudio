import type { Metadata } from "next";
import Link from "next/link";
import { DoorIllustration } from "@/components/door/door-illustration";
import { PillLink } from "@/components/ui/pill-link";
import { Container } from "@/components/ui/primitives";

export const metadata: Metadata = {
  title: "Pagina niet gevonden (404)",
  robots: { index: false, follow: true },
};

const suggesties = [
  { label: "Taatsdeuren", href: "/taatsdeuren" },
  { label: "Schuifdeuren", href: "/schuifdeuren" },
  { label: "Wandvlakke deuren", href: "/wandvlakke-deuren" },
  { label: "Collecties", href: "/collecties" },
  { label: "Ons verhaal", href: "/ons-verhaal" },
  { label: "Contact", href: "/contact" },
];

export default function NotFound() {
  return (
    <section className="bg-sand/60 pb-24 pt-36">
      <Container className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.16em] text-bark/70">404</p>
          <h1 className="mt-3 font-display text-4xl font-light leading-tight text-ink sm:text-5xl">Deze deur leidt nergens heen.</h1>
          <p className="mt-6 text-lg leading-relaxed text-ink/80">
            De pagina die je zoekt bestaat niet (meer). Kies hieronder waar je naartoe wilt, of ga terug naar de homepage.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <PillLink href="/">Terug naar home</PillLink>
            <PillLink href="/contact" tone="outline">
              Vraag een voorstel
            </PillLink>
          </div>
          <ul className="mt-10 flex flex-wrap gap-2">
            {suggesties.map((s) => (
              <li key={s.href}>
                <Link href={s.href} className="inline-block rounded-full border border-line/40 px-4 py-2 text-sm transition-colors hover:border-forest hover:bg-forest hover:text-paper">
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <DoorIllustration kind="hinged" className="mx-auto h-72 w-auto text-forest/40" />
      </Container>
    </section>
  );
}
