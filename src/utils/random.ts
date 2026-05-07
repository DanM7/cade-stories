export function pickOne<T>(items: readonly T[], seed = Math.random()): T {
  const normalized = Math.max(0, Math.min(0.999999, seed))
  const index = Math.floor(normalized * items.length)
  return items[index]
}

export function pickMany<T>(items: readonly T[], count: number): T[] {
  const pool = [...items]
  const selected: T[] = []

  while (selected.length < count && pool.length > 0) {
    const index = Math.floor(Math.random() * pool.length)
    const [next] = pool.splice(index, 1)
    selected.push(next)
  }

  return selected
}
