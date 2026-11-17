import type { CSSProperties, ReactNode } from "react";

type Tag = "div" | "li" | "section" | "article" | "header" | "figure";

/**
 * Plain wrapper. Sections used to fade up on scroll; the site no longer does
 * that, but the component stays so existing imports and markup keep working.
 * `delay` is accepted and ignored.
 */
export function Reveal({
  children,
  className,
  as: Component = "div",
  style,
  id,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: Tag;
  style?: CSSProperties;
  id?: string;
}) {
  return (
    <Component id={id} style={style} className={className}>
      {children}
    </Component>
  );
}
