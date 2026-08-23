import type { NextConfig } from "next";

// 배포본은 서버가 없다 — 정적으로 굽는다.
const exporting = process.env.HOME_EXPORT === "1";

const config: NextConfig = {
  output: exporting ? "export" : undefined,
  // 배포 빌드는 제 방을 쓴다 — dev 서버의 .next 와 겹치지 않아
  // 서버가 도는 중에 구워도 서로의 청크를 깨지 않는다.
  distDir: exporting ? ".next-export" : ".next",
  trailingSlash: true,
  images: { unoptimized: true },
  // /design/* → design.twinklelabs.kr (정적 export 에서는 동작 안 하지만 CDN/서버 설정 참고용으로 기록)
  async redirects() {
    return [
      {
        source: "/design/:path*",
        destination: "https://design.twinklelabs.kr/:path*",
        permanent: true,
      },
    ];
  },
};

export default config;
