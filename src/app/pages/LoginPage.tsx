import { useEffect, useState, type FormEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Navbar from '../../components/layout/Navbar'
import FooterStrip from '../../components/layout/FooterStrip'
import SeriesLabel from '../../components/hero/SeriesLabel'
import BulletList from '../../components/hero/BulletList'
import Button from '../../components/ui/Button'
import { usePageTitle } from '../../hooks/usePageTitle'
import { authDemoCredentials, useAuth } from '../../auth/AuthContext'
import styles from './LoginPage.module.css'

const LOGIN_NOTES = [
  'Private routes stay locked until the demo account is authenticated.',
  'Session state persists locally so refresh does not discard the signed-in view.',
  'This prototype is frontend-only and ready to swap to real backend tokens later.',
]

function sanitizeRedirect(value: string | null) {
  if (!value || !value.startsWith('/')) {
    return '/account'
  }

  if (value.startsWith('//')) {
    return '/account'
  }

  return value
}

export default function LoginPage() {
  usePageTitle('Sign In')

  const { login, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const redirectTo = sanitizeRedirect(new URLSearchParams(location.search).get('redirect'))

  const [email, setEmail] = useState(authDemoCredentials.email)
  const [password, setPassword] = useState(authDemoCredentials.password)
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirectTo, { replace: true })
    }
  }, [isAuthenticated, navigate, redirectTo])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      await login({ email, password })
      navigate(redirectTo, { replace: true })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to sign in with those credentials.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={styles.page}>
      <a href="#login-main" className="skipLink">
        Skip to sign-in content
      </a>

      <Navbar />

      <main id="login-main" className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <div className={styles.copy}>
              <div className={styles.breadcrumb} aria-label="Page location">
                <span>Maison Arc</span>
                <span aria-hidden="true" className={styles.breadcrumbSep}>/</span>
                <span>Sign In</span>
              </div>

              <h1 className={styles.heading}>
                Client Access
                <em className={styles.headingAccent}> — Private Commissions</em>
              </h1>

              <SeriesLabel text="Account / Maison Arc" />

              <p className={styles.body}>
                Sign in to review saved commissions, client profile details, and the
                private order flow built for returning Maison Arc clients.
              </p>

              <div className={styles.notes}>
                <BulletList items={LOGIN_NOTES} />
              </div>
            </div>

            <div className={styles.panel}>
              <div className={styles.panelHeader}>
                <p className={styles.panelLabel}>Demo Credentials</p>
                <p className={styles.panelMeta}>Use the seeded client account below.</p>
              </div>

              <dl className={styles.credentials}>
                <div className={styles.credentialRow}>
                  <dt>Email</dt>
                  <dd>{authDemoCredentials.email}</dd>
                </div>
                <div className={styles.credentialRow}>
                  <dt>Password</dt>
                  <dd>{authDemoCredentials.password}</dd>
                </div>
              </dl>

              <form className={styles.form} onSubmit={handleSubmit}>
                <label className={styles.field}>
                  <span>Email address</span>
                  <input
                    autoComplete="email"
                    className={styles.input}
                    name="email"
                    onChange={(event) => setEmail(event.target.value)}
                    type="email"
                    value={email}
                  />
                </label>

                <label className={styles.field}>
                  <span>Password</span>
                  <input
                    autoComplete="current-password"
                    className={styles.input}
                    name="password"
                    onChange={(event) => setPassword(event.target.value)}
                    type="password"
                    value={password}
                  />
                </label>

                {error ? (
                  <p className={styles.error} role="alert">
                    {error}
                  </p>
                ) : null}

                <div className={styles.actions}>
                  <Button disabled={isSubmitting} type="submit">
                    {isSubmitting ? 'Signing In...' : 'Sign In'}
                  </Button>
                  <Button as="link" to="/collection" variant="ghost">
                    View Collection {'->'}
                  </Button>
                </div>
              </form>

              <p className={styles.footnote}>
                Need public browsing first? <Link to="/atelier">Return to the atelier overview</Link>.
              </p>
            </div>
          </div>
        </section>
      </main>

      <FooterStrip />
    </div>
  )
}
