import SectionHead from "./SectionHead";
import { HOW } from "@/lib/labs";
import styles from "@/app/home.module.css";

/** 만드는 방식 — 번호가 붙은 넷. 차례가 뜻을 가지므로 `ol` 이다. */
export default function HowSection() {
  return (
    <section className={`${styles.section} ${styles.band} ${styles.reveal}`}>
      <div className={styles.shell}>
        <SectionHead kicker={HOW.eyebrow} title={HOW.title} />
        <ol className={styles.howGrid}>
          {HOW.items.map((item, index) => (
            <li key={item.title} className={styles.howItem}>
              <span className={styles.howNum} aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className={styles.howTitle}>{item.title}</h3>
              <p className={styles.body}>{item.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
