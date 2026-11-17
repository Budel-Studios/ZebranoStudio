"use client";

import { COVER_MATERIALS, fontPairOf, formatOf } from "@/lib/book/catalog";
import type { Project } from "@/lib/book/types";

const luminance = (hex: string) => {
  const n = parseInt(hex.slice(1), 16);
  return (0.299 * ((n >> 16) & 255) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255;
};

/** The closed book: cover fabric with a debossed title. A sketch, not a print file. */
export function CoverMock({ project, fit = "height" }: { project: Project; fit?: "height" | "width" }) {
  const f = formatOf(project.formatId);
  const material = COVER_MATERIALS.find((m) => m.id === project.cover.material) ?? COVER_MATERIALS[0];
  const color = material.colors.find((c) => c.id === project.cover.color) ?? material.colors[0];
  const dark = luminance(color.hex) < 0.5;
  const fonts = fontPairOf(project.style.fontPair);
  const foil = project.cover.debossing === "goud" ? "#c9a45c" : project.cover.debossing === "zilver" ? "#c9cbd0" : undefined;
  const ink = foil ?? (dark ? "rgb(255 255 255 / 0.2)" : "rgb(0 0 0 / 0.22)");
  const texture = material.id === "leer" || material.id === "suede" || material.id === "fluweel"
    ? "radial-gradient(circle at 30% 20%, rgb(255 255 255 / 0.10), transparent 60%)"
    : "repeating-linear-gradient(0deg, rgb(0 0 0 / 0.035) 0 1px, transparent 1px 3px), repeating-linear-gradient(90deg, rgb(255 255 255 / 0.04) 0 1px, transparent 1px 3px)";
  return (
    <div className={fit === "height" ? "relative mx-auto h-full" : "relative w-full"} style={{ aspectRatio: `${f.pageW} / ${f.pageH}`, containerType: "inline-size" }}>
      <div className="absolute inset-0 rounded-[2px]" style={{ background: `${texture}, ${color.hex}`, boxShadow: "inset 10px 0 14px -10px rgb(0 0 0 / 0.45), inset -1px 0 0 rgb(255 255 255 / 0.12), 0 30px 50px -28px rgb(0 0 0 / 0.6), 6px 6px 0 -2px rgb(250 247 240), 7px 7px 0 -2px rgb(0 0 0 / 0.15)" }}>
        <div className="flex h-full flex-col items-center justify-center px-[12%] text-center" style={{ color: ink, textShadow: foil ? "0 1px 0 rgb(0 0 0 / 0.25)" : dark ? "0 1px 0 rgb(0 0 0 / 0.5), 0 -1px 0 rgb(255 255 255 / 0.06)" : "0 1px 0 rgb(255 255 255 / 0.5), 0 -1px 0 rgb(0 0 0 / 0.12)" }}>
          <p style={{ fontFamily: fonts.display, fontSize: "9cqw", lineHeight: 1.05, fontStyle: fonts.displayStyle === "italic" ? "italic" : undefined, textTransform: fonts.displayStyle === "caps" ? "uppercase" : undefined, letterSpacing: fonts.displayStyle === "caps" ? "0.14em" : undefined, fontWeight: 500 }}>{project.cover.title || project.names || "Titel"}</p>
          {project.cover.subtitle && <p className="mt-[4cqw] uppercase" style={{ fontFamily: fonts.text, fontSize: "2.6cqw", letterSpacing: "0.3em" }}>{project.cover.subtitle}</p>}
        </div>
      </div>
    </div>
  );
}
