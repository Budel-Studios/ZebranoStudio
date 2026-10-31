import { LegalPage } from "@/components/legal-page";
import { cookiebeleid } from "@/data/privacy";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Cookiebeleid",
  description: "Zebrano Studio gebruikt geen cookies voor analyse of marketing. Lees hier wat de website wel en niet doet.",
  path: "/cookiebeleid",
});

export default function CookiebeleidPage() {
  return <LegalPage doc={cookiebeleid} path="/cookiebeleid" />;
}
