import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import type { Plugin } from 'vite'
import { STATIC_ARTICLES } from '../content/articles'
import { applyPageMeta, buildDefaultPageMeta, formatArticleDocumentTitle } from '../utils/siteMeta'

function resolveSiteUrl(): string | undefined {
  const url = process.env.URL ?? process.env.DEPLOY_PRIME_URL ?? process.env.VITE_SITE_URL
  return url?.replace(/\/$/, '')
}

export function prerenderArticleMeta(): Plugin {
  return {
    name: 'prerender-article-meta',
    closeBundle() {
      const outDir = join(process.cwd(), 'dist')
      const indexPath = join(outDir, 'index.html')
      const baseHtml = readFileSync(indexPath, 'utf8')
      const siteUrl = resolveSiteUrl()

      const homeHtml = applyPageMeta(baseHtml, {
        ...buildDefaultPageMeta(),
        url: siteUrl,
      })
      writeFileSync(indexPath, homeHtml, 'utf8')

      for (const article of STATIC_ARTICLES) {
        const articlePath = `/article/${article.id}`
        const articleHtml = applyPageMeta(baseHtml, {
          title: formatArticleDocumentTitle(article.title),
          description: article.lead,
          url: siteUrl ? `${siteUrl}${articlePath}` : undefined,
        })

        const articleDir = join(outDir, 'article', article.id)
        mkdirSync(articleDir, { recursive: true })
        writeFileSync(join(articleDir, 'index.html'), articleHtml, 'utf8')
      }
    },
  }
}
