import Arrow from "@/components/icons/Arrow";
import { DESIGN_URL } from "@/lib/site";
import DesignPreview from "./DesignPreview";
import s from "./AuroraHome.module.css";

export default function HomeDesign() {
  return (
    <section id="design" className={`${s.shell} ${s.designSection}`} aria-labelledby="design-title">
      <div className={s.designCopy}>
        <p className={s.eyebrow}>
          <span>03</span> OUR DESIGN LANGUAGE
        </p>
        <h2 id="design-title">
          같은 빛으로 이어지는
          <br />
          <span>Aurora Ledger.</span>
        </h2>
        <p>
          서로 다른 일을 하는 앱에도
          <br />
          익숙하고 편안한 감각이 흐르도록.
        </p>
        <p>
          깊은 남보라와 은은한 빛, 읽기 좋은 글자와 여백.
          <br />
          Aurora는 Twinkle AI Labs의 제품들을 이어주는
          <br />
          공통의 디자인 언어입니다.
        </p>
        <a className={s.textLink} href={DESIGN_URL}>
          디자인 이야기 살펴보기 <Arrow diagonal />
        </a>
      </div>
      <DesignPreview />
    </section>
  );
}
