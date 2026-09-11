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

/** 믿어도 되는 이유의 순서대로 — 데이터는 글만 들고, 모양은 자리가 정한다 */
export const TRUST_GLYPHS = [DeviceGlyph, PersonGlyph, OfflineGlyph] as const;
