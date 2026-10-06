import { box, cx, useStep } from "./lib";
import { DemoFrame } from "./ui";

const kycFrames = [
  { name: "", id: "", dob: "" },
  {
    name: "Nguyen Van A",
    id: "07920100123",
    dob: "",
    idErr: "ID number must be 12 digits",
  },
  {
    name: "Nguyen Van A",
    id: "079201001234",
    dob: "14/05/2010",
    dobErr: "Must be 18 or older",
  },
  { name: "Nguyen Van A", id: "079201001234", dob: "14/05/1998" },
];

function Field({
  label,
  value,
  error,
}: {
  label: string;
  value: string;
  error?: string;
}) {
  const ok = value && !error;
  return (
    <div>
      <div className="mb-1 text-xs text-ink/50">{label}</div>
      <div
        className={cx(
          box,
          "flex h-9 items-center justify-between text-xs tabular-nums",
          !!error && "border-red-500/70 bg-red-500/5",
          !!ok && "border-emerald-600/60",
        )}
      >
        <span>{value}</span>
        {ok && <span className="pop text-emerald-700">✓</span>}
      </div>
      <div key={error} className="word-rise h-4 pt-0.5 text-xs text-red-600">
        {error}
      </div>
    </div>
  );
}

export default function EkycDemo() {
  const [step] = useStep(4);
  const f = kycFrames[step];
  const valid = step === 3;
  return (
    <DemoFrame
      step={step}
      steps={[
        "The customer opens the account form",
        "Checks run while they type: a digit is missing",
        "Onboarding rules apply too: the customer must be an adult",
        "Only clean, valid data goes to onboarding",
      ]}
    >
      <div className="mx-auto max-w-sm space-y-1">
        <Field label="Full name" value={f.name} />
        <Field label="ID number" value={f.id} error={f.idErr} />
        <Field label="Date of birth" value={f.dob} error={f.dobErr} />
        <div
          className={cx(
            "mt-2 rounded-full py-2 text-center text-sm font-bold transition-all duration-500 ease-spring",
            valid
              ? "scale-105 bg-accent text-ink shadow-lg shadow-accent/30"
              : "bg-ink/10 text-ink/40",
          )}
        >
          {valid ? "Open account ✓" : "Open account"}
        </div>
      </div>
    </DemoFrame>
  );
}
