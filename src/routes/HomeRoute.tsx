import { useState } from 'react'
import { NewspaperPage } from '../components/NewspaperPage'
import type { NewspaperPageData } from '../models/types'
import { STATIC_NEWSPAPER_CONTENT } from '../services/storyEngineClient'
import { SITE_TITLE, useDocumentTitle } from '../utils/documentTitle'

export function HomeRoute() {
  const [pageData] = useState<NewspaperPageData>(STATIC_NEWSPAPER_CONTENT)
  useDocumentTitle(SITE_TITLE)

  return (
    <div className="page-shell">
      <NewspaperPage data={pageData} />
    </div>
  )
}
