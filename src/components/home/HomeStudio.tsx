import StarMark from "@/components/StarMark";
import s from "./AuroraHome.module.css";

export default function HomeStudio() {
  return (
    <section id="studio" className={s.studio} aria-labelledby="studio-title">
      <div className={s.shell}>
        <div className={s.studioGrid}>
          <div>
            <p className={s.eyebrow}>
              <span>02</span> THE STARTING POINT
            </p>
            <h2 id="studio-title">
              쓰는 사람의 마음으로,
              <br />
              만드는 사람의 손으로.
            </h2>
            <div className={s.founderSignature}>
              <span className={s.founderMark}>
                <StarMark gradientId="founder-star" />
              </span>
              <div>
                <strong>직접 쓰며 쌓아가는 기준.</strong>
                <span>Independent developer · Twinkle AI Labs</span>
              </div>
            </div>
          </div>
          <div className={s.studioBody}>
            <p>
              필요한 기능은 있어도,
              <br />
              오래 쓰고 싶은 앱을 찾기는 쉽지 않았습니다.
            </p>
            <p>
              아쉬운 디자인, 흐름을 끊는 잦은 광고. 익숙해지기보다 다른 선택을 만들어 보고
              싶었습니다. 필요한 기능에 좋아하는 감각을 담는 일. Twinkle AI Labs의 출발점입니다.
            </p>
            <p>
              AI와 함께 아이디어를 구현하고, 직접 사용하며 작은 불편까지 다듬습니다. 개인의 필요에서
              시작한 도구가 비슷한 일상을 보내는 누군가에게도 자연스럽게 쓰이기를 바랍니다.
            </p>
          </div>
        </div>
        <div className={s.processGrid}>
          {[
            {
              number: "01",
              title: "필요에서 출발합니다",
              body: "자주 하는 일의 번거로움, 익숙한 도구의 아쉬움에서 만들 이유를 찾습니다.",
              word: "PURPOSE",
            },
            {
              number: "02",
              title: "쓰임과 감각을 함께",
              body: "명확한 기능과 편안한 화면. 잘 작동하는 만큼 기분 좋게 쓰이는 모습을 고민합니다.",
              word: "DESIGN",
            },
            {
              number: "03",
              title: "사용하며 완성합니다",
              body: "직접 쓰며 발견한 불편과 사용자의 의견을 모아, 조금씩 더 나은 도구로 다듬습니다.",
              word: "REFINE",
            },
          ].map((item) => (
            <div className={s.process} key={item.number}>
              <div>
                <span>{item.number}</span>
                <span>{item.word}</span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
