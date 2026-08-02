'use client';

import { AnimatePresence, motion } from 'motion/react';
import type { Particle } from '@/lib/useCardParticles';

/** left/top position on the border, and the outward drift direction. */
function edgeGeometry(edge: Particle['edge'], t: number) {
  switch (edge) {
    case 0:
      return { left: `${t * 100}%`, top: '0%', dx: 0, dy: -1 };
    case 1:
      return { left: '100%', top: `${t * 100}%`, dx: 1, dy: 0 };
    case 2:
      return { left: `${t * 100}%`, top: '100%', dx: 0, dy: 1 };
    case 3:
      return { left: '0%', top: `${t * 100}%`, dx: -1, dy: 0 };
  }
}

/**
 * Renders inside a card with `overflow-hidden` already set (glass-card and
 * WorkCard both have it). Particles start right at the border — where the
 * glow already is — and drift only a few px further outward, fully faded
 * well before they'd reach the clip boundary.
 */
export function CardParticles({ particles }: { particles: Particle[] }) {
  return (
    <div className="pointer-events-none absolute inset-0 z-10" aria-hidden>
      <AnimatePresence>
        {particles.map((p) => {
          const g = edgeGeometry(p.edge, p.t);
          return (
            <motion.span
              key={p.id}
              className="absolute rounded-full bg-amber shadow-[0_0_6px_1px_var(--amber)]"
              style={{ width: p.size, height: p.size, left: g.left, top: g.top }}
              initial={{ opacity: 0, x: 0, y: 0 }}
              animate={{
                opacity: [0, 0.9, 0],
                x: g.dx * 16,
                y: g.dy * 16,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.6, ease: 'easeOut', times: [0, 0.35, 1] }}
            />
          );
        })}
      </AnimatePresence>
    </div>
  );
}
