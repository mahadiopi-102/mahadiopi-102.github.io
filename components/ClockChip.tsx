'use client'

import React, { useState, useEffect } from 'react'

export function ClockChip() {
  const [time, setTime] = useState<string>('')

  useEffect(() => {
    const updateTime = () => {
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Dhaka',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      })
      setTime(formatter.format(new Date()))
    }
    
    updateTime()
    const interval = setInterval(updateTime, 60_000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="hidden md:flex items-center gap-3 rounded-full border border-line bg-surface/40 backdrop-blur px-3 py-1.5">
      <span className="text-label text-ink-4">Local time</span>
      <span className="text-small font-medium text-ink">{time}</span>
    </div>
  )
}
