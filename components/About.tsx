'use client';

import { motion } from 'motion/react';

import { useVideoLightbox } from '@/components/VideoLightbox';
import { PlayIcon } from 'lucide-react';
import { Reveal } from '@/components/Reveal';

export function About() {
  const lightbox = useVideoLightbox();

  return (
    <section className="mx-auto max-w-[1160px] px-6 py-24">
      <Reveal>
        <h2 className="max-w-[24ch] text-section font-bold text-ink">
          One reel, no filler.
        </h2>
        <p className="mt-3 max-w-[52ch] text-lead text-ink-3">
          Thirty-three seconds of real client edits, back to back — not a highlight reel of stock templates.
        </p>
      </Reveal>

      {/* Massive Inline Showreel Block */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true, margin: '-10% 0px' }}
        className="mt-20 group relative overflow-hidden rounded-[2rem] glass-card aspect-[16/9] w-full border border-line shadow-panel cursor-pointer" 
        onClick={() => lightbox.open('/showreel.mp4')}
      >
        <video 
          src="/showreel.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover opacity-80 transition-opacity duration-700 group-hover:opacity-100"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/10 transition-colors duration-500 group-hover:bg-transparent">
          <div className="flex size-20 items-center justify-center rounded-full bg-amber text-bg shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110">
            <PlayIcon className="size-8 translate-x-1 fill-current" />
          </div>
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/70 to-transparent px-6 py-5">
          <span className="font-mono text-label uppercase tracking-wide text-white/80">
            Full showreel
          </span>
          <span className="font-mono text-label text-white/60">0:33</span>
        </div>
      </motion.div>
    </section>
  );
}
