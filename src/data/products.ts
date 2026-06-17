export type ProductCategory = 'signature' | 'limited' | 'archive'

export interface Product {
  id: string
  name: string
  subtitle: string
  colorway: string
  price: number
  category: ProductCategory
  imageSrc: string
  badge?: string          // e.g. "New", "Sold Out", "Last 3"
  configurableOptions: number
}

export const PRODUCTS: Product[] = [
  {
    id: 'arc-i-chalk',
    name: 'The Arc I',
    subtitle: 'Low-Top Sneaker',
    colorway: 'Chalk Suede / Noir Sole',
    price: 1450,
    category: 'signature',
    imageSrc: '/shoes/upscaled_transparent.png',
    configurableOptions: 14,
  },
  {
    id: 'arc-i-obsidian',
    name: 'The Arc I',
    subtitle: 'Low-Top Sneaker',
    colorway: 'Obsidian Leather / Bone Sole',
    price: 1450,
    category: 'signature',
    imageSrc: '/shoes/upscaled_transparent.png',
    configurableOptions: 14,
  },
  {
    id: 'arc-i-camel',
    name: 'The Arc I',
    subtitle: 'Low-Top Sneaker',
    colorway: 'Camel Calf / Ivory Sole',
    price: 1550,
    category: 'signature',
    imageSrc: '/shoes/upscaled_transparent.png',
    configurableOptions: 14,
  },
  {
    id: 'arc-ii-derby',
    name: 'The Arc II',
    subtitle: 'Derby Oxford',
    colorway: 'Bordeaux Calf / Natural Welt',
    price: 1750,
    category: 'signature',
    badge: 'New',
    imageSrc: '/shoes/upscaled_transparent.png',
    configurableOptions: 18,
  },
  {
    id: 'arc-ltd-001',
    name: 'Arc Limited 001',
    subtitle: 'High-Top Sneaker',
    colorway: 'Ecru Canvas / Bronze Hardware',
    price: 2200,
    category: 'limited',
    badge: 'Limited — 200 pairs',
    imageSrc: '/shoes/upscaled_transparent.png',
    configurableOptions: 8,
  },
  {
    id: 'arc-ltd-002',
    name: 'Arc Limited 002',
    subtitle: 'Chelsea Boot',
    colorway: 'Midnight Kudu / Gold Zipper',
    price: 2450,
    category: 'limited',
    badge: 'Last 12',
    imageSrc: '/shoes/upscaled_transparent.png',
    configurableOptions: 10,
  },
  {
    id: 'arc-arch-i',
    name: 'Arc Archive I',
    subtitle: 'Low-Top Sneaker',
    colorway: 'Tobacco Suede / Cream Sole',
    price: 1200,
    category: 'archive',
    badge: 'Sold Out',
    imageSrc: '/shoes/upscaled_transparent.png',
    configurableOptions: 0,
  },
  {
    id: 'arc-arch-ii',
    name: 'Arc Archive II',
    subtitle: 'Monk Strap',
    colorway: 'Tan Pebble Grain / Brass Buckle',
    price: 1350,
    category: 'archive',
    imageSrc: '/shoes/upscaled_transparent.png',
    configurableOptions: 0,
  },
]

export const CATEGORIES = [
  { key: 'all',       label: 'All' },
  { key: 'signature', label: 'Signature' },
  { key: 'limited',   label: 'Limited' },
  { key: 'archive',   label: 'Archive' },
] as const

export type CategoryKey = typeof CATEGORIES[number]['key']
