import Link from "next/link";
import { Logo } from "@/components/logo";
import { InstagramIcon, PinterestIcon, WhatsAppIcon } from "@/components/icons";
import { PillLink } from "@/components/ui/pill-link";
import { company } from "@/data/company";
import { MTB_URL } from "@/data/mtb-bouw";
import { footerColumns } from "@/lib/navigation";

/**
 * Footer — the original Zebrano footer (inset sage panel, big closing line,
 * Producten · Zebrano · Service columns, Pinterest/Instagram, logo in white)
 * plus the MTB Bouw family line and contact details, as on De Kozijnstudio.
 */
export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="p-3 pt-0">
      <div className="rounded-lg bg-sage px-6 pb-8 pt-12 text-ink sm:px-10 lg:px-14 lg:pt-16">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_2fr]">
          <div className="flex flex-col gap-6">
            <p className="max-w-md font-display text-3xl font-normal leading-tight text-ink sm:text-4xl">
              Luxe deuren, voor iedereen bereikbaar.
            </p>
            <PillLink href="/collecties" tone="forest">
              Bekijk onze collectie
            </PillLink>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {footerColumns.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <p className="mb-4 font-sans text-xs font-semibold uppercase tracking-[0.14em] text-ink/70">
                  {col.title}
                </p>
                <ul className="space-y-2 text-[15px]">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="transition-colors hover:text-accent">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
            <div>
              <p className="mb-4 font-sans text-xs font-semibold uppercase tracking-[0.14em] text-ink/70">Contact</p>
              <address className="space-y-2 text-[15px] not-italic">
                <span className="block">
                  {company.adres}
                  <br />
                  {company.postcodePlaats}
                </span>
                <a className="block transition-colors hover:text-accent" href={`tel:${company.telefoonHref}`}>
                  {company.telefoon}
                </a>
                <a className="block break-all transition-colors hover:text-accent" href={`mailto:${company.email}`}>
                  {company.email}
                </a>
                <span className="block text-ink/70">Bezoek op afspraak</span>
              </address>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-8 border-t border-ink/15 pt-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex items-center gap-3">
            <a
              href={company.pinterest}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Zebrano Studio op Pinterest"
              className="grid size-10 place-items-center rounded-full border border-ink/25 transition-colors hover:bg-forest hover:text-paper"
            >
              <PinterestIcon className="size-5" />
            </a>
            <a
              href={company.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Zebrano Studio op Instagram"
              className="grid size-10 place-items-center rounded-full border border-ink/25 transition-colors hover:bg-forest hover:text-paper"
            >
              <InstagramIcon className="size-5" />
            </a>
            <a
              href={`https://wa.me/${company.whatsappHref}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="App Zebrano Studio via WhatsApp"
              className="grid size-10 place-items-center rounded-full border border-ink/25 transition-colors hover:bg-forest hover:text-paper"
            >
              <WhatsAppIcon className="size-5" />
            </a>
          </div>
          <Link href="/" aria-label="Zebrano Studio — naar de homepage" className="text-white">
            <Logo className="h-auto w-[260px] sm:w-[340px]" />
          </Link>
        </div>

        <div className="mt-8 flex flex-col gap-2 text-xs leading-relaxed text-ink/70 sm:flex-row sm:flex-wrap sm:justify-between">
          <p className="font-sans">
            © {year} {company.naam} — een handelsnaam van {company.entiteit} · KvK {company.kvk}
          </p>
          <p className="font-sans">
            Onderdeel van de{" "}
            <Link href="/mtb-bouw" className="underline underline-offset-2 hover:text-accent">
              MTB Bouw-familie
            </Link>{" "}
            ·{" "}
            <a href={MTB_URL} className="underline underline-offset-2 hover:text-accent">
              mtbbouw.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
