type PlaceholderProps = {
  label: string;
  note?: string;
  dark?: boolean;
};

/** Temporary block marking where a v2 section will be built. */
export default function Placeholder({ label, note, dark }: PlaceholderProps) {
  return (
    <section
      data-theme={dark ? "dark" : undefined}
      className="border-t border-line"
    >
      <div className="shell flex min-h-[70svh] flex-col justify-between py-(--section-y)">
        <p className="label text-accent">{label}</p>
        {note && <p className="max-w-xl text-lead opacity-60">{note}</p>}
      </div>
    </section>
  );
}
