import styles from './OptionGroup.module.css'
import type { SwatchOption, TextOption } from '../../data/configuratorOptions'

interface BaseProps {
  label: string
  selectedId: string
  onSelect: (id: string) => void
}

interface SwatchProps extends BaseProps {
  type: 'swatch'
  options: SwatchOption[]
}

interface TextProps extends BaseProps {
  type: 'text'
  options: TextOption[]
}

type OptionGroupProps = SwatchProps | TextProps

export default function OptionGroup(props: OptionGroupProps) {
  const { label, selectedId, onSelect, options, type } = props

  const selectedLabel = options.find((o) => o.id === selectedId)?.label ?? ''

  return (
    <div className={styles.group}>
      <div className={styles.header}>
        <span className={styles.label}>{label}</span>
        <span className={styles.selected}>{selectedLabel}</span>
      </div>

      <div
        className={type === 'swatch' ? styles.swatches : styles.pills}
        role="radiogroup"
        aria-label={label}
      >
        {options.map((opt) => {
          const isActive = opt.id === selectedId
          const priceAdd = (opt as SwatchOption & TextOption).priceAdd

          if (type === 'swatch') {
            const swatch = opt as SwatchOption
            return (
              <button
                key={swatch.id}
                role="radio"
                aria-checked={isActive}
                aria-label={`${swatch.label}${priceAdd ? ` (+$${priceAdd})` : ''}`}
                className={[styles.swatch, isActive ? styles.swatchActive : ''].join(' ')}
                style={{ '--swatch-color': swatch.hex } as React.CSSProperties}
                onClick={() => onSelect(swatch.id)}
              />
            )
          }

          return (
            <button
              key={opt.id}
              role="radio"
              aria-checked={isActive}
              aria-label={`${opt.label}${priceAdd ? ` (+$${priceAdd})` : ''}`}
              className={[styles.pill, isActive ? styles.pillActive : ''].join(' ')}
              onClick={() => onSelect(opt.id)}
            >
              {opt.label}
              {priceAdd && (
                <span className={styles.pillPrice} aria-hidden="true">
                  +${priceAdd}
                </span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
