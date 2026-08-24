'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import { lineWipe, stagger, revealLeft, revealRight } from '@/lib/motion';
import { SITE } from '@/content/site';
import { LANES } from '@/content/work';
import { Particles } from '@/components/Particles';

/**
 * Follows the reference portfolio Opi shared. The one thing an earlier pass
 * got wrong: that reference's warmth comes from the photograph itself — a
 * real studio-lit backdrop occupying most of the hero, fading into the page
 * only at its left edge. Cutting the subject out and floating him over a
 * separately-painted CSS glow (the previous version) reads as a pasted
 * sticker, not a photograph, no matter how well-tuned the glow is. This
 * version uses the full, uncropped photo as a full-bleed background layer
 * instead, exactly like the reference does.
 */
export function Hero() {
  return (
    <section
      id="top"
      className="relative w-full overflow-hidden pt-24 md:pt-16"
    >
      <Particles className="z-0" />

      {/* items-end + a tall min-h reads fine on a short viewport but on a
          tall one it bottom-jams every column and leaves the whole upper
          section empty -- switching to items-center at md and dropping the
          min-h from 80dvh distributes the slack instead of dumping all of
          it above the headline. */}
      <div className="relative z-20 mx-auto grid w-full max-w-[1160px] grid-cols-1 items-end gap-10 px-6 md:min-h-[62dvh] md:grid-cols-[minmax(0,1fr)_260px] md:items-center md:gap-8">
        <div className="max-w-[620px] pb-2 md:pb-24">
          {/* Deliberately below --text-hero's 6rem ceiling. That ceiling was
              set when the portrait was a 280px side element; at this size the
              portrait takes the right ~68% of the section, and 6rem forces
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

        <motion.div
          variants={revealRight}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.45 }}
          /* Hairline outline over a light blur rather than a filled card: it
             reads through the photo behind it instead of sitting on top like
             a separate box, matching the reference's translucent panel.
             self-end (not self-center) so it bottom-aligns with the text
             column instead of landing at the row's vertical middle --
             centered put it squarely over his face at this photo's framing. */
          className="w-full max-w-[300px] self-start rounded-2xl border border-line/70 bg-bg/40 p-5 backdrop-blur-xl md:max-w-[260px] md:self-end"
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

      {/* Mobile: a normal contained card, after the text in DOM order so it
          stacks below it in flow. From md up: pulled out of flow entirely
          and pinned full-bleed to the right, matching the reference. The
          mask (globals.css, .hero-photo-mask) does the equivalent split --
          a JS-computed style can't carry a media query, so it has to be a
          real class. */}
      <div className="relative z-0 mx-auto mt-10 aspect-[3/4] w-full max-w-[320px] overflow-hidden rounded-2xl md:absolute md:inset-y-0 md:right-0 md:mx-0 md:mt-0 md:aspect-auto md:w-[68%] md:max-w-none md:overflow-visible md:rounded-none">
        <Image
          src="/opi-hero-bg.webp"
          alt="Mahadi Hasan Opi"
          fill
          sizes="(min-width: 768px) 68vw, 100vw"
          className="hero-photo-mask object-cover"
          style={{ objectPosition: 'center 12%' }}
          priority
        />
      </div>
    </section>
  );
}
