import type { Metadata } from "next";
import AppsSection from "@/components/sections/AppsSection";
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
  return <AppsSection expanded />;
}
