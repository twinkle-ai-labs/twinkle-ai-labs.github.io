import Image from "next/image";
import type { DoorScreen } from "@/lib/labs";
import styles from "./door.module.css";

/** 화면 한 장의 화소 — 360×720dp 를 2배로 찍어 720×1440 (법 12) */
const SCREEN_W = 720;
const SCREEN_H = 1440;

/**
 * 앱의 날 화면 한 장 — **사람이 고른 테마의 것**으로 선다.
 *
 * 두 장을 다 싣고 CSS 가 하나를 숨긴다. 숨긴 쪽(`display: none`)은 낭독기에도 없으므로
 * 이름표가 두 번 읽히지 않는다. 테마를 스크립트로 고르면 첫 그림에서 한 번 뒤바뀌어 보인다.
 */
export default function ScreenImage({
  screen,
  eager = false,
  hidden = false,
}: {
  screen: DoorScreen;
  /** 첫 화면의 것 — 먼저 받는다 */
  eager?: boolean;
  /** 겹쳐 둔 화면 중 지금 보이지 않는 것 — 낭독기에서도 물러난다 */
  hidden?: boolean;
}) {
  return (
    <>
      <Image
        className={`${styles.screen} ${styles.screenLight}`}
        src={screen.light}
        alt={screen.alt}
        width={SCREEN_W}
        height={SCREEN_H}
        loading={eager ? "eager" : "lazy"}
        priority={eager}
        aria-hidden={hidden || undefined}
      />
      <Image
        className={`${styles.screen} ${styles.screenDark}`}
        src={screen.dark}
        alt={screen.alt}
        width={SCREEN_W}
        height={SCREEN_H}
        loading="lazy"
        aria-hidden={hidden || undefined}
      />
    </>
  );
}
