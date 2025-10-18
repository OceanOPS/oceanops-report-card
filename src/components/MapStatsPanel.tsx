/**
 * MapStatsPanel Component
 *
 * Main report panel that displays a 2x2 stats grid alongside a map or image.
 * This is typically used as the primary hero section of the report.
 *
 * @param title - Optional panel title
 * @param hasLine - Show decorative line above title (default: true)
 * @param lineColor - Tailwind background color for decorative line (default: 'bg-goos-orange-500')
 * @param stats - Optional array of exactly 4 stat objects for the 2x2 grid. If not provided, map will be full-width
 * @param mapSrc - URL to map image or iframe src (required)
 * @param mapAlt - Alt text for map image (default: 'Map')
 * @param mapType - Type of map: 'image' | 'iframe' (default: 'image')
 * @param mapHeight - Height of map in pixels or 'full' for viewport height (default: 500)
 * @param backgroundColor - Tailwind background color (default: 'bg-goos-blue-700')
 * @param titleColor - Tailwind text color for title (default: 'text-white')
 * @param textColor - Tailwind text color for body text (default: 'text-white')
 * @param numberColor - Tailwind text color for numbers (default: 'text-goos-orange-500')
 * @param linkColor - Tailwind text color for links (default: 'text-goos-orange-500')
 * @param className - Optional additional Tailwind classes
 *
 * @example
 * ```tsx
 * // With stats panel (50/50 layout)
 * <MapStatsPanel
 *   title="Global Ocean Observation Network"
 *   stats={[
 *     {
 *       number: '$45M',
 *       description: 'Annual funding for ocean research',
 *       linkText: 'View Details',
 *       linkUrl: 'https://example.com'
 *     },
 *     {
 *       number: '$400B',
 *       description: 'Economic value of ocean data'
 *     },
 *     {
 *       number: '234K',
 *       description: 'Data points collected daily'
 *     },
 *     {
 *       number: '71%',
 *       description: 'Global ocean coverage'
 *     }
 *   ]}
 *   mapSrc="/images/ocean-map.png"
 *   mapType="image"
 *   backgroundColor="bg-goos-blue-700"
 * />
 *
 * // Full-width map without stats panel
 * <MapStatsPanel
 *   title="Platform Distribution"
 *   mapSrc="https://api.mapbox.com/..."
 *   mapType="iframe"
 *   mapHeight="full"
 * />
 * ```
 */

interface StatItem {
  number: string
  description: string
  linkText?: string
  linkUrl?: string
}

interface MapStatsPanelProps {
  title?: string
  hasLine?: boolean
  lineColor?: string
  stats?: StatItem[]
  mapSrc: string
  mapAlt?: string
  mapType?: 'image' | 'iframe'
  mapHeight?: number | 'full'
  backgroundColor?: string
  titleColor?: string
  textColor?: string
  numberColor?: string
  linkColor?: string
  className?: string
}

export default function MapStatsPanel({
  title,
  hasLine = true,
  lineColor = 'bg-goos-orange-500',
  stats,
  mapSrc,
  mapAlt = 'Map',
  mapType = 'image',
  mapHeight = 500,
  backgroundColor = 'bg-goos-blue-700',
  titleColor = 'text-white',
  textColor = 'text-white',
  numberColor = 'text-goos-orange-500',
  linkColor = 'text-goos-orange-500',
  className = '',
}: MapStatsPanelProps) {
  // Check if stats panel should be shown
  const hasStats = stats && stats.length > 0

  // Ensure exactly 4 stats (take first 4 if more provided)
  const gridStats = hasStats ? stats.slice(0, 4) : []

  // Check if using full viewport height
  const isFullHeight = mapHeight === 'full'
  const sectionHeightClass = isFullHeight ? 'min-h-screen' : ''

  return (
    <section className={`${backgroundColor} px-12 md:px-16 py-0 flex flex-col ${sectionHeightClass} ${className}`}>
      {/* Header Section */}
      <div className="flex flex-col gap-5 flex-shrink-0">
        <div className="h-8 w-5 opacity-75"></div>

        {/* Title Section */}
        {title && (
          <div className="flex flex-col gap-6">
            {hasLine && <div className={`${lineColor} h-2 w-32`}></div>}
            <h3 className={`text-4xl font-extrabold ${titleColor} leading-10`}>
              {title}
            </h3>
          </div>
        )}
      </div>

      {/* Spacer */}
      <div className="h-8 w-5 opacity-75 flex-shrink-0"></div>

      {/* Content: Stats and Map - Takes remaining space and centers */}
      <div className={`flex gap-5 flex-col ${hasStats ? 'lg:flex-row' : ''} flex-1 ${hasStats ? 'lg:items-center' : ''} min-h-0`}>
        {/* Left Column - Stats Grid 2x2 (50% width) - Only show if stats exist */}
        {hasStats && (
          <div className="lg:basis-1/2 flex items-center">
            <div className="grid grid-cols-2 gap-8 w-full">
              {gridStats.map((stat, index) => (
                <div key={index} className="flex flex-col gap-2">
                  <p className={`text-5xl font-light ${numberColor}`}>
                    {stat.number}
                  </p>
                  <p className={`text-base font-normal ${textColor}`}>
                    {stat.description}
                  </p>
                  {stat.linkText && stat.linkUrl && (
                    <a
                      href={stat.linkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-base ${linkColor} underline decoration-dotted flex items-center gap-1`}
                    >
                      {stat.linkText} <span className="text-xs">⧉</span>
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Right Column - Map (50% width if stats, 100% width if no stats) */}
        <div className={`${hasStats ? 'lg:basis-1/2 flex items-stretch aspect-square lg:aspect-auto' : 'flex-1 h-full'} w-full self-stretch min-h-0`}>
          {mapType === 'image' ? (
            <img
              src={mapSrc}
              alt={mapAlt}
              style={isFullHeight ? undefined : { height: `${mapHeight}px` }}
              className={`w-full object-cover rounded ${isFullHeight ? 'h-full' : ''}`}
            />
          ) : (
            <iframe
              src={mapSrc}
              title={mapAlt}
              style={isFullHeight ? undefined : { height: `${mapHeight}px` }}
              className={`w-full border-0 rounded ${isFullHeight ? 'h-full' : ''}`}
              loading="lazy"
            />
          )}
        </div>
      </div>

      {/* Bottom spacer */}
      <div className="h-8 w-5 opacity-75 flex-shrink-0"></div>
    </section>
  )
}
