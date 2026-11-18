/**
 * Stand-in for next/link and next/navigation in the single-file artifact
 * build: an in-memory router, because an artifact has no server routes and
 * only plain #name hashes.
 */
import { useSyncExternalStore, type AnchorHTMLAttributes, type ReactNode } from "react";

let current = "/";
const listeners = new Set<() => void>();

export function navigate(to: string) {
  if (/^(https?:|mailto:|tel:)/.test(to)) return;
  const [path, hash] = to.split("#");
  current = path || current;
  listeners.forEach((l) => l());
  requestAnimationFrame(() => {
    const el = hash ? document.getElementById(hash) : null;
    if (el) el.scrollIntoView();
    else window.scrollTo(0, 0);
  });
}

const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => listeners.delete(l);
};

export const usePath = () => useSyncExternalStore(subscribe, () => current, () => current);
export const usePathname = () => usePath().split("?")[0];
export const useSearchParams = () => new URLSearchParams(usePath().split("?")[1] ?? "");
export const useRouter = () => ({ push: navigate, replace: navigate, back: () => navigate("/"), refresh: () => {}, prefetch: () => {} });
export const notFound = () => navigate("/");
export const redirect = (to: string) => navigate(to);

type LinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & { href: string | { pathname?: string }; children?: ReactNode; prefetch?: boolean; replace?: boolean; scroll?: boolean };

export default function Link({ href, onClick, prefetch: _p, replace: _r, scroll: _s, target: _t, ...rest }: LinkProps) {
  const to = typeof href === "string" ? href : (href.pathname ?? "/");
  const external = /^(https?:|mailto:|tel:)/.test(to);
  return (
    <a
      {...rest}
      href={external ? to : "#"}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      onClick={(e) => {
        onClick?.(e);
        if (external || e.defaultPrevented) return;
        e.preventDefault();
        navigate(to);
      }}
    />
  );
}
