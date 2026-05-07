export function getCurrentEditionLabel(): string {
  const weekday = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(new Date())
  return `${weekday} Edition`
}
