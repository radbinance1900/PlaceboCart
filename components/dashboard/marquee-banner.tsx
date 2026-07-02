'use client'

import { useEffect, useState } from 'react'

export default function MarqueeBanner() {
  const [scrollPosition, setScrollPosition] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setScrollPosition((prev) => (prev + 2) % 100)
    }, 20)
    return () => clearInterval(interval)
  }, [])

  const text = '★ SALE ON PLACEBOCART ★ 100% DISCOUNT AUTO-APPLIED ★ FREE SHOPPING ★ '
  const repeatedText = text.repeat(3)

  return (
    <div className="bg-[#1A4454] border-b-4 border-black overflow-hidden py-3 font-black uppercase text-[#00FF87] shadow-[0px_4px_0px_0px_rgba(0,0,0,1)]">
      <div className="relative whitespace-nowrap">
        <div
          className="inline-block text-lg tracking-wider"
          style={{
            transform: `translateX(-${scrollPosition}%)`,
            transition: 'transform 0.05s linear',
          }}
        >
          {repeatedText}
        </div>
      </div>
    </div>
  )
}
