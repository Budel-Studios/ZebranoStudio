"use client";

import { CHAPTER_PRESETS, DEFAULT_COVER, DEFAULT_STYLE } from "./catalog";
import { storePhoto } from "./store";
import { uid } from "./templates";
import type { BookKind, Chapter, Photo, Project, Story } from "./types";

export function newProject(kind: BookKind, names: string, date: string, place: string, photographer: string): Project {
  const now = new Date().toISOString();
  const chapters: Chapter[] = CHAPTER_PRESETS[kind].map((c) => ({ id: uid("c"), ...c }));
  return {
    id: uid("b"), kind, title: names || (kind === "reis" ? "Nieuwe reis" : "Nieuwe bruiloft"), names, date, place, photographer,
    formatId: "30x30", style: { ...DEFAULT_STYLE }, cover: { ...DEFAULT_COVER, title: names, subtitle: date },
    chapters, stories: [], photos: [], spreads: [], order: [], signoffs: [], createdAt: now, updatedAt: now,
  };
}

// ── Demo images ────────────────────────────────────────────────────────────
// Painted stand-ins so the editor can be tried without uploading anything.
// They are flagged as placeholders and block ordering.

const SCENES: Record<string, [string, string, string]> = {
  aankomst: ["#cfd8d2", "#8fa39a", "#f3ead9"],
  voorbereiding: ["#ead9cf", "#c9a79a", "#fbf3ea"],
  "first-look": ["#d9d2c0", "#a59a7c", "#f6f0e2"],
  ceremonie: ["#e6dcc8", "#b79f72", "#fffaf0"],
  geloften: ["#e9d5d0", "#b98a86", "#fdf4f1"],
  toost: ["#f0dfb8", "#cf9f52", "#fff6df"],
  portretten: ["#c9cfc0", "#7f8a6c", "#eef0e4"],
  diner: ["#d8b89a", "#8a5a3c", "#f5e3cf"],
  speeches: ["#cbb6a6", "#7a5646", "#f2e2d6"],
  feest: ["#3a2d4a", "#b0507a", "#f0b070"],
  overnachting: ["#2a3346", "#56647f", "#c9cfe0"],
  vertrek: ["#d6dfe6", "#8ea3b3", "#f6f8fa"],
};

function rng(seed: number) {
  let s = seed >>> 0;
  return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
}

function paint(kind: string, w: number, h: number, seed: number): Promise<Blob> {
  const [a, b, c] = SCENES[kind] ?? SCENES.ceremonie;
  const r = rng(seed);
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const g = canvas.getContext("2d")!;
  const sky = g.createLinearGradient(0, 0, w * (0.2 + r() * 0.6), h);
  sky.addColorStop(0, c);
  sky.addColorStop(0.55 + r() * 0.2, a);
  sky.addColorStop(1, b);
  g.fillStyle = sky;
  g.fillRect(0, 0, w, h);
  // Soft light and a few out-of-focus shapes, like a blurred photograph.
  for (let i = 0; i < 9; i++) {
    const x = r() * w, y = r() * h, rad = (0.08 + r() * 0.3) * Math.max(w, h);
    const glow = g.createRadialGradient(x, y, 0, x, y, rad);
    const col = [a, b, c][Math.floor(r() * 3)];
    glow.addColorStop(0, col + "cc");
    glow.addColorStop(1, col + "00");
    g.fillStyle = glow;
    g.fillRect(0, 0, w, h);
  }
  // Horizon band and two figures as simple silhouettes.
  const horizon = h * (0.62 + r() * 0.14);
  g.fillStyle = b + "66";
  g.fillRect(0, horizon, w, h - horizon);
  const fx = w * (0.3 + r() * 0.4), fh = h * (0.07 + r() * 0.08);
  g.fillStyle = "#1c1a1acc";
  for (const dx of [-fh * 0.18, fh * 0.18]) {
    g.beginPath();
    g.ellipse(fx + dx, horizon - fh * 0.42, fh * 0.13, fh * 0.42, 0, 0, Math.PI * 2);
    g.fill();
    g.beginPath();
    g.arc(fx + dx, horizon - fh * 0.95, fh * 0.09, 0, Math.PI * 2);
    g.fill();
  }
  // Grain.
  const grain = g.getImageData(0, 0, w, h);
  for (let i = 0; i < grain.data.length; i += 4) {
    const n = (r() - 0.5) * 16;
    grain.data[i] += n; grain.data[i + 1] += n; grain.data[i + 2] += n;
  }
  g.putImageData(grain, 0, 0);
  return new Promise((resolve, reject) => canvas.toBlob((bl) => (bl ? resolve(bl) : reject(new Error("paint"))), "image/jpeg", 0.85));
}

const story = (chapterId: string | undefined, kind: Story["kind"], title: string, author: string, text: string): Story => ({ id: uid("v"), chapterId, kind, title, author, text, by: "klant" });

/** A filled example book: chapters, sample stories and painted demo images. */
export async function demoProject(onProgress?: (done: number, total: number) => void): Promise<Project> {
  const p = newProject("bruiloft", "Noor & Daan", "14 juni 2026", "Landgoed De Wilmersberg", "Jouw fotostudio");
  p.title = "Noor & Daan (voorbeeld)";
  const ch = (kind: string) => p.chapters.find((c) => c.kind === kind)!;
  ch("aankomst").moment = "11:00 · De oprijlaan";
  ch("ceremonie").moment = "14:30 · De boomgaard";
  ch("diner").moment = "18:30 · De oranjerie";
  ch("feest").moment = "21:00 · De schuur";
  ch("vertrek").moment = "De ochtend erna";

  p.stories = [
    story(undefined, "opdracht", "Opdracht", "", "Voor onze ouders,\ndie ons leerden wat thuis is."),
    story(undefined, "tijdlijn", "De dag in uren", "", "11:00 — Aankomst op het landgoed\n12:30 — Het eerste moment\n14:30 — Ceremonie in de boomgaard\n15:30 — Toost en taart\n18:30 — Diner in de oranjerie\n20:15 — Speeches\n21:00 — Openingsdans\n01:30 — Laatste nummer"),
    story(ch("geloften").id, "gelofte", "Noor", "Noor", "Daan, ik beloof je dat ik blijf lachen om je grappen, ook om de slechte. Dat ik je koffie zet als je te laat naar bed bent gegaan, en dat ik je hand vasthoud als het spannend wordt.\n\nIk beloof je geen leven zonder regen. Wel dat ik naast je sta, met of zonder paraplu."),
    story(ch("geloften").id, "gelofte", "Daan", "Daan", "Noor, toen ik je voor het eerst zag, stond je met je rug naar me toe een kaart te lezen die ondersteboven hing. Ik wist toen al: met jou verdwaal ik graag.\n\nIk beloof je dat ik blijf luisteren, ook als ik denk dat ik het al weet. En dat thuis altijd is waar jij bent."),
    story(ch("ceremonie").id, "anekdote", "De ring die viel", "", "Net toen Daan de ring wilde pakken, rolde hij uit het doosje het gras in. Zes mensen op hun knieën, de ambtenaar voorop. Oma vond hem, onder haar eigen stoel."),
    story(ch("speeches").id, "speech", "Speech van de vader van de bruid", "Henk, vader van Noor", "Lieve Noor, lieve Daan,\n\nToen Noor zes was, vroeg ze me of je kon trouwen met iemand die je nog niet kende. Ik zei dat het handiger was om eerst even kennis te maken. Ze heeft daar ruim de tijd voor genomen, en het resultaat zit hier naast haar.\n\nDaan, de eerste keer dat je bij ons at, schepte je drie keer op en hielp je daarna met afwassen. Mijn vrouw was om. Ik had iets langer nodig: tot je de schuur hielp leegruimen op de heetste dag van het jaar, zonder één keer te klagen.\n\nIk wens jullie een huis vol mensen, een tafel die te klein is, en altijd iemand die de afwas doet."),
    story(ch("speeches").id, "quote", "", "Sanne, getuige", "Wie Noor meeneemt, krijgt er een routeplanner bij die nooit klopt en altijd aankomt."),
    story(ch("diner").id, "menu", "Het diner", "", "Burrata, perzik, basilicum\nZeebaars, venkel, citroen\nKalfssukade, jus van rode wijn\nAardbei, vlierbloesem, room"),
    story(ch("feest").id, "playlist", "De eerste nummers", "", "At Last — Etta James\nDreams — Fleetwood Mac\nSeptember — Earth, Wind & Fire\nDancing in the Dark — Bruce Springsteen"),
    story(ch("feest").id, "quote", "", "Opa Jan, 87", "Ik ga pas naar huis als de band stopt."),
  ];

  const counts: Record<string, number> = { aankomst: 4, voorbereiding: 6, "first-look": 4, ceremonie: 8, geloften: 3, toost: 5, portretten: 7, diner: 5, speeches: 5, feest: 9, overnachting: 3, vertrek: 3 };
  const total = Object.values(counts).reduce((a, b) => a + b, 0);
  let done = 0, t = Date.UTC(2026, 5, 14, 9, 0);
  const photos: Photo[] = [];
  for (const c of p.chapters) {
    for (let i = 0; i < (counts[c.kind] ?? 3); i++) {
      const portraitShot = (i + c.kind.length) % 3 === 0;
      const [w, h] = portraitShot ? [1200, 1800] : [1800, 1200];
      const id = uid("p");
      const blob = await paint(c.kind, w, h, done * 7919 + 13);
      await storePhoto(id, blob, blob);
      photos.push({ id, name: `demo-${String(done + 1).padStart(3, "0")}.jpg`, w, h, chapterId: c.id, takenAt: (t += 6 * 60000), placeholder: true, favorite: i === 1, hero: i === 0 });
      onProgress?.(++done, total);
    }
  }
  p.photos = photos;
  return p;
}
