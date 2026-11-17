"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogIn, Minus, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Wordmark } from "@/components/logo";
import { AccessoryArt } from "@/components/site/accessory-art";
import { BookCover, SampleSpread } from "@/components/site/book-mock";
import { button } from "@/components/ui/button";
import { container } from "@/components/ui/primitives";
import { materialen } from "@/data/boek";
import { BRAND } from "@/lib/brand";
import { NAV, primaryCta, studioLink, type NavGroup, type NavPreview } from "@/lib/navigation";
import { cn } from "@/lib/utils";

/**
 * Menu bar: a floating paper bar with square corners, in line with the page
 * gutters (the ribbon marker hangs beside it). The four groups left, the
 * wordmark in the middle, the studio login and the ribbon button "Vraag een
 * voorstel" right. Hovering a group opens a mega panel (intro and action,
 * links, drawn preview); on small screens the menu becomes a full-screen
 * accordion.
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
    <header className={cn(container, "fixed inset-x-0 top-0 z-50 max-sm:px-3 pt-3 sm:pt-4")}>
      <div onMouseLeave={() => setOpenId(null)} className="relative">
        <div
          className={cn(
            "relative z-10 grid h-14 grid-cols-[1fr_auto_1fr] items-stretch border bg-background transition-shadow duration-300",
            (scrolled || openId) && "shadow-[var(--shadow-soft)]",
            openId && "border-b-transparent",
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
              className="flex items-center gap-3 border-r px-3 text-sm sm:px-4 xl:hidden"
            >
              <span className="relative block h-2.5 w-5" aria-hidden="true">
                <span className={cn("absolute left-0 top-0 h-px w-5 bg-foreground transition-transform duration-300 ease-page", mobileOpen && "translate-y-[5px] rotate-45")} />
                <span className={cn("absolute bottom-0 left-0 h-px w-5 bg-foreground transition-transform duration-300 ease-page", mobileOpen && "-translate-y-[4px] -rotate-45")} />
              </span>
              <span className="hidden sm:inline">{mobileOpen ? "Sluiten" : "Menu"}</span>
            </button>

            <ul className="hidden items-stretch pl-2 xl:flex">
              {NAV.map((group) => (
                <li key={group.id} className="flex">
                  <button
                    type="button"
                    onMouseEnter={() => setOpenId(group.id)}
                    onFocus={() => setOpenId(group.id)}
                    onClick={() => setOpenId(openId === group.id ? null : group.id)}
                    aria-expanded={openId === group.id}
                    className="group flex items-center px-4 text-[0.9375rem]"
                  >
                    <span className="underline decoration-transparent decoration-1 underline-offset-[0.35em] transition-colors duration-200 group-hover:decoration-current data-[active=true]:decoration-current" data-active={openId === group.id}>
                      {group.label}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Center: logo */}
          <Link
            href="/"
            aria-label={`${BRAND.name}, naar de homepage`}
            onMouseEnter={() => setOpenId(null)}
            className="flex items-center px-3 text-[1.5rem] text-foreground sm:px-4 sm:text-[1.625rem]"
          >
            <Wordmark />
          </Link>

          {/* Right: actions */}
          <div className="flex items-stretch justify-end" onMouseEnter={() => setOpenId(null)}>
            <Link href={studioLink.href} className="group flex items-center gap-2 px-3 text-[0.9375rem] sm:px-4" aria-label={studioLink.label}>
              <LogIn strokeWidth={1.5} className="size-4" aria-hidden />
              <span className="hidden underline decoration-transparent decoration-1 underline-offset-[0.35em] transition-colors duration-200 group-hover:decoration-current data-[active=true]:decoration-current md:inline">{studioLink.label}</span>
            </Link>
            <div className="hidden items-center p-1.5 sm:flex">
              <Link href={primaryCta.href} className={cn(button({ size: "sm" }), "h-full")}>
                {primaryCta.label}
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

/** The drawn preview for a menu item (stands in for a photograph). */
function Preview({ preview }: { preview: NavPreview }) {
  if (preview.type === "spread") return <SampleSpread kind={preview.kind} className="w-[86%]" />;
  if (preview.type === "accessoire") return <AccessoryArt id={preview.id} className="w-[78%]" />;
  if (preview.type === "cover") {
    const m = materialen.find((x) => x.id === preview.material) ?? materialen[0]!;
    return <BookCover color={m.color} texture={m.texture} className="w-[48%]" />;
  }
  return (
    <div className="flex w-[86%] flex-col gap-3">
      <SampleSpread kind="opener" />
      <div className="grid grid-cols-2 gap-3">
        <SampleSpread kind="geloften" />
        <SampleSpread kind="quote" />
      </div>
    </div>
  );
}

function MegaPanel({ group }: { group: NavGroup }) {
  const [preview, setPreview] = useState(0);
  const current = group.items[preview];

  return (
    <div className="absolute inset-x-0 top-full hidden xl:block">
      <div className="grid grid-cols-12 gap-10 border border-t bg-background px-10 py-10 shadow-[var(--shadow-soft)]">
        <div className="col-span-3 flex flex-col justify-between">
          <p className="max-w-[20ch] font-display text-h3 leading-[1.15]">{group.intro}</p>
          <Link href={group.cta.href} className={cn(button({ variant: "outline", size: "sm" }), "mt-8 self-start")}>
            {group.cta.label}
          </Link>
        </div>

        <ul className="col-span-5 self-start border-t">
          {group.items.map((item, i) => (
            <li key={item.label} className="border-b">
              <Link
                href={item.href}
                onMouseEnter={() => setPreview(i)}
                onFocus={() => setPreview(i)}
                className={cn("block py-3.5 font-display text-2xl leading-tight transition-colors duration-200", preview === i ? "text-cloth" : "text-foreground")}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="col-span-4">
          <div className="relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden bg-linen">
            {current && (
              <div key={current.label} className="flex w-full items-center justify-center">
                <Preview preview={current.preview} />
              </div>
            )}
          </div>
          {current?.note && <p className="mt-3 text-small text-muted-foreground">{current.note}</p>}
        </div>
      </div>
    </div>
  );
}

function MobileMenu({ onNavigate }: { onNavigate: () => void }) {
  const [expanded, setExpanded] = useState<string | null>(NAV[0]?.id ?? null);

  return (
    <div
      id="mobiel-menu"
      className="fixed inset-x-0 bottom-0 top-[4.75rem] z-40 overflow-y-auto bg-background px-5 pb-10 pt-4 sm:top-20 sm:px-[clamp(3rem,7.5vw,7.5rem)] xl:hidden"
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
                className="flex w-full items-center justify-between py-5 text-left font-display text-[2rem] leading-none"
              >
                {group.label}
                {isOpen ? <Minus strokeWidth={1.5} className="size-5" aria-hidden /> : <Plus strokeWidth={1.5} className="size-5" aria-hidden />}
              </button>
              {isOpen && (
                <ul className="pb-5">
                  {group.items.map((item) => (
                    <li key={item.label}>
                      <Link href={item.href} onClick={onNavigate} className="block py-2 text-base text-foreground/80">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link href={group.cta.href} onClick={onNavigate} className="link-line mt-2 inline-block py-2 text-base font-medium">
                      {group.cta.label}
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          );
        })}
      </ul>
      <div className="mt-8 flex flex-col gap-3">
        <Link href={primaryCta.href} onClick={onNavigate} className={button({ size: "lg" })}>
          {primaryCta.label}
        </Link>
        <Link href={studioLink.href} onClick={onNavigate} className={button({ variant: "outline", size: "lg" })}>
          <LogIn strokeWidth={1.5} className="size-4" aria-hidden /> {studioLink.label}
        </Link>
      </div>
    </div>
  );
}
