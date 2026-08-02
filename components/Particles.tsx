const PARTICLE_COUNT = 22;

/** Deterministic pseudo-random so server and client render identically. */
function seeded(i: number, salt: number) {
  const x = Math.sin(i * 999 + salt) * 10000;
  return x - Math.floor(x);
}

const PARTICLES = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
  left: `${(seeded(i, 1) * 100).toFixed(1)}%`,
  size: 1 + seeded(i, 2) * 2,
  duration: 10 + seeded(i, 3) * 10,
  delay: -seeded(i, 4) * 20,
}));

/**
 * CSS-only floating dots, ported from pgcreativeswi.com's particle-float
 * keyframe. No canvas/WebGL — cheap enough to sit behind the hero without
 * a perf cost, and reduced-motion turns it off entirely (see globals.css).
 */
export function Particles({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ''}`}
    >
      {PARTICLES.map((p, i) => (
        <span
          key={i}
          className="particle absolute bottom-0 rounded-full bg-amber"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            animation: `particle-float ${p.duration}s linear infinite`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
