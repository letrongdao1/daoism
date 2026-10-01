import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export function Eyebrow({ className, ...props }: ComponentProps<"p">) {
  return (
    <p
      className={cn(
        "mb-3 font-display text-xs uppercase tracking-[0.4em] text-accent",
        className,
      )}
      {...props}
    />
  );
}

export function Heading({ className, ...props }: ComponentProps<"h2">) {
  return (
    <h2
      className={cn(
        "font-display text-4xl font-medium leading-tight md:text-5xl",
        className,
      )}
      {...props}
    />
  );
}

export function Em({ className, ...props }: ComponentProps<"strong">) {
  return (
    <strong
      className={cn("font-semibold text-accent", className)}
      {...props}
    />
  );
}
