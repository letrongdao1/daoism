import { box, cx, on, useStep } from "./lib";
import { DemoFrame } from "./ui";

const teams = [
  { name: "Project Mgmt", ask: "project status" },
  { name: "Accounting", ask: "ledger report" },
  { name: "Risk", ask: "exposure limits" },
  { name: "HR", ask: "leave requests" },
];

export default function MisDemo() {
  const [step] = useStep(teams.length);
  const t = teams[step];
  return (
    <DemoFrame
      step={step}
      steps={teams.map((x) => `${x.name} requests ${x.ask}`)}
    >
      <div className={cx(box, "mx-auto w-fit text-center font-bold", on)}>
        ASP.NET API · SQL Server
      </div>
      <div className="flex h-12 items-center justify-center">
        <span
          key={step}
          className="word-rise rounded-full border border-ink/15 px-3 py-1 text-xs text-ink/70"
        >
          ↑ {t.ask} ↓
        </span>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {teams.map((x, i) => (
          <div
            key={x.name}
            className={cx(box, "text-center", i === step ? on : "opacity-50")}
          >
            {x.name}
          </div>
        ))}
      </div>
    </DemoFrame>
  );
}
