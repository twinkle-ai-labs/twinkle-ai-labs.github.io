"use client";

import Image from "next/image";
import ThemeToggle from "@/components/ThemeToggle";
import type { LabApp } from "@/lib/labs";
import { THEME_TOGGLE_LABELS } from "@/lib/site";
import { useAppSelector } from "@/store/hooks";
import { selectIsPageScrolled } from "@/store/scrollSlice";
import GetButton from "./GetButton";
import styles from "./door.module.css";

/**
 * 문의 머리띠 — 앱의 얼굴 하나, 테마 하나, 받기 하나.
 *
 * 이름(Twinkle AI Labs)의 메뉴는 여기 서지 않는다 — 문에 떨어진 사람에게 «디자인 시스템»
 * 이나 «블로그» 는 할 일이 아니다. 한 픽셀이라도 내려가면 판에서 떠오른다.
 */
export default function DoorHeader({ app }: { app: LabApp }) {
  const isScrolled = useAppSelector(selectIsPageScrolled);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.headerScrolled : ""}`}>
      <div className={styles.headerInner}>
        <a className={styles.brand} href="#top">
          {app.icon && <Image className={styles.brandIcon} src={app.icon} alt="" width={64} height={64} />}
          <span className={styles.brandName}>{app.name}</span>
        </a>
        <div className={styles.headerEnd}>
          <ThemeToggle {...THEME_TOGGLE_LABELS} />
          <GetButton app={app} small />
        </div>
      </div>
    </header>
  );
}
