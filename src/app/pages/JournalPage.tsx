import Navbar from '../../components/layout/Navbar'
import FooterStrip from '../../components/layout/FooterStrip'
import SeriesLabel from '../../components/hero/SeriesLabel'
import BulletList from '../../components/hero/BulletList'
import Button from '../../components/ui/Button'
import { usePageTitle } from '../../hooks/usePageTitle'
import {
  FEATURED_JOURNAL_ENTRY,
  JOURNAL_BULLETS,
  JOURNAL_ENTRIES,
} from '../../data/journal'
import styles from './JournalPage.module.css'

export default function JournalPage() {
  usePageTitle('Journal')

  return (
    <div className={styles.page}>
      <a href="#journal-main" className="skipLink">
        Skip to journal content
      </a>

      <Navbar />

      <main id="journal-main" className={styles.main}>
        <header className={styles.pageHeader}>
          <div className={styles.pageHeaderInner}>
            <div className={styles.breadcrumb} aria-label="Page location">
              <span>Maison Arc</span>
              <span aria-hidden="true" className={styles.breadcrumbSep}>/</span>
              <span>Journal</span>
            </div>

            <div className={styles.headingRow}>
              <div className={styles.headingBlock}>
                <h1 className={styles.heading}>
                  The Journal
                  <em className={styles.headingAccent}> — Dispatches</em>
                </h1>
                <SeriesLabel text="Issue 001 / House Notes" />
              </div>

              <p className={styles.headingMeta}>
                Essays, workshop notes, and material observations from Lisbon.
              </p>
            </div>

            <p className={styles.subheading}>
              The Journal is the editorial ledger of Maison Arc: part atelier notebook,
              part collection commentary, and part record of how each commission moves
              from selection to finished pair.
            </p>
          </div>
        </header>

        <section className={styles.featured} aria-labelledby="featured-heading">
          <div className={styles.featuredInner}>
            <div className={styles.featuredCopy}>
              <p id="featured-heading" className={styles.sectionLabel}>
                {FEATURED_JOURNAL_ENTRY.eyebrow}
              </p>
              <p className={styles.featuredMeta}>{FEATURED_JOURNAL_ENTRY.meta}</p>
              <h2 className={styles.featuredTitle}>{FEATURED_JOURNAL_ENTRY.title}</h2>
              <p className={styles.featuredExcerpt}>{FEATURED_JOURNAL_ENTRY.excerpt}</p>

              <div className={styles.featuredActions}>
                <Button as="link" to={FEATURED_JOURNAL_ENTRY.route} variant="primary">
                  {FEATURED_JOURNAL_ENTRY.ctaLabel}
                </Button>
                <Button as="link" to="/collection" variant="ghost">
                  View the latest models {'->'}
                </Button>
              </div>
            </div>

            <aside className={styles.featuredAside} aria-label="Journal scope">
              <div className={styles.asideCard}>
                <p className={styles.asideLabel}>Editorial Scope</p>
                <div className={styles.bulletWrap}>
                  <BulletList items={JOURNAL_BULLETS} />
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section className={styles.dispatches} aria-labelledby="dispatches-heading">
          <div className={styles.dispatchesInner}>
            <div className={styles.dispatchesHeader}>
              <div>
                <p className={styles.sectionLabel}>Recent Entries</p>
                <h2 id="dispatches-heading" className={styles.sectionHeading}>
                  Latest dispatches from the house
                </h2>
              </div>
              <p className={styles.sectionBody}>
                Each note points back into an existing part of the experience:
                configuration, collection, or atelier.
              </p>
            </div>

            <div className={styles.grid}>
              {JOURNAL_ENTRIES.map((entry) => (
                <article key={entry.id} className={styles.card}>
                  <p className={styles.cardEyebrow}>{entry.eyebrow}</p>
                  <p className={styles.cardMeta}>{entry.meta}</p>
                  <h3 className={styles.cardTitle}>{entry.title}</h3>
                  <p className={styles.cardExcerpt}>{entry.excerpt}</p>
                  <Button as="link" to={entry.route} variant="ghost" className={styles.cardCta}>
                    {entry.ctaLabel} {'->'}
                  </Button>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.indexNote} aria-labelledby="index-note-heading">
          <div className={styles.indexNoteInner}>
            <p className={styles.sectionLabel}>Index Note</p>
            <h2 id="index-note-heading" className={styles.sectionHeading}>
              The Journal is an index first, not a detached blog.
            </h2>
            <p className={styles.sectionBody}>
              Its role is to deepen the same three areas the product already offers:
              understanding the collection, understanding the workshop, and beginning
              a commission with more confidence.
            </p>

            <div className={styles.noteActions}>
              <Button as="link" to="/atelier" variant="ghost">
                Explore the atelier {'->'}
              </Button>
              <Button as="link" to="/configure" variant="primary">
                Start a commission
              </Button>
            </div>
          </div>
        </section>
      </main>

      <FooterStrip />
    </div>
  )
}
