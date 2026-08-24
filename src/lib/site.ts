/**
 * 이름과 주소 — 이 집 밖으로 나가는 것들.
 *
 * 세 서브도메인(홈·디자인·약관)이 서로를 가리키므로 주소는 **한 자리에** 둔다.
 * 머리띠와 바닥글이 같은 목록을 읽는 것도 같은 이유다 — 둘로 적어 두면
 * 메뉴가 하나 늘어난 날 한쪽만 늘어난다.
 */

/** 이름은 한 벌이다 — 줄여 쓰지 않는다. `sh .claude/checks/brand-name.sh` 가 센다. */
export const NAME = "Twinkle AI Labs";
export const MOTTO = "스스로 빛나다.";

export const CONTACT_EMAIL = "twinkle.ai.labs@gmail.com";
export const HOME_URL = "https://twinklelabs.kr";
/** Aurora Ledger 디자인 시스템 — 독립 도메인에 산다. */
export const DESIGN_URL = "https://design.twinklelabs.kr";
export const BLOG_URL = "https://blog.twinklelabs.kr";
/** 약관과 정책이 사는 곳 — 이 집이 아니라 제 주소에 산다. */
export const POLARIS_URL = "https://polaris.twinklelabs.kr";

/** 메뉴 한 칸. `key` 로 「지금 서 있는 곳」을 가린다 — 주소를 견주면 슬래시 하나에 어긋난다. */
export type NavLink = { key: string; label: string; href: string };

export const NAV_LINKS: readonly NavLink[] = [
  { key: "home", label: "홈", href: "/" },
  { key: "design", label: "디자인 시스템", href: DESIGN_URL },
  { key: "blog", label: "블로그", href: BLOG_URL },
  { key: "terms", label: "약관", href: POLARIS_URL },
] as const;

/** 이 집이 서 있는 칸. 머리띠와 바닥글이 여기에 표시를 단다. */
export const CURRENT_NAV_KEY = "home";

export const THEME_TOGGLE_LABELS = {
  toLight: "밝은 화면으로",
  toDark: "어두운 화면으로",
} as const;

/** 바닥글의 한 줄 소개 — 머리띠가 이름만 말하므로, 무엇을 하는 곳인지는 여기서 한 번 더. */
export const FOOTER_BLURB =
  "한 명의 개발자가 AI와 함께 만들고 직접 운영하는 개인 제품 스튜디오입니다.";

export const FOOTER_HEADINGS = { nav: "바로가기", contact: "연락" } as const;
