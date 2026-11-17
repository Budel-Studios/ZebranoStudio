import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * The site's imagery, drawn in CSS: an open book spread (cloth cover, white
 * paper pages, the ribbon marker hanging from the gutter), a closed cover
 * with a foil-stamped title and a set of typographic sample spreads set in
 * Bodoni. No photography exists yet, so greyboard blocks stand where photos
 * will go. All sample text is obviously sample ("Noor & Daan").
 *
 * Everything scales with the width of the mock: the wrapper is a size
 * container and the inner font size is set in cqw, so every measure inside is
 * written in em.
 */

const PAPER = "#ffffff";
const INK = "var(--ink)";
const SOFT = "rgb(14 22 48 / 0.62)";
const HAIR = "rgb(14 22 48 / 0.14)";
const RIBBON = "var(--ribbon)";

/** Fine paper/fabric grain as an inline SVG (no external request). */
const GRAIN =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 .55 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";

/* ------------------------------------------------------------------ */
/* Photo placeholder                                                    */
/* ------------------------------------------------------------------ */

export type Tone = "board" | "sand" | "stone" | "dusk" | "cloth" | "olive" | "sky" | "night";

/* Greyboard in a few depths; "cloth" and "night" are the dark, blue ones. */
const TONES: Record<Tone, [string, string]> = {
  board: ["#dad6ce", "#cbc7be"],
  sand: ["#e2dfd8", "#d2cec6"],
  stone: ["#c9c5bc", "#b6b2a9"],
  dusk: ["#b4b1ab", "#96949a"],
  cloth: ["#3a4f85", "#263a6c"],
  olive: ["#cfccc3", "#bcb9af"],
  sky: ["#d5d6d6", "#bfc3c8"],
  night: ["#2a3963", "#18244a"],
};

/** Greyboard block where a photo will go. Square corners. */
export function PhotoBlock({ tone = "board", className, style }: { tone?: Tone; className?: string; style?: CSSProperties }) {
  const [a, b] = TONES[tone];
  return (
    <div
      aria-hidden
      className={cn("relative overflow-hidden", className)}
      style={{
        backgroundImage: `linear-gradient(155deg, ${a}, ${b})`,
        ...style,
      }}
    >
      <span className="absolute inset-0 opacity-20 mix-blend-multiply" style={{ backgroundImage: GRAIN }} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Open spread                                                          */
/* ------------------------------------------------------------------ */

/**
 * An open book seen from above: cover board, page block and two pages with a
 * soft gutter. `left` and `right` are page contents (usually <Page>).
 */
export function Spread({
  left,
  right,
  label,
  board = "var(--cloth)",
  ratio = "10 / 7",
  className,
}: {
  left: ReactNode;
  right: ReactNode;
  /** Accessible description; the mock itself is presentational. */
  label: string;
  /** Colour of the cover board peeking out around the pages. */
  board?: string;
  /** Width / height of the open book (two pages). */
  ratio?: string;
  className?: string;
}) {
  return (
    <div role="img" aria-label={label} className={cn("w-full select-none [container-type:inline-size]", className)}>
      <div aria-hidden className="relative" style={{ aspectRatio: ratio, fontSize: "1.62cqw", color: INK }}>
        {/* Ribbon marker, hanging from the gutter below the foot of the book */}
        <span
          className="absolute left-[51.2%] top-[97%] h-[11%] w-[1.5%]"
          style={{ background: RIBBON, clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 82%, 0 100%)" }}
        />
        <div
          className="cloth-weave absolute inset-0 rounded-[0.12em]"
          style={{
            backgroundColor: board,
            boxShadow: "0 2.2em 3.6em -2.4em rgb(14 22 48 / 0.55), 0 0.2em 0.6em rgb(14 22 48 / 0.14)",
          }}
        />
        {/* Page block edges */}
        <div className="absolute inset-x-[1%] inset-y-[1.5%]" style={{ background: "#dcdad3" }} />
        <div className="absolute inset-x-[1.35%] inset-y-[1.8%]" style={{ background: "#ecebe6" }} />
        <div className="absolute inset-x-[1.7%] inset-y-[2.1%] flex">
          <div className="relative w-1/2 overflow-hidden" style={{ background: PAPER }}>
            {left}
            <span
              className="pointer-events-none absolute inset-y-0 right-0 w-[16%]"
              style={{ background: "linear-gradient(to left, rgb(14 22 48 / 0.14), rgb(14 22 48 / 0.04) 45%, transparent)" }}
            />
          </div>
          <div className="relative w-1/2 overflow-hidden" style={{ background: PAPER }}>
            {right}
            <span
              className="pointer-events-none absolute inset-y-0 left-0 w-[16%]"
              style={{ background: "linear-gradient(to right, rgb(14 22 48 / 0.17), rgb(14 22 48 / 0.05) 45%, transparent)" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/** One page: padded column. `bleed` removes the padding (full-page photo). */
export function Page({ children, bleed = false, className }: { children?: ReactNode; bleed?: boolean; className?: string }) {
  return <div className={cn("absolute inset-0 flex flex-col", !bleed && "p-[3.4em]", className)}>{children}</div>;
}

/** Page number and running title at the foot of a page: "42 · De ceremonie" is set as two items. */
function Folio({ children, align = "left" }: { children: string; align?: "left" | "right" | "center" }) {
  const parts = children.split(" · ");
  return (
    <p
      className={cn("mt-auto flex gap-[1.4em] pt-[1em] text-[0.62em] tabular-nums", align === "right" && "justify-end", align === "center" && "justify-center")}
      style={{ color: SOFT }}
    >
      {parts.map((part) => (
        <span key={part}>{part}</span>
      ))}
    </p>
  );
}

/** Small sentence-case line above a text (which chapter, whose words). */
function Kicker({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("text-[0.68em] font-medium", className)} style={{ color: SOFT }}>
      {children}
    </p>
  );
}

function Rule({ className }: { className?: string }) {
  return <span className={cn("block h-px w-[3em]", className)} style={{ background: RIBBON }} />;
}

/** "Greeked" body text: thin bars instead of words, for running copy. */
function Lines({ n = 5, className }: { n?: number; className?: string }) {
  const widths = ["100%", "94%", "98%", "88%", "96%", "72%", "99%", "91%", "64%"];
  return (
    <div className={cn("space-y-[0.62em]", className)}>
      {Array.from({ length: n }, (_, i) => (
        <span key={i} className="block h-[0.14em] rounded-full" style={{ width: widths[i % widths.length], background: "rgb(14 22 48 / 0.24)" }} />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Sample spreads                                                       */
/* ------------------------------------------------------------------ */

export type SpreadKind =
  | "titel"
  | "opener"
  | "geloften"
  | "quote"
  | "speech"
  | "brief"
  | "menu"
  | "tijdlijn"
  | "gasten"
  | "feest"
  | "colofon"
  | "reis"
  | "reisdag";

type Sample = { label: string; left: ReactNode; right: ReactNode };

const SAMPLES: Record<SpreadKind, Sample> = {
  titel: {
    label: "Voorbeeldspread: titelpagina met de namen Noor en Daan",
    left: (
      <Page className="items-center justify-center">
        <p className="font-display text-[1.05em] italic" style={{ color: SOFT }}>
          Voor wie erbij was,
          <br />
          en voor wie na ons komt.
        </p>
      </Page>
    ),
    right: (
      <Page className="items-center text-center">
        <div className="my-auto flex flex-col items-center">
          <Kicker>Een bruiloft in negen hoofdstukken</Kicker>
          <p className="mt-[0.5em] whitespace-nowrap font-display text-[3.7em] leading-[0.95] tracking-[-0.01em]">
            Noor &amp; Daan
          </p>
          <Rule className="mt-[1.6em]" />
          <p className="mt-[1.4em] font-display text-[1.15em] italic">veertien juni</p>
        </div>
        <Folio align="center">Voorbeeld</Folio>
      </Page>
    ),
  },
  opener: {
    label: "Voorbeeldspread: opening van het hoofdstuk De ceremonie",
    left: (
      <Page bleed>
        <PhotoBlock tone="board" className="h-full w-full" />
      </Page>
    ),
    right: (
      <Page>
        <Kicker>Hoofdstuk drie</Kicker>
        <div className="my-auto">
          <p className="font-display text-[4.4em] leading-[0.95] tracking-[-0.01em]">
            De ceremonie
          </p>
          <Rule className="mt-[1.6em]" />
          <p className="mt-[1.4em] max-w-[19em] font-display text-[1.2em] italic leading-snug" style={{ color: SOFT }}>
            Onder de oude beuk, kwart over drie. Het begon te waaien toen de muziek inzette.
          </p>
        </div>
        <Folio align="right">42 · De ceremonie</Folio>
      </Page>
    ),
  },
  geloften: {
    label: "Voorbeeldspread: de geloften van Noor en Daan, naast elkaar",
    left: (
      <Page>
        <Kicker>De geloften van Noor</Kicker>
        <p className="mt-[1.6em] font-display text-[1.62em] italic leading-[1.28]">
          Lieve Daan, ik beloof je dat ik blijf lachen om je slechtste grappen, dat ik je wakker maak als het sneeuwt en dat ik
          de laatste hap altijd met je deel.
        </p>
        <Lines n={4} className="mt-[2em] w-[78%]" />
        <Folio>56 · Geloften</Folio>
      </Page>
    ),
    right: (
      <Page>
        <Kicker>De geloften van Daan</Kicker>
        <p className="mt-[1.6em] font-display text-[1.62em] italic leading-[1.28]">
          Noor, ik had een heel verhaal. Toen zag ik je het pad op komen en wist ik alleen nog dit: bij jou ben ik thuis.
        </p>
        <Lines n={3} className="mt-[2em] w-[70%]" />
        <PhotoBlock tone="sand" className="mt-[2.4em] min-h-0 flex-1" />
        <Folio align="right">57</Folio>
      </Page>
    ),
  },
  quote: {
    label: "Voorbeeldspread: drie foto's links en een uitgelicht citaat uit een speech rechts",
    left: (
      <Page>
        <div className="grid min-h-0 flex-1 grid-cols-5 grid-rows-2 gap-[0.9em]">
          <PhotoBlock tone="dusk" className="col-span-3 row-span-2" />
          <PhotoBlock tone="sand" className="col-span-2" />
          <PhotoBlock tone="stone" className="col-span-2" />
        </div>
        <Folio>88 · Het diner</Folio>
      </Page>
    ),
    right: (
      <Page>
        <div className="my-auto">
          <p className="font-display text-[5em] leading-[0.5]" style={{ color: "var(--cloth)" }}>
            “
          </p>
          <p className="font-display text-[2.5em] italic leading-[1.12]">Ze kwam binnen en het werd stil. Zelfs oom Kees.</p>
          <Rule className="mt-[1.8em]" />
          <p className="mt-[1.2em] text-[0.68em] font-medium" style={{ color: SOFT }}>
            Uit de speech van de getuige
          </p>
        </div>
        <Folio align="right">89</Folio>
      </Page>
    ),
  },
  speech: {
    label: "Voorbeeldspread: een speech, volledig uitgeschreven in twee kolommen",
    left: (
      <Page>
        <Kicker>De speech van de vader van de bruid</Kicker>
        <p className="mt-[1.2em] font-display text-[2.6em] leading-[1.02]">
          “Ik zou het kort houden.”
        </p>
        <div className="mt-[2em] grid grid-cols-2 gap-[1.6em]">
          <Lines n={9} />
          <Lines n={8} />
        </div>
        <Folio>72 · Speeches</Folio>
      </Page>
    ),
    right: (
      <Page>
        <PhotoBlock tone="stone" className="min-h-0 flex-[3]" />
        <div className="mt-[1.6em] grid flex-[2] grid-cols-2 gap-[1.6em]">
          <Lines n={6} />
          <Lines n={5} />
        </div>
        <Folio align="right">73</Folio>
      </Page>
    ),
  },
  brief: {
    label: "Voorbeeldspread: een brief van een moeder, met een foto ernaast",
    left: (
      <Page bleed>
        <PhotoBlock tone="sand" className="h-full w-full" />
      </Page>
    ),
    right: (
      <Page className="px-[4.6em]">
        <Kicker>Een brief van mama</Kicker>
        <p className="mt-[1.8em] font-display text-[1.7em] italic leading-[1.25]">Lieve Noor,</p>
        <p className="mt-[0.8em] font-display text-[1.28em] leading-[1.38]">
          Vanochtend stond je in de gang, net als toen je zes was en voor het eerst alleen naar school wilde. Ik heb niets gezegd.
          Dat doe ik hier.
        </p>
        <Lines n={6} className="mt-[1.8em]" />
        <Folio align="right">31 · Voorbereiding</Folio>
      </Page>
    ),
  },
  menu: {
    label: "Voorbeeldspread: het menu van het diner en de playlist van de avond",
    left: (
      <Page className="items-center text-center">
        <Kicker>Het diner</Kicker>
        <p className="mt-[0.5em] font-display text-[3em] italic leading-none">Menu</p>
        <Rule className="mt-[1.3em]" />
        <ul className="mt-[1.6em] space-y-[1.15em] font-display text-[1.22em] leading-tight">
          {[
            ["Vooraf", "Burrata, perzik, basilicum"],
            ["Tussendoor", "Risotto met citroen"],
            ["Hoofd", "Zeebaars uit de oven"],
            ["Na", "Bruidstaart, drie lagen"],
          ].map(([k, v]) => (
            <li key={k}>
              <span className="block font-sans text-[0.5em] font-medium" style={{ color: SOFT }}>
                {k}
              </span>
              {v}
            </li>
          ))}
        </ul>
        <Folio align="center">84</Folio>
      </Page>
    ),
    right: (
      <Page>
        <Kicker>De playlist van het feest</Kicker>
        <ol className="mt-[1.6em] text-[0.86em]">
          {["Openingsdans", "Het nummer van opa", "De polonaise (ja, echt)", "Meezinger één", "Meezinger twee", "Laatste dans"].map((t, i) => (
            <li key={t} className="flex items-baseline gap-[1em] border-b py-[0.72em]" style={{ borderColor: HAIR }}>
              <span className="w-[1.6em] tabular-nums" style={{ color: SOFT }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-display text-[1.36em] leading-none">{t}</span>
            </li>
          ))}
        </ol>
        <PhotoBlock tone="night" className="mt-[1.8em] min-h-0 flex-1" />
        <Folio align="right">85</Folio>
      </Page>
    ),
  },
  tijdlijn: {
    label: "Voorbeeldspread: de tijdlijn van de dag, van aankomst tot vertrek",
    left: (
      <Page>
        <Kicker>De dag in uren</Kicker>
        <ol className="mt-[1.6em]">
          {[
            ["10.30", "Aankomst"],
            ["13.00", "Voorbereiding"],
            ["15.15", "Ceremonie"],
            ["17.00", "Toost"],
            ["19.00", "Diner"],
            ["22.00", "Feest"],
            ["03.10", "Laatste dans"],
          ].map(([t, n]) => (
            <li key={t} className="flex items-baseline gap-[1.2em] border-b py-[0.66em]" style={{ borderColor: HAIR }}>
              <span className="w-[3.4em] text-[0.74em] tabular-nums" style={{ color: SOFT }}>
                {t}
              </span>
              <span className="font-display text-[1.46em] leading-none">{n}</span>
            </li>
          ))}
        </ol>
        <Folio>8 · Tijdlijn</Folio>
      </Page>
    ),
    right: (
      <Page bleed>
        <PhotoBlock tone="olive" className="h-full w-full" />
      </Page>
    ),
  },
  gasten: {
    label: "Voorbeeldspread: korte quotes van gasten rond een foto",
    left: (
      <Page>
        <Kicker>Uit het gastenboek</Kicker>
        <div className="mt-[1.6em] grid flex-1 grid-cols-2 content-start gap-x-[1.8em] gap-y-[1.7em]">
          {[
            ["Ik heb drie keer gehuild. Eén keer om de rekening van de oppas.", "Tante Marjan"],
            ["Beste bruiloft sinds die van mezelf.", "Opa Wim"],
            ["Daan kan dus wél dansen.", "Sanne"],
            ["Mag ik volgend jaar weer?", "Joep, 7 jaar"],
          ].map(([q, a]) => (
            <div key={a}>
              <p className="font-display text-[1.3em] italic leading-[1.2]">{q}</p>
              <p className="mt-[0.7em] text-[0.6em] font-medium" style={{ color: SOFT }}>
                {a}
              </p>
            </div>
          ))}
        </div>
        <Folio>96 · Gasten</Folio>
      </Page>
    ),
    right: (
      <Page>
        <div className="grid min-h-0 flex-1 grid-cols-2 grid-rows-3 gap-[0.9em]">
          <PhotoBlock tone="board" className="row-span-2" />
          <PhotoBlock tone="stone" />
          <PhotoBlock tone="sand" />
          <PhotoBlock tone="dusk" className="col-span-2" />
        </div>
        <Folio align="right">97</Folio>
      </Page>
    ),
  },
  feest: {
    label: "Voorbeeldspread: het feest, één donker beeld over twee pagina's met een korte regel",
    left: (
      <Page bleed>
        <PhotoBlock tone="night" className="h-full w-full" />
      </Page>
    ),
    right: (
      <Page bleed>
        <PhotoBlock tone="night" className="h-full w-full" style={{ transform: "scaleX(-1)" }} />
        <p className="absolute bottom-[2.4em] right-[2.6em] max-w-[13em] text-right font-display text-[1.7em] italic leading-[1.15]" style={{ color: "var(--paper)" }}>
          Om tien over drie ging het licht aan. Niemand wilde naar huis.
        </p>
      </Page>
    ),
  },
  colofon: {
    label: "Voorbeeldspread: het colofon met de regel exemplaar 1 van 1",
    left: (
      <Page className="items-center justify-center text-center">
        <Rule />
        <p className="mt-[1.4em] font-display text-[1.9em] italic">Exemplaar 1 van 1</p>
        <p className="mt-[0.9em] text-[0.62em] font-medium" style={{ color: SOFT }}>
          Gemaakt voor Noor &amp; Daan
        </p>
      </Page>
    ),
    right: (
      <Page>
        <Kicker>Colofon</Kicker>
        <dl className="mt-[1.8em] space-y-[1.15em] text-[0.8em]">
          {[
            ["Fotografie", "Naam van jullie fotograaf"],
            ["Tekst", "Noor, Daan, familie en vrienden"],
            ["Ontwerp", "Samen samengesteld"],
            ["Druk en bindwerk", "Italië"],
          ].map(([k, v]) => (
            <div key={k}>
              <dt className="text-[0.78em] font-medium" style={{ color: SOFT }}>
                {k}
              </dt>
              <dd className="mt-[0.25em] font-display text-[1.6em] leading-tight">{v}</dd>
            </div>
          ))}
        </dl>
        <Folio align="right">Voorbeeld</Folio>
      </Page>
    ),
  },
  reis: {
    label: "Voorbeeldspread reisboek: opening van een reisdag met een routekaart",
    left: (
      <Page>
        <Kicker>De route</Kicker>
        <svg viewBox="0 0 200 230" className="mt-[1em] min-h-0 w-full flex-1" fill="none">
          <path d="M30 196 C 52 150, 28 128, 66 110 S 120 124, 132 84 S 150 40, 176 30" stroke="rgb(14 22 48 / 0.55)" strokeWidth="1" strokeDasharray="1.5 4" strokeLinecap="round" />
          <path d="M8 60 C 40 44, 70 70, 104 52 S 170 76, 196 60 M4 150 C 50 140, 80 170, 130 156 S 180 150, 198 164" stroke="rgb(14 22 48 / 0.12)" strokeWidth="0.8" />
          {[
            [30, 196, "Vertrek"],
            [66, 110, "Dag 2"],
            [132, 84, "Dag 4"],
            [176, 30, "Dag 7"],
          ].map(([x, y, t]) => (
            <g key={t}>
              <circle cx={x} cy={y} r="3.2" fill="var(--ribbon)" />
              <text x={Number(x) + 8} y={Number(y) + 3} fontSize="7.5" fill="var(--ink)" style={{ fontFamily: "var(--font-display)", fontStyle: "italic" }}>
                {t}
              </text>
            </g>
          ))}
        </svg>
        <Folio>6 · De route</Folio>
      </Page>
    ),
    right: (
      <Page>
        <Kicker>Dag vier</Kicker>
        <div className="my-auto">
          <p className="font-display text-[4.2em] leading-[0.95] tracking-[-0.01em]">
            Over de pas
          </p>
          <Rule className="mt-[1.6em]" />
          <p className="mt-[1.4em] max-w-[19em] font-display text-[1.2em] italic leading-snug" style={{ color: SOFT }}>
            Om zes uur op, koffie uit de thermoskan. Boven lag nog sneeuw. Mila vond het de mooiste dag.
          </p>
        </div>
        <Folio align="right">48 · Dag vier</Folio>
      </Page>
    ),
  },
  reisdag: {
    label: "Voorbeeldspread reisboek: groot landschapsbeeld met een dagboekfragment",
    left: (
      <Page bleed>
        <PhotoBlock tone="sky" className="h-full w-full" />
      </Page>
    ),
    right: (
      <Page>
        <PhotoBlock tone="olive" className="min-h-0 flex-[3]" />
        <Kicker className="mt-[1.8em]">Uit het reisdagboek</Kicker>
        <p className="mt-[0.8em] font-display text-[1.36em] italic leading-[1.3]">
          We zouden twee nachten blijven. Het werden er vijf. De eigenaar bakte elke ochtend brood en wilde er niets voor hebben.
        </p>
        <Folio align="right">63</Folio>
      </Page>
    ),
  },
};

/** A ready-made sample spread. */
export function SampleSpread({ kind, className, board }: { kind: SpreadKind; className?: string; board?: string }) {
  const s = SAMPLES[kind];
  return <Spread left={s.left} right={s.right} label={s.label} board={board} className={className} />;
}

/* ------------------------------------------------------------------ */
/* Closed cover                                                         */
/* ------------------------------------------------------------------ */

export type CoverTexture = "weave" | "grain" | "nap";

const TEXTURES: Record<CoverTexture, string> = {
  // Woven cloth: fine cross-hatch.
  weave:
    "repeating-linear-gradient(0deg, oklch(1 0 0 / 0.09) 0 1px, transparent 1px 3px), repeating-linear-gradient(90deg, oklch(0 0 0 / 0.07) 0 1px, transparent 1px 3px)",
  // Leather: only the grain overlay, with a soft sheen.
  grain: "radial-gradient(120% 80% at 25% 10%, oklch(1 0 0 / 0.14), transparent 60%)",
  // Suede and velvet: a brushed, directional sheen.
  nap: "linear-gradient(115deg, oklch(1 0 0 / 0.12), transparent 35%, oklch(0 0 0 / 0.1) 70%, oklch(1 0 0 / 0.07))",
};

/** Rough lightness (0-1) of an oklch() or #hex colour; decides foil or blind stamping. */
function lightness(color: string): number {
  const ok = /oklch\(\s*([\d.]+)/.exec(color);
  if (ok) return Number(ok[1]);
  const hex = /^#([0-9a-f]{6})$/i.exec(color.trim());
  if (hex) {
    const n = parseInt(hex[1]!, 16);
    return (0.2126 * ((n >> 16) & 255) + 0.7152 * ((n >> 8) & 255) + 0.0722 * (n & 255)) / 255;
  }
  return 0.3;
}

/**
 * Closed book, front view: cloth texture, hinge groove along the spine and a
 * stamped title. Dark covers get white foil, light covers a blind stamp (the
 * title pressed into the material without foil). `ratio` is width / height.
 */
export function BookCover({
  title = "Noor & Daan",
  sub = "Veertien juni",
  color = "var(--cloth)",
  texture = "weave",
  ratio = "5 / 7",
  label,
  className,
}: {
  title?: string;
  sub?: string;
  color?: string;
  texture?: CoverTexture;
  ratio?: string;
  label?: string;
  className?: string;
}) {
  const foil = color.startsWith("var(") || lightness(color) < 0.6;
  const stamp: CSSProperties = foil
    ? { color: "var(--paper)", textShadow: "0 -0.02em 0.03em rgb(8 14 36 / 0.5), 0 0.02em 0 rgb(255 255 255 / 0.14)" }
    : { color: `color-mix(in oklab, ${color} 66%, black)`, textShadow: "0 0.05em 0 rgb(255 255 255 / 0.3), 0 -0.035em 0 rgb(0 0 0 / 0.22)" };
  return (
    <div role="img" aria-label={label ?? `Voorbeeld van een boekomslag met de titel ${title}`} className={cn("w-full select-none [container-type:inline-size]", className)}>
      <div
        aria-hidden
        className="relative"
        style={{ aspectRatio: ratio, fontSize: "5cqw" }}
      >
        {/* Ribbon marker, hanging out at the foot */}
        <span
          className="absolute left-[68%] top-[99%] h-[9%] w-[3.4%]"
          style={{ background: RIBBON, clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 80%, 0 100%)" }}
        />
        <div
          className="absolute inset-0 overflow-hidden rounded-[0.08em]"
          style={{
            backgroundColor: color,
            backgroundImage: TEXTURES[texture],
            boxShadow:
              "0 1.8em 3em -1.8em rgb(14 22 48 / 0.55), 0 0.12em 0.4em rgb(14 22 48 / 0.18), inset -0.1em 0 0 rgb(255 255 255 / 0.1), inset 0 -0.1em 0 rgb(0 0 0 / 0.1)",
          }}
        >
          <span className="absolute inset-0 mix-blend-multiply" style={{ backgroundImage: GRAIN, opacity: texture === "weave" ? 0.25 : 0.45 }} />
          {/* Hinge groove */}
          <span
            className="absolute inset-y-0 left-[5.5%] w-[1.8%]"
            style={{ background: "linear-gradient(to right, rgb(0 0 0 / 0.24), rgb(0 0 0 / 0.05) 55%, rgb(255 255 255 / 0.18))" }}
          />
          <div className="absolute inset-y-0 left-[7.3%] right-0 flex flex-col px-[1.1em] pt-[26%]">
            <p className="font-display text-[2.3em] font-medium leading-[0.98] tracking-[-0.015em]" style={stamp}>
              {title}
            </p>
            <p className="mt-[0.9em] font-display text-[0.86em] italic" style={stamp}>
              {sub}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Stage                                                                */
/* ------------------------------------------------------------------ */

const STAGE = {
  linen: "bg-linen",
  board: "bg-board",
  cloth: "cloth-weave bg-cloth",
  paper: "bg-card",
} as const;

/**
 * Flat, square surface a mock lies on (the "table"): greyboard, linen, paper
 * or cloth. `caption` sits under the bottom left corner of the mock area and
 * says honestly what you look at.
 */
export function MockStage({
  children,
  tone = "linen",
  caption,
  className,
}: {
  children: ReactNode;
  tone?: keyof typeof STAGE;
  caption?: string;
  className?: string;
}) {
  return (
    <div className={cn("relative overflow-hidden", STAGE[tone], className)}>
      <div className="relative flex h-full w-full items-center justify-center">{children}</div>
      {caption && <p className="absolute bottom-3 left-3 bg-background px-2.5 py-1.5 text-[0.8125rem] font-medium leading-tight text-foreground sm:bottom-4 sm:left-4">{caption}</p>}
    </div>
  );
}

/** Composition: a closed cover behind an open spread. */
export function BookStill({
  kind = "opener",
  coverColor,
  coverTexture,
  className,
}: {
  kind?: SpreadKind;
  coverColor?: string;
  coverTexture?: CoverTexture;
  className?: string;
}) {
  return (
    <div className={cn("relative w-full", className)}>
      <div className="absolute -top-[22%] right-[4%] w-[30%] rotate-[7deg]">
        <BookCover color={coverColor} texture={coverTexture} />
      </div>
      <SampleSpread kind={kind} className="relative" />
    </div>
  );
}
