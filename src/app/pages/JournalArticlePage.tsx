import { Link, Navigate, useParams } from 'react-router-dom'
import Navbar from '../../components/layout/Navbar'
import FooterStrip from '../../components/layout/FooterStrip'
import SeriesLabel from '../../components/hero/SeriesLabel'
import BulletList from '../../components/hero/BulletList'
import Button from '../../components/ui/Button'
import { usePageTitle } from '../../hooks/usePageTitle'
import { getJournalArticle, JOURNAL_ARTICLES } from '../../data/journal'
import styles from './JournalArticlePage.module.css'

export default function JournalArticlePage() {
  const { articleId } = useParams<{ articleId: string }>()
  const article = articleId ? getJournalArticle(articleId) : undefined

  usePageTitle(article ? article.title : 'Journal')

  if (!article) {
    return <Navigate to="/journal" replace />
  }

  const relatedArticles = JOURNAL_ARTICLES.filter((entry) => entry.id !== article.id).slice(0, 2)

  return (
    <div className={styles.page}>
      <a href="#journal-article-main" className="skipLink">
        Skip to article content
      </a>

      <Navbar />

      <main id="journal-article-main" className={styles.main}>
        <header className={styles.pageHeader}>
          <div className={styles.pageHeaderInner}>
            <div className={styles.breadcrumb} aria-label="Page location">
              <Link to="/journal" className={styles.breadcrumbLink}>Journal</Link>
              <span aria-hidden="true" className={styles.breadcrumbSep}>/</span>
              <span>{article.eyebrow}</span>
            </div>

            <div className={styles.headingBlock}>
              <p className={styles.sectionLabel}>{article.eyebrow}</p>
              <h1 className={styles.heading}>{article.title}</h1>
              <SeriesLabel text={article.seriesLabel} />
            </div>

            <div className={styles.metaRow}>
              <p className={styles.subheading}>{article.excerpt}</p>
              <div className={styles.metaBlock}>
                <p className={styles.metaItem}>{article.meta}</p>
                <p className={styles.metaItem}>{article.readTime}</p>
              </div>
            </div>
          </div>
        </header>

        <section className={styles.articleSection} aria-labelledby="article-body-heading">
          <div className={styles.articleInner}>
            <article className={styles.articleBody}>
              <h2 id="article-body-heading" className="sr-only">
                Article body
              </h2>

              <blockquote className={styles.pullQuote}>
                <p>{article.pullQuote}</p>
              </blockquote>

              {article.sections.map((section) => (
                <section key={section.heading} className={styles.copySection}>
                  <h2 className={styles.sectionHeading}>{section.heading}</h2>
                  {section.body.map((paragraph) => (
                    <p key={paragraph} className={styles.bodyCopy}>
                      {paragraph}
                    </p>
                  ))}
                </section>
              ))}

              <div className={styles.primaryAction}>
                <p className={styles.primaryActionLabel}>Continue from the journal</p>
                <Button as="link" to={article.relatedRoute} variant="primary">
                  {article.relatedCtaLabel}
                </Button>
              </div>
            </article>

            <aside className={styles.aside} aria-label="Article notes">
              <div className={styles.asideCard}>
                <p className={styles.asideLabel}>{article.asideTitle}</p>
                <div className={styles.bulletWrap}>
                  <BulletList items={article.asideItems} />
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section className={styles.relatedSection} aria-labelledby="related-heading">
          <div className={styles.relatedInner}>
            <div className={styles.relatedHeader}>
              <div>
                <p className={styles.sectionLabel}>Further Reading</p>
                <h2 id="related-heading" className={styles.sectionHeading}>
                  More dispatches from the house
                </h2>
              </div>
              <Button as="link" to="/journal" variant="ghost">
                Back to the index {'->'}
              </Button>
            </div>

            <div className={styles.relatedGrid}>
              {relatedArticles.map((entry) => (
                <article key={entry.id} className={styles.relatedCard}>
                  <p className={styles.relatedEyebrow}>{entry.eyebrow}</p>
                  <p className={styles.relatedMeta}>{entry.meta}</p>
                  <h3 className={styles.relatedTitle}>{entry.title}</h3>
                  <p className={styles.relatedExcerpt}>{entry.excerpt}</p>
                  <Button as="link" to={`/journal/${entry.id}`} variant="ghost" className={styles.relatedCta}>
                    Read entry {'->'}
                  </Button>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <FooterStrip />
    </div>
  )
}
