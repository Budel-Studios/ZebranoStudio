import { buildSpread, metricsFor, templateOf } from "./templates";
import { capacity, splitText } from "./typography";
import type { Chapter, Photo, Project, Spread, SpreadPlan, Story } from "./types";

/**
 * The local layout engine. It designs a complete book from the same
 * parameters the AI designer gets, with fixed pacing rules. It is the
 * fallback when no Claude API key is configured, and the safety net when a
 * plan from Claude refers to things that do not exist.
 */

const landscape = (p: Photo) => p.w >= p.h * 1.15;
const portrait = (p: Photo) => p.h >= p.w * 1.1;
const weight = (p: Photo) => (p.favorite ? 2 : 0) + (p.hero ? 1 : 0);

/** Photo sequences per density level: loud and quiet spreads alternate. */
const RHYTHM: Record<number, string[]> = {
  1: ["hero-wit", "panorama", "stil", "diptiek", "hero-wit", "triptiek"],
  2: ["hero-wit", "diptiek", "panorama", "triptiek", "stil", "diptiek-aflopend"],
  3: ["diptiek", "panorama", "triptiek", "hero-details", "hero-wit", "diptiek-aflopend", "mozaiek"],
  4: ["hero-details", "diptiek-aflopend", "panorama", "mozaiek", "triptiek", "raster", "hero-wit"],
  5: ["mozaiek", "hero-details", "raster", "panorama", "mozaiek", "diptiek-aflopend", "raster"],
};

const PER_SPREAD = [0, 1.4, 1.9, 2.7, 3.5, 4.4];

function bodyCapacity(template: string, project: Project): number {
  const t = templateOf(template);
  const frames = t.build({ p: [], t: { body: "x", title: "x", kicker: "x", attribution: "x" }, m: metricsFor(project.formatId, project.style.margins) });
  const body = frames.find((f) => f.kind === "text" && (f.role === "body" || f.role === "list"));
  return body && body.kind === "text" ? capacity(body, project.formatId) : 1200;
}

class Pool {
  private left: Photo[];
  constructor(photos: Photo[]) {
    this.left = [...photos].sort((a, b) => a.takenAt - b.takenAt);
  }
  get size() {
    return this.left.length;
  }
  /** Takes the best photo matching `pred`, or the best one at all. */
  take(pred?: (p: Photo) => boolean): Photo | undefined {
    if (!this.left.length) return undefined;
    const candidates = pred ? this.left.filter(pred) : this.left;
    const from = candidates.length ? candidates : this.left;
    const best = from.reduce((a, b) => (weight(b) > weight(a) ? b : a));
    this.left = this.left.filter((p) => p !== best);
    return best;
  }
  /** Takes the next `n` in time order (favourites first when trimming). */
  next(n: number): Photo[] {
    const out = this.left.slice(0, n);
    this.left = this.left.slice(n);
    return out;
  }
  /** Keeps only the `n` most important, in time order. */
  trim(n: number) {
    if (this.left.length <= n) return;
    const keep = new Set([...this.left].sort((a, b) => weight(b) - weight(a)).slice(0, n));
    this.left = this.left.filter((p) => keep.has(p));
  }
}

function storyPlans(story: Story, chapter: Chapter | undefined, project: Project, pool: Pool): SpreadPlan[] {
  const base = { chapterId: chapter?.id, background: "paper" as const };
  const by = story.author.trim();
  const photo = (pred?: (p: Photo) => boolean) => {
    const p = pool.take(pred);
    return p ? [p.id] : [];
  };
  const long = (template: string, kicker: string): SpreadPlan[] => {
    const parts = splitText(story.text, bodyCapacity(template, project));
    return parts.map((body, i) => ({
      ...base,
      template,
      photoIds: photo(portrait),
      textOnly: true,
      texts: {
        kicker: i === 0 ? kicker : `${kicker}, vervolg`,
        title: i === 0 ? story.title : "",
        body,
        attribution: i === parts.length - 1 ? by : "",
      },
      rationale: parts.length > 1 ? `Lange tekst verdeeld over ${parts.length} spreads zodat de regels lucht houden.` : "Leestekst met één rustig beeld ernaast.",
    }));
  };

  switch (story.kind) {
    case "speech":
      return long("speech", "Speech");
    case "brief":
      return long("essay", "Brief");
    case "verhaal":
      return long("essay", "Verhaal");
    case "anekdote":
      return story.text.length > 520
        ? long("essay", "Moment")
        : [{ ...base, template: "anekdote", photoIds: pool.next(2).map((p) => p.id), texts: { kicker: "Moment", title: story.title, body: story.text }, rationale: "Kort verhaal in een getint vlak, zodat het opvalt tussen de fotospreads." }];
    case "quote": {
      const ids = photo(portrait);
      return [{ ...base, template: ids.length ? "quote-beeld" : "quote", photoIds: ids, textOnly: true, texts: { quote: `“${story.text.replace(/^[“"]|[”"]$/g, "")}”`, attribution: by }, background: project.style.mood === "editorial" && !ids.length ? "dark" : "paper", rationale: "Eén zin krijgt de hele spread." }];
    }
    case "menu":
    case "playlist":
    case "tijdlijn":
    {
      const ids = photo();
      return [{ ...base, template: ids.length === 0 || (story.kind === "tijdlijn" && story.text.split("\n").length > 9) ? "tijdlijn" : "lijst", photoIds: ids, texts: { kicker: story.kind === "menu" ? "Menu" : story.kind === "playlist" ? "Playlist" : "De dag", title: story.title, body: story.text }, rationale: "Lijst gecentreerd gezet, als een menukaart." }];
    }
    case "opdracht":
    case "in-memoriam":
      return [{ ...base, template: "opdracht", photoIds: [], texts: { body: story.text, attribution: by }, rationale: "Weinig woorden, veel wit." }];
    default:
      return [];
  }
}

function vowPlans(vows: Story[], chapter: Chapter | undefined, project: Project, pool: Pool): SpreadPlan[] {
  const out: SpreadPlan[] = [];
  const cap = bodyCapacity("geloften", project);
  const base = { chapterId: chapter?.id, background: project.style.mood === "romantisch" ? ("tint" as const) : ("paper" as const) };
  let i = 0;
  while (i < vows.length) {
    const a = vows[i], b = vows[i + 1];
    if (b && a.text.length <= cap && b.text.length <= cap) {
      out.push({ ...base, template: "geloften", photoIds: [], texts: { title: "Geloften", body: a.text, attribution: a.author, body2: b.text, caption: b.author }, rationale: "Twee geloften gespiegeld: elk een eigen pagina, zonder beeld dat afleidt." });
      i += 2;
    } else {
      const parts = splitText(a.text, bodyCapacity("gelofte-beeld", project));
      parts.forEach((body, n) => {
        const p = pool.take(portrait);
        out.push({ ...base, template: "gelofte-beeld", photoIds: p ? [p.id] : [], textOnly: true, texts: { title: n === 0 ? a.title || "Gelofte" : "", body, attribution: n === parts.length - 1 ? a.author : "" }, rationale: "Gelofte met portret van wie hem uitsprak." });
      });
      i += 1;
    }
  }
  return out;
}

function photoPlans(pool: Pool, count: number, chapter: Chapter | undefined, project: Project, offset: number): SpreadPlan[] {
  const rhythm = RHYTHM[Math.min(5, Math.max(1, project.style.density))];
  const bwEvery = [0, 7, 4, 3][Math.min(3, Math.max(0, project.style.bwShare))];
  const out: SpreadPlan[] = [];
  for (let i = 0; i < count && pool.size > 0; i++) {
    let id = rhythm[(i + offset) % rhythm.length];
    let t = templateOf(id);
    // Not enough photos left for this template: fall back to a smaller one.
    if (pool.size < t.photos) {
      id = pool.size >= 3 ? "triptiek" : pool.size === 2 ? "diptiek" : "hero-wit";
      t = templateOf(id);
    }
    const first = id === "panorama" ? pool.take(landscape) : id === "hero-wit" || id === "stil" ? pool.take() : undefined;
    const photos = first ? [first, ...pool.next(t.photos - 1)] : pool.next(t.photos);
    const quiet = t.energy === "rustig";
    out.push({
      template: id,
      chapterId: chapter?.id,
      photoIds: photos.map((p) => p.id),
      texts: {},
      background: "paper",
      bw: bwEvery > 0 && quiet && (i + offset) % bwEvery === bwEvery - 1,
      rationale: quiet ? "Rustige spread om op adem te komen." : "Volle spread: hier mag het druk zijn.",
    });
  }
  return out;
}

/** Designs the whole book. Returns plans; `plansToSpreads` positions them. */
export function designBook(input: Project): SpreadPlan[] {
  const project = { ...input, photos: assignLoose(input) };
  const { style, chapters, stories, photos } = project;
  const plans: SpreadPlan[] = [];
  const loose = (kind: Story["kind"]) => stories.filter((s) => s.kind === kind && !s.chapterId);

  plans.push({
    template: "titelpagina", photoIds: [], background: "paper",
    texts: { kicker: [project.place, project.date].filter(Boolean).join(" · "), title: project.names || project.title, subtitle: project.kind === "reis" ? "Een reis in hoofdstukken" : "Onze dag in hoofdstukken" },
    rationale: "Titelpagina: alleen de namen, de plaats en de datum.",
  });
  const frontPool = new Pool([]);
  for (const s of loose("opdracht")) plans.push(...storyPlans(s, undefined, project, frontPool));
  for (const s of loose("tijdlijn")) plans.push(...storyPlans(s, undefined, project, frontPool));
  plans.push(...vowPlans(loose("gelofte"), undefined, project, frontPool));

  // Text spreads are fixed; what is left of the target goes to photographs.
  const perChapter = chapters.map((ch) => {
    const pool = new Pool(photos.filter((p) => p.chapterId === ch.id));
    const own = stories.filter((s) => s.chapterId === ch.id);
    return { ch, pool, own, total: pool.size };
  });
  const unassigned = photos.filter((p) => !p.chapterId || !chapters.some((c) => c.id === p.chapterId));
  const textShare = Math.min(5, Math.max(1, style.textShare));

  const blocks = perChapter.map(({ ch, pool, own, total }) => {
    const head: SpreadPlan[] = [];
    const opener = pool.take(portrait);
    head.push({
      template: style.mood === "editorial" && /feest|avond|nacht/i.test(ch.title + ch.kind) ? "opener-donker" : "opener",
      chapterId: ch.id, photoIds: opener ? [opener.id] : [], background: "paper",
      texts: { kicker: ch.moment ?? "", title: ch.title, subtitle: ch.subtitle ?? "" },
      rationale: "Elk hoofdstuk opent met titel en één sfeerbeeld.",
    });
    const texts: SpreadPlan[] = [];
    texts.push(...vowPlans(own.filter((s) => s.kind === "gelofte"), ch, project, pool));
    // With little room for text, the stories people would miss most stay: speeches
    // and letters before anecdotes, quotes and lists. Preflight reports the rest.
    const others = own.filter((s) => s.kind !== "gelofte").sort((a, b) => KEEP_ORDER.indexOf(a.kind) - KEEP_ORDER.indexOf(b.kind));
    const limit = textShare <= 1 ? 1 : textShare === 2 ? 2 : 99;
    others.slice(0, limit).forEach((s) => texts.push(...storyPlans(s, ch, project, pool)));
    return { ch, pool, head, texts, total };
  });

  const fixed = plans.length + 1 + blocks.reduce((n, b) => n + b.head.length + b.texts.length, 0);
  const photoBudget = Math.max(blocks.length, style.targetSpreads - fixed);
  const totalLeft = blocks.reduce((n, b) => n + b.pool.size, 0) || 1;
  const per = PER_SPREAD[Math.min(5, Math.max(1, style.density))];

  let offset = 0;
  for (const b of blocks) {
    const share = Math.max(b.pool.size ? 1 : 0, Math.round((b.pool.size / totalLeft) * photoBudget));
    const count = Math.min(share, Math.ceil(b.pool.size / per));
    b.pool.trim(Math.ceil(count * per));
    const shots = photoPlans(b.pool, count, b.ch, project, offset);
    offset += shots.length;
    // Weave: opener, a first photo spread, then text and photo spreads in turn.
    const body: SpreadPlan[] = [];
    const queue = [...b.texts];
    shots.forEach((s, i) => {
      body.push(s);
      if (queue.length && (i % 2 === 0 || shots.length - i <= queue.length)) body.push(queue.shift()!);
    });
    body.push(...queue);
    plans.push(...b.head, ...body);
  }

  for (const kind of ["menu", "playlist", "in-memoriam", "verhaal", "brief", "quote", "speech", "anekdote"] as const) {
    for (const s of loose(kind)) plans.push(...storyPlans(s, undefined, project, new Pool([])));
  }

  const last = new Pool(unassigned.length ? unassigned : photos.filter((p) => !plans.some((pl) => pl.photoIds.includes(p.id)))).take();
  plans.push({
    template: "colofon", photoIds: last ? [last.id] : [], background: "paper",
    texts: {
      title: "Colofon",
      body: [
        project.names, [project.place, project.date].filter(Boolean).join(", "),
        project.photographer ? `Fotografie: ${project.photographer}` : "",
        "Gedrukt en gebonden in Italië", "Exemplaar 1 van 1",
      ].filter(Boolean).join("\n"),
    },
    rationale: "Het boek sluit stil af, met een colofon zoals in een echt boek.",
  });
  return plans;
}

/**
 * Positions plans as spreads. Locked spreads of the previous design are kept
 * at their place in the sequence (by index within their chapter).
 */
export function plansToSpreads(plans: SpreadPlan[], project: Project): Spread[] {
  const photoIds = new Set(project.photos.map((p) => p.id));
  const chapterIds = new Set(project.chapters.map((c) => c.id));
  const fresh = plans.map((plan) =>
    buildSpread(
      { ...plan, photoIds: plan.photoIds.filter((id) => photoIds.has(id)), chapterId: plan.chapterId && chapterIds.has(plan.chapterId) ? plan.chapterId : undefined },
      project.formatId, project.style,
    ),
  );
  const locked = project.spreads.filter((s) => s.locked);
  if (!locked.length) return fresh;
  // Photos used on locked spreads must not appear twice. A fresh spread that
  // loses all its photographs this way is dropped only when it carries no words.
  const taken = lockedContent(project).photoIds;
  const hasWords = (s: Spread) => s.frames.some((f) => f.kind === "text" && f.text.trim());
  const cleaned = fresh.flatMap((s) => {
    const before = s.frames.filter((f) => f.kind === "image" && f.photoId).length;
    const frames = s.frames.map((f) => (f.kind === "image" && f.photoId && taken.has(f.photoId) ? { ...f, photoId: undefined } : f));
    const after = frames.filter((f) => f.kind === "image" && f.photoId).length;
    return before > 0 && after === 0 && !hasWords(s) ? [] : [{ ...s, frames }];
  });
  const out = [...cleaned];
  for (const l of locked) {
    // Back to its old place, but inside its own chapter and never after the colophon.
    let at = Math.min(project.spreads.indexOf(l), Math.max(0, out.length - 1));
    const own = out.map((s, i) => (s.chapterId === l.chapterId ? i : -1)).filter((i) => i >= 0);
    if (l.chapterId && own.length) at = Math.min(Math.max(at, own[0] + 1), own[own.length - 1] + 1);
    out.splice(at, 0, l);
  }
  return out;
}

const flat = (s: string) => s.toLowerCase().replace(/\s+/g, " ").trim();

/** Photographs and stories that sit on locked spreads: a new design leaves them alone. */
export function lockedContent(project: Project): { photoIds: Set<string>; storyIds: Set<string> } {
  const locked = project.spreads.filter((s) => s.locked);
  const photoIds = new Set(locked.flatMap((s) => s.frames.flatMap((f) => (f.kind === "image" && f.photoId ? [f.photoId] : []))));
  const words = flat(locked.flatMap((s) => s.frames.flatMap((f) => (f.kind === "text" ? [f.text] : []))).join(" "));
  const storyIds = new Set(project.stories.filter((s) => s.text.trim() && words.includes(flat(s.text).slice(0, 60))).map((s) => s.id));
  return { photoIds, storyIds };
}

/** Stories of which no opening words appear anywhere in the book. */
export function unplacedStories(project: Project): Story[] {
  const words = flat(project.spreads.flatMap((s) => s.frames.flatMap((f) => (f.kind === "text" ? [f.text] : []))).join(" "));
  return project.stories.filter((s) => s.text.trim() && !words.includes(flat(s.text).slice(0, 60).replace(/^[“"]|[”"]$/g, "")));
}

const KEEP_ORDER: Story["kind"][] = ["speech", "brief", "verhaal", "in-memoriam", "anekdote", "quote", "menu", "playlist", "tijdlijn", "opdracht", "gelofte"];

/**
 * Photographs without a chapter join the chapter whose photographs are
 * closest in time; if no chapter has any, they are spread evenly in order.
 */
function assignLoose(project: Project): Photo[] {
  const ids = new Set(project.chapters.map((c) => c.id));
  const loose = project.photos.filter((p) => !p.chapterId || !ids.has(p.chapterId));
  if (!loose.length || !project.chapters.length) return project.photos;
  const placed = project.photos.filter((p) => p.chapterId && ids.has(p.chapterId));
  const sorted = [...loose].sort((a, b) => a.takenAt - b.takenAt);
  const per = Math.ceil(sorted.length / project.chapters.length);
  const target = new Map<string, string>();
  sorted.forEach((p, i) => {
    const nearest = placed.length ? placed.reduce((a, b) => (Math.abs(b.takenAt - p.takenAt) < Math.abs(a.takenAt - p.takenAt) ? b : a)).chapterId! : project.chapters[Math.min(project.chapters.length - 1, Math.floor(i / per))].id;
    target.set(p.id, nearest);
  });
  return project.photos.map((p) => (target.has(p.id) ? { ...p, chapterId: target.get(p.id) } : p));
}

/** Alternative templates for one spread that can hold the same content. */
export function alternatives(spread: Spread): string[] {
  const photos = spread.frames.filter((f) => f.kind === "image").length;
  const hasBody = spread.frames.some((f) => f.kind === "text" && (f.role === "body" || f.role === "list") && f.text.trim());
  const hasQuote = spread.frames.some((f) => f.kind === "text" && f.role === "quote");
  const groups: string[][] = [
    ["opener", "opener-donker"],
    ["titelpagina"], ["colofon"], ["geloften"], ["opdracht"],
    ["essay", "speech", "gelofte-beeld", "lijst"],
    ["quote-beeld"], ["quote"], ["anekdote"], ["tijdlijn", "lijst"],
  ];
  const own = groups.find((g) => g.includes(spread.template));
  if (own && (hasBody || hasQuote || own.length > 1 || photos === 0)) return own.filter((t) => t !== spread.template);
  const byCount: Record<number, string[]> = {
    1: ["panorama", "hero-wit", "stil"],
    2: ["diptiek", "diptiek-aflopend"],
    3: ["triptiek"], 4: ["hero-details"], 5: ["mozaiek"], 6: ["raster"],
  };
  return (byCount[photos] ?? []).filter((t) => t !== spread.template);
}
