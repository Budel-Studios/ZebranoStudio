"use client";

import { ImagePlus } from "lucide-react";
import { useRef, type CSSProperties, type PointerEvent as RPointerEvent } from "react";
import { fontPairOf, formatOf, paletteOf } from "@/lib/book/catalog";
import { sizeMm, TYPE_SCALE } from "@/lib/book/typography";
import type { Frame, ImageFrame, Spread, StyleParams, TextFrame } from "@/lib/book/types";
import { cn } from "@/lib/utils";
import { usePhotoUrl } from "./use-photo-url";

interface Props {
  spread: Spread;
  formatId: string;
  style: StyleParams;
  className?: string;
  /** Editing: selection, moving, resizing, dropping photos. */
  selectedId?: string;
  onSelect?: (id: string | undefined) => void;
  onFrameChange?: (frame: Frame, commit: boolean) => void;
  onDropPhoto?: (frameId: string, photoId: string) => void;
  /** Safe zone and fold. */
  guides?: { safeMm: number };
  /** Print: full-resolution files and bleed around the trim size. */
  print?: { bleedMm: number };
}

const EDGE = 0.05;

/**
 * Renders one spread. All sizes derive from `--mm` (one millimetre of the
 * book in CSS pixels), so the same markup serves thumbnails, the editor and
 * print at true size.
 */
export function SpreadView({ spread, formatId, style, className, selectedId, onSelect, onFrameChange, onDropPhoto, guides, print }: Props) {
  const f = formatOf(formatId);
  const pal = paletteOf(style.palette);
  const ref = useRef<HTMLDivElement>(null);
  const bg = spread.background === "dark" ? pal.dark : spread.background === "tint" ? pal.tint : pal.paper;
  const editable = Boolean(onFrameChange);
  const darkBlocks = spread.frames.filter((fr) => fr.kind === "block" && fr.tone !== "tint");

  const onDark = (fr: Frame) => {
    const cx = fr.x + fr.w / 2, cy = fr.y + fr.h / 2;
    const inBlock = darkBlocks.some((b) => cx >= b.x && cx <= b.x + b.w && cy >= b.y && cy <= b.y + b.h);
    return inBlock || (spread.background === "dark" && !spread.frames.some((b) => b.kind === "block" && b.tone === "tint" && cx >= b.x && cx <= b.x + b.w));
  };

  const drag = (e: RPointerEvent, fr: Frame, mode: "move" | "resize") => {
    if (!onFrameChange || !ref.current) return;
    e.stopPropagation();
    e.preventDefault();
    onSelect?.(fr.id);
    const box = ref.current.getBoundingClientRect();
    const sx = e.clientX, sy = e.clientY;
    const snap = (v: number) => Math.round(v * 4) / 4;
    let last = fr;
    const move = (ev: PointerEvent) => {
      const dx = ((ev.clientX - sx) / box.width) * 100, dy = ((ev.clientY - sy) / box.height) * 100;
      last = mode === "move"
        ? { ...fr, x: snap(Math.min(100 - fr.w, Math.max(0, fr.x + dx))), y: snap(Math.min(100 - fr.h, Math.max(0, fr.y + dy))) }
        : { ...fr, w: snap(Math.min(100 - fr.x, Math.max(3, fr.w + dx))), h: snap(Math.min(100 - fr.y, Math.max(3, fr.h + dy))) };
      onFrameChange(last, false);
    };
    const up = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      if (last !== fr) onFrameChange(last, true);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  };

  const box = (fr: Frame): CSSProperties => {
    // In print, frames that touch the trim edge run on into the bleed.
    const b = fr.kind === "text" ? 0 : (print?.bleedMm ?? 0);
    const l = b && fr.x <= EDGE, t = b && fr.y <= EDGE, r = b && fr.x + fr.w >= 100 - EDGE, bt = b && fr.y + fr.h >= 100 - EDGE;
    return {
      left: `calc(${fr.x}% - ${l ? b : 0} * var(--mm))`,
      top: `calc(${fr.y}% - ${t ? b : 0} * var(--mm))`,
      width: `calc(${fr.w}% + ${(l ? b : 0) + (r ? b : 0)} * var(--mm))`,
      height: `calc(${fr.h}% + ${(t ? b : 0) + (bt ? b : 0)} * var(--mm))`,
    };
  };

  return (
    <div
      ref={ref}
      className={cn("lg-spread relative select-none", !print && "overflow-hidden", className)}
      style={{ aspectRatio: `${f.pageW * 2} / ${f.pageH}`, containerType: "inline-size", background: bg, ["--mm" as string]: `calc(100cqw / ${f.pageW * 2})` }}
      onPointerDown={editable ? () => onSelect?.(undefined) : undefined}
    >
      {print && <div className="absolute" style={{ inset: `calc(${-print.bleedMm} * var(--mm))`, background: bg }} />}
      {spread.frames.map((fr) => {
        const selected = fr.id === selectedId;
        return (
          <div
            key={fr.id}
            className={cn("absolute", editable && "cursor-move", editable && fr.kind !== "block" && "hover:outline hover:outline-1 hover:outline-sky-500/60", selected && "outline outline-2 outline-sky-500 z-10")}
            style={box(fr)}
            onPointerDown={editable ? (e) => drag(e, fr, "move") : undefined}
            onDragOver={onDropPhoto && fr.kind === "image" ? (e) => e.preventDefault() : undefined}
            onDrop={onDropPhoto && fr.kind === "image" ? (e) => {
              e.preventDefault();
              const id = e.dataTransfer.getData("text/photo-id");
              if (id) onDropPhoto(fr.id, id);
            } : undefined}
          >
            {fr.kind === "image" && <ImageBox frame={fr} full={Boolean(print)} tint={pal.tint} ink={pal.ink} />}
            {fr.kind === "text" && <TextBox frame={fr} formatId={formatId} style={style} dark={onDark(fr)} editable={editable} />}
            {fr.kind === "block" && <div className="h-full w-full" style={{ background: fr.tone === "dark" ? pal.dark : fr.tone === "accent" ? pal.accent : pal.tint }} />}
            {selected && editable && (
              <div className="absolute -bottom-1.5 -right-1.5 h-3 w-3 cursor-nwse-resize rounded-full border border-white bg-sky-500" onPointerDown={(e) => drag(e, fr, "resize")} />
            )}
          </div>
        );
      })}
      {guides && (
        <>
          <div className="pointer-events-none absolute inset-y-0 left-1/2 w-px bg-black/15" />
          <div className="pointer-events-none absolute border border-dashed border-rose-500/40" style={{ inset: `calc(${guides.safeMm} * var(--mm))` }} />
        </>
      )}
    </div>
  );
}

function ImageBox({ frame, full, tint, ink }: { frame: ImageFrame; full: boolean; tint: string; ink: string }) {
  const url = usePhotoUrl(frame.photoId, full ? "full" : "preview");
  if (!url) {
    return (
      <div className="flex h-full w-full items-center justify-center" style={{ background: tint, color: ink, outline: frame.photoId ? undefined : "1px dashed color-mix(in srgb, currentColor 35%, transparent)", outlineOffset: -1 }}>
        {!frame.photoId && <ImagePlus className="h-[12%] min-h-3 w-auto opacity-40" strokeWidth={1.25} />}
      </div>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element -- object URLs from IndexedDB, not optimisable
    <img src={url} alt="" draggable={false} className="pointer-events-none h-full w-full object-cover" style={{ objectPosition: `${frame.fx * 100}% ${frame.fy * 100}%`, filter: frame.bw ? "grayscale(1) contrast(1.05)" : undefined }} />
  );
}

const ROLE_HINT: Record<TextFrame["role"], string> = { title: "Titel", subtitle: "Ondertitel", kicker: "Bovenkop", body: "Tekst", list: "Lijst", quote: "Citaat", attribution: "Naam", caption: "Bijschrift", script: "Handschrift" };

function TextBox({ frame, formatId, style, dark, editable }: { frame: TextFrame; formatId: string; style: StyleParams; dark: boolean; editable: boolean }) {
  const pal = paletteOf(style.palette);
  const fonts = fontPairOf(style.fontPair);
  const size = sizeMm(frame, formatId);
  const color = dark ? pal.onDark : pal.ink;
  const base: CSSProperties = {
    fontSize: `calc(${size} * var(--mm))`,
    lineHeight: TYPE_SCALE[frame.role].leading,
    textAlign: frame.align,
    color,
    whiteSpace: "pre-line",
  };
  const display: CSSProperties = {
    fontFamily: fonts.display,
    fontWeight: fonts.displayWeight,
    fontStyle: fonts.displayStyle === "italic" ? "italic" : undefined,
    textTransform: fonts.displayStyle === "caps" ? "uppercase" : undefined,
    letterSpacing: fonts.displayStyle === "caps" ? "0.12em" : "-0.01em",
  };
  const small: CSSProperties = { fontFamily: fonts.text, textTransform: "uppercase", letterSpacing: "0.24em", color: dark ? pal.onDark : pal.accent };
  const byRole: Record<TextFrame["role"], CSSProperties> = {
    title: { ...display, ...(fonts.displayStyle === "caps" ? { fontSize: `calc(${size * 0.72} * var(--mm))`, lineHeight: 1.2 } : {}) },
    subtitle: { fontFamily: fonts.text, fontStyle: "italic", opacity: 0.8 },
    kicker: small,
    attribution: small,
    body: { fontFamily: fonts.text, hyphens: "auto", columnCount: frame.columns, columnGap: "calc(6 * var(--mm))" },
    list: { fontFamily: fonts.text, columnCount: frame.columns, columnGap: "calc(10 * var(--mm))" },
    quote: { fontFamily: fonts.display, fontStyle: "italic", fontWeight: fonts.displayWeight, letterSpacing: "-0.005em" },
    caption: { fontFamily: fonts.text, fontStyle: "italic", opacity: 0.75 },
    script: { fontFamily: fonts.script, color: dark ? pal.onDark : pal.accent },
  };
  return (
    <div className="flex h-full w-full flex-col overflow-hidden" style={{ justifyContent: frame.valign === "middle" ? "center" : frame.valign === "bottom" ? "flex-end" : "flex-start" }} lang="nl">
      <div className={cn(frame.dropCap && frame.text.length > 200 && "lg-dropcap")} style={{ ...base, ...byRole[frame.role] }}>
        {/* The hint for an empty frame exists only on the editing canvas, never in proof or print. */}
        {frame.text || (editable ? <span style={{ opacity: 0.35 }}>{ROLE_HINT[frame.role]}</span> : "")}
      </div>
    </div>
  );
}
