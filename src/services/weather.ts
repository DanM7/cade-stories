export type Season = 'winter' | 'spring' | 'summer' | 'fall'

export const WINTER_WEATHER_SENTENCES = [
  'Frosty with drifting pockets of basement-level ice fog escaping from Level 10.',
  'Snowy with a 70% chance of saber-tooth tigers borrowing scarves again.',
  'Bitter cold with rogue shoes skittering across frozen sidewalks in search of warmth.',
  'Icy winds carrying faint whispers from trucks hibernating under snowbanks.',
  'Heavy snowfall mixed with uppercase tooth shivers rattling through the alphabet.',
  'Blustery with penguin-fact flurries expected by mid-afternoon.',
  'Overnight freeze with a high likelihood of Boomy slipping down invisible ice stairs.',
] as const

export const SPRING_WEATHER_SENTENCES = [
  'Mild with swirling pockets of corn-ice-cream pollen drifting across the valley.',
  'Light rain accompanied by shoes sprouting tiny blossoms before attempting hugs.',
  'Partly sunny with saber-tooth cubs practicing stealth in neighborhood gardens.',
  'Gentle breezes carrying early-season truck secrets whispered through gutters.',
  'Scattered showers with a 40% chance of lowercase tooth giggles.',
  'Fog lifting by noon as penguin-fact migration season begins.',
  'Warm drizzle with Boomy cautiously testing non-slippery stairs.',
] as const

export const SUMMER_WEATHER_SENTENCES = [
  'Hot and breezy with sour-cream-ice-cream thermals rising over the rooftops.',
  'Sunny with trucks sunbathing on garage roofs again.',
  'Humid with shoes attempting slow, sticky hugs due to melted laces.',
  'Heatwave fueled by uppercase tooth lightning striking the playground mulch.',
  'Clear skies with saber-tooth tigers lounging near sprinkler systems.',
  'Warm nights filled with drifting penguin-fact fireflies.',
  'High UV index with Boomy sliding down sun-warmed railings.',
] as const

export const FALL_WEATHER_SENTENCES = [
  'Crisp air with swirling leaves shaped suspiciously like grappling hooks.',
  'Windy with trucks muttering sleepy autumn secrets into storm drains.',
  'Cool drizzle with shoes rustling through leaf piles in search of ankles.',
  'Overcast with saber-tooth tigers migrating toward pumpkin patches.',
  'Chilly gusts carrying faint uppercase tooth groans preparing for winter.',
  'Foggy mornings with penguin-fact harvest season beginning at dawn.',
  'Blustery with Boomy tripping over decorative gourds near staircases.',
] as const

const TEMPERATURE_RANGES: Record<Season, { min: number; max: number }> = {
  winter: { min: 20, max: 39 },
  spring: { min: 40, max: 69 },
  summer: { min: 70, max: 99 },
  fall: { min: 40, max: 69 },
}

const WEATHER_SENTENCES: Record<Season, readonly string[]> = {
  winter: WINTER_WEATHER_SENTENCES,
  spring: SPRING_WEATHER_SENTENCES,
  summer: SUMMER_WEATHER_SENTENCES,
  fall: FALL_WEATHER_SENTENCES,
}

export interface WeatherForMonth {
  description: string
  highTemp: number
}

export function getSeason(month: number): Season {
  if (!Number.isInteger(month) || month < 1 || month > 12) {
    throw new Error(`Invalid month "${month}". Expected 1-12.`)
  }

  if (month === 12 || month <= 2) return 'winter'
  if (month <= 5) return 'spring'
  if (month <= 8) return 'summer'
  return 'fall'
}

export function getRandomTempForSeason(season: Season): number {
  const range = TEMPERATURE_RANGES[season]
  return Math.floor(Math.random() * (range.max - range.min + 1)) + range.min
}

export function getWeatherForMonth(month: number): WeatherForMonth {
  const season = getSeason(month)
  const sentences = WEATHER_SENTENCES[season]
  const description = sentences[Math.floor(Math.random() * sentences.length)]
  const highTemp = getRandomTempForSeason(season)

  return { description, highTemp }
}
