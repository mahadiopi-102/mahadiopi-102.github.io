'use client';

import { memo, useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'motion/react';
import { reveal, lineWipe, ONCE, DUR, EASE_OUT, stagger } from '@/lib/motion';
import { PROCESS_STEPS } from '@/content/process';

/**
 * Isolated from `Process()`'s own `activeStep` state so this header never
 * re-renders while the reader scrolls through the steps below — cheap
 * insurance, unrelated to the bug this component works around (see next
 * comment), but no reason to re-run it on every scroll tick either.
 */
const ProcessHeader = memo(function ProcessHeader() {
  /**
   * The heading used `whileInView` directly on the animated motion.span,
   * which never fired — confirmed stuck at its `hidden` transform
   * (translateY 105%) even scrolled dead center in the viewport, while an
   * identically-configured sibling (the pill above) fired fine. The
   * difference: `whileInView`/`useInView`'s observer was watching the
   * *animated* element itself, whose own post-transform geometry while
   * still hidden apparently isn't what this intersection check wants.
   * Watching the static, untransformed wrapper span instead — and driving
   * the animated child off that boolean — fixed it outright.
   */
  const headingWrapRef = useRef<HTMLSpanElement>(null);
  const headingInView = useInView(headingWrapRef, { once: true, margin: '-12% 0px' });

  return (
    <>
      <motion.div
        variants={reveal}
        initial="hidden"
        whileInView="visible"
        viewport={ONCE}
        className="mb-5 flex w-fit items-center gap-2 rounded-full border border-line bg-surface px-3 py-1"
      >
        <div className="h-1.5 w-1.5 rounded-full bg-ink/50" />
        <span className="text-label font-medium uppercase tracking-wider text-ink-3">Workflow</span>
      </motion.div>

      <h2 className="mb-12 max-w-[16ch] text-[clamp(2.5rem,5vw,3.5rem)] font-bold leading-[1.05] tracking-[-0.02em] text-ink">
        <span ref={headingWrapRef} className="block overflow-hidden">
          <motion.span
            className="block"
            variants={lineWipe}
            initial="hidden"
            animate={headingInView ? 'visible' : 'hidden'}
          >
            Six things done the same way, every time.
          </motion.span>
        </span>
      </h2>
    </>
  );
});

function StepBlock({
  step,
  index,
  activeStep,
  onActive,
}: {
  step: typeof PROCESS_STEPS[number];
  index: number;
  activeStep: number;
  onActive: (index: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: '-40% 0px -40% 0px' });

  useEffect(() => {
    if (isInView) {
      onActive(index);
    }
  }, [isInView, index, onActive]);

  const isActive = activeStep === index;

  return (
    <div
      ref={ref}
      className={`flex flex-col justify-center py-20 md:py-[20vh] transition-opacity duration-700 ${
        isActive ? 'opacity-100' : 'opacity-30'
      }`}
    >
      <div className="mb-4 font-mono text-sm font-medium text-amber">
        0{index + 1}
      </div>
      <h3 className="mb-4 text-2xl md:text-3xl font-bold tracking-tight text-ink">
        {step.title}
      </h3>
      <div className="text-base md:text-lg leading-relaxed text-ink-2 max-w-[45ch]">
        {step.body.map((p, idx) => (
          <p key={idx} className={idx > 0 ? 'mt-4' : ''}>
            {p}
          </p>
        ))}
      </div>

      {/* Mobile-only visual block since the sticky stage is hidden on mobile.
          Mounted only once this card is in view — with six of these on the
          page, rendering all six <video> elements unconditionally means six
          concurrent autoplaying decodes on a phone the moment the section
          scrolls into range. */}
      <div className="mt-8 flex md:hidden glass-card relative overflow-hidden aspect-[9/16] max-h-[60vh] w-full rounded-2xl shadow-panel bg-bg-2">
        {isInView && (
          <video
            src={`/process-${index + 1}.mp4`}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
      </div>
    </div>
  );
}

export function Process() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="process" className="mx-auto w-full max-w-[1160px] scroll-mt-28 bg-bg px-6 py-24 md:py-32">
      <ProcessHeader />

      <div className="relative mt-8 md:mt-16 flex flex-col items-start gap-10 md:flex-row md:gap-20">
        
        {/* LEFT: Scrolling Text Blocks */}
        <div className="flex-1 md:pb-[20vh]">
          {PROCESS_STEPS.map((step, i) => (
            <StepBlock
              key={step.title}
              step={step}
              index={i}
              activeStep={activeStep}
              onActive={setActiveStep}
            />
          ))}
        </div>

        {/* RIGHT: Sticky Stage (Desktop only) */}
        <div className="sticky top-[15vh] hidden h-[70vh] w-full max-w-[480px] shrink-0 md:block lg:max-w-[560px]">
          <div className="glass-card relative h-full w-full overflow-hidden rounded-[2rem] shadow-panel">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center"
              >
                <video
                  src={`/process-${activeStep + 1}.mp4`}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 h-full w-full object-cover"
                />
                
                {/* Gradient overlay so the step title stays readable over the video */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <div className="absolute inset-x-8 bottom-16 flex flex-col items-center text-center">
                  <h4 className="text-2xl font-bold tracking-tight text-white mb-3">
                    {PROCESS_STEPS[activeStep].title}
                  </h4>
                </div>

                <div className="absolute inset-x-12 bottom-8 h-1 overflow-hidden rounded-full bg-white/20">
                  <motion.div 
                    className="h-full bg-amber"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 4, ease: "linear" }}
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
