import { LegalPage } from "@/components/legal-page";
import { voorwaarden } from "@/data/voorwaarden";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Algemene voorwaarden",
  description: "De algemene voorwaarden van Zebrano Studio, een handelsnaam van MTB Bouw B.V.: offerte, overeenkomst, levering, betaling, garantie en aansprakelijkheid.",
  path: "/algemene-voorwaarden",
});

export default function VoorwaardenPage() {
  return <LegalPage doc={voorwaarden} path="/algemene-voorwaarden" />;
}
