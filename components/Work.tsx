'use client';

import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'motion/react';
import { PlayIcon, ArrowUpRightIcon } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { LANES, laneItems, posterFor } from '@/content/work';
import { useVideoLightbox } from '@/components/VideoLightbox';
import { useTilt } from '@/lib/useTilt';
import { useCardParticles } from '@/lib/useCardParticles';
import { CardParticles } from '@/components/CardParticles';

function WorkCard({ item, vertical }: { item: ReturnType<typeof laneItems>[number]; vertical: boolean }) {
  const [step, setStep] = useState(0);
  const { open } = useVideoLightbox();
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
      style={tilt.style}
      className={`glass-card group relative shrink-0 overflow-hidden rounded-xl ${
        vertical ? 'w-[200px]' : 'w-[300px]'
      }`}
    >
      <CardParticles particles={particles.particles} />
      <button
        type="button"
        onClick={() => open(item.youtubeId)}
        className="block w-full text-left"
        aria-label={`Play ${item.title}`}
      >
        <div className={`relative w-full ${vertical ? 'aspect-[9/16]' : 'aspect-video'}`}>
          <Image
            src={posterFor(item, step)}
            alt={item.title}
            fill
            sizes={vertical ? '200px' : '300px'}
            className="object-cover transition-transform duration-base ease-out-token group-hover:scale-[1.03]"
            onError={() => setStep((s) => s + 1)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity duration-fast group-hover:opacity-100" />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-fast group-hover:opacity-100">
            <span className="flex size-11 items-center justify-center rounded-full bg-amber text-bg">
              <PlayIcon className="size-4 translate-x-px fill-current" />
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between px-3 py-2.5">
          <span className="text-small text-ink-2">{item.title}</span>
          <span className="font-mono text-label text-ink-4">{item.duration}</span>
        </div>
      </button>

      <a
        href={`https://www.youtube.com/watch?v=${item.youtubeId}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open ${item.title} on YouTube in a new tab`}
        onClick={(e) => e.stopPropagation()}
        className="absolute right-2 top-2 z-10 flex size-7 items-center justify-center rounded-full border border-line bg-bg/70 text-ink-3 opacity-0 backdrop-blur-sm transition-opacity duration-fast hover:text-ink group-hover:opacity-100"
      >
        <ArrowUpRightIcon className="size-3.5" />
      </a>
    </motion.div>
  );
}

export function Work() {
  return (
    <section id="work" className="mx-auto w-full max-w-[1160px] border-t border-line px-6 py-24">
      <Reveal>
        <h2 className="max-w-[24ch] text-section font-bold text-ink">
          Real edits, real client work.
        </h2>
      </Reveal>

      <div className="mt-14 flex flex-col gap-8">
        {LANES.map((lane, i) => (
          <div key={lane.key} className="sticky" style={{ top: `${80 + i * 16}px` }}>
            <Reveal className="rounded-2xl border border-line bg-surface p-7 shadow-panel md:p-10">
              <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
                <div>
                  <h3 className="text-lead font-semibold text-ink">{lane.title}</h3>
                  <p className="mt-1 max-w-[52ch] text-small text-ink-3">{lane.blurb}</p>
                </div>
                <span className="font-mono text-label uppercase text-ink-4">{lane.meta}</span>
              </div>
              <div className="-mx-2 flex gap-4 overflow-x-auto px-2 pb-2">
                {laneItems(lane.key).map((item) => (
                  <WorkCard key={item.youtubeId} item={item} vertical={lane.vertical} />
                ))}
              </div>
            </Reveal>
          </div>
        ))}
      </div>
    </section>
  );
}
