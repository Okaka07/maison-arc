import {
  UPPER_MATERIALS,
  LINING_OPTIONS,
  MONOGRAM_PRICE,
  type ConfigState,
} from '../data/configuratorOptions'

export function calcPrice(basePrice: number, config: ConfigState): number {
  let price = basePrice
  const mat = UPPER_MATERIALS.find((m) => m.id === config.material)
  if (mat?.priceAdd) price += mat.priceAdd
  const lin = LINING_OPTIONS.find((l) => l.id === config.lining)
  if (lin?.priceAdd) price += lin.priceAdd
  if (config.monogram.trim().length > 0) price += MONOGRAM_PRICE
  return price
}
