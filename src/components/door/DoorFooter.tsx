import Image from "next/image";
import type { LabApp } from "@/lib/labs";
import { CONTACT_EMAIL, HOME_URL, NAME } from "@/lib/site";
import styles from "./door.module.css";

/**
 * 문의 바닥글 — 이 앱의 약속(약관 · 방침)과 문의, 그리고 만든 이 한 줄.
 *
 * 약관은 앱마다 제 주소가 있다(`app.terms` — Polaris 의 그 앱 목록). 이름의 바닥글이 드는 네 사이트의
 * 목록은 여기 서지 않는다 — 문을 떠날 길은 «만든 이» 하나면 된다.
 */
export default function DoorFooter({ app }: { app: LabApp }) {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <p className={styles.footerApp}>
          {app.icon && <Image className={styles.footerIcon} src={app.icon} alt="" width={48} height={48} />}
          {app.name}
        </p>
        <ul className={styles.footerLinks}>
          {app.terms && (
            <>
              {/* `terms` 는 그 앱의 문서 목록(`…/ko/<slug>/`)이다 — 문서 둘은 그 아래에 선다 */}
              <li><a className={styles.footerLink} href={`${app.terms}terms/`}>이용약관</a></li>
              <li><a className={styles.footerLink} href={`${app.terms}privacy/`}>개인정보 처리방침</a></li>
            </>
          )}
          <li><a className={styles.footerLink} href={`mailto:${CONTACT_EMAIL}`}>문의</a></li>
        </ul>
        <div className={styles.footerMaker}>
          <span>
            <a className={styles.footerMakerLink} href={`${HOME_URL}/`}>{NAME}</a> 가 만든 앱
          </span>
          <span>© {year} {NAME}</span>
        </div>
      </div>
    </footer>
  );
}
