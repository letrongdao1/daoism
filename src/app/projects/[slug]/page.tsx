import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/data/projects";
import PageHeader from "@/components/layout/PageHeader";
import PageTransition from "@/components/layout/PageTransition";
import TextLink from "@/components/layout/TextLink";
import Parallax from "@/components/motion/Parallax";
import RevealLines from "@/components/motion/RevealLines";
import ProjectCover from "@/components/projects/ProjectCover";
import TechChip from "@/components/tech/TechChip";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata(
  props: PageProps<"/projects/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const project = getProject(slug);
  return project
    ? { title: project.title, description: project.description }
    : {};
}

// placeholder structure until real case-study copy arrives
const chapters = [
  { title: "Problem", body: "What needed solving and for whom." },
  {
    title: "Approach",
    body: "Key decisions, trade-offs and how it was built.",
  },
  { title: "Outcome", body: "What shipped, what changed, what I learned." },
];

export default async function ProjectPage(
  props: PageProps<"/projects/[slug]">,
) {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.indexOf(project);
  const next = projects[(index + 1) % projects.length];

  const meta = [
    { label: "Year", value: project.year },
    {
      label: "Type",
      value: project.isInternal ? "Internal product" : "Public product",
    },
    ...(project.tags?.length
      ? [{ label: "Focus", value: project.tags.join(" · ") }]
      : []),
  ];

  return (
    <PageTransition>
      <PageHeader
        index={`Case study ${String(index + 1).padStart(2, "0")}`}
        title={project.title}
        intro={project.description}
      >
        <dl className="grid gap-6 border-t border-line pt-6 sm:grid-cols-2 md:grid-cols-4">
          {meta.map((item) => (
            <div key={item.label} className="flex flex-col gap-1">
              <dt className="label text-ink-soft">{item.label}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
          {project.href && (
            <div className="flex flex-col gap-1">
              <dt className="label text-ink-soft">Link</dt>
              <dd>
                <a
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                  className="underline decoration-line underline-offset-4 transition-colors hover:text-accent"
                >
                  {new URL(project.href).hostname.replace("www.", "")} ↗
                </a>
              </dd>
            </div>
          )}
        </dl>
      </PageHeader>

      {project.bg && (
        <div className="shell">
          <ProjectCover slug={project.slug}>
            <Parallax
              amount={5}
              className="aspect-16/10 rounded-[clamp(1rem,1.6vw,1.75rem)] bg-paper-dim"
            >
              <Image
                src={project.bg}
                alt={`${project.title} interface`}
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
            </Parallax>
          </ProjectCover>
        </div>
      )}

      <section className="shell grid-editorial gap-y-10 py-(--section-y)">
        <h2 className="col-span-full label text-ink-soft md:col-span-3">
          Stack
        </h2>
        <ul className="col-span-full flex flex-wrap gap-2 md:col-span-9">
          {project.stacks.map((id) => (
            <li key={id}>
              <TechChip id={id} />
            </li>
          ))}
        </ul>
      </section>

      {chapters.map((chapter, i) => (
        <section
          key={chapter.title}
          className="shell grid-editorial gap-y-6 border-t border-line py-(--section-y)"
        >
          <p className="col-span-full label text-accent md:col-span-3">
            {String(i + 1).padStart(2, "0")} — {chapter.title}
          </p>
          <RevealLines className="col-span-full text-title font-medium text-ink-faint md:col-span-9">
            {chapter.body}
          </RevealLines>
        </section>
      ))}

      <nav
        aria-label="Next project"
        className="shell border-t border-line py-(--section-y)"
      >
        <p className="mb-6 label text-ink-soft">Next project</p>
        <Link
          href={`/projects/${next.slug}`}
          className="group flex items-baseline justify-between gap-6"
        >
          <span className="text-display font-medium transition-colors group-hover:text-accent">
            {next.title}
          </span>
          <span
            aria-hidden
            className="text-title transition-transform duration-500 ease-out-expo group-hover:translate-x-2"
          >
            →
          </span>
        </Link>
        <TextLink href="/projects" className="mt-10 inline-block">
          All projects
        </TextLink>
      </nav>
    </PageTransition>
  );
}
