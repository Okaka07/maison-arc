import styles from './CollectionFilter.module.css'
import { CATEGORIES, type CategoryKey } from '../../data/products'

interface CollectionFilterProps {
  active: CategoryKey
  counts: Record<string, number>
  onChange: (key: CategoryKey) => void
}

export default function CollectionFilter({ active, counts, onChange }: CollectionFilterProps) {
  return (
    <nav className={styles.nav} aria-label="Filter collection by category">
      <ul className={styles.list} role="list">
        {CATEGORIES.map(({ key, label }) => (
          <li key={key}>
            <button
              className={[styles.btn, active === key ? styles.btnActive : ''].join(' ')}
              onClick={() => onChange(key)}
              aria-pressed={active === key}
              aria-label={`Show ${label} — ${counts[key] ?? 0} items`}
            >
              <span className={styles.label}>{label}</span>
              <span className={styles.count} aria-hidden="true">
                {counts[key] ?? 0}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
