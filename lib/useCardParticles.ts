'use client';

import { useCallback, useRef, useState } from 'react';

export type Particle = {
  id: number;
  /** 0=top, 1=right, 2=bottom, 3=left — which edge it drifts off of. */
  edge: 0 | 1 | 2 | 3;
  /** Position along that edge, 0-1. */
  t: number;
  size: number;
};

let idCounter = 0;

/**
 * A drift of embers off a card's glowing border while the cursor is
 * inside it — not a burst, not from the center. Capped at 2 concurrent,
 * spawns roughly every 700ms, gone in under two seconds. Spawning stops
 * the instant the cursor leaves; anything already in flight just
 * finishes its own fade.
 */
export function useCardParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const spawn = useCallback(() => {
    const id = idCounter++;
    const edge = Math.floor(Math.random() * 4) as 0 | 1 | 2 | 3;
    const t = 0.15 + Math.random() * 0.7;
    const size = 2.5 + Math.random() * 1.5;
    setParticles((p) => [...p.slice(-1), { id, edge, t, size }]);
    setTimeout(() => {
      setParticles((p) => p.filter((particle) => particle.id !== id));
    }, 1700);
  }, []);

  const onMouseEnter = useCallback(() => {
    spawn();
    intervalRef.current = setInterval(spawn, 700);
  }, [spawn]);

  const onMouseLeave = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  return { particles, onMouseEnter, onMouseLeave };
}
