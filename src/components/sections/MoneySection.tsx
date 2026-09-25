import { MONEY } from "@/lib/labs";
import styles from "@/app/home.module.css";
import story from "./story.module.css";

/** 브랜드 이야기의 맺음 — 별도 구획 대신 운영의 다짐 한 단락으로 남긴다. */
export default function MoneySection() {
  return (
    <div className={story.promise}>
      <p className={styles.kicker}>{MONEY.eyebrow}</p>
      <h3 className={styles.howTitle}>{MONEY.title}</h3>
      {MONEY.body.map((line) => (
        <p key={line} className={styles.body}>{line}</p>
      ))}
    </div>
  );
}
