import StarMark from "@/components/StarMark";
import Starfield from "@/components/Starfield";
import { HERO } from "@/lib/labs";
import styles from "@/app/home.module.css";

/** 히어로 — 하늘은 이 구획의 것이고, 제목이 서는 가운데 기둥만 비워 둔다. */
export default function HeroSection() {
  return (
    <section className={styles.hero}>
      <Starfield
        height="58rem"
        dots={92}
        sparkles={10}
        shooting={2}
        keepout={{ x: [24, 76], y: [2, 44] }}
      />
      <div className={`${styles.shell} ${styles.heroShell}`}>
        <span className={styles.heroMark}>
          <StarMark gradientId="twinkle-hero" />
        </span>
        <h1 className={styles.heroTitle}>{HERO.title}</h1>
        <p className={styles.heroDefine}>{HERO.define}</p>
        <p className={styles.heroLead}>{HERO.lead}</p>
        <div className={styles.actions}>
          {/* 그라데이션은 «다음 한 걸음»에만 — 한 화면에 하나다. */}
          <a className={styles.cta} href={HERO.primary.href}>
            {HERO.primary.label}
          </a>
          <a className={styles.ghost} href={HERO.secondary.href}>
            {HERO.secondary.label}
          </a>
        </div>
      </div>
    </section>
  );
}
