import styles from './FooterStrip.module.css'

const PROPS = [
  'Free global shipping',
  'Certificate of authenticity included',
  'Lifetime sole replacement',
] as const

export default function FooterStrip() {
  return (
    <aside className={styles.strip} aria-label="Service guarantees">
      <ul className={styles.list} role="list">
        {PROPS.map((text, i) => (
          <li key={text} className={styles.item}>
            {i > 0 && <span className={styles.separator} aria-hidden="true">•</span>}
            <span>{text}</span>
          </li>
        ))}
      </ul>
    </aside>
  )
}
