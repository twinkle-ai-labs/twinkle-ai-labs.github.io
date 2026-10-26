import type { Metadata } from "next";
import AuroraCatalog from "@/components/sections/AuroraCatalog";
import { APPS_SECTION } from "@/lib/labs";
import { shareCard } from "@/lib/seo";
import { NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "앱",
  description: APPS_SECTION.summary,
  alternates: { canonical: "/app/" },
  ...shareCard({
    title: `앱 · ${NAME}`,
    description: APPS_SECTION.summary,
    path: "/app/",
  }),
};

export default function AppsPage() {
  return <AuroraCatalog />;
}
