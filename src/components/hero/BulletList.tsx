import styles from './BulletList.module.css'

interface BulletListProps {
  items: string[]
}

export default function BulletList({ items }: BulletListProps) {
  return (
    <ul className={styles.list} role="list">
      {items.map((item) => (
        <li key={item} className={styles.item}>
          <span className={styles.bullet} aria-hidden="true">•</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}
