"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

const QUERY = "(pointer: fine) and (prefers-reduced-motion: no-preference)";
const INTERACTIVE = "a, button, [role='button'], [data-cursor]";

/**
 * Minimal dot cursor that trails the pointer. It grows over links and
 * buttons, and shows a word over elements with `data-cursor="View"`.
 * Mouse + full-motion only; everyone else keeps the native cursor.
 */
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [state, setState] = useState<{ hover: boolean; label: string | null }>({
    hover: false,
    label: null,
  });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(QUERY);
    const sync = () => setEnabled(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const root = document.documentElement;
    root.classList.add("has-cursor");

    const x = gsap.quickTo(dot.current, "x", {
      duration: 0.35,
      ease: "power3",
    });
    const y = gsap.quickTo(dot.current, "y", {
      duration: 0.35,
      ease: "power3",
    });

    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x(e.clientX);
      y(e.clientY);
      setVisible(true);
    };
    const over = (e: PointerEvent) => {
      const target = (e.target as Element).closest(INTERACTIVE);
      const label =
        target?.closest<HTMLElement>("[data-cursor]")?.dataset.cursor ?? null;
      setState({ hover: !!target, label });
    };
    const leave = () => setVisible(false);

    window.addEventListener("pointermove", move);
    document.addEventListener("pointerover", over);
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      root.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={dot}
      aria-hidden
      className={cn(
        "pointer-events-none fixed top-0 left-0 z-80",
        // invert over any background, except for labels which need contrast
        !state.label && "mix-blend-difference",
      )}
    >
      <div
        className={cn(
          "grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full text-[0.625rem] font-medium tracking-[0.08em] text-paper uppercase transition-[width,height,opacity,background-color] duration-300 ease-out-expo",
          !visible && "opacity-0",
          state.label
            ? "size-20 bg-accent"
            : state.hover
              ? "size-11 bg-[#f3f2ee] opacity-40"
              : "size-2.5 bg-[#f3f2ee]",
        )}
      >
        {state.label && <span>{state.label}</span>}
      </div>
    </div>
  );
}
