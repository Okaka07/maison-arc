import { useRef, useEffect, useCallback } from 'react'
import styles from './ProductHeroImage.module.css'

interface ProductHeroImageProps {
  modelName: string
  price: string
  imageSrc: string
  imageAlt: string
  hideMeta?: boolean
  /** Disable mix-blend-mode: multiply on the image (for transparent PNGs on dark bg) */
  noBlend?: boolean
  /** Hex color to tint the shoe upper via a multiply overlay */
  tintColor?: string
}

export default function ProductHeroImage({
  modelName,
  price,
  imageSrc,
  imageAlt,
  hideMeta = false,
  noBlend = false,
  tintColor,
}: ProductHeroImageProps) {
  const wrapRef  = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement | null>(null)

  // React 18 doesn't recognise fetchPriority as a JSX prop — set it imperatively
  const imageCallbackRef = useCallback((el: HTMLImageElement | null) => {
    imageRef.current = el
    if (el) el.setAttribute('fetchpriority', 'high')
  }, [])

  // All mutable animation state lives here — never causes re-renders
  const s = useRef({
    rotation:    0,
    velocity:    0,
    isDragging:  false,
    lastX:       0,
    physicsRaf:  0,
    hintRaf:     0,   // kept separate so onPointerDown can cancel it
    hintTimer:   0,
    hintActive:  false,
  })

  const applyTransform = useCallback((deg: number, lift = false) => {
    const el = imageRef.current
    if (!el) return
    el.style.transform = `perspective(900px) rotateY(${deg}deg) translateY(${lift ? -8 : 0}px)`
  }, [])

  // ── Physics: spring return to 0 with momentum ──
  const runPhysics = useCallback(() => {
    const st = s.current
    if (st.isDragging) return
    st.velocity = (st.velocity + -st.rotation * 0.06) * 0.88
    st.rotation += st.velocity
    applyTransform(st.rotation)
    if (Math.abs(st.rotation) > 0.05 || Math.abs(st.velocity) > 0.05) {
      st.physicsRaf = requestAnimationFrame(runPhysics)
    } else {
      st.rotation = 0
      st.velocity = 0
      applyTransform(0)
      // release GPU layer once animation settles
      if (wrapRef.current) wrapRef.current.classList.remove(styles.animating)
    }
  }, [applyTransform])

  const stopPhysics = useCallback(() => {
    cancelAnimationFrame(s.current.physicsRaf)
    s.current.physicsRaf = 0
  }, [])

  const stopHint = useCallback(() => {
    const st = s.current
    clearTimeout(st.hintTimer)
    cancelAnimationFrame(st.hintRaf)
    st.hintRaf    = 0
    st.hintActive = false
  }, [])

  // ── Hint animation: gentle rock on mount ──
  useEffect(() => {
    const st = s.current
    const DURATION = 1800

    st.hintTimer = window.setTimeout(() => {
      let start: number | null = null
      st.hintActive = true

      const tick = (ts: number) => {
        if (!st.hintActive) return           // cancelled by drag
        if (!start) start = ts
        const t   = Math.min((ts - start) / DURATION, 1)
        const deg = Math.sin(t * Math.PI * 3) * 18 * (1 - t)
        applyTransform(deg)
        if (t < 1) {
          st.hintRaf = requestAnimationFrame(tick)
        } else {
          st.hintActive = false
          applyTransform(0)
        }
      }

      st.hintRaf = requestAnimationFrame(tick)
    }, 800)

    // Cleanup both hint and physics on unmount
    return () => {
      stopHint()
      stopPhysics()
    }
  }, [applyTransform, stopHint, stopPhysics])

  // ── Pointer events ──
  const onPointerDown = useCallback((e: React.PointerEvent) => {
    stopHint()     // cancel hint before it can race with drag
    stopPhysics()
    const st      = s.current
    st.isDragging = true
    st.lastX      = e.clientX
    st.velocity   = 0
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
    // promote to GPU layer only while animating
    if (wrapRef.current) wrapRef.current.classList.add(styles.animating)
    if (wrapRef.current) wrapRef.current.style.cursor = 'grabbing'
  }, [stopHint, stopPhysics])

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    const st = s.current
    if (!st.isDragging) return
    const dx  = e.clientX - st.lastX
    st.lastX  = e.clientX
    st.velocity  = dx * 0.6
    st.rotation  = Math.max(-75, Math.min(75, st.rotation + dx * 0.45))
    applyTransform(st.rotation, true)
  }, [applyTransform])

  const endDrag = useCallback(() => {
    const st = s.current
    if (!st.isDragging) return
    st.isDragging = false
    if (wrapRef.current) wrapRef.current.style.cursor = 'grab'
    stopPhysics()
    // kick off spring return
    st.physicsRaf = requestAnimationFrame(runPhysics)
  }, [stopPhysics, runPhysics])

  return (
    <div
      className={styles.wrapper}
      aria-label={`${modelName} — ${price}`}
    >
      {/* Model name + price */}
      {!hideMeta && (
        <div className={styles.meta} aria-hidden="true">
          <p className={styles.modelName}>{modelName}</p>
          <p className={styles.price}>{price}</p>
        </div>
      )}

      {/* glow slot (disabled) */}
      <div className={styles.glow} aria-hidden="true" />

      {/* Rotation stage */}
      <div
        ref={wrapRef}
        className={styles.imageWrap}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}   // resets isDragging if pointer is lost
        style={{ cursor: 'grab' }}
      >
        <img
          ref={imageCallbackRef}
          src={imageSrc}
          alt={imageAlt}
          className={[styles.image, noBlend ? styles.imageNoBlend : ''].filter(Boolean).join(' ')}
          draggable={false}
          loading="eager"
        />
        {tintColor && (
          <div
            className={styles.colorOverlay}
            style={{ background: tintColor }}
            aria-hidden="true"
          />
        )}

        <p className={styles.dragHint} aria-hidden="true">
          <span className={styles.dragIcon}>↔</span> Drag to rotate
        </p>
      </div>
    </div>
  )
}
