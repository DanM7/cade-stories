import { CHARACTERS } from '../models/lore'
import type { NewspaperPageData, NewspaperSection } from '../models/types'
import { STATIC_ARTICLES } from '../content/articles'
import { pickOne } from '../utils/random'

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

function generateMockNewspaper(prompt?: string): NewspaperPageData {
  const spark = prompt?.trim() || pickOne(CHARACTERS)
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
      title: `${spark} Declares Emergency After Midnight Truck Parliament`,
      summary:
        'Witnesses say Boomy banged the horn at dawn while Grandpa Logger negotiated peace with three rogue ladders.',
    },
    articles: STATIC_ARTICLES,
    quotes: primaryQuotes.slice(0, 3).map((quote) => ({
      id: `quote-${quote.slice(0, 16).toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      speaker: 'Cade Maguire',
      quote,
    })),
    weather: {
      forecast: 'Cloudy with a 90% chance of grappling hooks and whispered truck secrets.',
      temperature: `${Math.floor(55 + Math.random() * 20)} F`,
    },
    classifieds: [
      {
        id: 'classified-shoe-tamer',
        title: 'Wanted: Shoe Tamer',
        description: 'Help Grandpa Logger inspect suspicious shoes for hidden claws.',
      },
      {
        id: 'classified-honeymoon',
        title: 'For Sale: Slightly Used Honeymoon Invitation',
        description: 'Mom invited. Dad status pending spouse approval.',
      },
      {
        id: 'classified-business-opportunity',
        title: 'Business Opportunity',
        description: 'Apply now for one big private business, immediate start.',
      },
    ],
  }
}

const BASEMENT_AND_BUSINESS_QUOTE = 'If I have 10 fingers, Grandpa Logger has 10 basements.'

const TRUCK_QUOTE =
  'Boomy fell down the stairs just like he did this morning. But he did it when he was working as a cleaning person at school.'

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
