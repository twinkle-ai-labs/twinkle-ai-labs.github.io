import styles from "@/app/home.module.css";

/** 구획의 머리 — 작은 말 하나와 제목 하나. 여섯 번 되풀이되므로 한 자리에 둔다. */
export default function SectionHead({ kicker, title }: { kicker: string; title: string }) {
  return (
    <header className={styles.head}>
      <p className={styles.kicker}>{kicker}</p>
      <h2 className={styles.sectionTitle}>{title}</h2>
    </header>
  );
}
