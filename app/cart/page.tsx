'use client'

import { useCart } from '@/lib/cart-context'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Trash2, ArrowLeft } from 'lucide-react'

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, clearCart } = useCart()
  const router = useRouter()

  const totalRetailPrice = items.reduce((sum, item) => sum + item.originalPrice * item.quantity, 0)
  const discountAmount = totalRetailPrice // 100% discount
  const totalDue = 0

  const handleCheckout = () => {
    if (items.length === 0) {
      alert('Your cart is empty!')
      return
    }
    router.push('/checkout')
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-[#FDFBF7] border-b-4 border-black shadow-[0px_4px_0px_0px_rgba(0,0,0,1)]">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/dashboard" className="flex items-center gap-2 font-black text-[#1A4454] uppercase hover:opacity-70">
              <ArrowLeft className="w-5 h-5" />
              Back to Shopping
            </Link>
            <h1 className="text-3xl font-black uppercase text-[#1A4454]">Your Cart</h1>
            {items.length > 0 && (
              <button
                onClick={() => clearCart()}
                className="px-4 py-2 border-2 border-black font-black text-xs uppercase text-red-600 hover:bg-red-50 transition-colors"
              >
                Clear Cart
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-2xl font-black text-[#1A4454] mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Start adding some placebo products to get that dopamine rush</p>
            <Link href="/dashboard" className="px-6 py-3 bg-[#1A4454] border-3 border-black text-[#00FF87] font-black uppercase shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Items List */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] p-4 flex items-center gap-4"
                  >
                    {/* Product Image */}
                    <div className="text-5xl">{item.image}</div>

                    {/* Product Details */}
                    <div className="flex-1">
                      <h3 className="font-black text-[#1A4454] uppercase text-sm">{item.title}</h3>
                      <p className="text-xs text-gray-600 font-semibold mt-1">
                        Retail: ₹{item.originalPrice.toLocaleString()} each
                      </p>
                    </div>

                    {/* Quantity Control */}
                    <div className="flex items-center gap-1 bg-white border-3 border-black p-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                      <button
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        className="w-8 h-8 flex items-center justify-center font-black text-base text-[#1A4454] hover:bg-[#00FF87] transition-colors border border-black"
                      >
                        −
                      </button>
                      <span className="w-8 h-8 flex items-center justify-center font-black text-base text-[#1A4454]">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center font-black text-base text-[#1A4454] hover:bg-[#00FF87] transition-colors border border-black"
                      >
                        +
                      </button>
                    </div>

                    {/* Price & Remove */}
                    <div className="flex flex-col items-end gap-2">
                      <div className="text-right">
                        <p className="text-xs text-gray-600 font-semibold line-through">
                          ₹{(item.originalPrice * item.quantity).toLocaleString()}
                        </p>
                        <p className="font-black text-[#00FF87] text-sm">₹0 FREE</p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 text-red-600 hover:bg-red-50 transition-colors border border-gray-300"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bill Details */}
            <div className="lg:col-span-1">
              <div className="bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6 sticky top-24">
                <h2 className="font-black text-[#1A4454] uppercase text-lg mb-6">Bill Details</h2>

                <div className="space-y-4 mb-6 pb-6 border-b-3 border-black">
                  {/* Retail Price */}
                  <div className="flex justify-between items-start">
                    <span className="font-semibold text-sm text-gray-700">Retail Price:</span>
                    <span className="line-through text-gray-500 font-black text-sm">
                      ₹{totalRetailPrice.toLocaleString()}
                    </span>
                  </div>

                  {/* Discount */}
                  <div className="bg-[#00FF87] border-2 border-black p-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    <div className="flex justify-between items-center">
                      <span className="font-black text-xs uppercase text-[#1A1A1A]">
                        PlaceboCart Coupon
                      </span>
                      <span className="font-black text-sm text-[#1A1A1A]">-₹{discountAmount.toLocaleString()}</span>
                    </div>
                    <p className="text-xs font-bold text-[#1A1A1A] mt-1">(-100%)</p>
                  </div>
                </div>

                {/* Total Due */}
                <div className="mb-6">
                  <p className="text-xs font-semibold text-gray-600 mb-2">TOTAL AMOUNT DUE</p>
                  <p className="font-black text-4xl text-[#00FF87] mb-1">
                    ₹{totalDue}
                  </p>
                  <p className="text-xs font-black text-[#1A4454]">ABSOLUTELY FREE!</p>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={handleCheckout}
                  className="w-full py-4 bg-[#1A4454] border-3 border-black text-[#00FF87] font-black uppercase text-lg shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
                >
                  Place Order
                </button>

                {/* Info */}
                <p className="text-xs text-gray-600 font-semibold mt-4 text-center">
                  Your dopamine rush awaits. Proceed with caution.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
