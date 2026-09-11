import { STATUS_LABEL, doorStoreUrl, type LabApp } from "@/lib/labs";
import styles from "./door.module.css";

/**
 * Google Play 로고 — 네 조각. 색은 Google 의 브랜드 넷(파랑 · 초록 · 빨강 · 노랑)이라 문의 무채색 법(7) 밖이지만,
 * 이 로고만은 «여기서 받는구나»를 읽게 하는 남의 표지라 제 색으로 선다. 우리가 물들이지 않는다.
 */
function PlayLogo({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path fill="#4285F4" d="M4 2.8c-.4.3-.6.8-.6 1.3v15.8c0 .5.2 1 .6 1.3L13.2 12 4 2.8z" />
      <path fill="#34A853" d="M4 2.8 13.2 12l3.2-3.2L5.6 2.7c-.6-.3-1.2-.3-1.6.1z" />
      <path fill="#EA4335" d="M4 21.2c.4.4 1 .4 1.6.1l10.8-6.1-3.2-3.2L4 21.2z" />
      <path fill="#FBBC04" d="m16.4 8.8-3.2 3.2 3.2 3.2 3.8-2.1c.8-.5.8-1.7 0-2.2l-3.8-2.1z" />
    </svg>
  );
}

/**
 * 받기 — 문에서 유일하게 누를 것. 첫 화면 · 끝 화면은 우리가 그린 Play 배지, 머리띠는 같은 일을 하는 먹색 알약.
 * 스토어가 없는 앱은 받기 대신 지금 어디쯤인지를 말한다(누를 수 없는 것을 단추처럼 세우지 않는다).
 *
 * ↩ 2026-09-11 낮까지는 Google 이 배지 생성기에서 내어 주는 **검은 그림**(`en_badge_web_generic.png`)을 그대로 실었다 —
 * 상표 규정이 정한 모양이라는 이유였다. 그런데 그 그림은 둘레에 여백을 품은 채 흐릿하게 커지고, 검은 면이 문의
 * 무채색 판 위에서 혼자 무겁고, 다크에서는 흰 테두리가 두 겹으로 섰다. 로고는 그대로 두고(색도 모양도 Google 의 것),
 * 면 · 반지름 · 그늘 · 글자만 우리 사다리로 그린다 — 사람이 «손봐야지»라고 했다.
 */
export default function GetButton({ app, small = false }: { app: LabApp; small?: boolean }) {
  if (!app.store) {
    return small ? null : <span className={styles.status}>{STATUS_LABEL[app.status]}</span>;
  }
  if (small) {
    return (
      <a className={styles.pill} href={doorStoreUrl(app)}>
        앱 받기
      </a>
    );
  }
  return (
    <a className={styles.go} href={doorStoreUrl(app)} aria-label="Google Play에서 받기">
      <PlayLogo className={styles.goLogo} />
      <span className={styles.goText}>
        <span className={styles.goEyebrow}>GET IT ON</span>
        <span className={styles.goName}>Google Play</span>
      </span>
    </a>
  );
}
