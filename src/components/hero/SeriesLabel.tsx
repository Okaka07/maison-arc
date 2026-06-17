import styles from './SeriesLabel.module.css'

interface SeriesLabelProps {
  text: string
}

export default function SeriesLabel({ text }: SeriesLabelProps) {
  return (
    <div className={styles.wrapper}>
      <span className={styles.line} aria-hidden="true" />
      <span className={styles.text}>{text}</span>
    </div>
  )
}
