import { createRoot } from "react-dom/client";
import type { ReactNode } from "react";
import SiteLayout from "@/app/(site)/layout";
import Home from "@/app/(site)/page";
import HetBoek from "@/app/(site)/het-boek/page";
import Hoofdstukken from "@/app/(site)/hoofdstukken/page";
import Reisboeken from "@/app/(site)/reisboeken/page";
import Accessoires from "@/app/(site)/accessoires/page";
import VoorFotografen from "@/app/(site)/voor-fotografen/page";
import Werkwijze from "@/app/(site)/werkwijze/page";
import Over from "@/app/(site)/over/page";
import Faq from "@/app/(site)/veelgestelde-vragen/page";
import Privacy from "@/app/(site)/privacy/page";
import Voorwaarden from "@/app/(site)/voorwaarden/page";
import StudioLayout from "@/app/studio/layout";
import { Dashboard } from "@/components/studio/dashboard";
import { Editor } from "@/components/studio/editor";
import { PrintView } from "@/components/studio/print-view";
import Link, { usePathname } from "./router";

// The viewer never shows confirm(); every such step in the studio can be undone.
window.confirm = () => true;

const SITE: Record<string, () => ReactNode> = {
  "/": Home, "/het-boek": HetBoek, "/hoofdstukken": Hoofdstukken, "/reisboeken": Reisboeken, "/accessoires": Accessoires,
  "/voor-fotografen": VoorFotografen, "/werkwijze": Werkwijze, "/over": Over, "/veelgestelde-vragen": Faq, "/privacy": Privacy, "/voorwaarden": Voorwaarden,
};

function Contact() {
  return (
    <section className="mx-auto max-w-2xl px-6 py-40">
      <h1 className="text-h2">Contact</h1>
      <p className="mt-6 text-lead text-muted-foreground">In deze voorvertoning is het aanvraagformulier uitgeschakeld: hier is geen server die het bericht kan versturen. Op de echte website staat het formulier op deze plek.</p>
      <Link href="/" className="mt-8 inline-block underline underline-offset-4">Terug naar de homepage</Link>
    </section>
  );
}

function App() {
  const path = usePathname();
  const project = path.match(/^\/studio\/project\/([^/]+)(\/print)?$/);
  if (project) return <StudioLayout>{project[2] ? <PrintView id={project[1]} /> : <Editor key={project[1]} id={project[1]} />}</StudioLayout>;
  if (path.startsWith("/studio")) return <StudioLayout><Dashboard /></StudioLayout>;
  const Page = SITE[path] ?? (path.startsWith("/contact") || path === "/bedankt" ? Contact : Home);
  return <SiteLayout><Page key={path} /></SiteLayout>;
}

createRoot(document.getElementById("legato")!).render(<App />);
