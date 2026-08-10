'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { Reveal } from '@/components/Reveal';
import { ProcessVisualPanel } from '@/components/ProcessVisual';
import { PROCESS_STEPS, TURNAROUND, OPINION, type ProcessStep } from '@/content/process';
import { DUR, EASE_OUT, lineWipe, ONCE } from '@/lib/motion';
import { useTilt } from '@/lib/useTilt';
import { useCardParticles } from '@/lib/useCardParticles';
import { CardParticles } from '@/components/CardParticles';

function ProcessStepCard({
  step,
  index,
  onEnter,
}: {
  step: ProcessStep;
  index: number;
  onEnter: () => void;
}) {
  const tilt = useTilt();
  const particles = useCardParticles();

  return (
    <motion.div
      id={`process-${index}`}
      ref={tilt.ref}
      onMouseMove={tilt.onMouseMove}
      onMouseEnter={particles.onMouseEnter}
      onMouseLeave={() => {
        tilt.onMouseLeave();
        particles.onMouseLeave();
      }}
      onViewportEnter={onEnter}
      viewport={{ amount: 0.5, margin: '-20% 0px -20% 0px' }}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: DUR.base, ease: EASE_OUT }}
      style={tilt.style}
      className="glass-card grid gap-6 rounded-2xl p-6 md:grid-cols-[1fr_220px] md:p-8"
    >
      <CardParticles particles={particles.particles} />
      <div>
        <p className="font-mono text-label text-amber md:hidden">0{index + 1}</p>
        <h3 className="mt-1 text-lead font-semibold text-ink">{step.title}</h3>
        {step.body.map((p) => (
          <p key={p} className="mt-3 text-small text-ink-3">
            {p}
          </p>
        ))}
      </div>
      <div className="flex min-w-0 items-center justify-center overflow-hidden rounded-xl border border-line bg-bg-2 p-5">
        <ProcessVisualPanel kind={step.visual} />
      </div>
    </motion.div>
  );
}

export function Process() {
  const [active, setActive] = useState(0);

  return (
    <section id="process" className="mx-auto w-full max-w-[1160px] border-t border-line px-6 py-24">
      <h2 className="max-w-[24ch] text-section font-bold text-ink">
        <span className="block overflow-hidden">
          <motion.span
            className="block"
            variants={lineWipe}
            initial="hidden"
            whileInView="visible"
            viewport={ONCE}
          >
            Six things done the same way, every time.
          </motion.span>
        </span>
      </h2>

      <Reveal className="mt-10 grid gap-8 rounded-2xl border border-line bg-surface p-8 sm:grid-cols-3">
        {TURNAROUND.map((stat) => (
          <div key={stat.value}>
            <p className="text-section font-bold text-amber">{stat.value}</p>
            <p className="mt-2 text-small text-ink-3">{stat.label}</p>
          </div>
        ))}
      </Reveal>

      <div className="mt-14 grid gap-10 md:grid-cols-[280px_1fr]">
        <div className="hidden md:sticky md:top-24 md:block md:h-fit">
          <ol className="flex flex-col gap-1">
            {PROCESS_STEPS.map((step, i) => (
              <li key={step.title}>
                <button
                  type="button"
                  onClick={() => {
                    document
                      .getElementById(`process-${i}`)
                      ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }}
                  className="flex w-full items-baseline gap-3 py-2 text-left"
                >
                  <span
                    className={`font-mono text-label ${active === i ? 'text-amber' : 'text-ink-4'}`}
                  >
                    0{i + 1}
                  </span>
                  <span
                    className={`text-small transition-colors duration-fast ${
                      active === i ? 'text-ink' : 'text-ink-4'
                    }`}
                  >
                    {step.title}
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </div>

        <div className="flex flex-col gap-16">
          {PROCESS_STEPS.map((step, i) => (
            <ProcessStepCard key={step.title} step={step} index={i} onEnter={() => setActive(i)} />
          ))}
        </div>
      </div>

      <Reveal className="mt-16 border-t border-line pt-10">
        <p className="max-w-[60ch] text-lead text-ink-2">&ldquo;{OPINION.text}&rdquo;</p>
        <p className="mt-4 font-mono text-label uppercase text-ink-4">
          - {OPINION.attribution}
        </p>
      </Reveal>
    </section>
  );
}
