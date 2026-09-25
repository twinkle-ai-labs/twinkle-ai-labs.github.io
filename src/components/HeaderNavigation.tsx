"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";
import { NAV_LINKS, THEME_TOGGLE_LABELS } from "@/lib/site";
import styles from "@/app/layout.module.css";

/** 같은 메뉴가 넓은 화면에서는 한 줄, 좁은 화면에서는 펼칠 수 있는 목록으로 선다. */
export default function HeaderNavigation() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const controlsRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const navigationRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isMenuOpen) return;

    navigationRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();

    const desktopQuery = window.matchMedia("(min-width: 40em)");
    const closeOnDesktop = () => {
      if (desktopQuery.matches) setIsMenuOpen(false);
    };
    const closeOutside = (event: PointerEvent) => {
      if (event.target instanceof Node && !controlsRef.current?.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    desktopQuery.addEventListener("change", closeOnDesktop);
    document.addEventListener("pointerdown", closeOutside);
    return () => {
      desktopQuery.removeEventListener("change", closeOnDesktop);
      document.removeEventListener("pointerdown", closeOutside);
    };
  }, [isMenuOpen]);

  return (
    <div
      className={styles.headerActions}
      ref={controlsRef}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setIsMenuOpen(false);
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape" && isMenuOpen) {
          event.preventDefault();
          setIsMenuOpen(false);
          menuButtonRef.current?.focus();
        }
      }}
    >
      <nav
        id="site-navigation"
        className={styles.nav}
        ref={navigationRef}
        aria-label="주요 메뉴"
        data-open={isMenuOpen}
      >
        {NAV_LINKS.map((link) => {
          const path = link.href.replace(/\/$/, "");
          const isCurrent = link.href === "/"
            ? pathname === "/"
            : link.href.startsWith("/") && (pathname === path || pathname.startsWith(`${path}/`));
          return (
            <a
              key={link.key}
              href={link.href}
              className={`${styles.navLink} ${isCurrent ? styles.navLinkActive : ""}`}
              aria-current={isCurrent ? "page" : undefined}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </a>
          );
        })}
      </nav>
      <div className={styles.themeControl}>
        <ThemeToggle {...THEME_TOGGLE_LABELS} />
      </div>
      <button
        type="button"
        className={styles.menuToggle}
        ref={menuButtonRef}
        aria-label={isMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
        aria-expanded={isMenuOpen}
        aria-controls="site-navigation"
        onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
      >
        <svg className={styles.menuIcon} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
          {isMenuOpen ? <path d="m5 5 10 10M15 5 5 15" /> : <path d="M3 5h14M3 10h14M3 15h14" />}
        </svg>
      </button>
    </div>
  );
}
