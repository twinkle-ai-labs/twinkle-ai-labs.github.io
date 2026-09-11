"use client";

import { useEffect, useRef, useState } from "react";
import type { DoorPage } from "@/lib/labs";
import DeviceFrame from "./DeviceFrame";
import DeviceScreen from "./DeviceScreen";
import ScreenImage from "./ScreenImage";
import styles from "./door.module.css";

/** 넓은 화면의 문턱 — CSS 의 `@media (min-width: 56em)` 과 같은 값이다. 둘이 갈리면 붙박이와 갤러리가 함께 선다 */
const WIDE = "(min-width: 56em)";

/**
 * 할 수 있는 일 — 기기 **한 대** 위에서 화면이 갈아 끼워진다(법 10).
 *
 * 넓은 화면: 왼쪽으로 장면의 글이 지나가고, 오른쪽에 붙박인 기기 한 대가 지금 읽는 장면의
 * 화면을 보인다. 어느 장면을 «읽는 중»인지는 그 글이 창의 가운데 띠를 지나는가로 센다.
 * 좁은 화면: 장면이 **옆으로 넘기는 갤러리**로 선다 — 한 장면에 기기 하나와 글. 다섯 대를 세로로 쌓으면
 * 폰 다섯 대를 지나는 4천 픽셀짜리 스크롤이 된다(2026-09-11, 휴대폰 폭 실측). 지금 어느 장면인지는 점 다섯이 말한다.
 *
 * 스크립트가 없으면 첫 장면의 화면이 서고 글은 다 보인다 — 못 보는 쪽이 손해 보지 않는다.
 */
export default function FeatureShowcase({ features }: { features: DoorPage["features"] }) {
  const [active, setActive] = useState(0);
  const trackRef = useRef<HTMLOListElement | null>(null);
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const steps = stepRefs.current.filter((el): el is HTMLLIElement => el !== null);
    const track = trackRef.current;
    if (steps.length === 0 || !track || typeof IntersectionObserver === "undefined") return;

    const wide = window.matchMedia(WIDE);
    let observer: IntersectionObserver | null = null;

    const indexOf = (target: Element) => steps.indexOf(target as HTMLLIElement);
    const watch = () => {
      observer?.disconnect();
      observer = wide.matches
        ? /* 창의 가운데 20% 띠만 본다 — 글이 그 띠에 들어오면 그 장면이다 */
          new IntersectionObserver(
            (entries) => entries.forEach((e) => e.isIntersecting && setActive(indexOf(e.target))),
            { rootMargin: "-40% 0px -40% 0px", threshold: 0 },
          )
        : /* 갤러리 — 통의 6할 이상이 보이는 장면이 지금 장면이다 */
          new IntersectionObserver(
            (entries) => entries.forEach((e) => e.isIntersecting && setActive(indexOf(e.target))),
            { root: track, threshold: 0.6 },
          );
      steps.forEach((step) => observer?.observe(step));
    };

    watch();
    wide.addEventListener("change", watch);
    return () => {
      wide.removeEventListener("change", watch);
      observer?.disconnect();
    };
  }, [features.length]);

  const goTo = (i: number) => {
    stepRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  };

  return (
    <div className={styles.showcase}>
      {/* 통 — 좁은 화면에서는 양 옆 세로 가운데에 앞뒤 화살표가 떠 있다(CSS 가 넓은 화면에서 걷는다) */}
      <div className={styles.track}>
        <button
          type="button"
          className={`${styles.arrow} ${styles.arrowPrev}`}
          aria-label="이전 장면"
          disabled={active === 0}
          onClick={() => goTo(active - 1)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={styles.arrowGlyph} aria-hidden="true">
            <path d="M15 5l-7 7 7 7" />
          </svg>
        </button>
        <ol ref={trackRef} className={styles.steps} aria-label="할 수 있는 일 — 장면 다섯">
          {features.map((feature, i) => (
            <li
              key={feature.title}
              ref={(el) => {
                stepRefs.current[i] = el;
              }}
              className={`${styles.step} ${i === active ? styles.stepActive : ""}`}
            >
              <div className={`${styles.stepText} ${styles.reveal}`}>
                <span className={styles.stepIndex} aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureBody}>{feature.body}</p>
                {/* 화면에서 뽑은 숫자 — 글이 말하는 것을 값이 받친다 */}
                <dl className={styles.stepFacts}>
                  {feature.facts.map((fact) => (
                    <div key={fact.label} className={styles.stepFact}>
                      <dt className={styles.stepFactLabel}>{fact.label}</dt>
                      <dd className={styles.stepFactValue}>{fact.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <div className={styles.stepDevice}>
                <DeviceScreen screen={feature.screen} />
              </div>
            </li>
          ))}
        </ol>
        <button
          type="button"
          className={`${styles.arrow} ${styles.arrowNext}`}
          aria-label="다음 장면"
          disabled={active === features.length - 1}
          onClick={() => goTo(active + 1)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={styles.arrowGlyph} aria-hidden="true">
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* 갤러리의 점 — 지금 어디인지. 누르면 그 장면으로 */}
      <div role="tablist" aria-label="장면 고르기" className={styles.dots}>
        {features.map((feature, i) => (
          <button
            key={feature.title}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-label={feature.title}
            className={`${styles.dot} ${i === active ? styles.dotActive : ""}`}
            onClick={() => goTo(i)}
          />
        ))}
      </div>

      <div className={styles.stageColumn} aria-hidden="true">
        <div className={styles.stage}>
          <DeviceFrame size="stage">
            {features.map((feature, i) => (
              <div key={feature.title} className={`${styles.layer} ${i === active ? styles.layerActive : ""}`}>
                <ScreenImage screen={feature.screen} hidden={i !== active} />
              </div>
            ))}
          </DeviceFrame>
        </div>
      </div>
    </div>
  );
}
