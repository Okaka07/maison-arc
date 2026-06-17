import styles from './HeroHeadline.module.css'

export default function HeroHeadline() {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.primary} aria-label="Yours. Precisely.">
        <span className={styles.line1} aria-hidden="true">Yours.</span>
        <span className={styles.line2} aria-hidden="true">Precisely.</span>
      </h1>
    </div>
  )
}
