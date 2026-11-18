import Link from "next/link";

export default function NotFound() {
  return (
    <section className="shell flex min-h-svh flex-col justify-end pb-[clamp(2rem,6vw,5rem)]">
      <p className="mb-6 label text-ink-soft">Error 404</p>
      <h1 className="text-display font-medium">
        Not found<span className="text-accent">.</span>
      </h1>
      <Link href="/" className="mt-10 label underline underline-offset-4">
        Back home
      </Link>
    </section>
  );
}
