import SiteFrame from "@/components/SiteFrame";

/** 이름의 장들 — 홈. 앱의 문은 `(door)` 에 따로 선다. */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return <SiteFrame>{children}</SiteFrame>;
}
