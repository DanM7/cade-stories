const NAVIGATION_EVENT = 'cade:navigate'

export function navigateTo(path: string) {
  if (window.location.pathname === path) {
    return
  }

  window.history.pushState({}, '', path)
  window.dispatchEvent(new Event(NAVIGATION_EVENT))
}

export function onNavigate(listener: () => void): () => void {
  window.addEventListener('popstate', listener)
  window.addEventListener(NAVIGATION_EVENT, listener)

  return () => {
    window.removeEventListener('popstate', listener)
    window.removeEventListener(NAVIGATION_EVENT, listener)
  }
}
