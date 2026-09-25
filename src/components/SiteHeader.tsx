import Link from "next/link";
import StarMark from "@/components/StarMark";
import HeaderBar from "@/components/HeaderBar";
import HeaderNavigation from "@/components/HeaderNavigation";
import { NAME } from "@/lib/site";
import styles from "@/app/layout.module.css";

/** 브랜드는 서버에서, 현재 경로와 좁은 화면의 메뉴는 HeaderNavigation에서 그린다. */
export default function SiteHeader() {
  return (
    <HeaderBar>
      <div className={styles.headerInner}>
        <Link href="/" className={styles.brand}>
          <StarMark gradientId="twinkle-brand" className={styles.star} />
          <span className={styles.brandName}>{NAME}</span>
        </Link>
        <HeaderNavigation />
      </div>
    </HeaderBar>
  );
}
