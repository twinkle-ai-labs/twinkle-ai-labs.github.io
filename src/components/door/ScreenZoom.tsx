"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import type { DoorScreen } from "@/lib/labs";
import ScreenImage from "./ScreenImage";
import s from "./ScreenZoom.module.css";

/** 기존 기기 프레임의 크기와 배치는 유지하고 확대 동작만 더한다. */
export default function ScreenZoom({
  screen,
  children,
}: {
  screen: DoorScreen;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (!open) return;
    const modal = dialog.current;
    const previousOverflow = document.body.style.overflow;
    modal?.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      modal?.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <div className={s.wrapper}>
      {children}
      <button
        className={s.trigger}
        type="button"
        aria-label={`${screen.alt} — 크게 보기`}
        aria-haspopup="dialog"
        onClick={() => setOpen(true)}
      >
        <span className={s.hint}>
          화면 크게 보기 <span aria-hidden="true">↗</span>
        </span>
      </button>
      <dialog
        ref={dialog}
        className={s.dialog}
        aria-label="앱 화면 확대 보기"
        onCancel={() => setOpen(false)}
        onClose={() => setOpen(false)}
        onClick={(event) => {
          if (event.target === event.currentTarget) setOpen(false);
        }}
      >
        {open && (
          <div>
            <div className={s.heading}>
              <span>앱 화면</span>
              <button
                type="button"
                autoFocus
                onClick={() => setOpen(false)}
                aria-label="확대 화면 닫기"
              >
                ×
              </button>
            </div>
            <div className={s.screen}>
              <ScreenImage screen={screen} eager />
            </div>
          </div>
        )}
      </dialog>
    </div>
  );
}
