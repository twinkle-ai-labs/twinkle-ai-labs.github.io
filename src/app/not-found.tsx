import Link from "next/link";
import StarMark from "@/components/StarMark";
import styles from "./not-found.module.css";

export const metadata = { title: "여기엔 아무것도 없습니다" };

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
