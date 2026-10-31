"use client";

import { useEffect, useRef, useState } from "react";

/** Curtain ends at 1.75s + 1.1s; this is only the fallback if the animation can't be read. */
const FALLBACK_MS = 3200;
/** After the hero has played in (last fade ends ~4.2s, spotlight sweep ~5.1s). */
const SETTLE_MS = 5600;

let settleScheduled = false;

/**
 * Intro screen on the first homepage visit of a session: Zebrano green with
 * the white logo, a progress line and a 000 → 100 counter, then the whole
 * screen slides up into the hero (as on budelstudios.com; asked for in the
 * 2025 brief).
 *
 * Whether it plays is decided before first paint by the inline script in
 * app/layout.tsx (html[data-intro="play"]); the sequence itself is pure CSS
 * (.zs-preloader in app/globals.css), timed from first paint like the hero,
 * so the two stay in step however late the page hydrates. This component
 * only locks scrolling while the intro plays and tidies up afterwards.
 * Skipped for prefers-reduced-motion and on later visits in the session.
 */
export function Preloader() {
  const ref = useRef<HTMLDivElement>(null);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    if (html.dataset.intro !== "play") return;

    // Once the hero has played in, drop the flag so that coming back to the
    // homepage later in this visit (client-side) skips the intro and its delays.
    if (!settleScheduled) {
      settleScheduled = true;
      window.setTimeout(() => delete html.dataset.intro, SETTLE_MS);
    }

    let active = true;
    html.style.overflow = "hidden";
    const finish = () => {
      if (!active) return;
      active = false;
      html.style.overflow = "";
      setGone(true);
    };
    const curtain = ref.current
      ?.getAnimations()
      .find((a) => (a as CSSAnimation).animationName === "zs-curtain-up");
    curtain?.finished.then(finish, () => {});
    const fallback = window.setTimeout(finish, FALLBACK_MS);

    return () => {
      active = false;
      window.clearTimeout(fallback);
      html.style.overflow = "";
    };
  }, []);

  if (gone) return null;

  return (
    <div
      ref={ref}
      aria-hidden
      className="zs-preloader fixed inset-0 z-[100] flex-col items-center justify-center bg-forest text-paper"
    >
      <div
        className="zs-preloader-logo h-[clamp(64px,11vw,120px)] bg-paper [mask:url(/brand/logo-stacked.svg)_center/contain_no-repeat] [-webkit-mask:url(/brand/logo-stacked.svg)_center/contain_no-repeat]"
        style={{ aspectRatio: "1649.32 / 484.69" }}
      />
      <p className="zs-preloader-line mt-6 font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-paper/60">
        Exclusieve binnendeuren op maat
      </p>
      <div className="mt-10 h-px w-56 overflow-hidden bg-paper/20 sm:w-72">
        <div className="zs-preloader-bar h-full bg-paper" />
      </div>
      <span className="zs-preloader-count mt-4 font-sans text-xs tabular-nums text-paper/60" />
    </div>
  );
}
