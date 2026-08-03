'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Reveal } from '@/components/Reveal';
import { SERVICES } from '@/content/services';
import { WORK, LANES, posterFor } from '@/content/work';

/**
 * Looked up by youtubeId, not array position — WORK[6] etc. broke the
 * moment new items were inserted anywhere before index 6, which is
 * exactly what happened here once.
 */
function findWork(youtubeId: string) {
  const item = WORK.find((w) => w.youtubeId === youtubeId);
  if (!item) throw new Error(`Services preview: no WORK item with youtubeId ${youtubeId}`);
  return item;
}

const PREVIEWS = [
  findWork('LVgZtlSvC4s'), // Coaching — talking-head, for "Short-form editing"
  findWork('rYsXw9sMXfs'), // Real estate, price hook — ads, for "UGC and Meta ad creative"
  findWork('LVgZtlSvC4s'), // Coaching — talking-head, for "Podcast repurposing"
  findWork('KFhaaTxc-m8'), // Trading psychology — long, for "Long-form YouTube"
];

function isVertical(item: (typeof WORK)[number]) {
  return LANES.find((l) => l.key === item.lane)?.vertical ?? true;
}

export function Services() {
  const [hovered, setHovered] = useState(0);

  return (
    <section id="services" className="mx-auto w-full max-w-[1160px] border-t border-line px-6 py-24">
      <Reveal>
        <h2 className="max-w-[24ch] text-section font-bold text-ink">
          Four formats, one process.
        </h2>
      </Reveal>

      <div className="mt-14 grid gap-10 md:grid-cols-[1fr_280px]">
        <ul className="flex flex-col">
          {SERVICES.map((service, i) => (
            <li key={service.title} className="border-b border-line last:border-b-0">
              <button
                type="button"
                onMouseEnter={() => setHovered(i)}
                onFocus={() => setHovered(i)}
                className="group flex w-full items-baseline justify-between gap-6 py-6 text-left"
              >
                <span
                  className={`text-lead font-semibold transition-colors duration-fast ${
                    hovered === i ? 'text-ink' : 'text-ink-3'
                  }`}
                >
                  {service.title}
                </span>
                <span className="hidden max-w-[36ch] text-small text-ink-3 md:block">
                  {service.body}
                </span>
              </button>
            </li>
          ))}
        </ul>

        <div className="relative hidden aspect-[4/5] overflow-hidden rounded-xl border border-line bg-bg-2 md:block">
          {PREVIEWS.map((item, i) => (
            <Image
              key={i}
              src={posterFor(item)}
              alt=""
              fill
              sizes="280px"
              className={`transition-opacity duration-base ${
                isVertical(item) ? 'object-cover' : 'object-contain'
              }`}
              style={{ opacity: hovered === i ? 1 : 0 }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
