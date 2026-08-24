import StarMark from "@/components/StarMark";
import SectionHead from "./SectionHead";
import { NAMES_SECTION } from "@/lib/labs";
import styles from "@/app/home.module.css";

/** 이름의 뜻 — Twinkle 과 Polaris. 둘 다 별의 이름이라 별이 낱말 앞에 선다. */
export default function NamesSection() {
  return (
    <section id="names" className={`${styles.section} ${styles.reveal}`}>
      <div className={styles.shell}>
        <SectionHead kicker={NAMES_SECTION.eyebrow} title={NAMES_SECTION.title} />
        <ul className={styles.nameGrid}>
          {NAMES_SECTION.items.map((name) => (
            <li key={name.word} className={styles.nameCard}>
              <h3 className={styles.word}>
                <StarMark className={styles.wordStar} />
                {name.word}
              </h3>
              <p className={styles.reading}>{name.reading}</p>
              <p className={styles.body}>{name.body}</p>
              {"motto" in name ? (
                <p className={`${styles.body} ${styles.nameMotto}`}>{name.motto}</p>
              ) : null}
              {"link" in name ? (
                /* 약관은 제 주소에 산다 — 이 집 안의 자리가 아니라 밖으로 나가는 문이다. */
                <a className={styles.inlineLink} href={name.link.href}>
                  {name.link.label} <span aria-hidden="true">↗</span>
                </a>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
