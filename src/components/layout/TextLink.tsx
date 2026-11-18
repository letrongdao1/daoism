import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

/** Small uppercase underlined link used for "more →" style actions. */
export default function TextLink({
  className,
  ...props
}: ComponentProps<typeof Link>) {
  return (
    <Link
      className={cn(
        "label underline decoration-line underline-offset-4 transition-colors hover:text-accent hover:decoration-accent",
        className,
      )}
      {...props}
    />
  );
}
