'use client'

import { Search, ShoppingCart } from 'lucide-react'
import { useState } from 'react'

export default function DashboardNavbar() {
  const [cartCount] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <nav className="sticky top-0 z-50 bg-[#FDFBF7] border-b-4 border-black shadow-[0px_4px_0px_0px_rgba(0,0,0,1)]">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between gap-6">
          {/* Brand */}
          <div className="min-w-fit">
            <h1 className="text-3xl font-black uppercase tracking-wider text-[#1A4454]">
              PlaceboCart
            </h1>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search viral products, brands, and instant dopamine fixes..."
                className="w-full px-4 py-3 border-2 border-black bg-white text-[#1A1A1A] placeholder-gray-500 font-semibold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
              />
              <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Cart Button */}
          <button className="relative min-w-fit px-5 py-3 bg-[#00FF87] border-3 border-black font-black uppercase text-[#1A1A1A] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              <span>Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#1A4454] text-[#00FF87] font-black rounded-full w-6 h-6 flex items-center justify-center text-xs">
                  {cartCount}
                </span>
              )}
            </div>
          </button>
        </div>
      </div>
    </nav>
  )
}
