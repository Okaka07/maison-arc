import { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './ProductCard.module.css'
import type { Product } from '../../data/products'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const [imgLoaded, setImgLoaded] = useState(false)
  const isSoldOut = product.badge === 'Sold Out'
  const productUrl = `/collection/${product.id}`

  return (
    <article className={styles.card}>
      {/* Entire image area is a link to the product page */}
      <Link
        to={productUrl}
        className={styles.imageLink}
        tabIndex={-1}
        aria-hidden="true"
      >
        <div className={styles.imageWrap}>
          <div className={[styles.shimmer, imgLoaded ? styles.shimmerHidden : ''].join(' ')} aria-hidden="true" />

          <img
            src={product.imageSrc}
            alt=""
            className={styles.image}
            loading="lazy"
            onLoad={() => setImgLoaded(true)}
            draggable={false}
          />

          {product.badge && (
            <span
              className={[
                styles.badge,
                isSoldOut                           ? styles.badgeSoldOut  : '',
                product.badge === 'New'             ? styles.badgeNew      : '',
                product.badge.startsWith('Limited') ? styles.badgeLimited  : '',
                product.badge.startsWith('Last')    ? styles.badgeLast     : '',
              ].filter(Boolean).join(' ')}
            >
              {product.badge}
            </span>
          )}

          {!isSoldOut && (
            <div className={styles.overlay} aria-hidden="true">
              <span className={styles.overlayText}>
                {product.configurableOptions} options to configure
              </span>
            </div>
          )}
        </div>
      </Link>

      {/* Text */}
      <div className={styles.info}>
        <div className={styles.infoTop}>
          <div>
            <h2 className={styles.name}>{product.name}</h2>
            <p className={styles.subtitle}>{product.subtitle}</p>
            <p className={styles.colorway}>{product.colorway}</p>
          </div>
          <p className={styles.price}>${product.price.toLocaleString()}</p>
        </div>

        {isSoldOut ? (
          <span
            className={[styles.cta, styles.ctaDisabled].join(' ')}
            aria-label={`${product.name} — ${product.colorway} is sold out`}
          >
            Sold Out
          </span>
        ) : (
          <Link
            to={productUrl}
            className={styles.cta}
            aria-label={`Configure ${product.name} — ${product.colorway}`}
          >
            Configure
            <span aria-hidden="true" className={styles.ctaArrow}>→</span>
          </Link>
        )}
      </div>
    </article>
  )
}
