import { profile } from "@/data/profile";
import Placeholder from "@/components/layout/Placeholder";

export default function Home() {
  return (
    <>
      <section className="shell grid-editorial min-h-svh content-end pt-(--nav-h) pb-[clamp(2rem,6vw,5rem)]">
        <p className="col-span-full mb-6 label text-ink-soft">
          {profile.availability}
        </p>
        <h1 className="col-span-full text-display font-medium md:col-span-10">
          {profile.role}
          <span className="text-accent">.</span>
        </h1>
      </section>

      <Placeholder
        label="01 — Selected work"
        note="Pinned horizontal scroll of numbered project cards."
      />
      <Placeholder
        dark
        label="Type moment"
        note="Cyan kinetic marquee collapsing into one word."
      />
      <Placeholder
        label="02 — Experience"
        note="Line-by-line timeline reveal, linking to /experience."
      />
      <Placeholder
        label="03 — About"
        note="Claim line that splits open to show portrait and stack."
      />
      <div id="contact">
        <Placeholder
          dark
          label="04 — Contact"
          note="Large hover links with a self-drawing line."
        />
      </div>
    </>
  );
}
