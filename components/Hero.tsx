'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import { lineWipe, stagger, revealLeft, revealRight, DUR, EASE_OUT } from '@/lib/motion';
import { SITE } from '@/content/site';
import { LANES } from '@/content/work';
import { Particles } from '@/components/Particles';

/**
 * Layout follows the reference portfolio Opi shared: copy anchored to the
 * lower left, a large cutout portrait rising out of the bottom edge, and a
 * small info panel on the right carrying the availability badge and what he
 * actually does. Lane titles come from content/work.ts rather than being
 * retyped here, so the panel can't drift out of sync with the Work section.
 */
export function Hero() {
  return (
    <section
      id="top"
      className="relative mx-auto w-full max-w-[1160px] overflow-hidden px-6 pt-24 md:pt-16"
    >
      <span aria-hidden className="section-ambient" />
      <Particles className="z-0" />

      {/* z-20 vs the portrait's z-10: both are children of the section, so
          the portrait (later in DOM) would otherwise paint over this grid —
          the panel's own z-20 can't fix that from inside this stacking
          context. */}
      <div className="relative z-20 grid min-h-[80dvh] grid-cols-1 items-end gap-10 md:grid-cols-[minmax(0,1fr)_260px] md:gap-8">
        <div className="max-w-[620px] pb-2 md:pb-24">
          {/* Deliberately below --text-hero's 6rem ceiling. That ceiling was
              set when the portrait was a 280px side element; at this size the
              portrait takes the right ~40% of the section, and 6rem forces
              "back in 48 hours." to break across lines mid-phrase. The
              reference gets away with 6rem because its headline is a single
              word. */}
          <h1 className="text-[clamp(2.6rem,5.4vw,4.4rem)] font-bold leading-[0.95] tracking-[-0.03em] text-ink">
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
            variants={revealLeft}
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
              variants={revealLeft}
              href="#contact"
              className="border-beam-btn rounded-md bg-amber px-6 py-3 text-small font-medium text-bg transition-transform duration-fast hover:-translate-y-px"
            >
              Message me
            </motion.a>
            <motion.a
              variants={revealLeft}
              href="#work"
              className="dot-border-btn rounded-md border border-line px-6 py-3 text-small font-medium text-ink transition-colors duration-fast hover:border-ink-4"
            >
              <span className="dash top" aria-hidden="true" />
              <span className="dash right" aria-hidden="true" />
              <span className="dash bottom" aria-hidden="true" />
              <span className="dash left" aria-hidden="true" />
              <span className="dot top left" aria-hidden="true" />
              <span className="dot top right" aria-hidden="true" />
              <span className="dot bottom right" aria-hidden="true" />
              <span className="dot bottom left" aria-hidden="true" />
              See the work
            </motion.a>
          </motion.div>
        </div>

        <div className="relative z-20 flex flex-col items-center gap-6 md:items-end md:self-center">
          <motion.div
            variants={revealRight}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.45 }}
            /* Hairline outline over a light blur rather than a filled card:
               in the reference the portrait reads straight through this
               panel, and a solid fill is what made it sit on top like a
               separate box. */
            className="w-full max-w-[300px] rounded-2xl border border-line/70 bg-bg/40 p-5 backdrop-blur-xl md:max-w-[260px]"
          >
            {SITE.availableForWork && (
              <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-line px-3 py-1 font-mono text-label uppercase text-ink-3">
                <span className="relative flex size-1.5 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber opacity-75" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-amber" />
                </span>
                Available for work
              </p>
            )}
            <p className="text-right text-small font-medium text-ink">
              Mahadi Hasan Opi
            </p>
            <ul className="mt-2 flex flex-col gap-0.5 text-right text-lead text-ink-2">
              {LANES.map((lane) => (
                <li key={lane.key}>{lane.title}</li>
              ))}
            </ul>
          </motion.div>

        </div>
      </div>

      {/* Sits after the grid so it falls below the copy in the mobile flow,
          then goes absolute from md up: large, anchored to the section's
          bottom edge, and clipped by the section's overflow so it bleeds
          off rather than fading out. z-10 keeps it under the info panel,
          which the reference lets the portrait pass behind. */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98, x: 16 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: DUR.slow, ease: EASE_OUT, delay: 0.2 }}
        className="relative z-10 mx-auto mt-8 w-full max-w-[320px] md:absolute md:bottom-0 md:right-[5%] md:mx-0 md:mt-0 md:w-[42%] md:max-w-[480px]"
      >
        <Image
          src="/opi-cutout.webp"
          alt="Mahadi Hasan Opi"
          width={760}
          height={1052}
          sizes="(min-width: 768px) 520px, 320px"
          className="h-auto w-full"
          priority
        />
      </motion.div>
    </section>
  );
}
