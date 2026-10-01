import type { ReactNode } from "react";
import HnbDemo from "./HnbDemo";
import ShareholderDemo from "./ShareholderDemo";
import EkycDemo from "./EkycDemo";
import MisDemo from "./MisDemo";

const demos: Record<string, () => ReactNode> = {
  "HNB Hub": HnbDemo,
  "Shareholder Meeting Portal": ShareholderDemo,
  eKYC: EkycDemo,
  "Internal MIS & Admin": MisDemo,
};

export default function ProjectDemo({ title }: { title: string }) {
  const Demo = demos[title];
  if (!Demo) return null;
  return (
    <div className="mt-8">
      <p className="mb-3 font-display text-xs uppercase tracking-[0.4em] text-accent">
        How it works
      </p>
      <div className="font-demo">
        <Demo />
      </div>
    </div>
  );
}
