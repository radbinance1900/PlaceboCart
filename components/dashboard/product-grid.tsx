'use client'

import { ShoppingCart } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/lib/cart-context'
import { products } from '@/lib/products'

// Product emoji mapping for easy updates later
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

export default function ProductGrid() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const { addToCart } = useCart()
  const router = useRouter()

  const handleAddToCart = (product: (typeof products)[0]) => {
    if (!product.inStock) return
    addToCart({
      id: product.id,
      title: product.title,
      originalPrice: product.originalPrice,
      image: productEmojis[product.title] || '📦',
    })
  }

  const handleBuyNow = (product: (typeof products)[0]) => {
    if (!product.inStock) return
    addToCart({
      id: product.id,
      title: product.title,
      originalPrice: product.originalPrice,
      image: productEmojis[product.title] || '📦',
    })
    router.push('/checkout')
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h2 className="text-4xl font-black uppercase text-[#1A4454] mb-8">Featured Products</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products.slice(0, 8).map((product) => (
          <div
            key={product.id}
            onMouseEnter={() => setHoveredId(product.id)}
            onMouseLeave={() => setHoveredId(null)}
            className={`bg-white border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-150 flex flex-col ${
              !product.inStock ? 'opacity-60' : ''
            }`}
          >
            {/* Product Image */}
            <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 border-b-3 border-black flex items-center justify-center text-6xl relative">
              {productEmojis[product.title] || '📦'}
              {!product.inStock && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <span className="bg-[#1A4454] text-[#00FF87] font-black px-3 py-2 text-xs border-2 border-black">
                    NOT AVAILABLE
                  </span>
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="p-4 flex flex-col flex-1">
              {/* Title and Category */}
              <h3 className="font-black text-[#1A4454] uppercase text-sm leading-tight">
                {product.title}
              </h3>
              <p className="text-xs font-semibold text-gray-600 mt-1 mb-3">{product.category}</p>

              {/* Price Section */}
              <div className="mb-auto space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold line-through text-gray-500">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                  <span className="bg-[#00FF87] border-2 border-black px-2 py-1 font-black text-xs">
                    ₹0 FREE
                  </span>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-2 mt-4 pt-4 border-t-2 border-black">
               <button
  onClick={() => handleAddToCart(product)}
  disabled={!product.inStock}
  className={`flex-1 py-2 px-2 bg-[#1A4454] border-2 border-black font-black text-xs uppercase text-[#00FF87] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center gap-1 ${
    !product.inStock ? 'cursor-not-allowed opacity-50' : ''
  }`}
>
  <ShoppingCart className="w-3 h-3 text-[#00FF87]" />
  Add
</button>
                <button
                  onClick={() => handleBuyNow(product)}
                  disabled={!product.inStock}
                  className={`flex-1 py-2 px-2 bg-[#1A4454] border-2 border-black font-black text-xs uppercase text-[#00FF87] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center gap-1 ${
  !product.inStock ? 'cursor-not-allowed opacity-50' : ''
}`}
                  
                >
                  Buy
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Info */}
      <div className="mt-12 pt-8 border-t-3 border-black">
        <p className="text-center text-sm font-semibold text-gray-600">
          All prices shown include the 100% PLACEBO DISCOUNT. Enjoy guilt-free shopping!
        </p>
      </div>
    </div>
  )
}
