"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type ReactNode,
  type PointerEvent as ReactPointerEvent,
} from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionStyle,
  type MotionValue,
} from "motion/react";
import type { PopupSpec, Spread } from "./types";
import "./pin-book.css";

/* ------------------------------------------------------------------------- */
/*  How it works                                                             */
/*                                                                           */
/*  • The book is a CSS 3D scene: one flat element tilted back with rotateX. */
/*  • Each section is a spread. Between two spreads there is one "leaf": a   */
/*    sheet whose front face is spread k's right page and whose back face is */
/*    spread k+1's left page. Turning the page = rotateY(0 → -180deg) around */
/*    the spine.                                                             */
/*  • Pop-ups live on a page face. Standing = rotated up off the paper so    */
/*    they face the viewer; folded = lying flat on the paper. Because they   */
/*    really sit at different depths, perspective gives the parallax.        */
/*  • Scrolling picks the spread (a tall wrapper + sticky stage), so the     */
/*    page keeps native scroll, keyboard and anchor behaviour.               */
/* ------------------------------------------------------------------------- */

const EASE: [number, number, number, number] = [0.65, 0, 0.35, 1];
/** Seconds between leaves when jumping several pages at once (nav click). */
const STAGGER = 0.14;

export type PinBookProps = {
  spreads: Spread[];
  /** How far the book lies back, in degrees. 55–62 looks right. */
  tilt?: number;
  /** How far each half folds up from the spine, in degrees. */
  fold?: number;
  /** Seconds for one page turn. */
  flipDuration?: number;
  /** Adds scroll-snap points so scrolling settles on a spread. */
  snap?: boolean;
  /** Show the built-in chapter nav. */
  nav?: boolean;
  onSpreadChange?: (index: number) => void;
  className?: string;
};

type NavState = { index: number; from: number };

export function PinBook({
  spreads,
  tilt = 58,
  fold = 7,
  flipDuration = 0.9,
  snap = true,
  nav = true,
  onSpreadChange,
  className,
}: PinBookProps) {
  const n = spreads.length;
  const rootRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion() ?? false;
  const [state, setState] = useState<NavState>({ index: 0, from: 0 });

  /* 1. Scroll position → which spread is open ----------------------------- */
  const { scrollYProgress } = useScroll({
    target: rootRef,
    offset: ["start start", "end end"],
  });
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const i = clamp(Math.round(p * (n - 1)), 0, n - 1);
    setState((cur) => (cur.index === i ? cur : { index: i, from: cur.index }));
  });

  useEffect(() => {
    onSpreadChange?.(state.index);
  }, [state.index, onSpreadChange]);

  /* 2. While leaves are in the air, every pop-up stays folded -------------- */
  // `settled` catches up with `index` once the last leaf has landed.
  const [settled, setSettled] = useState(0);
  const turning = settled !== state.index;
  const steps = Math.abs(state.index - state.from);
  useEffect(() => {
    const ms = reduce ? 0 : (flipDuration + Math.max(0, steps - 1) * STAGGER) * 1000 - 150;
    const t = window.setTimeout(() => setSettled(state.index), ms);
    return () => window.clearTimeout(t);
  }, [state, steps, flipDuration, reduce]);

  /* 3. Pointer parallax: the whole book tilts/yaws a few degrees ---------- */
  const px = useSpring(0, { stiffness: 50, damping: 16 });
  const py = useSpring(0, { stiffness: 50, damping: 16 });
  const rotateX = useTransform(py, (v) => tilt - v * 4);
  const rotateZ = useTransform(px, (v) => v * 3);
  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };

  /* 4. Nav: scroll to a spread (the scroll handler does the turning) ------ */
  const goTo = useCallback(
    (i: number) => {
      const el = rootRef.current;
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY + i * window.innerHeight;
      window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
    },
    [reduce],
  );

  useEffect(() => {
    if (!snap) return;
    const html = document.documentElement;
    const prev = html.style.scrollSnapType;
    html.style.scrollSnapType = "y proximity";
    return () => {
      html.style.scrollSnapType = prev;
    };
  }, [snap]);

  /* 5. Leaves: leaf k = spread k's right page (front) + spread k+1's left page (back) */
  const leaves = useMemo(
    () =>
      spreads.slice(0, -1).map((s, k) => ({
        k,
        front: s.right ?? [],
        back: spreads[k + 1].left ?? [],
        frontFolio: folio(s, k, "right"),
        backFolio: folio(spreads[k + 1], k + 1, "left"),
        frontPrint: s.print?.right,
        backPrint: spreads[k + 1].print?.left,
      })),
    [spreads],
  );

  const { index, from } = state;
  const leafDelay = (k: number) => {
    if (reduce) return 0;
    if (index > from && k >= from && k < index) return (k - from) * STAGGER; // forward
    if (index < from && k >= index && k < from) return (from - 1 - k) * STAGGER; // backward
    return 0;
  };
  const up = !turning;
  const current = spreads[index];
  // Pages that can be seen right now: the open spread, plus any spread a leaf is passing.
  const lo = Math.min(settled, from, index);
  const hi = Math.max(settled, from, index);
  const shown = (s: number) => s === index || (turning && s >= lo && s <= hi);

  return (
    <div
      ref={rootRef}
      className={`pb-root${className ? ` ${className}` : ""}`}
      style={{ height: `${n * 100}vh` }}
    >
      {snap &&
        spreads.map((s, i) => (
          <div key={s.id} id={s.id} className="pb-snap" style={{ top: `${i * 100}vh` }} aria-hidden />
        ))}

      <div
        className="pb-sticky"
        onPointerMove={onPointerMove}
        onPointerLeave={() => {
          px.set(0);
          py.set(0);
        }}
      >
        {nav && (
          <nav className="pb-nav" aria-label="Chapters">
            {spreads.map((s, i) => (
              <button
                key={s.id}
                type="button"
                className="pb-nav__item"
                aria-current={i === index ? "page" : undefined}
                onClick={() => goTo(i)}
              >
                {s.label}
              </button>
            ))}
          </nav>
        )}

        <div className="pb-stage">
          <motion.div className="pb-book" style={{ rotateX, rotateZ, "--pb-fold": `${fold}deg` } as MotionStyle}>
            <div className="pb-shadow" />
            <div className="pb-spine" />

            {/* The pages under all the leaves */}
            <div className="pb-page pb-page--left">
              <div className="pb-cover" />
              <div className="pb-edge" />
              <Face
                side="left"
                popups={spreads[0].left ?? []}
                standing={up && index === 0}
                shown={shown(0)}
                tilt={tilt}
                reduce={reduce}
                folio={folio(spreads[0], 0, "left")}
                print={spreads[0].print?.left}
              />
            </div>
            <div className="pb-page pb-page--right">
              <div className="pb-cover" />
              <div className="pb-edge" />
              <Face
                side="right"
                popups={spreads[n - 1].right ?? []}
                standing={up && index === n - 1}
                shown={shown(n - 1)}
                tilt={tilt}
                reduce={reduce}
                folio={folio(spreads[n - 1], n - 1, "right")}
                print={spreads[n - 1].print?.right}
              />
            </div>

            {leaves.map((l) => (
              <Leaf
                key={l.k}
                k={l.k}
                n={n}
                flipped={l.k < index}
                delay={leafDelay(l.k)}
                duration={flipDuration}
                fold={fold}
                reduce={reduce}
                tilt={tilt}
                front={l.front}
                back={l.back}
                frontStanding={up && index === l.k}
                backStanding={up && index === l.k + 1}
                frontShown={shown(l.k)}
                backShown={shown(l.k + 1)}
                frontFolio={l.frontFolio}
                backFolio={l.backFolio}
                frontPrint={l.frontPrint}
                backPrint={l.backPrint}
              />
            ))}
          </motion.div>
        </div>

        {/* Free text: cross-fades, never attached to the book */}
        <div className="pb-copy">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { duration: 0.45, delay: reduce ? 0 : flipDuration * 0.45 },
              }}
              exit={{ opacity: 0, y: -24, transition: { duration: 0.2 } }}
            >
              {current.copy}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------------- */

type LeafProps = {
  k: number;
  n: number;
  flipped: boolean;
  delay: number;
  duration: number;
  reduce: boolean;
  tilt: number;
  fold: number;
  front: PopupSpec[];
  back: PopupSpec[];
  frontStanding: boolean;
  backStanding: boolean;
  frontShown: boolean;
  backShown: boolean;
  frontFolio: string;
  backFolio: string;
  frontPrint?: ReactNode;
  backPrint?: ReactNode;
};

function Leaf(p: LeafProps) {
  // A leaf rests folded up with its half: -fold on the right, fold-180 on the left.
  const rest = p.flipped ? p.fold - 180 : -p.fold;
  const rot = useMotionValue(rest);

  useEffect(() => {
    if (p.reduce) {
      rot.set(rest);
      return;
    }
    const controls = animate(rot, rest, { duration: p.duration, ease: EASE, delay: p.delay });
    return () => controls.stop();
    // Only re-run when the leaf changes side.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [p.flipped]);

  // Stacking: unturned leaves pile up on the right (lowest k on top), turned
  // ones on the left (highest k on top); a leaf in the air rides above both.
  // Leaves are 2px apart so folded pop-ups (0.6px above their paper) never show through.
  const z = useTransform(rot, [p.fold - 180, -90, -p.fold], [(p.k + 1) * 2, (p.n + 2) * 2, (p.n - p.k) * 2]);
  // A soft shade sweeps across the sheet as it lifts and lands.
  const shade = useTransform(rot, [p.fold - 180, -90, -p.fold], [0, 0.2, 0]);

  return (
    <motion.div className="pb-leaf" style={{ rotateY: rot, z }}>
      <Face
        side="right"
        popups={p.front}
        standing={p.frontStanding}
        shown={p.frontShown}
        tilt={p.tilt}
        reduce={p.reduce}
        folio={p.frontFolio}
        print={p.frontPrint}
        shade={shade}
      />
      <Face
        side="left"
        back
        popups={p.back}
        standing={p.backStanding}
        shown={p.backShown}
        tilt={p.tilt}
        reduce={p.reduce}
        folio={p.backFolio}
        print={p.backPrint}
        shade={shade}
      />
    </motion.div>
  );
}

/* ------------------------------------------------------------------------- */

type FaceProps = {
  side: "left" | "right";
  back?: boolean;
  popups: PopupSpec[];
  standing: boolean;
  /** false = this page is covered; its pop-ups are hidden. */
  shown: boolean;
  tilt: number;
  reduce: boolean;
  folio?: string;
  print?: ReactNode;
  shade?: MotionValue<number>;
};

const PHONE = "(width < 640px)";
function usePhone() {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia(PHONE);
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => window.matchMedia(PHONE).matches,
    () => false,
  );
}

function Face({ side, back, popups: all, standing, shown, tilt, reduce, folio, print, shade }: FaceProps) {
  const phone = usePhone();
  const popups = useMemo(
    () =>
      phone
        ? all.filter((s) => !s.mobile?.hidden).map((s) => ({ ...s, ...s.mobile }))
        : all,
    [all, phone],
  );
  // Rise front-to-back, fold back-to-front.
  const order = useMemo(() => {
    const sorted = [...popups].sort((a, b) => b.y - a.y);
    return new Map(sorted.map((s, i) => [s.id, i]));
  }, [popups]);

  return (
    <div className={`pb-face pb-face--${side}${back ? " pb-face--back" : ""}${shown ? "" : " pb-face--quiet"}`}>
      {print && <div className="pb-print">{print}</div>}
      {folio && <span className={`pb-folio pb-folio--${side}`}>{folio}</span>}
      {shade && <motion.div className="pb-shade" style={{ opacity: shade }} />}
      {popups.map((spec) => (
        <Popup
          key={spec.id}
          spec={spec}
          standing={standing}
          order={order.get(spec.id) ?? 0}
          count={popups.length}
          tilt={tilt}
          reduce={reduce}
        />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------------- */

type PopupProps = {
  spec: PopupSpec;
  standing: boolean;
  order: number;
  count: number;
  tilt: number;
  reduce: boolean;
};

function Popup({ spec, standing, order, count, tilt, reduce }: PopupProps) {
  const isUp = standing || reduce;
  // Standing angle cancels the book's tilt so the element faces the viewer.
  const upPose = { rotateX: -tilt, scale: 1 };
  const downPose = { rotateX: 0, scale: 0.72 };

  const transition = reduce
    ? { duration: 0 }
    : isUp
      ? { type: "spring" as const, stiffness: 260, damping: 18, delay: 0.05 + order * 0.06 }
      : { duration: 0.26, ease: "easeIn" as const, delay: (count - 1 - order) * 0.03 };

  const sway = {
    animationDelay: `${-(hash(spec.id) % 50) / 10}s`,
    animationDuration: `${4 + (hash(spec.id) % 20) / 10}s`,
  } as CSSProperties;

  return (
    <div className="pb-anchor" style={{ left: `${spec.x}%`, top: `${spec.y}%` }}>
      <motion.div
        className={`pb-popup pb-popup--${spec.align ?? "center"}`}
        style={{ x: spec.align === "start" ? -1 : "-50%" }}
        initial={reduce ? upPose : downPose}
        animate={isUp ? upPose : downPose}
        transition={transition}
      >
        <div className="pb-sway" style={sway}>
          <div className="pb-element">{spec.children}</div>
          <motion.div
            className="pb-sticks"
            data-count={spec.sticks ?? 1}
            initial={{ height: reduce ? spec.stick : 0 }}
            animate={{ height: isUp ? spec.stick : 0 }}
            transition={transition}
          >
            <span className="pb-stick" />
            {spec.sticks === 2 && <span className="pb-stick" />}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------------- */

function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v));
}
function folio(s: Spread, i: number, side: "left" | "right") {
  return s.folios?.[side === "left" ? 0 : 1] ?? (side === "left" ? s.label : pad(i));
}
function pad(i: number) {
  return String(i).padStart(2, "0");
}
function hash(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}
