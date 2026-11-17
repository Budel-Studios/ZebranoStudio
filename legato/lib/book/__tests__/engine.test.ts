import { describe, expect, it } from "vitest";
import { designBook, plansToSpreads } from "../autodesign";
import { plansFromAi } from "../from-ai";
import { preflight } from "../preflight";
import { DEFAULT_STUDIO } from "../catalog";
import { buildSpread, planOf, TEMPLATES } from "../templates";
import { splitText } from "../typography";
import type { SpreadDesignT } from "@/lib/ai/schema";
import { fixture, photoIdsOf, textsOf } from "./fixture";

const design = (project = fixture()) => ({ ...project, spreads: plansToSpreads(designBook(project), project) });

describe("templates", () => {
  it("keeps every frame inside the spread", () => {
    const p = fixture();
    for (const t of TEMPLATES) {
      const s = buildSpread({ template: t.id, photoIds: [], texts: { title: "T", kicker: "K", subtitle: "S", body: "B", body2: "B2", quote: "Q", attribution: "A", caption: "C" }, background: "paper" }, p.formatId, p.style);
      for (const f of s.frames) {
        expect(f.x, `${t.id} x`).toBeGreaterThanOrEqual(0);
        expect(f.y, `${t.id} y`).toBeGreaterThanOrEqual(0);
        expect(f.x + f.w, `${t.id} right`).toBeLessThanOrEqual(100.001);
        expect(f.y + f.h, `${t.id} bottom`).toBeLessThanOrEqual(100.001);
      }
      expect(s.frames.filter((f) => f.kind === "image").length, `${t.id} photo slots`).toBe(t.photos);
    }
  });

  it("never sets text across the fold", () => {
    const p = fixture();
    for (const t of TEMPLATES) {
      const s = buildSpread({ template: t.id, photoIds: [], texts: { title: "T", kicker: "K", subtitle: "S", body: "B", body2: "B2", quote: "Q", attribution: "A", caption: "C" }, background: "paper" }, p.formatId, p.style);
      for (const f of s.frames) if (f.kind === "text") expect(f.x >= 50 || f.x + f.w <= 50, `${t.id} ${f.role}`).toBe(true);
    }
  });

  it("keeps the words when a spread switches template", () => {
    const p = fixture();
    const texts = { kicker: "Speech", title: "Titel", body: "De hele tekst van de speech.", attribution: "Henk" };
    const speech = buildSpread({ template: "speech", photoIds: ["p0_0"], texts, background: "paper" }, p.formatId, p.style);
    const essay = buildSpread({ ...planOf(speech), template: "essay" }, p.formatId, p.style);
    expect(textsOf({ spreads: [essay] })).toContain("De hele tekst van de speech.");
    expect(textsOf({ spreads: [essay] })).toContain("Henk");
    expect(photoIdsOf({ spreads: [essay] })).toEqual(["p0_0"]);
  });

  it("keeps both vows when the vows spread is rebuilt", () => {
    const p = fixture();
    const vows = buildSpread({ template: "geloften", photoIds: [], texts: { title: "Geloften", body: "Gelofte een.", attribution: "Noor", body2: "Gelofte twee.", caption: "Daan" }, background: "paper" }, p.formatId, p.style);
    const again = buildSpread(planOf(vows), p.formatId, p.style);
    const all = textsOf({ spreads: [again] });
    for (const t of ["Gelofte een.", "Gelofte twee.", "Noor", "Daan"]) expect(all).toContain(t);
  });
});

describe("layout engine", () => {
  it("uses each photograph at most once", () => {
    const ids = photoIdsOf(design());
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("places every favourite of the couple", () => {
    const p = design();
    const used = new Set(photoIdsOf(p));
    for (const ph of p.photos.filter((x) => x.favorite)) expect(used.has(ph.id), ph.id).toBe(true);
  });

  it("puts every story in the book word for word", () => {
    const p = design();
    const all = textsOf(p);
    for (const s of p.stories) expect(all, s.id).toContain(s.text);
  });

  it("opens with the title page and closes with the colophon", () => {
    const p = design();
    expect(p.spreads[0].template).toBe("titelpagina");
    expect(p.spreads[p.spreads.length - 1].template).toBe("colofon");
  });

  it("stays near the requested number of spreads", () => {
    const p = design(fixture({ style: { ...fixture().style, targetSpreads: 18 } }));
    expect(p.spreads.length).toBeGreaterThanOrEqual(12);
    expect(p.spreads.length).toBeLessThanOrEqual(24);
  });

  it("keeps locked spreads and does not reuse their photographs", () => {
    const first = design();
    const lockedSpread = { ...first.spreads.find((s) => s.frames.some((f) => f.kind === "image" && f.photoId))!, locked: true };
    const withLock = { ...first, spreads: first.spreads.map((s) => (s.id === lockedSpread.id ? lockedSpread : s)) };
    const lockedIds = new Set(photoIdsOf({ spreads: [lockedSpread] }));
    const again = plansToSpreads(designBook({ ...withLock, photos: withLock.photos.filter((ph) => !lockedIds.has(ph.id)) }), withLock);
    expect(again.some((s) => s.id === lockedSpread.id)).toBe(true);
    const ids = photoIdsOf({ spreads: again });
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe("splitText", () => {
  it("loses no words", () => {
    const text = Array.from({ length: 60 }, (_, i) => `Zin nummer ${i} van de speech.`).join(" ");
    const parts = splitText(text, 300);
    expect(parts.length).toBeGreaterThan(1);
    expect(parts.join(" ").replace(/\s+/g, " ")).toBe(text);
    for (const part of parts) expect(part.length).toBeLessThanOrEqual(300);
  });
});

describe("plansFromAi", () => {
  const blank: SpreadDesignT = { template: "diptiek", chapterId: "c0", photoIds: [], storyId: "", storyId2: "", kicker: "", title: "", subtitle: "", quote: "", attribution: "", caption: "", background: "paper", blackAndWhite: false, rationale: "" };

  it("refuses a quote that is not literally in a story", () => {
    const { plans, dropped } = plansFromAi([{ ...blank, template: "quote", quote: "Dit heeft niemand gezegd." }], fixture());
    expect(plans).toHaveLength(0);
    expect(dropped).toHaveLength(1);
  });

  it("accepts a quote taken word for word from a story", () => {
    const { plans } = plansFromAi([{ ...blank, template: "quote", quote: "“Met jou verdwaal ik graag.”", attribution: "Sanne" }], fixture());
    expect(plans).toHaveLength(1);
  });

  it("sets story text from the project, not from the model", () => {
    const p = fixture();
    const { plans } = plansFromAi([{ ...blank, template: "speech", chapterId: "c2", photoIds: ["p2_0"], storyId: "sp", title: "Verzonnen titel" }], p);
    expect(plans[0].texts.body).toBe(p.stories.find((s) => s.id === "sp")!.text);
  });

  it("drops unknown templates and never repeats a photograph", () => {
    const { plans } = plansFromAi([
      { ...blank, template: "bestaat-niet" },
      { ...blank, photoIds: ["p0_0", "p0_1"] },
      { ...blank, photoIds: ["p0_0", "nep"] },
    ], fixture());
    const ids = plans.flatMap((x) => x.photoIds);
    expect(plans).toHaveLength(2);
    expect(new Set(ids).size).toBe(ids.length);
    expect(ids).not.toContain("nep");
  });
});

describe("preflight", () => {
  it("blocks an empty book and an empty photo frame", () => {
    expect(preflight(fixture(), DEFAULT_STUDIO).some((i) => i.level === "blokkerend")).toBe(true);
    const p = fixture();
    const s = buildSpread({ template: "diptiek", photoIds: ["p0_0"], texts: {}, background: "paper" }, p.formatId, p.style);
    expect(preflight({ ...p, spreads: [s] }, DEFAULT_STUDIO).some((i) => i.text.includes("Leeg fotokader"))).toBe(true);
  });

  it("flags a photograph that is too small for its frame", () => {
    const p = fixture();
    p.photos[0] = { ...p.photos[0], w: 900, h: 600 };
    const s = buildSpread({ template: "panorama", photoIds: [p.photos[0].id], texts: {}, background: "paper" }, p.formatId, p.style);
    expect(preflight({ ...p, spreads: [s] }, DEFAULT_STUDIO).some((i) => i.level === "blokkerend" && i.text.includes("te klein"))).toBe(true);
  });
});
