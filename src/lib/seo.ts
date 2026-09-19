/**
 * 검색과 나눔에 나가는 것 — 제목·설명·정본 주소, 그리고 기계가 읽는 표(JSON-LD).
 *
 * 화면의 말(`lib/labs`)과 이름·주소(`lib/site`)를 읽어 **한 자리에서** 짓는다.
 * 화면마다 손으로 적으면 문구를 다듬은 날 검색 결과만 옛말을 하게 된다.
 */

import type { Metadata } from "next";
import { APPS, HERO, STATUS_LABEL, doorStoreUrl, type LabApp } from "./labs";
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
  "Pocket PDF",
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
export function shareCard({
  title,
  description,
  path,
  image = OG_IMAGE,
}: {
  title: string;
  description: string;
  path: string;
  /** 카드 그림 — 비우면 이 집의 것. 앱의 문은 제 그림을 든다. */
  image?: typeof OG_IMAGE | { url: string; width: number; height: number; alt: string; type: string };
}): Pick<Metadata, "openGraph" | "twitter"> {
  return {
    openGraph: {
      type: "website",
      siteName: NAME,
      locale: "ko_KR",
      url: path,
      title,
      description,
      images: [image],
    },
    twitter: { card: "summary_large_image", title, description, images: [image.url] },
  };
}

/** 앱의 문(`/app/<slug>/`)이 서는 자리 — 장과 카드 그림이 같은 길을 읽는다. */
export function appDoorPath(slug: string): string {
  return `/app/${slug}/`;
}

/**
 * 앱의 문 한 장의 검색·나눔 정보 — 이름·한 줄·제 카드 그림.
 *
 * 문은 사람이 아니라 **공유 그림의 QR·메신저의 링크**가 먼저 연다. 카드가 이 집의
 * 것(«스스로 빛나다»)을 그대로 들면, 물타기 계산기를 나눈 사람의 대화창에 앱이 아니라
 * 스튜디오 소개가 뜬다 — 실제로 그랬다. 그래서 문마다 제 카드를 든다.
 *
 * ↩ 한때 `noindex` 였다 — 그때의 문은 스토어로 튕기기만 하는 빈 장이라 «정본은 스토어»가
 * 맞았다. 이제 문이 앱을 소개하는 장이 됐으므로 검색에 선다.
 */
export function appDoorMetadata(app: LabApp): Metadata {
  const path = appDoorPath(app.slug);
  /* 앱이 검색의 말(`page.seo`)을 들면 그것을 — ASO 의 제목 · 설명처럼 사람이 치는 낱말을 앞에 둔다.
     제목은 이 집의 꼬리(« · Twinkle AI Labs»)를 붙이지 않는다: 검색 결과는 한글 서른 자 남짓에서 자르므로
     꼬리가 붙으면 «목표 평단가 역산»이 잘려 나간다. 이름은 og:site_name 이 진다. */
  const seo = app.page?.seo;
  const title = seo?.title ?? app.name;
  const description = seo?.description ?? app.tagline;
  return {
    title: seo ? { absolute: title } : title,
    description,
    ...(seo ? { keywords: [...new Set([...seo.keywords, app.name, NAME])] } : {}),
    alternates: { canonical: path },
    ...shareCard({
      title: seo ? title : `${app.name} · ${NAME}`,
      description,
      path,
      image: { url: `${path}og.png`, ...OG_SIZE, alt: `${app.name}. ${app.page?.headline.replace("|", " ") ?? app.tagline}`, type: "image/png" },
    }),
  };
}

/** 앱 한 칸의 이름표 — 이 집의 표(`jsonLd`)와 문의 표(`appJsonLd`)가 **같은 것**을 가리키게 한다. */
export function appId(slug: string): string {
  return `${HOME_URL}${appDoorPath(slug)}#app`;
}

/**
 * 앱의 문 한 장의 기계가 읽는 표 — 앱 한 칸(MobileApplication)과 빵부스러기(BreadcrumbList).
 *
 * 이 집의 표에도 앱이 한 칸씩 있다(`jsonLd`). 두 칸이 같은 `@id` 를 들어 검색 엔진이 하나로 합친다 —
 * 이 집의 표는 «이런 앱이 있다», 문의 표는 «그 앱이 무엇을 하는가»를 더한다.
 * 값은 전부 문이 **화면에 보이는 것**에서 온다: 보이지 않는 말을 표에만 적으면 그것은 검색을 속이는 표다.
 * 평점 · 내려받기 수는 적지 않는다 — 우리가 센 적이 없는 숫자다.
 */
export function appJsonLd(app: LabApp): string {
  const page = app.page;
  const url = `${HOME_URL}${appDoorPath(app.slug)}`;
  const application = {
    "@type": "MobileApplication",
    "@id": appId(app.slug),
    name: app.name,
    url,
    description: page?.seo.description ?? app.blurb,
    applicationCategory: app.category,
    operatingSystem: "Android",
    inLanguage: page?.languages ?? ["ko"],
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: 0, priceCurrency: "KRW" },
    publisher: { "@id": `${HOME_URL}/#organization` },
    ...(app.icon ? { image: `${HOME_URL}${app.icon}` } : {}),
    ...(app.store ? { installUrl: doorStoreUrl(app), downloadUrl: app.store } : {}),
    ...(page
      ? {
          featureList: page.features.map((feature) => `${feature.title} — ${feature.body}`),
          screenshot: [page.hero, ...page.features.map((feature) => feature.screen)].map((screen) => `${HOME_URL}${screen.light}`),
        }
      : {}),
  };
  const breadcrumb = {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: NAME, item: `${HOME_URL}/` },
      { "@type": "ListItem", position: 2, name: app.name, item: url },
    ],
  };
  return JSON.stringify({ "@context": "https://schema.org", "@graph": [application, breadcrumb] });
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
    /* 문의 표(`appJsonLd`)와 같은 이름표 — 검색 엔진이 두 칸을 한 앱으로 합친다 */
    "@id": appId(app.slug),
    name: app.name,
    description: app.blurb,
    applicationCategory: app.category,
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
