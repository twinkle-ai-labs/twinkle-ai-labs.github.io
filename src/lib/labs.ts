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
    tagline: "평단가와 추가 매수 전략, 손끝에서 즉시 확인",
    blurb:
      "현재 평단가와 보유 수량, 새로 매수할 단가를 입력하면 낮아지는 평단가를 실시간으로 계산해 드립니다.",
    points: [
      "목표 평단가 입력 시 필요한 매수 금액과 주식 수 자동 산출",
      "종목별 계산 이력 저장 및 간편한 재조회 지원",
    ],
    status: "testing",
    icon: "/apps/stock-calculator.png",
    terms: `${POLARIS_URL}/t/stock-calculator/`,
  },
];

export const HERO = {
  /* 이름은 머리띠가 이미 말한다 — 첫 화면에서는 별 하나가 그 자리를 대신한다. */
  title: "난 스스로 빛난다",
  /** 제목은 다짐이라 «무엇을 하는 곳인지»를 말하지 않는다 — 그 일은 이 줄이 한다. */
  define: "Twinkle AI Labs는 한 사람과 AI가 만들어가는 유틸리티 앱 스튜디오입니다.",
  lead: "켜자마자 할 일이 끝나는 도구를 만듭니다. 복잡함은 비우고 본질적 가치에 집중합니다.",
  primary: { label: "만든 앱 보기", href: "#apps" },
  secondary: { label: "이름의 뜻", href: "#names" },
} as const;

/** 이름이 무엇을 뜻하는지 — Twinkle 과 Polaris. */
export const NAMES = [
  {
    word: "Twinkle",
    reading: "트윙클 · 반짝이다",
    body:
      "별이 반짝이는 것은 남의 빛을 되비추기 때문이 아니라, 스스로 타고 있기 때문입니다. 그래서 Twinkle은 이름이자 다짐입니다 — 난 스스로 빛난다. 누가 자리를 만들어 주기를 기다리지 않고, 가치 있는 제품을 스스로 완성하여 내놓습니다.",
  },
  {
    word: "Polaris",
    reading: "폴라리스 · 북극성",
    body:
      "북극성은 밤하늘의 변하지 않는 이정표입니다. 모든 앱의 이용약관과 개인정보 처리방침은 polaris.twinklelabs.kr 한자리에 투명하게 모입니다. 약관이 변경되더라도 앱을 매번 새로 올릴 필요 없이, 언제나 동일하고 신뢰할 수 있는 단일 기준을 제공합니다.",
    link: { label: "약관 보관소 열기", href: POLARIS_URL },
  },
] as const;

/** 구획의 머리와 각주 — 화면에 박아 두지 않는다. */
export const NAMES_SECTION = { eyebrow: "이름", title: "이름의 뜻" } as const;

export const APPS_SECTION = {
  eyebrow: "앱",
  title: "지금까지 만든 앱",
  note: "하나의 제품을 끝까지 완성도 높게 다듬은 후 다음 도구를 이어나갑니다.",
} as const;

export const FOUNDER = {
  eyebrow: "만드는 사람",
  title: "배운 것을 증명하는 방식",
  /** 숫자가 먼저 말하고, 이야기가 뒤를 받는다. */
  stats: [
    { value: "5년+", label: "웹 풀스택 개발" },
    { value: "10+", label: "기획부터 운영까지 총괄한 프로젝트" },
    { value: "1 + AI", label: "Twinkle AI Labs의 원팀" },
  ],
  body: [
    "5년 넘게 웹 풀스택 개발자로 일했습니다. 이전 회사에서는 3년 5개월 동안 10개가 넘는 프로젝트를 기획부터 설계, 개발, 배포, 운영까지 직접 책임졌습니다 — 하이브리드 웹앱 출시부터 서버 및 인프라 구축, 로봇 통신 시스템까지.",
    "아이디어 하나가 서비스가 되기까지 필요한 전 과정을 경험했다는 것. 혼자서 제품을 만드는 지금, 그것이 가장 큰 자산입니다. 한 사람과 AI가 팀을 이루며, AI는 나를 대체하는 것이 아니라 내 시야와 사고를 확장합니다.",
    "따라서 여기서 만드는 것은 단순한 앱 하나에 그치지 않습니다. 디자인 시스템 Aurora Ledger, 약관 인프라 Polaris, 그리고 AI와의 유기적인 협업 체계까지 — 지속 가능한 제품 생산 시스템을 구축하고 있습니다. 물타기 계산기는 그 체계가 만든 첫 번째 결과물입니다.",
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
  eyebrow: "값에 대하여",
  title: "부담 없는 무료 이용과 투명한 운영 정책",
  body: [
    "앱은 누구나 자유롭게 내려받아 사용할 수 있으며, 최소한의 광고로 운영비를 충당합니다.",
    "광고 없는 깔끔한 환경을 원하시는 분은 단 한 번의 결제로 광고를 영구 제거할 수 있으며, 추가적인 결제 유도는 없습니다.",
  ],
} as const;

export const CONTACT = {
  eyebrow: "문의",
  title: "무엇이든 메일 한 통으로",
  body: "앱에 대한 개선 의견, 버그 제보, 제휴 등 어떤 문의든 환영합니다. 소중한 의견은 메일로 보내주시면 감사하겠습니다.",
} as const;

