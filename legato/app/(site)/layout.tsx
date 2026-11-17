import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { JsonLd } from "@/components/ui/primitives";
import { organizationSchema } from "@/lib/jsonld";

/**
 * Chrome for the marketing pages only (route group): menu bar and footer.
 * The studio app at /studio lives outside this group and stays chrome-free.
 */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a
        href="#inhoud"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-sm focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:text-primary-foreground"
      >
        Naar de inhoud
      </a>
      <SiteHeader />
      <main id="inhoud">{children}</main>
      <SiteFooter />
      <JsonLd data={organizationSchema()} />
    </>
  );
}
