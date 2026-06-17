export interface SwatchOption {
  id: string
  label: string
  hex: string       // display color in UI
  priceAdd?: number // added to base price
}

export interface TextOption {
  id: string
  label: string
  priceAdd?: number
}

export interface SizeOption {
  eu: number
  uk: number
  us: number
  available: boolean
}

// ── Upper Material ──
export const UPPER_MATERIALS: TextOption[] = [
  { id: 'suede',        label: 'Suede' },
  { id: 'full-grain',   label: 'Full-Grain Leather' },
  { id: 'calf',         label: 'Calf Leather',       priceAdd: 100 },
  { id: 'canvas',       label: 'Canvas' },
]

// ── Upper Color ──
export const UPPER_COLORS: SwatchOption[] = [
  { id: 'chalk',    label: 'Chalk',    hex: '#e8e0ce' },
  { id: 'obsidian', label: 'Obsidian', hex: '#1c1c1c' },
  { id: 'camel',    label: 'Camel',    hex: '#c2935a' },
  { id: 'bordeaux', label: 'Bordeaux', hex: '#6b2134' },
  { id: 'ecru',     label: 'Ecru',     hex: '#f0e8d0' },
  { id: 'midnight', label: 'Midnight', hex: '#0f1524' },
  { id: 'tobacco',  label: 'Tobacco',  hex: '#7a5030' },
  { id: 'forest',   label: 'Forest',   hex: '#1e3325' },
]

// ── Sole ──
export const SOLE_COLORS: SwatchOption[] = [
  { id: 'noir',    label: 'Noir',    hex: '#0d0d0d' },
  { id: 'bone',    label: 'Bone',    hex: '#d4c8a8' },
  { id: 'ivory',   label: 'Ivory',   hex: '#e8e0cc' },
  { id: 'natural', label: 'Natural', hex: '#a07848' },
  { id: 'sand',    label: 'Sand',    hex: '#c8b888' },
]

// ── Lining ──
export const LINING_OPTIONS: TextOption[] = [
  { id: 'natural-vachetta', label: 'Natural Vachetta' },
  { id: 'black-nappa',      label: 'Black Nappa' },
  { id: 'ivory-satin',      label: 'Ivory Satin',      priceAdd: 50 },
  { id: 'cognac-nappa',     label: 'Cognac Nappa',     priceAdd: 75 },
]

// ── Hardware ──
export const HARDWARE_OPTIONS: SwatchOption[] = [
  { id: 'gold',   label: 'Gold',   hex: '#c9a84c' },
  { id: 'silver', label: 'Silver', hex: '#a8a8a8' },
  { id: 'bronze', label: 'Bronze', hex: '#8c6030' },
  { id: 'black',  label: 'Black',  hex: '#1a1a1a' },
]

// ── Lace Color ──
export const LACE_COLORS: SwatchOption[] = [
  { id: 'white',    label: 'White',    hex: '#f5f5f0' },
  { id: 'cream',    label: 'Cream',    hex: '#e8dcbc' },
  { id: 'black',    label: 'Black',    hex: '#141414' },
  { id: 'tan',      label: 'Tan',      hex: '#b08858' },
  { id: 'bordeaux', label: 'Bordeaux', hex: '#6b2134' },
]

// ── Sizes (EU / UK / US) ──
export const SIZES: SizeOption[] = [
  { eu: 38,   uk: 5,    us: 6,    available: true  },
  { eu: 38.5, uk: 5.5,  us: 6.5,  available: true  },
  { eu: 39,   uk: 6,    us: 7,    available: true  },
  { eu: 39.5, uk: 6.5,  us: 7.5,  available: true  },
  { eu: 40,   uk: 7,    us: 8,    available: true  },
  { eu: 40.5, uk: 7.5,  us: 8.5,  available: true  },
  { eu: 41,   uk: 8,    us: 9,    available: true  },
  { eu: 41.5, uk: 8.5,  us: 9.5,  available: true  },
  { eu: 42,   uk: 9,    us: 10,   available: true  },
  { eu: 42.5, uk: 9.5,  us: 10.5, available: true  },
  { eu: 43,   uk: 10,   us: 11,   available: true  },
  { eu: 43.5, uk: 10.5, us: 11.5, available: false },
  { eu: 44,   uk: 11,   us: 12,   available: true  },
  { eu: 44.5, uk: 11.5, us: 12.5, available: true  },
  { eu: 45,   uk: 12,   us: 13,   available: true  },
  { eu: 46,   uk: 12.5, us: 13.5, available: true  },
  { eu: 47,   uk: 13,   us: 14,   available: false },
]

export const MONOGRAM_PRICE = 75

export interface ConfigState {
  material:  string
  color:     string
  sole:      string
  lining:    string
  hardware:  string
  lace:      string
  monogram:  string
  size:      number | null
}

export const DEFAULT_CONFIG: ConfigState = {
  material: 'suede',
  color:    'chalk',
  sole:     'noir',
  lining:   'natural-vachetta',
  hardware: 'gold',
  lace:     'cream',
  monogram: '',
  size:     null,
}
