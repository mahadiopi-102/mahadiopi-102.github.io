'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { PlayIcon, ArrowUpRightIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { LANES, laneItems, posterFor } from '@/content/work';
import { useVideoLightbox } from '@/components/VideoLightbox';
import { useTilt } from '@/lib/useTilt';
import { useCardParticles } from '@/lib/useCardParticles';
import { CardParticles } from '@/components/CardParticles';

function WorkCard({ item, vertical }: { item: ReturnType<typeof laneItems>[number]; vertical: boolean }) {
  const [step, setStep] = useState(0);
  const { open } = useVideoLightbox();
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
      style={style}
      className={`glass-card group relative shrink-0 overflow-hidden rounded-xl ${
        vertical ? 'w-[200px]' : 'w-[300px]'
      }`}
    >
      <CardParticles particles={particles.particles} />
      <button
        type="button"
        onClick={() => open(item.youtubeId)}
        className="block w-full text-left transition-transform duration-fast active:scale-[0.98]"
        aria-label={`Play ${item.title}`}
      >
        <div className={`relative w-full ${vertical ? 'aspect-[9/16]' : 'aspect-video'}`}>
          <Image
            src={posterFor(item, step)}
            alt={item.title}
            fill
            sizes={vertical ? '200px' : '300px'}
            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.07]"
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
        href={`https://youtube.com/watch?v=${item.youtubeId}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open ${item.title} on YouTube in a new tab`}
        className="absolute right-2 top-2 z-10 flex size-7 items-center justify-center rounded-full border border-line bg-bg/70 text-ink-3 opacity-0 backdrop-blur-sm transition-opacity duration-fast hover:text-ink group-hover:opacity-100"
      >
        <ArrowUpRightIcon className="size-3.5" />
      </a>
    </motion.div>
  );
}

function WorkLane({ lane, index }: { lane: (typeof LANES)[number]; index: number }) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollByCards = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>(':scope > *');
    const step = (card?.offsetWidth ?? 300) + 24;
    el.scrollBy({ left: dir * step * 2, behavior: 'smooth' });
  };

  return (
    <div className="md:sticky" style={{ top: `${80 + index * 16}px` }}>
      {/* border-ink/15, not the default border-line -- the site's own
          --line token is a 9%-opacity hairline, near-invisible at the
          scale of a whole-card border like the reference's. Bumped
          just here, not globally, so the rest of the site's borders
          (which read fine at that subtlety on smaller elements) are
          untouched. */}
      <Reveal className="rounded-2xl border border-ink/15 bg-surface p-7 shadow-panel md:p-10">
        {/* Big number + "Format" + title on the left, the aspect-ratio
            badge as a pill on the right -- three lanes is a genuine,
            small sequence (not a generic per-section eyebrow), so the
            number earns its place here the way it wouldn't as
            decoration above every heading on the page. Sized to read
            at roughly the height of the Format+title+blurb block next
            to it, same proportion as the reference, not a small badge
            numeral -- identical across all three lanes (same class,
            no per-lane branch), so none of them reads smaller. */}
        <div className="mb-8 flex flex-wrap items-start justify-between gap-6">
          <div className="flex items-start gap-6">
            <span className="text-[4.5rem] font-extrabold leading-[0.8] tracking-[-0.02em] text-ink md:text-[6rem]">
              0{index + 1}
            </span>
            <div className="pt-1">
              <p className="font-mono text-label uppercase tracking-wide text-ink-4">
                Format
              </p>
              <h3 className="mt-1 text-lead font-bold text-ink">{lane.title}</h3>
              <p className="mt-2 max-w-[52ch] text-small text-ink-3">{lane.blurb}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="shrink-0 rounded-full border border-line px-4 py-2 font-mono text-label uppercase tracking-wide text-ink-3">
              {lane.meta}
            </span>
            {/* Desktop only -- the hidden scrollbar (deliberate, see the
                lane div below) means a mouse-and-trackpad visitor has no
                affordance at all without these; touch visitors get the
                "Swipe for more" hint instead. */}
            <div className="hidden items-center gap-1.5 md:flex">
              <button
                type="button"
                onClick={() => scrollByCards(-1)}
                aria-label={`Scroll ${lane.title} left`}
                className="flex size-8 items-center justify-center rounded-full border border-line text-ink-3 transition-colors duration-fast hover:border-amber/60 hover:text-amber"
              >
                <ChevronLeftIcon className="size-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollByCards(1)}
                aria-label={`Scroll ${lane.title} right`}
                className="flex size-8 items-center justify-center rounded-full border border-line text-ink-3 transition-colors duration-fast hover:border-amber/60 hover:text-amber"
              >
                <ChevronRightIcon className="size-4" />
              </button>
            </div>
          </div>
        </div>
        <div
          ref={scrollerRef}
          className="group/lane -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-8 md:gap-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {laneItems(lane.key).map((item) => (
            <WorkCard key={item.youtubeId} item={item} vertical={lane.vertical} />
          ))}
        </div>
        <p className="-mt-4 text-label text-ink-4 md:hidden">Swipe for more →</p>
      </Reveal>
    </div>
  );
}

export function Work() {
  return (
    <section id="work" className="mx-auto w-full max-w-[1160px] scroll-mt-28 border-t border-line px-6 py-24">
      <Reveal>
        <h2 className="max-w-[24ch] text-section font-bold text-ink">
          Real edits, real client work.
        </h2>
      </Reveal>

      <div className="mt-14 flex flex-col gap-8">
        {LANES.map((lane, i) => (
          <WorkLane key={lane.key} lane={lane} index={i} />
        ))}
      </div>
    </section>
  );
}
