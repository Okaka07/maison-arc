import { Link } from 'react-router-dom'
import Navbar from '../../components/layout/Navbar'
import FooterStrip from '../../components/layout/FooterStrip'
import ProductHeroImage from '../../components/hero/ProductHeroImage'
import SeriesLabel from '../../components/hero/SeriesLabel'
import BulletList from '../../components/hero/BulletList'
import Button from '../../components/ui/Button'
import { PRODUCTS } from '../../data/products'
import { usePageTitle } from '../../hooks/usePageTitle'
import styles from './LookbookPage.module.css'

const FEATURED_MODEL = PRODUCTS.find((product) => product.id === 'arc-i-chalk') ?? PRODUCTS[0]

const LOOKBOOK_NOTES = [
  'Styled around the Arc permanent line',
  'Built from current collection silhouettes',
  'Designed as a bridge into configuration',
]

const MOOD_STORIES = [
  {
    label: 'City Morning',
    title: 'Chalk suede against black tailoring',
    body:
      'The Arc I in Chalk keeps the silhouette quiet enough for formal dressing while the noir sole gives the pair a stronger architectural line.',
    productId: 'arc-i-chalk',
  },
  {
    label: 'Evening Commission',
    title: 'Bordeaux calf with a natural welt',
    body:
      'The Arc II Derby carries the house into evening wear: polished, narrow, and grounded by the hand-finished welt.',
    productId: 'arc-ii-derby',
  },
  {
    label: 'Limited Study',
    title: 'Canvas, bronze, and controlled rarity',
    body:
      'Arc Limited 001 shows the more experimental edge of the line without abandoning the restraint of the permanent collection.',
    productId: 'arc-ltd-001',
  },
]

const EDITORIAL_FRAMES = [
  {
    number: '01',
    title: 'Silhouette first',
    body:
      'Every look begins with proportion. The shoe should clarify the line of the outfit before material or hardware becomes visible.',
  },
  {
    number: '02',
    title: 'Contrast stays deliberate',
    body:
      'Maison Arc uses contrast in small doses: a sole edge, a hardware finish, a lining revealed only in movement.',
  },
  {
    number: '03',
    title: 'The commission remains personal',
    body:
      'The lookbook suggests combinations, but the final pair is still built through the configurator and reviewed by the workshop.',
  },
]

function productById(productId: string) {
  return PRODUCTS.find((product) => product.id === productId) ?? PRODUCTS[0]
}

export default function LookbookPage() {
  usePageTitle('Lookbook')

  return (
    <div className={styles.page}>
      <a href="#lookbook-main" className="skipLink">
        Skip to lookbook content
      </a>

      <Navbar />

      <main id="lookbook-main" className={styles.main}>
        <header className={styles.hero}>
          <div className={styles.heroCopy}>
            <div className={styles.breadcrumb} aria-label="Page location">
              <span>Maison Arc</span>
              <span aria-hidden="true" className={styles.breadcrumbSep}>/</span>
              <span>Lookbook</span>
            </div>

            <SeriesLabel text="Lookbook / Arc Series" />

            <h1 className={styles.heading}>
              The Arc Series in context
            </h1>
            <p className={styles.subheading}>
              A visual index of silhouettes, materials, and styling directions from
              the Maison Arc collection. Each frame is designed to lead naturally
              into a commission.
            </p>

            <div className={styles.heroActions}>
              <Button as="link" to="/collection" variant="primary">
                View Collection
              </Button>
              <Button as="link" to={`/collection/${FEATURED_MODEL.id}`} variant="ghost">
                Configure the featured pair {'->'}
              </Button>
            </div>
          </div>

          <div className={styles.heroVisual}>
            <ProductHeroImage
              modelName={FEATURED_MODEL.name}
              price={`From $${FEATURED_MODEL.price.toLocaleString()}`}
              imageSrc={FEATURED_MODEL.imageSrc}
              imageAlt={`${FEATURED_MODEL.name} - ${FEATURED_MODEL.colorway}`}
              hideMeta
              noBlend
            />
          </div>
        </header>

        <section className={styles.noteBand} aria-label="Lookbook scope">
          <div className={styles.noteBandInner}>
            <p className={styles.noteKicker}>Edition 001</p>
            <div className={styles.noteBullets}>
              <BulletList items={LOOKBOOK_NOTES} />
            </div>
          </div>
        </section>

        <section className={styles.stories} aria-labelledby="stories-heading">
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.sectionLabel}>Selected Frames</p>
              <h2 id="stories-heading" className={styles.sectionHeading}>
                Three ways into the collection
              </h2>
            </div>
            <p className={styles.sectionBody}>
              The lookbook is intentionally practical: every frame points to a real
              model in the current product system.
            </p>
          </div>

          <div className={styles.storyGrid}>
            {MOOD_STORIES.map((story) => {
              const product = productById(story.productId)
              return (
                <article key={story.label} className={styles.storyCard}>
                  <Link
                    to={`/collection/${product.id}`}
                    className={styles.storyImageLink}
                    aria-label={`View ${product.name} - ${product.colorway}`}
                  >
                    <img
                      src={product.imageSrc}
                      alt={`${product.name} - ${product.colorway}`}
                      className={styles.storyImage}
                      loading="lazy"
                      draggable={false}
                    />
                  </Link>
                  <div className={styles.storyContent}>
                    <p className={styles.storyLabel}>{story.label}</p>
                    <h3 className={styles.storyTitle}>{story.title}</h3>
                    <p className={styles.storyBody}>{story.body}</p>
                    <div className={styles.storyMeta}>
                      <span>{product.name}</span>
                      <span aria-hidden="true">/</span>
                      <span>{product.colorway}</span>
                    </div>
                    <Button as="link" to={`/collection/${product.id}`} variant="ghost" className={styles.storyCta}>
                      View model {'->'}
                    </Button>
                  </div>
                </article>
              )
            })}
          </div>
        </section>

        <section className={styles.frames} aria-labelledby="frames-heading">
          <div className={styles.framesInner}>
            <div className={styles.framesHeader}>
              <h2 id="frames-heading" className={styles.sectionHeading}>
                Editorial rules behind the frames
              </h2>
              <p className={styles.sectionBody}>
                The same rules that guide the lookbook also guide the product page:
                proportion, restraint, and a configuration that can be built well.
              </p>
            </div>

            <ol className={styles.frameList} aria-label="Lookbook editorial rules">
              {EDITORIAL_FRAMES.map((frame) => (
                <li key={frame.number} className={styles.frameItem}>
                  <span className={styles.frameNumber} aria-hidden="true">{frame.number}</span>
                  <div className={styles.frameContent}>
                    <h3 className={styles.frameTitle}>{frame.title}</h3>
                    <p className={styles.frameBody}>{frame.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className={styles.cta} aria-labelledby="lookbook-cta-heading">
          <div className={styles.ctaInner}>
            <p className={styles.ctaLabel}>Continue from the lookbook</p>
            <h2 id="lookbook-cta-heading" className={styles.ctaHeading}>
              Turn a frame into a commission
            </h2>
            <p className={styles.ctaBody}>
              Choose the silhouette closest to your reference, then configure material,
              colour, sole, lining, hardware, lace, monogram, and size.
            </p>
            <div className={styles.ctaActions}>
              <Button as="link" to="/configure" variant="primary">
                Begin Configuration
              </Button>
              <Button as="link" to="/atelier" variant="ghost">
                Understand the workshop {'->'}
              </Button>
            </div>
          </div>
        </section>
      </main>

      <FooterStrip />
    </div>
  )
}
