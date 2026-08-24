import type { Metadata, Viewport } from "next";
import Analytics from "@/components/Analytics";
import Aurora from "@/components/Aurora";
import BackToTop from "@/components/BackToTop";
import Providers from "@/components/Providers";
import RouteViews from "@/components/RouteViews";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { DESCRIPTION, FOUNDER_NAME, KEYWORDS, jsonLd, shareCard } from "@/lib/seo";
import { THEME_BOOT_SCRIPT } from "@/lib/theme";
import { HOME_URL, NAME } from "@/lib/site";
import "./globals.css";
import styles from "./layout.module.css";

/** Pretendard — 굵기는 «가진 넷»만 부른다. 없는 굵기는 브라우저가 흉내 내거나 이웃 칸으로 스냅한다. */
const PRETENDARD_CSS =
  "https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css";

export const metadata: Metadata = {
  metadataBase: new URL(HOME_URL),
  title: { default: `${NAME} — 스스로 빛나다`, template: `%s · ${NAME}` },
  description: DESCRIPTION,
  keywords: [...KEYWORDS],
  authors: [{ name: FOUNDER_NAME, url: `${HOME_URL}/` }],
  creator: FOUNDER_NAME,
  publisher: NAME,
  applicationName: NAME,
  /* 정본 주소는 **장마다** 다르므로 여기서는 뿌리만 못 박고, 각 장이 제 것을 덮어쓴다.
     비워 두면 같은 화면이 `/`·`/index.html`·물음표가 붙은 주소로 여럿 서고,
     검색 엔진이 어느 쪽을 정본으로 볼지 스스로 정한다. */
  alternates: { canonical: "/" },
  ...shareCard({ title: `${NAME} — 스스로 빛나다`, description: DESCRIPTION, path: "/" }),
  robots: {
    index: true,
    follow: true,
    /* 검색 결과의 미리보기를 우리가 줄이지 않는다 — 글자 수도, 그림 크기도.
       기본값은 짧게 자르는 쪽이라, 적어 두지 않으면 카드가 한 줄로 선다. */
    googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large", "max-video-preview": -1 },
  },
  formatDetection: { telephone: false, address: false, email: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

/**
 * 문서의 뼈대 — 어느 화면에나 같은 것만 든다.
 *
 * 머리띠와 바닥글은 제 조각([SiteHeader] · [SiteFooter])이 그린다. 레이아웃이
 * 그 안까지 들고 있으면 «메뉴 한 줄»을 고치러 문서의 뿌리를 열게 되고,
 * 그 파일은 곧 아무도 통째로 읽지 않는 길이가 된다.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href={PRETENDARD_CSS} />
        {/* 첫 그림 전에 얼굴을 정한다 — React 를 기다리면 어두운 화면을 고른 사람이 흰 화면을 한 번 본다. */}
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOT_SCRIPT }} />
        {/* 기계가 읽는 표 — 사람에게는 안 보이지만 검색 결과의 얼굴을 정한다.
            한 덩이(`@graph`)로 묶어 문서에 script 하나만 세운다. */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd() }} />
        <Analytics />
      </head>
      <body>
        <Providers>
          <RouteViews />
          {/* 하늘은 어느 화면에나 걸린다 — 404 도 같은 밤 아래 있다. */}
          <Aurora />
          <SiteHeader />
          <main className={styles.main}>{children}</main>
          <BackToTop />
          <SiteFooter />
        </Providers>
      </body>
    </html>
  );
}
