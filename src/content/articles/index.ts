import type { Article } from '../../models/types'
import { articleTenBasements } from './article-basements'
import { articleBoomyStairs } from './article-boomy-stairs'
import { articleHoneymoonDesk } from './article-honeymoon-desk'
import { articleIceAgePatrol } from './article-ice-age-patrol'
import { articleObstacleDerby } from './article-obstacle-derby'
import { articlePasswordAlert } from './article-password-alert'
import { articlePbjMission } from './article-pbj-mission'
import { articlePenguinFacts } from './article-penguin-facts'
import { articleShoeSafety } from './article-shoe-safety'
import { articleUppercaseTooth } from './article-uppercase-tooth'

export const STATIC_ARTICLES: Article[] = [
  articleTenBasements,
  articleBoomyStairs,
  articleObstacleDerby,
  articleHoneymoonDesk,
  articleShoeSafety,
  articleIceAgePatrol,
  articlePasswordAlert,
  articlePenguinFacts,
  articlePbjMission,
  articleUppercaseTooth,
]

export const STATIC_ARTICLES_BY_ID: Record<string, Article> = Object.fromEntries(
  STATIC_ARTICLES.map((article) => [article.id, article]),
)
