import type { MetadataRoute } from "next";
import { HOME_URL } from "@/lib/site";

/**
 * 기어다니는 것들에게 하는 말.
 *
 * 막을 것이 없다 — 이 집은 통째로 보여 주려고 세운 곳이다. 그래도 파일을 두는 것은
 * **길 안내(`sitemap`)를 여기서 한 번 하기 위해서**다. 없으면 크롤러가 주소를
 * 링크로만 찾고, 링크가 닿지 않는 장은 영영 못 찾는다.
 */
/* 배포본은 서버가 없다 — 이 파일은 빌드 때 한 번 구워져 정적 파일로 남는다. */
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${HOME_URL}/sitemap.xml`,
    host: HOME_URL,
  };
}
