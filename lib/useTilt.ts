'use client';

import { useRef, type MouseEvent } from 'react';
import { useMotionValue, useSpring } from 'motion/react';

const SPRING = { stiffness: 300, damping: 28, mass: 0.5 };

/**
 * Cursor-driven 3D tilt + zoom for card hovers — ported from a reference
 * GSAP implementation (mousemove drives rotationX/rotationY via
 * gsap.quickTo, reset on mouseleave). Rebuilt on Framer Motion springs so
 * it uses the one motion library the rest of the site already depends on.
 *
 * Kept to roughly half the reference's ±7deg — this site's cards should
 * read as responsive, not playful. Drives rotateX/rotateY/scale only, so
 * it composes cleanly with components that already animate y on entrance
 * (Reveal, whileInView) without fighting over the same transform channel.
 */
export function useTilt(strength = 4) {
  const ref = useRef<HTMLDivElement>(null);
  const rawRX = useMotionValue(0);
  const rawRY = useMotionValue(0);
  const rawScale = useMotionValue(1);
  const rotateX = useSpring(rawRX, SPRING);
  const rotateY = useSpring(rawRY, SPRING);
  const scale = useSpring(rawScale, SPRING);

  function onMouseMove(e: MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    rawRY.set(((e.clientX - (r.left + r.width / 2)) / (r.width / 2)) * strength);
    rawRX.set(((e.clientY - (r.top + r.height / 2)) / (r.height / 2)) * -strength);
    rawScale.set(1.015);
  }

  function onMouseLeave() {
    rawRX.set(0);
    rawRY.set(0);
    rawScale.set(1);
  }

  return {
    ref,
    style: { rotateX, rotateY, scale, transformPerspective: 900 },
    onMouseMove,
    onMouseLeave,
  };
}
