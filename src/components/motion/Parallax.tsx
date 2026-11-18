"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type ParallaxProps = {
  children: ReactNode;
  className?: string;
  /** How far the inner layer travels, in percent of its own height. */
  amount?: number;
};

/**
 * Clips its child and drifts it vertically while the frame crosses the
 * viewport. The child should be oversized (e.g. scale-110) to hide edges.
 */
export default function Parallax({
  children,
  className,
  amount = 8,
}: ParallaxProps) {
  const frame = useRef<HTMLDivElement>(null);
  const layer = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          layer.current,
          { yPercent: -amount },
          {
            yPercent: amount,
            ease: "none",
            scrollTrigger: {
              trigger: frame.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });
    },
    { scope: frame, dependencies: [amount] },
  );

  return (
    <div ref={frame} className={cn("relative overflow-hidden", className)}>
      <div ref={layer} className="absolute inset-[-10%_0]">
        {children}
      </div>
    </div>
  );
}
