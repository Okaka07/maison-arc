import styles from './ScrollIndicator.module.css'

export default function ScrollIndicator() {
  const handleClick = () => {
    window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })
  }

  return (
    <button
      className={styles.wrapper}
      onClick={handleClick}
      aria-label="Scroll to explore"
    >
      <span className={styles.line} aria-hidden="true" />
      <span className={styles.text}>Scroll to explore</span>
    </button>
  )
}
