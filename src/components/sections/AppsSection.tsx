import Image from "next/image";
import StarMark from "@/components/StarMark";
import SectionHead from "./SectionHead";
import { APPS, APPS_SECTION, STATUS_LABEL, withReferrer, type LabApp } from "@/lib/labs";
import styles from "@/app/home.module.css";

/** 앱의 얼굴 — 아이콘이 없으면 이름의 첫 글자가 대신 선다. */
function AppFace({ app }: { app: LabApp }) {
  if (!app.icon) {
    return (
      <span className={`${styles.appIcon} ${styles.monogram}`} aria-hidden="true">
        {app.name.trim().charAt(0)}
      </span>
    );
  }
  return <Image className={styles.appIcon} src={app.icon} alt="" width={88} height={88} />;
}

/**
 * 카드의 발 — 지금 이 앱에 무엇을 할 수 있는가.
 *
 * 배지는 한때 카드의 머리에 홀로 섰다. 두 앱이 나란히 «비공개 테스트 중»이라고
 * 적힌 같은 알약을 이고 있으면, 카드가 가장 먼저 말하는 것이 앱이 아니라
 * **둘 다 같은 상태라는 사실**이 된다 — 아무것도 알려 주지 않으면서 머리를 먹는다.
 * 상태는 «지금 무엇을 할 수 있나»라는 물음의 답이므로 문 옆이 제자리다.
 *
 * 아직 공개 전인 앱은 `store` 가 비어 있어 문 자체가 서지 않는다 —
 * 배지가 «비공개 테스트 중»이라고 말하는 옆에서 링크만 거짓말을 하지 않게.
 */
function AppFoot({ app }: { app: LabApp }) {
  return (
    <p className={styles.appLinks}>
      <span className={styles.appStatus}>{STATUS_LABEL[app.status]}</span>
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
 * 앱 한 장 — **모든 앱이 같은 꼴로 선다.**
 *
 * 한때 맨 앞 앱만 큰 카드로 세우고 나머지를 작은 격자에 두었다. 앱이 하나뿐일 때
 * «아직 없음»처럼 읽히지 않게 하려던 것인데, 앱이 둘이 되자 **같은 것을 두 벌로
 * 적어 두는 일**이 됐다 — 아이콘 크기도 이름 크기도 두 벌, 요점(points)은 앞자리만
 * 그려서 뒤에 선 앱의 글이 적어 둔 채로 화면에 오르지 못했다.
 * 순서는 목록이 정하는 것이지 크기가 정하는 것이 아니다.
 */
function AppCard({ app }: { app: LabApp }) {
  return (
    <li className={styles.appCard}>
      <div className={styles.appHead}>
        <AppFace app={app} />
        <div className={styles.appIdent}>
          <h3 className={styles.appName}>{app.name}</h3>
          <p className={styles.appTagline}>{app.tagline}</p>
        </div>
      </div>
      <p className={styles.appBlurb}>{app.blurb}</p>
      {app.points ? (
        <ul className={styles.points}>
          {app.points.map((point) => (
            <li key={point} className={styles.point}>
              <StarMark className={styles.pointStar} />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      ) : null}
      <AppFoot app={app} />
    </li>
  );
}

/** 만든 것 — 한 줄에 둘씩. */
export default function AppsSection() {
  return (
    <section id="apps" className={`${styles.section} ${styles.reveal}`}>
      <div className={styles.shell}>
        <SectionHead kicker={APPS_SECTION.eyebrow} title={APPS_SECTION.title} />

        <ul className={styles.appGrid}>
          {APPS.map((app) => (
            <AppCard key={app.slug} app={app} />
          ))}
        </ul>

        {/* 아직 오지 않은 것은 상자를 갖지 않는다 — 한 줄이면 된다. */}
        <p className={styles.nextNote}>
          <StarMark className={styles.noteStar} />
          {APPS_SECTION.note}
        </p>
      </div>
    </section>
  );
}
