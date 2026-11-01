"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Tag = "div" | "li" | "section" | "article" | "header" | "figure";

/** Fades content up once it scrolls into view (the .reveal utility in globals.css). */
export function Reveal({
  children,
  className,
  delay = 0,
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
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Component
      ref={ref as never}
      id={id}
      data-visible={visible}
      style={{ transitionDelay: `${delay}ms`, ...style }}
      className={cn("reveal", className)}
    >
      {children}
    </Component>
  );
}
