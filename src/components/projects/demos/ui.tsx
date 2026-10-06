import type { ReactNode } from "react";
import { cx } from "./lib";

export function DemoFrame({
  steps = [],
  step,
  children,
}: {
  steps?: string[];
  step?: number;
  children: ReactNode;
}) {
  return (
    <div>
      <div className="rounded-3xl border border-ink/10 bg-ink/[0.03] bg-[radial-gradient(#05050514_1px,transparent_1px)] bg-size-[14px_14px] p-5 text-sm text-ink">
        {children}
      </div>
      {steps.length > 0 && (
        <ol className="mt-4 space-y-1.5 text-sm" aria-live="polite">
          {steps.map((s, i) => (
            <li
              key={s}
              className={cx(
                "flex items-center gap-3 transition-colors duration-500",
                i === step ? "text-ink" : "text-ink/35",
              )}
            >
              <span
                key={i === step ? "on" : "off"}
                className={cx(
                  "grid size-6 shrink-0 place-items-center rounded-full text-xs font-bold",
                  i === step
                    ? "pop bg-accent text-ink"
                    : "border border-ink/20",
                )}
              >
                {i + 1}
              </span>
              {s}
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

export const Line = ({ w = "100%" }: { w?: string }) => (
  <i className="block h-1.5 rounded-full bg-ink/15" style={{ width: w }} />
);
export const Img = ({ className = "" }: { className?: string }) => (
  <div
    className={cx(
      "rounded-lg bg-[repeating-linear-gradient(135deg,#05050512_0_6px,transparent_6px_12px)]",
      className,
    )}
  />
);
export const Dot = ({ s = "h-5 w-5" }: { s?: string }) => (
  <span
    className={cx(
      "inline-block rounded-full border border-ink/30 bg-ink/20",
      s,
    )}
  />
);
