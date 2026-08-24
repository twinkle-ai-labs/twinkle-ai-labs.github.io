import type { MetadataRoute } from "next";
import { HOME_URL } from "@/lib/site";

/**
 * 이 집의 모든 장.
 *
 * 지금은 한 장뿐이다 — 그래도 세워 둔다. 장이 늘어난 날 «지도를 만들자»가 아니라
 * 여기에 한 줄을 더하는 일이 되어야, 새 장이 조용히 목록 밖에 남지 않는다.
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
  ];
}
