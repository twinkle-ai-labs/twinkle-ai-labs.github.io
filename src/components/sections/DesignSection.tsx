import SectionHead from "./SectionHead";
import { DESIGN_SECTION } from "@/lib/labs";
import styles from "@/app/home.module.css";

/**
 * 디자인 시스템 — 얼굴만 보이고 문을 가리킨다. 전문은 제 장에 산다.
 *
 * 색견본은 **이 화면의 제 토큰**으로 칠한다. hex 를 적어 두면 정본이 바뀌는 날
 * 견본만 옛 색으로 남고, 라이트·다크를 고를 때 견본이 갈아입지도 못한다.
 */
export default function DesignSection() {
  return (
    <section id="design" className={`${styles.section} ${styles.reveal}`}>
      <div className={styles.shell}>
        <SectionHead kicker={DESIGN_SECTION.eyebrow} title={DESIGN_SECTION.title} />
        <p className={styles.reading}>{DESIGN_SECTION.reading}</p>
        <p className={`${styles.body} ${styles.designLead}`}>{DESIGN_SECTION.lead}</p>

        <ul className={styles.swatches} aria-label="색 토큰">
          {DESIGN_SECTION.swatches.map((swatch) => (
            <li key={swatch.token} className={styles.swatch}>
              <span
                className={styles.swatchChip}
                style={{ background: `var(--${swatch.token})` }}
                aria-hidden="true"
              />
              <code className={styles.swatchToken}>{swatch.token}</code>
              <span className={styles.swatchLabel}>{swatch.label}</span>
            </li>
          ))}
        </ul>

        <ul className={styles.ladders}>
          {DESIGN_SECTION.ladders.map((ladder) => (
            <li key={ladder.name} className={styles.ladder}>
              <span className={styles.ladderName}>{ladder.name}</span>
              <span className={styles.ladderValue}>{ladder.value}</span>
              <span className={styles.ladderNote}>{ladder.note}</span>
            </li>
          ))}
        </ul>

        <p className={styles.designMore}>
          <a className={styles.inlineLink} href={DESIGN_SECTION.more.href}>
            {DESIGN_SECTION.more.label} <span aria-hidden="true">→</span>
          </a>
        </p>
      </div>
    </section>
  );
}
