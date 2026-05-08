import type { NewspaperPageData, NewspaperSection } from '../models/types'
import { STATIC_ARTICLES } from '../content/articles'
import { STATIC_CLASSIFIEDS } from '../content/classifieds'
import { getWeatherForMonth } from './weather'

const API_BASE_URL = import.meta.env.VITE_STORY_ENGINE_URL as string | undefined

interface StoryEngineRequest {
  prompt?: string
  section?: NewspaperSection
}

export class StoryEngineClient {
  async generateNewspaper(prompt?: string): Promise<NewspaperPageData> {
    if (API_BASE_URL) {
      return this.callStoryEngine({ prompt })
    }

    return generateMockNewspaper(prompt)
  }

  async regenerateSection(
    current: NewspaperPageData,
    section: NewspaperSection,
    prompt?: string,
  ): Promise<NewspaperPageData> {
    if (API_BASE_URL) {
      return this.callStoryEngine({ prompt, section })
    }

    const next = generateMockNewspaper(prompt)

    switch (section) {
      case 'headline':
        return { ...current, headline: next.headline }
      case 'articles':
        return { ...current, articles: next.articles }
      case 'quotes':
        return { ...current, quotes: next.quotes }
      case 'weather':
        return { ...current, weather: next.weather }
      case 'classifieds':
        return { ...current, classifieds: next.classifieds }
      default:
        return current
    }
  }

  private async callStoryEngine(request: StoryEngineRequest): Promise<NewspaperPageData> {
    const response = await fetch(`${API_BASE_URL}/newspaper/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    })

    if (!response.ok) {
      throw new Error(`Story Engine request failed (${response.status})`)
    }

    return (await response.json()) as NewspaperPageData
  }
}

function generateMockNewspaper(_prompt?: string): NewspaperPageData {
  const month = new Date().getMonth() + 1
  const weather = getWeatherForMonth(month)
  const leadArticle = STATIC_ARTICLES[0]
  const primaryQuotes = [
    BASEMENT_AND_BUSINESS_QUOTE,
    TRUCK_QUOTE,
    RACE_AND_OBSTACLE_QUOTE,
    HONEYMOON_QUOTE,
    SHOE_QUOTE,
    ICE_AGE_QUOTE,
    PASSWORD_QUOTE,
    PENGUIN_QUOTE,
    PBJ_QUOTE,
    UPPERCASE_TOOTH_QUOTE,
  ]

  return {
    headline: {
      title: leadArticle.title,
      summary: leadArticle.lead,
      linkedArticleId: leadArticle.id,
    },
    articles: STATIC_ARTICLES,
    quotes: primaryQuotes.slice(0, 3).map((quote) => ({
      id: `quote-${quote.slice(0, 16).toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      speaker: 'Cade Maguire',
      quote,
    })),
    weather: {
      forecast: weather.description,
      temperature: `${weather.highTemp} F`,
    },
    classifieds: STATIC_CLASSIFIEDS,
  }
}

const BASEMENT_AND_BUSINESS_QUOTE = 'If I have 10 fingers, Grandpa Logger has 10 basements.'

const TRUCK_QUOTE =
  'I fell down the stairs this morning. Boomy fell down the stairs this morning too.'

const RACE_AND_OBSTACLE_QUOTE =
  'How fast is a timber rattlesnake? I bet they could not outrun an obstacle course.'

const HONEYMOON_QUOTE =
  "I'm going to invite you mom on my honeymoon. Maybe not dad. I'll talk to my wife about it."

const SHOE_QUOTE =
  'Grandpa Logger is scared of wearing shoes. They might have claws that wrap you up.'

const ICE_AGE_QUOTE =
  'When Grandpa Logger was a teenager he worked for Ice Age looking for saber tooth tigers.'

const PASSWORD_QUOTE = "Know what GL's password is? 41 Muffin Lane."

const PENGUIN_QUOTE =
  "I need to tell you a fact about penguins. The mommy throws up into the daddy and that's how a baby is made."

const PBJ_QUOTE =
  'I wish Jesus was still alive so I could give him flowers and make him a peanut butter and jelly sandwich.'

const UPPERCASE_TOOTH_QUOTE = 'Mommaaaaaaa? My this tooth hurts, and my uppercase tooth hurts.'

export const STATIC_NEWSPAPER_CONTENT: NewspaperPageData = generateMockNewspaper('Cade')

export const storyEngineClient = new StoryEngineClient()
