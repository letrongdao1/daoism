import { useEffect, useState } from "react";
import { cx } from "./lib";
import { DemoFrame, Line } from "./ui";

const holders = [12, 58, 147, 203, 266].map((hue, i) => ({
  code: `SH-${String(i + 1).padStart(4, "0")}`,
  hue,
}));
type Holder = (typeof holders)[number];

const BASE = 2;

const fields: [string, string][] = [
  ["Full name", "70%"],
  ["Shareholder code", ""],
  ["ID / Passport no.", "60%"],
  ["Date of birth", "45%"],
  ["Nationality", "50%"],
  ["Phone number", "55%"],
  ["Email address", "80%"],
  ["Shares held", "35%"],
  ["Residential address", "75%"],
  ["Check-in time", "30%"],
];

function Avatar({ h, size = "size-8" }: { h: Holder; size?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cx("shrink-0 rounded-full", size)}
      style={{ background: `hsl(${h.hue} 55% 55%)` }}
    />
  );
}

export default function ShareholderDemo() {
  const [count, setCount] = useState(BASE);
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    const id = setInterval(
      () => setCount((c) => (c === holders.length ? BASE : c + 1)),
      1800,
    );
    return () => clearInterval(id);
  }, []);

  const arrivals = holders.slice(0, count).reverse();
  const current = arrivals.find((h) => h.code === selected) ?? arrivals[0];

  return (
    <DemoFrame>
      <div className="grid gap-4 sm:grid-cols-[15rem_1fr]">
        <div className="rounded-2xl border border-ink/15 bg-white/70 p-3">
          <div className="mb-2 flex items-center justify-between text-xs">
            <span className="font-bold">Checked in</span>
            <span className="flex items-center gap-1.5 text-ink/60">
              <span className="size-2 animate-pulse rounded-full bg-green-500" />
              {count} live
            </span>
          </div>
          <ul className="space-y-1.5">
            {arrivals.map((h) => (
              <li key={h.code} className="word-rise">
                <button
                  type="button"
                  onClick={() => setSelected(h.code)}
                  className={cx(
                    "flex w-full cursor-pointer items-center gap-2.5 rounded-xl border px-2 py-1.5 text-left transition-colors",
                    h.code === current.code
                      ? "border-accent bg-accent/20"
                      : "border-transparent hover:bg-ink/5",
                  )}
                >
                  <Avatar h={h} />
                  <span className="min-w-0 flex-1 space-y-1.5">
                    <Line w="75%" />
                    <span className="block text-[0.7rem] font-semibold text-ink/60">
                      {h.code}
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-ink/15 bg-white/70 p-4">
          <div key={current.code} className="word-rise">
            <div className="mb-4 flex items-center gap-3">
              <Avatar h={current} size="size-12" />
              <div className="flex-1 space-y-2">
                <Line w="40%" />
                <Line w="25%" />
              </div>
            </div>
            <div className="grid gap-x-3 gap-y-2.5 sm:grid-cols-2">
              {fields.map(([label, w]) => (
                <div
                  key={label}
                  className={cx(
                    label === "Residential address" && "sm:col-span-2",
                  )}
                >
                  <span className="mb-1 block text-[0.7rem] font-semibold tracking-wider text-ink/50 uppercase">
                    {label}
                  </span>
                  <div className="flex h-8 items-center rounded-lg border border-ink/15 bg-paper px-2.5 text-xs">
                    {w ? <Line w={w} /> : current.code}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DemoFrame>
  );
}
