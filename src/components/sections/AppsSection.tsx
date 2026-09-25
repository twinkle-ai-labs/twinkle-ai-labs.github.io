import Link from "next/link";
import type { CSSProperties } from "react";
import Image from "next/image";
import StarMark from "@/components/StarMark";
import ScreenImage from "@/components/door/ScreenImage";
import SectionHead from "./SectionHead";
import { APPS, APPS_SECTION, STATUS_LABEL, withReferrer, type LabApp } from "@/lib/labs";
import styles from "@/app/home.module.css";
import catalog from "./AppsCatalog.module.css";
import preview from "./AppPreview.module.css";

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


/** 앱 목록의 주요 동작과 보조 링크. */
function AppFoot({ app }: { app: LabApp }) {
  return (
    <div className={catalog.actions}>
      <Link className={catalog.primaryLink} href={`/app/${app.slug}`}>
        자세히 보기 <span aria-hidden="true">→</span>
      </Link>
      {app.store ? (
        <a className={styles.inlineLink} href={withReferrer(app.store, "apps")}>
          스토어에서 받기 <span aria-hidden="true">↗</span>
        </a>
      ) : null}
      {app.terms ? (
        <a className={styles.quietLink} href={app.terms}>
          약관 보기
        </a>
      ) : null}
    </div>
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
    <li className={`${styles.appCard} ${catalog.card}`}>
      <div className={catalog.topline}>
        <AppFace app={app} />
        <span className={catalog.status}>{STATUS_LABEL[app.status]}</span>
      </div>
      <div className={styles.appHead}>
        <div className={styles.appIdent}>
          <h3 className={styles.appName}>{app.name}</h3>
          <p className={styles.appTagline}>{app.tagline}</p>
        </div>
      </div>

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
      <details className={catalog.description}>
        <summary>앱 이야기</summary>
        <p className={styles.appBlurb}>{app.blurb}</p>
      </details>
      <AppFoot app={app} />
    </li>
  );
}

/** 홈에서는 설명과 실제 화면을 함께 보여 주고 앱의 상세 소개로 이어진다. */
function AppPreview({ app }: { app: LabApp }) {
  const screen = app.page?.hero;
  const titleId = `app-${app.slug}-title`;

  return (
    <li className={preview.card}>
      <Link className={preview.link} href={`/app/${app.slug}/`} aria-labelledby={titleId}>
        <div className={preview.content}>
          <div className={preview.heading}>
            <AppFace app={app} />
            <h3 id={titleId} className={styles.appName}>{app.name}</h3>
          </div>
          <p className={preview.description}>{app.page?.lede ?? app.tagline}</p>
          <span className={preview.more}>
            앱 살펴보기 <span aria-hidden="true">→</span>
          </span>
        </div>
        {screen ? (
          <div className={preview.stage}>
            <div
              className={preview.screen}
              style={{ "--preview-screen-ratio": screen.width / screen.height } as CSSProperties}
            >
              <ScreenImage screen={screen} />
            </div>
          </div>
        ) : null}
      </Link>
    </li>
  );
}

/** 홈에서는 요약, 앱 목록 페이지에서는 전체 카드를 보여준다. */
export default function AppsSection({ expanded = false }: { expanded?: boolean }) {
  return (
    <section id="apps" className={`${styles.section} ${expanded ? styles.reveal : preview.section}`}>
      <div className={styles.shell}>
        {expanded ? (
          <header className={catalog.heading}>
            <p className={styles.kicker}>{APPS_SECTION.eyebrow}</p>
            <h1 className={catalog.title}>작은 불편을 덜어주는 앱</h1>
            <p className={catalog.intro}>직접 만들고, 매일 다듬습니다. 나에게 필요한 도구를 만나보세요.</p>
          </header>
        ) : (
          <SectionHead kicker={APPS_SECTION.eyebrow} title={APPS_SECTION.title} />
        )}

        {expanded ? (
          <ul className={styles.appGrid}>
            {APPS.map((app) => (
              <AppCard key={app.slug} app={app} />
            ))}
          </ul>
        ) : (
          <>
            <ul className={preview.grid}>
              {APPS.map((app) => (
                <AppPreview key={app.slug} app={app} />
              ))}
            </ul>
            <div className={styles.appsSummary}>
              <Link className={styles.inlineLink} href="/app/">
                앱 전체 보기 <span aria-hidden="true">→</span>
              </Link>
            </div>
          </>
        )}

      </div>
    </section>
  );
}
