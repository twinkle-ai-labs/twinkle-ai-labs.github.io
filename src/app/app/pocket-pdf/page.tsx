import type { Metadata } from "next";

/**
 * Pocket PDF 로 가는 문 — 읽는 장이 아니라 넘기는 장이다.
 *
 * /app/<제품> 문법의 두 번째 줄이다(첫 줄은 물타기 계산기).
 * 앱이 있는 기기에서는 App Links 가 브라우저보다 먼저 앱을 열므로 이 장은 뜨지 않고,
 * 여기까지 온 사람은 앱이 없는 사람이다 — 스토어로 넘긴다.
 *
 * 꼬리표는 `utm_source=web` 이다. 물타기 계산기의 `share` 는 공유 그림의 QR 이
 * 싣던 값을 잇는 것이고, 이쪽은 아직 그런 유래가 없다 — 온 곳 그대로 적는다.
 */

const STORE_URL =
  "https://play.google.com/store/apps/details?id=kr.twinklelabs.pocketpdf&referrer=utm_source%3Dweb";

export const metadata: Metadata = {
  title: "Pocket PDF",
  // 넘기는 장은 검색에 서지 않는다 — 정본은 스토어 페이지다
  robots: { index: false, follow: false },
  alternates: { canonical: "/app/pocket-pdf/" },
};

export default function AppPocketPdfPage() {
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
