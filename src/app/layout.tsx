import type { Metadata } from "next";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import { BLOG_URL, CONTACT_EMAIL, POLARIS_URL } from "@/lib/labs";
import "./globals.css";
import styles from "./layout.module.css";

const NAME = "Twinkle Labs";

export const metadata: Metadata = {
  metadataBase: new URL("https://twinklelabs.kr"),
  title: { default: `${NAME} — 난 스스로 빛난다`, template: `%s · ${NAME}` },
  description:
    "한 사람과 AI가 만드는 작은 유틸리티 앱들. 켜자마자 할 일이 끝나고, 쓰는 동안 생각할 것이 없는 도구를 만듭니다.",
};

// 화면이 그려지기 전에 테마를 정한다 — 늦으면 흰 화면이 한 번 번쩍인다.
const themeBoot = `(function(){try{var t=localStorage.getItem("twinkle-theme");if(t==="dark"||t==="light")document.documentElement.setAttribute("data-theme",t);}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
        <script dangerouslySetInnerHTML={{ __html: themeBoot }} />
      </head>
      <body>
        <header className={styles.header}>
          <div className={styles.headerInner}>
            <Link href="/" className={styles.brand}>
              {/* brand/symbol-*.svg 의 별 — 동그라미가 아니라 트윙클이 얼굴이다. */}
              <svg className={styles.star} viewBox="0 0 100 100" aria-hidden="true">
                <defs>
                  <linearGradient id="brand-star" x1="14" y1="86" x2="86" y2="14" gradientUnits="userSpaceOnUse">
                    <stop offset="0" style={{ stopColor: "var(--primary)" }} />
                    <stop offset="1" style={{ stopColor: "var(--primary-lit)" }} />
                  </linearGradient>
                </defs>
                <path
                  d="M50 12 C58.36 36.624 63.376 41.64 88 50 C63.376 58.36 58.36 63.376 50 88 C41.64 63.376 36.624 58.36 12 50 C36.624 41.64 41.64 36.624 50 12 Z"
                  fill="url(#brand-star)"
                />
              </svg>
              <span className={styles.brandName}>{NAME}</span>
            </Link>
            <nav className={styles.nav}>
              <a href={POLARIS_URL} className={styles.navLink}>
                약관
              </a>
              <ThemeToggle toLight="밝은 화면으로" toDark="어두운 화면으로" />
            </nav>
          </div>
        </header>
        <main className={styles.main}>{children}</main>
        <footer className={styles.footer}>
          <div className={styles.footerInner}>
            <p className={styles.footerLine}>
              {NAME} — 난 스스로 빛난다. 법인이 아니라 개인이 만들고 운영하는 이름입니다.
            </p>
            <nav className={styles.footerLinks}>
              <a href={POLARIS_URL} className={styles.footerLink}>
                약관 보관소
              </a>
              <a href={BLOG_URL} className={styles.footerLink}>
                블로그
              </a>
              <a href={`mailto:${CONTACT_EMAIL}`} className={styles.footerLink}>
                {CONTACT_EMAIL}
              </a>
            </nav>
          </div>
        </footer>
      </body>
    </html>
  );
}
