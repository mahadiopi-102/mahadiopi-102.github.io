'use client';

import { motion } from 'motion/react';
import { reveal, ONCE } from '@/lib/motion';

/**
 * The site's only scroll reveal. Wrap anything that should animate in.
 * `once` is not optional — nothing on this site animates twice.
 */
export function Reveal({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={reveal}
      initial="hidden"
      whileInView="visible"
      viewport={ONCE}
    >
      {children}
    </motion.div>
  );
}
