/**
 * SpotifyEmbed Component
 *
 * A flexible Spotify embed component for podcasts, episodes, tracks, albums, playlists, etc.
 * Designed to be used within ContentModule or other content sections.
 *
 * @param spotifyId - The Spotify ID or full URL (e.g., '3AjTpnz2G7RZofpSOtiDa1' or 'https://open.spotify.com/episode/...')
 * @param type - Type of content: 'episode' | 'track' | 'album' | 'playlist' | 'show' (default: 'episode')
 * @param height - Height in pixels (default: 152 for compact player, 352 for full player)
 * @param width - Width as percentage or pixels (default: '100%')
 * @param theme - Theme of the player: 'dark' | 'light' (default: 'light')
 * @param className - Optional additional Tailwind classes
 *
 * @example
 * ```tsx
 * // Using just the Spotify ID
 * <SpotifyEmbed
 *   spotifyId="3AjTpnz2G7RZofpSOtiDa1"
 *   type="episode"
 * />
 *
 * // Using full Spotify URL (will extract the ID automatically)
 * <SpotifyEmbed
 *   spotifyId="https://open.spotify.com/episode/3AjTpnz2G7RZofpSOtiDa1"
 *   height={232}
 * />
 *
 * // Embed a track with custom height
 * <SpotifyEmbed
 *   spotifyId="4cOdK2wGLETKBW3PvgPWqT"
 *   type="track"
 *   height={80}
 * />
 * ```
 */

interface SpotifyEmbedProps {
  spotifyId: string
  type?: 'episode' | 'track' | 'album' | 'playlist' | 'show'
  height?: number
  width?: string
  theme?: 'dark' | 'light'
  className?: string
}

export default function SpotifyEmbed({
  spotifyId,
  type = 'episode',
  height = 152,
  width = '100%',
  theme = 'light',
  className = '',
}: SpotifyEmbedProps) {
  // Extract ID from full URL if provided
  const extractSpotifyId = (input: string): string => {
    // If it's already just an ID (no slashes or https), return it
    if (!input.includes('/') && !input.includes('https')) {
      return input
    }

    // Extract from URL like: https://open.spotify.com/episode/3AjTpnz2G7RZofpSOtiDa1
    const match = input.match(/\/(episode|track|album|playlist|show)\/([a-zA-Z0-9]+)/)
    return match ? match[2] : input
  }

  const id = extractSpotifyId(spotifyId)
  const embedUrl = `https://open.spotify.com/embed/${type}/${id}?utm_source=generator${theme === 'dark' ? '&theme=0' : ''}`

  return (
    <div className={`w-full ${className}`}>
      <iframe
        data-testid="embed-iframe"
        style={{ borderRadius: '12px', border: 0 }}
        src={embedUrl}
        width={width}
        height={height}
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        title={`Spotify ${type} embed`}
      />
    </div>
  )
}
