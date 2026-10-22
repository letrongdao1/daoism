import { PinBook } from "../components/pin-book";
import { spreads } from "../components/BookSpreads";
import { profile } from "@/data/profile";

export default function Home() {
  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-[max(0px,calc((100svh_-_1800px)/2))] z-10 mx-auto flex max-w-[3200px] items-center justify-between px-14 pt-7 max-lg:hidden">
        <a
          href="#cover"
          className="pointer-events-auto font-title text-[30px] leading-[1.12] text-ink italic"
        >
          daoism
        </a>
        <a
          href={profile.cv}
          target="_blank"
          rel="noreferrer"
          className="pointer-events-auto rounded-full border border-ink px-[18px] py-2.5 text-sm font-medium whitespace-pre text-ink"
        >
          {"Download CV  ↓"}
        </a>
      </header>
      <main>
        <PinBook spreads={spreads} />
      </main>
    </>
  );
}
