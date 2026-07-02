'use client'

import { Zap, Flame, Crown, Sparkles, Footprints } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const categories = [
  { id: 1, label: 'Trending Tech', slug: 'trending-tech', icon: Zap },
  { id: 2, label: 'Viral Hype', slug: 'viral-hype', icon: Flame },
  { id: 3, label: 'Luxury Drips', slug: 'luxury-drips', icon: Crown },
  { id: 4, label: 'Infinite Flex', slug: 'infinite-flex', icon: Sparkles },
  { id: 5, label: 'Sneakers', slug: 'sneakers', icon: Footprints },
]

export default function CategoryStrip() {
  const pathname = usePathname()
  const isSelected = (slug: string) => pathname === `/category/${slug}`

  return (
    <div className="bg-[#FDFBF7] border-b-2 border-black py-4 px-6 overflow-x-auto">
      <div className="flex gap-4 max-w-7xl mx-auto">
        {categories.map((category) => {
          const Icon = category.icon
          const selected = isSelected(category.slug)

          return (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className={`flex flex-col items-center gap-2 px-4 py-3 border-2 border-black min-w-fit transition-all ${
                selected
                  ? 'bg-[#1A4454] text-[#00FF87] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'
                  : 'bg-white text-[#1A4454] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs font-black uppercase whitespace-nowrap">{category.label}</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
