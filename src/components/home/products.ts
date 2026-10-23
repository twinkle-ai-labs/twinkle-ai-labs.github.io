import { APPS, type LabApp } from "@/lib/labs";

function featuredApp(slug: string): LabApp & { icon: string } {
  const app = APPS.find((item) => item.slug === slug);
  if (!app?.icon) throw new Error(`Featured app requires an icon: ${slug}`);
  return { ...app, icon: app.icon };
}

export const pdf = featuredApp("pocket-pdf");
export const stock = featuredApp("stock-calculator");
