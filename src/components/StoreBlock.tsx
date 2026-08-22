import QRCode from "qrcode";
import { withReferrer } from "@/lib/labs";
import styles from "@/app/home.module.css";

/**
 * 앱 카드의 오른쪽에 서는 «받는 자리» — 스토어 링크와 그 링크의 QR.
 *
 * QR 은 **주소에서 굽는다.** 그림 파일로 만들어 두면 주소가 바뀌는 날 QR 만 옛 곳을
 * 가리키는 두 벌이 되는데, 그 어긋남은 눈으로는 절대 못 잡는다 — 찍어 봐야 안다.
 * 정적 배포라 이 `await` 는 빌드 때 한 번 돌고 결과 SVG 가 HTML 에 박힌다. 런타임 비용은 없다.
 *
 * **스토어 주소가 없으면 아무것도 그리지 않는다.** 공개 전인 앱에 QR 을 세우면
 * 찍는 사람마다 404 를 보고, 카드가 «비공개 테스트 중»이라고 말하는 옆에서 QR 만
 * 거짓말을 하게 된다. 그 날이 오면 `labs.ts` 의 `store` 에 한 줄을 더하면 켜진다.
 */
export default async function StoreBlock({ url }: { url?: string }) {
  if (!url) return null;

  /*
   * 표식은 **여기서 한 번** 단다 — 링크와 QR 이 같은 주소를 봐야 하기 때문이다.
   * 둘에 따로 달면 위의 «QR 은 주소에서 굽는다»가 무너져 두 벌이 된다.
   */
  const target = withReferrer(url, "home");

  /*
   * 어두운 판 위여도 QR 은 **밝은 바탕에 어두운 모듈**로 굽는다.
   * 뒤집힌 QR 을 못 읽는 스캐너가 아직 많고, 못 읽는 QR 은 장식이지 링크가 아니다.
   * 그래서 이 판만은 테마를 따르지 않고 제 색을 갖는다.
   */
  const svg = await QRCode.toString(target, {
    type: "svg",
    margin: 0,
    errorCorrectionLevel: "M",
    color: { dark: "#21182D", light: "#FFFFFF00" },
  });

  return (
    <aside className={styles.storeBlock}>
      <a className={styles.storeButton} href={target}>
        Google Play <span aria-hidden="true">↗</span>
      </a>
      <div
        className={styles.qrPlate}
        /* QR 은 그림이다 — 읽어 줄 것이 없으니 이름표는 위의 링크가 진다 */
        aria-hidden="true"
        dangerouslySetInnerHTML={{ __html: svg }}
      />
      <p className={styles.qrNote}>카메라로 찍어도 열립니다</p>
    </aside>
  );
}
