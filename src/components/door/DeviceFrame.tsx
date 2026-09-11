import styles from "./door.module.css";

/**
 * 기기 틀 — 몸 · 옆의 단추 · 유리, 그리고 유리 안의 **상태바와 제스처 바**. 안에 무엇을 담을지는 부르는 쪽이 정한다.
 *
 * 화면 한 장을 담으면 [DeviceScreen], 화면 여럿을 겹쳐 담고 하나씩 보이면 [FeatureShowcase].
 * 틀은 화면을 자르지 않는다 — 비율(`--door-screen-ratio`)은 찍은 대로다(법 12).
 *
 * 하네스가 찍은 화면에는 상태바가 없다(화면만 세운다). 그대로 두면 유리 맨 위에 앱 제목이 붙어 «폰»이 아니라
 * «그림»으로 읽힌다. 그래서 틀이 위에 상태바(시각 · 신호 · 배터리), 아래에 제스처 바를 그린다 — 앱과 같은 판 색 위에,
 * 잉크로만. 화면 위에 덧그리면 제목이 가려지므로 화면의 **바깥**에 칸을 세운다.
 */
export type DeviceSize = "default" | "hero" | "stage";

const SIZE_CLASS: Record<DeviceSize, string> = {
  default: "",
  hero: styles.deviceHero,
  stage: styles.deviceStage,
};

/** 상태바의 시각 — 찍는 시각을 못 박듯 여기도 한 값이다. 스토어 사진의 «오늘 05:44» 와 다른 시각을 말하지 않게 같은 아침으로 */
const STATUS_TIME = "05:44";

const glyph = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "currentColor",
  "aria-hidden": true,
};

export default function DeviceFrame({
  size = "default",
  children,
}: {
  size?: DeviceSize;
  children: React.ReactNode;
}) {
  return (
    <figure className={`${styles.device} ${SIZE_CLASS[size]}`}>
      <div className={styles.screenWrap}>
        <div className={styles.statusBar} aria-hidden="true">
          <span className={styles.statusTime}>{STATUS_TIME}</span>
          <span className={styles.statusIcons}>
            {/* 신호 — 네 칸 */}
            <svg {...glyph} className={styles.statusGlyph}>
              <path d="M3 17h3v4H3zM8.5 13h3v8h-3zM14 8.5h3V21h-3zM19.5 3h3v18h-3z" />
            </svg>
            {/* 와이파이 */}
            <svg {...glyph} className={styles.statusGlyph}>
              <path d="M12 20.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM12 12.5c2.4 0 4.6.9 6.2 2.5l-1.8 1.8A6.1 6.1 0 0 0 12 15c-1.7 0-3.2.7-4.4 1.8l-1.8-1.8A8.7 8.7 0 0 1 12 12.5zM12 7c3.9 0 7.4 1.6 10 4.1l-1.8 1.8A11.6 11.6 0 0 0 12 9.6c-3.2 0-6.1 1.3-8.2 3.3L2 11.1C4.6 8.6 8.1 7 12 7z" />
            </svg>
            {/* 배터리 */}
            <svg {...glyph} className={styles.statusGlyph} viewBox="0 0 28 24">
              <path d="M3 7.5A2.5 2.5 0 0 1 5.5 5h15A2.5 2.5 0 0 1 23 7.5v9a2.5 2.5 0 0 1-2.5 2.5h-15A2.5 2.5 0 0 1 3 16.5v-9zm2 0v9a.5.5 0 0 0 .5.5h15a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-15a.5.5 0 0 0-.5.5zM24.5 9.5h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v-5z" />
              <path d="M6.5 8.5h12v7h-12z" />
            </svg>
          </span>
        </div>
        <div className={styles.screenArea}>{children}</div>
        <div className={styles.navBar} aria-hidden="true">
          <span className={styles.navPill} />
        </div>
      </div>
    </figure>
  );
}
