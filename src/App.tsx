import { useEffect, useState } from 'react'
import { STATIC_ARTICLES_BY_ID } from './content/articles'
import { ArticleRoute } from './routes/ArticleRoute'
import { HomeRoute } from './routes/HomeRoute'
import { onNavigate } from './utils/navigation'

export default function App() {
  const [pathname, setPathname] = useState(window.location.pathname)

  useEffect(() => onNavigate(() => setPathname(window.location.pathname)), [])

  const articleMatch = pathname.match(/^\/article\/([^/]+)\/?$/)
  if (articleMatch) {
    const requestedId = decodeURIComponent(articleMatch[1])
    const legacyIdAliases: Record<string, string> = {
      'article-basements': 'article-ten-basements',
    }
    const articleId = legacyIdAliases[requestedId] ?? requestedId
    const article = STATIC_ARTICLES_BY_ID[articleId]
    return <ArticleRoute article={article} />
  }

  return <HomeRoute />
}
