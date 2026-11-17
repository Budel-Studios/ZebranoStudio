import { CHAPTER_PRESETS, DEFAULT_COVER, DEFAULT_STYLE } from "../catalog";
import type { Photo, Project, Story } from "../types";

/** A small deterministic wedding project: 4 chapters, 6 photos each, a few stories. */
export function fixture(overrides: Partial<Project> = {}): Project {
  const chapters = CHAPTER_PRESETS.bruiloft.slice(0, 4).map((c, i) => ({ id: `c${i}`, ...c }));
  const photos: Photo[] = chapters.flatMap((c, ci) =>
    Array.from({ length: 6 }, (_, i) => ({
      id: `p${ci}_${i}`, name: `p${ci}_${i}.jpg`, w: i % 3 === 0 ? 4000 : 6000, h: i % 3 === 0 ? 6000 : 4000,
      chapterId: c.id, takenAt: ci * 1000 + i, favorite: i === 1, hero: i === 0,
    })),
  );
  const s = (id: string, chapterId: string | undefined, kind: Story["kind"], text: string, author = "Iemand"): Story => ({ id, chapterId, kind, title: id, author, text, by: "klant" });
  const stories: Story[] = [
    s("v1", "c3", "gelofte", "Ik beloof je dat ik blijf lachen om je grappen.", "Noor"),
    s("v2", "c3", "gelofte", "Ik beloof je dat ik blijf luisteren.", "Daan"),
    s("sp", "c2", "speech", "Lieve Noor, lieve Daan. Dit is een speech met een zin die blijft hangen.", "Henk"),
    s("q", "c2", "quote", "Met jou verdwaal ik graag.", "Sanne"),
    s("op", undefined, "opdracht", "Voor onze ouders."),
  ];
  return {
    id: "b1", kind: "bruiloft", title: "Test", names: "Noor & Daan", date: "14 juni 2026", place: "Landgoed", photographer: "Studio",
    formatId: "30x30", style: { ...DEFAULT_STYLE, targetSpreads: 20 }, cover: { ...DEFAULT_COVER, title: "Noor & Daan" },
    chapters, stories, photos, spreads: [], order: [], signoffs: [], createdAt: "2026-01-01", updatedAt: "2026-01-01",
    ...overrides,
  };
}

export const photoIdsOf = (p: Pick<Project, "spreads">) => p.spreads.flatMap((s) => s.frames.flatMap((f) => (f.kind === "image" && f.photoId ? [f.photoId] : [])));
export const textsOf = (p: Pick<Project, "spreads">) => p.spreads.flatMap((s) => s.frames.flatMap((f) => (f.kind === "text" ? [f.text] : []))).join("\n");
