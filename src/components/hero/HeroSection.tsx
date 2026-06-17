import SeriesLabel from './SeriesLabel'
import HeroHeadline from './HeroHeadline'
import BulletList from './BulletList'
import ScrollIndicator from './ScrollIndicator'
import ProductHeroImage from './ProductHeroImage'
import Button from '../ui/Button'
import styles from './HeroSection.module.css'

const HERO_BULLETS = [
  'Handcrafted in 6–8 weeks',
  'Limited to 200 pairs per colorway',
  'Complimentary monogramming on all orders',
]

export default function HeroSection() {
  return (
    <section className={styles.section} aria-labelledby="hero-heading">
      <span id="hero-heading" className="sr-only">
        Maison Arc — Yours. Precisely. Bespoke handcrafted footwear.
      </span>

      <div className={styles.grid}>
        {/* ── Left column ── */}
        <div className={styles.left}>
          <div className={styles.leftInner}>
            <SeriesLabel text="Luxury Series / 001" />

            <div className={styles.headlineWrap}>
              <HeroHeadline />
            </div>

            <p className={styles.body}>
              The Arc I. Handcrafted in full-grain leather.
              <br />
              Configure every detail to your specification.
            </p>

            <div className={styles.ctas} role="group" aria-label="Primary actions">
              <Button
                as="link"
                to="/configure"
                variant="primary"
                aria-label="Begin configuration of The Arc I"
              >
                Begin Configuration
              </Button>
              <Button
                as="a"
                href="/lookbook"
                variant="ghost"
                aria-label="View the lookbook"
              >
                View Lookbook&nbsp;<span aria-hidden="true">→</span>
              </Button>
            </div>

            <div className={styles.bulletsWrap}>
              <BulletList items={HERO_BULLETS} />
            </div>
          </div>

          <div className={styles.scrollWrap}>
            <ScrollIndicator />
          </div>
        </div>

        {/* ── Right column ── */}
        <div className={styles.right}>
          <ProductHeroImage
            modelName="The Arc I"
            price="From $1,450"
            imageSrc="/shoes/arc-i-hero.png"
            imageAlt="The Arc I — cream suede low-top sneaker with black sole and gold eyelets"
          />
        </div>
      </div>
    </section>
  )
}
