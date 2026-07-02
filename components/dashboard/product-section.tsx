'use client'

import { ShoppingCart, ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/lib/cart-context'

interface Product {
  id: number
  title: string
  image: string
  originalPrice: number
  finalPrice: number
}

interface ProductSectionProps {
  title: string
  products: Product[]
  icon: React.ReactNode
}

export default function ProductSection({ title, products, icon }: ProductSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const { addToCart } = useCart()
  const router = useRouter()

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      title: product.title,
      originalPrice: product.originalPrice,
      image: product.image,
    })
  }

  const handleBuyNow = (product: Product) => {
    addToCart({
      id: product.id,
      title: product.title,
      originalPrice: product.originalPrice,
      image: product.image,
    })
    router.push('/checkout')
  }

  return (
    <div className="bg-white border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-6 py-4 bg-[#1A4454] border-b-3 border-black text-[#00FF87] flex items-center justify-between hover:bg-[#2a5d70] transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">{icon}</span>
          <h2 className="font-black uppercase text-lg">{title}</h2>
        </div>
        <ChevronDown
          className={`w-6 h-6 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Content */}
      {isExpanded && (
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product) => (
              <div
                key={product.id}
                onMouseEnter={() => setHoveredId(product.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="bg-[#FDFBF7] border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] p-4 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
              >
                {/* Image */}
                <div className="bg-white border-2 border-black p-4 mb-3 flex items-center justify-center min-h-32">
                  <div className="text-6xl">{product.image}</div>
                </div>

                {/* Title */}
                <h3 className="font-black text-[#1A4454] uppercase text-xs mb-2 line-clamp-2">
                  {product.title}
                </h3>

                {/* Price */}
                <div className="mb-3">
                  <p className="text-xs text-gray-600 font-semibold line-through">
                    ₹{product.originalPrice.toLocaleString()}
                  </p>
                  <p className="text-lg font-black text-[#00FF87]">FREE</p>
                </div>

                {/* Buttons - Visible */}
                <div className="flex gap-2 border-t-2 border-black pt-3">
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
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
