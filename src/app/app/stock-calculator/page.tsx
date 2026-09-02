import type { Metadata } from "next";

/**
 * 물타기 계산기로 가는 문 — 읽는 장이 아니라 넘기는 장이다.
 *
 * 공유 그림의 QR 이 이 주소(https://twinklelabs.kr/app/stock-calculator)를 담는다.
 * 앱이 있는 기기에서는 App Links 가 브라우저보다 먼저 앱을 열므로 이 장은 뜨지 않고,
 * 여기까지 온 사람은 앱이 없는 사람이다 — 스토어로 넘긴다.
 *
 * 꼬리표(referrer)는 옛 QR 이 스토어 주소에 직접 실어 보내던 값 그대로다
 * (`utm_source=share`). 주소의 주인이 스토어에서 우리로 바뀌어도
 * Play 콘솔의 취득 경로 집계는 한 줄로 이어진다.
 */

const STORE_URL =
  "https://play.google.com/store/apps/details?id=kr.twinklelabs.stockcalculator&referrer=utm_source%3Dshare";

export const metadata: Metadata = {
  title: "물타기 계산기",
  // 넘기는 장은 검색에 서지 않는다 — 정본은 스토어 페이지다
  robots: { index: false, follow: false },
  alternates: { canonical: "/app/stock-calculator/" },
};

export default function AppStockCalculatorPage() {
  return (
    <>
      <script
        // 정적 익스포트라 서버 리다이렉트가 없다 — 브라우저가 스스로 넘어간다.
        // replace: 뒤로 가기에 이 장이 남으면 눌러도 다시 스토어로 튕기는 덫이 된다
        dangerouslySetInnerHTML={{
          __html: `location.replace(${JSON.stringify(STORE_URL)});`,
        }}
      />
      <p style={{ textAlign: "center", padding: "4rem 1.5rem", wordBreak: "keep-all" }}>
        Google Play로 이동하고 있어요… 넘어가지 않으면{" "}
        <a href={STORE_URL}>여기를 눌러 주세요</a>.
      </p>
    </>
  );
}
