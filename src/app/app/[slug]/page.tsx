import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { APPS, STATUS_LABEL, doorStoreUrl } from "@/lib/labs";
import { appDoorMetadata } from "@/lib/seo";
import styles from "./door.module.css";

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

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
  );
}

export default async function AppDoorPage({ params }: Params) {
  const app = appOf((await params).slug);
  if (!app) notFound();

  return (
    <article className={styles.doorWrapper}>
      <div className={styles.shell}>
        
        {/* 히어로 섹션 */}
        <div className={styles.hero}>
          {app.icon ? (
            <Image className={styles.icon} src={app.icon} alt="" width={112} height={112} priority />
          ) : (
            <span className={`${styles.icon} ${styles.monogram}`} aria-hidden="true">
              {app.name.trim().charAt(0)}
            </span>
          )}
          
          <h1 className={styles.name}>{app.name}</h1>
          <p className={styles.tagline}>{app.tagline}</p>
          
          <div className={styles.actions}>
            {app.store ? (
              <a className={styles.ctaButton} href={doorStoreUrl(app)}>
                Google Play에서 받기
              </a>
            ) : (
              <span className={styles.statusBadge}>{STATUS_LABEL[app.status]}</span>
            )}
          </div>
          
          <p className={styles.blurb}>{app.blurb}</p>
        </div>

        {/* 스크린샷 쇼케이스 (가로 스크롤) */}
        {app.screenshots && app.screenshots.length > 0 && (
          <div className={styles.showcase}>
            <div className={styles.screenshots}>
              {app.screenshots.map((shot, idx) => (
                <div key={idx} className={`${styles.screenshotWrapper} ${shot.type === 'wide' ? styles.wide : styles.phone}`}>
                  <Image 
                    src={shot.src} 
                    alt={`${app.name} 스크린샷 ${idx + 1}`} 
                    width={shot.type === 'wide' ? 1200 : 540} 
                    height={shot.type === 'wide' ? 900 : 960}
                    className={styles.screenshotImg}
                    priority={idx === 0}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 기능 그리드 (글래스모피즘) */}
        {app.points && app.points.length > 0 && (
          <>
            <h2 className={styles.featuresTitle}>핵심 기능</h2>
            <ul className={styles.featuresGrid}>
              {app.points.map((point, idx) => (
                <li key={idx} className={styles.featureCard}>
                  <CheckIcon className={styles.featureIcon} />
                  <span className={styles.featureText}>{point}</span>
                </li>
              ))}
            </ul>
          </>
        )}

        {/* 푸터 링크 */}
        <div className={styles.foot}>
          {app.terms && (
            <a className={styles.footLink} href={app.terms}>
              약관 및 개인정보처리방침
            </a>
          )}
          <Link className={styles.footLink} href="/#apps">
            홈으로 돌아가기
          </Link>
        </div>

      </div>
    </article>
  );
}
