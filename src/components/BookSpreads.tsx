import Image, { type StaticImageData } from "next/image";
import type { ReactNode } from "react";
import type { Spread } from "./pin-book";
import TechChip from "./TechChip";
import type { TechId } from "@/data/techs";
import { contactLinks, profile } from "@/data/profile";
import { projects } from "@/data/projects";
import portrait from "../assets/images/portrait.png";
import sun from "../assets/pin-book/sun.svg";
import cloud from "../assets/pin-book/cloud.svg";
import mug from "../assets/pin-book/mug.svg";
import plant from "../assets/pin-book/plant.svg";
import laptop from "../assets/pin-book/laptop.svg";
import pennantMint from "../assets/pin-book/pennant-mint.svg";
import pennantSky from "../assets/pin-book/pennant-sky.svg";
import pennantCoral from "../assets/pin-book/pennant-coral.svg";
import pennantLilac from "../assets/pin-book/pennant-lilac.svg";
import envelope from "../assets/pin-book/envelope.svg";
import clock from "../assets/pin-book/clock.svg";
import chest from "../assets/pin-book/chest.svg";
import paperPlane from "../assets/pin-book/paper-plane.svg";

const external = { target: "_blank", rel: "noreferrer" } as const;

function Kicker({ children, muted }: { children: ReactNode; muted?: boolean }) {
  return (
    <p
      className={`font-mono text-xs font-medium tracking-[0.08em] uppercase ${muted ? "text-ink-soft" : "text-accent"}`}
    >
      {children}
    </p>
  );
}

function Heading({ children }: { children: ReactNode }) {
  return (
    <h2 className="mt-5 font-title text-[clamp(40px,4.7vw,68px)] leading-none tracking-[-0.015em] text-ink">
      {children}
    </h2>
  );
}

function Body({ children }: { children: ReactNode }) {
  return (
    <p className="mt-[18px] max-w-[540px] text-[15px] leading-normal text-ink-soft">
      {children}
    </p>
  );
}

function Status() {
  return (
    <p className="flex items-center gap-2 text-[13px] leading-[1.45] text-ink-soft">
      <span className="size-2 rounded-full bg-mint" />
      {profile.availability} · GMT+7
    </p>
  );
}

function Art({ src }: { src: StaticImageData }) {
  return <Image src={src} alt="" draggable={false} />;
}

function Chip({
  children,
  className,
  href,
}: {
  children: ReactNode;
  className: string;
  href?: string;
}) {
  const cls = `block rounded-full px-4 py-[9px] text-sm font-medium whitespace-nowrap text-ink shadow-pop ${className}`;
  return href ? (
    <a href={href} className={cls} {...external}>
      {children}
    </a>
  ) : (
    <span className={cls}>{children}</span>
  );
}

function ProjectCard({ index }: { index: number }) {
  const p = projects[index];
  const no = String(index + 1).padStart(2, "0");
  return (
    <article className="w-[264px] overflow-hidden rounded-[18px] bg-white shadow-pop">
      <div className="flex flex-col gap-2 p-[18px]">
        <p className="flex justify-between font-mono text-xs font-medium tracking-[0.08em] text-ink-soft uppercase">
          <span>{no}</span>
          <span>{p.year}</span>
        </p>
        <h3 className="font-title text-[23px] leading-[1.12] text-ink">
          {p.title}
        </h3>
        <p className="text-[13px] leading-[1.45] text-ink-soft max-sm:line-clamp-4">
          {p.description}
        </p>
        <ul className="flex flex-wrap gap-1.5">
          {p.stacks.map((id) => (
            <li key={id}>
              <TechChip id={id} className={`text-[11px] ${techColor}`} />
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

function Flag(p: {
  period: string;
  pennant: StaticImageData;
  title: string;
  place: string;
  meta: ReactNode;
  detail?: string;
}) {
  return (
    <div className="relative pt-[18px]">
      <span className="absolute top-1.5 bottom-0 left-0 w-0.5 bg-ink-soft" />
      <span className="absolute top-0 left-[-3.5px] size-[9px] rounded-full bg-ink-soft" />
      <div className="relative ml-0.5 h-14 w-[150px] drop-shadow-[0_6px_8px_rgba(33,31,26,0.1)]">
        <Image src={p.pennant} alt="" className="absolute inset-0" />
        <span className="absolute top-3 left-4 font-title text-2xl leading-[1.12] text-ink">
          {p.period}
        </span>
      </div>
      <div className="mt-[18px] ml-[18px] flex w-[250px] flex-col gap-1.5 pb-2">
        <h3 className="font-title text-[26px] leading-[1.12] text-ink">
          {p.title}
        </h3>
        <p className="text-[13px] leading-[1.45] text-ink">{p.place}</p>
        <p className="flex items-center gap-1.5 font-mono text-xs font-medium tracking-[0.08em] text-ink-soft uppercase">
          {p.meta}
        </p>
        {p.detail && (
          <p className="mt-0.5 text-[13px] leading-[1.45] text-ink-soft">
            {p.detail}
          </p>
        )}
      </div>
    </div>
  );
}

const pill = "rounded-full px-4 py-[9px] text-sm font-medium whitespace-nowrap";

const techColor = "border-black/15 bg-white text-black";

function Board(p: { label: string; dot: string; items: TechId[] }) {
  return (
    <div className="flex max-w-[632px] flex-col gap-2.5 rounded-[18px] bg-white px-4 pt-3.5 pb-4 shadow-pop">
      <p className="flex items-center gap-2 font-mono text-xs font-medium tracking-[0.08em] uppercase">
        <span className={`size-[9px] rounded-full ${p.dot}`} />
        <span className="text-ink">{p.label}</span>
        <span className="text-ink-soft">
          {String(p.items.length).padStart(2, "0")}
        </span>
      </p>
      <ul className="flex flex-wrap gap-2">
        {p.items.map((id) => (
          <li key={id}>
            <TechChip id={id} className={`${pill} ${techColor}`} />
          </li>
        ))}
      </ul>
    </div>
  );
}

// phones get the big pop-ups as a swipeable row under the copy instead
const hidden = { hidden: true };

function Rail({ children }: { children: ReactNode }) {
  return (
    <div className="-mx-5 mt-6 flex snap-x snap-mandatory scroll-px-5 [scrollbar-width:none] gap-3 overflow-x-auto px-5 pt-1 pb-5 *:shrink-0 *:snap-start sm:hidden">
      {children}
    </div>
  );
}

const flags = {
  bachelor: (
    <Flag
      period="2021 – 25"
      pennant={pennantMint}
      title="Bachelor of Software Engineering"
      place="FPT University, Ho Chi Minh City"
      meta="GPA 3.14 / 4.0"
    />
  ),
  intern: (
    <Flag
      period="2023 – 25"
      pennant={pennantSky}
      title="Frontend Developer Intern"
      place="Sunshine Software · Digital Era JSC"
      meta="Mar – Apr 2025 · Sep – Dec 2023"
      detail="Worked with senior engineers to ship product updates and fix UI/UX issues, making products easier to use, more responsive and more consistent."
    />
  ),
  ocbs: (
    <Flag
      period="2025 – 26"
      pennant={pennantCoral}
      title="Software Engineer"
      place="OCBS Securities Joint Stock Company"
      meta="May 2025 – Jul 2026"
      detail="Built and maintained the internal MIS, the eKYC account-opening flow and the shareholder meeting portal across React, ASP.NET and SQL Server."
    />
  ),
  master: (
    <Flag
      period="2026 →"
      pennant={pennantLilac}
      title="Master of Information Technology"
      place="University of Information Technology, VNU-HCM"
      meta={
        <>
          <span className="size-[7px] rounded-full bg-mint" />
          In progress
        </>
      }
    />
  ),
};

const boards = {
  frontend: (
    <Board
      label="Frontend"
      dot="bg-coral"
      items={[
        "typescript",
        "javascript",
        "react",
        "nextjs",
        "vite",
        "redux",
        "zustand",
        "reactQuery",
        "tailwind",
        "motion",
        "gsap",
      ]}
    />
  ),
  backend: (
    <Board
      label="Backend"
      dot="bg-sky"
      items={[
        "java",
        "csharp",
        "nodejs",
        "express",
        "nestjs",
        "aspnet",
        "spring",
      ]}
    />
  ),
  databases: (
    <Board
      label="Databases"
      dot="bg-mint"
      items={["mysql", "sqlserver", "postgresql", "supabase", "redis"]}
    />
  ),
  ship: (
    <Board
      label="Ship it"
      dot="bg-lilac"
      items={["vercel", "cloudflare", "aws", "claudeCode"]}
    />
  ),
};

// the trail spans both pages: 0–100 is the left page, 100–200 the right one
function Trail({ page }: { page: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 200 100"
      preserveAspectRatio="none"
      className={`absolute top-0 h-full w-[200%] ${page === "left" ? "left-0" : "-left-full"}`}
    >
      <path
        d="M12 69 C37 69 37 32 62 32 S87 78 112 78 S137 29 162 29 S178 34 183 34"
        fill="none"
        stroke="var(--color-accent)"
        strokeWidth="2"
        strokeDasharray="2 6"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

function Printed({
  children,
  x,
  y,
  className,
}: {
  children: ReactNode;
  x: number;
  y: number;
  className: string;
}) {
  return (
    <span
      className={`absolute font-hand text-2xl leading-none font-bold whitespace-nowrap max-sm:hidden ${className}`}
      style={{ left: `${x}%`, top: `${y}%` }}
    >
      {children}
    </span>
  );
}

export const spreads: Spread[] = [
  {
    id: "cover",
    label: "Cover",
    folios: ["Cover", "00"],
    copy: (
      <>
        <Kicker muted>A pop-up portfolio · Vol. 2026</Kicker>
        <h1 className="mt-[22px] font-title text-[clamp(56px,9.4vw,136px)] leading-[0.92] tracking-[-0.03em] whitespace-nowrap text-ink">
          {profile.name}
        </h1>
        <p className="mt-1.5 font-title text-[clamp(28px,3.2vw,46px)] leading-[1.05] tracking-[-0.01em] text-ink italic">
          builds web pages that <span className="text-accent">pop up</span>.
        </p>
        <p className="mt-[22px] max-w-[520px] text-lg leading-[1.55] text-ink-soft max-sm:text-base">
          Frontend / full-stack software engineer in Ho Chi Minh City. A
          software engineer, a teammate, a colleague, a friend. Turn the page to
          see what&apos;s inside.
        </p>
        <div className="mt-8 flex flex-wrap gap-3 text-sm font-medium">
          <a
            href="#about"
            className="rounded-full bg-ink px-6 py-3.5 whitespace-pre text-white"
          >
            {"Open the book  →"}
          </a>
          <a
            href={profile.cv}
            className="rounded-full border border-ink px-6 py-3.5 text-ink"
            {...external}
          >
            Download CV
          </a>
        </div>
        <div className="mt-[22px]">
          <Status />
        </div>
      </>
    ),
    left: [
      { id: "mug", x: 44, y: 68, stick: 105, children: <Art src={mug} /> },
      {
        id: "bubble",
        x: 84,
        y: 41,
        stick: 125,
        children: (
          <span className="block rounded-[20px] bg-lilac px-[18px] pt-2 pb-2.5 font-hand text-[26px] leading-none font-bold whitespace-nowrap text-ink shadow-pop">
            hi, I&apos;m Dao!
          </span>
        ),
      },
    ],
    right: [
      {
        id: "sun",
        x: 67,
        y: 13,
        stick: 457,
        mobile: { stick: 280 },
        children: <Art src={sun} />,
      },
      {
        id: "cloud",
        x: 35,
        y: 18,
        stick: 437,
        mobile: { stick: 250 },
        children: <Art src={cloud} />,
      },
      { id: "plant", x: 84, y: 64, stick: 97, children: <Art src={plant} /> },
      {
        id: "laptop",
        x: 53,
        y: 79,
        stick: 198,
        sticks: 2,
        children: <Art src={laptop} />,
      },
    ],
  },
  {
    id: "about",
    label: "About",
    folios: ["Chapter 01", "01"],
    copy: (
      <>
        <Kicker>Chapter 01 — About me</Kicker>
        <Heading>
          Frontend engineer,
          <br />
          <em>full-stack oriented.</em>
        </Heading>
        <Body>
          I am a frontend engineer with about{" "}
          <strong className="font-semibold text-ink">
            {profile.experience}
          </strong>{" "}
          of experience building web applications. I craft clean, responsive
          interfaces with React using both Vite and Next.js, and I keep
          production systems reliable for the people who depend on them every
          day.
        </Body>
        <p className="mt-3.5 max-w-[540px] text-[15px] leading-normal text-ink-soft max-lg:hidden">
          I also work on the backend, building APIs with Node.js and ASP.NET on
          SQL databases, with a solid foundation in Java and the Spring
          Framework. So I can carry a feature on my own, from what users see to
          what keeps them satisfied behind the scenes.
        </p>
        <a
          href={profile.cv}
          className="mt-6 inline-block text-sm font-medium whitespace-pre text-ink underline"
          {...external}
        >
          {"Download my CV  ↗"}
        </a>
      </>
    ),
    left: [
      {
        id: "ai-note",
        x: 72,
        y: 74,
        stick: 117,
        children: (
          <p className="rounded bg-coral-tint px-[18px] pt-3 pb-3.5 font-hand text-[21px] leading-[1.1] font-bold whitespace-nowrap text-ink shadow-pop">
            Claude Code speeds me up —
            <br />I still review every change myself.
          </p>
        ),
      },
      {
        id: "aspnet",
        x: 97,
        y: 84,
        stick: 227,
        children: (
          <TechChip id="aspnet" className={`${pill} ${techColor} shadow-pop`} />
        ),
      },
    ],
    right: [
      {
        id: "react",
        x: 9,
        y: 32,
        stick: 415,
        mobile: { x: -62, stick: 300 },
        children: (
          <TechChip id="react" className={`${pill} ${techColor} shadow-pop`} />
        ),
      },
      {
        id: "portrait",
        x: 47,
        y: 66,
        stick: 372,
        mobile: { stick: 250 },
        sticks: 2,
        children: (
          <figure className="flex flex-col gap-2.5 rounded-md bg-white px-3 pt-3 pb-3.5 shadow-pop">
            <Image
              src={portrait}
              alt={profile.name}
              className="h-[228px] w-[216px] rounded-[3px] bg-lilac-tint object-cover"
            />
            <figcaption className="font-hand text-[22px] leading-none font-bold text-ink-soft">
              that&apos;s me — Dao
            </figcaption>
          </figure>
        ),
      },
      {
        id: "years",
        x: 85,
        y: 16,
        stick: 457,
        mobile: hidden,
        children: (
          <div className="flex size-[132px] flex-col items-center justify-center rounded-full bg-sun text-ink shadow-pop">
            <span className="font-title text-[52px] leading-[1.05] tracking-[-0.01em]">
              ~2
            </span>
            <span className="text-center text-[11px] leading-[1.2]">
              years shipping
              <br />
              for the web
            </span>
          </div>
        ),
      },
      {
        id: "nextjs",
        x: 73,
        y: 36,
        stick: 399,
        mobile: { x: -30, stick: 360 },
        children: (
          <TechChip id="nextjs" className={`${pill} ${techColor} shadow-pop`} />
        ),
      },
      {
        id: "nodejs",
        x: 21,
        y: 72,
        stick: 253,
        mobile: { x: 30, stick: 160 },
        children: (
          <TechChip id="nodejs" className={`${pill} ${techColor} shadow-pop`} />
        ),
      },
      {
        id: "java",
        x: 46,
        y: 92,
        stick: 217,
        children: (
          <span className="flex gap-2">
            <TechChip id="java" className={`${pill} ${techColor} shadow-pop`} />
            <TechChip
              id="spring"
              className={`${pill} ${techColor} shadow-pop`}
            />
          </span>
        ),
      },
    ],
  },
  {
    id: "work",
    label: "Work",
    folios: ["Chapter 02", "02"],
    copy: (
      <>
        <Kicker>Chapter 02 — Selected work</Kicker>
        <Heading>
          Things I&apos;ve <em>built.</em>
        </Heading>
        <Body>
          Projects (05) — from enterprise tools at OCBS Securities to a
          community app I run on my own.
        </Body>
        <Rail>
          {projects.map((p, i) => (
            <ProjectCard key={p.title} index={i} />
          ))}
        </Rail>
      </>
    ),
    left: [
      {
        id: "shareholder",
        x: 24,
        y: 79,
        stick: 148,
        sticks: 2,
        mobile: hidden,
        children: <ProjectCard index={0} />,
      },
      {
        id: "ekyc",
        x: 80,
        y: 85,
        stick: 172,
        sticks: 2,
        mobile: hidden,
        children: <ProjectCard index={1} />,
      },
    ],
    right: [
      {
        id: "hnb-hub",
        x: 26,
        y: 18,
        stick: 354,
        sticks: 2,
        mobile: hidden,
        children: <ProjectCard index={3} />,
      },
      {
        id: "portfolio",
        x: 76,
        y: 19,
        stick: 390,
        sticks: 2,
        mobile: hidden,
        children: <ProjectCard index={4} />,
      },
      {
        id: "mis",
        x: 36,
        y: 84,
        stick: 151,
        sticks: 2,
        mobile: hidden,
        children: <ProjectCard index={2} />,
      },
    ],
  },
  {
    id: "journey",
    label: "Journey",
    folios: ["Chapter 03", "03"],
    copy: (
      <>
        <Kicker>Chapter 03 — Experience</Kicker>
        <Heading>
          Where I&apos;ve <em>been.</em>
        </Heading>
        <Rail>
          {flags.bachelor}
          {flags.intern}
          {flags.ocbs}
          {flags.master}
        </Rail>
      </>
    ),
    left: [
      {
        id: "bachelor",
        x: 12,
        y: 69,
        stick: 311,
        align: "start",
        mobile: hidden,
        children: flags.bachelor,
      },
      {
        id: "intern",
        x: 62,
        y: 32,
        stick: 221,
        align: "start",
        mobile: hidden,
        children: flags.intern,
      },
    ],
    right: [
      {
        id: "ocbs",
        x: 12,
        y: 78,
        stick: 267,
        align: "start",
        mobile: hidden,
        children: flags.ocbs,
      },
      {
        id: "master",
        x: 62,
        y: 29,
        stick: 259,
        align: "start",
        mobile: hidden,
        children: flags.master,
      },
    ],
    print: {
      left: <Trail page="left" />,
      right: (
        <>
          <Trail page="right" />
          <span className="absolute top-[34%] left-[83%] size-2.5 -translate-1/2 rounded-full bg-accent" />
          <Printed x={67} y={44} className="text-accent">
            follow the trail →
          </Printed>
        </>
      ),
    },
  },
  {
    id: "stack",
    label: "Stack",
    folios: ["Chapter 04", "04"],
    copy: (
      <>
        <Kicker>Chapter 04 — Stack</Kicker>
        <Heading>
          Tools I reach for,
          <br />
          <em>front to back.</em>
        </Heading>
        <Body>
          Frontend stands at the front, backend behind it, then databases and
          the tooling that ships it.
        </Body>
        <Rail>
          {Object.entries(boards).map(([id, board]) => (
            <div key={id} className="w-[min(300px,80vw)]">
              {board}
            </div>
          ))}
        </Rail>
      </>
    ),
    left: [
      {
        id: "backend",
        x: 57,
        y: 57,
        stick: 259,
        sticks: 2,
        mobile: hidden,
        children: boards.backend,
      },
    ],
    right: [
      {
        id: "ship",
        x: 51,
        y: 18,
        stick: 479,
        sticks: 2,
        mobile: hidden,
        children: boards.ship,
      },
      {
        id: "databases",
        x: 20,
        y: 36,
        stick: 376,
        sticks: 2,
        mobile: hidden,
        children: boards.databases,
      },
      {
        id: "frontend",
        x: 45,
        y: 82,
        stick: 155,
        sticks: 2,
        mobile: hidden,
        children: boards.frontend,
      },
    ],
  },
  {
    id: "contact",
    label: "Contact",
    folios: ["Chapter 05", "© 2026"],
    copy: (
      <>
        <Kicker>Chapter 05 — Get in touch</Kicker>
        <Heading>
          Every opportunity is
          <br className="max-sm:hidden" /> a <em>hidden treasure.</em>
        </Heading>
        <a
          href={contactLinks.email.href}
          className="mt-7 inline-block font-title text-[clamp(24px,2.8vw,40px)] leading-[1.05] tracking-[-0.01em] text-ink underline decoration-1 underline-offset-4"
        >
          {profile.contacts.email}
        </a>
        <div className="mt-[18px]">
          <Status />
        </div>
        <div className="mt-[22px] flex gap-[22px] text-sm font-medium whitespace-pre text-ink underline">
          <a href={contactLinks.github.href} {...external}>
            {"GitHub  ↗"}
          </a>
          <a href={contactLinks.linkedin.href} {...external}>
            {"LinkedIn  ↗"}
          </a>
          <a href={profile.cv} {...external}>
            {"Download CV  ↓"}
          </a>
        </div>
      </>
    ),
    left: [
      { id: "clock", x: 60, y: 74, stick: 123, children: <Art src={clock} /> },
      {
        id: "plane",
        x: 83,
        y: 27,
        stick: 325,
        children: <Art src={paperPlane} />,
      },
    ],
    right: [
      {
        id: "envelope",
        x: 25,
        y: 23,
        stick: 449,
        children: (
          <a href={contactLinks.email.href} aria-label="Email me">
            <Art src={envelope} />
          </a>
        ),
      },
      {
        id: "github",
        x: 76,
        y: 17,
        stick: 541,
        children: (
          <Chip className="bg-lilac" href={contactLinks.github.href}>
            GitHub ↗
          </Chip>
        ),
      },
      {
        id: "linkedin",
        x: 88,
        y: 58,
        stick: 337,
        children: (
          <Chip className="bg-sky" href={contactLinks.linkedin.href}>
            LinkedIn ↗
          </Chip>
        ),
      },
      {
        id: "chest",
        x: 49,
        y: 80,
        stick: 208,
        sticks: 2,
        children: <Art src={chest} />,
      },
    ],
    print: {
      left: (
        <Printed x={69} y={44} className="text-ink-faint">
          the end — for now
        </Printed>
      ),
    },
  },
];
