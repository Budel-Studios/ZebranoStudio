import { cva, type VariantProps } from "class-variance-authority";

/**
 * Buttons: 2px radius, Albert Sans, no icons appended. Variants:
 * - primary: the ribbon button (saffron, ink text), the one call to action
 * - cloth: solid cloth blue, for secondary actions on paper
 * - outline: hairline on paper
 * - light / outlineLight: on cloth sections (light = ribbon there as well)
 * - text: a plain underlined link
 * Use on <Link>, <a> or <button>: className={button({ variant, size })}.
 */
export const button = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm text-[0.9375rem] font-medium leading-none transition-colors duration-200 disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      variant: {
        primary: "bg-ribbon text-ink hover:bg-ribbon-hover",
        cloth: "bg-cloth text-cloth-foreground hover:bg-cloth-deep",
        outline: "border border-foreground/30 text-foreground hover:border-foreground hover:bg-foreground/[0.04]",
        light: "bg-ribbon text-ink hover:bg-ribbon-hover",
        outlineLight: "border border-cloth-foreground/40 text-cloth-foreground hover:border-cloth-foreground hover:bg-cloth-foreground/10",
        text: "rounded-none text-foreground link-line",
      },
      size: {
        sm: "h-10 px-4 text-sm",
        md: "h-11 px-5",
        lg: "h-12 px-6",
      },
    },
    compoundVariants: [{ variant: "text", class: "h-auto px-0 leading-normal" }],
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export type ButtonVariants = VariantProps<typeof button>;
