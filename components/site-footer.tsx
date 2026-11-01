import Link from "next/link";
import type { ReactNode } from "react";
import { GiantWordmark } from "@/components/logo";
import { Arrow } from "@/components/ui/arrow";
import { button } from "@/components/ui/button";
import { company } from "@/data/company";
import { visibleFooterColumns } from "@/lib/navigation";

function ColTitle({ children }: { children: ReactNode }) {
  return (
    <p className="mb-5 text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-sage-foreground/60">{children}</p>
  );
}

/**
 * Footer from the Lovable design: inset sage panel with the closing line,
 * three link columns and contact, the giant wordmark (its door opens a
 * little further on hover) and the legal line with the MTB Bouw trade name.
 */
export function SiteFooter() {
  return (
    <footer className="px-3 pb-3 sm:px-4 sm:pb-4">
      <div className="mx-auto max-w-[1600px] overflow-hidden rounded-sm bg-sage px-6 pt-16 text-sage-foreground sm:px-10 lg:px-14 lg:pt-20">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className="max-w-[16ch] text-4xl leading-[1.1] sm:text-[2.75rem]">Luxe deuren, voor iedereen bereikbaar.</h2>
            <Link href="/collecties" className={`${button({ size: "md" })} mt-8`}>
              Bekijk de collecties <Arrow />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-4 lg:col-span-8">
            {visibleFooterColumns().map((col) => (
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
              <address className="space-y-2.5 text-[0.9375rem] not-italic">
                <p>
                  {company.adres}
                  <br />
                  {company.postcodePlaats}
                </p>
                <p>
                  <a href={`tel:${company.telefoonHref}`} className="link-line">
                    {company.telefoon}
                  </a>
                </p>
                <p>
                  <a href={`mailto:${company.email}`} className="link-line break-all">
                    {company.email}
                  </a>
                </p>
                <p className="text-sage-foreground/60">Bezoek op afspraak</p>
              </address>
            </div>
          </div>
        </div>

        <Link
          href="/"
          aria-label="Zebrano Studio, naar de homepage"
          className="mt-16 block border-t border-sage-foreground/15 pt-10 text-background lg:mt-20"
        >
          <GiantWordmark />
        </Link>

        <div className="mt-10 flex flex-col gap-6 border-t border-sage-foreground/15 py-7 text-[0.8125rem] sm:flex-row sm:items-center sm:justify-between">
          <ul className="flex gap-6">
            <li>
              <a href={company.instagram} target="_blank" rel="noopener noreferrer" className="link-line">
                Instagram
              </a>
            </li>
            <li>
              <a href={company.pinterest} target="_blank" rel="noopener noreferrer" className="link-line">
                Pinterest
              </a>
            </li>
            <li>
              <a href={`https://wa.me/${company.whatsappHref}`} target="_blank" rel="noopener noreferrer" className="link-line">
                WhatsApp
              </a>
            </li>
          </ul>
          <p className="text-sage-foreground/70">
            © {new Date().getFullYear()} {company.naam} · een handelsnaam van {company.entiteit} · KvK {company.kvk}
          </p>
        </div>
      </div>
    </footer>
  );
}
