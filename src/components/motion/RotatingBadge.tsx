import { useId } from "react";
import { cn } from "@/lib/utils";

/** Circular text badge that slowly spins (CSS only, stops for reduced motion). */
export default function RotatingBadge({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const id = useId();

  return (
    <div className={cn("relative aspect-square", className)} aria-hidden>
      <svg
        viewBox="0 0 100 100"
        className="size-full animate-[spin_18s_linear_infinite] motion-reduce:animate-none"
      >
        <defs>
          <path
            id={id}
            d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0"
          />
        </defs>
        <text className="fill-current text-[8.5px] font-medium tracking-[0.18em] uppercase">
          <textPath href={`#${id}`}>{text}</textPath>
        </text>
      </svg>
      <span className="absolute inset-0 m-auto size-2 rounded-full bg-accent" />
    </div>
  );
}
