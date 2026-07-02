import DashboardNavbar from '@/components/dashboard/navbar'
import MarqueeBanner from '@/components/dashboard/marquee-banner'
import CategoryStrip from '@/components/dashboard/category-strip'
import HeroBanner from '@/components/dashboard/hero-banner'
import ProductGrid from '@/components/dashboard/product-grid'
import ChatbotWidget from '@/components/chatbot-widget'

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      <DashboardNavbar />
      <MarqueeBanner />
      <CategoryStrip />
      <HeroBanner />
      <ProductGrid />
      <ChatbotWidget />
    </div>
  )
}
