import Aurora from "@/components/Aurora";
import BackToTop from "@/components/BackToTop";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import styles from "@/app/layout.module.css";
import type { LabApp } from "@/lib/labs";

/** 홈, 앱 목록, 앱 상세가 공유하는 Aurora 배경과 탐색 구조. 상세에서는 앱별 정책 링크를 더한다. */
export default function SiteFrame({
  children,
  footerApp,
}: {
  children: React.ReactNode;
  footerApp?: LabApp;
}) {
  return (
    <>
      {/* 하늘은 이름의 장마다 걸린다 — 404 도 같은 밤 아래 있다. */}
      <Aurora />
      <SiteHeader />
      <main className={styles.main}>{children}</main>
      <BackToTop />
      <SiteFooter app={footerApp} />
    </>
  );
}
