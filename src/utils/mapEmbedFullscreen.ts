export const MAP_FULLSCREEN_MESSAGE = 'oceanops-simple-map-fullscreen'

export const EXIT_MAP_EMBED_FULLSCREEN = 'oceanops-exit-map-embed-fullscreen'
export const MAP_EMBED_FULLSCREEN_STATE = 'oceanops-map-embed-fullscreen-state'

let mapEmbedFullscreenActive = false

export function setMapEmbedFullscreen(active: boolean): void {
  if (mapEmbedFullscreenActive === active) return
  mapEmbedFullscreenActive = active
  window.dispatchEvent(
    new CustomEvent(MAP_EMBED_FULLSCREEN_STATE, { detail: { active } })
  )
}

export function isMapEmbedFullscreen(): boolean {
  return mapEmbedFullscreenActive
}

export function requestExitMapEmbedFullscreen(): void {
  window.dispatchEvent(new CustomEvent(EXIT_MAP_EMBED_FULLSCREEN))
}

/** Exit the embedded map overlay, then resolve once layout has updated. */
export function exitMapEmbedFullscreen(): Promise<void> {
  if (!mapEmbedFullscreenActive) return Promise.resolve()

  return new Promise((resolve) => {
    const finish = () => {
      window.removeEventListener(MAP_EMBED_FULLSCREEN_STATE, onState)
      clearTimeout(fallback)
      resolve()
    }

    const onState = (event: Event) => {
      const detail = (event as CustomEvent<{ active: boolean }>).detail
      if (detail?.active === false) finish()
    }

    window.addEventListener(MAP_EMBED_FULLSCREEN_STATE, onState)
    requestExitMapEmbedFullscreen()

    const fallback = window.setTimeout(finish, 500)
  })
}
