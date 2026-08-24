import SectionHead from "./SectionHead";
import { FOUNDER } from "@/lib/labs";
import styles from "@/app/home.module.css";

/** 만드는 사람 — 숫자가 먼저 말하고, 이야기가 뒤를 받는다. */
export default function FounderSection() {
  return (
    <section className={`${styles.section} ${styles.band} ${styles.reveal}`}>
      <div className={`${styles.shell} ${styles.founder}`}>
        <div className={styles.founderAside}>
          <SectionHead kicker={FOUNDER.eyebrow} title={FOUNDER.title} />
          <ul className={styles.stats}>
            {FOUNDER.stats.map((stat) => (
              <li key={stat.label} className={styles.stat}>
                <span className={styles.statValue}>{stat.value}</span>
                <span className={styles.statLabel}>{stat.label}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.prose}>
          {FOUNDER.body.map((line) => (
            <p key={line} className={styles.body}>
              {line}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
