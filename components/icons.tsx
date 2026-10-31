import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

/** Diagonal arrow (↗) used in pill buttons. */
export function ArrowUpRightIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 16 16" {...base} strokeWidth={1.5} {...props}>
      <path d="M4.5 11.5l7-7M5.5 4.5h6v6" />
    </svg>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function PhoneIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M5 4h3.5l1.6 4.2-2.1 1.4a11.5 11.5 0 0 0 6.4 6.4l1.4-2.1L20 15.5V19a1.5 1.5 0 0 1-1.6 1.5A16.5 16.5 0 0 1 3.5 5.6 1.5 1.5 0 0 1 5 4Z" />
    </svg>
  );
}

export function PlusIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function MinusIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M5 12h14" />
    </svg>
  );
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function PinterestIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M10.6 20.2l1.7-7M12.3 13.2c.4 1.3 1.6 1.9 2.8 1.6 2-.5 2.9-2.8 2.4-4.8-.6-2.3-3-3.6-5.6-3.1-2.7.5-4.3 3-3.7 5.4" />
    </svg>
  );
}

export function WhatsAppIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M4.5 19.5l1.2-3.6A8 8 0 1 1 8.6 18.6Z" />
      <path d="M9.2 8.6c.2-.4.5-.4.8-.4h.5c.2 0 .4.1.5.4l.6 1.5c.1.2 0 .5-.1.6l-.5.6c.6 1.2 1.6 2.1 2.8 2.7l.6-.5c.2-.2.4-.2.6-.1l1.5.7c.3.1.4.3.4.5v.5c0 .3-.1.6-.4.8-.5.4-1.2.6-1.9.4a8.3 8.3 0 0 1-5.1-5.1c-.2-.7 0-1.4.3-1.9Z" />
    </svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  );
}

/* ─── Door-type line icons (homepage "Deurtypes", original site style) ─── */

export function PivotDoorIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 120 80" {...base} strokeWidth={1.2} {...props}>
      <path d="M8 74h104" />
      <path d="M20 74V10h80v64" opacity={0.45} />
      <path d="M48 74V12l30 8v54" />
      <circle cx="60" cy="72" r="1.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function SlidingDoorIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 120 80" {...base} strokeWidth={1.2} {...props}>
      <path d="M8 74h104M14 8h92" />
      <path d="M22 74V12h40v62" opacity={0.45} />
      <path d="M52 74V12h44v62" />
      <path d="M66 42h-10M60 38l-4 4 4 4" />
    </svg>
  );
}

export function HingedDoorIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 120 80" {...base} strokeWidth={1.2} {...props}>
      <path d="M8 74h104" />
      <path d="M36 74V10h48v64" opacity={0.45} />
      <path d="M36 10l30 8v58l-30-2" />
      <circle cx="60" cy="44" r="1.6" fill="currentColor" stroke="none" />
    </svg>
  );
}
