import Link from "next/link";
import StarMark from "@/components/StarMark";
import {
  ALPHA,
  DESIGN,
  ELEVATION,
  HISTORY,
  ICONS,
  MOTION,
  PALETTE,
  RADIUS,
  SPACING,
  TYPE,
} from "@/lib/design";
import styles from "./design.module.css";

export const metadata = {
  title: "Aurora Ledger",
  description:
    "Twinkle AI Labs 의 디자인 시스템. 이름의 뜻, 색·불투명도·간격·크기·모양·움직임·글자의 사다리, 그리고 지나온 길.",
};

/** 구획의 머리 — 소개 화면과 같은 꼴. 오른쪽에 토큰의 자리를 단다. */
function Head({ kicker, title, code }: { kicker: string; title: string; code?: string }) {
  return (
    <header className={styles.head}>
      <p className={styles.kicker}>{kicker}</p>
      <div className={styles.headRow}>
        <h2 className={styles.sectionTitle}>{title}</h2>
        {code ? <code className={styles.where}>{code}</code> : null}
      </div>
    </header>
  );
}

/** hex 의 밝기 — 칩 위의 글자를 어두운 잉크로 둘지 밝은 잉크로 둘지 고른다. */
function isLightHex(hex: string): boolean {
  const m = /^#([0-9a-f]{6})$/i.exec(hex.trim());
  if (!m) return false;
  const n = parseInt(m[1], 16);
  const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  return (r * 299 + g * 587 + b * 114) / 1000 > 150;
}

/** 색 한 판 — 라이트나 다크. 두 판이 한 화면에 나란히 서야 해서 값은 hex 다. */
function Pane({ theme }: { theme: "light" | "dark" }) {
  const isDark = theme === "dark";
  return (
    <div className={`${styles.pane} ${isDark ? styles.paneDark : styles.paneLight}`}>
      <p className={styles.paneName}>{isDark ? "Dark · Dusk" : "Light · Mist"}</p>
      {PALETTE.map((g) => (
        <div key={g.group} className={styles.paneGroup}>
          <p className={styles.paneGroupName}>{g.group}</p>
          <ul className={styles.chips}>
            {g.swatches.map((sw) => {
              const value = isDark ? sw.dark : sw.light;
              const css = isDark ? sw.darkCss ?? sw.dark : sw.lightCss ?? sw.light;
              return (
                <li
                  key={sw.token}
                  className={`${styles.chip} ${
                    (sw.lightCss ?? sw.darkCss) ? styles.chipOnBrand
                    : sw.token === "primary-soft" ? (isDark ? styles.chipOnDark : styles.chipOnLight)
                    : isLightHex(value) ? styles.chipOnLight : styles.chipOnDark
                  }`}
                  style={{ background: css }}
                >
                  <span className={styles.chipInk}>
                    <code className={styles.chipToken}>{sw.token}</code>
                    <span className={styles.chipValue}>{value}</span>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default function DesignPage() {
  return (
    <>
      {/* ── 머리 ───────────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.shell}>
          <p className={styles.kicker}>{DESIGN.eyebrow}</p>
          <h1 className={styles.title}>{DESIGN.title}</h1>
          <p className={styles.reading}>{DESIGN.reading}</p>
          <p className={styles.lead}>{DESIGN.lead}</p>
          <div className={styles.rule} aria-hidden="true" />
          <p className={styles.canon}>
            값의 정본은 저장소의 <code>CLAUDE.md</code> 다. 이 장은 그 값이 무슨 뜻인지와 무슨
            이름으로 불리는지를 따라간다 — 앱은 <code>TwinkleTheme.&lt;사다리&gt;.&lt;칸&gt;</code>,
            웹은 <code>var(--…)</code>.
          </p>
        </div>
      </section>

      {/* ── 이름의 뜻 ──────────────────────────────────────── */}
      <section className={`${styles.section} ${styles.reveal}`}>
        <div className={styles.shell}>
          <Head kicker="이름" title="이름의 뜻" />
          <p className={styles.body}>
            유래는 적힌 적이 없다. 2026년 8월 9일, 목업을 다시 짜며 여러 스킨 중 보라 한 벌에 붙은 CSS
            주석 한 줄이 시작이었다. 아래는 뒤에 이름을 뜯어 읽은 <strong>해석</strong>이다.
          </p>
          <ul className={styles.words}>
            {DESIGN.words.map((w) => (
              <li key={w.word} className={styles.card}>
                <h3 className={styles.word}>
                  <StarMark className={styles.wordStar} />
                  {w.word}
                </h3>
                <p className={styles.wordReading}>{w.reading}</p>
                <p className={styles.body}>{w.body}</p>
              </li>
            ))}
          </ul>
          <p className={styles.aside}>
            줄여 부르지 않는다 — 같은 이름 <code>Aurora</code> 가 다른 제품에도 있다. 디자인 시스템은
            «Aurora Ledger» 한 벌로 부르고, 앱의 코드 식별자는 <code>Twinkle*</code> 다.
          </p>
        </div>
      </section>

      {/* ── 색 ─────────────────────────────────────────────── */}
      <section className={`${styles.section} ${styles.band} ${styles.reveal}`}>
        <div className={styles.shell}>
          <Head kicker="토큰" title="색" code="colors" />
          <p className={styles.body}>
            원색과 의미의 두 층이다. 화면은 의미만 본다 — 원색을 직접 부르면 다크가 한 자리씩 죽는다.
            중성색은 남보라를 한 방울 머금고, 채도 있는 보라는 «지금 누를 것»에만 선다.
          </p>
          <div className={styles.panes}>
            <Pane theme="light" />
            <Pane theme="dark" />
          </div>
          <ul className={styles.notes}>
            {PALETTE.filter((g) => g.note).map((g) => (
              <li key={g.group} className={styles.note}>
                <StarMark className={styles.noteStar} />
                <span>
                  <strong>{g.group}</strong> — {g.note}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── 불투명도 ───────────────────────────────────────── */}
      <section className={`${styles.section} ${styles.reveal}`}>
        <div className={styles.shell}>
          <Head kicker="토큰" title="불투명도" code="alpha" />
          <p className={styles.body}>
            «그 색을 얼마나 옅게 쓰는가»의 사다리. 화면이 열세 가지 리터럴을 쓰던 것을 여섯 칸으로
            눌렀다. 색 자체가 반투명인 토큰은 이 사다리를 거치지 않는다 — 그것은 옅게 쓴 색이 아니라
            그냥 그 색이다.
          </p>
          <ul className={styles.alpha}>
            {ALPHA.map((a) => (
              <li key={a.token} className={styles.alphaStep}>
                <span className={styles.alphaSwatch} style={{ opacity: Number(a.value) }} />
                <code className={styles.token}>{a.token}</code>
                <span className={styles.big}>{a.value}</span>
                <span className={styles.use}>{a.use}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── 간격 ───────────────────────────────────────────── */}
      <section className={`${styles.section} ${styles.band} ${styles.reveal}`}>
        <div className={styles.shell}>
          <Head kicker="토큰" title="간격" code="spacing" />
          <p className={styles.body}>8pt 격자. 반 칸은 8의 배수 사이가 실제로 필요해진 자리에만 있다.</p>
          <ol className={styles.spacing}>
            {SPACING.map((s) => (
              <li key={s.token} className={styles.spaceRow}>
                <code className={styles.token}>{s.token}</code>
                <span className={styles.num}>{s.px}</span>
                <span className={styles.spaceBar} style={{ width: `${s.px}px` }} />
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── 크기 ───────────────────────────────────────────── */}
      <section className={`${styles.section} ${styles.reveal}`}>
        <div className={styles.shell}>
          <Head kicker="토큰" title="크기" code="iconSize · elevation · shapes" />
          <div className={styles.sizeGrid}>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>아이콘</h3>
              <ul className={styles.icons}>
                {ICONS.map((i) => (
                  <li key={i.token} className={styles.icon}>
                    <span className={styles.iconBox} style={{ width: i.px, height: i.px }} />
                    <code className={styles.token}>{i.token}</code>
                    <span className={styles.num}>{i.px}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>고도</h3>
              <ul className={styles.elev}>
                {ELEVATION.map((e) => (
                  <li
                    key={e.token}
                    className={styles.elevBox}
                    style={{ boxShadow: `var(--shadow-${e.token})` }}
                  >
                    <code className={styles.token}>{e.token}</code>
                    <span className={styles.num}>{e.px}</span>
                    <span className={styles.use}>{e.use}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className={`${styles.card} ${styles.cardWide}`}>
              <h3 className={styles.cardTitle}>모양</h3>
              <ul className={styles.shapes}>
                {RADIUS.map((r) => (
                  <li key={r.token} className={styles.shape}>
                    <span
                      className={`${styles.shapeBox} ${r.px === 999 ? styles.shapePill : ""}`}
                      style={{ borderRadius: r.px }}
                    />
                    <code className={styles.token}>{r.token}</code>
                    <span className={styles.num}>{r.px}</span>
                    <span className={styles.use}>{r.use}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── 움직임 ─────────────────────────────────────────── */}
      <section className={`${styles.section} ${styles.band} ${styles.reveal}`}>
        <div className={styles.shell}>
          <Head kicker="토큰" title="움직임" code="motion" />
          <p className={styles.body}>{MOTION.note}</p>
          <div className={styles.motionGrid}>
            <ul className={styles.durations}>
              {MOTION.durations.map((d) => (
                <li key={d.token} className={styles.duration}>
                  <code className={styles.token}>{d.token}</code>
                  <span className={styles.big}>{d.ms}<small>ms</small></span>
                </li>
              ))}
            </ul>
            <div className={`${styles.card} ${styles.motionCard}`} tabIndex={0}>
              <p className={styles.use}>상자에 손을 올리면 두 곡선이 달린다.</p>
              {MOTION.curves.map((c) => (
                <div key={c.token} className={styles.curve}>
                  <span className={`${styles.track} ${c.token === "leaving" ? styles.trackLeaving : styles.trackEntering}`}>
                    <i />
                  </span>
                  <code className={styles.token}>{c.token}</code>
                  <span className={styles.use}>
                    {c.value} · {c.use}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 글자 ───────────────────────────────────────────── */}
      <section className={`${styles.section} ${styles.reveal}`}>
        <div className={styles.shell}>
          <Head kicker="토큰" title="글자" code="typography · Pretendard" />
          <p className={styles.body}>
            크기 열 칸(11 → 40), 굵기는 가진 넷(400·500·600·700). 행간 세 칸 — 제목 1.25 · 촘촘 1.35 ·
            본문 1.65. 표에 없는 값은 «세게»가 아니라 우연이다. 한글은 낱말 안에서 끊지 않는다.
          </p>
          <ul className={styles.type}>
            {TYPE.map((t, i) => (
              <li key={i} className={styles.typeRow}>
                <span
                  className={styles.specimen}
                  style={{ fontSize: t.px, fontWeight: t.weight, lineHeight: t.lh }}
                >
                  {t.sample}
                </span>
                <span className={styles.typeMeta}>
                  <code className={styles.token}>{t.slot}</code>
                  <span className={styles.use}>
                    {t.px} · {t.weight}
                    {t.use ? ` · ${t.use}` : ""}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── 법 ─────────────────────────────────────────────── */}
      <section className={`${styles.section} ${styles.band} ${styles.reveal}`}>
        <div className={styles.shell}>
          <Head kicker="판단" title="값이 아니라 법" />
          <ul className={styles.notes}>
            {DESIGN.rules.map((r) => (
              <li key={r} className={styles.note}>
                <StarMark className={styles.noteStar} />
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── 히스토리 ───────────────────────────────────────── */}
      <section className={`${styles.section} ${styles.reveal}`}>
        <div className={styles.shell}>
          <Head kicker="지나온 길" title="되돌린 결정은 지우지 않는다" />
          <ol className={styles.history}>
            {HISTORY.map((h, i) => (
              <li key={i} className={styles.event}>
                <span className={styles.when}>{h.when}</span>
                <span className={styles.what}>{h.what}</span>
                <p className={styles.body}>{h.why}</p>
              </li>
            ))}
          </ol>
          <p className={styles.back}>
            <Link href="/" className={styles.inlineLink}>
              ← 처음으로
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
