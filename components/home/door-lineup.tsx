import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon, ArrowUpRightIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

type Motion = "pivot" | "sliding" | "hinged" | "flush" | "divider";

type Door = {
  name: string;
  href: string;
  motion: Motion;
  /** Face of the door leaf. Without an image the leaf is plain wall colour. */
  leaf?: { src: string; alt: string; position?: string };
};

/**
 * "Deuren die we maken" — a row of doors that open on hover, each the way
 * that door type really moves: the pivot door turns on its off-centre axis,
 * the sliding door slides away, the hinged door swings on its side, the
 * flush door opens out of a plain wall and the room divider folds its
 * panels. Behind every door: the link to its page.
 * Pure CSS (group-hover / group-focus-visible) — no client JS.
 */
const DOORS: Door[] = [
  {
    name: "Taatsdeur",
    href: "/taatsdeuren",
    motion: "pivot",
    leaf: { src: "/images/taatsdeur-visgraat.webp", alt: "Houten taatsdeur met visgraatpatroon" },
  },
  {
    name: "Schuifdeur",
    href: "/schuifdeuren",
    motion: "sliding",
    leaf: { src: "/images/schuifdeur-hout.webp", alt: "Houten schuifdeur met diagonale lijnen", position: "30% 50%" },
  },
  {
    name: "Draaideur",
    href: "/draaideuren",
    motion: "hinged",
    leaf: { src: "/images/boiserie-1.webp", alt: "Klassieke paneeldeur met sierlijsten", position: "50% 40%" },
  },
  { name: "Wandvlakke deur", href: "/wandvlakke-deuren", motion: "flush" },
  {
    name: "Roomdivider",
    href: "/roomdividers",
    motion: "divider",
    leaf: { src: "/images/glas-ribbel.webp", alt: "Ribbelglas in een zwart profiel" },
  },
];

// Opened, every leaf ends up in the left half of the opening (edge-on or
// slid aside), so the "Bekijk" panel behind it is laid out on the right.
const leafMotion: Record<Exclude<Motion, "divider">, string> = {
  pivot:
    "origin-[30%_50%] group-hover:[transform:rotateY(-80deg)] group-focus-visible:[transform:rotateY(-80deg)]",
  hinged:
    "origin-left group-hover:[transform:rotateY(-80deg)] group-focus-visible:[transform:rotateY(-80deg)]",
  flush:
    "origin-left group-hover:[transform:rotateY(-80deg)] group-focus-visible:[transform:rotateY(-80deg)]",
  sliding: "group-hover:-translate-x-[86%] group-focus-visible:-translate-x-[86%]",
};

export function DoorLineup({ className }: { className?: string }) {
  return (
    <ul className={cn("door-lineup flex snap-x gap-4 overflow-x-auto pb-2 sm:gap-5 lg:overflow-visible lg:pb-0", className)}>
      {DOORS.map((door, i) => (
        <li key={door.href} className="w-[40vw] max-w-[190px] shrink-0 snap-start sm:w-[28vw] lg:w-auto lg:max-w-none lg:flex-1">
          <Link href={door.href} className="group block outline-none" aria-label={`${door.name} — bekijk`}>
            <div className="relative aspect-[1/2] [perspective:1000px]">
              {/* What's behind the door (the name is in the caption below) */}
              <div className="absolute inset-0 flex flex-col items-end justify-between rounded-[3px] bg-forest p-3 text-right text-paper sm:p-4">
                <span className="font-sans text-[11px] tabular-nums text-paper/50">{String(i + 1).padStart(2, "0")}</span>
                <span className="flex items-center gap-1.5 font-sans text-[11px] font-semibold uppercase tracking-[0.16em]">
                  Bekijk
                  <ArrowUpRightIcon className="size-3.5" />
                </span>
              </div>

              {/* The door leaf */}
              {door.motion === "divider" ? (
                <div className="absolute inset-0 flex overflow-hidden rounded-[3px]">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className={cn(
                        "relative h-full flex-1 border-r border-ink/40 transition-transform duration-700 ease-zebrano last:border-r-0",
                        i === 1 && "group-hover:-translate-x-full group-focus-visible:-translate-x-full",
                        i === 2 && "group-hover:-translate-x-[200%] group-focus-visible:-translate-x-[200%]",
                      )}
                    >
                      {door.leaf && (
                        <Image
                          src={door.leaf.src}
                          alt={i === 0 ? door.leaf.alt : ""}
                          fill
                          sizes="80px"
                          className="object-cover"
                          style={{ objectPosition: `${i * 50}% 50%` }}
                        />
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className={cn("absolute inset-0", door.motion === "sliding" && "overflow-hidden rounded-[3px]")}>
                  <div
                    className={cn(
                      "absolute inset-0 overflow-hidden rounded-[3px] shadow-[0_18px_40px_-24px_rgb(20_24_18/0.55)] transition-transform duration-[900ms] ease-zebrano will-change-transform",
                      leafMotion[door.motion],
                      door.motion === "flush" && "bg-gradient-to-b from-[#f1eee8] to-[#e4dfd5] shadow-none",
                    )}
                  >
                    {door.leaf ? (
                      <Image
                        src={door.leaf.src}
                        alt={door.leaf.alt}
                        fill
                        sizes="(min-width: 1024px) 12vw, 40vw"
                        className="object-cover"
                        style={{ objectPosition: door.leaf.position ?? "50% 50%" }}
                      />
                    ) : (
                      // A flush door is the wall itself: only the shadow gap and a recessed grip show it.
                      <>
                        <span aria-hidden className="absolute inset-0 rounded-[3px] ring-1 ring-inset ring-ink/15" />
                        <span aria-hidden className="absolute right-[11%] top-1/2 h-[12%] w-[3px] -translate-y-1/2 rounded-full bg-ink/15 shadow-[inset_0_1px_2px_rgb(0_0_0/0.25)]" />
                      </>
                    )}
                    {door.motion !== "sliding" && door.motion !== "flush" && (
                      <span aria-hidden className="absolute right-[10%] top-1/2 h-[14%] w-[3px] -translate-y-1/2 rounded-full bg-white/80 shadow" />
                    )}
                  </div>
                </div>
              )}

              {/* Opening in the wall: a fine line, as in an architect's drawing */}
              <span
                aria-hidden
                className={cn(
                  "pointer-events-none absolute -inset-[5px] rounded-[4px] border",
                  door.motion === "flush" ? "border-ink/10" : "border-line/45",
                )}
              />
            </div>
            <div className="mt-4 flex items-center justify-between gap-2 text-[13px] sm:text-sm">
              <span className="font-medium text-ink transition-colors group-hover:text-accent">{door.name}</span>
              <ArrowRightIcon className="size-4 text-ink/40 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-accent" />
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
