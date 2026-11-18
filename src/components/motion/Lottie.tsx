"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

type LottieProps = {
  /** Path to a .lottie or .json file, usually under /public/lottie. */
  src: string;
  loop?: boolean;
  speed?: number;
  className?: string;
  /** Accessible description; omit for purely decorative animations. */
  label?: string;
};

/**
 * Thin dotLottie wrapper. Freezes while offscreen, and shows the first
 * frame without playing when the visitor prefers reduced motion.
 */
export default function Lottie({
  src,
  loop = true,
  speed = 1,
  className,
  label,
}: LottieProps) {
  const reduced = useReducedMotion();

  return (
    <div
      className={cn("pointer-events-none", className)}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <DotLottieReact
        src={src}
        loop={loop && !reduced}
        autoplay={!reduced}
        speed={speed}
        renderConfig={{ freezeOnOffscreen: true, autoResize: true }}
        className="size-full"
      />
    </div>
  );
}
