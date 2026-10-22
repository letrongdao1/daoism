import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export function Eyebrow({ className, ...props }: ComponentProps<"p">) {
  return (
    <p
      className={cn(
        "mb-3 font-title text-xs tracking-[0.4em] text-accent uppercase",
        className,
      )}
      {...props}
    />
  );
}

export function Heading({ className, ...props }: ComponentProps<"h2">) {
  return (
    <h2
      className={cn("font-title text-4xl leading-tight md:text-5xl", className)}
      {...props}
    />
  );
}

export function Em({ className, ...props }: ComponentProps<"strong">) {
  return (
    <strong className={cn("font-semibold text-accent", className)} {...props} />
  );
}
