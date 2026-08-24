import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AppThunk, RootState } from "./index";

/**
 * 스크롤 — **한 번 재고 여럿이 읽는다.**
 *
 * 머리띠·맨위로 버튼이 저마다 `scroll` 을 듣던 때에는, 같은 사실을 두 번 재고
 * 두 군데에 «얼마나 내려가면»의 기준이 흩어져 있었다. 여기서는 [ScrollSync] 하나가
 * 실제 값을 싣고, «머리띠가 떠야 하는가»·«버튼이 보여야 하는가»는 **선택자가 판단한다** —
 * 기준이 한 줄로 남아 다음 사람이 고칠 자리를 찾을 수 있다.
 */
type ScrollState = {
  /** 문서가 얼마나 내려갔는가(px). */
  offset: number;
  /** 창의 높이(px). 「한 화면쯤 내려갔다」를 세려면 이것이 함께 있어야 한다. */
  viewportHeight: number;
};

/** 맨 위로 버튼이 나서는 자리 — 한 화면의 70%쯤 내려갔을 때. */
const BACK_TO_TOP_AT = 0.7;

const initialState: ScrollState = { offset: 0, viewportHeight: 0 };

const scrollSlice = createSlice({
  name: "scroll",
  initialState,
  reducers: {
    scrollChanged(state, action: PayloadAction<ScrollState>) {
      state.offset = action.payload.offset;
      state.viewportHeight = action.payload.viewportHeight;
    },
  },
});

export const { scrollChanged } = scrollSlice.actions;
export default scrollSlice.reducer;

/** 머리띠가 판에서 떠올라야 하는가 — 한 픽셀만 내려가도 그렇다. */
export const selectIsPageScrolled = (state: RootState): boolean => state.scroll.offset > 0;

/** 맨 위로 버튼이 보여야 하는가. */
export const selectIsBackToTopVisible = (state: RootState): boolean =>
  state.scroll.offset > state.scroll.viewportHeight * BACK_TO_TOP_AT;

/**
 * 맨 위로 — 화면에 내리는 **명령**이라 상태를 바꾸지 않는다.
 * 스크롤이 실제로 움직이면 [ScrollSync] 가 그 사실을 다시 싣는다.
 *
 * 「덜 움직이기」를 켠 사람에게는 뛰지 않는다 — 부드러운 스크롤은 그 설정이 막으려는 바로 그 움직임이다.
 */
export const backToTopRequested = (): AppThunk => () => {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
};
