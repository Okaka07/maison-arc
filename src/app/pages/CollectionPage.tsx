import { useState, useMemo } from 'react'
import Navbar from '../../components/layout/Navbar'
import FooterStrip from '../../components/layout/FooterStrip'
import ProductCard from '../../components/collection/ProductCard'
import CollectionFilter from '../../components/collection/CollectionFilter'
import { PRODUCTS, type CategoryKey } from '../../data/products'
import { usePageTitle } from '../../hooks/usePageTitle'
import styles from './CollectionPage.module.css'

export default function CollectionPage() {
  usePageTitle('Collection')

  const [activeCategory, setActiveCategory] = useState<CategoryKey>('all')

  const filtered = useMemo(() =>
    activeCategory === 'all'
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === activeCategory),
    [activeCategory]
  )

  const counts = useMemo(() =>
    PRODUCTS.reduce<Record<string, number>>(
      (acc, p) => { acc[p.category] = (acc[p.category] ?? 0) + 1; return acc },
      { all: PRODUCTS.length },
    ),
    [],
  )

  return (
    <div className={styles.page}>
      <a href="#collection-main" className="skipLink">
        Skip to collection
      </a>

      <Navbar />

      <main id="collection-main" className={styles.main}>

        {/* ── Page header ── */}
        <header className={styles.pageHeader}>
          <div className={styles.pageHeaderInner}>
            <div className={styles.breadcrumb} aria-label="Page location">
              <span>Maison Arc</span>
              <span aria-hidden="true" className={styles.breadcrumbSep}>/</span>
              <span>Collection</span>
            </div>

            <div className={styles.headingRow}>
              <h1 className={styles.heading}>
                The Collection
                <em className={styles.headingAccent}> — Arc Series</em>
              </h1>
              <p className={styles.headingCount} aria-live="polite">
                {filtered.length} {filtered.length === 1 ? 'piece' : 'pieces'}
              </p>
            </div>

            <p className={styles.subheading}>
              Each model is handcrafted to order. Select a configuration to begin your bespoke journey.
            </p>
          </div>
        </header>

        {/* ── Filter bar ── */}
        <div className={styles.filterBar}>
          <div className={styles.filterBarInner}>
            <CollectionFilter
              active={activeCategory}
              counts={counts}
              onChange={setActiveCategory}
            />
            <p className={styles.filterMeta} aria-hidden="true">
              6–8 week lead time · Free global shipping
            </p>
          </div>
        </div>

        {/* ── Grid ── */}
        <section
          className={styles.grid}
          aria-label={`${activeCategory === 'all' ? 'All' : activeCategory} collection`}
        >
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </section>

        {/* ── Empty state ── */}
        {filtered.length === 0 && (
          <div className={styles.empty} role="status">
            <p className={styles.emptyText}>No pieces in this category yet.</p>
          </div>
        )}

        {/* ── Bottom editorial note ── */}
        <aside className={styles.editorialNote} aria-label="Bespoke process note">
          <div className={styles.editorialInner}>
            <span className={styles.editorialLine} aria-hidden="true" />
            <p className={styles.editorialText}>
              All pieces are made to order in our Lisbon atelier. Configurations are reviewed by our craftsmen before production begins.
            </p>
          </div>
        </aside>

      </main>

      <FooterStrip />
    </div>
  )
}
