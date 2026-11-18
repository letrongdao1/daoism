import { ViewTransition, type ReactNode } from "react";

/**
 * Names a project's cover frame so it morphs between the home work card
 * and the case study page during navigation.
 */
export default function ProjectCover({
  slug,
  children,
}: {
  slug: string;
  children: ReactNode;
}) {
  return (
    <ViewTransition name={`cover-${slug}`} share="cover-morph" default="none">
      {children}
    </ViewTransition>
  );
}
