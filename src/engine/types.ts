import type { NewspaperSection } from '../models/types'

export interface LayoutBlock {
  id: string
  section: NewspaperSection
  column: 1 | 2 | 3
  order: number
  minHeight: number
}

export interface NewspaperLayout {
  template: 'front-page-v1'
  blocks: LayoutBlock[]
}
