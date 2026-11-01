import { cva, type VariantProps } from "class-variance-authority";

/**
 * Button styles from the Lovable design: tight radius, small caps-free label,
 * five variants (primary forest, outline, light and outline-light for dark
 * sections, text link with the copper underline). Use on <Link>, <a> or
 * <button>: className={button({ variant, size })}.
 */
export const button = cva(
  "group/btn inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-sm text-sm font-medium tracking-[0.01em] transition-colors duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground hover:bg-primary-hover",
        outline: "[&_svg]:text-copper border border-foreground/25 text-foreground hover:border-foreground",
        light: "bg-forest-foreground text-forest hover:bg-sand",
        outlineLight: "border border-forest-foreground/30 text-forest-foreground hover:border-forest-foreground",
        text: "[&_svg]:text-copper px-0 text-foreground link-line rounded-none",
      },
      size: {
        sm: "h-9 px-4 text-[0.8125rem]",
        md: "h-11 px-5",
        lg: "h-12 px-6",
      },
    },
    compoundVariants: [{ variant: "text", class: "h-auto px-0" }],
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export type ButtonVariants = VariantProps<typeof button>;
