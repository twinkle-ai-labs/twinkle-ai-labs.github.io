export const CATALOG_INTRODUCTIONS: Record<
  string,
  { category: string; headline: string; description: string; features: string[] }
> = {
  "stock-calculator": {
    category: "FINANCE",
    headline: "복잡한 계산 끝에,\n분명한 숫자 하나.",
    description:
      "추가 매수 후의 평균단가부터 목표에 필요한 수량까지. 흩어진 계산을 한 화면에서 차분하게 정리합니다.",
    features: ["평균단가 계산", "목표 평단가 역산", "종목별 이력"],
  },
  "pocket-pdf": {
    category: "DOCUMENTS",
    headline: "문서가 필요한 순간,\n가볍게 꺼내 쓰세요.",
    description:
      "스캔하고, 모으고, 서명하는 일까지. 일곱 가지 PDF 도구로 필요한 문서 작업을 내 기기 안에서 마칩니다.",
    features: ["문서 스캔 · OCR", "PDF 병합 · 편집", "전자 서명"],
  },
};
