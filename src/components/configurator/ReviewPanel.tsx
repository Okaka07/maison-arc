import styles from './ReviewPanel.module.css'
import type { Product } from '../../data/products'
import type { ConfigState } from '../../data/configuratorOptions'
import {
  UPPER_MATERIALS,
  UPPER_COLORS,
  SOLE_COLORS,
  LINING_OPTIONS,
  HARDWARE_OPTIONS,
  LACE_COLORS,
  SIZES,
  MONOGRAM_PRICE,
} from '../../data/configuratorOptions'

interface ReviewPanelProps {
  product: Product
  config: ConfigState
  totalPrice: number
  onEdit: (step: number) => void
}

function row(label: string, value: string, step: number, onEdit: (s: number) => void) {
  return (
    <div key={label} className={styles.row}>
      <span className={styles.rowLabel}>{label}</span>
      <span className={styles.rowValue}>{value}</span>
      <button
        className={styles.editBtn}
        onClick={() => onEdit(step)}
        aria-label={`Edit ${label}`}
      >
        Edit
      </button>
    </div>
  )
}

export default function ReviewPanel({ product, config, totalPrice, onEdit }: ReviewPanelProps) {
  const mat      = UPPER_MATERIALS.find((m) => m.id === config.material)
  const color    = UPPER_COLORS.find((c)    => c.id === config.color)
  const sole     = SOLE_COLORS.find((s)     => s.id === config.sole)
  const lining   = LINING_OPTIONS.find((l)  => l.id === config.lining)
  const hardware = HARDWARE_OPTIONS.find((h) => h.id === config.hardware)
  const lace     = LACE_COLORS.find((l)     => l.id === config.lace)
  const size     = SIZES.find((s)           => s.eu === config.size)

  const hasMonogram = config.monogram.trim().length > 0

  const priceBreakdown = [
    { label: 'Base price',   amount: product.price },
    mat?.priceAdd      ? { label: mat.label,    amount: mat.priceAdd      } : null,
    lining?.priceAdd   ? { label: lining.label, amount: lining.priceAdd   } : null,
    hasMonogram        ? { label: 'Monogram',   amount: MONOGRAM_PRICE    } : null,
  ].filter(Boolean) as { label: string; amount: number }[]

  return (
    <div className={styles.wrap}>
      <div className={styles.intro}>
        <h2 className={styles.heading}>Review your configuration</h2>
        <p className={styles.sub}>
          Confirm your selections before submitting. Each piece is reviewed by our craftsmen before production begins.
        </p>
      </div>

      <div className={styles.body}>
        {/* Model */}
        <div className={styles.section}>
          <p className={styles.sectionLabel}>Model</p>
          <div className={styles.row}>
            <span className={styles.rowLabel}>{product.name}</span>
            <span className={styles.rowValue}>{product.subtitle}</span>
            <button className={styles.editBtn} onClick={() => onEdit(0)} aria-label="Edit model">Edit</button>
          </div>
        </div>

        {/* Upper */}
        <div className={styles.section}>
          <p className={styles.sectionLabel}>Upper</p>
          {row('Material', mat?.label ?? '—',               1, onEdit)}
          {row('Color',    color?.label ?? '—',             1, onEdit)}
        </div>

        {/* Sole & Lining */}
        <div className={styles.section}>
          <p className={styles.sectionLabel}>Sole & Lining</p>
          {row('Sole',   sole?.label   ?? '—', 2, onEdit)}
          {row('Lining', lining?.label ?? '—', 2, onEdit)}
        </div>

        {/* Details */}
        <div className={styles.section}>
          <p className={styles.sectionLabel}>Details</p>
          {row('Hardware',  hardware?.label ?? '—',            3, onEdit)}
          {row('Lace',      lace?.label     ?? '—',            3, onEdit)}
          {row('Monogram',  hasMonogram ? config.monogram : '—', 3, onEdit)}
        </div>

        {/* Size */}
        <div className={styles.section}>
          <p className={styles.sectionLabel}>Size</p>
          {size
            ? row('Size', `EU ${size.eu} / UK ${size.uk} / US ${size.us}`, 4, onEdit)
            : <p className={styles.noSize}>No size selected — go back to step 5</p>
          }
        </div>

        {/* Price breakdown */}
        <div className={styles.priceSection}>
          {priceBreakdown.map((item) => (
            <div key={item.label} className={styles.priceLine}>
              <span className={styles.priceLineLabel}>{item.label}</span>
              <span className={styles.priceLineAmount}>${item.amount.toLocaleString()}</span>
            </div>
          ))}
          <div className={styles.priceTotal}>
            <span>Total</span>
            <span className={styles.priceTotalAmount}>${totalPrice.toLocaleString()}</span>
          </div>
        </div>

        {/* Lead time note */}
        <p className={styles.note}>
          Your configuration will be reviewed within 48 hours. Production takes 6–8 weeks from confirmation. Free global shipping included.
        </p>
      </div>
    </div>
  )
}
