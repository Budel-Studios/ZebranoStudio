import { LegalPage } from "@/components/legal-page";
import { privacy } from "@/data/privacy";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacyverklaring",
  description: "Hoe Zebrano Studio (een handelsnaam van MTB Bouw B.V.) met je persoonsgegevens omgaat.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return <LegalPage doc={privacy} path="/privacy" />;
}
