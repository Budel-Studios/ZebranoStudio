"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export const inputCls = "w-full rounded-sm border border-input bg-card px-3 py-2 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground";
export const btn = "inline-flex h-9 items-center justify-center gap-2 rounded-sm px-3.5 text-[0.8125rem] font-medium transition-colors disabled:pointer-events-none disabled:opacity-50";
export const btnPrimary = cn(btn, "bg-primary text-primary-foreground hover:bg-primary-hover");
export const btnOutline = cn(btn, "border border-foreground/30 hover:border-foreground");
export const btnGhost = cn(btn, "hover:bg-foreground/5");
export const iconBtn = "inline-flex h-8 w-8 items-center justify-center rounded-sm text-foreground/70 transition-colors hover:bg-foreground/5 hover:text-foreground disabled:pointer-events-none disabled:opacity-35";

export function Field({ label, hint, children, className }: { label: string; hint?: string; children: ReactNode; className?: string }) {
  return (
    <label className={cn("block", className)}>
      <span className="mb-1.5 block text-[0.8125rem] font-medium text-foreground/80">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">{hint}</span>}
    </label>
  );
}

export function Segmented<T extends string | number>({ value, options, onChange, className }: { value: T; options: Array<{ value: T; label: string }>; onChange: (v: T) => void; className?: string }) {
  return (
    <div className={cn("inline-flex flex-wrap gap-px overflow-hidden rounded-sm border border-foreground/15 bg-foreground/15", className)}>
      {options.map((o) => (
        <button key={String(o.value)} type="button" onClick={() => onChange(o.value)} aria-pressed={o.value === value}
          className={cn("grow px-3 py-1.5 text-[0.8125rem] transition-colors", o.value === value ? "bg-foreground text-background" : "bg-card hover:bg-linen")}>
          {o.label}
        </button>
      ))}
    </div>
  );
}

export function Scale({ value, onChange, min = 1, max = 5, left, right }: { value: number; onChange: (v: number) => void; min?: number; max?: number; left: string; right: string }) {
  return (
    <div>
      <input type="range" min={min} max={max} step={1} value={value} onChange={(e) => onChange(Number(e.target.value))} className="w-full accent-[var(--primary)]" />
      <div className="flex justify-between text-xs text-muted-foreground"><span>{left}</span><span>{right}</span></div>
    </div>
  );
}

export function Panel({ title, action, children, className }: { title?: string; action?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <section className={cn("border bg-card", className)}>
      {(title || action) && (
        <header className="flex items-center justify-between gap-3 border-b px-5 py-3.5">
          <h2 className="font-display text-xl">{title}</h2>
          {action}
        </header>
      )}
      <div className="p-5">{children}</div>
    </section>
  );
}

export function Dialog({ open, onClose, title, children, wide }: { open: boolean; onClose: () => void; title: string; children: ReactNode; wide?: boolean }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-ink/40 p-4 pt-[8vh] backdrop-blur-[2px]" onPointerDown={(e) => e.target === e.currentTarget && onClose()} role="dialog" aria-modal="true" aria-label={title}>
      <div className={cn("w-full border bg-background shadow-xl", wide ? "max-w-4xl" : "max-w-lg")}>
        <header className="flex items-center justify-between border-b px-6 py-4">
          <h2 className="font-display text-2xl">{title}</h2>
          <button type="button" onClick={onClose} className={iconBtn} aria-label="Sluiten">✕</button>
        </header>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

export const euro = (n: number) => new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);
