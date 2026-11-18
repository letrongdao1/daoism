import Link from "next/link";
import Lottie from "@/components/motion/Lottie";

export default function NotFound() {
  return (
    <section className="relative shell flex min-h-svh flex-col justify-end pb-[clamp(2rem,6vw,5rem)]">
      <Lottie
        src="/lottie/scribble-on-light.json"
        className="absolute top-1/2 right-(--gutter) size-[clamp(14rem,40vw,34rem)] -translate-y-1/2 opacity-70"
      />
      <p className="relative mb-6 label text-ink-soft">Error 404</p>
      <h1 className="relative text-display font-medium">
        Not found<span className="text-accent">.</span>
      </h1>
      <Link
        href="/"
        className="relative mt-10 label underline decoration-line underline-offset-4 transition-colors hover:text-accent-ink"
      >
        Back home
      </Link>
    </section>
  );
}
