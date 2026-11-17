import type { Metadata } from "next";
import localFont from "next/font/local";
import { BRAND, SITE_URL } from "@/lib/brand";
import "./globals.css";

// Bodoni Moda with its optical-size axis (6-96) and weight axis (400-900).
const bodoni = localFont({
  src: [
    { path: "./fonts/bodoni-moda-latin-opsz-normal.woff2", style: "normal", weight: "400 900" },
    { path: "./fonts/bodoni-moda-latin-opsz-italic.woff2", style: "italic", weight: "400 900" },
  ],
  variable: "--font-bodoni",
  display: "swap",
});

const albert = localFont({
  src: "./fonts/albert-sans-latin-wght-normal.woff2",
  weight: "100 900",
  variable: "--font-albert",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${BRAND.name} — ${BRAND.tagline}`, template: `%s | ${BRAND.name}` },
  description:
    "Trouwboeken en reisboeken van koffietafelkwaliteit: hoofdstukken, geloften, speeches en foto's, samen ontworpen door fotograaf en bruidspaar.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl" className={`${bodoni.variable} ${albert.variable}`}>
      <body className="min-h-dvh">{children}</body>
    </html>
  );
}
