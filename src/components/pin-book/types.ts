import type { ReactNode } from "react";

/** One element pinned to a page by a stick. */
export type PopupSpec = {
  id: string;
  /** Horizontal position on the page, 0–100 (% of page width, as you see the page). */
  x: number;
  /**
   * Depth on the page, 0–100. 0 = far edge (back of the book), 100 = near edge.
   * Deeper elements sit higher on screen and look smaller: that is the parallax.
   */
  y: number;
  /** Stick length in px when the element is standing. */
  stick: number;
  /** One stick in the middle, or two (good for wide cards and boards). */
  sticks?: 1 | 2;
  /** "center" (default) centres the element on its stick; "start" puts the stick at its left edge, like a flag pole. */
  align?: "center" | "start";
  /** Overrides for phones (< 640px); `hidden` drops the pop-up there. */
  mobile?: { x?: number; y?: number; stick?: number; hidden?: boolean };
  children: ReactNode;
};

/** One section of the site = one spread (left page + right page) of the book. */
export type Spread = {
  id: string;
  /** Used for the nav and the folio printed on the left page. */
  label: string;
  /** Free text that floats above the book (not attached to it). */
  copy: ReactNode;
  left?: PopupSpec[];
  right?: PopupSpec[];
  /** Folios printed on the left and right page; default to the label and the page number. */
  folios?: [string, string];
  /** Flat content printed on the paper itself (a trail, a note). Fills the page. */
  print?: { left?: ReactNode; right?: ReactNode };
};
