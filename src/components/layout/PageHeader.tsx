import type { ReactNode } from "react";

type PageHeaderProps = {
  /** Small index label above the title, e.g. "02 — Experience". */
  index: string;
  title: ReactNode;
  intro?: ReactNode;
};

/** Opening block shared by the dedicated pages (/about, /projects, …). */
export default function PageHeader({ index, title, intro }: PageHeaderProps) {
  return (
    <header className="shell grid-editorial pt-[calc(var(--nav-h)+clamp(4rem,12vw,10rem))] pb-(--section-y)">
      <p className="col-span-full mb-8 label text-ink-soft">{index}</p>
      <h1 className="col-span-full text-display font-medium">{title}</h1>
      {intro && (
        <div className="col-span-full mt-10 text-lead text-ink-soft md:col-span-6 md:col-start-7">
          {intro}
        </div>
      )}
    </header>
  );
}
