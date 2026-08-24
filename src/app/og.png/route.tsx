import { HERO } from "@/lib/labs";
import { ogCard } from "@/lib/og";
import { DOMAIN } from "@/lib/seo";
import { NAME } from "@/lib/site";

/* 배포본은 서버가 없다 — 이 그림은 빌드 때 한 번 구워져 정적 파일로 남는다. */
export const dynamic = "force-static";

/**
 * 이 집의 나눔 카드 — 첫 화면이 말하는 것을 그대로 말한다.
 *
 * Next 의 `opengraph-image` 규약 대신 **주소를 우리가 짓는다**. 그 규약은 정적
 * 내보내기에서 확장자 없는 파일(`out/opengraph-image`)을 남기는데, 깃허브 페이지는
 * 확장자로 «이게 무엇인지»를 말하므로 그 파일은 그림이 아니라 내려받을 덩어리가 된다 —
 * 카드를 긁어 가는 쪽(트위터·슬랙)은 그걸 그림으로 읽지 않는다.
 */
export function GET() {
  return ogCard({ eyebrow: NAME, title: HERO.title, lead: HERO.define, domain: DOMAIN });
}
