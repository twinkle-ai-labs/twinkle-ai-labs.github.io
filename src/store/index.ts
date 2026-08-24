import { configureStore, type ThunkAction, type UnknownAction } from "@reduxjs/toolkit";
import { listenerMiddleware } from "./effects";
import scrollReducer from "./scrollSlice";
import themeReducer from "./themeSlice";

/**
 * 가게를 **부를 때마다 새로 짓는다.**
 *
 * 모듈 한 자리에 하나 세워 두면 그 하나가 모듈이 실린 채로 사는데, 서버에서 한 번
 * 구워지는 이 사이트에서는 그 「하나」가 요청 사이에 남을 수 있다. 상태는 화면 하나의
 * 것이므로 [Providers] 가 브라우저에서 한 번 짓고 그 뒤로는 같은 것을 쓴다.
 */
export function makeStore() {
  return configureStore({
    reducer: {
      theme: themeReducer,
      scroll: scrollReducer,
    },
    /* 부수효과는 리듀서보다 **먼저** 선다 — 상태가 바뀐 뒤에 화면과 쿠키를 맞춘다. */
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().prepend(listenerMiddleware.middleware),
  });
}

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
/** 화면에 명령만 내리고 상태를 바꾸지 않는 일 — 「맨 위로」 같은 것. */
export type AppThunk<Return = void> = ThunkAction<Return, RootState, unknown, UnknownAction>;
