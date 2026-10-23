"use client";
import { useState } from "react";
import StarMark from "@/components/StarMark";
import s from "./AuroraHome.module.css";

export default function DesignPreview() {
  const [mode, setMode] = useState<"light" | "dark">("dark");
  return (
    <div className={s.designPreview}>
      <div className={s.designToolbar}>
        <span>AURORA / COLOR STUDY</span>
        <div role="group" aria-label="Aurora 색상 미리보기">
          <button type="button" aria-pressed={mode === "light"} onClick={() => setMode("light")}>
            Mist
          </button>
          <button type="button" aria-pressed={mode === "dark"} onClick={() => setMode("dark")}>
            Dusk
          </button>
        </div>
      </div>
      <div className={s.designCanvas} style={{ colorScheme: mode }}>
        <div className={s.sampleHeader}>
          <StarMark gradientId="aurora-sample" />
          <span>A little more clarity.</span>
          <span>✦</span>
        </div>
        <div className={s.sampleBody}>
          <span className={s.sampleLabel}>빛과 숫자를 위한 디자인</span>
          <strong>일상의 작은 여유.</strong>
          <p>꼭 필요한 것에, 자연스럽게 시선이 머물도록.</p>
          <div className={s.sampleMetric}>
            <span>균형 있는 간격</span>
            <strong>
              08<small>pt</small>
            </strong>
            <span className={s.sampleCheck}>✓</span>
          </div>
        </div>
        <div className={s.swatches} aria-label={`${mode === "dark" ? "Dusk" : "Mist"} 색상 팔레트`}>
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className={s.sampleFooter}>
          <span>{mode === "dark" ? "DUSK — 고요한 밤의 색" : "MIST — 맑은 아침의 색"}</span>
          <span>Twinkle AI Labs</span>
        </div>
      </div>
      <p className={s.previewHint}>Mist와 Dusk, 두 가지 빛을 만나보세요.</p>
    </div>
  );
}
