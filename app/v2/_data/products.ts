/**
 * Real protech.mn catalog — scraped 2026-05 from protech.mn product categories.
 * Prices are live MNT pulled from category listings.
 */

export type Category = 'laptops' | 'desktops' | 'tablets' | 'phones' | 'audio' | 'wearables' | 'accessories'
export type Brand = 'apple' | 'lenovo' | 'dell' | 'microsoft'
export type Pastel = 'lilac' | 'mint' | 'peach' | 'cream' | 'sky' | 'coral' | 'sage' | 'butter' | 'dark'

export type ProductColor = {
  id: string
  name: string
  hex: string
}

export type Product = {
  slug: string
  category: Category
  brand: Brand
  name: string
  tagline: string
  description: string
  image: string
  whiteBg: boolean
  pastel: Pastel
  basePrice: number
  monthlyPrice: number
  colors: ProductColor[]
  capacities?: { id: string; label: string; priceDelta: number }[]
  chip?: string
  display?: string
  specs: string[]
  featured?: boolean
}

export const brandLabels: Record<Brand, string> = {
  apple: 'Apple',
  lenovo: 'Lenovo',
  dell: 'Dell',
  microsoft: 'Microsoft',
}

export const products: Product[] = [
  {
    slug: 'macbook-pro-m4',
    category: 'laptops',
    brand: 'apple',
    name: 'MacBook Pro M4',
    tagline: 'For the team that ships on Friday.',
    description:
      'M4 Pro silicon, Liquid Retina XDR, 22-hour battery. The premium pick when teams want a Mac.',
    image: '/v2/products/protech/macbook-pro-m4.png',
    whiteBg: false,
    pastel: 'dark',
    basePrice: 5_900_000,
    monthlyPrice: 245_833,
    colors: [
      { id: 'silver', name: 'Silver', hex: '#d8d8da' },
      { id: 'space-black', name: 'Space Black', hex: '#2a2a2d' },
    ],
    capacities: [
      { id: '512gb', label: '512 GB', priceDelta: 0 },
      { id: '1tb', label: '1 TB', priceDelta: 700_000 },
    ],
    chip: 'Apple M4 Pro',
    display: '14.2-inch Liquid Retina XDR',
    specs: ['M4 Pro · 12-core CPU', '16 GB unified memory', '22-hour battery', '3 × Thunderbolt 4'],
    featured: true,
  },
  {
    slug: 'macbook-air-m4-13',
    category: 'laptops',
    brand: 'apple',
    name: 'MacBook Air M4 13"',
    tagline: 'Quiet power. All-day battery.',
    description:
      'M4 chip in the thinnest, lightest Mac. Eighteen hours, fanless, the writer\'s laptop.',
    image: '/v2/products/protech/macbook-air-m4.png',
    whiteBg: false,
    pastel: 'lilac',
    basePrice: 3_800_000,
    monthlyPrice: 158_333,
    colors: [
      { id: 'silver', name: 'Silver', hex: '#d8d8da' },
      { id: 'starlight', name: 'Starlight', hex: '#e6dfd1' },
      { id: 'midnight', name: 'Midnight', hex: '#1c1c20' },
      { id: 'sky-blue', name: 'Sky Blue', hex: '#a4c8de' },
    ],
    capacities: [
      { id: '256gb', label: '256 GB', priceDelta: 0 },
      { id: '512gb', label: '512 GB', priceDelta: 600_000 },
    ],
    chip: 'Apple M4',
    display: '13.6-inch Liquid Retina',
    specs: ['Apple M4 · 10-core CPU', '16 GB unified memory', '18-hour battery', 'Fanless design'],
    featured: true,
  },
  {
    slug: 'lenovo-ultra-9',
    category: 'laptops',
    brand: 'lenovo',
    name: 'Lenovo Ultra 9-185H',
    tagline: 'Workstation power, ThinkPad heritage.',
    description:
      'Core Ultra 9 with 32 GB DDR5. Built for engineers, designers, and the team running the model.',
    image: '/v2/products/protech/lenovo-ultra-9.png',
    whiteBg: false,
    pastel: 'cream',
    basePrice: 4_400_000,
    monthlyPrice: 183_333,
    colors: [
      { id: 'graphite', name: 'Graphite', hex: '#3a3a3d' },
    ],
    capacities: [
      { id: '512gb', label: '512 GB', priceDelta: 0 },
      { id: '1tb', label: '1 TB', priceDelta: 500_000 },
    ],
    chip: 'Intel Core Ultra 9-185H',
    display: '14-inch 2.8K OLED',
    specs: ['Intel Core Ultra 9', '32 GB DDR5', '16-hour battery', 'MIL-STD durability'],
  },
  {
    slug: 'dell-pro-14',
    category: 'laptops',
    brand: 'dell',
    name: 'Dell Pro 14',
    tagline: 'Compact. Quiet. Capital-light.',
    description:
      'Intel Core Ultra 7-255U with all-day battery in a 1.4 kg frame. The right laptop for teams that live in airports.',
    image: '/v2/products/protech/dell-pro-14.png',
    whiteBg: false,
    pastel: 'mint',
    basePrice: 3_300_000,
    monthlyPrice: 137_500,
    colors: [
      { id: 'platinum', name: 'Platinum', hex: '#e3e3e3' },
    ],
    capacities: [
      { id: '256gb', label: '256 GB', priceDelta: 0 },
      { id: '512gb', label: '512 GB', priceDelta: 400_000 },
    ],
    chip: 'Intel Core Ultra 7-255U',
    display: '14-inch FHD+',
    specs: ['Intel Core Ultra 7-255U', '16 GB LPDDR5x', '19-hour battery', 'Wi-Fi 7'],
  },
  {
    slug: 'dell-pro-16',
    category: 'laptops',
    brand: 'dell',
    name: 'Dell Pro 16',
    tagline: 'Big screen, business build.',
    description:
      'Sixteen inches of FHD+ for the team that lives in spreadsheets, Figma, and Excel pivot tables.',
    image: '/v2/products/protech/dell-pro-16.png',
    whiteBg: false,
    pastel: 'sage',
    basePrice: 3_800_000,
    monthlyPrice: 158_333,
    colors: [
      { id: 'graphite', name: 'Graphite', hex: '#3a3a3d' },
    ],
    capacities: [
      { id: '512gb', label: '512 GB', priceDelta: 0 },
      { id: '1tb', label: '1 TB', priceDelta: 500_000 },
    ],
    chip: 'Intel Core Ultra 7-255U',
    display: '16-inch FHD+',
    specs: ['Intel Core Ultra 7-255U', '16 GB LPDDR5x', '18-hour battery', 'Numpad keyboard'],
    featured: true,
  },
  {
    slug: 'ipad-air-m4-11',
    category: 'tablets',
    brand: 'apple',
    name: 'iPad Air M4 11"',
    tagline: 'The lightest Pro.',
    description: 'For field teams, design crews, and execs who present for a living. M4, Wi-Fi + Cellular.',
    image: '/v2/products/protech/ipad-air-m4.png',
    whiteBg: false,
    pastel: 'butter',
    basePrice: 2_850_000,
    monthlyPrice: 118_750,
    colors: [
      { id: 'space-grey', name: 'Space Grey', hex: '#5a5a5e' },
      { id: 'starlight', name: 'Starlight', hex: '#e6dfd1' },
      { id: 'blue', name: 'Sky Blue', hex: '#a4c8de' },
    ],
    capacities: [
      { id: '128gb', label: '128 GB', priceDelta: 0 },
      { id: '256gb', label: '256 GB', priceDelta: 400_000 },
    ],
    chip: 'Apple M4',
    display: '11-inch Liquid Retina',
    specs: ['Apple M4', 'Apple Pencil Pro support', 'Wi-Fi 6E + Cellular', 'All-day battery'],
    featured: true,
  },
  {
    slug: 'ipad-a16-11',
    category: 'tablets',
    brand: 'apple',
    name: 'iPad (A16) 11"',
    tagline: 'The everyday iPad, sharper.',
    description: 'A16 Bionic in the entry iPad. For training, kiosks, and the field crew.',
    image: '/v2/products/protech/ipad-a16.png',
    whiteBg: false,
    pastel: 'sky',
    basePrice: 1_550_000,
    monthlyPrice: 64_583,
    colors: [
      { id: 'silver', name: 'Silver', hex: '#d8d8da' },
      { id: 'pink', name: 'Pink', hex: '#f4c2c2' },
      { id: 'blue', name: 'Blue', hex: '#a4c8de' },
      { id: 'yellow', name: 'Yellow', hex: '#f4d36c' },
    ],
    capacities: [
      { id: '128gb', label: '128 GB', priceDelta: 0 },
      { id: '256gb', label: '256 GB', priceDelta: 350_000 },
    ],
    chip: 'A16 Bionic',
    display: '11-inch Liquid Retina',
    specs: ['A16 Bionic', 'Apple Pencil (USB-C) support', 'Wi-Fi 6', 'All-day battery'],
  },
  {
    slug: 'airpods-pro-2',
    category: 'audio',
    brand: 'apple',
    name: 'AirPods Pro 2',
    tagline: 'Calls that cut through.',
    description: 'H2 chip with active noise cancellation tuned for open-plan offices and airport lounges.',
    image: '/v2/products/protech/airpods-pro-2.png',
    whiteBg: false,
    pastel: 'coral',
    basePrice: 750_000,
    monthlyPrice: 31_250,
    colors: [{ id: 'white', name: 'White', hex: '#fafafa' }],
    chip: 'Apple H2',
    specs: ['Active noise cancellation', 'Adaptive transparency', 'MagSafe charging case', 'IP54'],
  },
  {
    slug: 'magic-keyboard-m4-11',
    category: 'accessories',
    brand: 'apple',
    name: 'Magic Keyboard for iPad M4 (11")',
    tagline: 'Trackpad. Backlit. Black.',
    description: 'The keyboard that turns the iPad Air into a laptop. Function row, USB-C passthrough.',
    image: '/v2/products/protech/magic-keyboard.png',
    whiteBg: false,
    pastel: 'peach',
    basePrice: 1_250_000,
    monthlyPrice: 52_083,
    colors: [{ id: 'black', name: 'Black', hex: '#1c1c1f' }],
    specs: ['Backlit keys', 'Trackpad', 'USB-C passthrough charging', 'Function row'],
  },
  {
    slug: 'apple-pencil-pro',
    category: 'accessories',
    brand: 'apple',
    name: 'Apple Pencil Pro',
    tagline: 'Squeeze. Roll. Haptic.',
    description: 'For the design team. Barrel roll for brush rotation, haptic feedback, Find My.',
    image: '/v2/products/protech/pencil-pro.png',
    whiteBg: false,
    pastel: 'mint',
    basePrice: 500_000,
    monthlyPrice: 20_833,
    colors: [{ id: 'white', name: 'White', hex: '#fafafa' }],
    specs: ['Squeeze gesture', 'Barrel roll', 'Haptic feedback', 'Find My support'],
  },
]

export const categoryLabels: Record<Category, string> = {
  laptops: 'Laptops',
  desktops: 'Desktops',
  tablets: 'Tablets',
  phones: 'Phones',
  audio: 'Audio',
  wearables: 'Wearables',
  accessories: 'Accessories',
}

export function findProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function fmtMNT(value: number): string {
  return '₮' + value.toLocaleString('en-US')
}
