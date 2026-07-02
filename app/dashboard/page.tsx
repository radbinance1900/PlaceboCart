import DashboardNavbar from '@/components/dashboard/navbar'
import HeroBanner from '@/components/dashboard/hero-banner'
import Marquee from '@/components/dashboard/marquee'
import ProductSection from '@/components/dashboard/product-section'
import ChatbotWidget from '@/components/chatbot-widget'

const productCategories = [
  {
    title: 'Trending Tech',
    icon: '⚡',
    products: [
      { id: 1, title: 'iPhone 16 Pro Max', image: '📱', originalPrice: 149900, finalPrice: 0 },
      { id: 2, title: 'Meta Quest 3S', image: '🥽', originalPrice: 89999, finalPrice: 0 },
      { id: 3, title: 'Apple Watch Pro', image: '⌚', originalPrice: 79900, finalPrice: 0 },
    ],
  },
  {
    title: 'Viral Hype',
    icon: '🔥',
    products: [
      { id: 4, title: 'PlayStation 5 Pro', image: '🎮', originalPrice: 79999, finalPrice: 0 },
      { id: 5, title: 'Nintendo Switch OLED', image: '🕹️', originalPrice: 35999, finalPrice: 0 },
      { id: 6, title: 'Meta Quest Pro', image: '🎯', originalPrice: 49999, finalPrice: 0 },
    ],
  },
  {
    title: 'Luxury Drips',
    icon: '👑',
    products: [
      { id: 7, title: 'Rolex Submariner', image: '⌚', originalPrice: 899999, finalPrice: 0 },
      { id: 8, title: 'Omega Seamaster', image: '⏰', originalPrice: 699999, finalPrice: 0 },
      { id: 9, title: 'TAG Heuer Carrera', image: '🕰️', originalPrice: 549999, finalPrice: 0 },
    ],
  },
  {
    title: 'Infinite Flex',
    icon: '✨',
    products: [
      { id: 10, title: 'MacBook Pro 16"', image: '💻', originalPrice: 299999, finalPrice: 0 },
      { id: 11, title: 'Dell XPS 15', image: '🖥️', originalPrice: 189999, finalPrice: 0 },
      { id: 12, title: 'Lenovo ThinkPad X1', image: '⌨️', originalPrice: 139999, finalPrice: 0 },
    ],
  },
  {
    title: 'Sneakers',
    icon: '👟',
    products: [
      { id: 13, title: 'Air Jordan 1 Retro', image: '👟', originalPrice: 24999, finalPrice: 0 },
      { id: 14, title: 'Nike Air Max 90', image: '🏃', originalPrice: 14999, finalPrice: 0 },
      { id: 15, title: 'Adidas Yeezy 350', image: '👞', originalPrice: 19999, finalPrice: 0 },
    ],
  },
]

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      <DashboardNavbar />
      <HeroBanner />
      <Marquee />
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="space-y-6">
          {productCategories.map((category) => (
            <ProductSection
              key={category.title}
              title={category.title}
              icon={category.icon}
              products={category.products}
            />
          ))}
        </div>
      </div>
      <ChatbotWidget />
    </div>
  )
}
