"use client";

import { useEffect } from "react";

/**
 * Dark curtain with the wordmark that lifts on first paint (CSS-driven, see
 * globals.css). Once it has played, `data-intro-done` on <html> lets the hero
 * skip the long curtain delay on later client-side visits to the home page.
 */
export default function IntroCurtain() {
  useEffect(() => {
    const id = setTimeout(
      () => document.documentElement.setAttribute("data-intro-done", ""),
      2400,
    );
    return () => clearTimeout(id);
  }, []);

  return (
    <div
      aria-hidden
      data-theme="dark"
      className="intro-curtain pointer-events-none fixed inset-0 z-70 grid place-items-center"
    >
      <span className="intro-curtain-mark text-title font-medium">
        daoism<span className="text-accent">.</span>
      </span>
    </div>
  );
}
