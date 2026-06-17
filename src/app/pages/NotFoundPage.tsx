import { Link, useLocation } from 'react-router-dom'
import Navbar from '../../components/layout/Navbar'
import FooterStrip from '../../components/layout/FooterStrip'
import SeriesLabel from '../../components/hero/SeriesLabel'
import BulletList from '../../components/hero/BulletList'
import Button from '../../components/ui/Button'
import { usePageTitle } from '../../hooks/usePageTitle'
import styles from './NotFoundPage.module.css'

const RECOVERY_NOTES = [
  'Check the URL for spelling or missing sections',
  'Return to the collection to continue browsing',
  'Open your saved designs if you were looking for a commission draft',
]

const ROUTE_SUGGESTIONS = [
  {
    label: 'Collection',
    href: '/collection',
    detail: 'Browse available Maison Arc silhouettes.',
  },
  {
    label: 'My Designs',
    href: '/my-designs',
    detail: 'Return to saved commission drafts.',
  },
  {
    label: 'Journal',
    href: '/journal',
    detail: 'Read atelier notes and material dispatches.',
  },
]

export default function NotFoundPage() {
  const location = useLocation()

  usePageTitle('Page Not Found')

  return (
    <div className={styles.page}>
      <a href="#not-found-main" className="skipLink">
        Skip to not found content
      </a>

      <Navbar />

      <main id="not-found-main" className={styles.main}>
        <section className={styles.hero} aria-labelledby="not-found-heading">
          <div className={styles.heroInner}>
            <div className={styles.breadcrumb} aria-label="Page location">
              <Link to="/">Maison Arc</Link>
              <span aria-hidden="true" className={styles.breadcrumbSep}>/</span>
              <span>404</span>
            </div>

            <div className={styles.heroGrid}>
              <div className={styles.heroCopy}>
                <p className={styles.errorCode}>404</p>
                <h1 id="not-found-heading" className={styles.heading}>
                  Page Not Found
                  <em className={styles.headingAccent}> — Lost Thread</em>
                </h1>
                <SeriesLabel text="Maison Arc / Missing Route" />
                <p className={styles.subheading}>
                  The requested page does not exist in this atelier. The route{' '}
                  <span>{location.pathname}</span> may have moved, expired, or never been
                  part of the collection.
                </p>

                <div className={styles.heroActions}>
                  <Button as="link" to="/" variant="primary">
                    Return Home
                  </Button>
                  <Button as="link" to="/collection" variant="ghost">
                    View Collection {'->'}
                  </Button>
                </div>
              </div>

              <aside className={styles.notePanel} aria-label="Recovery notes">
                <p className={styles.noteLabel}>Recovery Notes</p>
                <div className={styles.noteList}>
                  <BulletList items={RECOVERY_NOTES} />
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section className={styles.routes} aria-labelledby="route-suggestions-heading">
          <div className={styles.routesInner}>
            <div className={styles.routesHeader}>
              <p className={styles.sectionLabel}>Suggested Routes</p>
              <h2 id="route-suggestions-heading" className={styles.sectionHeading}>
                Continue from a known page
              </h2>
            </div>

            <div className={styles.routeGrid}>
              {ROUTE_SUGGESTIONS.map((route) => (
                <Link key={route.href} to={route.href} className={styles.routeCard}>
                  <span className={styles.routeLine} aria-hidden="true" />
                  <h3>{route.label}</h3>
                  <p>{route.detail}</p>
                  <span className={styles.routeArrow} aria-hidden="true">
                    {'->'}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <FooterStrip />
    </div>
  )
}
