'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import { lineWipe, stagger, reveal, DUR, EASE_OUT } from '@/lib/motion';
import { SITE } from '@/content/site';
import { Particles } from '@/components/Particles';

export function Hero() {
  return (
    <section
      id="top"
      className="relative mx-auto flex min-h-[78dvh] w-full max-w-[1160px] flex-col justify-center gap-12 px-6 pt-24 md:flex-row md:items-center md:gap-8 md:pt-16"
    >
      <Particles className="-z-10" />

      <div className="flex-1">
        {SITE.availableForWork && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DUR.base, ease: EASE_OUT }}
            className="glow-breathe mb-5 inline-flex items-center gap-2 rounded-full border border-line px-3 py-1 font-mono text-label uppercase text-ink-3"
          >
            <span className="size-1.5 rounded-full bg-amber" />
            Available for work
          </motion.p>
        )}

        <h1 className="text-hero font-bold text-ink">
          <span className="block overflow-hidden">
            <motion.span
              className="block"
              variants={lineWipe}
              initial="hidden"
              animate="visible"
            >
              Talking-head video,
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              className="block"
              variants={lineWipe}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.08 }}
            >
              back in{' '}
              <span className="gradient-text-animated">48 hours</span>.
            </motion.span>
          </span>
        </h1>

        <motion.p
          variants={reveal}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.3 }}
          className="mt-6 max-w-[46ch] text-lead text-ink-2"
        >
          Reels, UGC ad creative and podcast cuts for founders, coaches and
          agencies who publish every week.
        </motion.p>

        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          transition={{ delayChildren: 0.4 }}
          className="mt-9 flex flex-wrap items-center gap-4"
        >
          <motion.a
            variants={reveal}
            href="#contact"
            className="glow-breathe rounded-md bg-amber px-6 py-3 text-small font-medium text-bg transition-transform duration-fast hover:-translate-y-px"
          >
            Message me
          </motion.a>
          <motion.a
            variants={reveal}
            href="#work"
            className="rounded-md border border-line px-6 py-3 text-small font-medium text-ink transition-colors duration-fast hover:border-ink-4"
          >
            See the work
          </motion.a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: DUR.slow, ease: EASE_OUT, delay: 0.2 }}
        className="flex w-full max-w-[280px] shrink-0 flex-col items-center gap-3 self-center md:self-auto"
      >
        <div className="border-beam relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-line">
          <Image
            src="/opi.jpg"
            alt="Mahadi Hasan Opi"
            fill
            sizes="280px"
            className="object-cover"
            priority
          />
        </div>
        <p className="text-small text-ink-3">
          <span className="font-medium text-ink">Mahadi Hasan Opi</span>, editor
        </p>
      </motion.div>
    </section>
  );
}
