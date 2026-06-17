import { Link, useParams } from 'react-router-dom'
import Navbar from '../../components/layout/Navbar'
import FooterStrip from '../../components/layout/FooterStrip'
import ProductHeroImage from '../../components/hero/ProductHeroImage'
import SeriesLabel from '../../components/hero/SeriesLabel'
import BulletList from '../../components/hero/BulletList'
import Button from '../../components/ui/Button'
import { PRODUCTS } from '../../data/products'
import { usePageTitle } from '../../hooks/usePageTitle'
import styles from './SharedDesignPage.module.css'

const SHARE_NOTES = [
  'This shared preview is view-only',
  'Pricing is estimated until atelier review',
  'Copying the design starts a new private commission draft',
]

const SHARED_DESIGNS = [
  {
    id: 'design-arc-i-chalk',
    shareCode: 'MA-SHARE-042',
    status: 'Shared preview',
    sharedBy: 'Alexandre Moreau',
    productId: 'arc-i-chalk',
    name: 'Chalk Evening Pair',
    material: 'Suede',
    upper: 'Chalk',
    sole: 'Noir',
    lining: 'Natural Vachetta',
    hardware: 'Gold',
    lace: 'Cream',
    size: 'EU 42',
    monogram: 'MA',
    updated: 'Shared today',
  },
  {
    id: 'design-arc-ii-bordeaux',
    shareCode: 'MA-SHARE-117',
    status: 'Shared preview',
    sharedBy: 'Maison Arc Client',
    productId: 'arc-ii-derby',
    name: 'Bordeaux Formal Derby',
    material: 'Calf Leather',
    upper: 'Bordeaux',
    sole: 'Natural',
    lining: 'Cognac Nappa',
    hardware: 'Gold',
    lace: 'Black',
    size: 'EU 43',
    monogram: '',
    updated: 'Shared 2 days ago',
  },
]

function productById(productId: string) {
  return PRODUCTS.find((product) => product.id === productId) ?? PRODUCTS[0]
}

function sharedDesignById(shareId?: string) {
  return SHARED_DESIGNS.find((design) => design.id === shareId) ?? SHARED_DESIGNS[0]
}

export default function SharedDesignPage() {
  const { shareId } = useParams()
  const design = sharedDesignById(shareId)
  const product = productById(design.productId)

  usePageTitle(`Shared Design - ${design.name}`)

  const details = [
    ['Model', product.name],
    ['Upper', `${design.upper} ${design.material}`],
    ['Sole', design.sole],
    ['Lining', design.lining],
    ['Hardware', design.hardware],
    ['Lace', design.lace],
    ['Size', design.size],
    ['Monogram', design.monogram || 'None'],
  ]

  return (
    <div className={styles.page}>
      <a href="#shared-design-main" className="skipLink">
        Skip to shared design
      </a>

      <Navbar />

      <main id="shared-design-main" className={styles.main}>
        <header className={styles.pageHeader}>
          <div className={styles.pageHeaderInner}>
            <div className={styles.breadcrumb} aria-label="Page location">
              <Link to="/my-designs">My Designs</Link>
              <span aria-hidden="true" className={styles.breadcrumbSep}>/</span>
              <span>Shared Design</span>
            </div>

            <div className={styles.headingRow}>
              <div className={styles.headingBlock}>
                <h1 className={styles.heading}>
                  Shared Design
                  <em className={styles.headingAccent}> — Commission Preview</em>
                </h1>
                <SeriesLabel text={`${design.shareCode} / Maison Arc`} />
              </div>

              <p className={styles.headingMeta}>
                {design.status} / {design.updated}
              </p>
            </div>

            <p className={styles.subheading}>
              A view-only commission concept shared from Maison Arc. Review the materials,
              silhouette, and estimate before copying the design into your own private draft.
            </p>
          </div>
        </header>

        <section className={styles.preview} aria-labelledby="shared-design-title">
          <div className={styles.previewInner}>
            <div className={styles.previewCopy}>
              <p className={styles.sectionLabel}>Shared by {design.sharedBy}</p>
              <h2 id="shared-design-title" className={styles.previewTitle}>
                {design.name}
              </h2>
              <p className={styles.previewBody}>
                {product.name} configured in {design.upper.toLowerCase()} {design.material.toLowerCase()},
                with a {design.sole.toLowerCase()} sole and {design.hardware.toLowerCase()} hardware.
                This preview preserves the design intent without exposing private account controls.
              </p>

              <div className={styles.previewActions}>
                <Button as="link" to={`/collection/${product.id}`} variant="primary">
                  Start from This Design
                </Button>
                <Button as="link" to="/collection" variant="ghost">
                  Browse Collection {'->'}
                </Button>
              </div>
            </div>

            <div className={styles.previewVisual} aria-hidden="true">
              <ProductHeroImage
                modelName={product.name}
                price={`From $${product.price.toLocaleString()}`}
                imageSrc={product.imageSrc}
                imageAlt={`${product.name} - ${product.colorway}`}
                hideMeta
                noBlend
              />
            </div>
          </div>
        </section>

        <section className={styles.details} aria-labelledby="shared-specs-heading">
          <div className={styles.detailsInner}>
            <div className={styles.specPanel}>
              <p className={styles.sectionLabel}>Specification</p>
              <h2 id="shared-specs-heading" className={styles.sectionHeading}>
                Shared commission details
              </h2>
              <dl className={styles.specList}>
                {details.map(([label, value]) => (
                  <div key={label} className={styles.specRow}>
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <aside className={styles.sharePanel} aria-labelledby="share-panel-heading">
              <p className={styles.shareLabel}>Share Link</p>
              <h2 id="share-panel-heading" className={styles.shareHeading}>
                Public preview
              </h2>
              <p className={styles.shareBody}>
                Share code <strong>{design.shareCode}</strong> opens this same preview without
                exposing checkout, account, or saved-design controls.
              </p>
              <div className={styles.shareUrl}>
                /shared-design/{design.id}
              </div>
              <div className={styles.shareNotes}>
                <BulletList items={SHARE_NOTES} />
              </div>
            </aside>
          </div>
        </section>

        <section className={styles.cta} aria-labelledby="shared-design-cta">
          <div className={styles.ctaInner}>
            <p className={styles.sectionLabel}>Create Your Version</p>
            <h2 id="shared-design-cta" className={styles.ctaHeading}>
              Turn this preview into a private commission
            </h2>
            <p className={styles.ctaBody}>
              Start from the shared silhouette, adjust materials and sizing, then save it to
              your own Maison Arc drafts before atelier review.
            </p>
            <div className={styles.ctaActions}>
              <Button as="link" to={`/collection/${product.id}`} variant="primary">
                Copy Design
              </Button>
              <Button as="link" to="/my-designs" variant="ghost">
                View My Designs {'->'}
              </Button>
            </div>
          </div>
        </section>
      </main>

      <FooterStrip />
    </div>
  )
}
