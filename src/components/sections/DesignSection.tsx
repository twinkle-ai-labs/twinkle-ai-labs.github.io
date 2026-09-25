import { DESIGN_SECTION } from "@/lib/labs";
import styles from "@/app/home.module.css";
import story from "./story.module.css";

/** 만드는 방식 옆의 짧은 소개 — 상세 기준은 디자인 시스템의 장으로 이어진다. */
export default function DesignSection() {
  return (
    <aside id="design" className={story.design} aria-labelledby="design-title">
      <div>
        <p className={styles.kicker}>{DESIGN_SECTION.eyebrow}</p>
        <h3 id="design-title" className={styles.howTitle}>{DESIGN_SECTION.title}</h3>
      </div>
      <div className={story.designBody}>
        <p className={styles.body}>{DESIGN_SECTION.lead}</p>
        <a className={styles.inlineLink} href={DESIGN_SECTION.more.href}>
          {DESIGN_SECTION.more.label} <span aria-hidden="true">→</span>
        </a>
      </div>
    </aside>
  );
}
