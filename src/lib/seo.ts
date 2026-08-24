/**
 * 검색과 나눔에 나가는 것 — 제목·설명·정본 주소, 그리고 기계가 읽는 표(JSON-LD).
 *
 * 화면의 말(`lib/labs`)과 이름·주소(`lib/site`)를 읽어 **한 자리에서** 짓는다.
 * 화면마다 손으로 적으면 문구를 다듬은 날 검색 결과만 옛말을 하게 된다.
 */

import type { Metadata } from "next";
import { APPS, HERO, STATUS_LABEL } from "./labs";
import { BLOG_URL, CONTACT_EMAIL, DESIGN_URL, HOME_URL, NAME, POLARIS_URL } from "./site";
import { OG_SIZE } from "./og";

/** 이 집의 한 줄 소개 — 검색 결과에 서는 문장이다. */
export const DESCRIPTION =
  "아이디어를 기획하고, 직접 만들고, 끝까지 운영합니다. 한 명의 개발자와 AI가 함께 완성하는 1인 제품 스튜디오입니다.";

/** 주소를 눈으로 읽는 꼴 — 나눔 카드의 발치에 선다. */
export const DOMAIN = new URL(HOME_URL).host;

/**
 * 나눔 카드의 주소 — `app/og.png/route.tsx` 가 빌드 때 굽는다.
 *
 * 크기를 함께 적는 것은 긁어 가는 쪽이 그림을 받기 **전에** 자리를 잡기 위해서다.
 */
export const OG_IMAGE = {
  url: "/og.png",
  ...OG_SIZE,
  alt: `${NAME} — ${HERO.title}`,
  type: "image/png",
} as const;

/**
 * 검색이 이 집을 부르는 말.
 *
 * 백 개를 늘어놓아도 순위가 오르지 않는다 — 실제로 이 집이 무엇인지 말하는
 * 몇 낱말만 둔다. 늘어놓은 목록은 검색 엔진이 아니라 사람을 속이는 쪽에 가깝다.
 */
export const KEYWORDS = [
  NAME,
  "트윙클 에이아이 랩스",
  "개인 개발자",
  "1인 개발 스튜디오",
  "안드로이드 앱 개발",
  "물타기 계산기",
  "Aurora Ledger",
  "디자인 시스템",
] as const;

/**
 * 한 장의 나눔 정보(OpenGraph·트위터) 한 벌.
 *
 * Next 는 `openGraph` 를 **통째로** 갈아 끼운다 — 장이 제목만 적으면 레이아웃이
 * 정한 카드 그림·이름이 조용히 떨어진다. 실제로 홈의 카드에서 그림이 빠져 있었다.
 * 그래서 장은 이 함수로 한 벌을 통째로 짓는다.
 */
export function shareCard({ title, description, path }: { title: string; description: string; path: string }): Pick<Metadata, "openGraph" | "twitter"> {
  return {
    openGraph: {
      type: "website",
      siteName: NAME,
      locale: "ko_KR",
      url: path,
      title,
      description,
      images: [OG_IMAGE],
    },
    twitter: { card: "summary_large_image", title, description, images: [OG_IMAGE.url] },
  };
}

/** 사람 이름 — 이 집을 만들고 운영하는 한 사람. */
export const FOUNDER_NAME = "김희정";

/** JSON-LD 한 덩이. `@graph` 로 묶어 **문서에 script 하나만** 세운다. */
export function jsonLd(): string {
  const organization = {
    "@type": "Organization",
    "@id": `${HOME_URL}/#organization`,
    name: NAME,
    url: `${HOME_URL}/`,
    /* 법인이 아니다 — 개인이 만들고 운영하는 이름이다. 그래서 Organization 의
       founder 와 이 집의 주인이 같은 사람을 가리킨다. */
    logo: `${HOME_URL}/icon.png`,
    image: `${HOME_URL}/og.png`,
    email: CONTACT_EMAIL,
    slogan: HERO.title,
    description: DESCRIPTION,
    founder: { "@type": "Person", name: FOUNDER_NAME },
    sameAs: [DESIGN_URL, BLOG_URL, POLARIS_URL],
  };

  const website = {
    "@type": "WebSite",
    "@id": `${HOME_URL}/#website`,
    url: `${HOME_URL}/`,
    name: NAME,
    description: DESCRIPTION,
    inLanguage: "ko-KR",
    publisher: { "@id": `${HOME_URL}/#organization` },
  };

  /* 앱 하나가 한 칸 — 스토어 주소가 있는 것만 «내려받을 수 있는 것»으로 선다.
     아직 스토어에 없는 앱까지 SoftwareApplication 으로 적으면 검색 결과에
     받을 수 없는 앱이 뜬다. */
  const apps = APPS.map((app) => ({
    "@type": "SoftwareApplication",
    name: app.name,
    description: app.blurb,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Android",
    inLanguage: "ko-KR",
    creativeWorkStatus: STATUS_LABEL[app.status],
    publisher: { "@id": `${HOME_URL}/#organization` },
    ...(app.icon ? { image: `${HOME_URL}${app.icon}` } : {}),
    ...(app.store ? { url: app.store } : {}),
  }));

  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [organization, website, ...apps],
  });
}
