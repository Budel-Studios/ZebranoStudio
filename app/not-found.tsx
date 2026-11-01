import type { Metadata } from "next";
import Link from "next/link";
import { Arrow } from "@/components/ui/arrow";
import { button } from "@/components/ui/button";
import { DotTitle, Eyebrow } from "@/components/ui/primitives";

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
    <section className="flex min-h-[80vh] items-center justify-center px-4 pb-24 pt-36">
      <div className="max-w-xl animate-rise text-center">
        <Eyebrow className="justify-center">404</Eyebrow>
        <h1 className="mt-6 text-5xl leading-[1.02] sm:text-6xl">
          <DotTitle>Deze deur leidt nergens heen.</DotTitle>
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
          De pagina die je zoekt bestaat niet (meer). Kies hieronder waar je naartoe wilt, of ga terug naar de homepage.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link href="/" className={button()}>
            Naar de homepage <Arrow />
          </Link>
          <Link href="/contact" className={button({ variant: "outline" })}>
            Vraag een voorstel
          </Link>
        </div>
        <ul className="mt-12 flex flex-wrap justify-center gap-x-6 gap-y-3 border-t pt-8 text-sm">
          {suggesties.map((s) => (
            <li key={s.href}>
              <Link href={s.href} className="link-line">
                {s.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
