import StarMark from "@/components/StarMark";
import Starfield from "@/components/Starfield";
import {
  CONTACT_EMAIL,
  FOOTER_BLURB,
  FOOTER_HEADINGS,
  MOTTO,
  NAME,
  NAV_LINKS,
} from "@/lib/site";
import styles from "@/app/layout.module.css";

/** 바닥에도 하늘 한 자락 — 첫 화면과 마지막 화면이 같은 말로 끝난다. */
const FOOTER_SKY_SEED = 19910104;

export default function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <Starfield
        seed={FOOTER_SKY_SEED}
        height="100%"
        dots={26}
        sparkles={3}
        className={styles.footerSky}
      />
      <div className={styles.footerInner}>
        <div className={styles.footerTop}>
          <div className={styles.footerBrand}>
            <p className={styles.footerName}>
              <StarMark className={styles.footerStar} />
              {NAME}
            </p>
            <p className={styles.footerLine}>{FOOTER_BLURB}</p>
          </div>
          {/* 머리띠와 **같은 목록**을 읽는다 — 메뉴가 하나 늘면 두 곳이 함께 는다. */}
          <nav className={styles.footerColumn} aria-label="바닥글 메뉴">
            <p className={styles.footerHeading}>{FOOTER_HEADINGS.nav}</p>
            <div className={styles.footerLinks}>
              {NAV_LINKS.map((link) => (
                <a key={link.key} href={link.href} className={styles.footerLink}>
                  {link.label}
                </a>
              ))}
            </div>
          </nav>
          <div className={styles.footerColumn}>
            <p className={styles.footerHeading}>{FOOTER_HEADINGS.contact}</p>
            <a className={styles.footerMail} href={`mailto:${CONTACT_EMAIL}`}>
              {CONTACT_EMAIL}
            </a>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p className={styles.footerCopyright}>© 2026 {NAME}</p>
          <p className={styles.footerMotto}>{MOTTO}</p>
        </div>
      </div>
    </footer>
  );
}
