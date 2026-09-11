import AppsSection from "@/components/sections/AppsSection";
import DesignSection from "@/components/sections/DesignSection";
import FounderSection from "@/components/sections/FounderSection";
import HeroSection from "@/components/sections/HeroSection";
import HowSection from "@/components/sections/HowSection";
import MoneySection from "@/components/sections/MoneySection";
import NamesSection from "@/components/sections/NamesSection";

import type { Metadata } from "next";
import { shareCard } from "@/lib/seo";
import { NAME } from "@/lib/site";

const TITLE = `${NAME} | AI와 함께 만드는 1인 제품 스튜디오`;
const DESCRIPTION =
  "아이디어를 기획하고, 직접 만들고, 끝까지 운영합니다. 한 명의 개발자와 AI가 함께 완성하는 1인 제품 스튜디오입니다.";

export const metadata: Metadata = {
  // 홈은 제 이름을 통째로 쓴다 — 꼬리표(`· Twinkle AI Labs`)가 붙으면 이름이 두 번이다.
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  ...shareCard({ title: TITLE, description: DESCRIPTION, path: "/" }),
};

/**
 * 소개 화면 — **차례만** 든다.
 *
 * 구획 하나가 저마다 제 조각을 가지므로 이 파일은 「무엇이 어떤 순서로 서는가」를 말한다.
 * 한 화면을 한 파일에 몰아 두면 «앱 카드의 배지 색»을 고치러 히어로부터 스크롤하게 된다.
 */
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <NamesSection />
      <FounderSection />
      <AppsSection />
      <HowSection />
      <DesignSection />
      <MoneySection />
    </>
  );
}
