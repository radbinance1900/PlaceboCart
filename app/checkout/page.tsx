'use client'

import { useCart } from '@/lib/cart-context'
import { useRouter } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

export default function CheckoutPage() {
  const { items, clearCart } = useCart()
  const router = useRouter()
  const audioRef = useRef<HTMLAudioElement>(null)
  const [paymentStage, setPaymentStage] = useState<'summary' | 'processing' | 'success'>('summary')
  const [transactionId, setTransactionId] = useState('')

  const totalRetailPrice = items.reduce((sum, item) => sum + item.originalPrice * item.quantity, 0)
  const discountAmount = totalRetailPrice
  const totalDue = 0

  useEffect(() => {
    // Preload sound
    const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAAB9AAACABAAZGF0YQoGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==')
    audioRef.current = audio
  }, [])

  const playSuccessSound = () => {
    try {
      // Create a simple beep sound using Web Audio API
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      const now = audioContext.currentTime

      // Create oscillator for the beep
      const osc = audioContext.createOscillator()
      const gain = audioContext.createGain()

      osc.connect(gain)
      gain.connect(audioContext.destination)

      osc.frequency.setValueAtTime(800, now)
      osc.frequency.setValueAtTime(1000, now + 0.1)
      gain.gain.setValueAtTime(0.3, now)
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2)

      osc.start(now)
      osc.stop(now + 0.2)
    } catch (e) {
      console.log('[v0] Sound playback not available')
    }
  }

  const handleCheckout = async () => {
    setPaymentStage('processing')

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Generate transaction ID
    const txId = 'TXN' + Date.now()
    setTransactionId(txId)

    // Play success sound and show success screen
    playSuccessSound()
    setPaymentStage('success')
  }

  const handleNewOrder = () => {
    clearCart()
    router.push('/dashboard')
  }

  if (paymentStage === 'processing') {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white border-4 border-black p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] max-w-md w-full mx-4"
        >
          <div className="flex flex-col items-center gap-4">
            <div className="animate-spin">
              <div className="w-12 h-12 border-4 border-[#1A4454] border-t-[#00FF87]" style={{ borderRadius: '50%' }} />
            </div>
            <h2 className="font-black text-lg text-[#1A4454] text-center uppercase">
              Processing Payment
            </h2>
            <p className="text-sm text-gray-600 text-center font-semibold">
              Securely via Placebo Gateways... Do not close this tab.
            </p>
          </div>
        </motion.div>
      </div>
    )
  }

  if (paymentStage === 'success') {
    return (
      <div className="fixed inset-0 bg-[#1A4454] flex items-center justify-center z-50 overflow-hidden">
        <div className="relative w-full h-full flex flex-col items-center justify-center">
          {/* Animated checkmark */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: 'spring',
              stiffness: 100,
              damping: 10,
              delay: 0.3,
            }}
            className="w-32 h-32 bg-[#00FF87] border-4 border-black rounded-full flex items-center justify-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] mb-8"
          >
            <motion.svg
              className="w-16 h-16 text-[#1A4454]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={4}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <motion.path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </motion.svg>
          </motion.div>

          {/* Success Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl font-black text-white uppercase mb-4">Payment Successful!</h1>
            <p className="text-xl text-[#00FF87] font-bold mb-8">Your dopamine receptors have been successfully updated.</p>

            {/* Transaction Details */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 }}
              className="bg-white border-3 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-8 max-w-md mx-auto"
            >
              <div className="space-y-3">
                <div className="border-b-2 border-black pb-3">
                  <p className="text-xs font-semibold text-gray-600 uppercase">Transaction ID</p>
                  <p className="font-black text-lg text-[#1A4454] font-mono">{transactionId}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-600 uppercase">Amount Paid</p>
                  <p className="font-black text-2xl text-[#00FF87]">₹0</p>
                </div>
                <div className="pt-2 border-t-2 border-black">
                  <p className="text-xs font-bold text-[#1A4454] text-center">
                    Bank account fully intact!
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="flex gap-4 justify-center"
            >
              <button
                onClick={handleNewOrder}
                className="px-8 py-4 bg-[#00FF87] border-3 border-black text-[#1A4454] font-black uppercase shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all"
              >
                Continue Shopping
              </button>
              <Link
                href="/dashboard"
                className="px-8 py-4 bg-white border-3 border-black text-[#1A4454] font-black uppercase shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all"
              >
                Dashboard
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    )
  }

  // Summary Stage
  return (
    <div className="min-h-screen bg-[#FDFBF7] py-8">
      <div className="max-w-7xl mx-auto px-6">
        <Link href="/cart" className="inline-flex items-center gap-2 text-[#1A4454] font-black uppercase mb-8 hover:opacity-70">
          ← Back to Cart
        </Link>

        <h1 className="text-4xl font-black uppercase text-[#1A4454] mb-8">100% Free Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items List */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] p-4 flex items-center gap-4"
                >
                  {/* Product Image */}
                  <div className="text-5xl">{item.image}</div>

                  {/* Product Details */}
                  <div className="flex-1">
                    <h3 className="font-black text-[#1A4454] uppercase text-sm">{item.title}</h3>
                    <p className="text-xs text-gray-600 font-semibold mt-2">
                      Qty: {item.quantity} × ₹{item.originalPrice.toLocaleString()}
                    </p>
                  </div>

                  {/* Subtotal */}
                  <div className="text-right">
                    <p className="text-xs text-gray-600 font-semibold line-through">
                      ₹{(item.originalPrice * item.quantity).toLocaleString()}
                    </p>
                    <p className="font-black text-[#00FF87]">₹0 FREE</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Bill Details */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6 sticky top-8"
            >
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
                <p className="font-black text-4xl text-[#00FF87] mb-1">₹{totalDue}</p>
                <p className="text-xs font-black text-[#1A4454]">ABSOLUTELY FREE!</p>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                className="w-full py-4 bg-[#1A4454] border-3 border-black text-[#00FF87] font-black uppercase text-lg shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
              >
                Administer Dose
              </button>

              <p className="text-xs text-gray-600 font-semibold mt-4 text-center">
                Your dopamine rush awaits.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
