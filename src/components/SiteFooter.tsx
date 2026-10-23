import Link from "next/link";
import StarMark from "@/components/StarMark";
import { APPS, type LabApp } from "@/lib/labs";
import { CONTACT_EMAIL, MOTTO, NAME, NAV_LINKS, SOCIAL_LINKS } from "@/lib/site";
import s from "./SiteFooter.module.css";

export default function SiteFooter({ app }: { app?: LabApp }) {
  return (
    <footer className={s.footer}>
      <div className={s.shell}>
        {app && (
          <div className={s.appLegal}>
            <span>{app.name}</span>
            <nav aria-label={`${app.name} 정책 및 지원`}>
              {app.terms && (
                <>
                  <a href={`${app.terms}terms/`}>이용약관</a>
                  <a href={`${app.terms}privacy/`}>개인정보 처리방침</a>
                </>
              )}
              <a href={`mailto:${CONTACT_EMAIL}`}>
                앱 문의 <span aria-hidden="true">↗</span>
              </a>
            </nav>
          </div>
        )}
        <div className={s.top}>
          <div className={s.brand}>
            <Link href="/" className={s.name}>
              <span className={s.symbol}>
                <StarMark gradientId="footer-brand" />
              </span>
              {NAME}
            </Link>
            <p>필요한 도구를, 좋아하는 모습으로.</p>
            <span className={s.caption}>독립적으로 만들고, 직접 쓰며 다듬습니다.</span>
          </div>
          <nav className={s.column} aria-label="푸터 앱 목록">
            <h2>APPS</h2>
            {APPS.map((item) => (
              <Link href={`/app/${item.slug}/`} key={item.slug}>
                {item.name}
              </Link>
            ))}
          </nav>
          <nav className={s.column} aria-label="바닥글 메뉴">
            <h2>EXPLORE</h2>
            {NAV_LINKS.filter((link) => link.key !== "home").map((link) => (
              <Link key={link.key} href={link.href}>
                {link.label}
                <span aria-hidden="true">{link.href.startsWith("https") ? "↗" : ""}</span>
              </Link>
            ))}
          </nav>
          <div className={s.column}>
            <h2>LET’S TALK</h2>
            <a className={s.mail} href={`mailto:${CONTACT_EMAIL}`}>
              {CONTACT_EMAIL}
              <span aria-hidden="true">↗</span>
            </a>
            <p className={s.invitation}>앱에 대한 생각, 편하게 들려주세요.</p>
            <nav className={s.social} aria-label="소셜 미디어">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${link.label} (새 탭에서 열림)`}
                >
                  {link.label}
                  <span aria-hidden="true">↗</span>
                </a>
              ))}
            </nav>
          </div>
        </div>
        <div className={s.bottom}>
          <span>
            © {new Date().getFullYear()} {NAME}
          </span>
          <span className={s.signature}>
            <StarMark />
            {MOTTO}
          </span>
        </div>
      </div>
    </footer>
  );
}
