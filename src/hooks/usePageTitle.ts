import { useEffect } from 'react'

const BASE = 'Maison Arc'
const DEFAULT_TITLE = `${BASE} — Yours. Precisely.`
const DEFAULT_DESCRIPTION =
  'Maison Arc — Bespoke handcrafted footwear. Configure every detail to your specification.'

interface PageMetaOptions {
  description?: string
}

function upsertMeta(name: string, content: string) {
  let meta = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`)

  if (!meta) {
    meta = document.createElement('meta')
    meta.name = name
    document.head.append(meta)
  }

  meta.content = content
}

export function usePageTitle(title?: string, options: PageMetaOptions = {}) {
  useEffect(() => {
    document.title = title ? `${title} — ${BASE}` : DEFAULT_TITLE
    upsertMeta('description', options.description ?? DEFAULT_DESCRIPTION)

    return () => {
      document.title = DEFAULT_TITLE
      upsertMeta('description', DEFAULT_DESCRIPTION)
    }
  }, [options.description, title])
}
