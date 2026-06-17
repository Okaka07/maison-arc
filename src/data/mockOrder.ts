import {
  HARDWARE_OPTIONS,
  LACE_COLORS,
  LINING_OPTIONS,
  SOLE_COLORS,
  UPPER_COLORS,
  UPPER_MATERIALS,
  type ConfigState,
} from './configuratorOptions'
import { PRODUCTS } from './products'
import { calcPrice } from '../utils/calcPrice'

export interface MockOrderItem {
  id: string
  productId: string
  config: ConfigState
  quantity: number
  status: string
}

export const MOCK_ORDER_ITEMS: MockOrderItem[] = [
  {
    id: 'order-arc-i-chalk',
    productId: 'arc-i-chalk',
    quantity: 1,
    status: 'Draft commission',
    config: {
      material: 'suede',
      color: 'chalk',
      sole: 'noir',
      lining: 'natural-vachetta',
      hardware: 'gold',
      lace: 'cream',
      monogram: 'MA',
      size: 42,
    },
  },
  {
    id: 'order-arc-ii-bordeaux',
    productId: 'arc-ii-derby',
    quantity: 1,
    status: 'Ready for review',
    config: {
      material: 'calf',
      color: 'bordeaux',
      sole: 'natural',
      lining: 'cognac-nappa',
      hardware: 'gold',
      lace: 'black',
      monogram: '',
      size: 43,
    },
  },
]

export const MOCK_CLIENT_FIELDS = [
  ['Full name', 'Alexandre Moreau'],
  ['Email', 'alexandre.moreau@example.com'],
  ['Phone', '+44 20 7946 0182'],
] as const

export const MOCK_DELIVERY_FIELDS = [
  ['Address', '18 Mount Street'],
  ['City', 'London'],
  ['Country', 'United Kingdom'],
  ['Postcode', 'W1K 2RN'],
] as const

export const MOCK_ORDER_REFERENCE = 'MA-260617-042'

export function productById(productId: string) {
  return PRODUCTS.find((product) => product.id === productId) ?? PRODUCTS[0]
}

export function optionLabel<T extends { id: string; label: string }>(options: T[], id: string) {
  return options.find((option) => option.id === id)?.label ?? id
}

export function orderItemTotal(item: MockOrderItem) {
  return calcPrice(productById(item.productId).price, item.config) * item.quantity
}

export function orderTotals(items: MockOrderItem[] = MOCK_ORDER_ITEMS) {
  const subtotal = items.reduce((sum, item) => sum + orderItemTotal(item), 0)
  const atelierDeposit = Math.round(subtotal * 0.2)

  return {
    subtotal,
    atelierDeposit,
    remainingBalance: subtotal - atelierDeposit,
  }
}

export function orderItemSpecs(item: MockOrderItem) {
  return [
    ['Upper', `${optionLabel(UPPER_COLORS, item.config.color)} ${optionLabel(UPPER_MATERIALS, item.config.material)}`],
    ['Sole', optionLabel(SOLE_COLORS, item.config.sole)],
    ['Lining', optionLabel(LINING_OPTIONS, item.config.lining)],
    ['Hardware', optionLabel(HARDWARE_OPTIONS, item.config.hardware)],
    ['Lace', optionLabel(LACE_COLORS, item.config.lace)],
    ['Size', item.config.size ? `EU ${item.config.size}` : 'Not selected'],
    ['Monogram', item.config.monogram || 'None'],
  ] as const
}

export function orderItemShortSpecs(item: MockOrderItem) {
  return [
    optionLabel(UPPER_COLORS, item.config.color),
    optionLabel(UPPER_MATERIALS, item.config.material),
    item.config.size ? `EU ${item.config.size}` : 'Size pending',
  ]
}
