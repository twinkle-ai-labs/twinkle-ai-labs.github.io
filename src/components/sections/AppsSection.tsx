import Image from "next/image";
import StarMark from "@/components/StarMark";
import SectionHead from "./SectionHead";
import { APPS, APPS_SECTION, STATUS_LABEL, withReferrer, type LabApp } from "@/lib/labs";
import styles from "@/app/home.module.css";

/** 앱의 얼굴 — 아이콘이 없으면 이름의 첫 글자가 대신 선다. */
function AppFace({ app, className }: { app: LabApp; className: string }) {
  if (!app.icon) {
    return (
      <span className={`${className} ${styles.monogram}`} aria-hidden="true">
        {app.name.trim().charAt(0)}
      </span>
    );
  }
  return <Image className={className} src={app.icon} alt="" width={88} height={88} />;
}

/**
 * 밖으로 나가는 문 둘 — 스토어와 약관.
 *
 * 큰 카드와 작은 카드가 **같은 조각**을 쓴다. 두 벌로 적어 두면 스토어 주소에
 * 표식을 다는 날 한쪽에만 달리고, 그 어긋남은 콘솔의 보고서에서나 드러난다.
 * 아직 공개 전인 앱은 `store` 가 비어 있어 문 자체가 서지 않는다 —
 * «비공개 테스트 중»이라고 말하는 배지 옆에서 링크만 거짓말을 하지 않게.
 */
function AppLinks({ app }: { app: LabApp }) {
  if (!app.store && !app.terms) return null;
  return (
    <p className={styles.appLinks}>
      {app.store ? (
        <a className={styles.inlineLink} href={withReferrer(app.store, "home")}>
          스토어에서 받기 <span aria-hidden="true">↗</span>
        </a>
      ) : null}
      {app.terms ? (
        <a className={styles.quietLink} href={app.terms}>
          약관 보기
        </a>
      ) : null}
    </p>
  );
}

/**
 * 만든 것.
 *
 * 앱이 하나뿐일 때 작은 카드로 두면 화면이 «아직 없음»처럼 읽힌다 —
 * 첫 앱은 제 크기로 서고, 나머지가 격자로 뒤를 잇는다.
 */
export default function AppsSection() {
  const [featured, ...rest] = APPS;

  return (
    <section id="apps" className={`${styles.section} ${styles.reveal}`}>
      <div className={styles.shell}>
        <SectionHead kicker={APPS_SECTION.eyebrow} title={APPS_SECTION.title} />

        <article className={styles.featured}>
          <div className={styles.featuredHead}>
            <AppFace app={featured} className={styles.appIcon} />
            <div className={styles.featuredIdent}>
              <span className={styles.badge}>{STATUS_LABEL[featured.status]}</span>
              <h3 className={styles.appName}>{featured.name}</h3>
              <p className={styles.appTagline}>{featured.tagline}</p>
            </div>
          </div>
          <p className={styles.body}>{featured.blurb}</p>
          {featured.points ? (
            <ul className={styles.points}>
              {featured.points.map((point) => (
                <li key={point} className={styles.point}>
                  <StarMark className={styles.pointStar} />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          ) : null}
          <AppLinks app={featured} />
        </article>

        {rest.length > 0 ? (
          <ul className={styles.appGrid}>
            {rest.map((app) => (
              <li key={app.slug} className={styles.appCard}>
                <AppFace app={app} className={styles.appIconSm} />
                <h3 className={styles.appNameSm}>{app.name}</h3>
                <p className={styles.appTagline}>{app.tagline}</p>
                <p className={styles.body}>{app.blurb}</p>
                <p className={styles.appMeta}>
                  <span className={styles.badge}>{STATUS_LABEL[app.status]}</span>
                </p>
                <AppLinks app={app} />
              </li>
            ))}
          </ul>
        ) : null}

        {/* 아직 오지 않은 것은 상자를 갖지 않는다 — 한 줄이면 된다. */}
        <p className={styles.nextNote}>
          <StarMark className={styles.noteStar} />
          {APPS_SECTION.note}
        </p>
      </div>
    </section>
  );
}
