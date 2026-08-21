import type { CSSProperties } from "react";
import styles from "./Starfield.module.css";

/* 별하늘 — 화면 위쪽에 조용히 반짝이는 장식.
   서버에서 한 번 그려져 정적으로 구워지므로, 자리는 시드로 고정한다 —
   빌드할 때마다 별자리가 바뀌면 그것은 하늘이 아니라 노이즈다. */

/** brand/symbol-*.svg 의 별 — 같은 모양이 여기서도 반짝인다. */
const STAR_PATH =
  "M50 12 C58.36 36.624 63.376 41.64 88 50 C63.376 58.36 58.36 63.376 50 88 " +
  "C41.64 63.376 36.624 58.36 12 50 C36.624 41.64 41.64 36.624 50 12 Z";

const SEED = 20260822;

/** mulberry32 — 시드 하나로 늘 같은 수열을 내놓는 작은 난수원. */
function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Star = {
  left: number;
  top: number;
  /** px — 장식용 점이라 글자와 함께 커지지 않는다. */
  size: number;
  base: number;
  scale: number;
  delay: number;
};

function shine(
  rnd: () => number,
  count: number,
  size: { min: number; max: number },
): Star[] {
  const stars: Star[] = [];
  while (stars.length < count) {
    const left = rnd() * 100;
    const top = rnd() * 100;
    const s = size.min + rnd() * (size.max - size.min);
    /* 제목이 서는 가운데 기둥은 비워 둔다 — 별은 글을 가리지 않는다. */
    if (left > 30 && left < 70 && top > 8 && top < 52) continue;
    stars.push({
      left: Math.round(left * 100) / 100,
      top: Math.round(top * 100) / 100,
      size: Math.round(s * 10) / 10,
      base: Math.round((0.25 + rnd() * 0.5) * 100) / 100,
      scale: Math.round((0.7 + rnd() * 0.9) * 100) / 100,
      delay: Math.round(rnd() * 100) / 100,
    });
  }
  return stars;
}

function starStyle(star: Star): CSSProperties {
  return {
    left: `${star.left}%`,
    top: `${star.top}%`,
    width: star.size,
    height: star.size,
    "--tw-base": star.base,
    "--tw-scale": star.scale,
    "--tw-delay": star.delay,
  } as CSSProperties;
}

export default function Starfield() {
  const rnd = mulberry32(SEED);
  const dots = shine(rnd, 56, { min: 1.5, max: 3 });
  const sparkles = shine(rnd, 7, { min: 10, max: 18 });

  return (
    <div className={styles.sky} aria-hidden="true">
      {dots.map((star, i) => (
        <span key={i} className={styles.dot} style={starStyle(star)} />
      ))}
      {sparkles.map((star, i) => (
        <span key={i} className={styles.sparkle} style={starStyle(star)}>
          <svg viewBox="0 0 100 100">
            <path d={STAR_PATH} fill="currentColor" />
          </svg>
        </span>
      ))}
    </div>
  );
}
