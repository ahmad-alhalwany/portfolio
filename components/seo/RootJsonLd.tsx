import { JsonLd } from "./JsonLd";
import { personJsonLd, profilePageJsonLd, webSiteJsonLd } from "@/lib/seo";

export function RootJsonLd() {
  return <JsonLd data={[personJsonLd(), webSiteJsonLd(), profilePageJsonLd()]} />;
}
