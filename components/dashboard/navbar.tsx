'use client'

import { Search, ShoppingCart } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'
import { useCart } from '@/lib/cart-context'
import { searchProducts } from '@/lib/products'
import { useRouter } from 'next/navigation'

const productEmojis: { [key: string]: string } = {
  'iPhone 16 Pro Max': '📱',
  'MacBook Pro M4': '💻',
  'AirPods Pro Max': '🎧',
  'iPad Pro 12.9"': '📱',
  'Apple Watch Ultra': '⌚',
  'PlayStation 5': '🎮',
  'DJI Air 3S Drone': '🚁',
  'Meta Quest 3': '🥽',
  'Nintendo Switch Pro': '🎮',
  'Sony WH-1000XM5': '🎧',
  'Rolex Submariner': '⌚',
  'Omega Speedmaster': '⌚',
  'Gucci GG Marmont Bag': '👜',
  'Louis Vuitton Monogram': '👜',
  'Hermès Silk Scarf': '🧣',
  'Balenciaga Track Sneakers': '👟',
  'Yeezy 350 Boost': '👟',
  'Prada Nylon Backpack': '🎒',
  'Off-White Virgil Hoodie': '👕',
  'Supreme Box Logo Tee': '👕',
  'Air Jordan 1 Retro High': '👟',
  'Nike Air Max 90': '👟',
  'Adidas Yeezy Foam Runner': '👟',
  'New Balance 990v6': '👟',
  'Puma RS-X Reinvention': '👟',
}

export default function DashboardNavbar() {
  const { cartCount, addToCart } = useCart()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<any[] | null>(null)
  const [showNoResults, setShowNoResults] = useState(false)

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (query.trim() === '') {
      setSearchResults(null)
      setShowNoResults(false)
      return
    }
    const results = searchProducts(query)
    setSearchResults(results.length > 0 ? results : [])
    setShowNoResults(results.length === 0)
  }

  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id,
      title: product.title,
      originalPrice: product.originalPrice,
      image: productEmojis[product.title] || '📦',
    })
    setSearchQuery('')
    setSearchResults(null)
    setShowNoResults(false)
  }

  const handleBuyNow = (product: any) => {
    addToCart({
      id: product.id,
      title: product.title,
      originalPrice: product.originalPrice,
      image: productEmojis[product.title] || '📦',
    })
    setSearchQuery('')
    setSearchResults(null)
    setShowNoResults(false)
    router.push('/checkout')
  }

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
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search viral products, brands, and instant dopamine fixes..."
                className="w-full px-4 py-3 border-2 border-black bg-white text-[#1A1A1A] placeholder-gray-500 font-semibold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
              />
              <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />

              {/* Search Results Dropdown */}
              {(searchResults !== null || showNoResults) && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] z-50">
                  {searchResults && searchResults.length > 0 ? (
                    <ul className="max-h-64 overflow-y-auto">
                      {searchResults.map((result) => (
                        <li
                          key={result.id}
                          className="px-4 py-3 border-b border-gray-200 hover:bg-[#00FF87] font-semibold text-sm text-[#1A1A1A] transition-colors"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1">
                              <div className="font-black uppercase">{result.title}</div>
                              <div className="text-xs text-gray-600 mt-1">{result.category} • ₹{result.originalPrice.toLocaleString()}</div>
                              {!result.inStock && (
                                <div className="text-xs font-black text-red-600 mt-1">OUT OF STOCK</div>
                              )}
                            </div>
                            <div className="flex gap-1 items-center">
                              <button
                                onClick={() => handleAddToCart(result)}
                                disabled={!result.inStock}
                                className={`px-2 py-1 bg-white border border-black font-black text-xs uppercase hover:bg-[#00FF87] transition-all ${
                                  !result.inStock ? 'cursor-not-allowed opacity-50' : ''
                                }`}
                              >
                                ADD
                              </button>
                              <button
                                onClick={() => handleBuyNow(result)}
                                disabled={!result.inStock}
                                className={`px-2 py-1 bg-[#1A4454] text-[#00FF87] border border-black font-black text-xs uppercase hover:bg-[#0f2a34] transition-all ${
                                  !result.inStock ? 'cursor-not-allowed opacity-50' : ''
                                }`}
                              >
                                BUY
                              </button>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="px-4 py-4 text-center">
                      <div className="text-gray-500 font-semibold text-sm">No products found</div>
                      <div className="text-xs text-gray-400 mt-1">Try searching for "iPhone", "Jordan", "Rolex", etc.</div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Cart Button */}
          <Link href="/cart" className="relative min-w-fit">
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
          </Link>
        </div>
      </div>
    </nav>
  )
}
