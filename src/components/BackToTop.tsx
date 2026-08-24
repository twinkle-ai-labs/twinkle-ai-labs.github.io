"use client";

import { backToTopRequested, selectIsBackToTopVisible } from "@/store/scrollSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import styles from "./BackToTop.module.css";

/**
 * 맨 위로.
 *
 * 숨어 있을 때는 탭 순서에서도 빠진다 — 보이지 않는 버튼에 초점이 가면
 * 키보드로 넘기는 사람은 아무 데도 없는 곳에 서 있게 된다.
 */
export default function BackToTop() {
  const dispatch = useAppDispatch();
  const isVisible = useAppSelector(selectIsBackToTopVisible);

  return (
    <button
      type="button"
      className={`${styles.button} ${isVisible ? styles.visible : ""}`}
      onClick={() => dispatch(backToTopRequested())}
      aria-label="맨 위로 이동"
      title="맨 위로"
      tabIndex={isVisible ? 0 : -1}
    >
      <span aria-hidden="true">↑</span>
    </button>
  );
}
