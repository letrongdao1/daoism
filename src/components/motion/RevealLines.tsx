"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText } from "@/lib/gsap";

type RevealLinesProps = {
  as?: ElementType;
  className?: string;
  children: ReactNode;
  /** Delay before the reveal starts, in seconds. */
  delay?: number;
  /** ScrollTrigger start; pass false to play immediately on mount. */
  start?: string | false;
};

/**
 * Splits text into masked lines that slide up into view when scrolled to.
 * Re-splits on resize. Without JS or with reduced motion, text is static.
 */
export default function RevealLines({
  as: Tag = "p",
  className,
  children,
  delay = 0,
  start = "top 85%",
}: RevealLinesProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const split = SplitText.create(ref.current!, {
          type: "lines",
          mask: "lines",
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.lines, {
              yPercent: 110,
              duration: 1.1,
              ease: "expo.out",
              stagger: 0.08,
              delay,
              scrollTrigger: start
                ? { trigger: ref.current, start, once: true }
                : undefined,
            }),
        });
        return () => split.revert();
      });
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
