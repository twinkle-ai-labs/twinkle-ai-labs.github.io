import type { NextConfig } from "next";

// 배포본은 서버가 없다 — 정적으로 굽는다.
const exporting = process.env.HOME_EXPORT === "1";

const config: NextConfig = {
  output: exporting ? "export" : undefined,
  // 배포 빌드는 제 방을 쓴다 — dev 서버의 .next 와 겹치지 않아
  // 서버가 도는 중에 구워도 서로의 청크를 깨지 않는다.
  // (out 을 distDir 로 두면 Next 가 제 내보내는 자리와 부딪히므로, 빌드 명령이 옮긴다.)
  distDir: exporting ? ".next-export" : ".next",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default config;
