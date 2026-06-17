import { Link } from 'react-router-dom'
import Navbar from '../../components/layout/Navbar'
import FooterStrip from '../../components/layout/FooterStrip'
import ProductHeroImage from '../../components/hero/ProductHeroImage'
import SeriesLabel from '../../components/hero/SeriesLabel'
import BulletList from '../../components/hero/BulletList'
import Button from '../../components/ui/Button'
import { PRODUCTS } from '../../data/products'
import { usePageTitle } from '../../hooks/usePageTitle'
import styles from './MyDesignsPage.module.css'

const DESIGN_NOTES = [
  'Saved configurations are reviewed before production',
  'Drafts can be refined from the original model page',
  'Final orders are confirmed by the atelier within 48 hours',
]

const SAVED_DESIGNS = [
  {
    id: 'design-arc-i-chalk',
    status: 'Draft',
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
    updated: 'Updated today',
  },
  {
    id: 'design-arc-ii-bordeaux',
    status: 'Ready for review',
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
    updated: 'Updated 2 days ago',
  },
  {
    id: 'design-arc-ltd-midnight',
    status: 'Reference',
    productId: 'arc-ltd-002',
    name: 'Midnight Travel Boot',
    material: 'Full-Grain Leather',
    upper: 'Midnight',
    sole: 'Bone',
    lining: 'Black Nappa',
    hardware: 'Black',
    lace: 'Black',
    size: 'EU 41',
    monogram: 'AG',
    updated: 'Updated last week',
  },
]

function productById(productId: string) {
  return PRODUCTS.find((product) => product.id === productId) ?? PRODUCTS[0]
}

export default function MyDesignsPage() {
  usePageTitle('My Designs')

  const featuredDesign = SAVED_DESIGNS[0]
  const featuredProduct = productById(featuredDesign.productId)

  return (
    <div className={styles.page}>
      <a href="#my-designs-main" className="skipLink">
        Skip to saved designs
      </a>

      <Navbar />

      <main id="my-designs-main" className={styles.main}>
        <header className={styles.pageHeader}>
          <div className={styles.pageHeaderInner}>
            <div className={styles.breadcrumb} aria-label="Page location">
              <span>Maison Arc</span>
              <span aria-hidden="true" className={styles.breadcrumbSep}>/</span>
              <span>My Designs</span>
            </div>

            <div className={styles.headingRow}>
              <div className={styles.headingBlock}>
                <h1 className={styles.heading}>
                  My Designs
                  <em className={styles.headingAccent}> — Saved Commissions</em>
                </h1>
                <SeriesLabel text="Private Drafts / Maison Arc" />
              </div>

              <p className={styles.headingMeta}>
                {SAVED_DESIGNS.length} saved {SAVED_DESIGNS.length === 1 ? 'design' : 'designs'}
              </p>
            </div>

            <p className={styles.subheading}>
              Review saved configurations, continue a draft, or return to the collection
              to begin a new commission. These designs are local product concepts until
              submitted through the configurator.
            </p>
          </div>
        </header>

        <section className={styles.featured} aria-labelledby="featured-design-heading">
          <div className={styles.featuredInner}>
            <div className={styles.featuredCopy}>
              <p className={styles.sectionLabel}>Current Draft</p>
              <p className={styles.featuredMeta}>{featuredDesign.status} / {featuredDesign.updated}</p>
              <h2 id="featured-design-heading" className={styles.featuredTitle}>
                {featuredDesign.name}
              </h2>
              <p className={styles.featuredExcerpt}>
                {featuredProduct.name} in {featuredDesign.upper} {featuredDesign.material.toLowerCase()},
                set on a {featuredDesign.sole} sole with {featuredDesign.hardware} hardware.
              </p>

              <div className={styles.featuredActions}>
                <Button as="link" to={`/collection/${featuredProduct.id}`} variant="primary">
                  Continue Design
                </Button>
                <Button as="link" to={`/shared-design/${featuredDesign.id}`} variant="ghost">
                  Share Preview {'->'}
                </Button>
                <Button as="link" to="/configure" variant="ghost">
                  Start New Design {'->'}
                </Button>
              </div>
            </div>

            <div className={styles.featuredVisual} aria-hidden="true">
              <ProductHeroImage
                modelName={featuredProduct.name}
                price={`From $${featuredProduct.price.toLocaleString()}`}
                imageSrc={featuredProduct.imageSrc}
                imageAlt={`${featuredProduct.name} - ${featuredProduct.colorway}`}
                hideMeta
                noBlend
              />
            </div>
          </div>
        </section>

        <section className={styles.designs} aria-labelledby="saved-designs-heading">
          <div className={styles.designsInner}>
            <div className={styles.designsHeader}>
              <div>
                <p className={styles.sectionLabel}>Saved Designs</p>
                <h2 id="saved-designs-heading" className={styles.sectionHeading}>
                  Commission drafts
                </h2>
              </div>
              <div className={styles.notePanel} aria-label="Saved design notes">
                <BulletList items={DESIGN_NOTES} />
              </div>
            </div>

            <div className={styles.designGrid}>
              {SAVED_DESIGNS.map((design) => {
                const product = productById(design.productId)
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
                  <article key={design.id} className={styles.designCard}>
                    <Link
                      to={`/collection/${product.id}`}
                      className={styles.imageLink}
                      aria-label={`Continue ${design.name}`}
                    >
                      <img
                        src={product.imageSrc}
                        alt={`${product.name} - ${product.colorway}`}
                        className={styles.designImage}
                        loading="lazy"
                        draggable={false}
                      />
                      <span className={styles.statusBadge}>{design.status}</span>
                    </Link>

                    <div className={styles.cardBody}>
                      <div className={styles.cardHeader}>
                        <div>
                          <h3 className={styles.cardTitle}>{design.name}</h3>
                          <p className={styles.cardMeta}>{design.updated}</p>
                        </div>
                        <p className={styles.cardPrice}>${product.price.toLocaleString()}+</p>
                      </div>

                      <dl className={styles.specList}>
                        {details.map(([label, value]) => (
                          <div key={label} className={styles.specRow}>
                            <dt>{label}</dt>
                            <dd>{value}</dd>
                          </div>
                        ))}
                      </dl>

                      <div className={styles.cardActions}>
                        <Button as="link" to={`/collection/${product.id}`} variant="ghost">
                          Edit Design {'->'}
                        </Button>
                        <Button as="link" to={`/shared-design/${design.id}`} variant="ghost">
                          Share Preview {'->'}
                        </Button>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        <section className={styles.emptyState} aria-labelledby="new-design-heading">
          <div className={styles.emptyInner}>
            <p className={styles.sectionLabel}>New Commission</p>
            <h2 id="new-design-heading" className={styles.emptyHeading}>
              Start with a model from the collection
            </h2>
            <p className={styles.emptyBody}>
              Saved designs become most useful once tied to a real silhouette. Choose a model,
              refine its materials, and submit only when the configuration is ready for review.
            </p>
            <div className={styles.emptyActions}>
              <Button as="link" to="/collection" variant="ghost">
                View Collection {'->'}
              </Button>
              <Button as="link" to="/configure" variant="primary">
                Open Configurator
              </Button>
            </div>
          </div>
        </section>
      </main>

      <FooterStrip />
    </div>
  )
}
