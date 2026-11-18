import { ViewTransition, type ReactNode } from "react";

/**
 * Wraps a page's content so route changes fade the old page up and out and
 * bring the new one in from below. Lives in each page (not the layout),
 * since layouts persist and would never enter or exit.
 */
export default function PageTransition({ children }: { children: ReactNode }) {
  return (
    <ViewTransition enter="page-enter" exit="page-exit" default="none">
      <div>{children}</div>
    </ViewTransition>
  );
}
