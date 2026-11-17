import { Ribbon } from "@/components/site/ribbon";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { JsonLd } from "@/components/ui/primitives";
import { organizationSchema } from "@/lib/jsonld";

/**
 * Chrome for the marketing pages only (route group): menu bar, ribbon marker and footer.
 * The studio app at /studio lives outside this group and stays chrome-free.
 */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a
        href="#inhoud"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-sm focus:bg-ribbon focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-ink"
      >
        Naar de inhoud
      </a>
      <SiteHeader />
      <Ribbon />
      <main id="inhoud">{children}</main>
      <SiteFooter />
      <JsonLd data={organizationSchema()} />
    </>
  );
}
