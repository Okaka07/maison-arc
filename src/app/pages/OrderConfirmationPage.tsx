import { Link } from 'react-router-dom'
import Navbar from '../../components/layout/Navbar'
import FooterStrip from '../../components/layout/FooterStrip'
import SeriesLabel from '../../components/hero/SeriesLabel'
import BulletList from '../../components/hero/BulletList'
import Button from '../../components/ui/Button'
import {
  MOCK_CLIENT_FIELDS,
  MOCK_DELIVERY_FIELDS,
  MOCK_ORDER_ITEMS,
  MOCK_ORDER_REFERENCE,
  orderItemSpecs,
  orderItemTotal,
  orderTotals,
  productById,
} from '../../data/mockOrder'
import { usePageTitle } from '../../hooks/usePageTitle'
import styles from './OrderConfirmationPage.module.css'

const NEXT_STEPS = [
  'Atelier review starts within 48 hours',
  'A concierge will confirm fit notes and material availability',
  'Final balance is requested only after workshop approval',
]

const ORDER_DETAILS = [
  ['Order reference', MOCK_ORDER_REFERENCE],
  ['Client', MOCK_CLIENT_FIELDS[0][1]],
  ['Email', MOCK_CLIENT_FIELDS[1][1]],
  ['Delivery', `${MOCK_DELIVERY_FIELDS[0][1]}, ${MOCK_DELIVERY_FIELDS[1][1]} ${MOCK_DELIVERY_FIELDS[3][1]}`],
]

const TIMELINE = [
  {
    stage: 'Submitted',
    detail: 'Commission package received for atelier review.',
    state: 'Complete',
  },
  {
    stage: 'Atelier review',
    detail: 'Materials, fit, and production timing will be confirmed.',
    state: 'Next',
  },
  {
    stage: 'Production approval',
    detail: 'Final balance and workshop start date are shared with the client.',
    state: 'Pending',
  },
]

export default function OrderConfirmationPage() {
  usePageTitle('Order Confirmation', {
    description: 'Maison Arc commission confirmation with atelier review timeline and submitted item summary.',
  })

  const { atelierDeposit, remainingBalance } = orderTotals()

  return (
    <div className={styles.page}>
      <a href="#confirmation-main" className="skipLink">
        Skip to order confirmation
      </a>

      <Navbar />

      <main id="confirmation-main" className={styles.main}>
        <header className={styles.hero}>
          <div className={styles.heroInner}>
            <div className={styles.breadcrumb} aria-label="Page location">
              <Link to="/checkout">Checkout</Link>
              <span aria-hidden="true" className={styles.breadcrumbSep}>/</span>
              <span>Order Confirmation</span>
            </div>

            <div className={styles.heroGrid}>
              <div className={styles.heroCopy}>
                <p className={styles.confirmedLabel}>Commission submitted</p>
                <h1 className={styles.heading}>
                  Order Confirmed
                  <em className={styles.headingAccent}> — Atelier Review</em>
                </h1>
                <SeriesLabel text={`Reference ${MOCK_ORDER_REFERENCE} / Maison Arc`} />
                <p className={styles.subheading}>
                  Your commission package has been received. The atelier will review
                  materials, sizing, and production timing before confirming final approval.
                </p>
                <div className={styles.heroActions}>
                  <Button as="link" to="/my-designs" variant="primary">
                    View My Designs
                  </Button>
                  <Button as="link" to="/collection" variant="ghost">
                    Continue Shopping {'->'}
                  </Button>
                </div>
              </div>

              <aside className={styles.referenceCard} aria-label="Order reference">
                <p className={styles.referenceLabel}>Order Reference</p>
                <p className={styles.referenceNumber}>{MOCK_ORDER_REFERENCE}</p>
                <div className={styles.referenceLines}>
                  <div>
                    <span>Deposit estimate</span>
                    <strong>${atelierDeposit.toLocaleString()}</strong>
                  </div>
                  <div>
                    <span>Final balance</span>
                    <strong>${remainingBalance.toLocaleString()}</strong>
                  </div>
                </div>
                <div className={styles.referenceNotes}>
                  <BulletList items={NEXT_STEPS} />
                </div>
              </aside>
            </div>
          </div>
        </header>

        <section className={styles.detailsSection} aria-labelledby="order-details-heading">
          <div className={styles.detailsInner}>
            <div className={styles.detailPanel}>
              <p className={styles.sectionLabel}>Order Details</p>
              <h2 id="order-details-heading" className={styles.sectionHeading}>
                Confirmation summary
              </h2>
              <dl className={styles.detailList}>
                {ORDER_DETAILS.map(([label, value]) => (
                  <div key={label} className={styles.detailRow}>
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className={styles.timelinePanel}>
              <p className={styles.sectionLabel}>Review Timeline</p>
              <h2 className={styles.sectionHeading}>
                What happens next
              </h2>
              <div className={styles.timeline}>
                {TIMELINE.map((item) => (
                  <article key={item.stage} className={styles.timelineItem}>
                    <span className={styles.timelineState}>{item.state}</span>
                    <h3>{item.stage}</h3>
                    <p>{item.detail}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className={styles.orderSection} aria-labelledby="confirmed-items-heading">
          <div className={styles.orderInner}>
            <div className={styles.orderHeader}>
              <div>
                <p className={styles.sectionLabel}>Confirmed Items</p>
                <h2 id="confirmed-items-heading" className={styles.sectionHeading}>
                  Submitted commission drafts
                </h2>
              </div>
              <p className={styles.orderMeta}>
                {MOCK_ORDER_ITEMS.length} pairs awaiting atelier approval
              </p>
            </div>

            <div className={styles.orderGrid}>
              {MOCK_ORDER_ITEMS.map((item) => {
                const product = productById(item.productId)
                const specs = orderItemSpecs(item)

                return (
                  <article key={item.id} className={styles.itemCard}>
                    <Link
                      to={`/collection/${product.id}`}
                      className={styles.imageLink}
                      aria-label={`View ${product.name}`}
                    >
                      <img
                        src={product.imageSrc}
                        alt={`${product.name} - ${product.colorway}`}
                        className={styles.itemImage}
                        loading="lazy"
                        draggable={false}
                      />
                    </Link>

                    <div className={styles.itemBody}>
                      <div className={styles.itemTop}>
                        <div>
                          <p className={styles.itemStatus}>Submitted for review</p>
                          <h3 className={styles.itemTitle}>{product.name}</h3>
                          <p className={styles.itemSubtitle}>{product.subtitle}</p>
                        </div>
                        <p className={styles.itemPrice}>${orderItemTotal(item).toLocaleString()}</p>
                      </div>

                      <dl className={styles.specList}>
                        {specs.map(([label, value]) => (
                          <div key={label} className={styles.specRow}>
                            <dt>{label}</dt>
                            <dd>{value}</dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </section>
      </main>

      <FooterStrip />
    </div>
  )
}
