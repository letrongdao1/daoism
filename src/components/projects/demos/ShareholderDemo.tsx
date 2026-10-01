import { box, cx, on, useStep } from "./lib";
import { DemoFrame } from "./ui";

const holders = [
  { id: "SH-01", shares: 5000, vote: "For", present: true },
  { id: "SH-02", shares: 3000, vote: "For", present: true },
  { id: "SH-03", shares: 1500, vote: "Against", present: true },
  { id: "SH-04", shares: 800, vote: "Abstain", present: false },
  { id: "SH-05", shares: 2500, vote: "For", present: true },
  { id: "SH-06", shares: 1200, vote: "Against", present: true },
  { id: "SH-07", shares: 600, vote: "For", present: false },
  { id: "SH-08", shares: 400, vote: "Abstain", present: true },
];
const totalShares = holders.reduce((a, h) => a + h.shares, 0);
const presentShares = holders
  .filter((h) => h.present)
  .reduce((a, h) => a + h.shares, 0);
const pct = (n: number, of: number) => Math.round((n / of) * 100);
const results = ["For", "Against", "Abstain"].map((v) => ({
  v,
  p: pct(
    holders
      .filter((h) => h.present && h.vote === v)
      .reduce((a, h) => a + h.shares, 0),
    presentShares,
  ),
}));

function Bar({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="mb-1 flex justify-between text-xs text-ink/60">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="h-2 rounded-full bg-ink/10">
        <div
          className="h-full rounded-full bg-accent transition-[width] duration-1000"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

export default function ShareholderDemo() {
  const [step] = useStep(4);
  return (
    <DemoFrame
      step={step}
      steps={[
        "Shareholders arrive at the meeting",
        "Check-in against the eligibility list sets the quorum",
        "Votes are weighted by shares held, not by headcount",
        "Results go live on screen",
      ]}
    >
      <div className="grid gap-5 sm:grid-cols-[1fr_14rem]">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {holders.map((h) => {
            const inRoom = step >= 1 && h.present;
            return (
              <div
                key={h.id}
                className={cx(
                  box,
                  "text-xs",
                  inRoom && on,
                  step >= 1 && !h.present && "opacity-30",
                )}
              >
                <div className="font-bold">{h.id}</div>
                <div className="text-ink/60">
                  {step >= 2 && inRoom ? (
                    <span key="vote" className="word-rise inline-block">
                      {h.vote}
                    </span>
                  ) : (
                    `${h.shares.toLocaleString()} sh`
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <div className="space-y-3">
          <Bar
            label="Quorum"
            value={step >= 1 ? pct(presentShares, totalShares) : 0}
          />
          {results.map((r) => (
            <Bar key={r.v} label={r.v} value={step === 3 ? r.p : 0} />
          ))}
        </div>
      </div>
    </DemoFrame>
  );
}
