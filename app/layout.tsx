import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { organizationSchema, jsonLd } from "@/lib/jsonld";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { DEFAULT_OG_IMAGE } from "@/lib/seo";

// Self-hosted (OFL) so builds never depend on Google Fonts.
const jost = localFont({
  src: "./fonts/Jost-latin-wght.woff2",
  variable: "--font-jost",
  weight: "100 900",
  display: "swap",
});

const instrumentSans = localFont({
  src: "./fonts/InstrumentSans-latin-wght.woff2",
  variable: "--font-instrument",
  weight: "400 700",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Exclusieve binnendeuren op maat | Zebrano Studio",
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Zebrano Studio maakt exclusieve deuren op maat: elk ontwerp als taatsdeur, schuifdeur, draaideur of roomdivider. Luxe, bereikbaar gemaakt. Een merk van MTB Bouw.",
  applicationName: SITE_NAME,
  openGraph: {
    siteName: SITE_NAME,
    locale: "nl_NL",
    type: "website",
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: { card: "summary_large_image", images: [DEFAULT_OG_IMAGE.url] },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#f2f0ea",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="nl" className={`${jost.variable} ${instrumentSans.variable} h-full`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(organizationSchema()) }}
        />
        {/* Scroll reveals need JS; without it, show everything straight away. */}
        <noscript>
          <style>{".reveal{opacity:1!important;transform:none!important}"}</style>
        </noscript>
      </head>
      <body className="flex min-h-full flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
