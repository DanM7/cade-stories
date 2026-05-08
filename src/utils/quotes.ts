/**
 * Direct lore quotes are sentence-level and may end with a period.
 * When embedded in attributed pull-quote strings, normalize `.,` to `,`.
 */
export function normalizeAttributedPullQuote(pullQuote: string): string {
  return pullQuote.replace(/\.\s*(["'])\s*,/g, '$1,')
}
