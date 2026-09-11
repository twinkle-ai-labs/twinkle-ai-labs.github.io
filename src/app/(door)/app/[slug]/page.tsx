import { notFound } from "next/navigation";
import DeviceScreen from "@/components/door/DeviceScreen";
import DoorFooter from "@/components/door/DoorFooter";
import DoorHeader from "@/components/door/DoorHeader";
import FeatureShowcase from "@/components/door/FeatureShowcase";
import GetButton from "@/components/door/GetButton";
import { CheckGlyph, TRUST_GLYPHS } from "@/components/door/Glyphs";
import styles from "@/components/door/door.module.css";
import { APPS } from "@/lib/labs";
import { appDoorMetadata, appJsonLd } from "@/lib/seo";

/**
 * 앱의 문 — `/app/<slug>/`. 법은 `door.module.css` 의 머리에 있다.
 *
 * 차례: 첫 화면(질문 · 답 · 받기 · 무대 위의 기기) → 할 수 있는 일(기기 한 대 위에서 화면이
 * 갈아 끼워진다) → 믿어도 되는 이유 → 끝 화면(마지막 한 마디 · 받기 · 세 가지 사실). 앱의 얼굴은 머리띠와 바닥글에만 선다.
 * 앱이 `page` 를 들지 않으면 문은 가진 만큼만 선다 — 이름 · 한 줄 · 소개 · 한 줄씩의 목록.
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

/** `|` 가 가른 줄 — 줄바꿈은 우리가 정한다 */
function Lines({ text }: { text: string }) {
  return text.split("|").map((line) => (
    <span key={line} className={styles.line}>
      {line}
    </span>
  ));
}

export default async function AppDoorPage({ params }: Params) {
  const app = appOf((await params).slug);
  if (!app) notFound();
  const page = app.page;

  return (
    <div className={styles.door} id="top">
      {/* 기계가 읽는 표 — 이 앱이 무엇을 하는가. 값은 전부 이 장에 보이는 것에서 온다 */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: appJsonLd(app) }} />
      <DoorHeader app={app} />

      <main>
        {/* ── 첫 화면 ── */}
        <section className={styles.hero}>
          <div className={styles.heroText}>
            <h1>
              {/* 이름은 머리띠가 이미 얼굴과 함께 말한다 — 첫 화면에 얼굴이 둘 서지 않게, 여기서는 낭독기와 검색에만 */}
              <span className={styles.srOnly}>{app.name} — </span>
              <span className={styles.headline}>
                <Lines text={page?.headline ?? app.tagline} />
              </span>
            </h1>
            <p className={styles.lede}>{page?.lede ?? app.blurb}</p>
            <div className={styles.heroActions}>
              <GetButton app={app} />
              {page && (
                <ul className={styles.facts} aria-label="한눈에">
                  {page.facts.map((fact) => (
                    <li key={fact} className={styles.fact}>
                      <CheckGlyph className={styles.factGlyph} />
                      {fact}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          {page && (
            <div className={`${styles.stage} ${styles.heroStage}`}>
              <DeviceScreen screen={page.hero} size="hero" />
            </div>
          )}
        </section>

        {/* ── 할 수 있는 일 ── */}
        <section className={styles.features} aria-labelledby="door-features">
          <div className={styles.sectionHead}>
            <p className={styles.eyebrow}>할 수 있는 일</p>
            <h2 id="door-features" className={styles.sectionTitle}>
              {page?.featuresTitle ?? "할 수 있는 일"}
            </h2>
          </div>
          {page ? (
            <FeatureShowcase features={page.features} />
          ) : (
            app.points && (
              <ul className={styles.pointList}>
                {app.points.map((point) => (
                  <li key={point} className={styles.point}>
                    <CheckGlyph className={styles.pointGlyph} />
                    {point}
                  </li>
                ))}
              </ul>
            )
          )}
        </section>

        {/* ── 믿어도 되는 이유 ── */}
        {page && page.trust.length > 0 && (
          <section className={styles.trust} aria-label="기록은 어디에 머무나">
            <ul className={styles.trustInner}>
              {page.trust.map((item, i) => {
                const Glyph = TRUST_GLYPHS[i % TRUST_GLYPHS.length];
                return (
                  <li key={item.title} className={`${styles.trustItem} ${styles.reveal}`}>
                    <span className={styles.trustWell}>
                      <Glyph className={styles.trustGlyph} />
                    </span>
                    <span className={styles.trustTitle}>{item.title}</span>
                    <span className={styles.trustBody}>{item.body}</span>
                  </li>
                );
              })}
            </ul>
          </section>
        )}

        {/* ── 끝 화면 ── */}
        {/* 얼굴은 머리띠와 바닥글이 든다 — 끝은 마지막 한 마디와 받기, 그리고 처음의 세 가지 사실을 다시 */}
        <section className={styles.closing}>
          <div className={`${styles.closingInner} ${styles.reveal}`}>
            <h2 className={styles.closingTitle}>
              <Lines text={page?.closing ?? app.name} />
            </h2>
            <GetButton app={app} />
            {page && (
              <ul className={`${styles.facts} ${styles.closingFacts}`} aria-label="한눈에">
                {page.facts.map((fact) => (
                  <li key={fact} className={styles.fact}>
                    <CheckGlyph className={styles.factGlyph} />
                    {fact}
                  </li>
                ))}
              </ul>
            )}
            {page?.disclaimer && <p className={styles.disclaimer}>{page.disclaimer}</p>}
          </div>
        </section>
      </main>

      <DoorFooter app={app} />
    </div>
  );
}
