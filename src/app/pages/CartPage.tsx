import { Link } from 'react-router-dom'
import Navbar from '../../components/layout/Navbar'
import FooterStrip from '../../components/layout/FooterStrip'
import SeriesLabel from '../../components/hero/SeriesLabel'
import BulletList from '../../components/hero/BulletList'
import Button from '../../components/ui/Button'
import {
  MOCK_ORDER_ITEMS,
  orderItemSpecs,
  orderItemTotal,
  orderTotals,
  productById,
} from '../../data/mockOrder'
import { usePageTitle } from '../../hooks/usePageTitle'
import styles from './CartPage.module.css'

const CART_NOTES = [
  'No payment is captured until atelier review is complete',
  'Each commission is checked within 48 hours',
  'Shipping and aftercare are confirmed before production',
]

export default function CartPage() {
  usePageTitle('Cart', {
    description: 'Review Maison Arc commission drafts before checkout and atelier approval.',
  })

  const { subtotal, atelierDeposit, remainingBalance } = orderTotals()

  return (
    <div className={styles.page}>
      <a href="#cart-main" className="skipLink">
        Skip to cart
      </a>

      <Navbar />

      <main id="cart-main" className={styles.main}>
        <header className={styles.pageHeader}>
          <div className={styles.pageHeaderInner}>
            <div className={styles.breadcrumb} aria-label="Page location">
              <span>Maison Arc</span>
              <span aria-hidden="true" className={styles.breadcrumbSep}>/</span>
              <span>Cart</span>
            </div>

            <div className={styles.headingRow}>
              <div className={styles.headingBlock}>
                <h1 className={styles.heading}>
                  Cart
                  <em className={styles.headingAccent}> — Commission Review</em>
                </h1>
                <SeriesLabel text="Private Order / Maison Arc" />
              </div>

              <p className={styles.headingMeta}>
                {MOCK_ORDER_ITEMS.length} {MOCK_ORDER_ITEMS.length === 1 ? 'item' : 'items'} pending review
              </p>
            </div>

            <p className={styles.subheading}>
              Review configured pairs before sending them to the atelier. Prices are estimates
              until the workshop confirms materials, production timing, and final specifications.
            </p>
          </div>
        </header>

        <section className={styles.cartSection} aria-labelledby="cart-items-heading">
          <div className={styles.cartInner}>
            <div className={styles.cartList}>
              <div className={styles.cartHeader}>
                <p className={styles.sectionLabel}>Cart Items</p>
                <h2 id="cart-items-heading" className={styles.sectionHeading}>
                  Commission drafts ready for review
                </h2>
              </div>

              <div className={styles.items}>
                {MOCK_ORDER_ITEMS.map((item) => {
                  const product = productById(item.productId)
                  const total = orderItemTotal(item)
                  const specs = orderItemSpecs(item)

                  return (
                    <article key={item.id} className={styles.itemCard}>
                      <Link
                        to={`/collection/${product.id}`}
                        className={styles.imageLink}
                        aria-label={`Edit ${product.name}`}
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
                            <p className={styles.itemStatus}>{item.status}</p>
                            <h3 className={styles.itemTitle}>{product.name}</h3>
                            <p className={styles.itemSubtitle}>{product.subtitle}</p>
                          </div>
                          <p className={styles.itemPrice}>${total.toLocaleString()}</p>
                        </div>

                        <dl className={styles.specList}>
                          {specs.map(([label, value]) => (
                            <div key={label} className={styles.specRow}>
                              <dt>{label}</dt>
                              <dd>{value}</dd>
                            </div>
                          ))}
                        </dl>

                        <div className={styles.itemActions}>
                          <Button as="link" to={`/collection/${product.id}`} variant="ghost">
                            Edit configuration {'->'}
                          </Button>
                        </div>
                      </div>
                    </article>
                  )
                })}
              </div>
            </div>

            <aside className={styles.summary} aria-labelledby="cart-summary-heading">
              <p className={styles.summaryLabel}>Order Summary</p>
              <h2 id="cart-summary-heading" className={styles.summaryHeading}>
                Atelier review
              </h2>

              <div className={styles.summaryLines}>
                <div className={styles.summaryLine}>
                  <span>Estimated subtotal</span>
                  <strong>${subtotal.toLocaleString()}</strong>
                </div>
                <div className={styles.summaryLine}>
                  <span>Review deposit estimate</span>
                  <strong>${atelierDeposit.toLocaleString()}</strong>
                </div>
                <div className={styles.summaryLine}>
                  <span>Balance after approval</span>
                  <strong>${remainingBalance.toLocaleString()}</strong>
                </div>
              </div>

              <div className={styles.summaryTotal}>
                <span>Total estimate</span>
                <strong>${subtotal.toLocaleString()}</strong>
              </div>

              <div className={styles.summaryNotes}>
                <BulletList items={CART_NOTES} />
              </div>

              <Button as="link" to="/checkout" variant="primary" className={styles.checkoutBtn}>
                Continue to Checkout
              </Button>
              <Button as="link" to="/collection" variant="ghost">
                Continue Shopping {'->'}
              </Button>
            </aside>
          </div>
        </section>

        <section className={styles.emptyState} aria-labelledby="cart-next-heading">
          <div className={styles.emptyInner}>
            <p className={styles.sectionLabel}>Need another pair?</p>
            <h2 id="cart-next-heading" className={styles.emptyHeading}>
              Add another commission draft
            </h2>
            <p className={styles.emptyBody}>
              Choose a model from the collection or begin from the configurator to create
              another pair before sending the order to the atelier.
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
