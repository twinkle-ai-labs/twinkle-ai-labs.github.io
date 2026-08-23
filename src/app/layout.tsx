import type { Metadata } from "next";
import Link from "next/link";
import Analytics from "@/components/Analytics";
import Aurora from "@/components/Aurora";
import Starfield from "@/components/Starfield";
import RouteViews from "@/components/RouteViews";
import StarMark from "@/components/StarMark";
import ThemeToggle from "@/components/ThemeToggle";
import HeaderBar from "@/components/HeaderBar";
import BackToTop from "@/components/BackToTop";
import Providers from "@/components/Providers";
import { BLOG_URL, CONTACT_EMAIL, DESIGN_URL, POLARIS_URL } from "@/lib/labs";
import "./globals.css";
import styles from "./layout.module.css";

const NAME = "Twinkle AI Labs";

export const metadata: Metadata = {
  metadataBase: new URL("https://twinklelabs.kr"),
  title: { default: `${NAME} — 스스로 빛나다`, template: `%s · ${NAME}` },
  description:
    "기획부터 운영까지 직접 이어 온 개발자가 AI와 함께 생각을 제품으로 만드는 개인 작업실입니다.",
};

// 화면이 그려지기 전에 테마를 정한다 — 쿠키를 먼저 읽어 서브도메인 간 동기화하고, 없으면 localStorage를 본다.
const themeBoot = `(function(){try{var m=document.cookie.match(/(?:^|; )twinkle-theme=([^;]*)/);var t=m?decodeURIComponent(m[1]):null;if(t==="dark"||t==="light")document.documentElement.setAttribute("data-theme",t);}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
        <script dangerouslySetInnerHTML={{ __html: themeBoot }} />
        <Analytics />
      </head>
      <body>
        <Providers>
        <RouteViews />
        {/* 하늘은 어느 화면에나 걸린다 — 404 도 같은 밤 아래 있다. */}
        <Aurora />
        <HeaderBar>
          <div className={styles.headerInner}>
            <Link href="/" className={styles.brand}>
              <StarMark gradientId="twinkle-brand" className={styles.star} />
              <span className={styles.brandName}>{NAME}</span>
            </Link>
            <nav className={styles.nav} aria-label="주요 메뉴">
              <a href="/" className={`${styles.navLink} ${styles.navLinkActive}`} aria-current="page">
                홈
              </a>
              <a href={DESIGN_URL} className={styles.navLink}>
                디자인 시스템
              </a>
              <a href={BLOG_URL} className={styles.navLink}>
                블로그
              </a>
              <a href={POLARIS_URL} className={styles.navLink}>
                약관
              </a>
              <ThemeToggle toLight="밝은 화면으로" toDark="어두운 화면으로" />
            </nav>
          </div>
        </HeaderBar>
        <main className={styles.main}>{children}</main>
        <BackToTop />
        <footer className={styles.footer}>
          {/* 바닥에도 하늘 한 자락 — 첫 화면과 마지막 화면이 같은 말로 끝난다. */}
          <Starfield
            seed={19910104}
            height="100%"
            dots={26}
            sparkles={3}
            className={styles.footerSky}
          />
          <div className={styles.footerInner}>
            <div className={styles.footerTop}>
              <div className={styles.footerBrand}>
                <p className={styles.footerName}>
                  <StarMark className={styles.footerStar} />
                  {NAME}
                </p>
                <p className={styles.footerLine}>
                  한 명의 개발자가 AI와 함께 만들고 직접 운영하는 개인 제품 스튜디오입니다.
                </p>
              </div>
              <nav className={styles.footerColumn} aria-label="바닥글 메뉴">
                <p className={styles.footerHeading}>바로가기</p>
                <div className={styles.footerLinks}>
                  <Link href="/" className={styles.footerLink}>홈</Link>
                  <a href={DESIGN_URL} className={styles.footerLink}>디자인 시스템</a>
                  <a href={BLOG_URL} className={styles.footerLink}>블로그</a>
                  <a href={POLARIS_URL} className={styles.footerLink}>약관</a>
                </div>
              </nav>
              <div className={styles.footerColumn}>
                <p className={styles.footerHeading}>연락</p>
                <a className={styles.footerMail} href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
              </div>
            </div>
            <div className={styles.footerBottom}>
              <p className={styles.footerCopyright}>© 2026 {NAME}</p>
              <p className={styles.footerMotto}>스스로 빛나다.</p>
            </div>
          </div>
        </footer>
        </Providers>
      </body>
    </html>
  );
}
