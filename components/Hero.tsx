'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import { lineWipe, stagger, revealLeft, reveal } from '@/lib/motion';
import { HeroLiquid } from '@/components/HeroLiquid';
import { SITE } from '@/content/site';
import { Particles } from '@/components/Particles';
import { ArrowDownIcon } from 'lucide-react';

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-[92dvh] w-full flex-col overflow-hidden rounded-b-[2rem]"
      style={{
        background: 'linear-gradient(to right, #050505 0%, #111111 40%, #3a1c0d 70%, #bd5a31 100%)'
      }}
    >
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-before-cutout.png"
          alt="Mahadi Hasan Opi"
          fill
          sizes="100vw"
          className="object-contain object-right"
          priority
        />
        <HeroLiquid className="pointer-events-auto absolute inset-0 z-10 w-full h-full" />
      </div>

      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
      
      <div className="pointer-events-none relative z-20 mx-auto flex w-full max-w-[1160px] flex-1 flex-col px-6 pb-16 pt-28 lg:pt-32 md:flex-row md:items-center md:justify-between">
        
        {/* Left Side Content */}
        <div className="flex max-w-[720px] flex-col gap-8 lg:gap-10 drop-shadow-md z-10 mt-8 md:mt-12">
          <motion.div
            variants={reveal}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.8 }}
            className="flex w-fit items-center gap-2 rounded-full border border-line bg-surface/10 px-3 py-1 backdrop-blur-sm pointer-events-auto"
          >
            <div className="h-1.5 w-1.5 rounded-full bg-white/70" />
            <span className="text-label font-medium text-white/90 uppercase tracking-wider">Independent Editor</span>
          </motion.div>

          <h1 className="pointer-events-auto text-[clamp(3.5rem,7vw,6.5rem)] font-bold leading-[1.05] tracking-[-0.02em] text-white drop-shadow-2xl">
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
                transition={{ delay: 0.1 }}
              >
                back in <span className="text-amber">48 hours</span>.
              </motion.span>
            </span>
          </h1>

          <motion.div
            variants={revealLeft}
            initial="hidden"
            animate="visible"
            transition={{ delay: 2.1 }}
            className="flex flex-wrap items-center gap-x-3 gap-y-1.5 pointer-events-auto"
          >
            <div className="flex items-center gap-3">
              <div className="flex text-amber">
                {[1, 2, 3, 4, 5].map((i) => (
                  <svg key={i} className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.5l2.9 5.88 6.49.94-4.7 4.58 1.11 6.46L12 17.9l-5.8 3.05 1.1-6.46-4.69-4.58 6.49-.94L12 2.5z"/>
                  </svg>
                ))}
              </div>
              <a
              href={SITE.upwork}
              target="_blank"
              rel="noopener noreferrer"
              className="whitespace-nowrap text-small font-medium text-white/80 underline decoration-white/30 underline-offset-4 transition-colors duration-fast hover:text-white hover:decoration-white/60"
            >
              Top Rated on Upwork
            </a>
            </div>
            <div className="flex items-center gap-3">
              <span className="hidden text-white/30 sm:inline">•</span>
              <span className="whitespace-nowrap text-small font-medium text-white/60">$100K+ earned · 237 jobs</span>
            </div>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            transition={{ delayChildren: 2.2 }}
            className="mt-4 flex flex-wrap items-center gap-4"
          >
            <motion.a
              variants={revealLeft}
              href="#contact"
              className="pointer-events-auto inline-flex items-center justify-center gap-2 rounded-md bg-amber px-8 py-4 text-body font-medium text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_24px_var(--amber-glow-1-hover)] active:translate-y-0 active:scale-[0.98]"
            >
              Message me
            </motion.a>
            <motion.a
              variants={revealLeft}
              href="#work"
              className="pointer-events-auto inline-flex items-center justify-center gap-2 rounded-md border border-white/20 bg-white/10 px-8 py-4 text-body font-medium text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white/20 hover:shadow-[0_8px_24px_rgba(255,255,255,0.05)] active:translate-y-0 active:scale-[0.98]"
            >
              View Work
              <ArrowDownIcon className="size-5" />
            </motion.a>
          </motion.div>
        </div>

        {/* Right Side Glass Card */}
        <motion.div 
          variants={reveal}
          initial="hidden"
          animate="visible"
          transition={{ delay: 2.4 }}
          className="pointer-events-auto w-full max-w-[300px] self-start rounded-2xl border border-white/10 bg-black/40 p-5 backdrop-blur-xl md:max-w-[260px] md:mb-6 md:self-end z-10"
        >
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 font-mono text-label uppercase text-white/70">
            <span className="relative flex size-1.5 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber opacity-75"></span>
              <span className="relative inline-flex size-1.5 rounded-full bg-amber"></span>
            </span>
            Available for work
          </p>
          <p className="text-right text-small font-medium text-white/90">
            Mahadi Hasan Opi
          </p>
          <ul className="mt-2 flex flex-col gap-0.5 text-right text-lead text-white/70">
            <li>Talking-head</li>
            <li>UGC and ads</li>
            <li>YouTube long-form</li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
