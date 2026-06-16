import type { Article } from '../models/types'
import { formatArticleDocumentTitle, useDocumentTitle } from '../utils/documentTitle'
import { getCurrentEditionLabel } from '../utils/edition'
import { navigateTo } from '../utils/navigation'
import { normalizeAttributedPullQuote } from '../utils/quotes'

interface ArticleRouteProps {
  article?: Article
}

export function ArticleRoute({ article }: ArticleRouteProps) {
  const editionLabel = getCurrentEditionLabel()
  useDocumentTitle(
    article ? formatArticleDocumentTitle(article.title) : formatArticleDocumentTitle('Article Not Found'),
  )

  if (!article) {
    return (
      <main className="article-route">
        <section className="article-page">
          <button type="button" className="back-home-button" onClick={() => navigateTo('/')}>
            Back to Home
          </button>
          <h1>Article Not Found</h1>
          <p>The requested story could not be found in this edition.</p>
          <button type="button" className="back-home-button" onClick={() => navigateTo('/')}>
            Back to Home
          </button>
        </section>
      </main>
    )
  }

  return (
    <main className="article-route">
      <article className="article-page">
        <button type="button" className="back-home-button" onClick={() => navigateTo('/')}>
          Back to Home
        </button>
        <p className="article-kicker">Cade Stories | {editionLabel}</p>
        <h1>{article.title}</h1>
        <p className="article-lead">{article.lead}</p>
        {article.body.map((paragraph, index) => (
          <section key={`${article.id}-p-${index}`} className="article-paragraph-block">
            <p className="article-body">{paragraph.text}</p>
            {paragraph.pullQuote && (
              <blockquote>{normalizeAttributedPullQuote(paragraph.pullQuote)}</blockquote>
            )}
          </section>
        ))}

        <button type="button" className="back-home-button" onClick={() => navigateTo('/')}>
          Back to Home
        </button>
      </article>
    </main>
  )
}
