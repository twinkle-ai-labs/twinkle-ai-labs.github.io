import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import StarMark from "@/components/StarMark";
import { APPS, STATUS_LABEL, doorStoreUrl } from "@/lib/labs";
import { appDoorMetadata } from "@/lib/seo";
import home from "@/app/home.module.css";
import styles from "./door.module.css";

/**
 * 앱의 문 — `/app/<slug>/`. 앱 하나를 소개하고 스토어로 넘긴다.
 *
 * 공유 그림의 QR 과 메신저의 링크가 이 주소를 담는다. 앱이 있는 기기에서는 App Links 가
 * 브라우저보다 먼저 앱을 열므로 이 장은 뜨지 않고, 여기까지 온 사람은 **앱이 없는 사람**이다.
 *
 * ↩ 한때 이 장은 열리자마자 스토어로 튕기는 빈 장이었다(`location.replace`). 그러면 링크를
 * 받은 사람이 «무슨 앱인지» 한 줄도 못 읽고 스토어 화면 앞에 선다 — 앱을 나눈 사람은
 * 계산 결과 한 장을 보냈을 뿐인데, 받은 쪽은 갑자기 설치 화면을 보는 셈이다.
 * 그래서 문이 먼저 말한다: 이름·한 줄·무엇을 해 주는지. 다음 한 걸음은 CTA 하나다.
 *
 * 앱 목록이 곧 문의 목록이다 — 앱이 늘면 문도 는다. 화면은 고치지 않는다.
 */
export function generateStaticParams() {
  return APPS.map((app) => ({ slug: app.slug }));
}

type Params = { params: Promise<{ slug: string }> };

function appOf(slug: string) {
  return APPS.find((app) => app.slug === slug);
}

export async function generateMetadata({ params }: Params) {
  const app = appOf((await params).slug);
  return app ? appDoorMetadata(app) : {};
}

export default async function AppDoorPage({ params }: Params) {
  const app = appOf((await params).slug);
  if (!app) notFound();

  return (
    <article className={styles.door}>
      <div className={`${home.shell} ${styles.shell}`}>
        <p className={home.kicker}>앱</p>

        {app.icon ? (
          <Image className={styles.icon} src={app.icon} alt="" width={112} height={112} priority />
        ) : (
          <span className={`${styles.icon} ${styles.monogram}`} aria-hidden="true">
            {app.name.trim().charAt(0)}
          </span>
        )}

        <h1 className={styles.name}>{app.name}</h1>
        <p className={styles.tagline}>{app.tagline}</p>

        {/* 다음 한 걸음을 가리키는 면 — 이 화면에서 그라데이션은 여기 하나다. */}
        <p className={styles.actions}>
          <a className={home.cta} href={doorStoreUrl(app)}>
            Google Play에서 받기 <span aria-hidden="true">↗</span>
          </a>
          <span className={home.appStatus}>{STATUS_LABEL[app.status]}</span>
        </p>

        <p className={styles.blurb}>{app.blurb}</p>

        {app.points ? (
          <ul className={`${home.points} ${styles.points}`}>
            {app.points.map((point) => (
              <li key={point} className={home.point}>
                <StarMark className={home.pointStar} />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        ) : null}

        <p className={styles.foot}>
          {app.terms ? (
            <a className={home.quietLink} href={app.terms}>
              약관 보기
            </a>
          ) : null}
          <Link className={home.quietLink} href="/#apps">
            다른 앱 보기
          </Link>
        </p>
      </div>
    </article>
  );
}
