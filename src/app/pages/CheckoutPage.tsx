import { Link } from 'react-router-dom'
import Navbar from '../../components/layout/Navbar'
import FooterStrip from '../../components/layout/FooterStrip'
import SeriesLabel from '../../components/hero/SeriesLabel'
import BulletList from '../../components/hero/BulletList'
import Button from '../../components/ui/Button'
import {
  SOLE_COLORS,
  LINING_OPTIONS,
  HARDWARE_OPTIONS,
  LACE_COLORS,
} from '../../data/configuratorOptions'
import {
  MOCK_CLIENT_FIELDS,
  MOCK_DELIVERY_FIELDS,
  MOCK_ORDER_ITEMS,
  optionLabel,
  orderItemShortSpecs,
  orderItemTotal,
  orderTotals,
  productById,
} from '../../data/mockOrder'
import { usePageTitle } from '../../hooks/usePageTitle'
import styles from './CheckoutPage.module.css'

const CHECKOUT_NOTES = [
  'This page is a prototype checkout review',
  'Deposit capture is not connected to a payment provider yet',
  'The atelier confirms final pricing before production begins',
]

export default function CheckoutPage() {
  usePageTitle('Checkout', {
    description: 'Confirm Maison Arc client, delivery, and atelier deposit details before commission submission.',
  })

  const { subtotal, atelierDeposit, remainingBalance } = orderTotals()

  return (
    <div className={styles.page}>
      <a href="#checkout-main" className="skipLink">
        Skip to checkout
      </a>

      <Navbar />

      <main id="checkout-main" className={styles.main}>
        <header className={styles.pageHeader}>
          <div className={styles.pageHeaderInner}>
            <div className={styles.breadcrumb} aria-label="Page location">
              <Link to="/cart">Cart</Link>
              <span aria-hidden="true" className={styles.breadcrumbSep}>/</span>
              <span>Checkout</span>
            </div>

            <div className={styles.headingRow}>
              <div className={styles.headingBlock}>
                <h1 className={styles.heading}>
                  Checkout
                  <em className={styles.headingAccent}> — Atelier Deposit</em>
                </h1>
                <SeriesLabel text="Secure Review / Maison Arc" />
              </div>

              <p className={styles.headingMeta}>
                {MOCK_ORDER_ITEMS.length} commission drafts / 20% deposit estimate
              </p>
            </div>

            <p className={styles.subheading}>
              Confirm client details, delivery preferences, and the estimated atelier deposit
              before submitting the commission package for workshop review.
            </p>
          </div>
        </header>

        <section className={styles.checkoutSection} aria-labelledby="checkout-details-heading">
          <div className={styles.checkoutInner}>
            <div className={styles.checkoutFlow}>
              <div className={styles.flowHeader}>
                <p className={styles.sectionLabel}>Checkout Details</p>
                <h2 id="checkout-details-heading" className={styles.sectionHeading}>
                  Review before submission
                </h2>
              </div>

              <div className={styles.formGrid}>
                <section className={styles.panel} aria-labelledby="client-heading">
                  <div className={styles.panelHeader}>
                    <span className={styles.stepNumber}>01</span>
                    <div>
                      <p className={styles.panelLabel}>Client</p>
                      <h3 id="client-heading" className={styles.panelTitle}>
                        Contact details
                      </h3>
                    </div>
                  </div>

                  <dl className={styles.fieldGrid}>
                    {MOCK_CLIENT_FIELDS.map(([label, value]) => (
                      <div key={label} className={styles.field}>
                        <dt>{label}</dt>
                        <dd>{value}</dd>
                      </div>
                    ))}
                  </dl>
                </section>

                <section className={styles.panel} aria-labelledby="delivery-heading">
                  <div className={styles.panelHeader}>
                    <span className={styles.stepNumber}>02</span>
                    <div>
                      <p className={styles.panelLabel}>Delivery</p>
                      <h3 id="delivery-heading" className={styles.panelTitle}>
                        Dispatch address
                      </h3>
                    </div>
                  </div>

                  <dl className={styles.fieldGrid}>
                    {MOCK_DELIVERY_FIELDS.map(([label, value]) => (
                      <div key={label} className={styles.field}>
                        <dt>{label}</dt>
                        <dd>{value}</dd>
                      </div>
                    ))}
                  </dl>
                </section>

                <section className={styles.panel} aria-labelledby="payment-heading">
                  <div className={styles.panelHeader}>
                    <span className={styles.stepNumber}>03</span>
                    <div>
                      <p className={styles.panelLabel}>Payment</p>
                      <h3 id="payment-heading" className={styles.panelTitle}>
                        Deposit method
                      </h3>
                    </div>
                  </div>

                  <div className={styles.paymentCard}>
                    <div>
                      <p className={styles.paymentName}>Maison Arc Private Ledger</p>
                      <p className={styles.paymentDetail}>
                        Deposit authorization prepared for atelier confirmation.
                      </p>
                    </div>
                    <span>Pending</span>
                  </div>

                  <p className={styles.checkRow}>
                    Final pricing is confirmed by the atelier before production.
                  </p>
                </section>
              </div>
            </div>

            <aside className={styles.summary} aria-labelledby="checkout-summary-heading">
              <p className={styles.summaryLabel}>Order Review</p>
              <h2 id="checkout-summary-heading" className={styles.summaryHeading}>
                Deposit summary
              </h2>

              <div className={styles.orderItems}>
                {MOCK_ORDER_ITEMS.map((item) => {
                  const product = productById(item.productId)
                  const specs = orderItemShortSpecs(item)

                  return (
                    <article key={item.id} className={styles.orderItem}>
                      <img
                        src={product.imageSrc}
                        alt={`${product.name} - ${product.colorway}`}
                        className={styles.orderImage}
                        loading="lazy"
                        draggable={false}
                      />
                      <div>
                        <h3>{product.name}</h3>
                        <p>{specs.join(' / ')}</p>
                        <p>
                          {optionLabel(SOLE_COLORS, item.config.sole)} sole /{' '}
                          {optionLabel(LINING_OPTIONS, item.config.lining)} lining
                        </p>
                        <p>
                          {optionLabel(HARDWARE_OPTIONS, item.config.hardware)} hardware /{' '}
                          {optionLabel(LACE_COLORS, item.config.lace)} lace
                        </p>
                      </div>
                      <strong>${orderItemTotal(item).toLocaleString()}</strong>
                    </article>
                  )
                })}
              </div>

              <div className={styles.summaryLines}>
                <div className={styles.summaryLine}>
                  <span>Estimated subtotal</span>
                  <strong>${subtotal.toLocaleString()}</strong>
                </div>
                <div className={styles.summaryLine}>
                  <span>Atelier deposit due</span>
                  <strong>${atelierDeposit.toLocaleString()}</strong>
                </div>
                <div className={styles.summaryLine}>
                  <span>Balance after approval</span>
                  <strong>${remainingBalance.toLocaleString()}</strong>
                </div>
              </div>

              <div className={styles.summaryTotal}>
                <span>Due today</span>
                <strong>${atelierDeposit.toLocaleString()}</strong>
              </div>

              <div className={styles.summaryNotes}>
                <BulletList items={CHECKOUT_NOTES} />
              </div>

              <Button as="link" to="/order-confirmation" variant="primary" className={styles.submitBtn}>
                Submit Commission
              </Button>
              <Button as="link" to="/cart" variant="ghost">
                Return to Cart {'->'}
              </Button>
            </aside>
          </div>
        </section>

        <section className={styles.assurance} aria-labelledby="checkout-assurance-heading">
          <div className={styles.assuranceInner}>
            <p className={styles.sectionLabel}>After Submission</p>
            <h2 id="checkout-assurance-heading" className={styles.assuranceHeading}>
              The atelier reviews every specification before production
            </h2>
            <p className={styles.assuranceBody}>
              A concierge confirms fit notes, material availability, delivery timing, and
              the final balance before any pair enters the workshop queue.
            </p>
          </div>
        </section>
      </main>

      <FooterStrip />
    </div>
  )
}
