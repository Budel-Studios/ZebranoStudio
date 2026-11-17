import { formatOf } from "./catalog";
import type { BlockFrame, Frame, ImageFrame, Spread, SpreadPlan, StyleParams, TextFrame, TextRole } from "./types";

let seq = 0;
export const uid = (p = "f") => `${p}_${Date.now().toString(36)}${(seq++).toString(36)}${Math.random().toString(36).slice(2, 6)}`;

/** Margins and gaps in percent of the spread, derived from real millimetres. */
export interface Metrics {
  mx: number;
  my: number;
  gx: number;
  gy: number;
}

const MARGIN_MM = { ruim: 28, normaal: 20, krap: 14 } as const;

export function metricsFor(formatId: string, margins: StyleParams["margins"]): Metrics {
  const f = formatOf(formatId);
  const mm = MARGIN_MM[margins];
  const gap = 4;
  return {
    mx: (mm / (f.pageW * 2)) * 100,
    my: (mm / f.pageH) * 100,
    gx: (gap / (f.pageW * 2)) * 100,
    gy: (gap / f.pageH) * 100,
  };
}

type Texts = SpreadPlan["texts"];

interface Ctx {
  p: Array<string | undefined>;
  t: Texts;
  m: Metrics;
  bw?: boolean;
}

export interface TemplateDef {
  id: string;
  name: string;
  /** What it is for — shown in the picker and given to the AI designer. */
  use: string;
  photos: number;
  texts: Array<keyof Texts>;
  /** Pacing: a book alternates loud, quiet and reading spreads. */
  energy: "luid" | "rustig" | "tekst";
  build: (c: Ctx) => Frame[];
}

const img = (c: Ctx, i: number, x: number, y: number, w: number, h: number): ImageFrame => ({
  id: uid("i"), kind: "image", x, y, w, h, photoId: c.p[i], fx: 0.5, fy: 0.42, bw: c.bw || undefined,
});

const txt = (
  role: TextRole, text: string | undefined, x: number, y: number, w: number, h: number,
  o: Partial<Pick<TextFrame, "align" | "valign" | "columns" | "dropCap" | "scale">> = {},
): TextFrame => ({
  id: uid("t"), kind: "text", role, text: text ?? "", x, y, w, h,
  align: o.align ?? "left", valign: o.valign ?? "top", columns: o.columns, dropCap: o.dropCap, scale: o.scale,
});

const block = (tone: BlockFrame["tone"], x: number, y: number, w: number, h: number): BlockFrame => ({
  id: uid("b"), kind: "block", tone, x, y, w, h,
});

/** Content box of the left (0) or right (1) page. */
const page = (m: Metrics, side: 0 | 1) => ({ x: side * 50 + m.mx, y: m.my, w: 50 - 2 * m.mx, h: 100 - 2 * m.my });

const keep = (frames: Array<Frame | false | undefined>) => frames.filter(Boolean) as Frame[];

export const TEMPLATES: TemplateDef[] = [
  {
    id: "panorama", name: "Panorama", use: "Eén beeld over beide pagina's, aflopend. Voor het grootste moment van een hoofdstuk.",
    photos: 1, texts: [], energy: "luid",
    build: (c) => keep([img(c, 0, 0, 0, 100, 100)]),
  },
  {
    id: "opener", name: "Hoofdstukopening", use: "Titel van het hoofdstuk links, sfeerbeeld paginavullend rechts.",
    photos: 1, texts: ["kicker", "title", "subtitle"], energy: "rustig",
    build: (c) => {
      const l = page(c.m, 0);
      return keep([
        img(c, 0, 50, 0, 50, 100),
        txt("kicker", c.t.kicker, l.x, 34, l.w, 5, { align: "center", valign: "bottom" }),
        txt("title", c.t.title, l.x, 40, l.w, 16, { align: "center", valign: "middle" }),
        txt("subtitle", c.t.subtitle, l.x, 57, l.w, 6, { align: "center" }),
      ]);
    },
  },
  {
    id: "opener-donker", name: "Hoofdstukopening donker", use: "Titel in een donker vlak over het beeld. Voor avond, feest of een dramatisch hoofdstuk.",
    photos: 1, texts: ["kicker", "title", "subtitle"], energy: "luid",
    build: (c) => keep([
      img(c, 0, 0, 0, 100, 100),
      block("dark", 0, 0, 34, 100),
      txt("kicker", c.t.kicker, c.m.mx, 36, 34 - 2 * c.m.mx, 5, { valign: "bottom" }),
      txt("title", c.t.title, c.m.mx, 42, 34 - 2 * c.m.mx, 18, { valign: "middle" }),
      txt("subtitle", c.t.subtitle, c.m.mx, 61, 34 - 2 * c.m.mx, 8),
    ]),
  },
  {
    id: "hero-wit", name: "Beeld en wit", use: "Eén beeld rechts, linkerpagina leeg op een klein bijschrift na. Geeft adem na een drukke spread.",
    photos: 1, texts: ["caption"], energy: "rustig",
    build: (c) => {
      const l = page(c.m, 0), r = page(c.m, 1);
      return keep([
        img(c, 0, r.x, r.y, r.w, r.h),
        txt("caption", c.t.caption, l.x, 100 - c.m.my - 8, l.w * 0.6, 8, { valign: "bottom" }),
      ]);
    },
  },
  {
    id: "stil", name: "Stil beeld", use: "Klein beeld midden op de rechterpagina, verder wit. Voor details: ringen, uitnodiging, bloemen.",
    photos: 1, texts: ["caption"], energy: "rustig",
    build: (c) => keep([
      img(c, 0, 62, 26, 26, 42),
      txt("caption", c.t.caption, 62, 70, 26, 6, { align: "center" }),
    ]),
  },
  {
    id: "diptiek", name: "Tweeluik", use: "Twee gelijke beelden tegenover elkaar. Voor twee portretten of twee kanten van één moment.",
    photos: 2, texts: [], energy: "rustig",
    build: (c) => {
      const l = page(c.m, 0), r = page(c.m, 1);
      return [img(c, 0, l.x, l.y, l.w, l.h), img(c, 1, r.x, r.y, r.w, r.h)];
    },
  },
  {
    id: "diptiek-aflopend", name: "Tweeluik aflopend", use: "Links een paginavullend beeld, rechts een kleiner beeld met marge.",
    photos: 2, texts: ["caption"], energy: "luid",
    build: (c) => {
      const r = page(c.m, 1);
      return keep([
        img(c, 0, 0, 0, 50, 100),
        img(c, 1, r.x + r.w * 0.12, r.y + r.h * 0.1, r.w * 0.76, r.h * 0.68),
        txt("caption", c.t.caption, r.x + r.w * 0.12, r.y + r.h * 0.8, r.w * 0.76, 8, { align: "center" }),
      ]);
    },
  },
  {
    id: "hero-details", name: "Beeld met details", use: "Groot beeld links, drie details onder elkaar rechts.",
    photos: 4, texts: [], energy: "luid",
    build: (c) => {
      const { mx, my, gy } = c.m;
      const h = (100 - 2 * my - 2 * gy) / 3;
      const x = 62, w = 100 - mx - x;
      return [
        img(c, 0, 0, 0, 58, 100),
        img(c, 1, x, my, w, h), img(c, 2, x, my + h + gy, w, h), img(c, 3, x, my + 2 * (h + gy), w, h),
      ];
    },
  },
  {
    id: "triptiek", name: "Drieluik", use: "Drie beelden van één moment op een rij, als een filmstrook.",
    photos: 3, texts: ["caption"], energy: "rustig",
    build: (c) => {
      const { mx, gx } = c.m;
      const w = (100 - 2 * mx - 2 * gx) / 3;
      return keep([
        img(c, 0, mx, 24, w, 46), img(c, 1, mx + w + gx, 24, w, 46), img(c, 2, mx + 2 * (w + gx), 24, w, 46),
        txt("caption", c.t.caption, mx, 73, w, 6),
      ]);
    },
  },
  {
    id: "mozaiek", name: "Mozaïek", use: "Vijf beelden in een asymmetrisch raster. Voor een levendig deel van de dag.",
    photos: 5, texts: [], energy: "luid",
    build: (c) => {
      const { mx, my, gx, gy } = c.m;
      const H = 100 - 2 * my, hh = (H - gy) / 2;
      const lw = 50 - mx - gx / 2;
      const rw = (50 - mx - gx / 2 - gx) / 2;
      const rx = 50 + gx / 2;
      return [
        img(c, 0, mx, my, lw, H),
        img(c, 1, rx, my, rw, hh), img(c, 2, rx + rw + gx, my, rw, hh),
        img(c, 3, rx, my + hh + gy, rw, hh), img(c, 4, rx + rw + gx, my + hh + gy, rw, hh),
      ];
    },
  },
  {
    id: "raster", name: "Raster", use: "Zes beelden in een strak raster. Voor gasten, dansvloer, groepsmomenten.",
    photos: 6, texts: [], energy: "luid",
    build: (c) => {
      const { mx, my, gx, gy } = c.m;
      const hh = (100 - 2 * my - gy) / 2;
      const out: Frame[] = [];
      for (let side = 0; side < 2; side++) {
        const x0 = side === 0 ? mx : 50 + mx;
        const w = (50 - 2 * mx - gx) / 2;
        for (let row = 0; row < 2; row++) {
          if (side === row) out.push(img(c, out.length, x0, my + row * (hh + gy), 50 - 2 * mx, hh));
          else {
            out.push(img(c, out.length, x0, my + row * (hh + gy), w, hh));
            out.push(img(c, out.length, x0 + w + gx, my + row * (hh + gy), w, hh));
          }
        }
      }
      return out;
    },
  },
  {
    id: "essay", name: "Verhaal", use: "Leestekst in twee kolommen met initiaal links, één beeld rechts. Voor een langer verhaal of brief.",
    photos: 1, texts: ["kicker", "title", "body", "attribution"], energy: "tekst",
    build: (c) => {
      const l = page(c.m, 0), r = page(c.m, 1);
      return keep([
        txt("kicker", c.t.kicker, l.x, l.y, l.w, 4),
        txt("title", c.t.title, l.x, l.y + 5, l.w, 13, { scale: 0.62 }),
        txt("body", c.t.body, l.x, l.y + 21, l.w, l.h - 28, { columns: 2, dropCap: true }),
        txt("attribution", c.t.attribution, l.x, l.y + l.h - 5, l.w, 5, { valign: "bottom" }),
        img(c, 0, r.x, r.y, r.w, r.h),
      ]);
    },
  },
  {
    id: "geloften", name: "Geloften", use: "Twee geloften gespiegeld, links en rechts, gecentreerd met veel lucht. Zonder beeld.",
    photos: 0, texts: ["title", "body", "attribution", "body2", "caption"], energy: "tekst",
    build: (c) => {
      const l = page(c.m, 0), r = page(c.m, 1);
      const iw = 0.66;
      return keep([
        txt("script", c.t.title, l.x, l.y, l.w, 12, { align: "center", valign: "middle" }),
        txt("body", c.t.body, l.x + (l.w * (1 - iw)) / 2, l.y + 15, l.w * iw, l.h - 25, { align: "center", valign: "middle", scale: 1.45 }),
        txt("attribution", c.t.attribution, l.x, l.y + l.h - 6, l.w, 6, { align: "center", valign: "bottom" }),
        txt("body", c.t.body2, r.x + (r.w * (1 - iw)) / 2, r.y + 15, r.w * iw, r.h - 25, { align: "center", valign: "middle", scale: 1.45 }),
        txt("attribution", c.t.caption, r.x, r.y + r.h - 6, r.w, 6, { align: "center", valign: "bottom" }),
      ]);
    },
  },
  {
    id: "gelofte-beeld", name: "Gelofte met beeld", use: "Eén gelofte of brief gecentreerd links, portret rechts.",
    photos: 1, texts: ["title", "body", "attribution"], energy: "tekst",
    build: (c) => {
      const l = page(c.m, 0);
      return keep([
        txt("script", c.t.title, l.x, l.y, l.w, 12, { align: "center", valign: "middle" }),
        txt("body", c.t.body, l.x + l.w * 0.14, l.y + 15, l.w * 0.72, l.h - 25, { align: "center", valign: "middle", scale: 1.3 }),
        txt("attribution", c.t.attribution, l.x, l.y + l.h - 6, l.w, 6, { align: "center", valign: "bottom" }),
        img(c, 0, 50, 0, 50, 100),
      ]);
    },
  },
  {
    id: "quote", name: "Citaat", use: "Eén grote zin op een verder lege spread, met naam. Maximaal één per drie à vier spreads.",
    photos: 0, texts: ["quote", "attribution"], energy: "rustig",
    build: (c) => {
      const r = page(c.m, 1);
      return keep([
        txt("quote", c.t.quote, r.x + r.w * 0.06, 22, r.w * 0.88, 40, { align: "center", valign: "bottom" }),
        txt("attribution", c.t.attribution, r.x, 66, r.w, 6, { align: "center" }),
      ]);
    },
  },
  {
    id: "quote-beeld", name: "Citaat met beeld", use: "Groot citaat links, beeld van de spreker of de reactie rechts.",
    photos: 1, texts: ["quote", "attribution"], energy: "rustig",
    build: (c) => {
      const l = page(c.m, 0);
      return keep([
        txt("quote", c.t.quote, l.x, 20, l.w, 42, { valign: "bottom", scale: 0.85 }),
        txt("attribution", c.t.attribution, l.x, 66, l.w, 6),
        img(c, 0, 50, 0, 50, 100),
      ]);
    },
  },
  {
    id: "speech", name: "Speech", use: "Speech in één brede kolom links met naam van de spreker, beeld van de zaal of de spreker rechts.",
    photos: 1, texts: ["kicker", "title", "body", "attribution"], energy: "tekst",
    build: (c) => {
      const l = page(c.m, 0), r = page(c.m, 1);
      return keep([
        txt("kicker", c.t.kicker, l.x, l.y, l.w, 4),
        txt("title", c.t.title, l.x, l.y + 5, l.w, 11, { scale: 0.55 }),
        txt("body", c.t.body, l.x, l.y + 19, l.w * 0.86, l.h - 26, { dropCap: true }),
        txt("attribution", c.t.attribution, l.x, l.y + l.h - 5, l.w, 5, { valign: "bottom" }),
        img(c, 0, r.x, r.y + r.h * 0.08, r.w, r.h * 0.84),
      ]);
    },
  },
  {
    id: "anekdote", name: "Leuk moment", use: "Kort verhaal in een getint vlak naast twee beelden. Voor anekdotes.",
    photos: 2, texts: ["kicker", "title", "body"], energy: "tekst",
    build: (c) => {
      const { mx, my, gy } = c.m;
      const r = page(c.m, 1);
      const hh = (100 - 2 * my - gy) / 2;
      return keep([
        block("tint", 0, 0, 50, 100),
        txt("kicker", c.t.kicker, mx + 4, 30, 42 - 2 * mx, 4, { align: "center" }),
        txt("title", c.t.title, mx + 4, 35, 42 - 2 * mx, 12, { align: "center", valign: "middle", scale: 0.5 }),
        txt("body", c.t.body, mx + 6, 49, 38 - 2 * mx, 32, { align: "center" }),
        img(c, 0, r.x, my, r.w, hh), img(c, 1, r.x, my + hh + gy, r.w, hh),
      ]);
    },
  },
  {
    id: "lijst", name: "Menu of playlist", use: "Gecentreerde lijst (menu, playlist, tijdlijn) links, één beeld rechts.",
    photos: 1, texts: ["kicker", "title", "body"], energy: "tekst",
    build: (c) => {
      const l = page(c.m, 0), r = page(c.m, 1);
      return keep([
        txt("kicker", c.t.kicker, l.x, l.y + 4, l.w, 4, { align: "center" }),
        txt("title", c.t.title, l.x, l.y + 9, l.w, 10, { align: "center", valign: "middle", scale: 0.5 }),
        txt("list", c.t.body, l.x + l.w * 0.1, l.y + 22, l.w * 0.8, l.h - 26, { align: "center", scale: 1.15 }),
        img(c, 0, r.x + r.w * 0.1, r.y + r.h * 0.1, r.w * 0.8, r.h * 0.8),
      ]);
    },
  },
  {
    id: "tijdlijn", name: "Tijdlijn", use: "De dag in momenten: titel links, de lijst rechts, zonder beeld. Voorin of achterin.",
    photos: 0, texts: ["kicker", "title", "body"], energy: "tekst",
    build: (c) => {
      const l = page(c.m, 0), r = page(c.m, 1);
      return keep([
        txt("kicker", c.t.kicker, l.x, 38, l.w, 5, { align: "center", valign: "bottom" }),
        txt("title", c.t.title, l.x, 44, l.w, 14, { align: "center", valign: "middle", scale: 0.7 }),
        txt("list", c.t.body, r.x + r.w * 0.08, r.y, r.w * 0.84, r.h, { align: "left", valign: "middle", scale: 1.25 }),
      ]);
    },
  },
  {
    id: "titelpagina", name: "Titelpagina", use: "Namen, datum en plaats op de rechterpagina. Eerste spread van het boek.",
    photos: 0, texts: ["kicker", "title", "subtitle"], energy: "rustig",
    build: (c) => {
      const r = page(c.m, 1);
      return keep([
        txt("kicker", c.t.kicker, r.x, 33, r.w, 5, { align: "center", valign: "bottom" }),
        txt("title", c.t.title, r.x, 39, r.w, 18, { align: "center", valign: "middle" }),
        txt("subtitle", c.t.subtitle, r.x, 59, r.w, 6, { align: "center" }),
      ]);
    },
  },
  {
    id: "opdracht", name: "Opdracht", use: "Eén of twee regels gecentreerd op de rechterpagina: voor wie het boek is, of in gedachten.",
    photos: 0, texts: ["body", "attribution"], energy: "rustig",
    build: (c) => {
      const r = page(c.m, 1);
      return keep([
        txt("quote", c.t.body ?? c.t.quote, r.x + r.w * 0.15, 36, r.w * 0.7, 24, { align: "center", valign: "middle", scale: 0.45 }),
        txt("attribution", c.t.attribution, r.x, 62, r.w, 5, { align: "center" }),
      ]);
    },
  },
  {
    id: "colofon", name: "Slot en colofon", use: "Laatste stille beeld links, colofon rechtsonder: datum, plaats, fotograaf, exemplaar 1 van 1.",
    photos: 1, texts: ["title", "body"], energy: "rustig",
    build: (c) => {
      const l = page(c.m, 0), r = page(c.m, 1);
      return keep([
        img(c, 0, l.x + l.w * 0.14, l.y + l.h * 0.16, l.w * 0.72, l.h * 0.6),
        txt("kicker", c.t.title, r.x, r.y + r.h - 34, r.w, 4, { align: "center" }),
        txt("caption", c.t.body, r.x + r.w * 0.15, r.y + r.h - 28, r.w * 0.7, 28, { align: "center" }),
      ]);
    },
  },
];

export const templateOf = (id: string) => TEMPLATES.find((t) => t.id === id) ?? TEMPLATES[0];

/**
 * Turns a plan (from Claude or the local engine) into a positioned spread.
 * Empty text frames are left out, so nothing but real words reaches print;
 * `keepEmpty` keeps them for a spread the user is about to fill in.
 */
export function buildSpread(plan: SpreadPlan, formatId: string, style: StyleParams, keepId?: string, opts: { keepEmpty?: boolean } = {}): Spread {
  const t = templateOf(plan.template);
  const frames = t.build({
    p: Array.from({ length: t.photos }, (_, i) => plan.photoIds[i]),
    t: plan.texts ?? {},
    m: metricsFor(formatId, style.margins),
    bw: plan.bw,
  });
  const used = frames.filter((f) => (f.kind === "text" ? opts.keepEmpty || f.text.trim() !== "" : f.kind === "image" ? !plan.textOnly || Boolean(f.photoId) : true));
  return {
    id: keepId ?? uid("s"),
    chapterId: plan.chapterId,
    template: t.id,
    frames: used,
    background: plan.background ?? "paper",
    rationale: plan.rationale,
    comments: [],
  };
}

/** Reads the plan back out of a spread, so another template can reuse its content. */
export function planOf(spread: Spread): SpreadPlan {
  const texts: Texts = {};
  let bodies = 0;
  let attributions = 0;
  for (const f of spread.frames) {
    if (f.kind !== "text" || !f.text.trim()) continue;
    if (f.role === "body" || f.role === "list") {
      if (bodies++ === 0) texts.body = f.text; else texts.body2 = f.text;
    } else if (f.role === "attribution") {
      if (attributions++ === 0) texts.attribution = f.text; else texts.caption = f.text;
    } else if (f.role === "script") texts.title = f.text;
    else if (f.role === "quote") texts.quote = f.text;
    else if (f.role === "title" || f.role === "subtitle" || f.role === "kicker" || f.role === "caption") texts[f.role] ??= f.text;
  }
  const images = spread.frames.filter((f): f is ImageFrame => f.kind === "image");
  return {
    template: spread.template,
    chapterId: spread.chapterId,
    photoIds: images.map((f) => f.photoId).filter(Boolean) as string[],
    texts,
    background: spread.background,
    bw: images.length > 0 && images.every((f) => f.bw),
    rationale: spread.rationale,
  };
}
