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
 * @param fullWidth - Remove horizontal padding for edge-to-edge display (default: false)
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

import { useTranslation } from 'react-i18next'

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
  fullWidth?: boolean
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
  mapAlt,
  mapType = 'image',
  mapHeight = 500,
  fullWidth = false,
  backgroundColor = 'bg-goos-blue-700',
  titleColor = 'text-white',
  textColor = 'text-white',
  numberColor = 'text-goos-orange-500',
  linkColor = 'text-goos-orange-500',
  className = '',
}: MapStatsPanelProps) {
  const { t } = useTranslation()

  // Check if stats panel should be shown
  const hasStats = stats && stats.length > 0

  // Use translation for default mapAlt
  const altText = mapAlt || t('common.mapAlt')

  // Ensure exactly 4 stats (take first 4 if more provided)
  const gridStats = hasStats ? stats.slice(0, 4) : []

  // Check if using full viewport height
  const isFullHeight = mapHeight === 'full'
  const sectionHeightClass = isFullHeight ? 'min-h-screen' : ''

  // Padding classes based on fullWidth prop
  const paddingClass = fullWidth ? '' : 'px-4 sm:px-8 md:px-12 lg:px-16'

  return (
    <section className={`${backgroundColor} ${paddingClass} py-0 flex flex-col ${sectionHeightClass} ${className}`}>
      {/* Header Section */}
      <div className="flex flex-col gap-5 flex-shrink-0">
        <div className="h-4 sm:h-6 md:h-8 w-5 opacity-75"></div>

        {/* Title Section */}
        {title && (
          <div className="flex flex-col gap-4 sm:gap-5 md:gap-6 mb-6 sm:mb-8 md:mb-12">
            {hasLine && <div className={`${lineColor} h-2 w-20 sm:w-24 md:w-32`}></div>}
            <h3 className={`text-2xl sm:text-3xl md:text-4xl font-extrabold ${titleColor} leading-tight`}>
              {title}
            </h3>
          </div>
        )}
      </div>

      {/* Content: Stats and Map - Takes remaining space and centers */}
      <div className={`flex gap-5 md:gap-8 lg:gap-12 flex-col ${hasStats ? 'lg:flex-row' : ''} flex-1 ${hasStats ? 'lg:items-center' : ''} min-h-0`}>
        {/* Left Column - Stats Grid 2x2 (50% width) - Only show if stats exist */}
        {hasStats && (
          <div className="lg:basis-1/2 flex items-center">
            <div className="grid grid-cols-2 gap-4 sm:gap-6 md:gap-8 w-full">
              {gridStats.map((stat, index) => (
                <div key={index} className="flex flex-col gap-2">
                  <p className={`text-3xl sm:text-4xl md:text-5xl font-light leading-tight ${numberColor}`}>
                    {stat.number}
                  </p>
                  <p className={`text-sm sm:text-base font-normal ${textColor}`}>
                    {stat.description}
                  </p>
                  {stat.linkText && stat.linkUrl && (
                    <a
                      href={stat.linkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-sm sm:text-base ${linkColor} underline decoration-dotted flex items-center gap-1`}
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
              alt={altText}
              className={`w-full object-cover rounded ${isFullHeight ? 'h-full' : 'h-[400px] sm:h-[500px] md:h-[600px] lg:h-[800px] xl:h-[1000px]'}`}
            />
          ) : (
            <iframe
              src={mapSrc}
              title={altText}
              className={`w-full border-0 rounded ${isFullHeight ? 'h-full' : 'h-[400px] sm:h-[500px] md:h-[600px] lg:h-[800px] xl:h-[1000px]'}`}
              loading="lazy"
            />
          )}
        </div>
      </div>

      {/* Bottom spacer */}
      <div className="h-4 sm:h-6 md:h-8 w-5 opacity-75 flex-shrink-0"></div>
    </section>
  )
}
