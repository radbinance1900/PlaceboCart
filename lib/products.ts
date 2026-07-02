export interface Product {
  id: number
  title: string
  originalPrice: number
  category: string
  categorySlug: string
  image?: string
  imageUrl?: string
  description?: string
  inStock?: boolean
}

export const products: Product[] = [
  // Trending Tech
  {
    id: 1,
    title: 'iPhone 16 Pro Max',
    originalPrice: 1199,
    category: 'Trending Tech',
    categorySlug: 'trending-tech',
    description: 'Latest Apple flagship with advanced features',
    inStock: true,
  },
  {
    id: 2,
    title: 'MacBook Pro M4',
    originalPrice: 1999,
    category: 'Trending Tech',
    categorySlug: 'trending-tech',
    description: 'Powerful laptop for professionals',
    inStock: true,
  },
  {
    id: 3,
    title: 'AirPods Pro Max',
    originalPrice: 549,
    category: 'Trending Tech',
    categorySlug: 'trending-tech',
    description: 'Premium spatial audio headphones',
    inStock: true,
  },
  {
    id: 4,
    title: 'iPad Pro 12.9"',
    originalPrice: 1099,
    category: 'Trending Tech',
    categorySlug: 'trending-tech',
    description: 'Powerful tablet with M4 chip',
    inStock: true,
  },
  {
    id: 5,
    title: 'Apple Watch Ultra',
    originalPrice: 799,
    category: 'Trending Tech',
    categorySlug: 'trending-tech',
    description: 'Advanced sports and fitness tracker',
    inStock: true,
  },

  // Viral Hype
  {
    id: 6,
    title: 'PlayStation 5',
    originalPrice: 499,
    category: 'Viral Hype',
    categorySlug: 'viral-hype',
    description: 'Next-gen gaming console',
    inStock: true,
  },
  {
    id: 7,
    title: 'DJI Air 3S Drone',
    originalPrice: 999,
    category: 'Viral Hype',
    categorySlug: 'viral-hype',
    description: '4K camera drone with long flight time',
    inStock: true,
  },
  {
    id: 8,
    title: 'Meta Quest 3',
    originalPrice: 499,
    category: 'Viral Hype',
    categorySlug: 'viral-hype',
    description: 'Advanced VR headset',
    inStock: true,
  },
  {
    id: 9,
    title: 'Nintendo Switch Pro',
    originalPrice: 349,
    category: 'Viral Hype',
    categorySlug: 'viral-hype',
    description: 'Enhanced gaming console',
    inStock: false,
  },
  {
    id: 10,
    title: 'Sony WH-1000XM5',
    originalPrice: 399,
    category: 'Viral Hype',
    categorySlug: 'viral-hype',
    description: 'Premium noise-canceling headphones',
    inStock: true,
  },

  // Luxury Drips
  {
    id: 11,
    title: 'Rolex Submariner',
    originalPrice: 9100,
    category: 'Luxury Drips',
    categorySlug: 'luxury-drips',
    description: 'Iconic luxury sports watch',
    inStock: true,
  },
  {
    id: 12,
    title: 'Omega Speedmaster',
    originalPrice: 6500,
    category: 'Luxury Drips',
    categorySlug: 'luxury-drips',
    description: 'Professional chronograph watch',
    inStock: true,
  },
  {
    id: 13,
    title: 'Gucci GG Marmont Bag',
    originalPrice: 2290,
    category: 'Luxury Drips',
    categorySlug: 'luxury-drips',
    description: 'Iconic luxury handbag',
    inStock: true,
  },
  {
    id: 14,
    title: 'Louis Vuitton Monogram',
    originalPrice: 1860,
    category: 'Luxury Drips',
    categorySlug: 'luxury-drips',
    description: 'Classic luxury travel bag',
    inStock: false,
  },
  {
    id: 15,
    title: 'Hermès Silk Scarf',
    originalPrice: 485,
    category: 'Luxury Drips',
    categorySlug: 'luxury-drips',
    description: 'Premium handcrafted silk accessory',
    inStock: true,
  },

  // Infinite Flex
  {
    id: 16,
    title: 'Balenciaga Track Sneakers',
    originalPrice: 695,
    category: 'Infinite Flex',
    categorySlug: 'infinite-flex',
    description: 'Fashion-forward chunky sneakers',
    inStock: true,
  },
  {
    id: 17,
    title: 'Yeezy 350 Boost',
    originalPrice: 220,
    category: 'Infinite Flex',
    categorySlug: 'infinite-flex',
    description: 'Iconic Kanye West design',
    inStock: true,
  },
  {
    id: 18,
    title: 'Prada Nylon Backpack',
    originalPrice: 2200,
    category: 'Infinite Flex',
    categorySlug: 'infinite-flex',
    description: 'Premium designer backpack',
    inStock: true,
  },
  {
    id: 19,
    title: 'Off-White Virgil Hoodie',
    originalPrice: 890,
    category: 'Infinite Flex',
    categorySlug: 'infinite-flex',
    description: 'Luxury streetwear piece',
    inStock: false,
  },
  {
    id: 20,
    title: 'Supreme Box Logo Tee',
    originalPrice: 348,
    category: 'Infinite Flex',
    categorySlug: 'infinite-flex',
    description: 'Iconic streetwear essential',
    inStock: true,
  },

  // Sneakers
  {
    id: 21,
    title: 'Air Jordan 1 Retro High',
    originalPrice: 170,
    category: 'Sneakers',
    categorySlug: 'sneakers',
    description: 'Classic Michael Jordan shoe',
    inStock: true,
  },
  {
    id: 22,
    title: 'Nike Air Max 90',
    originalPrice: 130,
    category: 'Sneakers',
    categorySlug: 'sneakers',
    description: 'Timeless running shoe',
    inStock: true,
  },
  {
    id: 23,
    title: 'Adidas Yeezy Foam Runner',
    originalPrice: 280,
    category: 'Sneakers',
    categorySlug: 'sneakers',
    description: 'Innovative foam design',
    inStock: true,
  },
  {
    id: 24,
    title: 'New Balance 990v6',
    originalPrice: 185,
    category: 'Sneakers',
    categorySlug: 'sneakers',
    description: 'Premium American-made sneaker',
    inStock: false,
  },
  {
    id: 25,
    title: 'Puma RS-X Reinvention',
    originalPrice: 120,
    category: 'Sneakers',
    categorySlug: 'sneakers',
    description: 'Retro-inspired modern sneaker',
    inStock: true,
  },
]

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter((p) => p.categorySlug === categorySlug)
}

export function getProductById(id: number): Product | undefined {
  return products.find((p) => p.id === id)
}

export function searchProducts(query: string): Product[] {
  const lowerQuery = query.toLowerCase()
  return products.filter((p) => p.title.toLowerCase().includes(lowerQuery))
}
