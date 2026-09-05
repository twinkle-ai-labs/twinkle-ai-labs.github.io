import type { MetadataRoute } from "next";
import { APPS } from "@/lib/labs";
import { appDoorPath } from "@/lib/seo";
import { HOME_URL } from "@/lib/site";

/**
 * 이 집의 모든 장.
 *
 * 첫 장과 앱의 문들. 앱의 문은 목록(`lib/labs`)이 늘면 따라 는다 —
 * 새 장이 조용히 목록 밖에 남지 않게.
 * 404 는 넣지 않는다: 없는 곳을 찾아오라고 안내할 이유가 없다.
 */
/* 배포본은 서버가 없다 — 이 파일은 빌드 때 한 번 구워져 정적 파일로 남는다. */
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${HOME_URL}/`,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...APPS.map((app) => ({
      url: `${HOME_URL}${appDoorPath(app.slug)}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
