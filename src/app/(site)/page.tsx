import AuroraHome from "@/components/home/AuroraHome";

import type { Metadata } from "next";
import { shareCard } from "@/lib/seo";
import { NAME } from "@/lib/site";

const TITLE = `${NAME} | 필요한 도구를, 좋아하는 모습으로`;
const DESCRIPTION =
  "일상의 필요에서 출발해 기능과 디자인을 함께 다듬습니다. 만드는 사람이 먼저 쓰는 앱, Twinkle AI Labs의 도구와 이야기를 만나보세요.";

export const metadata: Metadata = {
  // 홈은 제 이름을 통째로 쓴다 — 꼬리표(`· Twinkle AI Labs`)가 붙으면 이름이 두 번이다.
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  ...shareCard({ title: TITLE, description: DESCRIPTION, path: "/" }),
};

export default function HomePage() {
  return <AuroraHome />;
}
