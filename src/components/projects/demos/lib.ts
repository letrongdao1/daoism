import { useEffect, useState } from "react";

// restarts on every step so a manual jump gets a full beat
export function useStep(count: number, ms = 5000) {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const id = setTimeout(() => setStep((step + 1) % count), ms);
    return () => clearTimeout(id);
  }, [step, count, ms]);
  return [step, setStep] as const;
}

// cn so `on` overrides `box`
export { cn as cx } from "@/lib/utils";

export const box =
  "rounded-2xl border border-ink/15 bg-white/70 px-3 py-2 transition-all duration-500 ease-spring";
export const on = "scale-[1.04] border-accent bg-accent/20 font-semibold shadow-lg shadow-accent/25";
export const card = "rounded-xl border border-ink/15 bg-ink/[0.04] p-2.5";
