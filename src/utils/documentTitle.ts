import { useEffect } from 'react'
import { formatArticleDocumentTitle, SITE_TITLE } from './siteMeta'

export function useDocumentTitle(title: string): void {
  useEffect(() => {
    document.title = title
  }, [title])
}

export { formatArticleDocumentTitle, SITE_TITLE }
