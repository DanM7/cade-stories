import type { NewspaperLayout } from './types'

export function buildFrontPageLayout(): NewspaperLayout {
  return {
    template: 'front-page-v1',
    blocks: [
      { id: 'headline', section: 'headline', column: 1, order: 1, minHeight: 220 },
      { id: 'article-1', section: 'articles', column: 1, order: 2, minHeight: 240 },
      { id: 'article-2', section: 'articles', column: 2, order: 1, minHeight: 260 },
      { id: 'article-3', section: 'articles', column: 2, order: 2, minHeight: 220 },
      { id: 'quotes', section: 'quotes', column: 3, order: 1, minHeight: 180 },
      { id: 'weather', section: 'weather', column: 3, order: 2, minHeight: 130 },
      {
        id: 'classifieds',
        section: 'classifieds',
        column: 3,
        order: 3,
        minHeight: 160,
      },
    ],
  }
}
