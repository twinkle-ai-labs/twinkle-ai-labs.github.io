# Twinkle AI Labs — 소개

이름의 앞마당. **https://twinklelabs.kr**

Next.js 를 정적으로 구워 GitHub Pages 로 올린다. 서버는 없다.

```bash
npm install
npm run dev       # http://localhost:3944
npm run build     # out/ 에 굽는다 (CNAME 포함)
npm run preview   # 구운 것을 3945 에서 열어 본다
```

## 어디에 무엇이 있나

| 자리 | 무엇 |
|---|---|
| `src/lib/labs.ts` | **화면의 말과 자료** — 앱 목록, 이름 풀이, 문구. 앱이 늘면 여기 한 줄 |
| `src/app/page.tsx` | 소개 한 장 (히어로 · 이름의 뜻 · 만드는 사람 · 앱 · 만드는 방식 · 디자인 시스템 · 값 · 문의) |
| `src/app/globals.css` | Aurora Ledger 토큰 두 계층 — 화면은 의미 토큰만 부른다. 글자·불투명도·고도 사다리도 여기 |
| `src/components/` | 하늘 — `Aurora`(흐르는 장막) · `Starfield`(별하늘) · `StarMark`(브랜드 별 하나) |
| `public/CNAME` | 사용자 지정 도메인. 구울 때 `out/` 으로 따라간다 |

약관과 정책은 여기 없다 — [Polaris](https://polaris.twinklelabs.kr) 가 제 주소에서 기른다.
