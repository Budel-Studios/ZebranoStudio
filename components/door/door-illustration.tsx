import type { DoorIllustration as Kind } from "@/data/producten";

/**
 * Large line drawings for door types without a suitable photo — the original
 * site used the same idea for its hinged-door page (green field, thin lines).
 * Honest placeholders: drawings, not someone else's photos.
 */
export function DoorIllustration({ kind, className }: { kind: Kind; className?: string }) {
  const common = {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 400 400",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className,
    "aria-hidden": true,
  };
  switch (kind) {
    case "hinged":
      return (
        <svg {...common}>
          <path d="M40 360h320" />
          <path d="M120 360V60h160v300" opacity={0.4} />
          <path d="M120 60l96 26v296l-96-22" />
          <path d="M132 96l70 18M132 340l70 12" opacity={0.5} />
          <circle cx="196" cy="226" r="3" fill="currentColor" stroke="none" />
          <path d="M120 360c40 6 80 9 120 9" strokeDasharray="3 6" opacity={0.5} />
        </svg>
      );
    case "pivot":
      return (
        <svg {...common}>
          <path d="M40 360h320" />
          <path d="M80 360V50h240v310" opacity={0.4} />
          <path d="M170 360V54l110 26v280" />
          <circle cx="205" cy="358" r="3" fill="currentColor" stroke="none" />
          <path d="M150 368c40 12 100 12 150-4" strokeDasharray="3 6" opacity={0.5} />
        </svg>
      );
    case "sliding":
      return (
        <svg {...common}>
          <path d="M40 360h320M60 50h280" />
          <path d="M90 360V60h130v300" opacity={0.4} />
          <path d="M180 360V60h140v300" />
          <path d="M240 210h-50M200 200l-10 10 10 10" />
        </svg>
      );
    case "flush":
      return (
        <svg {...common}>
          <path d="M40 360h320" />
          <path d="M60 40h280v320H60z" opacity={0.25} />
          <path d="M160 360V80h110v280" strokeDasharray="2 5" />
          <path d="M252 222v-26" />
          <path d="M60 40l100 40M340 40l-70 40" opacity={0.2} />
        </svg>
      );
    case "divider":
      return (
        <svg {...common}>
          <path d="M40 360h320M40 50h320" />
          <path d="M70 360V50M150 360V50M230 360V50M310 360V50" />
          <path d="M70 205h240" opacity={0.35} />
          <path d="M110 50v310M190 50v310M270 50v310" opacity={0.18} />
        </svg>
      );
  }
}
