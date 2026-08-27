'use client';

import Image from 'next/image';
import { StarIcon } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { stagger, reveal } from '@/lib/motion';
import { motion } from 'motion/react';
import { TESTIMONIALS, type Testimonial } from '@/content/testimonials';
import { SITE } from '@/content/site';
import { useTilt } from '@/lib/useTilt';
import { useCardParticles } from '@/lib/useCardParticles';
import { CardParticles } from '@/components/CardParticles';

function TestimonialCard({ t }: { t: Testimonial }) {
  const { ref, style, onMouseMove, onMouseLeave } = useTilt();
  const particles = useCardParticles();

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseEnter={particles.onMouseEnter}
      onMouseLeave={() => {
        onMouseLeave();
        particles.onMouseLeave();
      }}
      variants={reveal}
      style={style}
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
      {/*
       * This used to run a raw-Upwork-screenshot marquee above these same
       * five reviews as text cards — same data twice, and the screenshots
       * (Upwork's own green branding) clashed with the rest of the site
       * and were unreadable at mobile width, per the note in
       * content/testimonials.ts. One section, real text, screenshot kept
       * one tap away via "Verify on Upwork" on each card instead.
       */}
      <Reveal className="mb-6">
        <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-line px-3 py-1 font-mono text-label uppercase text-ink-3">
          <span className="relative flex size-1.5 shrink-0">
            <span className="relative inline-flex size-1.5 rounded-full bg-amber" />
          </span>
          Feedback
        </p>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="max-w-[24ch] text-section font-bold text-ink">
            Five completed Upwork contracts.
          </h2>
          <a
            href={SITE.upwork}
            target="_blank"
            rel="noopener noreferrer"
            className="glow-breathe inline-flex items-center gap-1.5 rounded-full border border-amber/40 bg-amber-dim px-3.5 py-1.5 text-small text-ink-2 transition-colors duration-fast hover:border-amber/70 hover:text-ink"
          >
            Verify on Upwork
          </a>
        </div>
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

