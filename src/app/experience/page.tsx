import type { Metadata } from "next";
import { timeline } from "@/data/profile";
import PageHeader from "@/components/layout/PageHeader";

export const metadata: Metadata = { title: "Experience" };

export default function ExperiencePage() {
  return (
    <>
      <PageHeader index="02 — Experience" title="Experience" />
      <ol className="shell pb-(--section-y)">
        {timeline.map((item) => (
          <li
            key={item.period + item.role}
            className="grid-editorial gap-y-2 border-t border-line py-8"
          >
            <p className="col-span-full label text-ink-soft md:col-span-3">
              {item.period}
            </p>
            <div className="col-span-full md:col-span-8 md:col-start-5">
              <h2 className="text-lead font-medium">{item.role}</h2>
              <p className="text-ink-soft">{item.place}</p>
            </div>
          </li>
        ))}
      </ol>
    </>
  );
}
