import { MONEY } from "@/lib/labs";
import styles from "@/app/home.module.css";

/**
 * 값에 대하여 — 제목과 문장을 한 시작선에 놓는 마지막 구획.
 *
 * 머리가 [SectionHead] 를 쓰지 않는 것은 마지막 구획만의 간결한 호흡을 지키기 때문이다.
 * 같은 꼴로 보이지만 다른 물건이라, 억지로 한 조각에 묶으면 그 조각이 곧 조건문이 된다.
 */
export default function MoneySection() {
  return (
    <section className={`${styles.section} ${styles.band} ${styles.reveal}`}>
      <div className={styles.shell}>
        <p className={styles.kicker}>{MONEY.eyebrow}</p>
        <h2 className={`${styles.sectionTitle} ${styles.moneyTitle}`}>{MONEY.title}</h2>
        <div className={styles.prose}>
          {MONEY.body.map((line) => (
            <p key={line} className={styles.body}>
              {line}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
