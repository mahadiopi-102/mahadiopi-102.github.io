'use client';

import { motion, useScroll, useSpring } from 'motion/react';

/**
 * Carried over from the vanilla site's #scrub-track/#scrub-fill — the one
 * signature motif that reads as "made by a video editor" rather than a
 * generic progress bar. useSpring smooths raw scroll jitter into something
 * that reads like a scrubbed timeline instead of a stepped meter.
 */
export function Scrubber() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 280,
    damping: 40,
    restDelta: 0.001,
  });

  return (
    <div className="fixed inset-x-0 top-0 z-50 h-px bg-line">
      <motion.div
        className="h-full origin-left bg-amber"
        style={{ scaleX }}
      />
    </div>
  );
}
