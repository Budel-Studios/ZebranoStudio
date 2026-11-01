import { notFound } from "next/navigation";
import { Suspense } from "react";
import { MaterialLibrary, MaterialLibraryView } from "@/components/library/material-library";
import { CtaSection, DotTitle, PageHeader } from "@/components/ui/primitives";
import { isModuleOn } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Materialenbibliotheek: hout, fineer, glas, steen en meer",
  description:
    "Blader door de materialen van Zebrano Studio en filter op tint, intensiteit, interieurstijl en toepassing: eiken, noten, zebranofineer, ribbelglas, travertin, brons en meer.",
  path: "/materialenbibliotheek",
});

/** Materialenbibliotheek (module, lib/site.ts) — as on the old site, in the Lovable design. */
export default function MaterialenbibliotheekPage() {
  if (!isModuleOn("materialenbibliotheek")) notFound();
  return (
    <>
      <PageHeader
        eyebrow="Materialen"
        // Soft hyphen: on a phone the long word breaks as "Materialen-bibliotheek".
        title={<DotTitle>{"Materialen\u00ADbibliotheek"}</DotTitle>}
        crumbs={[
          { name: "Materialen", path: "/materialen" },
          { name: "Materialenbibliotheek", path: "/materialenbibliotheek" },
        ]}
        intro={
          <p>
            Elk Zebrano-ontwerp begint met de juiste materiaalkeuze. Van tijdloos hout en verfijnde fineerlagen tot glas, beslag
            en op maat gemaakte afwerkingen: deze bibliotheek is er om je te inspireren. Gebruik de filters om tinten,
            toepassingen en stijlen te ontdekken en vind de perfecte match voor je project.
          </p>
        }
      />
      <Suspense fallback={<MaterialLibraryView search="" />}>
        <MaterialLibrary />
      </Suspense>
      <CtaSection
        eyebrow="Advies"
        title="Twijfel je tussen materialen?"
        text="We denken graag met je mee over wat bij jouw ruimte past, van houtsoort tot greep. Vertel ons wat je zoekt."
      />
    </>
  );
}
