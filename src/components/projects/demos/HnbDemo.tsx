import { useEffect, useState } from "react";
import { card, cx, useStep } from "./lib";
import { Dot, Img, Line } from "./ui";

function HnbHome() {
  return (
    <div className="space-y-2.5">
      <div className={cx(card, "flex items-center justify-between")}>
        <span className="text-[11px]">12-day streak</span>
        <span className="flex gap-1">
          {Array.from({ length: 7 }, (_, i) => (
            <i
              key={i}
              className={cx(
                "h-2.5 w-2.5 rounded-sm",
                i < 5 ? "bg-ink" : "bg-ink/15",
              )}
            />
          ))}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2.5">
        <div className={card}>
          <div className="mb-2 text-[11px]">Birthdays this month</div>
          {["60%", "45%"].map((w) => (
            <div key={w} className="mb-1.5 flex items-center gap-2">
              <Dot />
              <Line w={w} />
            </div>
          ))}
        </div>
        <div className={card}>
          <div className="mb-2 text-[11px]">Daily memory</div>
          <Img className="h-14" />
        </div>
        <div className={card}>
          <div className="mb-2 text-[11px]">Upcoming event</div>
          <Line w="70%" />
        </div>
        <div className={card}>
          <div className="mb-2 text-[11px]">Today's news</div>
          <Line w="55%" />
        </div>
      </div>
    </div>
  );
}

function HnbNews() {
  return (
    <div className="space-y-2.5">
      <div className={cx(card, "grid grid-cols-[2fr_3fr] gap-3")}>
        <Img className="h-20" />
        <div className="space-y-1.5">
          <div className="text-[11px]">News · 23/09</div>
          <Line />
          <Line w="85%" />
          <Line w="60%" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2.5">
        {["22/07", "21/07"].map((d) => (
          <div key={d} className={card}>
            <Img className="mb-2 h-10" />
            <div className="text-[11px]">News · {d}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function HnbEvents() {
  return (
    <div className="space-y-2">
      {["Graduation party", "Kite festival", "Teambuilding trip"].map(
        (t, i) => (
          <div
            key={t}
            className={cx(
              card,
              "flex items-center justify-between",
              i === 0 && "border-ink/50",
            )}
          >
            <div className="space-y-1.5">
              <div className="text-[11px]">{t}</div>
              <div className="flex gap-1">
                {Array.from({ length: 4 - i }, (_, k) => (
                  <Dot key={k} s="h-3.5 w-3.5" />
                ))}
              </div>
            </div>
            <span className="rounded-full border border-ink/30 px-2 text-[10px]">
              Details
            </span>
          </div>
        ),
      )}
    </div>
  );
}

const paid = [
  { who: "A", amount: 600 },
  { who: "B", amount: 200 },
  { who: "C", amount: 0 },
  { who: "D", amount: 0 },
];
const fairShare = paid.reduce((s, p) => s + p.amount, 0) / paid.length;

function HnbCosts() {
  return (
    <div className="space-y-2">
      <div className={card}>
        <div className="mb-1.5 text-[11px]">Who paid what</div>
        {paid.map((p) => (
          <div
            key={p.who}
            className="flex items-center gap-2 py-0.5 text-[11px]"
          >
            <Dot s="h-3.5 w-3.5" />
            <span className="w-3">{p.who}</span>
            <i
              className="h-1.5 rounded-full bg-ink/70"
              style={{ width: `${p.amount / 10}%` }}
            />
            <span className="ml-auto text-ink/60">{p.amount}k</span>
          </div>
        ))}
      </div>
      <div
        className={cx(
          card,
          "flex flex-wrap items-center justify-between gap-2 text-[11px]",
        )}
      >
        <span>Fair share: {fairShare}k each</span>
        <span className="text-ink/70">
          {paid
            .filter((p) => p.amount < fairShare)
            .map((p) => `${p.who} → A ${fairShare - p.amount}k`)
            .join(" · ")}
        </span>
      </div>
    </div>
  );
}

function HnbGame() {
  const [left, setLeft] = useState(3 * 3600 + 25 * 60 + 9);
  useEffect(() => {
    const id = setInterval(() => setLeft((s) => s - 1), 1000);
    return () => clearInterval(id);
  }, []);
  const hms = [left / 3600, (left % 3600) / 60, left % 60].map((n) =>
    String(Math.floor(n)).padStart(2, "0"),
  );
  return (
    <div className="space-y-2.5">
      <div className="flex justify-center gap-2 text-lg font-bold tabular-nums">
        {hms.map((n, i) => (
          <span key={i} className="rounded border border-ink/20 px-2">
            {n}
          </span>
        ))}
      </div>
      <div className={card}>
        <div className="mb-1.5 text-[11px]">Leaderboard</div>
        {["90%", "70%", "45%"].map((w, i) => (
          <div key={w} className="flex items-center gap-2 py-0.5 text-[11px]">
            <span className="w-3 text-ink/60">{i + 1}</span>
            <Dot s="h-3.5 w-3.5" />
            <Line w={w} />
          </div>
        ))}
      </div>
    </div>
  );
}

function HnbLibrary() {
  return (
    <div>
      <div className="mb-2.5 flex justify-end">
        <span className="rounded border border-ink/40 px-2 text-[10px]">
          Upload
        </span>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {["Trips", "Graduations", "Other"].map((f) => (
          <div key={f} className={cx(card, "text-[11px]")}>
            ▢ {f}
          </div>
        ))}
        {Array.from({ length: 6 }, (_, i) => (
          <Img key={i} className="h-10" />
        ))}
      </div>
    </div>
  );
}

const hnbPages = [
  {
    tab: "Home",
    caption: "Home: streak, birthdays this month, a random memory",
    Page: HnbHome,
  },
  {
    tab: "News",
    caption: "A daily newsletter written by members",
    Page: HnbNews,
  },
  {
    tab: "Events",
    caption: "Events with sign-ups and who is going",
    Page: HnbEvents,
  },
  {
    tab: "Events",
    caption: "Everyone logs what they paid; the app settles it fairly",
    Page: HnbCosts,
  },
  {
    tab: "Game",
    caption: "A daily minigame with a countdown and leaderboard",
    Page: HnbGame,
  },
  {
    tab: "Library",
    caption: "A shared photo and video library",
    Page: HnbLibrary,
  },
];
const hnbTabs = [...new Set(hnbPages.map((p) => p.tab))];

export default function HnbDemo() {
  const [step, setStep] = useStep(hnbPages.length, 3200);
  const { tab, caption, Page } = hnbPages[step];
  return (
    <div>
      <div className="overflow-hidden rounded-3xl border border-ink/20 bg-white text-ink">
        <nav className="flex items-center gap-1 border-b border-ink/10 px-3 py-2 text-[11px]">
          <span className="mr-2 font-bold">▲</span>
          {hnbTabs.map((t) => (
            <button
              key={t}
              onClick={() => setStep(hnbPages.findIndex((p) => p.tab === t))}
              className={cx(
                "rounded-full px-2.5 py-0.5 font-semibold transition-all duration-300 ease-spring",
                t === tab
                  ? "scale-105 bg-ink text-white"
                  : "text-ink/50 hover:text-ink",
              )}
            >
              {t}
            </button>
          ))}
          <Dot s="ml-auto h-4 w-4" />
        </nav>
        <div key={step} className="word-rise h-60 p-3">
          <Page />
        </div>
      </div>
      <p
        key={caption}
        className="word-rise mt-3 text-sm text-ink/70"
        aria-live="polite"
      >
        {caption}
      </p>
    </div>
  );
}
