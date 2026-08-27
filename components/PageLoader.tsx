'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'

type Phase = 'loading' | 'fading' | 'sliding' | 'done'

export function PageLoader({ onComplete }: { onComplete?: () => void }) {
  const [phase, setPhase] = useState<Phase>('loading')

  useEffect(() => {
    if (phase === 'fading') {
      const timer = setTimeout(() => {
        setPhase('sliding')
      }, 400)
      return () => clearTimeout(timer)
    }
    
    if (phase === 'sliding') {
      const timer = setTimeout(() => {
        setPhase('done')
      }, 700)
      return () => clearTimeout(timer)
    }

    if (phase === 'done' && onComplete) {
      onComplete()
    }
  }, [phase, onComplete])

  if (phase === 'done') {
    return null
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[120] bg-[#0a0a0a] flex flex-col items-center justify-center pointer-events-none"
        initial={{ y: 0, borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}
        animate={{ 
          y: phase === 'sliding' ? '-100%' : '0%',
          borderBottomLeftRadius: phase === 'sliding' ? '1rem' : 0,
          borderBottomRightRadius: phase === 'sliding' ? '1rem' : 0
        }}
        transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        exit={{ y: '-100%' }}
      >
        <motion.div
          className="flex flex-col items-center gap-4 text-center px-6 w-full"
          initial={{ opacity: 1, y: 0 }}
          animate={{
            opacity: phase === 'fading' || phase === 'sliding' ? 0 : 1,
            y: phase === 'fading' || phase === 'sliding' ? -12 : 0
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <div className="font-mono text-small font-medium text-white">
            Opi<span className="text-amber">.</span>recut
          </div>
          <p className="text-white/55 text-sm">
            Reels, UGC ad creative and podcast cuts.
          </p>
          
          <div className="h-px bg-white/15 w-full max-w-[22rem] mt-2 overflow-hidden">
            <motion.div
              className="h-full bg-white"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 1, ease: 'linear' }}
              onAnimationComplete={() => {
                if (phase === 'loading') {
                  setPhase('fading')
                }
              }}
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
