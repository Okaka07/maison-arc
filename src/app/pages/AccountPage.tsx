import Navbar from '../../components/layout/Navbar'
import FooterStrip from '../../components/layout/FooterStrip'
import SeriesLabel from '../../components/hero/SeriesLabel'
import BulletList from '../../components/hero/BulletList'
import Button from '../../components/ui/Button'
import { usePageTitle } from '../../hooks/usePageTitle'
import styles from './AccountPage.module.css'

const ACCOUNT_NOTES = [
  'Commission updates are sent by email',
  'Saved sizing is reviewed before production',
  'Service history stays attached to each completed pair',
]

const PROFILE_DETAILS = [
  ['Client', 'Alexandre Moreau'],
  ['Email', 'alexandre.moreau@example.com'],
  ['Preferred size', 'EU 42 / UK 9 / US 10'],
  ['Default monogram', 'AM'],
]

const COMMISSION_STATUS = [
  {
    label: 'Active Drafts',
    value: '3',
    detail: 'Saved configurations awaiting final review.',
  },
  {
    label: 'Current Commission',
    value: '1',
    detail: 'Chalk Evening Pair is ready for workshop review.',
  },
  {
    label: 'Service Credits',
    value: '2',
    detail: 'Lifetime sole replacement credits available.',
  },
]

const SERVICE_ITEMS = [
  {
    title: 'Sizing Profile',
    body:
      'Your preferred fit notes are attached to every submitted commission before the atelier confirms production.',
    action: 'Review sizing',
  },
  {
    title: 'Communication',
    body:
      'Commission approval, atelier review, production start, and dispatch updates are sent to your primary email.',
    action: 'Update contact',
  },
  {
    title: 'Aftercare',
    body:
      'Completed pairs retain service eligibility for sole replacement, refinishing, and material-specific care guidance.',
    action: 'View aftercare',
  },
]

export default function AccountPage() {
  usePageTitle('Account')

  return (
    <div className={styles.page}>
      <a href="#account-main" className="skipLink">
        Skip to account content
      </a>

      <Navbar />

      <main id="account-main" className={styles.main}>
        <header className={styles.pageHeader}>
          <div className={styles.pageHeaderInner}>
            <div className={styles.breadcrumb} aria-label="Page location">
              <span>Maison Arc</span>
              <span aria-hidden="true" className={styles.breadcrumbSep}>/</span>
              <span>Account</span>
            </div>

            <div className={styles.headingRow}>
              <div className={styles.headingBlock}>
                <h1 className={styles.heading}>
                  Account
                  <em className={styles.headingAccent}> — Client Profile</em>
                </h1>
                <SeriesLabel text="Private Client / Maison Arc" />
              </div>

              <p className={styles.headingMeta}>
                Active client since 2024
              </p>
            </div>

            <p className={styles.subheading}>
              Manage the profile details that support every Maison Arc commission:
              sizing, contact preferences, saved designs, and aftercare eligibility.
            </p>
          </div>
        </header>

        <section className={styles.overview} aria-labelledby="account-overview-heading">
          <div className={styles.overviewInner}>
            <div className={styles.profilePanel}>
              <p className={styles.sectionLabel}>Profile</p>
              <h2 id="account-overview-heading" className={styles.sectionHeading}>
                Client details
              </h2>
              <dl className={styles.detailList}>
                {PROFILE_DETAILS.map(([label, value]) => (
                  <div key={label} className={styles.detailRow}>
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
              <div className={styles.profileActions}>
                <Button as="link" to="/my-designs" variant="primary">
                  View My Designs
                </Button>
                <Button as="link" to="/configure" variant="ghost">
                  Start New Commission {'->'}
                </Button>
              </div>
            </div>

            <aside className={styles.notePanel} aria-label="Account notes">
              <p className={styles.noteLabel}>Account Notes</p>
              <div className={styles.noteList}>
                <BulletList items={ACCOUNT_NOTES} />
              </div>
            </aside>
          </div>
        </section>

        <section className={styles.statusSection} aria-labelledby="status-heading">
          <div className={styles.statusInner}>
            <div className={styles.statusHeader}>
              <div>
                <p className={styles.sectionLabel}>Commission Status</p>
                <h2 id="status-heading" className={styles.sectionHeading}>
                  Current account state
                </h2>
              </div>
              <p className={styles.sectionBody}>
                This account view uses the same prototype data style as the configurator:
                visible state now, backend persistence later.
              </p>
            </div>

            <div className={styles.statusGrid}>
              {COMMISSION_STATUS.map((item) => (
                <article key={item.label} className={styles.statusCard}>
                  <p className={styles.statusValue}>{item.value}</p>
                  <h3 className={styles.statusLabel}>{item.label}</h3>
                  <p className={styles.statusDetail}>{item.detail}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.serviceSection} aria-labelledby="service-heading">
          <div className={styles.serviceInner}>
            <div className={styles.serviceHeader}>
              <p className={styles.sectionLabel}>Service Preferences</p>
              <h2 id="service-heading" className={styles.sectionHeading}>
                Profile settings for future commissions
              </h2>
            </div>

            <div className={styles.serviceGrid}>
              {SERVICE_ITEMS.map((item) => (
                <article key={item.title} className={styles.serviceCard}>
                  <div className={styles.serviceLine} aria-hidden="true" />
                  <h3 className={styles.serviceTitle}>{item.title}</h3>
                  <p className={styles.serviceBody}>{item.body}</p>
                  <button className={styles.textButton} type="button">
                    {item.action}
                  </button>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.cta} aria-labelledby="account-cta-heading">
          <div className={styles.ctaInner}>
            <p className={styles.ctaLabel}>Next step</p>
            <h2 id="account-cta-heading" className={styles.ctaHeading}>
              Continue with a saved design
            </h2>
            <p className={styles.ctaBody}>
              Return to your saved configurations, choose the strongest draft, and send
              it through the commission flow when the details are ready.
            </p>
            <div className={styles.ctaActions}>
              <Button as="link" to="/my-designs" variant="primary">
                Open My Designs
              </Button>
              <Button as="link" to="/collection" variant="ghost">
                Browse Collection {'->'}
              </Button>
            </div>
          </div>
        </section>
      </main>

      <FooterStrip />
    </div>
  )
}
