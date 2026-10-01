"use client";

import { useState } from "react";
import type { Project } from "../../data/projects";
import ProjectDemo from "./demos";
import TechChip from "../TechChip";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  // keep the last project rendered while the close animation plays
  const [shown, setShown] = useState(project);
  if (project && project !== shown) setShown(project);

  return (
    <Dialog open={!!project} onOpenChange={(open) => !open && onClose()}>
      {shown && (
        <DialogContent className="max-h-[calc(100dvh-2rem)] w-[min(56rem,calc(100vw-2rem))] max-w-none gap-0 overflow-y-auto rounded-2xl bg-paper p-6 text-ink sm:max-w-none md:p-10">
          <DialogHeader className="gap-1 pr-8">
            <span className="font-display text-sm text-ink/50">{shown.year}</span>
            <DialogTitle className="font-display text-3xl font-medium md:text-4xl">
              {shown.title}
            </DialogTitle>
          </DialogHeader>

          <DialogDescription className="mt-4 max-w-2xl text-sm text-ink/70 md:text-base">
            {shown.description}
          </DialogDescription>

          {shown.isDemoIncluded && <ProjectDemo title={shown.title} />}

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {shown.stacks.map((tag) => (
                <TechChip
                  key={tag}
                  id={tag}
                  className="rounded-full border-ink/10 px-3 py-1 text-xs text-ink/60"
                />
              ))}
            </div>
            {shown.href && (
              <Button
                asChild
                variant="link"
                className="h-auto p-0 text-xs tracking-[0.3em] text-ink/80 underline hover:text-accent"
              >
                <a href={shown.href} target="_blank" rel="noreferrer">
                  {shown.href}
                </a>
              </Button>
            )}
          </div>
        </DialogContent>
      )}
    </Dialog>
  );
}
