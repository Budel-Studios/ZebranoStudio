import Link from "next/link";
import type { ReactNode } from "react";
import { GiantWordmark } from "@/components/logo";
import { Arrow } from "@/components/ui/arrow";
import { button } from "@/components/ui/button";
import { BRAND } from "@/lib/brand";
import { footerColumns, primaryCta } from "@/lib/navigation";

function ColTitle({ children }: { children: ReactNode }) {
  return <p className="mb-5 text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-board-foreground/60">{children}</p>;
}

/**
 * Footer, built like the Zebrano Studio one: inset board panel with the
 * closing line, three link columns and contact, the giant wordmark and the
 * legal line. Company details (KvK, address) are not known yet and are
 * deliberately absent.
 */
export function SiteFooter() {
  return (
    <footer className="px-3 pb-3 sm:px-4 sm:pb-4">
      <div className="mx-auto max-w-[1600px] overflow-hidden rounded-sm bg-board px-6 pt-16 text-board-foreground sm:px-10 lg:px-14 lg:pt-20">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className="max-w-[11ch] text-balance text-4xl leading-[1.05] sm:text-5xl">
              {BRAND.tagline.replace(/\.$/, "")}
              <span className="text-cloth">.</span>
            </h2>
            <Link href={primaryCta.href} className={`${button({ size: "md" })} mt-8`}>
              {primaryCta.label} <Arrow />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-4 lg:col-span-8">
            {footerColumns.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <ColTitle>{col.title}</ColTitle>
                <ul className="space-y-2.5 text-[0.9375rem]">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link href={l.href} className="link-line">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
            <div>
              <ColTitle>Contact</ColTitle>
              <div className="space-y-2.5 text-[0.9375rem]">
                <p>
                  <a href={`mailto:${BRAND.email}`} className="link-line break-all">
                    {BRAND.email}
                  </a>
                </p>
                <p>
                  <Link href="/contact" className="link-line">
                    Contactformulier
                  </Link>
                </p>
                <p className="text-board-foreground/60">
                  Gedrukt en gebonden in Italië door {BRAND.printer}
                </p>
              </div>
            </div>
          </div>
        </div>

        <Link href="/" aria-label={`${BRAND.name}, naar de homepage`} className="mt-16 block border-t border-board-foreground/15 pt-10 text-background lg:mt-20">
          <GiantWordmark />
        </Link>

        <div className="mt-10 flex flex-col gap-4 border-t border-board-foreground/15 py-7 text-[0.8125rem] sm:flex-row sm:items-center sm:justify-between">
          <ul className="flex gap-6">
            <li>
              <Link href="/privacy" className="link-line">
                Privacy
              </Link>
            </li>
            <li>
              <Link href="/voorwaarden" className="link-line">
                Voorwaarden
              </Link>
            </li>
            <li>
              <Link href="/studio" className="link-line">
                Studio
              </Link>
            </li>
          </ul>
          <p className="text-board-foreground/70">
            © {new Date().getFullYear()} {BRAND.name} · {BRAND.descriptor}
          </p>
        </div>
      </div>
    </footer>
  );
}
