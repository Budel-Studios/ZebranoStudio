import Link from "next/link";
import type { ReactNode } from "react";
import { GiantWordmark } from "@/components/logo";
import { button } from "@/components/ui/button";
import { BRAND } from "@/lib/brand";
import { container } from "@/components/ui/primitives";
import { footerColumns, primaryCta } from "@/lib/navigation";
import { cn } from "@/lib/utils";

function ColTitle({ children }: { children: ReactNode }) {
  return <p className="mb-4 text-sm font-semibold text-cloth-foreground">{children}</p>;
}

/**
 * Footer: the inside of the back cover. Deep cloth with the weave, three link
 * columns and contact, the giant stamped wordmark and the legal line. Company
 * details (KvK, address) are not known yet and are deliberately absent.
 */
export function SiteFooter() {
  return (
    <footer className="cloth-weave bg-cloth-deep text-cloth-foreground">
      <div className={cn(container, "pt-16 lg:pt-20")}>
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="max-w-[9ch] font-display text-h2 leading-[1.02] tracking-[-0.015em]">{BRAND.tagline}</p>
            <Link href={primaryCta.href} className={cn(button({ variant: "light", size: "md" }), "mt-8")}>
              {primaryCta.label}
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-4 lg:col-span-8">
            {footerColumns.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <ColTitle>{col.title}</ColTitle>
                <ul className="space-y-2.5 text-[0.9375rem] text-cloth-muted">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link href={l.href} className="hover:text-cloth-foreground hover:underline hover:underline-offset-4">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
            <div>
              <ColTitle>Contact</ColTitle>
              <div className="space-y-2.5 text-[0.9375rem] text-cloth-muted">
                <p>
                  <a href={`mailto:${BRAND.email}`} className="break-all hover:text-cloth-foreground hover:underline hover:underline-offset-4">
                    {BRAND.email}
                  </a>
                </p>
                <p>
                  <Link href="/contact" className="hover:text-cloth-foreground hover:underline hover:underline-offset-4">
                    Contactformulier
                  </Link>
                </p>
                <p>Gedrukt en gebonden in Italië door {BRAND.printer}</p>
              </div>
            </div>
          </div>
        </div>

        <Link href="/" aria-label={`${BRAND.name}, naar de homepage`} className="mt-16 block border-t border-cloth-line pt-12 lg:mt-20">
          <GiantWordmark />
        </Link>

        <div className="mt-12 flex flex-col gap-4 border-t border-cloth-line py-7 text-sm text-cloth-muted sm:flex-row sm:items-center sm:justify-between">
          <ul className="flex gap-6">
            {[
              ["Privacy", "/privacy"],
              ["Voorwaarden", "/voorwaarden"],
              ["Studio", "/studio"],
            ].map(([label, href]) => (
              <li key={href}>
                <Link href={href!} className="hover:text-cloth-foreground hover:underline hover:underline-offset-4">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <p>
            © {new Date().getFullYear()} {BRAND.name}, {BRAND.descriptor.toLowerCase()}
          </p>
        </div>
      </div>
    </footer>
  );
}
