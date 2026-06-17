import styles from './ModelPicker.module.css'
import { PRODUCTS, type Product } from '../../data/products'

interface ModelPickerProps {
  selectedId: string | null
  onSelect: (product: Product) => void
}

const AVAILABLE = PRODUCTS.filter((p) => p.badge !== 'Sold Out')

export default function ModelPicker({ selectedId, onSelect }: ModelPickerProps) {
  return (
    <div className={styles.wrap}>
      <div className={styles.intro}>
        <h2 className={styles.heading}>Choose your model</h2>
        <p className={styles.sub}>
          Select the silhouette you'd like to configure. Each model has its own construction and available options.
        </p>
      </div>

      <ul className={styles.grid} role="radiogroup" aria-label="Choose shoe model">
        {AVAILABLE.map((product) => {
          const active = product.id === selectedId
          return (
            <li key={product.id}>
              <button
                role="radio"
                aria-checked={active}
                aria-label={`${product.name} — ${product.subtitle} — from $${product.price.toLocaleString()}`}
                className={[styles.card, active ? styles.cardActive : ''].join(' ')}
                onClick={() => onSelect(product)}
              >
                <div className={styles.imageWrap}>
                  <img
                    src={product.imageSrc}
                    alt=""
                    aria-hidden="true"
                    className={styles.image}
                    loading="eager"
                  />
                  {product.badge && (
                    <span className={styles.badge}>{product.badge}</span>
                  )}
                </div>

                <div className={styles.info}>
                  <div>
                    <p className={styles.name}>{product.name}</p>
                    <p className={styles.subtitle}>{product.subtitle}</p>
                  </div>
                  <div className={styles.right}>
                    <p className={styles.price}>
                      From ${product.price.toLocaleString()}
                    </p>
                    <p className={styles.options}>
                      {product.configurableOptions} options
                    </p>
                  </div>
                </div>

                {active && (
                  <span className={styles.check} aria-hidden="true">✓</span>
                )}
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
