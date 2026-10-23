import Image from "next/image";
import Link from "next/link";
import Arrow from "@/components/icons/Arrow";
import { pdf, stock } from "./products";
import s from "./AuroraHome.module.css";

export default function HomeCollection() {
  return (
    <section id="apps" className={`${s.shell} ${s.section}`} aria-labelledby="apps-title">
      <div className={s.sectionHeading}>
        <div>
          <p className={s.eyebrow}>
            <span>01</span> THE COLLECTION
          </p>
          <h2 id="apps-title">일상에 더하는 작은 편리함.</h2>
        </div>
        <Link className={s.textLink} href="/app/">
          모든 앱 보기 <Arrow diagonal />
        </Link>
      </div>
      <div className={s.productGrid}>
        <Link href="/app/pocket-pdf/" className={s.productCard}>
          <div className={s.productTop}>
            <span>01 / DOCUMENTS</span>
            <span className={s.cardArrow}>
              <Arrow diagonal />
            </span>
          </div>
          <div className={s.paperScene} aria-hidden="true">
            <div className={s.paperBack} />
            <div className={s.paper}>
              <span>A LITTLE LESS PAPERWORK</span>
              <strong>일이 끝나는 순간</strong>
              <i />
              <i />
              <i />
              <div className={s.signature}>Twinkle</div>
              <span className={s.paperSeal}>완료</span>
            </div>
            <span className={s.paperSpark}>✦</span>
            <div className={s.paperBadge}>
              <span>✓</span> 나의 서명으로 완성
            </div>
          </div>
          <div className={s.productIdentity}>
            <Image src={pdf.icon} width={44} height={44} alt="" />
            <div>
              <h3>Pocket PDF</h3>
              <span>흩어진 문서가, 정돈된 일상으로.</span>
            </div>
          </div>
          <p className={s.productDescription}>
            스캔부터 서명까지, 내 기기 안에서 끝나는 작은 문서 도구.
          </p>
          <div className={s.productFoot}>
            <span>Android · PDF 도구</span>
            <span>
              제품 이야기 <Arrow />
            </span>
          </div>
        </Link>
        <Link href="/app/stock-calculator/" className={`${s.productCard} ${s.stockCard}`}>
          <div className={s.productTop}>
            <span>02 / FINANCE</span>
            <span className={s.cardArrow}>
              <Arrow diagonal />
            </span>
          </div>
          <div className={s.numberScene} aria-label="계산 예시: 새로운 평균단가 66,285.71원">
            <div className={s.numberPanel}>
              <div className={s.numberCaption}>
                새로운 평균단가 <span>계산 예시</span>
              </div>
              <strong>
                66,285<span>.71</span>
                <small>원</small>
              </strong>
              <div className={s.chart} aria-hidden="true">
                {[35, 52, 42, 68, 57, 80, 66, 91, 78, 100].map((height, i) => (
                  <i key={i} style={{ height: `${height}%` }} />
                ))}
              </div>
              <div className={s.numberBottom}>
                <span>보유 20주</span>
                <span>＋</span>
                <span>추가 15주</span>
                <span>→</span>
                <strong>총 35주</strong>
              </div>
            </div>
          </div>
          <div className={s.productIdentity}>
            <Image src={stock.icon} width={44} height={44} alt="" />
            <div>
              <h3>물타기 계산기</h3>
              <span>다음 선택 앞에서, 숫자는 더 분명하게.</span>
            </div>
          </div>
          <p className={s.productDescription}>
            평단가 계산부터 목표 평단가 역산까지, 매수 전 꺼내 보는 도구.
          </p>
          <div className={s.productFoot}>
            <span>Android · 투자 계산</span>
            <span>
              제품 이야기 <Arrow />
            </span>
          </div>
        </Link>
      </div>
    </section>
  );
}
