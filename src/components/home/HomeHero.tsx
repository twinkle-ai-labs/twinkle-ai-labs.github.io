import Image from "next/image";
import Link from "next/link";
import Starfield from "@/components/Starfield";
import StarMark from "@/components/StarMark";
import Arrow from "@/components/icons/Arrow";
import { pdf, stock } from "./products";
import s from "./AuroraHome.module.css";

export default function HomeHero() {
  return (
    <section className={s.hero} aria-labelledby="home-title">
      <Starfield height="58rem" dots={44} sparkles={6} keepout={{ x: [4, 49], y: [14, 77] }} />
      <div className={`${s.shell} ${s.heroGrid}`}>
        <div className={s.heroCopy}>
          <p className={s.heroBadge}>
            <span /> INDEPENDENT PRODUCT STUDIO
          </p>
          <h1 id="home-title">
            필요한 도구를,
            <br />
            <span className={s.auroraText}>좋아하는 모습으로.</span>
          </h1>
          <p className={s.heroDescription}>
            일상의 필요에서 출발해,
            <br />
            기능과 디자인을 함께 다듬습니다.
          </p>
          <p className={s.studioIntro}>
            만드는 사람이 먼저 쓰는 앱.
            <br />
            AI와 함께하는 1인 개발 스튜디오, Twinkle AI Labs입니다.
          </p>
          <div className={s.actions}>
            <a className={s.primary} href="#apps">
              앱 둘러보기 <Arrow />
            </a>
            <a className={s.textLink} href="#studio">
              시작의 이야기 <span aria-hidden="true">↘</span>
            </a>
          </div>
        </div>
        <div className={s.constellation} aria-label="Twinkle의 별과 두 개의 제품">
          <div className={s.ambientOrb} aria-hidden="true" />
          <div className={s.orbit} aria-hidden="true" />
          <div className={s.orbitInner} aria-hidden="true" />
          <span className={s.constellationLabel}>MADE FOR MY EVERYDAY</span>
          <div className={s.starSculpture} aria-hidden="true">
            <div className={s.starGlass}>
              <StarMark gradientId="studio-sculpture" />
            </div>
            <span className={s.sculptureReflection} />
          </div>
          <span className={s.orbitStar} aria-hidden="true">
            ✧
          </span>
          <span className={s.orbitStarSmall} aria-hidden="true">
            ✦
          </span>
          <Link href="/app/pocket-pdf/" className={`${s.orbitProduct} ${s.orbitPdf}`}>
            <Image src={pdf.icon} width={38} height={38} alt="" />
            <span>
              <small>문서 작업을 가볍게</small>
              <strong>Pocket PDF</strong>
            </span>
            <Arrow diagonal />
          </Link>
          <Link href="/app/stock-calculator/" className={`${s.orbitProduct} ${s.orbitStock}`}>
            <Image src={stock.icon} width={38} height={38} alt="" />
            <span>
              <small>복잡한 숫자를 분명하게</small>
              <strong>물타기 계산기</strong>
            </span>
            <Arrow diagonal />
          </Link>
          <p className={s.constellationMotto}>
            스스로 빛나다.<span>TWINKLE AI LABS</span>
          </p>
        </div>
      </div>
      <div className={`${s.shell} ${s.heroFoot}`}>
        <span>작은 필요에서 시작된, 오래 쓰고 싶은 도구.</span>
        <a href="#apps">
          EXPLORE THE APPS <span aria-hidden="true">↓</span>
        </a>
      </div>
    </section>
  );
}
