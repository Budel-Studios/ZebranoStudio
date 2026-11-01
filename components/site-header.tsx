"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Minus, Phone, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Wordmark } from "@/components/logo";
import { Arrow } from "@/components/ui/arrow";
import { button } from "@/components/ui/button";
import { company } from "@/data/company";
import { primaryCta, visibleNav, zakelijkLink, type NavGroup } from "@/lib/navigation";
import { cn } from "@/lib/utils";

const NAV = visibleNav();

/**
 * Menu bar from the Lovable design: a floating, hairline-framed bar — the
 * groups (Deuren · Collecties · Zebrano) and "Zakelijk" left, the wordmark in
 * the middle, phone and "Vraag een voorstel" right. Hovering a group opens a
 * mega panel (intro + CTA · numbered links · preview image); on small screens
 * the menu becomes a full-screen accordion.
 */
export function SiteHeader() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Close everything when the route changes (adjust state during render).
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpenId(null);
    setMobileOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenId(null);
        setMobileOpen(false);
      }
    };
    const raf = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const active = NAV.find((g) => g.id === openId) ?? null;

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4">
      <div onMouseLeave={() => setOpenId(null)} className="relative mx-auto max-w-[1600px]">
        <div
          className={cn(
            "relative z-10 grid h-14 grid-cols-[1fr_auto_1fr] items-stretch rounded-sm border bg-background/90 backdrop-blur-md transition-shadow duration-500",
            (scrolled || openId) && "shadow-[var(--shadow-soft)]",
            openId && "rounded-b-none border-b-transparent",
          )}
        >
          {/* Left: navigation */}
          <nav className="flex items-stretch" aria-label="Hoofdmenu">
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-expanded={mobileOpen}
              aria-controls="mobiel-menu"
              aria-label={mobileOpen ? "Menu sluiten" : "Menu openen"}
              className="flex items-center gap-3 border-r px-3 text-sm sm:px-4 lg:hidden"
            >
              <span className="relative block h-2.5 w-5" aria-hidden="true">
                <span
                  className={cn(
                    "absolute left-0 top-0 h-px w-5 bg-foreground transition-transform duration-500 ease-door",
                    mobileOpen && "translate-y-[5px] rotate-45",
                  )}
                />
                <span
                  className={cn(
                    "absolute bottom-0 left-0 h-px w-5 bg-foreground transition-transform duration-500 ease-door",
                    mobileOpen && "-translate-y-[4px] -rotate-45",
                  )}
                />
              </span>
              <span className="hidden sm:inline">{mobileOpen ? "Sluiten" : "Menu"}</span>
            </button>

            <ul className="hidden items-stretch pl-2 lg:flex">
              {NAV.map((group) => (
                <li key={group.id} className="flex">
                  <button
                    type="button"
                    onMouseEnter={() => setOpenId(group.id)}
                    onFocus={() => setOpenId(group.id)}
                    onClick={() => setOpenId(openId === group.id ? null : group.id)}
                    aria-expanded={openId === group.id}
                    className="flex items-center px-4 text-sm"
                  >
                    <span className="link-line" data-active={openId === group.id}>
                      {group.label}
                    </span>
                  </button>
                </li>
              ))}
              <li className="flex" onMouseEnter={() => setOpenId(null)}>
                <Link href={zakelijkLink.href} className="flex items-center px-4 text-sm">
                  <span className="link-line" data-active={pathname === zakelijkLink.href}>
                    {zakelijkLink.label}
                  </span>
                </Link>
              </li>
            </ul>
          </nav>

          {/* Center: logo */}
          <Link
            href="/"
            aria-label="Zebrano Studio, naar de homepage"
            onMouseEnter={() => setOpenId(null)}
            className="flex items-center px-3 text-[1.2rem] text-foreground sm:px-4 sm:text-[1.6rem]"
          >
            <Wordmark />
          </Link>

          {/* Right: actions */}
          <div className="flex items-stretch justify-end" onMouseEnter={() => setOpenId(null)}>
            <a
              href={`tel:${company.telefoonHref}`}
              className="flex items-center gap-2 px-3 text-sm sm:px-4"
              aria-label={`Bel ons: ${company.telefoon}`}
            >
              <Phone strokeWidth={1.25} className="size-4" aria-hidden />
              <span className="link-line hidden xl:inline">{company.telefoon}</span>
            </a>
            <div className="hidden items-center p-1.5 sm:flex">
              <Link href={primaryCta.href} className={cn(button({ size: "sm" }), "h-full rounded-[2px]")}>
                {primaryCta.label}
                <Arrow />
              </Link>
            </div>
          </div>
        </div>

        {/* Desktop mega panel */}
        {active && <MegaPanel key={active.id} group={active} />}
      </div>

      {/* Mobile menu */}
      {mobileOpen && <MobileMenu onNavigate={() => setMobileOpen(false)} />}
    </header>
  );
}

function MegaPanel({ group }: { group: NavGroup }) {
  const [preview, setPreview] = useState(0);
  const current = group.items[preview];

  return (
    <div className="absolute inset-x-0 top-full hidden animate-in fade-in slide-in-from-top-1 duration-300 lg:block">
      <div className="grid grid-cols-12 gap-10 rounded-b-sm border border-t bg-background px-10 py-10 shadow-[var(--shadow-soft)]">
        <div className="col-span-3 flex flex-col justify-between">
          <div>
            <p className="eyebrow">{group.label}</p>
            <p className="mt-5 max-w-[22ch] font-display text-2xl font-light leading-snug">{group.intro}</p>
          </div>
          <Link href={group.cta.href} className={cn(button({ variant: "outline", size: "sm" }), "mt-8 self-start")}>
            {group.cta.label}
            <Arrow />
          </Link>
        </div>

        <ul className="col-span-5 border-t">
          {group.items.map((item, i) => (
            <li key={item.label} className="border-b">
              <Link
                href={item.href}
                onMouseEnter={() => setPreview(i)}
                onFocus={() => setPreview(i)}
                className="group flex items-baseline gap-5 py-3.5"
              >
                <span className="w-6 text-[0.6875rem] tabular-nums text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="link-line font-display text-[1.375rem] font-light" data-active={preview === i}>
                  {item.label}
                </span>
                <Arrow
                  diagonal={false}
                  className={cn(
                    "ml-auto self-center text-muted-foreground opacity-0 transition-opacity duration-300 group-hover:opacity-100",
                    preview === i && "opacity-100",
                  )}
                />
              </Link>
            </li>
          ))}
        </ul>

        <div className="col-span-4">
          <div className="relative aspect-[4/5] max-h-[420px] w-full overflow-hidden rounded-sm bg-muted">
            {current?.image && (
              <Image
                key={current.label}
                src={current.image.src}
                alt={current.image.alt}
                fill
                sizes="(min-width: 1600px) 480px, 30vw"
                className="animate-in fade-in object-cover duration-700"
              />
            )}
          </div>
          {current?.note && <p className="mt-3 text-[0.8125rem] leading-relaxed text-muted-foreground">{current.note}</p>}
        </div>
      </div>
    </div>
  );
}

function MobileMenu({ onNavigate }: { onNavigate: () => void }) {
  const [expanded, setExpanded] = useState<string | null>("deuren");

  return (
    <div
      id="mobiel-menu"
      className="fixed inset-x-0 bottom-0 top-[4.75rem] z-40 animate-in fade-in overflow-y-auto bg-background px-5 pb-10 pt-4 duration-300 lg:hidden"
    >
      <ul className="border-t">
        {NAV.map((group) => {
          const isOpen = expanded === group.id;
          return (
            <li key={group.id} className="border-b">
              <button
                type="button"
                onClick={() => setExpanded(isOpen ? null : group.id)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between py-5 font-display text-3xl font-light"
              >
                {group.label}
                {isOpen ? <Minus strokeWidth={1} className="size-5" /> : <Plus strokeWidth={1} className="size-5" />}
              </button>
              {isOpen && (
                <ul className="animate-in fade-in pb-5 duration-300">
                  {group.items.map((item) => (
                    <li key={item.label}>
                      <Link href={item.href} onClick={onNavigate} className="block py-2 text-base text-foreground/80">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
        <li className="border-b">
          <Link href={zakelijkLink.href} onClick={onNavigate} className="block py-5 font-display text-3xl font-light">
            {zakelijkLink.label}
          </Link>
        </li>
      </ul>
      <div className="mt-8 flex flex-col gap-3">
        <Link href={primaryCta.href} onClick={onNavigate} className={button({ size: "lg" })}>
          {primaryCta.label} <Arrow />
        </Link>
        <a href={`tel:${company.telefoonHref}`} className={button({ variant: "outline", size: "lg" })}>
          <Phone strokeWidth={1.25} className="size-4" aria-hidden /> {company.telefoon}
        </a>
      </div>
    </div>
  );
}
