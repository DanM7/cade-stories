export interface Headline {
  title: string
  summary: string
  /** Article id the masthead headline should navigate to (usually the lead story). */
  linkedArticleId?: string
}

export interface Article {
  id: string
  title: string
  lead: string
  body: ArticleParagraph[]
}

export interface ArticleParagraph {
  text: string
  pullQuote?: string
}

export interface QuoteItem {
  id: string
  speaker: string
  quote: string
}

export interface WeatherReport {
  forecast: string
  temperature: string
}

export interface ClassifiedItem {
  category: 'Wanted' | 'For Sale' | 'Business Opportunity'
  title: string
  description: string
}

export interface NewspaperPageData {
  headline: Headline
  articles: Article[]
  quotes: QuoteItem[]
  weather: WeatherReport
  classifieds: ClassifiedItem[]
}

export type NewspaperSection =
  | 'headline'
  | 'articles'
  | 'quotes'
  | 'weather'
  | 'classifieds'
