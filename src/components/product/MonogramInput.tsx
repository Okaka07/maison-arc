import styles from './MonogramInput.module.css'
import { MONOGRAM_PRICE } from '../../data/configuratorOptions'

interface MonogramInputProps {
  value: string
  onChange: (val: string) => void
}

export default function MonogramInput({ value, onChange }: MonogramInputProps) {
  return (
    <div className={styles.group}>
      <div className={styles.header}>
        <span className={styles.label}>
          Monogram
          <span className={styles.optional}> — optional</span>
        </span>
        <span className={styles.price}>+${MONOGRAM_PRICE}</span>
      </div>
      <div className={styles.row}>
        <input
          type="text"
          className={styles.input}
          value={value}
          maxLength={3}
          placeholder="e.g. JHS"
          aria-label="Monogram initials, up to 3 characters"
          autoComplete="off"
          spellCheck={false}
          onChange={(e) => {
            const v = e.target.value.toUpperCase().replace(/[^A-Z]/g, '')
            onChange(v)
          }}
        />
        <span className={styles.count} aria-hidden="true">
          {value.length}/3
        </span>
      </div>
      <p className={styles.hint}>Gold embossed inside the heel lining.</p>
    </div>
  )
}
