import type { Project, Role, Signoff } from "./types";

/** Small stable hash of everything that ends up on paper. */
export function contentHash(p: Pick<Project, "spreads" | "cover" | "formatId" | "style">): string {
  const text = JSON.stringify([p.formatId, p.cover, p.style.fontPair, p.style.palette, p.spreads.map((s) => [s.template, s.background, s.frames])]);
  let h = 5381;
  for (let i = 0; i < text.length; i++) h = ((h << 5) + h + text.charCodeAt(i)) | 0;
  return (h >>> 0).toString(36);
}

/** A sign-off counts only for the book as it was when it was given. */
export function validSignoff(p: Project, role: Role): Signoff | undefined {
  const s = p.signoffs.find((x) => x.role === role);
  return s && s.hash === contentHash(p) ? s : undefined;
}

export const expiredSignoff = (p: Project, role: Role) => Boolean(p.signoffs.find((x) => x.role === role)) && !validSignoff(p, role);

const norm = (s: string) => s.toLowerCase().replace(/[“”"'‘’«»]/g, "").replace(/\s+/g, " ").trim();

/** True when `quote` appears word for word in `source`. */
export const isLiteralQuote = (quote: string, source: string) => norm(quote).length >= 8 && norm(source).includes(norm(quote));
