import { formatOf } from "./catalog";
import type { TextFrame, TextRole } from "./types";

/** Type scale in points for a 300 mm high page; other formats scale with it. */
export const TYPE_SCALE: Record<TextRole, { pt: number; leading: number }> = {
  title: { pt: 60, leading: 1.04 },
  subtitle: { pt: 15, leading: 1.35 },
  kicker: { pt: 9, leading: 1.4 },
  body: { pt: 11, leading: 1.56 },
  list: { pt: 12.5, leading: 1.9 },
  quote: { pt: 40, leading: 1.18 },
  attribution: { pt: 9, leading: 1.4 },
  caption: { pt: 9, leading: 1.5 },
  script: { pt: 44, leading: 1.1 },
};

const PT_MM = 0.3528;

/** Font size of a text frame in mm for a given format. */
export function sizeMm(frame: Pick<TextFrame, "role" | "scale">, formatId: string): number {
  const f = formatOf(formatId);
  const k = Math.min(f.pageH, f.pageW * 1.15) / 300;
  return TYPE_SCALE[frame.role].pt * PT_MM * k * (frame.scale ?? 1);
}

/** Rough number of characters that fit in a frame — for splitting and warnings. */
export function capacity(frame: Pick<TextFrame, "role" | "scale" | "w" | "h" | "columns">, formatId: string): number {
  const f = formatOf(formatId);
  const size = sizeMm(frame, formatId);
  const wMm = (frame.w / 100) * f.pageW * 2;
  const hMm = (frame.h / 100) * f.pageH;
  const cols = frame.columns ?? 1;
  const colW = (wMm - (cols - 1) * 6) / cols;
  const perLine = colW / (size * 0.43);
  const lines = Math.floor(hMm / (size * TYPE_SCALE[frame.role].leading));
  return Math.max(0, Math.floor(perLine * lines * cols * 0.92));
}

/** Splits long text on paragraph, then sentence boundaries into parts of at most `max` chars. */
export function splitText(text: string, max: number): string[] {
  const clean = text.trim();
  if (clean.length <= max || max < 80) return [clean];
  const parts: string[] = [];
  let rest = clean;
  while (rest.length > max) {
    const window = rest.slice(0, max);
    let cut = window.lastIndexOf("\n\n");
    if (cut < max * 0.5) cut = Math.max(window.lastIndexOf(". "), window.lastIndexOf("! "), window.lastIndexOf("? ")) + 1;
    if (cut < max * 0.4) cut = window.lastIndexOf(" ");
    if (cut <= 0) cut = max;
    parts.push(rest.slice(0, cut).trim());
    rest = rest.slice(cut).trim();
  }
  if (rest) parts.push(rest);
  return parts;
}
