import { Link } from 'react-router-dom'
import MaisonLogo from '../ui/MaisonLogo'
import { STEP_META } from '../../data/stepsMeta'
import styles from './ConfigHeader.module.css'

interface ConfigHeaderProps {
  currentStep: number
  onStepClick?: (index: number) => void
  exitTo?: string
}

export default function ConfigHeader({
  currentStep,
  onStepClick,
  exitTo = '/collection',
}: ConfigHeaderProps) {
  return (
    <header className={styles.header}>
      {/* Logo */}
      <Link to="/" className={styles.logo} aria-label="Maison Arc — home">
        <MaisonLogo />
        <span className={styles.logoText}>Maison Arc</span>
      </Link>

      {/* Step progress */}
      <nav className={styles.steps} aria-label="Configuration progress">
        <ol className={styles.stepList}>
          {STEP_META.map(({ label }, i) => {
            const done    = i < currentStep
            const active  = i === currentStep
            const locked  = i > currentStep

            return (
              <li key={label} className={styles.stepItem}>
                <button
                  className={[
                    styles.stepBtn,
                    active ? styles.stepActive : '',
                    done   ? styles.stepDone   : '',
                    locked ? styles.stepLocked : '',
                  ].filter(Boolean).join(' ')}
                  onClick={() => done && onStepClick?.(i)}
                  aria-current={active ? 'step' : undefined}
                  aria-label={`${label}${done ? ' — complete' : active ? ' — current' : ' — not yet reached'}`}
                  disabled={locked}
                >
                  <span className={styles.stepDot} aria-hidden="true">
                    {done ? '✓' : i + 1}
                  </span>
                  <span className={styles.stepLabel}>{label}</span>
                </button>

                {i < STEP_META.length - 1 && (
                  <span
                    className={[styles.stepConnector, done ? styles.stepConnectorDone : ''].join(' ')}
                    aria-hidden="true"
                  />
                )}
              </li>
            )
          })}
        </ol>
      </nav>

      {/* Exit */}
      <Link
        to={exitTo}
        className={styles.exit}
        aria-label="Exit configurator"
      >
        <span aria-hidden="true">✕</span>
        <span className={styles.exitLabel}>Exit</span>
      </Link>
    </header>
  )
}
