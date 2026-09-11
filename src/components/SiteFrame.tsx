import Aurora from "@/components/Aurora";
import BackToTop from "@/components/BackToTop";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import styles from "@/app/layout.module.css";

/**
 * 이름의 판 — 하늘 · 머리띠 · 바닥글. **Twinkle AI Labs 의 장**에만 걸린다.
 *
 * 전에는 뿌리 레이아웃이 이것을 모든 장에 걸었다. 그러자 앱의 문(`/app/<slug>/`)도 이름의
 * 머리띠 밑에 섰고, 문이 제 얼굴(어두운 무대)을 입자 머리띠만 밝게 남아 한 화면에 두 테마가
 * 섰다(2026-09-11). 문은 제 머리띠와 바닥글을 갖는다 — `(door)` 가 그 자리다.
 * 404 는 이름의 장이라 이 판을 직접 두른다.
 */
export default function SiteFrame({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* 하늘은 이름의 장마다 걸린다 — 404 도 같은 밤 아래 있다. */}
      <Aurora />
      <SiteHeader />
      <main className={styles.main}>{children}</main>
      <BackToTop />
      <SiteFooter />
    </>
  );
}
