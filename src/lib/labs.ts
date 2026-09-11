/**
 * 소개 화면의 말과 자료.
 *
 * 약관(Polaris)은 여러 언어로 자라지만, 소개는 아직 한국어 한 벌이다.
 * 그래도 문장은 화면이 아니라 여기 있다 — 언젠가 영어를 더할 때
 * 화면을 뜯을 일이 없도록, 처음부터 말과 화면을 갈라 둔다.
 *
 * 앱이 하나 늘면 [APPS] 에 한 줄을 더한다. 화면은 고치지 않는다.
 * (이름과 주소는 [site] 가 진다 — 그쪽은 이 화면만의 것이 아니다.)
 */

import { DESIGN_URL, POLARIS_URL } from "./site";

/* ── 앱 ─────────────────────────────────────────────────────── */

/** 앱이 지금 어디쯤 와 있는가. 배지의 말은 [STATUS_LABEL] 이 정한다. */
export type AppStatus = "live" | "testing" | "building";

export type LabApp = {
  slug: string;
  name: string;
  tagline: string;
  blurb: string;
  /**
   * 무엇을 해 주는지 — 한 줄씩. 문단 하나보다 눈이 먼저 읽는다.
   *
   * 지금은 **맨 앞 앱**만 이것을 그린다(나머지는 격자 카드로 서고 소개 문단만 든다).
   * 그래도 앱마다 적어 두는 것은, 앞자리가 바뀌는 날 글을 새로 쓰지 않기 위해서다.
   */
  points?: readonly string[];

  /**
   * 검색엔진에게 말하는 갈래(schema.org) — 사람 눈에는 안 보이고 구조화 데이터에만 실린다.
   *
   * 한때 [seo] 가 모든 앱에 `FinanceApplication` 을 박고 있었다. 앱이 계산기 하나일 때는
   * 맞는 말이었지만, PDF 도구가 들어온 순간 **검색엔진에게 거짓말을 하는 칸**이 됐다.
   * 앱마다 제 갈래를 든다.
   */
  category: string;
  status: AppStatus;
  /** `public/apps/` 의 아이콘. 없으면 이름의 첫 글자가 얼굴이 된다. */
  icon?: string;
  /** 앱의 문(`/app/<slug>/`)이 하는 말과 보여 줄 화면. 없으면 문은 이름 · 한 줄 · 소개 문단으로 선다. */
  page?: DoorPage;
  /** 스토어 주소 — 아직 공개 전이면 비운다. */
  store?: string;
  /**
   * 앱의 문(`/app/<slug>/`)이 넘기는 곳 — Play 의 패키지 id 와, 그 문에 다는 꼬리표.
   *
   * `store` 와 다른 칸이다: 저쪽은 «공개돼서 누구나 받을 수 있는가»라 공개 전에는 비우고,
   * 이쪽은 공유 그림의 QR·메신저 링크가 이미 사람을 데려오므로 공개 전에도 서야 한다.
   * 꼬리표(`utm_source`)는 문마다 다르다 — 물타기 계산기의 `share` 는 옛 QR 이 스토어
   * 주소에 직접 실어 보내던 값 그대로라, 주소의 주인이 바뀌어도 Play 콘솔의 집계가 이어진다.
   */
  door: { packageId: string; source: string };
  /** 이 앱의 약관 자리 — Polaris 는 제 주소에 산다. */
  terms?: string;
};

/** 장면 밑에 서는 짧은 사실 하나 — 이름과 값. */
export type DoorFact = { label: string; value: string };

/** 문이 보여 주는 앱의 화면 한 장 — 테마마다 한 벌. 사람이 고른 테마의 것이 선다. */
export type DoorScreen = { light: string; dark: string; alt: string };

/**
 * 앱의 문 — 링크(QR · 메신저 · 검색)로 곧장 떨어진 사람에게 «이 앱이 뭔가, 받을까»를 답하는 장.
 * 법은 `src/components/door/door.module.css` 의 머리에 있다.
 */
export type DoorPage = {
  /** 첫 화면의 큰 말 — 그 사람이 들고 온 질문. `|` 가 줄을 가른다(자동 줄바꿈에 맡기지 않는다). */
  headline: string;
  /** 큰 말 밑의 한 문장 — 질문에 대한 답. */
  lede: string;
  /** 받기 단추 밑의 짧은 사실들 — «무료» 처럼 한두 낱말. */
  facts: readonly string[];
  /** 첫 화면의 기기 속 화면. */
  hero: DoorScreen;
  /** «할 수 있는 일» 구획의 제목 — 다섯 장면을 한 문장으로. */
  featuresTitle: string;
  /**
   * 할 수 있는 일 — 제목 한 줄 · 문장 하나 · 그 일을 하는 화면 하나 · 화면에서 뽑은 숫자 두셋(`facts`).
   * 첫 화면의 기기와 같은 화면을 다시 넣지 않는다 — 같은 화면을 두 번 보이는 자리는 없다.
   * `facts` 는 옆 기기 속 화면에 실제로 선 값이다 — 글이 말하는 것을 숫자가 받친다. 없는 값을 짓지 않는다.
   */
  features: readonly { title: string; body: string; screen: DoorScreen; facts: readonly DoorFact[] }[];
  /** 믿어도 되는 이유 — 기록이 어디 머무는가. */
  trust: readonly { title: string; body: string }[];
  /** 끝 화면의 큰 말 — 받기 바로 위. `|` 가 줄을 가른다. */
  closing: string;
  /** 문의 맨 끝에 서는 한 줄 — 이 앱이 아닌 것. */
  disclaimer?: string;
};

/** `public/apps/<slug>/screens/<name>-<light|dark>.webp` — 앱의 날 화면(스토어 조판이 아니다). */
function screen(slug: string, name: string, alt: string): DoorScreen {
  const base = `/apps/${slug}/screens/${name}`;
  return { light: `${base}-light.webp`, dark: `${base}-dark.webp`, alt };
}

export const STATUS_LABEL: Record<AppStatus, string> = {
  live: "출시됨",
  testing: "비공개 테스트 중",
  building: "만드는 중",
};

/*
 * 스토어 주소에 **어디서 왔는지**를 달아 준다.
 *
 * Play 는 `utm_*` 을 주소에 그냥 붙인다고 읽지 않는다 — `referrer` 한 칸 안에
 * 통째로 넣어야 설치 귀속으로 잡힌다(그래서 안쪽은 한 번 더 인코딩된다).
 * 이걸 달아 두면 Play 콘솔의 획득 보고서에서 «홈페이지를 거쳐 온 설치»가 갈린다 —
 * 앱에 아무것도 심지 않고도 웹과 설치 사이에 고리가 하나 생긴다.
 */
export function withReferrer(url: string, medium: string): string {
  if (!url.includes("play.google.com")) return url;
  const referrer = `utm_source=twinklelabs.kr&utm_medium=${medium}&utm_campaign=home`;
  return `${url}${url.includes("?") ? "&" : "?"}referrer=${encodeURIComponent(referrer)}`;
}

/** 문이 넘기는 스토어 주소 — 꼬리표는 `referrer` 한 칸 안에 통째로 든다([withReferrer] 와 같은 이유). */
export function doorStoreUrl(app: LabApp): string {
  const referrer = encodeURIComponent(`utm_source=${app.door.source}`);
  return `https://play.google.com/store/apps/details?id=${app.door.packageId}&referrer=${referrer}`;
}

export const APPS: readonly LabApp[] = [
  {
    slug: "stock-calculator",
    name: "물타기 계산기",
    tagline: "얼마를 더 사야 평단가가 맞춰질까? 복잡한 물타기 계산부터 목표 평단가 역산까지 한 번에 해결하세요.",
    blurb:
      "평단가를 낮추려면 정확히 몇 주를 더 사야 하는지 매번 엑셀이나 계산기를 두드리며 셈하고 계셨나요? 이제 그 번거로움을 앱 하나로 끝내세요. 보유 주식과 매수할 주식을 입력하는 즉시 새 평단가가 나오고, '원하는 목표 평단가'만 넣으면 거꾸로 필요한 금액과 수량을 정확히 역산해 드립니다. 나만의 매수 시나리오를 세우고 그 결과를 깔끔한 이미지로 공유해 보세요.",
    /* 셋째 줄이 «통화 아홉 · 언어 열하나»였다 — 개수는 우리 자랑이지 쓰는 사람의 강점이 아니다.
       종목마다 통화와 단위를 따로 갖는다는 것이 «국내·해외·코인을 한 앱에서»라는 범위를 말하므로
       둘째로 올리고, 개수 대신 그 사람의 종목 하나로 말한다. */
    points: [
      "실시간 물타기 평균단가 계산 및 목표 평단가 달성을 위한 역산 기능",
      "사칙연산과 빠른 입력 키(+1만, +1M)를 그대로 치는 스마트 수식 키패드",
      "주식·코인 등 종목별 통화와 수량 단위를 맞추고, 기기에 이력을 안전하게 저장",
      "상세한 시나리오 분석 결과와 QR코드가 포함된 요약 그림 공유 기능",
    ],
    status: "live",
    category: "FinanceApplication",
    door: { packageId: "kr.twinklelabs.stockcalculator", source: "share" },
    icon: "/apps/stock-calculator.png",
    store: "https://play.google.com/store/apps/details?id=kr.twinklelabs.stockcalculator",
    /* 화면은 앱의 스크린샷 하네스(stock-calculator `StoreScreenshotTest`)가 찍은 날 화면이다 —
       ko-KR 표본(삼성전자 · 72,500원 · 20주)이라 스토어의 한국어 사진과 같은 숫자로 선다. */
    page: {
      headline: "얼마를 더 사야|평단가가 맞춰질까?",
      lede: "보유와 추가 매수를 넣으면 새 평단가가, 원하는 평단가를 넣으면 필요한 수량과 금액이 바로 나옵니다.",
      facts: ["무료", "로그인 없음", "기록은 이 기기에만"],
      hero: screen("stock-calculator", "home", "물타기 계산 화면 — 72,500원에 20주, 58,000원에 15주를 더 사면 새 평단가 66,285.71원"),
      featuresTitle: "계산부터 리포트까지, 한 앱에서.",
      features: [
        {
          title: "목표에서 거꾸로",
          body: "원하는 평단가를 넣으면 몇 주를 더 사야 하는지, 얼마가 드는지 역산합니다.",
          screen: screen("stock-calculator", "target", "목표 평단가 화면 — 필요한 추가 수량과 금액"),
          facts: [
            { label: "목표 평단가", value: "64,525원" },
            { label: "더 살 수량", value: "24.44주" },
            { label: "필요한 금액", value: "1,417,778원" },
          ],
        },
        {
          title: "칸마다 계산기",
          body: "500,000 ÷ 69,000 처럼 식을 그대로 칩니다. +1천 · +1만 · +10만 빠른 키로 한 번에 올립니다.",
          screen: screen("stock-calculator", "keypad", "수식을 치는 키패드와 빠른 키"),
          facts: [
            { label: "식 그대로", value: "500,000 ÷ 69,000" },
            { label: "빠른 키", value: "+1천 · +1만 · +10만 · +100만" },
          ],
        },
        {
          title: "종목마다 통화와 단위",
          body: "삼성전자는 원으로, 비트코인은 달러와 BTC로, 금은 그램으로. 국내 주식도 해외 주식도 코인도 한 앱에서 셉니다.",
          screen: screen("stock-calculator", "stocks", "종목 관리 — 종목마다 다른 통화와 수량 단위 배지"),
          facts: [
            { label: "삼성전자", value: "₩ · 주" },
            { label: "비트코인", value: "$ · BTC" },
            { label: "금", value: "₩ · g" },
          ],
        },
        {
          title: "굴려 본 계산이 쌓입니다",
          body: "저장한 계산은 종목별로 모입니다. 아이콘을 골라 종목에 얼굴을 붙이세요.",
          screen: screen("stock-calculator", "history", "계산 이력 — 종목별로 묶인 기록"),
          facts: [
            { label: "묶는 단위", value: "종목" },
            { label: "한 기록에", value: "입력 넷과 결과" },
            { label: "삼성전자", value: "2건" },
          ],
        },
        {
          title: "한 장으로 나가는 리포트",
          body: "본전까지의 거리와 주가가 움직일 때의 손익을 리포트로 보고, QR이 든 그림으로 바로 공유합니다.",
          screen: screen("stock-calculator", "report", "투자 리포트 — 본전 탈출 허들과 주가 변동 시나리오 손익"),
          facts: [
            { label: "본전 탈출 허들", value: "▼ 10.71%p" },
            { label: "주가 변동 시나리오", value: "±10% · ±20%" },
            { label: "공유", value: "QR 든 그림 한 장" },
          ],
        },
      ],
      trust: [
        { title: "이 기기에만 저장", body: "계산 기록과 종목 이름은 기기를 떠나지 않습니다. 백업에도 올라가지 않습니다." },
        { title: "로그인 없음", body: "계정도 가입도 없습니다. 열면 바로 계산합니다." },
        { title: "인터넷 없이도", body: "계산은 기기 안에서 합니다. 신호가 없는 곳에서도 됩니다." },
      ],
      closing: "다음 매수 전에,|네 칸부터.",
      disclaimer: "계산 도구입니다. 투자 자문이나 매매 권유가 아니며, 결과에는 실제 체결가·수수료·세금이 반영되지 않습니다.",
    },
    /* 앱 한 장이 이용약관과 개인정보 처리방침을 함께 든다 — 문서 하나가 아니라 그 목록을 가리킨다.
       (`/t/…` 를 가리키고 있었는데 Polaris 에 그런 길이 없어 404 였다. 서버가 없으니 고쳐 줄 것도 없다.) */
    terms: `${POLARIS_URL}/ko/stock-calculator/`,
  },
  {
    slug: "pocket-pdf",
    name: "Pocket PDF",
    tagline: "한 번의 결제로 끝나고, 문서는 기기 밖으로 내보내지 않는 PDF 도구",
    blurb:
      "쓸 만한 PDF 편집 앱은 너무 비쌌습니다. 서명 하나 넣으려 해도 매달 구독료를 내야 했고, 문서는 남의 서버에 올려야 했습니다. 그래서 여섯 가지 도구를 모두 무료로 열고, 광고 제거는 구독 없이 한 번의 결제로 끝나게 했습니다. 병합도 문자 인식도 서명도 모두 기기 안에서 처리합니다.",
    points: [
      "스캔, 병합, 분할, 이미지 변환, 서명, 페이지 편집까지 여섯 가지 도구 모두 무료",
      "광고 제거는 구독도 등급도 없이 한 번의 결제로 완료",
      "문서를 촬영하면 한글까지 검색되는 PDF로 변환, 모든 처리는 기기 안에서",
    ],
    status: "testing",
    category: "UtilitiesApplication",
    door: { packageId: "kr.twinklelabs.pocketpdf", source: "web" },
    icon: "/apps/pocket-pdf.png",
    terms: `${POLARIS_URL}/ko/pocket-pdf/`,
  },
] as const;

/* ── 화면의 말 ──────────────────────────────────────────────── */

export const HERO = {
  /* 이름은 머리띠가 이미 말한다 — 첫 화면에서는 별 하나가 그 자리를 대신한다. */
  title: "스스로 빛나다",
  /** 제목은 다짐이라 «무엇을 하는 곳인지»를 말하지 않는다 — 그 일은 이 줄이 한다. */
  define: "Twinkle AI Labs는 한 명의 개발자가 AI와 함께 운영하는 개인 제품 스튜디오입니다.",
  lead: "아이디어를 기획하고 설계해 실제 제품으로 내놓고, 오래 쓸 수 있도록 직접 돌봅니다.",
  primary: { label: "만든 것 보기", href: "#apps" },
  secondary: { label: "이야기 읽기", href: "#names" },
} as const;

/** 이름이 무엇을 뜻하는지 — Twinkle 과 Polaris. */
export const NAMES_SECTION = {
  eyebrow: "이름",
  title: "이름의 뜻",
  items: [
    {
      word: "Twinkle",
      reading: "트윙클 · 반짝이다",
      body:
        "별이 반짝이는 것은 남의 빛을 되비추기 때문이 아니라, 스스로 타고 있기 때문입니다. 그래서 Twinkle은 이름이자 다짐입니다.",
      motto:
        "“스스로 빛나다.” 누가 자리를 만들어 주기를 기다리지 않고, 떠올린 생각을 가치 있는 제품으로 완성해 직접 내놓습니다.",
    },
    {
      word: "Polaris",
      reading: "폴라리스 · 북극성",
      body:
        "북극성은 밤하늘의 변하지 않는 이정표입니다. 모든 앱의 이용약관과 개인정보 처리방침은 Polaris에 한자리에 투명하게 모입니다. 약관이 변경되더라도 앱을 매번 새로 올릴 필요 없이, 언제나 동일하고 신뢰할 수 있는 단일 기준을 제공합니다.",
      link: { label: "약관 보관소 열기", href: POLARIS_URL },
    },
  ],
} as const;

export const APPS_SECTION = {
  eyebrow: "만든 것",
  /* «첫 번째 앱»이라고 적혀 있었다 — 앱이 둘이 된 날 제목만 그대로 남았다.
     수를 세는 제목은 앱이 늘 때마다 조용히 거짓이 된다. */
  title: "그렇게 만든 앱",
  note: "앱 하나를 끝까지 만들 때마다 배운 것을 기록해 다음 제품으로 넘깁니다.",
} as const;

export const FOUNDER = {
  eyebrow: "만드는 사람",
  title: "경험을 하나로 완성하는 방식",
  /** 숫자가 먼저 말하고, 이야기가 뒤를 받는다. */
  stats: [
    { value: "5년+", label: "웹·서버 개발" },
    { value: "10+", label: "기획부터 운영까지 총괄한 프로젝트" },
    { value: "1 + AI", label: "Twinkle AI Labs의 원팀" },
  ],
  body: [
    "5년 넘게 개발자로 일하며 제품의 앞과 뒤를 두루 경험했습니다. 그중 3년 5개월 동안은 10개가 넘는 프로젝트를 기획부터 설계, 개발, 배포, 운영까지 직접 책임졌습니다. 웹 화면과 서버, 하이브리드 앱 출시, 인프라 구축, 로봇 통신 시스템까지 필요에 따라 경계를 넘으며 아이디어가 실제 서비스가 되는 전 과정을 배웠습니다.",
    "현재는 서버 개발자로 일하며 백엔드와 클라우드 인프라를 더 깊이 다루고 있습니다. 이전에 쌓은 풀스택 경험 위에 안정적으로 동작하고 오래 버티는 기반을 설계하는 전문성을 더하며, 제품 전체를 이해하고 완성하는 개발자로 성장하고 있습니다.",
    "이렇게 쌓아 온 경험에 AI가 새로운 시야와 속도를 더했습니다. 디자인 시스템 Aurora Ledger와 약관 인프라 Polaris를 만들고, 그 기반 위에서 물타기 계산기를 완성했습니다. 서로 다른 듯 보였던 경험들이 하나의 제품으로 이어진 첫 번째 결과물입니다.",
  ],
} as const;

export const HOW = {
  eyebrow: "만드는 방식",
  title: "동작하는 것을 넘어 아름답게 완성한다",
  items: [
    {
      title: "아름답게 완성한다",
      body: "모든 픽셀과 인터랙션에는 명확한 이유가 있습니다. 동작만 하는 단계에 멈추지 않고 완성도가 느껴질 때까지 다듬습니다.",
    },
    {
      title: "일관된 디자인 시스템",
      body: "색, 간격, 둥글기, 움직임을 하나의 토큰 체계로 정의한 Aurora Ledger가 모든 앱에서 같은 경험을 만듭니다.",
    },
    {
      title: "설명이 필요 없는 직관성",
      body: "별도의 설명서 없이 켜자마자 즉시 사용할 수 있어야 합니다. 설명이 필요하다면 화면 구성에 부족함이 있다는 뜻입니다.",
    },
    {
      title: "본질에 집중한 단순함",
      body: "불필요한 요소를 덜어내어 사용자에게 꼭 필요한 가치만 남깁니다. 기능이 불어난 앱이 아니라 고민이 줄어드는 앱을 만듭니다.",
    },
  ],
} as const;

/**
 * 디자인 시스템의 얼굴만 — 전문은 제 장(design.twinklelabs.kr)에 산다.
 *
 * 색견본은 hex 를 적지 않는다. 화면의 제 토큰(`var(--bg)` …)으로 칠하므로
 * 여기 있는 것은 **토큰의 이름과 그 자리의 뜻**뿐이고, 값은 테마를 따라 갈아입는다.
 */
export const DESIGN_SECTION = {
  eyebrow: "디자인 시스템",
  title: "Aurora Ledger",
  reading: "오로라 · 장부",
  lead: "모든 앱이 입는 한 벌. 물타기 계산기의 목업에서 태어나 2026년 8월에 모든 제품의 기준이 됐습니다.",
  more: { label: "디자인 시스템 전부 보기", href: DESIGN_URL },
  swatches: [
    { token: "bg", label: "판" },
    { token: "surface", label: "카드" },
    { token: "sunken", label: "파인 면" },
    { token: "divider", label: "구분선" },
    { token: "text", label: "잉크" },
    { token: "text-sub", label: "물러난 잉크" },
    { token: "primary", label: "누를 것" },
    { token: "accent", label: "글자의 보라" },
  ],
  ladders: [
    { name: "격자", value: "8pt", note: "간격은 8의 배수, 반 칸은 필요한 자리에만" },
    { name: "둥글기", value: "11 · 14 · 18 · 24", note: "입력칸 · 키 · 카드 · 시트. 알약은 한 줄짜리에만" },
    { name: "글자", value: "11 → 40", note: "크기는 열 단계, 굵기는 네 단계만 사용" },
    { name: "움직임", value: "150 · 250 · 350ms", note: "들어올 때와 나갈 때, 곡선은 두 가지" },
  ],
} as const;

export const MONEY = {
  eyebrow: "이어가는 마음",
  title: "작게 시작해 오래 남는 것을",
  body: [
    "이 원칙들이 향하는 곳은 크고 화려한 서비스보다, 켜자마자 할 일을 끝낼 수 있는 작은 도구입니다. 설명은 짧고, 쓰임은 분명하며, 다시 찾았을 때도 낯설지 않은 제품을 만들고 싶습니다.",
    "누구나 부담 없이 시작할 수 있게 하고, 운영에 필요한 수익은 단순하고 투명한 방식으로 만듭니다. 오래 유지할 수 있어야 제가 만든 것에 끝까지 책임질 수 있다고 믿습니다.",
  ],
} as const;
