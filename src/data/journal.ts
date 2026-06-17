export interface JournalSection {
  heading: string
  body: string[]
}

export interface JournalArticle {
  id: string
  eyebrow: string
  title: string
  excerpt: string
  meta: string
  seriesLabel: string
  readTime: string
  pullQuote: string
  asideTitle: string
  asideItems: string[]
  sections: JournalSection[]
  relatedRoute: string
  relatedCtaLabel: string
}

export interface JournalIndexEntry {
  id: string
  eyebrow: string
  title: string
  excerpt: string
  meta: string
  route: string
  ctaLabel: string
}

export const JOURNAL_ARTICLES: JournalArticle[] = [
  {
    id: 'atelier-light',
    eyebrow: 'Featured Essay',
    title: 'Northern light, cedar beams, and the discipline of the atelier floor.',
    excerpt:
      'A closer look at the Lisbon workshop, the pace of commission making, and why Maison Arc insists on a slower rhythm than the rest of the market.',
    meta: 'Issue 001 / Workshop Notes',
    seriesLabel: 'Issue 001 / Workshop Notes',
    readTime: '5 minute read',
    pullQuote:
      'The atelier is not arranged to impress the visitor. It is arranged to make decisions under honest light.',
    asideTitle: 'Essay Notes',
    asideItems: [
      'Published from Alfama, Lisbon',
      'Focused on workshop environment and pace',
      'Connected to the house production philosophy',
    ],
    sections: [
      {
        heading: 'Light as a standard',
        body: [
          'Maison Arc works under northern light because it refuses flattery. Colour, grain variation, and surface finish all read more truthfully there than they do under warmer, more forgiving lamps.',
          'That choice shapes the atelier itself: benches face the windows, material checks happen before noon whenever possible, and each hide is assessed in a condition that reveals inconsistency instead of hiding it.',
        ],
      },
      {
        heading: 'A room set for repetition',
        body: [
          'The cedar beams, terracotta floor, and open benches are not nostalgia pieces. They create a stable environment for repeated judgments: edge colour, stitch line tension, and alignment against the last.',
          'Nothing in the room asks the craftsman to move faster. Everything asks for the same answer twice before work continues.',
        ],
      },
      {
        heading: 'Why the pace stays slow',
        body: [
          'The house does not treat speed as luxury. It treats confidence as luxury: confidence that the selected leather will age as expected, that the chosen lining belongs with the upper, and that the final pair can bear the Maison Arc name without qualification.',
          'That is why commission review happens before production begins and why the workshop rhythm remains deliberate even when demand rises.',
        ],
      },
    ],
    relatedRoute: '/atelier',
    relatedCtaLabel: 'Visit the Atelier',
  },
  {
    id: 'commission-notes',
    eyebrow: 'Commission Notes',
    title: 'What changes between a configured pair and a completed commission.',
    excerpt:
      'The configurator captures your intent. The workshop review translates that intent into material availability, construction constraints, and final sign-off.',
    meta: '48-hour review / 6-8 week production',
    seriesLabel: 'Issue 001 / Commission Ledger',
    readTime: '4 minute read',
    pullQuote:
      'A configuration is a clear instruction. A commission is that instruction tested against the rules of making.',
    asideTitle: 'Commission Stages',
    asideItems: [
      'Model and material review within 48 hours',
      'Construction constraints checked before approval',
      'Final price and production window confirmed by the workshop',
    ],
    sections: [
      {
        heading: 'Intent enters the system first',
        body: [
          'The configurator is intentionally decisive. It asks for silhouette, material, colour, sole, lining, hardware, and monogram so the client can describe the pair in complete terms.',
          'By the time a configuration is submitted, the workshop already knows what kind of object is being requested and what standard it must meet.',
        ],
      },
      {
        heading: 'Review is not a formality',
        body: [
          'The 48-hour review exists because some combinations are stronger than others in use, not just in appearance. The atelier checks selected components against last shape, stock, construction method, and finishing sequence.',
          'This is where a digital selection becomes an actual commission. The goal is not to rewrite the client brief. The goal is to confirm it can be built to the house standard.',
        ],
      },
      {
        heading: 'Confirmation creates the pair',
        body: [
          'Once reviewed, the order is no longer a speculative basket. It becomes a named job on the workshop floor with a production window, a craftsman, and a fixed sequence of steps.',
          'That shift is the real dividing line between configuring a shoe and commissioning one.',
        ],
      },
    ],
    relatedRoute: '/configure',
    relatedCtaLabel: 'Begin Configuration',
  },
  {
    id: 'collection-observations',
    eyebrow: 'Collection Observations',
    title: 'Why the Arc series is organized as signature, limited, and archive.',
    excerpt:
      'The collection is arranged by permanence, rarity, and history so clients can move from core silhouettes to seasonal experiments without losing the line of the house.',
    meta: 'Signature / Limited / Archive',
    seriesLabel: 'Issue 001 / Collection Notes',
    readTime: '4 minute read',
    pullQuote:
      'The collection is not arranged by trend. It is arranged by how firmly each silhouette belongs to the permanent vocabulary of the house.',
    asideTitle: 'Collection Logic',
    asideItems: [
      'Signature models define the permanent line',
      'Limited releases test rarity and variation',
      'Archive records what shaped the current house language',
    ],
    sections: [
      {
        heading: 'Signature means structural permanence',
        body: [
          'Signature models are the clearest statement of Maison Arc proportion, stance, and finishing. They are the pairs a new client should understand first because they explain what the house considers essential.',
          'They remain available because they do not rely on novelty to justify their place.',
        ],
      },
      {
        heading: 'Limited means controlled deviation',
        body: [
          'Limited pairs allow the house to explore a material, trim, or silhouette tension without redrawing the full vocabulary of the line. Quantity stays narrow so the experiment remains legible.',
          'Rarity here is a design constraint, not just a marketing device.',
        ],
      },
      {
        heading: 'Archive is institutional memory',
        body: [
          'Archive models show what the house has already learned. Some are sold out, some are retired, but all of them help explain why current pairs look the way they do.',
          'Placed together, the three categories give the client orientation: what is core, what is rare, and what belongs to the record.',
        ],
      },
    ],
    relatedRoute: '/collection',
    relatedCtaLabel: 'View the Collection',
  },
  {
    id: 'material-standards',
    eyebrow: 'Material Standards',
    title: 'The practical reason we specify hides, linings, and hardware so narrowly.',
    excerpt:
      'Restriction is part of consistency. Each approved material has already been tested against the house last, the cupsole, and long-wear finishing standards.',
    meta: 'Leather / Suede / Hardware',
    seriesLabel: 'Issue 001 / Material Notes',
    readTime: '5 minute read',
    pullQuote:
      'Choice matters, but too much choice weakens the promise unless every option has already earned its place.',
    asideTitle: 'House Standards',
    asideItems: [
      'Every option is pre-vetted against construction method',
      'Lining and upper choices are evaluated as a pair',
      'Hardware selection is aesthetic and functional',
    ],
    sections: [
      {
        heading: 'Restriction protects the outcome',
        body: [
          'Maison Arc does not treat specification as a catalogue exercise. Every option shown to the client has already been tested against wear, finish, and compatibility with the house last.',
          'This is why the menu feels narrow compared with mass-custom products. The reduction is intentional.',
        ],
      },
      {
        heading: 'Materials are judged in combination',
        body: [
          'A leather may perform perfectly with one lining and poorly with another. A hardware finish may look correct in isolation but flatten the intended contrast of the upper once assembled.',
          'The workshop therefore treats options as relationships, not independent toggles.',
        ],
      },
      {
        heading: 'Consistency is the actual luxury',
        body: [
          'The client should be free to personalize the pair without taking on the burden of technical risk. The house absorbs that burden through preselection and testing.',
          'What appears as limitation on the front end is, in practice, a guarantee of coherence at the back end.',
        ],
      },
    ],
    relatedRoute: '/atelier',
    relatedCtaLabel: 'Read the Process',
  },
]

export const FEATURED_JOURNAL_ENTRY: JournalIndexEntry = {
  id: JOURNAL_ARTICLES[0].id,
  eyebrow: JOURNAL_ARTICLES[0].eyebrow,
  title: JOURNAL_ARTICLES[0].title,
  excerpt: JOURNAL_ARTICLES[0].excerpt,
  meta: JOURNAL_ARTICLES[0].meta,
  route: `/journal/${JOURNAL_ARTICLES[0].id}`,
  ctaLabel: 'Read the Essay',
}

export const JOURNAL_ENTRIES: JournalIndexEntry[] = JOURNAL_ARTICLES.slice(1).map((article) => ({
  id: article.id,
  eyebrow: article.eyebrow,
  title: article.title,
  excerpt: article.excerpt,
  meta: article.meta,
  route: `/journal/${article.id}`,
  ctaLabel: 'Read Entry',
}))

export const JOURNAL_BULLETS = [
  'Published from the Lisbon atelier',
  'Focused on materials, process, and silhouette',
  'Updated alongside new releases and commissions',
]

export function getJournalArticle(articleId: string) {
  return JOURNAL_ARTICLES.find((article) => article.id === articleId)
}
