import type { SVGProps } from "react";

/**
 * Brand icons lucide-react doesn't have. Everything else uses lucide-react
 * with strokeWidth 1.25, as in the Lovable design.
 */
export function WhatsAppIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <path d="M4.5 19.5l1.2-3.6A8 8 0 1 1 8.6 18.6Z" />
      <path d="M9.2 8.6c.2-.4.5-.4.8-.4h.5c.2 0 .4.1.5.4l.6 1.5c.1.2 0 .5-.1.6l-.5.6c.6 1.2 1.6 2.1 2.8 2.7l.6-.5c.2-.2.4-.2.6-.1l1.5.7c.3.1.4.3.4.5v.5c0 .3-.1.6-.4.8-.5.4-1.2.6-1.9.4a8.3 8.3 0 0 1-5.1-5.1c-.2-.7 0-1.4.3-1.9Z" />
    </svg>
  );
}
