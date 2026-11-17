import type { AccessoireArt } from "@/data/accessoires";
import { cn } from "@/lib/utils";

/**
 * Drawn illustrations of the accessories (no product photography exists
 * yet). Flat shapes in the brand tones with a gold detail; purely decorative.
 */

const LINEN = "oklch(0.85 0.022 80)";
const LINEN_DARK = "oklch(0.76 0.026 78)";
const WINE = "var(--wine)";
const WINE_DARK = "oklch(0.25 0.065 18)";
const PAPER = "oklch(0.975 0.006 85)";
const EDGE = "oklch(0.9 0.012 85)";
const GOLD = "var(--gold)";
const SHADOW = "oklch(0.2 0.02 40 / 0.14)";
const WOOD = "oklch(0.7 0.05 70)";
const WOOD_DARK = "oklch(0.58 0.055 65)";

const ART: Record<AccessoireArt, React.ReactNode> = {
  boekenlegger: (
    <>
      <ellipse cx="120" cy="176" rx="74" ry="6" fill={SHADOW} />
      {/* Book, seen from the front, with the ribbon hanging out */}
      <rect x="62" y="34" width="112" height="140" rx="2" fill={WINE} />
      <rect x="62" y="34" width="9" height="140" fill={WINE_DARK} />
      <rect x="71" y="170" width="103" height="4" fill={EDGE} />
      <path d="M118 174 V196 l5 -5 l5 5 V174 Z" fill={GOLD} />
      {/* Loose bookmark */}
      <g transform="rotate(-9 150 100)">
        <rect x="136" y="46" width="30" height="108" rx="2" fill={LINEN} />
        <rect x="136" y="46" width="30" height="108" rx="2" fill="none" stroke={LINEN_DARK} strokeWidth="1" />
        <rect x="141" y="51" width="20" height="98" rx="1" fill="none" stroke={LINEN_DARK} strokeWidth="0.75" />
        <circle cx="151" cy="60" r="2.4" fill={PAPER} stroke={LINEN_DARK} strokeWidth="0.75" />
        <path d="M151 57.6 C151 44 158 38 164 30" stroke={GOLD} strokeWidth="1.4" fill="none" strokeLinecap="round" />
        <text x="151" y="110" textAnchor="middle" fontSize="13" fill={LINEN_DARK} style={{ fontFamily: "var(--font-display)", fontStyle: "italic" }}>
          N&amp;D
        </text>
      </g>
    </>
  ),
  boekstandaard: (
    <>
      <ellipse cx="120" cy="180" rx="84" ry="6" fill={SHADOW} />
      {/* Stand */}
      <path d="M52 170 L92 60 L104 60 L70 170 Z" fill={WOOD_DARK} />
      <path d="M188 170 L148 60 L136 60 L170 170 Z" fill={WOOD_DARK} />
      <rect x="40" y="164" width="160" height="10" rx="2" fill={WOOD} />
      {/* Open book on the stand */}
      <path d="M44 66 C70 56 98 58 120 68 C142 58 170 56 196 66 V160 C170 150 142 152 120 162 C98 152 70 150 44 160 Z" fill={WINE} />
      <path d="M50 64 C74 55 100 57 120 67 V157 C100 147 74 145 50 154 Z" fill={PAPER} />
      <path d="M190 64 C166 55 140 57 120 67 V157 C140 147 166 145 190 154 Z" fill={PAPER} />
      <path d="M120 67 V157" stroke="oklch(0.3 0.02 50 / 0.25)" strokeWidth="2" />
      <path d="M58 76 C76 70 96 71 112 78 V124 C96 117 76 116 58 122 Z" fill="oklch(0.84 0.035 42)" />
      <path d="M130 84 C146 78 164 77 182 82 M130 94 C146 88 164 87 182 92 M130 104 C146 98 164 97 176 101" stroke="oklch(0.27 0.014 45 / 0.35)" strokeWidth="1.4" fill="none" strokeLinecap="round" />
      <path d="M120 157 V178 l4 -4 l4 4 V160" fill={GOLD} />
    </>
  ),
  presentatiebox: (
    <>
      <ellipse cx="120" cy="182" rx="88" ry="6" fill={SHADOW} />
      {/* Box base */}
      <path d="M38 96 H202 V174 a3 3 0 0 1 -3 3 H41 a3 3 0 0 1 -3 -3 Z" fill={LINEN_DARK} />
      <rect x="46" y="96" width="148" height="72" fill="oklch(0.3 0.02 40 / 0.18)" />
      {/* Book inside */}
      <rect x="56" y="104" width="128" height="64" rx="1.5" fill={WINE} />
      <rect x="56" y="104" width="128" height="6" fill={WINE_DARK} />
      <path d="M116 110 V90 h8 V110 Z" fill={GOLD} />
      {/* Lid, lifted and tilted */}
      <g transform="rotate(-11 120 60)">
        <rect x="34" y="40" width="172" height="34" rx="3" fill={LINEN} />
        <rect x="34" y="66" width="172" height="8" fill={LINEN_DARK} />
        <text x="120" y="60" textAnchor="middle" fontSize="12" letterSpacing="3" fill={LINEN_DARK} style={{ fontFamily: "var(--font-display)" }}>
          NOOR &amp; DAAN
        </text>
      </g>
    </>
  ),
  ouderboeken: (
    <>
      <ellipse cx="120" cy="180" rx="92" ry="6" fill={SHADOW} />
      {/* Main book */}
      <rect x="34" y="38" width="100" height="138" rx="2" fill={WINE} />
      <rect x="34" y="38" width="8" height="138" fill={WINE_DARK} />
      <rect x="42" y="172" width="92" height="4" fill={EDGE} />
      <text x="88" y="92" textAnchor="middle" fontSize="12" fill="oklch(0.42 0.08 18)" style={{ fontFamily: "var(--font-display)" }}>
        Noor &amp; Daan
      </text>
      <rect x="78" y="100" width="20" height="1" fill="oklch(0.42 0.08 18)" />
      {/* Two parent books */}
      <rect x="144" y="98" width="56" height="78" rx="1.5" fill={LINEN} />
      <rect x="144" y="98" width="5" height="78" fill={LINEN_DARK} />
      <rect x="149" y="173" width="51" height="3" fill={EDGE} />
      <text x="174" y="130" textAnchor="middle" fontSize="7" fill={LINEN_DARK} style={{ fontFamily: "var(--font-display)" }}>
        Noor &amp; Daan
      </text>
      <rect x="156" y="84" width="56" height="12" rx="1.5" fill="oklch(0.64 0.035 62)" transform="rotate(-4 184 90)" />
      <rect x="156" y="93" width="56" height="3" fill={EDGE} transform="rotate(-4 184 90)" />
    </>
  ),
  slipcase: (
    <>
      <ellipse cx="120" cy="182" rx="88" ry="6" fill={SHADOW} />
      {/* Book sliding out to the right */}
      <rect x="92" y="46" width="118" height="128" rx="2" fill={WINE} />
      <rect x="92" y="46" width="118" height="5" fill={EDGE} />
      <rect x="202" y="51" width="8" height="123" fill={WINE_DARK} />
      <text x="206" y="112" textAnchor="middle" fontSize="6" letterSpacing="1.5" fill="oklch(0.5 0.08 18)" transform="rotate(90 206 112)" style={{ fontFamily: "var(--font-display)" }}>
        NOOR &amp; DAAN
      </text>
      {/* Case */}
      <rect x="34" y="40" width="122" height="138" rx="2" fill={LINEN} />
      <rect x="150" y="40" width="6" height="138" fill={LINEN_DARK} />
      <rect x="34" y="40" width="122" height="138" rx="2" fill="none" stroke={LINEN_DARK} strokeWidth="1" />
      <path d="M156 96 a13 13 0 0 0 0 26" fill="oklch(0.3 0.02 40 / 0.2)" />
      <rect x="84" y="104" width="22" height="1.4" fill={GOLD} />
    </>
  ),
};

export function AccessoryArt({ id, className }: { id: AccessoireArt; className?: string }) {
  return (
    <svg viewBox="0 0 240 200" aria-hidden="true" className={cn("h-auto w-full", className)}>
      {ART[id]}
    </svg>
  );
}
