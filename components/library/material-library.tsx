"use client";

import { useSearchParams } from "next/navigation";
import { Check, Search, SlidersHorizontal, X } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { MaterialCard } from "@/components/library/material-card";
import { button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import {
  CATEGORIES,
  FILTER_GROUPS,
  MATERIALS,
  getCategory,
  materialValues,
  type FilterKey,
  type Material,
} from "@/data/materialenbibliotheek";
import { cn } from "@/lib/utils";

const toSlug = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

/**
 * Materialenbibliotheek — reads its state from the URL
 * (?categorie=glas&tint=licht,midden&stijl=japandi&toepassing=taatsdeuren&q=…),
 * so a filtered view can be shared. Within a group values are OR'ed, groups
 * are AND'ed (as on the old site).
 */
export function MaterialLibrary() {
  const params = useSearchParams();
  return <MaterialLibraryView search={params.toString()} />;
}

/** The library for a given query string; also the server-rendered fallback (no filters). */
export function MaterialLibraryView({ search }: { search: string }) {
  const params = useMemo(() => new URLSearchParams(search), [search]);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const category = params.get("categorie") ?? "";
  const query = params.get("q") ?? "";
  const selected = Object.fromEntries(
    FILTER_GROUPS.map((g) => [g.key, (params.get(g.key) ?? "").split(",").filter(Boolean)]),
  ) as Record<FilterKey, string[]>;
  const activeCount = FILTER_GROUPS.reduce((n, g) => n + selected[g.key].length, 0);

  const update = (mutate: (p: URLSearchParams) => void) => {
    const p = new URLSearchParams(search);
    mutate(p);
    const qs = p.toString();
    window.history.replaceState(null, "", qs ? `${window.location.pathname}?${qs}` : window.location.pathname);
  };

  const toggle = (key: FilterKey, value: string) =>
    update((p) => {
      const cur = (p.get(key) ?? "").split(",").filter(Boolean);
      const next = cur.includes(value) ? cur.filter((v) => v !== value) : [...cur, value];
      if (next.length) p.set(key, next.join(","));
      else p.delete(key);
    });

  const clearFilters = () =>
    update((p) => {
      FILTER_GROUPS.forEach((g) => p.delete(g.key));
      p.delete("q");
    });

  const matchesText = (m: Material) =>
    !query ||
    [m.name, m.code, m.description, getCategory(m.category).label].join(" ").toLowerCase().includes(query.toLowerCase());

  const matchesGroups = (m: Material, except?: FilterKey) =>
    FILTER_GROUPS.every((g) => {
      if (g.key === except) return true;
      const sel = selected[g.key];
      if (!sel.length) return true;
      const vals = materialValues(m, g.key).map(toSlug);
      return sel.some((s) => vals.includes(s));
    });

  const inCategory = MATERIALS.filter((m) => (!category || m.category === category) && matchesText(m));
  const results = inCategory.filter((m) => matchesGroups(m));
  const current = category ? CATEGORIES.find((c) => c.slug === category) : null;

  const chip =
    "inline-flex h-9 shrink-0 items-center gap-2 whitespace-nowrap rounded-sm border px-4 text-[0.8125rem] transition-colors duration-300";

  const filters = (
    <div className="space-y-9">
      {FILTER_GROUPS.map((g) => (
        <fieldset key={g.key}>
          <legend className="text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-muted-foreground">{g.title}</legend>
          <ul className="mt-3 border-t">
            {g.values.map((value) => {
              const v = toSlug(value);
              const on = selected[g.key].includes(v);
              // How many materials you'd see with this value, given the other filters.
              const count = inCategory.filter(
                (m) => matchesGroups(m, g.key) && materialValues(m, g.key).map(toSlug).includes(v),
              ).length;
              return (
                <li key={v} className="border-b">
                  <label
                    className={cn(
                      "flex cursor-pointer items-center gap-3 py-2.5 text-sm transition-colors has-[:focus-visible]:text-foreground",
                      !count && !on && "cursor-default text-muted-foreground/60",
                    )}
                  >
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={on}
                      disabled={!count && !on}
                      onChange={() => toggle(g.key, v)}
                    />
                    <span
                      aria-hidden
                      className={cn(
                        "grid size-4 shrink-0 place-items-center rounded-[2px] border transition-colors duration-300",
                        on ? "border-primary bg-primary text-primary-foreground" : "border-foreground/30",
                      )}
                    >
                      {on && <Check strokeWidth={2} className="size-3" />}
                    </span>
                    <span className="flex-1">{value}</span>
                    <span className="text-[0.75rem] tabular-nums text-muted-foreground">{count}</span>
                  </label>
                </li>
              );
            })}
          </ul>
        </fieldset>
      ))}
    </div>
  );

  return (
    <section className="mx-auto w-full max-w-[1600px] px-4 pb-24 pt-10 sm:px-8 lg:pb-32">
      {/* Categories + search */}
      <div className="flex flex-col gap-5 border-b pb-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 sm:-mx-8 sm:px-8 lg:mx-0 lg:flex-wrap lg:px-0" role="group" aria-label="Categorie">
          <button
            type="button"
            aria-pressed={!category}
            onClick={() => update((p) => p.delete("categorie"))}
            className={cn(chip, !category ? "border-primary bg-primary text-primary-foreground" : "border-foreground/20 hover:border-foreground")}
          >
            Alles <span className="tabular-nums opacity-60">{MATERIALS.filter(matchesText).length}</span>
          </button>
          {CATEGORIES.map((c) => {
            const on = category === c.slug;
            const n = MATERIALS.filter((m) => m.category === c.slug && matchesText(m)).length;
            return (
              <button
                key={c.slug}
                type="button"
                aria-pressed={on}
                onClick={() => update((p) => (on ? p.delete("categorie") : p.set("categorie", c.slug)))}
                className={cn(chip, on ? "border-primary bg-primary text-primary-foreground" : "border-foreground/20 hover:border-foreground")}
              >
                {c.label} <span className="tabular-nums opacity-60">{n}</span>
              </button>
            );
          })}
        </div>
        <label className="relative block w-full lg:w-72">
          <span className="sr-only">Zoek op naam of code</span>
          <Search strokeWidth={1.25} aria-hidden className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={query}
            onChange={(e) =>
              update((p) => {
                if (e.target.value) p.set("q", e.target.value);
                else p.delete("q");
              })
            }
            placeholder="Zoek op naam of code"
            className="h-9 w-full rounded-sm border border-foreground/20 bg-background pl-9 pr-3 text-[0.8125rem] outline-none transition-colors placeholder:text-muted-foreground/70 hover:border-foreground/40 focus:border-foreground"
          />
        </label>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-12">
        {/* Filters */}
        <aside className="lg:col-span-3">
          <button
            type="button"
            onClick={() => setFiltersOpen((v) => !v)}
            aria-expanded={filtersOpen}
            aria-controls="materiaal-filters"
            className={cn(button({ variant: "outline", size: "sm" }), "lg:hidden")}
          >
            <SlidersHorizontal strokeWidth={1.25} className="size-4" aria-hidden />
            Filters{activeCount > 0 && <span className="tabular-nums">({activeCount})</span>}
          </button>
          <div id="materiaal-filters" className={cn("mt-6 lg:sticky lg:top-28 lg:mt-0 lg:block", filtersOpen ? "block" : "hidden")}>
            <div className="mb-6 hidden items-center justify-between lg:flex">
              <p className="eyebrow">Filters</p>
              {(activeCount > 0 || query) && (
                <button type="button" onClick={clearFilters} className={button({ variant: "text" })}>
                  Wis filters
                </button>
              )}
            </div>
            {filters}
            <div className="mt-8 flex flex-wrap gap-3 lg:hidden">
              <button type="button" onClick={() => setFiltersOpen(false)} className={button({ size: "sm" })}>
                Toon {results.length} {results.length === 1 ? "materiaal" : "materialen"}
              </button>
              {(activeCount > 0 || query) && (
                <button type="button" onClick={clearFilters} className={button({ variant: "outline", size: "sm" })}>
                  Wis filters
                </button>
              )}
            </div>
          </div>
        </aside>

        {/* Results */}
        <div className="lg:col-span-9">
          {current && (
            <div className="mb-10 grid gap-4 border-b pb-8 sm:grid-cols-12">
              <h2 className="text-3xl sm:col-span-4">{current.label}</h2>
              <p className="leading-relaxed text-muted-foreground sm:col-span-8">{current.intro}</p>
            </div>
          )}

          <div className="mb-6 flex flex-wrap items-center gap-2 text-[0.8125rem]">
            <p className="mr-2 text-muted-foreground" aria-live="polite">
              <span className="tabular-nums text-foreground">{results.length}</span> {results.length === 1 ? "materiaal" : "materialen"}
            </p>
            {FILTER_GROUPS.flatMap((g) =>
              selected[g.key].map((v) => {
                const label = g.values.find((x) => toSlug(x) === v) ?? v;
                return (
                  <button
                    key={`${g.key}-${v}`}
                    type="button"
                    onClick={() => toggle(g.key, v)}
                    className="inline-flex h-7 items-center gap-1.5 rounded-sm border border-foreground/20 px-2.5 transition-colors hover:border-foreground"
                  >
                    {label}
                    <X strokeWidth={1.25} className="size-3.5" aria-label={`Filter ${label} weghalen`} />
                  </button>
                );
              }),
            )}
          </div>

          {results.length > 0 ? (
            <ul className="grid gap-x-5 gap-y-12 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((m, i) => (
                <Reveal as="li" key={m.slug} delay={(i % 3) * 60}>
                  <MaterialCard material={m} priority={i < 3} />
                </Reveal>
              ))}
            </ul>
          ) : (
            <div className="rounded-sm border px-6 py-16 text-center">
              <p className="font-display text-2xl font-light">Geen materialen met deze combinatie.</p>
              <p className="mt-3 text-muted-foreground">Haal een filter weg of begin opnieuw.</p>
              <button type="button" onClick={clearFilters} className={cn(button({ variant: "outline", size: "sm" }), "mt-6")}>
                Wis filters
              </button>
            </div>
          )}

          <p className="mt-16 border-t pt-6 text-sm text-muted-foreground">
            Mis je een materiaal? Vertel ons wat je zoekt, dan kijken we wat er kan.{" "}
            <Link href="/contact" className="link-line text-foreground">
              Neem contact op
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
