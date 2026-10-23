import Arrow from "@/components/icons/Arrow";
import Image from "next/image";
import Link from "next/link";
import ScreenImage from "@/components/door/ScreenImage";
import StarMark from "@/components/StarMark";
import { APPS, STATUS_LABEL, withReferrer } from "@/lib/labs";
import { CONTACT_EMAIL } from "@/lib/site";
import s from "./AuroraCatalog.module.css";

import { CATALOG_INTRODUCTIONS } from "@/lib/catalog";

export default function AuroraCatalog() {
  return (
    <div className={s.catalog}>
      <div className={s.shell}>
        <header className={s.header}>
          <p className={s.eyebrow}>
            <span /> THE APP COLLECTION
          </p>
          <div className={s.intro}>
            <h1>
              일상에 잘 맞는,
              <br />
              <span>작은 도구들.</span>
            </h1>
            <p>
              필요한 기능은 명확하게, 쓰는 경험은 편안하게.
              <br />
              직접 사용하며 다듬어 온 앱을 만나보세요.
            </p>
          </div>
          <div className={s.index}>
            <span>
              ALL APPS <b>{String(APPS.length).padStart(2, "0")}</b>
            </span>
            <span>DESIGNED & BUILT BY TWINKLE AI LABS</span>
          </div>
        </header>

        <ul className={s.collection} aria-label="Twinkle AI Labs 앱 목록">
          {APPS.map((app, index) => {
            const intro = CATALOG_INTRODUCTIONS[app.slug];
            const secondary = app.page?.features[0]?.screen;
            return (
              <li className={s.card} key={app.slug}>
                <article aria-labelledby={`catalog-${app.slug}`} className={s.product}>
                  <div className={s.content}>
                    <div className={s.cardMeta}>
                      <span>
                        {String(index + 1).padStart(2, "0")} / {intro?.category ?? "TOOLS"}
                      </span>
                      <span className={s.status}>
                        <i />
                        {STATUS_LABEL[app.status]}
                      </span>
                    </div>
                    <div className={s.identity}>
                      {app.icon && <Image src={app.icon} alt="" width={48} height={48} />}
                      <div>
                        <h2 id={`catalog-${app.slug}`}>{app.name}</h2>
                        <span>Android application</span>
                      </div>
                    </div>
                    <h3>
                      {(intro?.headline ?? app.name).split("\n").map((line, i) => (
                        <span key={i}>{line}</span>
                      ))}
                    </h3>
                    <p className={s.description}>{intro?.description ?? app.tagline}</p>
                    <ul className={s.features} aria-label={`${app.name} 주요 기능`}>
                      {(intro?.features ?? app.page?.facts ?? []).map((feature) => (
                        <li key={feature}>{feature}</li>
                      ))}
                    </ul>
                    <div className={s.actions}>
                      <Link className={s.primary} href={`/app/${app.slug}/`}>
                        앱 살펴보기 <Arrow />
                      </Link>
                      {app.store && (
                        <a
                          className={s.store}
                          href={withReferrer(app.store, "apps")}
                          aria-label={`${app.name} Google Play에서 받기`}
                        >
                          Google Play <Arrow diagonal />
                        </a>
                      )}
                    </div>
                  </div>
                  {app.page && (
                    <Link
                      href={`/app/${app.slug}/`}
                      className={s.art}
                      aria-label={`${app.name} 실제 화면과 자세한 소개 보기`}
                    >
                      <div className={s.orbit} aria-hidden="true" />
                      <StarMark className={s.spark} gradientId={`catalog-star-${app.slug}`} />
                      {secondary && (
                        <div className={s.secondaryScreen}>
                          <ScreenImage screen={secondary} hidden />
                        </div>
                      )}
                      <div className={s.mainScreen}>
                        <ScreenImage screen={app.page.hero} eager={index === 0} />
                      </div>
                      <span className={s.screenCaption}>
                        A CLOSER LOOK <Arrow diagonal />
                      </span>
                    </Link>
                  )}
                </article>
                <div className={s.cardFooter}>
                  <span>{app.page?.facts.join(" · ") ?? STATUS_LABEL[app.status]}</span>
                  {app.terms && (
                    <a href={app.terms}>
                      이용약관 <Arrow diagonal />
                    </a>
                  )}
                </div>
              </li>
            );
          })}
        </ul>

        <aside className={s.note}>
          <StarMark gradientId="catalog-note" />
          <div>
            <h2>더 나은 쓰임을 함께 찾아갑니다.</h2>
            <p>사용하며 느낀 점이나 필요한 기능을 들려주세요.</p>
          </div>
          <a href={`mailto:${CONTACT_EMAIL}`}>
            의견 보내기 <Arrow diagonal />
          </a>
        </aside>
      </div>
    </div>
  );
}
