"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { getLenis, setLenis } from "@/lib/lenis";

/**
 * Lenis smooth scrolling driven by GSAP's ticker, so ScrollTrigger and
 * Lenis share one frame loop. Disabled entirely for reduced motion.
 */
export default function SmoothScroll() {
  const reduced = useReducedMotion();
  const pathname = usePathname();

  useEffect(() => {
    if (reduced) return;

    const instance = new Lenis({ lerp: 0.1, anchors: true });
    setLenis(instance);

    instance.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      instance.destroy();
      setLenis(null);
    };
  }, [reduced]);

  // start every route at the top (or at its #hash), without easing across the old page
  useEffect(() => {
    const target = window.location.hash
      ? document.querySelector<HTMLElement>(window.location.hash)
      : null;
    const lenis = getLenis();
    // Lenis still holds the previous page's height and would clamp the scroll
    lenis?.resize();
    lenis?.scrollTo(target ?? 0, { immediate: true, force: true });
    ScrollTrigger.refresh();
  }, [pathname]);

  return null;
}
