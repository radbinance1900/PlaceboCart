'use client'

import { ShoppingCart } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/lib/cart-context'

const products = [
  {
    id: 1,
    title: 'iPhone 16 Pro Max',
    category: 'Luxury Tech',
    image: '📱',
    originalPrice: 149900,
    finalPrice: 0,
  },
  {
    id: 2,
    title: 'Rolex Submariner',
    category: 'Luxury Watches',
    image: '⌚',
    originalPrice: 899999,
    finalPrice: 0,
  },
  {
    id: 3,
    title: 'Air Jordan 1 Retro',
    category: 'Premium Sneakers',
    image: '👟',
    originalPrice: 24999,
    finalPrice: 0,
  },
  {
    id: 4,
    title: 'PlayStation 5 Pro',
    category: 'Gaming Consoles',
    image: '🎮',
    originalPrice: 79999,
    finalPrice: 0,
  },
  {
    id: 5,
    title: 'MacBook Pro 16"',
    category: 'Premium Laptops',
    image: '💻',
    originalPrice: 299999,
    finalPrice: 0,
  },
  {
    id: 6,
    title: 'AirPods Pro Max',
    category: 'Audio',
    image: '🎧',
    originalPrice: 59900,
    finalPrice: 0,
  },
  {
    id: 7,
    title: 'Canon R5 Camera',
    category: 'Professional Gear',
    image: '📷',
    originalPrice: 449999,
    finalPrice: 0,
  },
  {
    id: 8,
    title: 'DJI Air 3S Drone',
    category: 'Tech Gadgets',
    image: '🚁',
    originalPrice: 149999,
    finalPrice: 0,
  },
]

export default function ProductGrid() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const { addToCart } = useCart()
  const router = useRouter()

  const handleAddToCart = (product: (typeof products)[0]) => {
    addToCart({
      id: product.id,
      title: product.title,
      originalPrice: product.originalPrice,
      image: product.image,
    })
  }

  const handleBuyNow = (product: (typeof products)[0]) => {
    // Add to cart and redirect to checkout
    addToCart({
      id: product.id,
      title: product.title,
      originalPrice: product.originalPrice,
      image: product.image,
    })
    router.push('/checkout')
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h2 className="text-4xl font-black uppercase text-[#1A4454] mb-8">Curated Collection</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            onMouseEnter={() => setHoveredId(product.id)}
            onMouseLeave={() => setHoveredId(null)}
            className="bg-white border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-150 flex flex-col"
          >
            {/* Product Image */}
            <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 border-b-3 border-black flex items-center justify-center text-6xl">
              {product.image}
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
                    ₹{product.finalPrice} FREE
                  </span>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-2 mt-4 pt-4 border-t-2 border-black">
                <button
                  onClick={() => handleAddToCart(product)}
                  className="flex-1 py-2 px-2 bg-white border-2 border-black font-black text-xs uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center gap-1"
                >
                  <ShoppingCart className="w-3 h-3" />
                  Add
                </button>
                <button
                  onClick={() => handleBuyNow(product)}
                  className="flex-1 py-2 px-2 bg-[#1A4454] border-2 border-black font-black text-xs uppercase text-[#00FF87] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
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
