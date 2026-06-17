import { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './SizeSelector.module.css'
import { SIZES } from '../../data/configuratorOptions'

type SizeUnit = 'eu' | 'uk' | 'us'

interface SizeSelectorProps {
  selected: number | null
  onSelect: (eu: number) => void
}

export default function SizeSelector({ selected, onSelect }: SizeSelectorProps) {
  const [unit, setUnit] = useState<SizeUnit>('eu')

  const selectedSize = SIZES.find((s) => s.eu === selected)

  return (
    <div className={styles.group}>
      <div className={styles.header}>
        <span className={styles.label}>Size</span>

        <div className={styles.unitToggle} role="group" aria-label="Size unit">
          {(['eu', 'uk', 'us'] as SizeUnit[]).map((u) => (
            <button
              key={u}
              className={[styles.unitBtn, unit === u ? styles.unitBtnActive : ''].join(' ')}
              onClick={() => setUnit(u)}
              aria-pressed={unit === u}
            >
              {u.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {selected && selectedSize && (
        <p className={styles.selectedLabel} aria-live="polite">
          EU {selectedSize.eu} · UK {selectedSize.uk} · US {selectedSize.us}
        </p>
      )}

      <div className={styles.grid} role="radiogroup" aria-label="Shoe size">
        {SIZES.map((s) => {
          const value     = s[unit]
          const isActive  = s.eu === selected
          const disabled  = !s.available

          return (
            <button
              key={s.eu}
              role="radio"
              aria-checked={isActive}
              aria-label={`EU ${s.eu} / UK ${s.uk} / US ${s.us}${disabled ? ' — unavailable' : ''}`}
              aria-disabled={disabled}
              disabled={disabled}
              className={[
                styles.sizeBtn,
                isActive  ? styles.sizeBtnActive    : '',
                disabled  ? styles.sizeBtnDisabled  : '',
              ].filter(Boolean).join(' ')}
              onClick={() => !disabled && onSelect(s.eu)}
            >
              {value}
            </button>
          )
        })}
      </div>

      <p className={styles.guide}>
        <Link
          to="/size-guide"
          className={styles.guideLink}
          aria-label="Open size guide"
        >
          Size Guide <span aria-hidden="true">↗</span>
        </Link>
        <span aria-hidden="true" className={styles.guideSep}>·</span>
        <span>Half sizes fit true to size</span>
      </p>
    </div>
  )
}
