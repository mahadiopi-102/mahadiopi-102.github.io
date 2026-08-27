import type { Variants } from 'motion/react';

/**
 * The whole motion system. Nothing in the codebase defines a duration or
 * an easing inline — cheap sites use a different feel per element, and the
 * entire "premium" difference is picking one family and never deviating.
 *
 * Three speeds, two curves. That is the budget.
 */
export const DUR = { fast: 0.18, base: 0.42, slow: 0.9 } as const;

export const EASE_OUT = [0.16, 1, 0.3, 1] as const;
export const EASE_IN = [0.55, 0, 1, 0.45] as const;

export const STAGGER = 0.045;

/** The one reveal used site-wide. 16px of travel, no scale.
 *  Scale-on-entrance is a 2019 tell; large travel reads like a template. */
export const reveal: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DUR.base, ease: EASE_OUT },
  },
};

/**
 * Column-position variants of `reveal` — 16px of horizontal travel instead
 * of vertical. Spatial consistency is a valid motion purpose on its own
 * (not decoration): a left-column element entering from the left and a
 * right-column element entering from the right shows where each belongs
 * relative to its neighbor. Reserved for genuine two-column layouts (Hero,
 * Services, Contact) — a single centered block forced into a direction
 * would be decoration, not this.
 */
export const revealLeft: Variants = {
  hidden: { opacity: 0, x: -16 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: DUR.base, ease: EASE_OUT },
  },
};
export const revealRight: Variants = {
  hidden: { opacity: 0, x: 16 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: DUR.base, ease: EASE_OUT },
  },
};

/** Container for staggered children. Cap the children at six —
 *  beyond that, animate the container instead. */
export const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: STAGGER } },
};

/** Line-by-line clip wipe. Hero and section headings only.
 *  Pair with an overflow-hidden wrapper per line. */
export const lineWipe: Variants = {
  hidden: { y: '105%' },
  visible: {
    y: '0%',
    transition: { duration: DUR.slow, ease: EASE_OUT },
  },
};

/** Per-word reveal. About section only — splits a statement into words
 *  and walks them in with a short stagger. Words after a threshold index
 *  get a muted colour class in the component; the motion is the same. */
export const wordReveal: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DUR.base, ease: EASE_OUT },
  },
};

export const wordStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.035 } },
};

/** Shared viewport config: nothing on this site animates twice. */
export const ONCE = { once: true, margin: '-12% 0px' } as const;
