'use client';

import { motion } from 'motion/react';
import { reveal, lineWipe, stagger, ONCE } from '@/lib/motion';
import { CountUp } from '@/components/CountUp';
import Image from 'next/image';
import { SITE } from '@/content/site';

function VerifiedIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-1.9 14.7L6 12.6l1.5-1.5 2.6 2.6 6.4-6.4 1.5 1.5-7.9 7.9z" fill="#14a800" />
    </svg>
  );
}

function CrownBadge(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="10" stroke="#14a800" />
      <path d="M7 14l1.5-5 3.5 3 3.5-3L17 14H7z" fill="#14a800" />
    </svg>
  );
}

function StarBadge(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7.4-6.3-4.8-6.3 4.8 2.3-7.4-6-4.6h7.6z" stroke="#14a800" fill="#14a800" fillOpacity="0.2" />
    </svg>
  );
}

export function Proof() {
  const stats = [
    { value: 100, prefix: '$', suffix: 'K+', label: 'Total earnings' },
    { value: 237, label: 'Total jobs' },
    { value: 14743, label: 'Total hours' }
  ];

  return (
    <section id="proof" className="mx-auto w-full max-w-[1160px] scroll-mt-28 px-6 py-24">
      <motion.a
        href={SITE.upwork}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="View Mahadi Hasan Opi's verified profile on Upwork"
        variants={reveal}
        initial="hidden"
        whileInView="visible"
        viewport={ONCE}
        className="glass-card block overflow-hidden rounded-[2rem] border border-line bg-[#0a0a0a] shadow-panel transition-colors duration-fast hover:border-amber/40"
      >
        {/* Top Header Section */}
        <div className="flex flex-col gap-6 p-8 md:flex-row md:items-start md:p-12 lg:p-16">
          <div className="relative w-fit shrink-0 self-start">
            <div className="relative h-24 w-24 overflow-hidden rounded-full border-2 border-surface bg-line md:h-32 md:w-32">
              <Image 
                src="/upwork-avatar.jpg" 
                alt="Mahadi Hasan O." 
                fill 
                className="object-cover"
              />
            </div>
            <div className="absolute bottom-0.5 right-0.5 h-6 w-6 rounded-full border-4 border-[#0a0a0a] bg-[#14a800]" />
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                Mahadi Hasan O.
              </h2>
              <VerifiedIcon className="h-6 w-6" />
            </div>
            
            <div className="flex items-center gap-2 text-sm text-white/60">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              <span>Lakshmipur, Bangladesh</span>
            </div>

            <div className="flex items-center gap-2 text-sm font-medium text-white/80">
              <svg className="h-4 w-4 text-[#14a800]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              <span>Available now</span>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2 rounded-full border border-[#14a800]/30 bg-[#14a800]/10 px-4 py-2">
                <CrownBadge className="h-5 w-5" />
                <span className="font-semibold text-white">100% Job Success</span>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-[#14a800]/30 bg-[#14a800]/10 px-4 py-2">
                <StarBadge className="h-5 w-5" />
                <span className="font-semibold text-white">Top Rated</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Stats Section */}
        <div className="border-t border-line/50 bg-white/[0.02] p-8 md:px-12 md:py-10 lg:px-16">
          <motion.ul 
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={ONCE}
            className="grid grid-cols-1 gap-8 md:grid-cols-3"
          >
            {stats.map((stat, i) => (
              <motion.li key={i} variants={reveal} className="flex flex-col">
                <div className="flex items-baseline text-4xl font-bold tracking-tight text-white md:text-5xl">
                  {stat.prefix && <span>{stat.prefix}</span>}
                  {stat.value === 14743 ? (
                    <span>14,743</span>
                  ) : (
                    <CountUp
                      value={stat.value}
                      display={`${stat.value.toLocaleString()}${stat.suffix ?? ''}`}
                      suffix={stat.suffix || ''}
                    />
                  )}
                </div>
                <div className="mt-2 text-base text-white/60">
                  {stat.label}
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </motion.a>
    </section>
  );
}
