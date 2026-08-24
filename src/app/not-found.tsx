import Link from "next/link";
import StarMark from "@/components/StarMark";
import styles from "./not-found.module.css";

/* 없는 곳은 **목록에 올리지 않는다** — 404 가 검색 결과에 서면
   찾아온 사람이 처음부터 빈손이다. */
export const metadata = {
  title: "여기엔 아무것도 없습니다",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className={styles.wrap}>
      <StarMark className={styles.mark} />
      <p className={styles.code}>404</p>
      <h1 className={styles.title}>여기엔 아무것도 없습니다</h1>
      <p className={styles.body}>주소를 다시 확인하시거나, 처음으로 돌아가 주세요.</p>
      <Link href="/" className={styles.cta}>
        처음으로
      </Link>
    </div>
  );
}
