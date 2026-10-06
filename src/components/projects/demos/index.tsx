import type { ReactNode } from "react";
import HnbDemo from "./HnbDemo";
import ShareholderDemo from "./ShareholderDemo";
import EkycDemo from "./EkycDemo";
import MisDemo from "./MisDemo";
import { Eyebrow } from "@/components/ui/typography";

const demos: Record<string, () => ReactNode> = {
  "HNB Hub": HnbDemo,
  "Shareholder Meeting Portal": ShareholderDemo,
  eKYC: EkycDemo,
  "Internal MIS & Admin": MisDemo,
};

export default function ProjectDemo({
  title,
  isInternal,
}: {
  title: string;
  isInternal?: boolean;
}) {
  const Demo = demos[title];
  if (!Demo) return null;
  return (
    <div className="mt-8">
      <div className="flex items-start justify-between gap-4">
        <Eyebrow>How it works</Eyebrow>
        {isInternal && (
          <span className="text-right text-xs text-ink/50 italic">
            Internal use only · simplified mock-up, real data and UI withheld
          </span>
        )}
      </div>
      <div className="font-demo">
        <Demo />
      </div>
    </div>
  );
}
