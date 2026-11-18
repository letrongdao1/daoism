import type { Metadata } from "next";
import { projects } from "@/data/projects";
import PageHeader from "@/components/layout/PageHeader";
import PageTransition from "@/components/layout/PageTransition";
import ProjectIndex from "@/components/projects/ProjectIndex";

export const metadata: Metadata = { title: "Work" };

export default function ProjectsPage() {
  return (
    <PageTransition>
      <PageHeader
        index={`01 — Work (${String(projects.length).padStart(2, "0")})`}
        title={["Selected", "work"]}
        intro="Internal tools, public onboarding flows and side projects, from the database up to the interface."
      />
      <ProjectIndex />
    </PageTransition>
  );
}
