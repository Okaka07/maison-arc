import Navbar from '../../components/layout/Navbar'
import FooterStrip from '../../components/layout/FooterStrip'
import BulletList from '../../components/hero/BulletList'
import SeriesLabel from '../../components/hero/SeriesLabel'
import Button from '../../components/ui/Button'
import { usePageTitle } from '../../hooks/usePageTitle'
import styles from './AtelierPage.module.css'

const PROCESS_STEPS = [
  {
    number: '01',
    title: 'Design Consultation',
    body: 'Every commission begins with your configuration — material, colour, sole, hardware, and monogram. Our craftsmen review each detail before a single cut is made.',
  },
  {
    number: '02',
    title: 'Material Selection',
    body: 'Full-grain leathers and suedes are sourced from tanneries in Santa Croce sull\'Arno and Córdoba — aged under the same conditions as our master pair. Only hides that pass a tactile grade are accepted.',
  },
  {
    number: '03',
    title: 'Pattern Cutting',
    body: 'Each upper is cut by hand using steel-rule dies pressed against a marble slab. Alignment is measured to the half-millimetre. Waste is returned to the tannery for upcycling.',
  },
  {
    number: '04',
    title: 'Lasting & Construction',
    body: 'Uppers are hand-lasted over a wooden last specific to your size. The welt is sewn at 9 stitches per centimetre using waxed linen thread — the same count as our 1987 archive pair.',
  },
  {
    number: '05',
    title: 'Finishing',
    body: 'Edges are hand-burnished with bone and beeswax. Hardware is hand-set, not pressed. Monogram initials are hot-stamped in gold leaf, then sealed under a clear lacquer.',
  },
  {
    number: '06',
    title: 'Quality Sign-Off',
    body: 'Every completed pair is inspected across 42 checkpoints by the same craftsman who built it. A signed card bearing their name ships with your order.',
  },
]

const MATERIAL_PILLARS = [
  {
    label: 'Full-Grain Leather',
    description: 'The outermost layer of the hide — the strongest, most breathable, and most characterful. Develops a patina unique to the wearer over time.',
  },
  {
    label: 'Vegetal Suede',
    description: 'Nubuck-buffed calf, vegetable-tanned over six weeks. Soft to the touch, resilient under wear, and able to be restored to near-original condition.',
  },
  {
    label: 'Cork & Leather Insole',
    description: 'A dual-layer insole of natural cork and vegetable-tanned leather that moulds to the foot over the first 20 wears, creating a bespoke footbed.',
  },
  {
    label: 'Vibram Cupsole',
    description: 'Precision-moulded in Milan. The compound is formulated specifically for Maison Arc — a Shore-A hardness of 62, optimised for urban wear without sacrificing flexibility.',
  },
]

const ATELIER_BULLETS = [
  'Founded in Lisbon, 2019',
  'Fewer than 1,200 pairs produced annually',
  'Each pair signed by its craftsman',
]

export default function AtelierPage() {
  usePageTitle('Atelier')

  return (
    <div className={styles.page}>
      <a href="#atelier-main" className="skipLink">
        Skip to atelier content
      </a>

      <Navbar />

      <main id="atelier-main" className={styles.main}>

        {/* ── Page header ── */}
        <header className={styles.pageHeader}>
          <div className={styles.pageHeaderInner}>
            <div className={styles.breadcrumb} aria-label="Page location">
              <span>Maison Arc</span>
              <span aria-hidden="true" className={styles.breadcrumbSep}>/</span>
              <span>Atelier</span>
            </div>

            <div className={styles.headingRow}>
              <h1 className={styles.heading}>
                The Atelier
                <em className={styles.headingAccent}> — Lisbon</em>
              </h1>
              <SeriesLabel text="Est. 2019 / Alfama" />
            </div>

            <p className={styles.subheading}>
              Situated in a converted nineteenth-century warehouse in Alfama, our atelier houses
              twelve craftsmen who each spend a minimum of four years in apprenticeship before
              producing a pair under the Maison Arc name.
            </p>
          </div>
        </header>

        {/* ── Manifesto ── */}
        <section className={styles.manifesto} aria-labelledby="manifesto-heading">
          <div className={styles.manifestoInner}>
            <span className={styles.manifestoRule} aria-hidden="true" />
            <div className={styles.manifestoContent}>
              <p id="manifesto-heading" className={styles.manifestoQuote}>
                "We do not make shoes for the season. We make shoes for a lifetime — and then we
                make them again, exactly as you asked."
              </p>
              <p className={styles.manifestoAttrib}>— Rafael Gonçalves, Head Craftsman</p>
            </div>
            <span className={styles.manifestoRule} aria-hidden="true" />
          </div>
        </section>

        {/* ── Space ── */}
        <section className={styles.space} aria-labelledby="space-heading">
          <div className={styles.spaceInner}>
            <div className={styles.spaceText}>
              <h2 id="space-heading" className={styles.sectionHeading}>
                The Space
              </h2>
              <p className={styles.sectionBody}>
                The atelier occupies 840 square metres across two floors of a building that once
                housed a Lisbon cooperage. The original cedar beams and terracotta floors remain
                intact. We work under northern natural light — chosen deliberately to reveal
                the true character of a hide rather than flatter it.
              </p>
              <p className={styles.sectionBody}>
                The ground floor is open to commission holders by appointment. You will meet the
                craftsman assigned to your pair, observe the lasting process, and leave with a
                deeper understanding of what you are wearing.
              </p>
              <div className={styles.bulletWrap}>
                <BulletList items={ATELIER_BULLETS} />
              </div>
            </div>

            <div className={styles.spaceStats} aria-label="Atelier at a glance">
              {[
                { value: '840', unit: 'm²', label: 'workshop floor' },
                { value: '12', unit: '', label: 'craftsmen' },
                { value: '42', unit: '', label: 'quality checkpoints' },
                { value: '4+', unit: 'yr', label: 'apprenticeship minimum' },
              ].map(({ value, unit, label }) => (
                <div key={label} className={styles.stat}>
                  <p className={styles.statValue}>
                    {value}<span className={styles.statUnit}>{unit}</span>
                  </p>
                  <p className={styles.statLabel}>{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Process ── */}
        <section className={styles.process} aria-labelledby="process-heading">
          <div className={styles.processInner}>
            <div className={styles.processHeader}>
              <h2 id="process-heading" className={styles.sectionHeading}>
                The Process
              </h2>
              <p className={styles.sectionBody} style={{ maxWidth: '420px' }}>
                From configuration to delivery in 6–8 weeks. Every step is performed by hand in
                our Lisbon atelier.
              </p>
            </div>

            <ol className={styles.stepsList} aria-label="Production process steps">
              {PROCESS_STEPS.map((step) => (
                <li key={step.number} className={styles.step}>
                  <span className={styles.stepNumber} aria-hidden="true">{step.number}</span>
                  <div className={styles.stepContent}>
                    <h3 className={styles.stepTitle}>{step.title}</h3>
                    <p className={styles.stepBody}>{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── Materials ── */}
        <section className={styles.materials} aria-labelledby="materials-heading">
          <div className={styles.materialsInner}>
            <h2 id="materials-heading" className={styles.sectionHeading}>
              Materials
            </h2>
            <p className={styles.sectionBody} style={{ maxWidth: '480px', marginBottom: '48px' }}>
              We source exclusively from tanneries that share our position on traceability —
              every hide is traceable to farm of origin.
            </p>

            <div className={styles.materialsGrid}>
              {MATERIAL_PILLARS.map(({ label, description }) => (
                <article key={label} className={styles.materialCard}>
                  <div className={styles.materialLine} aria-hidden="true" />
                  <h3 className={styles.materialLabel}>{label}</h3>
                  <p className={styles.materialDesc}>{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className={styles.cta} aria-labelledby="cta-heading">
          <div className={styles.ctaInner}>
            <p className={styles.ctaLabel}>Begin your commission</p>
            <h2 id="cta-heading" className={styles.ctaHeading}>
              Configure your pair
            </h2>
            <p className={styles.ctaBody}>
              Select your model, materials, and details. Your configuration will be reviewed by the
              craftsman assigned to your commission within 48 hours.
            </p>
            <div className={styles.ctaActions}>
              <Button as="link" to="/configure" variant="primary">
                Begin Configuration
              </Button>
              <Button as="link" to="/collection" variant="ghost">
                View Collection&nbsp;<span aria-hidden="true">→</span>
              </Button>
            </div>
          </div>
        </section>

      </main>

      <FooterStrip />
    </div>
  )
}
