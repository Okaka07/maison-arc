import { useState, useMemo, useRef, useCallback, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import ConfigHeader from '../../components/configurator/ConfigHeader'
import ModelPicker from '../../components/configurator/ModelPicker'
import ReviewPanel from '../../components/configurator/ReviewPanel'
import OptionGroup from '../../components/product/OptionGroup'
import SizeSelector from '../../components/product/SizeSelector'
import MonogramInput from '../../components/product/MonogramInput'
import ProductHeroImage from '../../components/hero/ProductHeroImage'
import { PRODUCTS, type Product } from '../../data/products'
import { STEP_META } from '../../data/stepsMeta'
import {
  UPPER_COLORS,
  SOLE_COLORS,
  HARDWARE_OPTIONS,
  UPPER_MATERIALS,
  LINING_OPTIONS,
  LACE_COLORS,
  DEFAULT_CONFIG,
  type ConfigState,
} from '../../data/configuratorOptions'
import { calcPrice } from '../../utils/calcPrice'
import { usePageTitle } from '../../hooks/usePageTitle'
import styles from './ConfiguratorPage.module.css'

const TOTAL_STEPS = STEP_META.length

export default function ConfiguratorPage() {
  const [searchParams] = useSearchParams()
  const initialModel   = PRODUCTS.find((p) => p.id === searchParams.get('model') && p.badge !== 'Sold Out') ?? null

  const [step,      setStep]      = useState(initialModel ? 1 : 0)
  const [direction, setDirection] = useState<1 | -1>(1)
  const [model,     setModel]     = useState<Product | null>(initialModel)
  const [config,    setConfig]    = useState<ConfigState>(DEFAULT_CONFIG)
  const [submitted, setSubmitted] = useState(false)
  const animKey           = useRef(0)
  const stepContentRef    = useRef<HTMLDivElement>(null)
  const confirmHeadingRef = useRef<HTMLHeadingElement>(null)

  usePageTitle(model ? `Configure ${model.name}` : 'Configurator')

  /* ── Price ── */
  const totalPrice = useMemo(
    () => (model ? calcPrice(model.price, config) : 0),
    [model, config],
  )

  /* ── Navigation ── */
  const canAdvance = useCallback((): boolean => {
    if (step === 0) return model !== null
    if (step === 4) return config.size !== null
    return true
  }, [step, model, config.size])

  const goTo = useCallback((next: number, dir: 1 | -1 = 1) => {
    animKey.current += 1
    setDirection(dir)
    setStep(next)
  }, [])

  const next = useCallback(() => {
    if (canAdvance() && step < TOTAL_STEPS - 1) goTo(step + 1, 1)
  }, [canAdvance, step, goTo])

  const prev = useCallback(() => {
    if (step > 0) goTo(step - 1, -1)
  }, [step, goTo])

  const set = useCallback(
    (key: keyof ConfigState) => (val: string) =>
      setConfig((c) => ({ ...c, [key]: val })),
    [],
  )

  const setSize = useCallback(
    (eu: number) => setConfig((c) => ({ ...c, size: eu })),
    [],
  )

  /* ── Focus management ── */
  useEffect(() => {
    if (!submitted) stepContentRef.current?.focus()
  }, [step, submitted])

  useEffect(() => {
    if (submitted) confirmHeadingRef.current?.focus()
  }, [submitted])

  /* ── Viewer image ── */
  const viewerSrc  = model?.imageSrc ?? '/shoes/upscaled_transparent.png'
  const viewerAlt  = model ? `${model.name} — ${model.colorway}` : 'Maison Arc shoe'
  const viewerTint = UPPER_COLORS.find((c) => c.id === config.color)?.hex

  if (submitted) {
    return (
      <div className={styles.confirmationPage}>
        <div className={styles.confirmationInner}>
          <div className={styles.confirmationIcon} aria-hidden="true">✓</div>
          <h1
            ref={confirmHeadingRef}
            className={styles.confirmationHeading}
            tabIndex={-1}
          >
            Configuration Received
          </h1>
          <p className={styles.confirmationSub}>
            Thank you. Our craftsmen will review your configuration within 48 hours and reach out to confirm production.
          </p>
          <div className={styles.confirmationMeta}>
            <span>{model?.name}</span>
            <span aria-hidden="true">·</span>
            <span>${totalPrice.toLocaleString()}</span>
          </div>
          <Link to="/collection" className={styles.confirmationBack}>
            Continue browsing <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      {/* Visually-hidden page h1 — configurator steps use h2 */}
      <h1 className="sr-only">
        {model ? `Configure ${model.name} — Maison Arc` : 'Maison Arc Shoe Configurator'}
      </h1>

      {/* Screen-reader step announcement */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {STEP_META[step].title} — step {step + 1} of {TOTAL_STEPS}
      </div>

      <ConfigHeader
        currentStep={step}
        onStepClick={(i) => i < step && goTo(i, -1)}
        exitTo="/collection"
      />

      <div className={styles.layout}>
        {/* ── LEFT: Sticky shoe viewer — decorative, hidden from AT ── */}
        <div className={styles.viewerCol} aria-hidden="true">
          <div className={styles.viewerInner}>
            <ProductHeroImage
              modelName={model?.name ?? ''}
              price={model ? `$${totalPrice.toLocaleString()}` : ''}
              imageSrc={viewerSrc}
              imageAlt={viewerAlt}
              hideMeta
              noBlend
              tintColor={viewerTint}
            />

            {/* Live config dots */}
            {model && step > 0 && (
              <div className={styles.configDots} aria-hidden="true">
                {[
                  UPPER_COLORS.find((c)    => c.id === config.color),
                  SOLE_COLORS.find((s)     => s.id === config.sole),
                  HARDWARE_OPTIONS.find((h) => h.id === config.hardware),
                  LACE_COLORS.find((l)     => l.id === config.lace),
                ].map((opt, i) => opt && (
                  <span
                    key={i}
                    className={styles.configDot}
                    style={{ background: opt.hex }}
                    title={opt.label}
                  />
                ))}
              </div>
            )}

            {model && (
              <p className={styles.viewerMeta}>
                {model.name} · {model.subtitle} · {model.configurableOptions} options
              </p>
            )}
          </div>
        </div>

        {/* ── RIGHT: Step panel ── */}
        <div className={styles.stepCol} aria-label="Configuration steps">
          <div className={styles.stepInner}>

            {/* Animated step content */}
            <div
              ref={stepContentRef}
              key={animKey.current}
              tabIndex={-1}
              className={[
                styles.stepContent,
                direction === 1 ? styles.slideInRight : styles.slideInLeft,
              ].join(' ')}
            >
              {step === 0 && (
                <ModelPicker
                  selectedId={model?.id ?? null}
                  onSelect={setModel}
                />
              )}

              {step === 1 && (
                <div className={styles.optionPage}>
                  <StepHeading step={step} />
                  <OptionGroup label="Upper Material" type="text"   options={UPPER_MATERIALS} selectedId={config.material} onSelect={set('material')} />
                  <OptionGroup label="Upper Color"    type="swatch" options={UPPER_COLORS}    selectedId={config.color}    onSelect={set('color')} />
                </div>
              )}

              {step === 2 && (
                <div className={styles.optionPage}>
                  <StepHeading step={step} />
                  <OptionGroup label="Sole"   type="swatch" options={SOLE_COLORS}    selectedId={config.sole}   onSelect={set('sole')} />
                  <OptionGroup label="Lining" type="text"   options={LINING_OPTIONS} selectedId={config.lining} onSelect={set('lining')} />
                </div>
              )}

              {step === 3 && (
                <div className={styles.optionPage}>
                  <StepHeading step={step} />
                  <OptionGroup label="Hardware"   type="swatch" options={HARDWARE_OPTIONS} selectedId={config.hardware} onSelect={set('hardware')} />
                  <OptionGroup label="Lace Color" type="swatch" options={LACE_COLORS}      selectedId={config.lace}     onSelect={set('lace')} />
                  <MonogramInput value={config.monogram} onChange={set('monogram')} />
                </div>
              )}

              {step === 4 && (
                <div className={styles.optionPage}>
                  <StepHeading step={step} />
                  <SizeSelector selected={config.size} onSelect={setSize} />
                </div>
              )}

              {step === 5 && model && (
                <ReviewPanel
                  product={model}
                  config={config}
                  totalPrice={totalPrice}
                  onEdit={(s) => goTo(s, -1)}
                />
              )}
            </div>

            {/* ── Prev / Next ── */}
            <div className={styles.stepNav}>
              <button
                className={styles.prevBtn}
                onClick={prev}
                disabled={step === 0}
                aria-label="Previous step"
              >
                <span aria-hidden="true">←</span> Back
              </button>

              <div className={styles.stepIndicator} aria-hidden="true">
                {step + 1} / {TOTAL_STEPS}
              </div>

              {step < TOTAL_STEPS - 1 ? (
                <button
                  className={[styles.nextBtn, !canAdvance() ? styles.nextBtnDisabled : ''].join(' ')}
                  onClick={next}
                  disabled={!canAdvance()}
                  aria-label={canAdvance() ? 'Next step' : step === 0 ? 'Select a model to continue' : 'Select a size to continue'}
                >
                  {step === 0
                    ? model ? 'Continue' : 'Select a Model'
                    : step === 4 && !config.size ? 'Select a Size'
                    : 'Continue'
                  }
                  {canAdvance() && <span aria-hidden="true"> →</span>}
                </button>
              ) : (
                <button
                  className={[styles.nextBtn, !config.size ? styles.nextBtnDisabled : ''].join(' ')}
                  onClick={() => config.size && setSubmitted(true)}
                  disabled={!config.size}
                  aria-label={config.size ? `Submit order — $${totalPrice.toLocaleString()}` : 'Select a size before submitting'}
                >
                  Submit Order — ${totalPrice.toLocaleString()}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function StepHeading({ step }: { step: number }) {
  const meta = STEP_META[step]
  return (
    <div className={styles.stepHeadingWrap}>
      <h2 className={styles.stepHeadingTitle}>{meta.title}</h2>
      <p className={styles.stepHeadingSub}>{meta.sub}</p>
    </div>
  )
}
