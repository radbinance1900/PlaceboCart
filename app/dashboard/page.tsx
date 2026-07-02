'use client'

import DashboardNavbar from '@/components/dashboard/navbar'
import CategoryStrip from '@/components/dashboard/category-strip'
import HeroBanner from '@/components/dashboard/hero-banner'
import ProductGrid from '@/components/dashboard/product-grid'
import Chatbot from '@/components/chatbot'

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      <DashboardNavbar />
      <CategoryStrip />
      <HeroBanner />
      <ProductGrid />
      <Chatbot />
    </div>
  )
}
