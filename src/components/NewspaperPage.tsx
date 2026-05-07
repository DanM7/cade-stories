import type { NewspaperPageData } from '../models/types'
import { getCurrentEditionLabel } from '../utils/edition'
import { navigateTo } from '../utils/navigation'

interface NewspaperPageProps {
  data: NewspaperPageData
}

export function NewspaperPage({ data }: NewspaperPageProps) {
  const editionLabel = getCurrentEditionLabel()
  const featureStory = data.articles[0]
  const topQuickLinks = data.articles.slice(1, 4)
  const lowerQuickLinks = data.articles.slice(4, 7)
  const remainingStories = data.articles.slice(7)

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
          {featureStory ? (
            <button
              type="button"
              className="story-link"
              onClick={() => openArticle(featureStory.id)}
              aria-label={`Open feature article for ${data.headline.title}`}
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
          {data.classifieds.map((item) => (
            <p key={item.id}>
              <strong>{item.title}:</strong> {item.description}
            </p>
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
      {article.body[0]?.pullQuote && <blockquote>{article.body[0].pullQuote}</blockquote>}
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
