import Image from "next/image";
import Starfield from "@/components/Starfield";
import StarMark from "@/components/StarMark";
import {
  APPS,
  APPS_SECTION,
  CONTACT,
  CONTACT_EMAIL,
  DESIGN,
  FOUNDER,
  HERO,
  HOW,
  MONEY,
  NAMES,
  NAMES_SECTION,
  STATUS,
  type LabApp,
} from "@/lib/labs";
import styles from "./home.module.css";

export const metadata = {
  // 홈은 제 이름을 통째로 쓴다 — 꼬리표(`· Twinkle AI Labs`)가 붙으면 이름이 두 번이다.
  title: { absolute: "Twinkle AI Labs — 난 스스로 빛난다" },
  description:
    "한 사람과 AI가 만드는 작은 유틸리티 앱들. 이름의 뜻과 만드는 방식, 그리고 지금까지 만든 앱.",
};

/** 구획의 머리 — 작은 말 하나와 제목 하나. 여섯 번 되풀이되므로 한 자리에 둔다. */
function Head({ kicker, title }: { kicker: string; title: string }) {
  return (
    <header className={styles.head}>
      <p className={styles.kicker}>{kicker}</p>
      <h2 className={styles.sectionTitle}>{title}</h2>
    </header>
  );
}

/** 앱의 얼굴 — 아이콘이 없으면 이름의 첫 글자가 대신 선다. */
function AppFace({ app, className }: { app: LabApp; className: string }) {
  if (app.icon) {
    return (
      <Image className={className} src={app.icon} alt="" width={88} height={88} />
    );
  }
  return (
    <span className={`${className} ${styles.monogram}`} aria-hidden="true">
      {app.name.trim().charAt(0)}
    </span>
  );
}

export default function Home() {
  const [featured, ...rest] = APPS;

  return (
    <>
      {/* ── 히어로 ─────────────────────────────────────────── */}
      <section className={styles.hero}>
        {/* 하늘은 히어로의 것이다 — 제목이 서는 가운데 기둥만 비워 둔다. */}
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

      {/* ── 이름 — Twinkle 과 Polaris ──────────────────────── */}
      <section id="names" className={`${styles.section} ${styles.reveal}`}>
        <div className={styles.shell}>
          <Head kicker={NAMES_SECTION.eyebrow} title={NAMES_SECTION.title} />
          <ul className={styles.nameGrid}>
            {NAMES.map((name) => (
              <li key={name.word} className={styles.nameCard}>
                <h3 className={styles.word}>
                  {/* 둘 다 별의 이름이다 — 그래서 별이 낱말 앞에 선다. */}
                  <StarMark className={styles.wordStar} />
                  {name.word}
                </h3>
                <p className={styles.reading}>{name.reading}</p>
                <p className={styles.body}>{name.body}</p>
                {"link" in name && name.link ? (
                  /* 약관은 제 주소에 산다 — 이 집 안의 자리가 아니라 밖으로 나가는 문이다. */
                  <a className={styles.inlineLink} href={name.link.href}>
                    {name.link.label} <span aria-hidden="true">↗</span>
                  </a>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── 만드는 사람 ────────────────────────────────────── */}
      <section className={`${styles.section} ${styles.band} ${styles.reveal}`}>
        <div className={`${styles.shell} ${styles.founder}`}>
          {/* 숫자가 먼저 말하고, 이야기가 뒤를 받는다. */}
          <div className={styles.founderAside}>
            <Head kicker={FOUNDER.eyebrow} title={FOUNDER.title} />
            <ul className={styles.stats}>
              {FOUNDER.stats.map((stat) => (
                <li key={stat.label} className={styles.stat}>
                  <span className={styles.statValue}>{stat.value}</span>
                  <span className={styles.statLabel}>{stat.label}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.prose}>
            {FOUNDER.body.map((line) => (
              <p key={line} className={styles.body}>
                {line}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ── 앱 ─────────────────────────────────────────────── */}
      <section id="apps" className={`${styles.section} ${styles.reveal}`}>
        <div className={styles.shell}>
          <Head kicker={APPS_SECTION.eyebrow} title={APPS_SECTION.title} />

          {/* 앱이 하나뿐일 때 작은 카드로 두면 화면이 «아직 없음»처럼 읽힌다.
              첫 앱은 제 크기로 선다. */}
          <article className={styles.featured}>
            <div className={styles.featuredHead}>
              <AppFace app={featured} className={styles.appIcon} />
              <div className={styles.featuredIdent}>
                <span className={styles.badge}>{STATUS[featured.status]}</span>
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
            <p className={styles.appLinks}>
              {featured.store ? (
                <a className={styles.inlineLink} href={featured.store}>
                  스토어에서 받기 <span aria-hidden="true">↗</span>
                </a>
              ) : null}
              {featured.terms ? (
                <a className={styles.quietLink} href={featured.terms}>
                  약관 보기
                </a>
              ) : null}
            </p>
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
                    <span className={styles.badge}>{STATUS[app.status]}</span>
                  </p>
                  <p className={styles.appLinks}>
                    {app.store ? (
                      <a className={styles.inlineLink} href={app.store}>
                        스토어에서 받기 <span aria-hidden="true">↗</span>
                      </a>
                    ) : null}
                    {app.terms ? (
                      <a className={styles.quietLink} href={app.terms}>
                        약관 보기
                      </a>
                    ) : null}
                  </p>
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

      {/* ── 만드는 방식 ────────────────────────────────────── */}
      <section className={`${styles.section} ${styles.band} ${styles.reveal}`}>
        <div className={styles.shell}>
          <Head kicker={HOW.eyebrow} title={HOW.title} />
          <ol className={styles.howGrid}>
            {HOW.items.map((item, i) => (
              <li key={item.title} className={styles.howItem}>
                <span className={styles.howNum} aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className={styles.howTitle}>{item.title}</h3>
                <p className={styles.body}>{item.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── 디자인 시스템 — Aurora Ledger ──────────────────── */}
      <section id="design" className={`${styles.section} ${styles.reveal}`}>
        <div className={styles.shell}>
          <Head kicker={DESIGN.eyebrow} title={DESIGN.title} />
          <p className={styles.reading}>{DESIGN.reading}</p>
          <p className={`${styles.body} ${styles.designLead}`}>{DESIGN.lead}</p>

          <ul className={styles.nameGrid}>
            {DESIGN.words.map((w) => (
              <li key={w.word} className={styles.nameCard}>
                <h3 className={styles.word}>
                  <StarMark className={styles.wordStar} />
                  {w.word}
                </h3>
                <p className={styles.reading}>{w.reading}</p>
                <p className={styles.body}>{w.body}</p>
              </li>
            ))}
          </ul>

          {/* 견본은 이 화면의 제 토큰으로 칠한다 — 라이트·다크를 고르면 견본도 갈아입는다. */}
          <ul className={styles.swatches} aria-label="색 토큰">
            {DESIGN.swatches.map((sw) => (
              <li key={sw.token} className={styles.swatch}>
                <span
                  className={styles.swatchChip}
                  style={{ background: `var(--${sw.token})` }}
                  aria-hidden="true"
                />
                <code className={styles.swatchToken}>{sw.token}</code>
                <span className={styles.swatchLabel}>{sw.label}</span>
              </li>
            ))}
          </ul>

          <ul className={styles.ladders}>
            {DESIGN.ladders.map((l) => (
              <li key={l.name} className={styles.ladder}>
                <span className={styles.ladderName}>{l.name}</span>
                <span className={styles.ladderValue}>{l.value}</span>
                <span className={styles.ladderNote}>{l.note}</span>
              </li>
            ))}
          </ul>

          <ul className={`${styles.points} ${styles.rules}`}>
            {DESIGN.rules.map((rule) => (
              <li key={rule} className={styles.point}>
                <StarMark className={styles.pointStar} />
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── 값에 대하여 ────────────────────────────────────── */}
      <section className={`${styles.section} ${styles.band} ${styles.reveal}`}>
        <div className={`${styles.shell} ${styles.center}`}>
          <p className={styles.kicker}>{MONEY.eyebrow}</p>
          <h2 className={`${styles.sectionTitle} ${styles.moneyTitle}`}>
            {MONEY.title}
          </h2>
          <div className={styles.prose}>
            {MONEY.body.map((line) => (
              <p key={line} className={styles.body}>
                {line}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ── 문의 ───────────────────────────────────────────── */}
      <section id="contact" className={`${styles.contact} ${styles.reveal}`}>
        <div className={`${styles.shell} ${styles.center}`}>
          <span className={styles.contactMark}>
            <StarMark gradientId="twinkle-contact" />
          </span>
          <p className={styles.kicker}>{CONTACT.eyebrow}</p>
          <h2 className={styles.sectionTitle}>{CONTACT.title}</h2>
          <p className={`${styles.body} ${styles.contactBody}`}>{CONTACT.body}</p>
          <a className={styles.mail} href={`mailto:${CONTACT_EMAIL}`}>
            {CONTACT_EMAIL}
          </a>
        </div>
      </section>
    </>
  );
}
