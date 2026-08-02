'use client';

import { ArrowUpRightIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { Reveal } from '@/components/Reveal';
import { CountUp } from '@/components/CountUp';
import { PROOF } from '@/content/proof';
import { SITE } from '@/content/site';
import { reveal, ONCE } from '@/lib/motion';
import { useTilt } from '@/lib/useTilt';
import { useCardParticles } from '@/lib/useCardParticles';
import { CardParticles } from '@/components/CardParticles';

export function Proof() {
  const tilt = useTilt();
  const particles = useCardParticles();

  return (
    <section id="proof" className="mx-auto w-full max-w-[1160px] border-t border-line px-6 py-24">
      <Reveal>
        <p className="font-mono text-label uppercase text-ink-4">Proof</p>
        <h2 className="mt-3 max-w-[24ch] text-section font-bold text-ink">
          Numbers from the <span className="gradient-text-animated">Upwork</span> profile, not a pitch deck.
        </h2>
      </Reveal>

      <motion.div
        ref={tilt.ref}
        onMouseMove={tilt.onMouseMove}
        onMouseEnter={particles.onMouseEnter}
        onMouseLeave={() => {
          tilt.onMouseLeave();
          particles.onMouseLeave();
        }}
        variants={reveal}
        initial="hidden"
        whileInView="visible"
        viewport={ONCE}
        style={tilt.style}
        className="glass-card relative mt-14 grid grid-cols-2 gap-8 rounded-2xl p-8 sm:grid-cols-4"
      >
        <CardParticles particles={particles.particles} />
        <div>
          <CountUp
            value={PROOF.hours.value}
            display={PROOF.hours.display}
            className="text-section font-bold text-ink"
          />
          <p className="mt-2 text-small text-ink-3">{PROOF.hours.label}</p>
        </div>
        <div>
          <CountUp value={PROOF.jobSuccess.value} suffix="%" className="text-section font-bold text-ink" />
          <p className="mt-2 text-small text-ink-3">{PROOF.jobSuccess.label}</p>
        </div>
        <div>
          <CountUp
            value={PROOF.projects.value}
            display={PROOF.projects.display}
            className="text-section font-bold text-ink"
          />
          <p className="mt-2 text-small text-ink-3">{PROOF.projects.label}</p>
        </div>
        <div>
          <p className="text-section font-bold text-ink">{PROOF.earned.display}</p>
          <p className="mt-2 text-small text-ink-3">{PROOF.earned.label}</p>
        </div>
      </motion.div>

      <Reveal className="mt-6 flex flex-wrap items-center gap-3 text-small text-ink-3">
        {PROOF.topRated && (
          <span className="glow-breathe rounded-full border border-amber/40 bg-amber-dim px-2.5 py-1 font-mono text-label uppercase text-amber">
            Top Rated
          </span>
        )}
        <a
          href={SITE.upwork}
          target="_blank"
          rel="noopener noreferrer"
          className="glow-breathe inline-flex items-center gap-1.5 rounded-full border border-amber/40 bg-amber-dim px-3.5 py-1.5 text-ink-2 transition-colors duration-fast hover:border-amber hover:text-ink"
        >
          View verified profile on Upwork
          <ArrowUpRightIcon className="size-3.5" />
        </a>
      </Reveal>
    </section>
  );
}
