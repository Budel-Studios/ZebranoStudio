import { describe, expect, it } from "vitest";
import type { SpreadDesignT } from "@/lib/ai/schema";
import { designBook, lockedContent, plansToSpreads } from "../autodesign";
import { DEFAULT_STUDIO } from "../catalog";
import { plansFromAi } from "../from-ai";
import { preflight } from "../preflight";
import { buildSpread } from "../templates";
import type { Project } from "../types";
import { fixture, photoIdsOf, textsOf } from "./fixture";

const LONG = Array.from({ length: 220 }, (_, i) => `Dit is zin ${i} van een lange speech.`).join(" ");
const blank: SpreadDesignT = { template: "diptiek", chapterId: "c0", photoIds: [], storyId: "", storyId2: "", kicker: "", title: "", subtitle: "", quote: "", attribution: "", caption: "", background: "paper", blackAndWhite: false, rationale: "" };
const design = (p: Project) => ({ ...p, spreads: plansToSpreads(designBook(p), p) });
const withLong = () => {
  const p = fixture();
  p.stories = p.stories.map((s) => (s.id === "sp" ? { ...s, text: LONG } : s));
  return p;
};

describe("review findings", () => {
  it("builds no empty text frames, so no placeholder word can reach print", () => {
    const p = design(withLong());
    for (const s of p.spreads) for (const f of s.frames) if (f.kind === "text") expect(f.text.trim(), s.template).not.toBe("");
  });

  it("keeps the whole long story when another spread is locked (engine)", () => {
    const first = design(withLong());
    const lock = first.spreads.find((s) => s.template === "diptiek" || s.template === "hero-wit" || s.template === "panorama")!;
    const locked = { ...first, spreads: first.spreads.map((s) => (s.id === lock.id ? { ...s, locked: true } : s)) };
    const { photoIds, storyIds } = lockedContent(locked);
    const input = { ...locked, photos: locked.photos.filter((x) => !photoIds.has(x.id)), stories: locked.stories.filter((x) => !storyIds.has(x.id)) };
    const again = plansToSpreads(designBook(input), locked);
    expect(textsOf({ spreads: again }).replace(/\s+/g, " ")).toContain("zin 219 van een lange speech");
  });

  it("keeps AI continuation spreads when a spread is locked, without empty photo frames", () => {
    const p = withLong();
    const lockedSpread = { ...buildSpread({ template: "panorama", chapterId: "c0", photoIds: ["p0_0"], texts: {}, background: "paper" }, p.formatId, p.style), locked: true };
    const project = { ...p, spreads: [lockedSpread] };
    const { plans } = plansFromAi([{ ...blank, template: "speech", chapterId: "c2", photoIds: ["p2_0"], storyId: "sp" }], project, { reservedPhotos: new Set(["p0_0"]) });
    expect(plans.length).toBeGreaterThan(1);
    const spreads = plansToSpreads(plans, project);
    expect(textsOf({ spreads }).replace(/\s+/g, " ")).toContain("zin 219 van een lange speech");
    for (const s of spreads.filter((x) => !x.locked).slice(1)) expect(s.frames.some((f) => f.kind === "image" && !f.photoId)).toBe(false);
  });

  it("does not place a locked story a second time", () => {
    const first = design(fixture());
    const speech = first.spreads.find((s) => s.template === "speech")!;
    const locked = { ...first, spreads: first.spreads.map((s) => (s.id === speech.id ? { ...s, locked: true } : s)) };
    expect(lockedContent(locked).storyIds.has("sp")).toBe(true);
  });

  it("places vows that have no chapter", () => {
    const p = fixture();
    p.stories = p.stories.map((s) => (s.kind === "gelofte" ? { ...s, chapterId: undefined } : s));
    const all = textsOf(design(p));
    expect(all).toContain("Ik beloof je dat ik blijf luisteren.");
  });

  it("uses photographs that have no chapter yet", () => {
    const p = fixture();
    p.photos = p.photos.map((x) => ({ ...x, chapterId: undefined }));
    expect(photoIdsOf(design(p)).length).toBeGreaterThan(10);
  });

  it("never puts the same photograph twice on one spread", () => {
    const { plans } = plansFromAi([{ ...blank, photoIds: ["p0_0", "p0_0"] }], fixture());
    expect(new Set(plans[0].photoIds).size).toBe(plans[0].photoIds.length);
  });

  it("takes a quote's name from the story it comes from and refuses bare punctuation", () => {
    const { plans } = plansFromAi([{ ...blank, template: "quote", quote: "Met jou verdwaal ik graag.", attribution: "Iemand anders" }], fixture());
    expect(plans[0].texts.attribution).toBe("Sanne");
    expect(plansFromAi([{ ...blank, template: "quote", quote: "“”" }], fixture()).plans).toHaveLength(0);
  });

  it("warns when a story is not in the book, and does not block on ordinary words", () => {
    const p = design(fixture());
    const missing = { ...p, stories: [...p.stories, { id: "x", kind: "anekdote" as const, title: "Vergeten", author: "", text: "Dit verhaal staat nergens in het boek.", by: "klant" as const }] };
    expect(preflight(missing, DEFAULT_STUDIO).some((i) => i.text.includes("Vergeten"))).toBe(true);
    const kisses = { ...p, spreads: [buildSpread({ template: "opdracht", photoIds: [], texts: { body: "Voor jou, xxx" }, background: "paper" }, p.formatId, p.style)] };
    expect(preflight(kisses, DEFAULT_STUDIO).some((i) => i.level === "blokkerend" && i.text.includes("voorbeeldtekst"))).toBe(false);
  });
});

import { contentHash, expiredSignoff, isLiteralQuote, validSignoff } from "../integrity";

describe("sign-off and quotes", () => {
  it("voids a sign-off when the book changes afterwards", () => {
    const p = design(fixture());
    const signed = { ...p, signoffs: [{ role: "klant" as const, name: "Noor", at: "nu", hash: contentHash(p) }] };
    expect(validSignoff(signed, "klant")?.name).toBe("Noor");
    const changed = { ...signed, cover: { ...signed.cover, title: "Andere titel" } };
    expect(validSignoff(changed, "klant")).toBeUndefined();
    expect(expiredSignoff(changed, "klant")).toBe(true);
  });

  it("accepts only quotes that are word for word in the source", () => {
    expect(isLiteralQuote("“met jou verdwaal ik graag”", "Ik wist het: met jou verdwaal ik graag.")).toBe(true);
    expect(isLiteralQuote("Met jou verdwaal ik zo graag", "Ik wist het: met jou verdwaal ik graag.")).toBe(false);
  });
});
