import { useState, useMemo, useCallback } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import Navbar from '../../components/layout/Navbar'
import FooterStrip from '../../components/layout/FooterStrip'
import ProductHeroImage from '../../components/hero/ProductHeroImage'
import OptionGroup from '../../components/product/OptionGroup'
import SizeSelector from '../../components/product/SizeSelector'
import MonogramInput from '../../components/product/MonogramInput'
import { PRODUCTS } from '../../data/products'
import {
  UPPER_MATERIALS,
  UPPER_COLORS,
  SOLE_COLORS,
  LINING_OPTIONS,
  HARDWARE_OPTIONS,
  LACE_COLORS,
  DEFAULT_CONFIG,
  type ConfigState,
} from '../../data/configuratorOptions'
import { calcPrice } from '../../utils/calcPrice'
import { usePageTitle } from '../../hooks/usePageTitle'
import styles from './ProductPage.module.css'

export default function ProductPage() {
  const { modelId } = useParams<{ modelId: string }>()
  const product = PRODUCTS.find((p) => p.id === modelId)
  const displayProduct = product ?? PRODUCTS[0]

  const [config, setConfig] = useState<ConfigState>(DEFAULT_CONFIG)

  usePageTitle(product?.name, {
    description: product
      ? `Configure ${product.name}, a bespoke Maison Arc ${product.subtitle.toLowerCase()} with custom materials, sizing, and finish.`
      : 'Browse Maison Arc bespoke footwear models.',
  })

  const isSoldOut = displayProduct.badge === 'Sold Out'

  const totalPrice = useMemo(
    () => calcPrice(displayProduct.price, config),
    [config, displayProduct.price],
  )

  const set = useCallback(
    (key: keyof ConfigState) => (val: string) =>
      setConfig((prev) => ({ ...prev, [key]: val })),
    [],
  )

  const setSize = useCallback(
    (eu: number) => setConfig((prev) => ({ ...prev, size: eu })),
    [],
  )

  const selectedColor = UPPER_COLORS.find((c) => c.id === config.color)
  const selectedSole  = SOLE_COLORS.find((s) => s.id === config.sole)

  const canOrder = !isSoldOut && config.size !== null

  if (!product) return <Navigate to="/collection" replace />

  return (
    <div className={styles.page}>
      <a href="#configurator" className="skipLink">
        Skip to configurator
      </a>

      <Navbar />

      <main id="configurator" className={styles.main}>
        <div className={styles.layout}>

          {/* ── LEFT: Sticky viewer ── */}
          <div className={styles.viewerCol} aria-label="Product preview">
            <div className={styles.viewerSticky}>
              <ProductHeroImage
                modelName={product.name}
                price={`$${totalPrice.toLocaleString()}`}
                imageSrc={product.imageSrc}
                imageAlt={`${product.name} — ${product.colorway}`}
                hideMeta
                noBlend
                tintColor={selectedColor?.hex}
              />

              {/* Live config summary under image */}
              <div className={styles.viewerSummary} aria-live="polite" aria-label="Current configuration">
                <span
                  className={styles.colorDot}
                  style={{ background: selectedColor?.hex }}
                  aria-hidden="true"
                />
                <span className={styles.summaryText}>
                  {selectedColor?.label} {UPPER_MATERIALS.find(m => m.id === config.material)?.label}
                </span>
                <span className={styles.summaryDiv} aria-hidden="true">/</span>
                <span
                  className={styles.colorDot}
                  style={{ background: selectedSole?.hex }}
                  aria-hidden="true"
                />
                <span className={styles.summaryText}>{selectedSole?.label} Sole</span>
              </div>

              <p className={styles.viewerMeta}>
                Handcrafted in Lisbon · 6–8 week lead time
              </p>
            </div>
          </div>

          {/* ── RIGHT: Configurator panel ── */}
          <div className={styles.configCol}>

            {/* Breadcrumb */}
            <nav className={styles.breadcrumb} aria-label="Page location">
              <Link to="/collection" className={styles.breadcrumbLink}>Collection</Link>
              <span aria-hidden="true" className={styles.breadcrumbSep}>/</span>
              <span>{product.name}</span>
            </nav>

            {/* Product heading */}
            <div className={styles.productHead}>
              {product.badge && !isSoldOut && (
                <span className={styles.badge}>{product.badge}</span>
              )}
              <h1 className={styles.name}>{product.name}</h1>
              <p className={styles.subtitle}>{product.subtitle}</p>

              <div className={styles.priceRow}>
                <p className={styles.price}>${totalPrice.toLocaleString()}</p>
                {totalPrice > product.price && (
                  <p className={styles.priceBase} aria-label={`Base price $${product.price.toLocaleString()}`}>
                    From ${product.price.toLocaleString()}
                  </p>
                )}
              </div>
            </div>

            {isSoldOut ? (
              <div className={styles.soldOutNotice} role="status">
                <p className={styles.soldOutText}>This model is sold out.</p>
                <Link to="/collection" className={styles.soldOutLink}>
                  Browse available models <span aria-hidden="true">→</span>
                </Link>
              </div>
            ) : (
              <>
                {/* ── Configuration sections ── */}
                <div className={styles.sections} aria-label="Configuration options">

                  <OptionGroup
                    label="Upper Material"
                    type="text"
                    options={UPPER_MATERIALS}
                    selectedId={config.material}
                    onSelect={set('material')}
                  />

                  <OptionGroup
                    label="Upper Color"
                    type="swatch"
                    options={UPPER_COLORS}
                    selectedId={config.color}
                    onSelect={set('color')}
                  />

                  <OptionGroup
                    label="Sole"
                    type="swatch"
                    options={SOLE_COLORS}
                    selectedId={config.sole}
                    onSelect={set('sole')}
                  />

                  <OptionGroup
                    label="Lining"
                    type="text"
                    options={LINING_OPTIONS}
                    selectedId={config.lining}
                    onSelect={set('lining')}
                  />

                  <OptionGroup
                    label="Hardware"
                    type="swatch"
                    options={HARDWARE_OPTIONS}
                    selectedId={config.hardware}
                    onSelect={set('hardware')}
                  />

                  <OptionGroup
                    label="Lace Color"
                    type="swatch"
                    options={LACE_COLORS}
                    selectedId={config.lace}
                    onSelect={set('lace')}
                  />

                  <MonogramInput value={config.monogram} onChange={set('monogram')} />

                </div>

                {/* Size */}
                <SizeSelector selected={config.size} onSelect={setSize} />

                {/* CTA */}
                <div className={styles.cta}>
                  {canOrder ? (
                    <Link
                      to={`/configure?model=${product.id}`}
                      className={styles.ctaBtn}
                      aria-label={`Begin order — ${product.name} — $${totalPrice.toLocaleString()}`}
                    >
                      Begin Order
                      <span className={styles.ctaPrice} aria-hidden="true">
                        — ${totalPrice.toLocaleString()}
                      </span>
                    </Link>
                  ) : (
                    <button
                      className={[styles.ctaBtn, styles.ctaBtnDisabled].join(' ')}
                      disabled
                      aria-disabled={true}
                      aria-label="Select a size to continue"
                    >
                      Select a Size to Continue
                    </button>
                  )}

                  <p className={styles.ctaNote}>
                    Complimentary monogramming · Free global shipping · Lifetime sole replacement
                  </p>
                </div>
              </>
            )}

          </div>
        </div>
      </main>

      <FooterStrip />
    </div>
  )
}
