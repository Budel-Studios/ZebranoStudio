import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { organizationSchema, jsonLd } from "@/lib/jsonld";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { DEFAULT_OG_IMAGE } from "@/lib/seo";

// Self-hosted (OFL) so builds never depend on Google Fonts.
const montserrat = localFont({
  src: "./fonts/Montserrat-latin-wght.woff2",
  variable: "--font-montserrat",
  weight: "100 900",
  display: "swap",
});

const inter = localFont({
  src: "./fonts/Inter-latin-wght.woff2",
  variable: "--font-inter",
  weight: "100 900",
  display: "swap",
});

const poppins = localFont({
  src: [
    { path: "./fonts/Poppins-latin-300.woff2", weight: "300", style: "normal" },
    { path: "./fonts/Poppins-latin-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/Poppins-latin-500.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Exclusieve binnendeuren op maat | Zebrano Studio",
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Zebrano Studio maakt taatsdeuren, schuifdeuren, wandvlakke deuren, roomdividers en boiserie op maat — exclusief design, bereikbaar gemaakt. Een merk van MTB Bouw.",
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
  themeColor: "#2f3a2a",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="nl"
      className={`${montserrat.variable} ${inter.variable} ${poppins.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(organizationSchema()) }}
        />
      </head>
      <body className="flex min-h-full flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
