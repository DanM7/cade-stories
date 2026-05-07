import type { Article } from '../models/types'
import { getCurrentEditionLabel } from '../utils/edition'
import { navigateTo } from '../utils/navigation'

interface ArticleRouteProps {
  article?: Article
}

export function ArticleRoute({ article }: ArticleRouteProps) {
  const editionLabel = getCurrentEditionLabel()

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
            {paragraph.pullQuote && <blockquote>{paragraph.pullQuote}</blockquote>}
          </section>
        ))}

        <button type="button" className="back-home-button" onClick={() => navigateTo('/')}>
          Back to Home
        </button>
      </article>
    </main>
  )
}
