export const SITE_TITLE = 'Cade Stories'
export const SITE_DESCRIPTION = 'All the unbelievable news that still might be true'

export interface PageMeta {
  title: string
  description: string
  url?: string
  type?: 'website' | 'article'
}

export function formatArticleDocumentTitle(articleTitle: string): string {
  return `${SITE_TITLE} | ${articleTitle}`
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export function buildMetaTags({ title, description, url, type = 'article' }: PageMeta): string {
  const tags = [
    `<meta name="description" content="${escapeHtml(description)}" />`,
    `<meta property="og:site_name" content="${escapeHtml(SITE_TITLE)}" />`,
    `<meta property="og:title" content="${escapeHtml(title)}" />`,
    `<meta property="og:description" content="${escapeHtml(description)}" />`,
    `<meta property="og:type" content="${type}" />`,
    `<meta name="twitter:card" content="summary" />`,
    `<meta name="twitter:title" content="${escapeHtml(title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(description)}" />`,
  ]

  if (url) {
    tags.push(`<meta property="og:url" content="${escapeHtml(url)}" />`)
  }

  return tags.join('\n    ')
}

export function buildDefaultPageMeta(): PageMeta {
  return {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    type: 'website',
  }
}

export function applyPageMeta(html: string, meta: PageMeta): string {
  const metaBlock = buildMetaTags(meta)

  return html
    .replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(meta.title)}</title>`)
    .replace(/<!--META_TAGS-->[\s\S]*?<!--\/META_TAGS-->/, `<!--META_TAGS-->\n    ${metaBlock}\n    <!--/META_TAGS-->`)
}
