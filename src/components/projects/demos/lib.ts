import { useEffect, useState } from "react";

// Each demo loops through a few steps; boxes react to the current step via CSS transitions.
// Restarts the timer on every step change, so a manual jump gets a full beat before auto-advancing.
export function useStep(count: number, ms = 5000) {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const id = setTimeout(() => setStep((step + 1) % count), ms);
    return () => clearTimeout(id);
  }, [step, count, ms]);
  return [step, setStep] as const;
}

// cn merges conflicting classes (later wins), so `on` reliably overrides `box`
export { cn as cx } from "@/lib/utils";

export const box =
  "rounded-2xl border border-ink/15 bg-white/70 px-3 py-2 transition-all duration-500 ease-spring";
export const on = "scale-[1.04] border-accent bg-accent/20 font-semibold shadow-lg shadow-accent/25";
export const card = "rounded-xl border border-ink/15 bg-ink/[0.04] p-2.5";
