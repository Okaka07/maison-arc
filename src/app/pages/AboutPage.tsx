import Navbar from '../../components/layout/Navbar'
import FooterStrip from '../../components/layout/FooterStrip'
import BulletList from '../../components/hero/BulletList'
import SeriesLabel from '../../components/hero/SeriesLabel'
import Button from '../../components/ui/Button'
import { usePageTitle } from '../../hooks/usePageTitle'
import styles from './AboutPage.module.css'

const HOUSE_BULLETS = [
  'Founded in Lisbon in 2019',
  'Built around made-to-order commissions',
  'Designed to be repaired, resoled, and worn for years',
]

const HOUSE_PILLARS = [
  {
    label: 'Precision Over Volume',
    description:
      'Maison Arc is structured to produce fewer pairs with more scrutiny. The house would rather narrow the offering than expand beyond what the workshop can control.',
  },
  {
    label: 'Material Honesty',
    description:
      'Leathers, suedes, linings, and hardware are selected for how they age in use, not how they perform under temporary showroom conditions.',
  },
  {
    label: 'Commission As Dialogue',
    description:
      'Configuration is treated as the beginning of a conversation with the workshop. Each order is reviewed before production so intent and craftsmanship stay aligned.',
  },
  {
    label: 'Longevity As Luxury',
    description:
      'A pair is considered complete only if it can be maintained over time. Repairability, sole replacement, and finish restoration are part of the product promise.',
  },
]

const TIMELINE = [
  {
    year: '2019',
    title: 'House Founded',
    body:
      'Maison Arc begins in Lisbon with a narrow brief: a modern luxury shoe line built around the discipline of bespoke commissioning rather than seasonal churn.',
  },
  {
    year: '2021',
    title: 'Arc Series Introduced',
    body:
      'The first Arc silhouettes establish the permanent vocabulary of the house: controlled proportions, restrained detailing, and a configurable but tightly vetted material system.',
  },
  {
    year: '2024',
    title: 'Commission Platform Expanded',
    body:
      'The house formalizes its digital configuration flow so clients can begin a commission remotely without losing the workshop review that defines the brand.',
  },
]

export default function AboutPage() {
  usePageTitle('About')

  return (
    <div className={styles.page}>
      <a href="#about-main" className="skipLink">
        Skip to about content
      </a>

      <Navbar />

      <main id="about-main" className={styles.main}>
        <header className={styles.pageHeader}>
          <div className={styles.pageHeaderInner}>
            <div className={styles.breadcrumb} aria-label="Page location">
              <span>Maison Arc</span>
              <span aria-hidden="true" className={styles.breadcrumbSep}>/</span>
              <span>About</span>
            </div>

            <div className={styles.headingRow}>
              <h1 className={styles.heading}>
                About Maison Arc
                <em className={styles.headingAccent}> — The House</em>
              </h1>
              <SeriesLabel text="Lisbon / Est. 2019" />
            </div>

            <p className={styles.subheading}>
              Maison Arc is a Lisbon footwear house focused on made-to-order luxury:
              a smaller line, a slower rhythm, and a commission process that treats
              each pair as something specified with intention rather than bought in passing.
            </p>
          </div>
        </header>

        <section className={styles.manifesto} aria-labelledby="manifesto-heading">
          <div className={styles.manifestoInner}>
            <span className={styles.manifestoRule} aria-hidden="true" />
            <div className={styles.manifestoContent}>
              <p id="manifesto-heading" className={styles.manifestoQuote}>
                "We are not interested in making more shoes. We are interested in
                making better instructions for how a shoe should live with its wearer."
              </p>
              <p className={styles.manifestoAttrib}>Maison Arc / House Statement</p>
            </div>
            <span className={styles.manifestoRule} aria-hidden="true" />
          </div>
        </section>

        <section className={styles.story} aria-labelledby="story-heading">
          <div className={styles.storyInner}>
            <div className={styles.storyText}>
              <h2 id="story-heading" className={styles.sectionHeading}>
                Why the house exists
              </h2>
              <p className={styles.sectionBody}>
                Maison Arc was formed around a simple frustration: luxury footwear had
                become fluent in image but inconsistent in substance. Collections moved
                quickly, customization widened without enough judgment, and the language
                of craft was often disconnected from the conditions of actual making.
              </p>
              <p className={styles.sectionBody}>
                The house response was narrower and stricter. Fewer silhouettes. Fewer
                material combinations. More review. More accountability between what the
                client selects and what the workshop is willing to sign its name to.
              </p>
              <div className={styles.bulletWrap}>
                <BulletList items={HOUSE_BULLETS} />
              </div>
            </div>

            <div className={styles.storyStats} aria-label="House at a glance">
              {[
                { value: '1,200', unit: '', label: 'annual pairs or fewer' },
                { value: '6-8', unit: 'wk', label: 'production window' },
                { value: '42', unit: '', label: 'quality checks' },
                { value: '1', unit: '', label: 'craftsman sign-off per pair' },
              ].map(({ value, unit, label }) => (
                <div key={label} className={styles.stat}>
                  <p className={styles.statValue}>
                    {value}<span className={styles.statUnit}>{unit}</span>
                  </p>
                  <p className={styles.statLabel}>{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.principles} aria-labelledby="principles-heading">
          <div className={styles.principlesInner}>
            <h2 id="principles-heading" className={styles.sectionHeading}>
              House principles
            </h2>
            <p className={styles.sectionBody} style={{ maxWidth: '520px', marginBottom: '48px' }}>
              Every page in the experience, from collection to configurator, is built around
              the same internal rules the workshop uses to judge a pair.
            </p>

            <div className={styles.principlesGrid}>
              {HOUSE_PILLARS.map(({ label, description }) => (
                <article key={label} className={styles.principleCard}>
                  <div className={styles.principleLine} aria-hidden="true" />
                  <h3 className={styles.principleLabel}>{label}</h3>
                  <p className={styles.principleDesc}>{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.timeline} aria-labelledby="timeline-heading">
          <div className={styles.timelineInner}>
            <div className={styles.timelineHeader}>
              <h2 id="timeline-heading" className={styles.sectionHeading}>
                A short timeline
              </h2>
              <p className={styles.sectionBody} style={{ maxWidth: '420px' }}>
                The house remains intentionally small, but each phase has tightened how
                brand narrative, workshop practice, and configuration fit together.
              </p>
            </div>

            <ol className={styles.timelineList} aria-label="Maison Arc timeline">
              {TIMELINE.map((item) => (
                <li key={item.year} className={styles.timelineItem}>
                  <span className={styles.timelineYear} aria-hidden="true">{item.year}</span>
                  <div className={styles.timelineContent}>
                    <h3 className={styles.timelineTitle}>{item.title}</h3>
                    <p className={styles.timelineBody}>{item.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className={styles.cta} aria-labelledby="cta-heading">
          <div className={styles.ctaInner}>
            <p className={styles.ctaLabel}>Enter the house through the product</p>
            <h2 id="cta-heading" className={styles.ctaHeading}>
              Begin with the collection, then configure your pair
            </h2>
            <p className={styles.ctaBody}>
              The best explanation of Maison Arc is still the commission itself:
              choose a silhouette, specify the details, and let the workshop review
              the pair before production begins.
            </p>
            <div className={styles.ctaActions}>
              <Button as="link" to="/collection" variant="ghost">
                View Collection {'->'}
              </Button>
              <Button as="link" to="/configure" variant="primary">
                Begin Configuration
              </Button>
            </div>
          </div>
        </section>
      </main>

      <FooterStrip />
    </div>
  )
}
