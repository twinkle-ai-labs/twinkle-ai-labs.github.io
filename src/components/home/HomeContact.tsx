import Arrow from "@/components/icons/Arrow";
import StarMark from "@/components/StarMark";
import { CONTACT_EMAIL } from "@/lib/site";
import s from "./AuroraHome.module.css";

export default function HomeContact() {
  return (
    <section className={s.closing}>
      <div className={s.closingGlow} aria-hidden="true" />
      <div className={s.shell}>
        <StarMark className={s.closingStar} gradientId="home-closing-star" />
        <p className={s.eyebrow}>BETTER WITH YOUR PERSPECTIVE.</p>
        <h2>
          쓰면서 발견한 이야기를
          <br />
          들려주세요.
        </h2>
        <p className={s.closingDescription}>
          마음에 든 순간도, 조금 아쉬웠던 부분도.
          <br />
          다음 개선의 출발점이 됩니다.
        </p>
        <a href={`mailto:${CONTACT_EMAIL}`} className={s.contactLink}>
          의견 보내기 <Arrow diagonal />
        </a>
        <span className={s.contactEmail}>{CONTACT_EMAIL}</span>
      </div>
    </section>
  );
}
