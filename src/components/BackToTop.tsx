"use client";

import { useEffect, useState } from "react";
import styles from "./BackToTop.module.css";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => setVisible(window.scrollY > window.innerHeight * 0.7);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <button
      type="button"
      className={`${styles.button} ${visible ? styles.visible : ""}`}
      onClick={() => window.scrollTo({
        top: 0,
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      })}
      aria-label="맨 위로 이동"
      title="맨 위로"
      tabIndex={visible ? 0 : -1}
    >
      <span aria-hidden="true">↑</span>
    </button>
  );
}
