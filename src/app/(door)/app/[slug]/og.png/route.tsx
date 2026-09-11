import fs from "node:fs";
import path from "node:path";
import { APPS, STATUS_LABEL } from "@/lib/labs";
import { appOgCard } from "@/lib/og";
import { DOMAIN } from "@/lib/seo";
import { NAME } from "@/lib/site";

/* 배포본은 서버가 없다 — 앱마다 한 장씩 빌드 때 구워져 정적 파일로 남는다. */
export const dynamic = "force-static";

/** 앱 목록이 곧 카드 목록이다 — 앱이 늘면 카드도 는다. */
export function generateStaticParams() {
  return APPS.map((app) => ({ slug: app.slug }));
}

/** `public/` 의 아이콘을 data URL 로 — satori 는 빌드 중에 제 주소를 못 연다. */
function iconDataUrl(icon: string): string {
  const file = fs.readFileSync(path.join(process.cwd(), "public", icon));
  return `data:image/png;base64,${file.toString("base64")}`;
}

/**
 * 앱의 문(`/app/<slug>/`)이 드는 나눔 카드 — 문의 첫 화면이 하는 말을 그대로 한다.
 *
 * 문이 `page` 를 들면 그 질문(`headline`)과 사실(`facts`)을, 없으면 앱의 한 줄과 지금 어디쯤인지를.
 * 이 집의 카드(`/og.png`)와는 판이 다르다: 저쪽은 «누가 만들었나», 이쪽은 «무슨 앱인가».
 */
export function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  return params.then(({ slug }) => {
    const app = APPS.find((candidate) => candidate.slug === slug);
    if (!app) return new Response("Not Found", { status: 404 });
    return appOgCard({
      name: app.name,
      headline: app.page ? app.page.headline.split("|") : [app.tagline],
      facts: app.page ? app.page.facts : [],
      status: app.page ? undefined : STATUS_LABEL[app.status],
      maker: NAME,
      domain: DOMAIN,
      icon: app.icon ? iconDataUrl(app.icon) : undefined,
    });
  });
}
