/**
 * 문의 글리프 — 선 굵기와 끝 모양을 한 벌로. 크기는 CSS 가 아이콘 사다리로 준다.
 * 모두 장식이라 `aria-hidden` 이다 — 뜻은 옆의 글자가 진다.
 */
type Props = { className?: string };

const base = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export function CheckGlyph({ className }: Props) {
  return (
    <svg {...base} className={className} strokeWidth={3}>
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  );
}

/** 기기 — 기록이 이 기기에만 */
export function DeviceGlyph({ className }: Props) {
  return (
    <svg {...base} className={className}>
      <rect x="6" y="2.5" width="12" height="19" rx="2.5" />
      <path d="M10.5 18.5h3" />
    </svg>
  );
}

/** 사람 한 명 — 계정이 없다 */
export function PersonGlyph({ className }: Props) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20.5c.8-3.6 3.6-5.5 7-5.5s6.2 1.9 7 5.5" />
    </svg>
  );
}

/** 신호 없음 — 인터넷 없이도 */
export function OfflineGlyph({ className }: Props) {
  return (
    <svg {...base} className={className}>
      <path d="M2.5 8.8a14 14 0 0 1 4-2.6M9.8 5.3A14 14 0 0 1 21.5 8.8M5.5 12.3a9 9 0 0 1 3-1.9M13.4 10.1a9 9 0 0 1 5.1 2.2M9 15.8a4.5 4.5 0 0 1 6 0" />
      <path d="M12 19.5h.01M3 3l18 18" />
    </svg>
  );
}

/** 자물쇠 — 암호가 기기 밖으로 나가지 않는다 */
export function LockGlyph({ className }: Props) {
  return (
    <svg {...base} className={className}>
      <rect x="4.5" y="10.5" width="15" height="10.5" rx="2.5" />
      <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3M12 15v2" />
    </svg>
  );
}

/** 돌아오는 화살표에 빗금 — 매달 도는 결제(구독)가 없다 */
export function NoRepeatGlyph({ className }: Props) {
  return (
    <svg {...base} className={className}>
      <path d="M20 12a8 8 0 0 1-13.7 5.6M4 12a8 8 0 0 1 13.7-5.6" />
      <path d="M18 3v3.6h-3.6M6 21v-3.6h3.6M3 3l18 18" />
    </svg>
  );
}

/**
 * 믿어도 되는 이유의 글리프 — **글이 이름으로 고른다**.
 * ↩ 자리(첫째 · 둘째 · 셋째)가 모양을 정했다. 물타기 계산기의 세 약속(기기 · 로그인 · 인터넷)에 맞춘 순서라,
 * Pocket PDF 가 제 약속 셋을 적자 «암호 보호»에 사람이, «구독 없음»에 끊긴 와이파이가 섰다 — 글과 그림이 다른 말을 했다.
 */
export const TRUST_GLYPHS = {
  device: DeviceGlyph,
  person: PersonGlyph,
  offline: OfflineGlyph,
  lock: LockGlyph,
  noRepeat: NoRepeatGlyph,
} as const;

export type TrustGlyph = keyof typeof TRUST_GLYPHS;
