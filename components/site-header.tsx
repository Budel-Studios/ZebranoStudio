"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState, type CSSProperties } from "react";
import { MinusIcon, PhoneIcon, PlusIcon, ArrowUpRightIcon } from "@/components/icons";
import { PillLink } from "@/components/ui/pill-link";
import { company } from "@/data/company";
import { primaryCta, visibleMenuColumns, zakelijkLink } from "@/lib/navigation";
import { cn } from "@/lib/utils";

const columns = visibleMenuColumns();

/**
 * Site header — a 1:1 rebuild of the original Zebrano Studio menu:
 * a floating, boxed bar ([☰ Menu] [Zakelijk] — logo — [CTA] [bel]) that
 * unfolds into a five-column panel (desktop) or an accordion (mobile).
 * Column items fade up one after another, the hamburger folds into a cross
 * and "Menu" rolls into "Sluiten" — the same motion as the original GSAP
 * version, done with CSS transitions only.
 *
 * All menu links are in the server HTML (the panel is collapsed and `inert`,
 * not removed), so crawlers see the full navigation.
 */
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<number | null>(null);
  const pathname = usePathname();
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);

  const close = () => setOpen(false);

  // Esc closes the menu and returns focus to the menu button.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Lock page scroll while the menu is open.
  useEffect(() => {
    if (!open) return;
    const html = document.documentElement;
    const previous = html.style.overflow;
    html.style.overflow = "hidden";
    return () => {
      html.style.overflow = previous;
    };
  }, [open]);

  // Staggered fade-up of the desktop column items, in reading order.
  let order = 0;
  const reveal = (): { className: string; style: CSSProperties } => {
    const i = order++;
    return {
      className: cn(
        "transition-[opacity,translate] duration-500 ease-soft",
        open ? "translate-y-0 opacity-100" : "translate-y-[30px] opacity-0",
      ),
      style: { transitionDelay: open ? `${160 + i * 22}ms` : "0ms" },
    };
  };

  const isActive = (href: string) => pathname === href;

  return (
    <>
      {/* Dimmed page behind the open menu (original: #313030 at 61%). */}
      <div
        aria-hidden
        onClick={close}
        className={cn(
          "fixed inset-0 z-40 bg-[rgb(49_48_48/0.61)] transition-opacity duration-300",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />

      <header data-menu-open={open} className="fixed inset-x-0 top-0 z-50 p-3">
        {/* ── Menu bar ─────────────────────────────────────────────── */}
        <div
          className={cn(
            "relative flex h-[50px] items-center justify-between border border-line bg-paper text-ink transition-[border-radius] duration-300",
            open ? "rounded-t-lg" : "rounded-lg",
          )}
        >
          <div className="flex h-full items-center">
            <button
              ref={buttonRef}
              type="button"
              aria-expanded={open}
              aria-controls={panelId}
              aria-label={open ? "Menu sluiten" : "Menu openen"}
              onClick={() => setOpen((v) => !v)}
              className={cn(
                "flex h-full items-center gap-2 rounded-tl-lg border-r border-line pl-4 pr-4 transition-colors duration-300 hover:bg-hover-strong md:pr-3",
                open ? "bg-hover-strong" : "rounded-bl-lg",
              )}
            >
              <span className="menu-toggle" aria-hidden />
              <span className="relative hidden h-5 w-[58px] overflow-hidden text-[15px] font-medium leading-5 md:block" aria-hidden>
                <span
                  className={cn(
                    "absolute left-0 top-0 transition-transform duration-500 ease-zebrano",
                    open ? "-translate-y-full" : "translate-y-0",
                  )}
                >
                  Menu
                </span>
                <span
                  className={cn(
                    "absolute left-0 top-0 transition-transform duration-500 ease-zebrano",
                    open ? "translate-y-0" : "translate-y-full",
                  )}
                >
                  Sluiten
                </span>
              </span>
            </button>
            <Link
              href={zakelijkLink.href}
              onClick={close}
              className="hidden h-full items-center border-r border-line px-4 transition-colors duration-300 hover:bg-hover md:flex"
            >
              {zakelijkLink.label}
            </Link>
          </div>

          <Link
            href="/"
            onClick={close}
            aria-label="Zebrano Studio — naar de homepage"
            className="absolute left-1/2 -translate-x-1/2"
          >
            {/* Header lockup traced from the original site's header logo; the
                official .ai lockup is used in the footer (components/logo.tsx). */}
            <Image
              src="/brand/logo-header.svg"
              alt="Zebrano Studio"
              width={272}
              height={30}
              unoptimized
              priority
              className="h-[20px] w-auto sm:h-[26px] md:h-[30px]"
            />
          </Link>

          <div className="flex h-full items-center">
            <Link
              href={primaryCta.href}
              onClick={close}
              className="group hidden h-full items-center gap-2 border-l border-line bg-forest px-4 text-[15px] text-paper transition-colors duration-300 hover:bg-forest-hover lg:flex"
            >
              {primaryCta.label}
              <span className="pill-arrow" aria-hidden>
                <ArrowUpRightIcon />
                <ArrowUpRightIcon />
              </span>
            </Link>
            <a
              href={`tel:${company.telefoonHref}`}
              aria-label={`Bel Zebrano Studio: ${company.telefoon}`}
              className="flex h-full items-center justify-center rounded-r-lg border-l border-line px-3.5 transition-colors duration-300 hover:bg-hover"
            >
              <PhoneIcon className="size-5" />
            </a>
          </div>
        </div>

        {/* ── Menu panel ───────────────────────────────────────────── */}
        <div
          id={panelId}
          inert={!open}
          className={cn(
            "grid transition-[grid-template-rows] duration-500 ease-zebrano",
            open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
          )}
        >
          <div className="min-h-0 overflow-hidden">
            <nav
              aria-label="Hoofdmenu"
              className="max-h-[calc(100dvh-74px)] overflow-y-auto rounded-b-lg border-x border-b border-line bg-paper text-ink"
            >
              {/* Desktop: five columns */}
              <div className="mx-auto hidden w-full max-w-7xl grid-cols-5 lg:grid">
                {columns.map((col) => {
                  const headingId = `${panelId}-${col.title}`;
                  const h = reveal();
                  return (
                    <div
                      key={col.title}
                      className="flex flex-col justify-between border-r border-line px-[38px] py-[45px] last:border-r-0"
                    >
                      <div className="flex flex-col">
                        <span
                          id={headingId}
                          style={h.style}
                          className={cn(
                            "mb-5 whitespace-nowrap font-display text-2xl font-medium uppercase",
                            h.className,
                          )}
                        >
                          {col.title}
                        </span>
                        <ul aria-labelledby={headingId} className="mb-6 space-y-2">
                          {col.links.map((link) => {
                            const r = reveal();
                            return (
                              <li key={link.href} className={r.className} style={r.style}>
                                <Link
                                  href={link.href}
                                  onClick={close}
                                  aria-current={isActive(link.href) ? "page" : undefined}
                                  className={cn(
                                    "text-base transition-colors duration-150 hover:text-accent",
                                    isActive(link.href) && "text-accent",
                                  )}
                                >
                                  {link.label}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                        {col.pill &&
                          (() => {
                            const r = reveal();
                            return (
                              <div className={cn("mt-2", r.className)} style={r.style}>
                                <PillLink href={col.pill.href} onClick={close}>
                                  {col.pill.label}
                                </PillLink>
                              </div>
                            );
                          })()}
                      </div>
                      {(() => {
                        const r = reveal();
                        return (
                          <div
                            className={cn("relative mt-6 aspect-square w-full overflow-hidden rounded-lg", r.className)}
                            style={r.style}
                          >
                            <Image
                              src={col.image.src}
                              alt={col.image.alt}
                              fill
                              sizes="(min-width: 1280px) 180px, 14vw"
                              className="object-cover transition-transform duration-500 hover:scale-[1.05]"
                            />
                          </div>
                        );
                      })()}
                    </div>
                  );
                })}
              </div>

              {/* Mobile & tablet: accordion */}
              <div className="mx-auto w-full max-w-md lg:hidden">
                {columns.map((col, idx) => {
                  const expanded = openGroup === idx;
                  const listId = `${panelId}-m-${idx}`;
                  return (
                    <div key={col.title} className="border-b border-sage px-4 py-5">
                      <button
                        type="button"
                        aria-expanded={expanded}
                        aria-controls={listId}
                        onClick={() => setOpenGroup(expanded ? null : idx)}
                        className="flex w-full items-center justify-between text-left"
                      >
                        <span className="font-display text-xl font-medium">{col.title}</span>
                        {expanded ? <MinusIcon className="size-5" /> : <PlusIcon className="size-5" />}
                      </button>
                      <div
                        id={listId}
                        inert={!expanded}
                        className={cn(
                          "grid transition-[grid-template-rows] duration-500 ease-zebrano",
                          expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                        )}
                      >
                        <div className="min-h-0 overflow-hidden">
                          <ul className="space-y-1 pt-4">
                            {col.links.map((link) => (
                              <li key={link.href}>
                                <Link
                                  href={link.href}
                                  onClick={close}
                                  aria-current={isActive(link.href) ? "page" : undefined}
                                  className={cn(
                                    "block py-1 text-base transition-colors hover:text-accent",
                                    isActive(link.href) && "text-accent",
                                  )}
                                >
                                  {link.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                          {col.pill && (
                            <div className="pb-1 pt-3">
                              <PillLink href={col.pill.href} onClick={close} size="lg">
                                {col.pill.label}
                              </PillLink>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-6">
                  <Link
                    href={zakelijkLink.href}
                    onClick={close}
                    className="rounded-md border border-line bg-hover-strong/60 px-6 py-2 transition-colors hover:bg-hover"
                  >
                    {zakelijkLink.label}
                  </Link>
                  <PillLink href={primaryCta.href} onClick={close}>
                    {primaryCta.label}
                  </PillLink>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
}
