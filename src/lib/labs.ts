/**
 * 소개 화면의 말과 자료.
 *
 * 약관(Polaris)은 여러 언어로 자라지만, 소개는 아직 한국어 한 벌이다.
 * 그래도 문장은 화면이 아니라 여기 있다 — 언젠가 영어를 더할 때
 * 화면을 뜯을 일이 없도록, 처음부터 말과 화면을 갈라 둔다.
 *
 * 앱이 하나 늘면 `APPS` 에 한 줄을 더한다. 화면은 고치지 않는다.
 */

/** 앱이 지금 어디쯤 와 있는가. 배지의 말은 `STATUS` 가 정한다. */
export type AppStatus = "live" | "testing" | "building";

export type LabApp = {
  slug: string;
  name: string;
  tagline: string;
  blurb: string;
  /** 무엇을 해 주는지 — 한 줄씩. 문단 하나보다 눈이 먼저 읽는다. */
  points?: readonly string[];
  status: AppStatus;
  /** `public/apps/` 의 아이콘. 없으면 이름의 첫 글자가 얼굴이 된다. */
  icon?: string;
  /** 스토어 주소 — 아직 공개 전이면 비운다. */
  store?: string;
  /** 이 앱의 약관 자리 — Polaris 는 제 주소에 산다. */
  terms?: string;
};

export const STATUS: Record<AppStatus, string> = {
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

export const CONTACT_EMAIL = "twinkle.ai.labs@gmail.com";
export const BLOG_URL = "https://blog.twinklelabs.kr";
/** Aurora Ledger 디자인 시스템 — 독립 도메인에 산다. */
export const DESIGN_URL = "https://design.twinklelabs.kr";
/** 약관과 정책이 사는 곳 — 이 집이 아니라 제 주소에 산다. */
export const POLARIS_URL = "https://polaris.twinklelabs.kr";

export const APPS: LabApp[] = [
  {
    slug: "stock-calculator",
    name: "물타기 계산기",
    tagline: "필요해서 시작했고, 끝까지 만들어 본 첫 번째 앱",
    blurb:
      "투자할 때마다 반복하던 계산을 더 편하게 하고 싶어 만들었습니다. 작은 아이디어였지만 기획과 디자인, 개발과 출시 준비까지 직접 지나오며 제 방식으로 제품 하나를 완성했습니다.",
    points: [
      "목표 평단가에 필요한 매수 금액과 수량을 즉시 계산",
      "계산 이력을 남겨 자주 보는 종목을 다시 확인",
    ],
    status: "testing",
    icon: "/apps/stock-calculator.png",
    terms: `${POLARIS_URL}/t/stock-calculator/`,
  },
];

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
export const NAMES = [
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
] as const;

/** 구획의 머리와 각주 — 화면에 박아 두지 않는다. */
export const NAMES_SECTION = { eyebrow: "이름", title: "이름의 뜻" } as const;

export const APPS_SECTION = {
  eyebrow: "만든 것",
  title: "그렇게 만든 첫 번째 앱",
  note: "하나를 끝까지 만들며 배운 것은 기록하고 다듬어 다음 제품으로 이어갑니다.",
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
      body: "Aurora Ledger — 색·간격·둥글기·움직임을 단일 토큰 체계로 정의하여 모든 앱에서 동일하게 쾌적한 UX를 제공합니다.",
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

export const MONEY = {
  eyebrow: "이어가는 마음",
  title: "작게 시작해 오래 남는 것을",
  body: [
    "이 원칙들이 향하는 곳은 크고 화려한 서비스보다, 켜자마자 할 일을 끝낼 수 있는 작은 도구입니다. 설명은 짧고, 쓰임은 분명하며, 다시 찾았을 때도 낯설지 않은 제품을 만들고 싶습니다.",
    "누구나 부담 없이 시작할 수 있게 하고, 운영에 필요한 수익은 단순하고 투명한 방식으로 만듭니다. 오래 유지할 수 있어야 제가 만든 것에 끝까지 책임질 수 있다고 믿습니다.",
  ],
} as const;
