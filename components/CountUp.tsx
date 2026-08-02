'use client';

import { useEffect, useRef } from 'react';
import { useInView, useMotionValue, useSpring } from 'motion/react';

export function CountUp({
  value,
  display,
  suffix = '',
  className,
}: {
  value: number;
  /** Pre-formatted string to render at rest (e.g. '15,000+'). Falls back
   *  to a plain formatted `value` while animating if not given. */
  display?: string;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { duration: 1400, bounce: 0 });

  useEffect(() => {
    if (isInView) motionValue.set(value);
  }, [isInView, motionValue, value]);

  useEffect(() => {
    return spring.on('change', (latest) => {
      if (!ref.current) return;
      const rounded = Math.round(latest);
      ref.current.textContent =
        rounded === value && display ? display : `${rounded.toLocaleString()}${suffix}`;
    });
  }, [spring, value, display, suffix]);

  return (
    <span ref={ref} className={className}>
      0{suffix}
    </span>
  );
}
