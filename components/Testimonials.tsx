'use client';

import Image from 'next/image';
import { StarIcon, ArrowUpRightIcon } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { stagger, reveal } from '@/lib/motion';
import { motion } from 'motion/react';
import { TESTIMONIALS, type Testimonial } from '@/content/testimonials';
import { SITE } from '@/content/site';
import { useTilt } from '@/lib/useTilt';
import { useCardParticles } from '@/lib/useCardParticles';
import { CardParticles } from '@/components/CardParticles';

function TestimonialCard({ t }: { t: Testimonial }) {
  const tilt = useTilt();
  const particles = useCardParticles();

  return (
    <motion.div
      ref={tilt.ref}
      onMouseMove={tilt.onMouseMove}
      onMouseEnter={particles.onMouseEnter}
      onMouseLeave={() => {
        tilt.onMouseLeave();
        particles.onMouseLeave();
      }}
      variants={reveal}
      style={tilt.style}
      className="glass-card flex w-[300px] shrink-0 flex-col rounded-xl p-6 snap-start"
    >
      <CardParticles particles={particles.particles} />
      <div className="flex items-center gap-0.5">
        {Array.from({ length: t.rating }).map((_, i) => (
          <StarIcon key={i} className="size-3.5 fill-amber text-amber" />
        ))}
      </div>

      {t.comment ? (
        <p className="mt-4 flex-1 text-small text-ink-2">
          &ldquo;{t.comment}
          {t.truncated ? '…' : ''}&rdquo;
        </p>
      ) : (
        <p className="mt-4 flex-1 text-small text-ink-4">No written review left.</p>
      )}

      <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
        <div>
          <p className="text-small font-medium text-ink">{t.author}</p>
          <p className="mt-0.5 text-label text-ink-4">{t.job}</p>
        </div>
        <a
          href={t.screenshot}
          target="_blank"
          rel="noopener noreferrer"
          className="relative size-10 shrink-0 overflow-hidden rounded-md border border-line"
          aria-label="View original Upwork review"
        >
          <Image src={t.screenshot} alt="" fill className="object-cover" />
        </a>
      </div>
    </motion.div>
  );
}

export function Testimonials() {
  return (
    <section className="mx-auto w-full max-w-[1160px] border-t border-line px-6 py-24">
      <Reveal className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-label uppercase text-ink-4">Testimonials</p>
          <h2 className="mt-3 max-w-[24ch] text-section font-bold text-ink">
            Five completed Upwork <span className="gradient-text-animated">contracts</span>.
          </h2>
        </div>
        <a
          href={SITE.upwork}
          target="_blank"
          rel="noopener noreferrer"
          className="glow-breathe inline-flex items-center gap-1.5 rounded-full border border-amber/40 bg-amber-dim px-3.5 py-1.5 text-small text-ink-2 transition-colors duration-fast hover:border-amber hover:text-ink"
        >
          Verify on Upwork
          <ArrowUpRightIcon className="size-3.5" />
        </a>
      </Reveal>

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-12% 0px' }}
        className="-mx-2 mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto px-2 pb-2"
      >
        {TESTIMONIALS.map((t) => (
          <TestimonialCard key={t.screenshot} t={t} />
        ))}
      </motion.div>
      <p className="mt-3 text-label text-ink-4 lg:hidden">Swipe for more →</p>
    </section>
  );
}
