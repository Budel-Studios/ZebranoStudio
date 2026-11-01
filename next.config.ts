import type { NextConfig } from "next";

/**
 * Redirects from the URLs of the original Zebrano site (2025, React SPA) to
 * their Dutch equivalents. Every old URL points straight at its content
 * equivalent — no chains. `permanent: true` → 308 (treated as 301).
 * Pages that no longer exist (Shopify, materials database, downloads) go to
 * the closest real page.
 */
const redirects: Array<{ source: string; destination: string }> = [
  { source: "/products", destination: "/" },
  { source: "/products/PivotDoor", destination: "/taatsdeuren" },
  { source: "/products/SlideDoor", destination: "/schuifdeuren" },
  { source: "/products/HingedDoors", destination: "/draaideuren" },
  { source: "/products/flushTowall", destination: "/wandvlakke-deuren" },
  { source: "/products/wallPartition", destination: "/roomdividers" },
  { source: "/products/biosirie", destination: "/boiserie" },
  { source: "/products/material", destination: "/materialen" },
  { source: "/collection", destination: "/collecties" },
  { source: "/collections/GlassCollection", destination: "/collecties/glas" },
  { source: "/collections/glass-collection", destination: "/collecties/glas" },
  { source: "/collections/FineerCollection", destination: "/collecties/fineer" },
  { source: "/collections/ThreeDCollection", destination: "/collecties/3d" },
  { source: "/collections/AtelierCollection", destination: "/collecties/atelier" },
  // Remove this line when MODULES.configurator goes live (lib/site.ts).
  { source: "/configurator", destination: "/contact" },
  { source: "/inspiration", destination: "/collecties" },
  { source: "/architects", destination: "/architecten" },
  { source: "/aboutus", destination: "/ons-verhaal" },
  { source: "/aboutus/ourStory", destination: "/ons-verhaal" },
  { source: "/aboutus/theMakers", destination: "/de-makers" },
  { source: "/aboutus/ConsciousNcrafts", destination: "/bewust-vakmanschap" },
  { source: "/aboutus/services", destination: "/service" },
  { source: "/privacy-Policy", destination: "/privacy" },
  { source: "/terms", destination: "/algemene-voorwaarden" },
  { source: "/library", destination: "/materialenbibliotheek" },
  { source: "/search", destination: "/" },
  { source: "/projects", destination: "/" },
  { source: "/projects/:id", destination: "/" },
  { source: "/journal", destination: "/" },
  { source: "/journal/:id", destination: "/" },
  { source: "/downloads", destination: "/" },
  { source: "/allProduct", destination: "/" },
  { source: "/shopify", destination: "/" },
  { source: "/shopify/:id", destination: "/" },
];

/**
 * GitHub Codespaces preview (.devcontainer): the dev server is reached via
 * <codespace>-3000.app.github.dev, so that host must be allowed for dev
 * assets and server actions. Only set inside a codespace.
 */
const codespacesHosts =
  process.env.CODESPACES === "true"
    ? [`*.${process.env.GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN || "app.github.dev"}`]
    : [];

const nextConfig: NextConfig = {
  ...(codespacesHosts.length ? { allowedDevOrigins: codespacesHosts } : {}),
  experimental: {
    serverActions: {
      // The request form can carry a few (client-side compressed) photos.
      bodySizeLimit: "6mb",
      ...(codespacesHosts.length ? { allowedOrigins: codespacesHosts } : {}),
    },
  },
  async redirects() {
    return redirects.map((r) => ({ ...r, permanent: true }));
  },
};

export default nextConfig;
