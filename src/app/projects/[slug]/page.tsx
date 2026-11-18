import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/data/projects";
import PageHeader from "@/components/layout/PageHeader";
import Placeholder from "@/components/layout/Placeholder";

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

export default async function ProjectPage(
  props: PageProps<"/projects/[slug]">,
) {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <>
      <PageHeader
        index={`Case study — ${project.year}`}
        title={project.title}
        intro={project.description}
      />
      <Placeholder
        label="Case study"
        note="Problem, process and outcome, waiting on your content."
      />
    </>
  );
}
