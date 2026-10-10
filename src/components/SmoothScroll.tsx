"use client";

import { useLayoutEffect } from "react";
import { ScrollSmoother } from "../lib/gsap";

// layout effect so the smoother exists before children create their ScrollTriggers
export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const smoother = ScrollSmoother.create({ smooth: 0.8 });
    return () => smoother.kill();
  }, []);

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">{children}</div>
    </div>
  );
}
