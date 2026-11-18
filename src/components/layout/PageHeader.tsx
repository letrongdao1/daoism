import type { ReactNode } from "react";

type PageHeaderProps = {
  /** Small index label above the title, e.g. "02 — Experience". */
  index: string;
  /** One string per display line. */
  title: string | string[];
  intro?: ReactNode;
  /** Extra content under the intro, e.g. meta rows on case studies. */
  children?: ReactNode;
};

/**
 * Opening block shared by the dedicated pages. Lines rise with the same
 * CSS intro as the home hero, so it works on first paint and after
 * client-side navigation alike.
 */
export default function PageHeader({
  index,
  title,
  intro,
  children,
}: PageHeaderProps) {
  const lines = Array.isArray(title) ? title : [title];

  return (
    <header className="shell grid-editorial pt-[calc(var(--nav-h)+clamp(4rem,12vw,10rem))] pb-[clamp(4rem,8vw,8rem)]">
      <p className="intro-fade col-span-full mb-8 label text-ink-soft">
        {index}
      </p>
      <h1 className="col-span-full text-display font-medium">
        {lines.map((line, i) => (
          <span key={line} className="block overflow-hidden pb-[0.06em]">
            <span
              className="intro-line"
              style={{ "--i": i } as React.CSSProperties}
            >
              {line}
            </span>
          </span>
        ))}
      </h1>
      {intro && (
        <div className="intro-fade col-span-full mt-10 text-lead text-ink-soft md:col-span-6 md:col-start-7">
          {intro}
        </div>
      )}
      {children && (
        <div className="intro-fade col-span-full mt-16">{children}</div>
      )}
    </header>
  );
}
