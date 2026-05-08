import type { NewspaperPageData } from '../models/types'
import { getCurrentEditionLabel } from '../utils/edition'
import { navigateTo } from '../utils/navigation'
import { normalizeAttributedPullQuote } from '../utils/quotes'

interface NewspaperPageProps {
  data: NewspaperPageData
}

export function NewspaperPage({ data }: NewspaperPageProps) {
  const editionLabel = getCurrentEditionLabel()
  const fallbackFeatureStory = data.articles[0]
  const headlineArticleId = data.headline.linkedArticleId ?? fallbackFeatureStory?.id
  const featureStory =
    data.articles.find((article) => article.id === 'article-truck-parliament') ??
    data.articles.find((article) => article.id !== headlineArticleId)

  const excludedIds = new Set<string>(
    [headlineArticleId, featureStory?.id].filter((id): id is string => Boolean(id)),
  )
  const nonFeaturedLinks = data.articles.filter((article) => !excludedIds.has(article.id))
  const topQuickLinks = nonFeaturedLinks.slice(0, 3)
  const lowerQuickLinks = nonFeaturedLinks.slice(3, 6)
  const remainingStories = nonFeaturedLinks.slice(6)
  const classifiedOrder = ['Wanted', 'For Sale', 'Business Opportunity'] as const
  const classifiedsByCategory = classifiedOrder
    .map((category) => ({
      category,
      items: data.classifieds.filter((item) => item.category === category),
    }))
    .filter((group) => group.items.length > 0)

  return (
    <main className="newspaper">
      <header className="masthead">
        <p className="edition">{editionLabel}</p>
        <h1>Cade Stories</h1>
        <p className="tagline">All the unbelievable news that still might be true</p>
      </header>

      <section className="main-flow">
        <article className="panel">
          <PanelHeader title="Front Page Headline" />
          {headlineArticleId ? (
            <button
              type="button"
              className="story-link"
              onClick={() => openArticle(headlineArticleId)}
              aria-label={`Open article for headline: ${data.headline.title}`}
            >
              <h2 className="headline">{data.headline.title}</h2>
              <p>{data.headline.summary}</p>
              <span className="story-link-hint">Open feature article</span>
            </button>
          ) : (
            <>
              <h2 className="headline">{data.headline.title}</h2>
              <p>{data.headline.summary}</p>
            </>
          )}
        </article>

        {featureStory && (
          <article className="panel">
            <PanelHeader title="Feature Story" />
            <StoryTeaser article={featureStory} />
          </article>
        )}

        <article className="panel">
          <PanelHeader title="Quick Story Links" />
          <StoryLinkList articles={topQuickLinks} />
        </article>

        <article className="panel">
          <PanelHeader title="Weather" />
          <p>{data.weather.forecast}</p>
          <p className="weather-temp">{data.weather.temperature}</p>
        </article>

        <article className="panel">
          <PanelHeader title="Classifieds" />
          {classifiedsByCategory.map((group) => (
            <div key={group.category}>
              <p>
                <strong>{group.category}</strong>
              </p>
              {group.items.map((item) => (
                <p key={`${item.category}-${item.title}`}>
                  {item.title}: {item.description}
                </p>
              ))}
            </div>
          ))}
        </article>

        <article className="panel">
          <PanelHeader title="More Story Links" />
          <StoryLinkList articles={lowerQuickLinks} />
        </article>
      </section>

      {remainingStories.length > 0 && (
        <section className="remaining-stories">
          <PanelHeader title="More Stories" />
          <div className="remaining-story-grid">
            {remainingStories.map((article) => (
              <article key={article.id} className="panel">
                <StoryTeaser article={article} />
              </article>
            ))}
          </div>
        </section>
      )}
    </main>
  )
}

function StoryLinkList({ articles }: { articles: NewspaperPageData['articles'] }) {
  if (articles.length === 0) {
    return <p>No additional stories in this edition. Check back tomorrow for more!</p>
  }

  return (
    <ul className="story-bullets">
      {articles.map((article) => (
        <li key={article.id}>
          <button type="button" className="story-title-link" onClick={() => openArticle(article.id)}>
            {article.title}
          </button>
        </li>
      ))}
    </ul>
  )
}

function openArticle(articleId: string) {
  navigateTo(`/article/${encodeURIComponent(articleId)}`)
}

function StoryTeaser({ article }: { article: NewspaperPageData['articles'][number] }) {
  return (
    <button
      type="button"
      className="story-link"
      onClick={() => openArticle(article.id)}
      aria-label={`Open full article for ${article.title}`}
    >
      <h3>{article.title}</h3>
      <p>{article.lead}</p>
      {article.body[0]?.pullQuote && (
        <blockquote>{normalizeAttributedPullQuote(article.body[0].pullQuote)}</blockquote>
      )}
      <span className="story-link-hint">Read expanded article</span>
    </button>
  )
}

interface PanelHeaderProps {
  title: string
}

function PanelHeader({ title }: PanelHeaderProps) {
  return (
    <div className="panel-header">
      <p>{title}</p>
    </div>
  )
}
