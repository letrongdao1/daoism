import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "@/data/projects";
import PageHeader from "@/components/layout/PageHeader";

export const metadata: Metadata = { title: "Work" };

export default function ProjectsPage() {
  return (
    <>
      <PageHeader index="01 — Work" title="Selected work" />
      <ol className="shell pb-(--section-y)">
        {projects.map((project, i) => (
          <li key={project.slug} className="border-t border-line">
            <Link
              href={`/projects/${project.slug}`}
              className="grid-editorial items-baseline gap-y-2 py-8 transition-colors hover:text-accent"
            >
              <span className="col-span-1 label text-ink-soft">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="col-span-3 text-title font-medium md:col-span-8">
                {project.title}
              </span>
              <span className="col-span-full label text-ink-soft md:col-span-3 md:text-right">
                {project.year}
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </>
  );
}
