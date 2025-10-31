/**
 * StatsGrid Component
 *
 * A flexible grid of statistics, each with a number, description, and optional link.
 * Designed to be used within ContentModule or other content sections.
 *
 * @param stats - Array of stat objects (required, 1-4 items)
 * @param columns - Number of columns (2 or 4, default: 2)
 * @param title - Optional title text
 * @param hasLine - Show decorative line above title (default: false)
 * @param lineColor - Tailwind background color for decorative line (default: 'bg-goos-orange-500')
 * @param titleColor - Tailwind text color for title (default: 'text-goos-blue-700')
 * @param numberColor - Tailwind text color for the numbers (default: 'text-goos-blue-700')
 * @param textColor - Tailwind text color for descriptions (default: 'text-goos-gray-800')
 * @param linkColor - Tailwind text color for links (default: 'text-goos-gray-800')
 * @param className - Optional additional Tailwind classes
 *
 * @example
 * ```tsx
 * <StatsGrid
 *   title="Networks by the numbers"
 *   hasLine={true}
 *   lineColor="bg-goos-orange-500"
 *   stats={[
 *     {
 *       number: '$45M',
 *       description: 'Description of the stat',
 *       linkText: 'Learn More',
 *       linkUrl: 'https://example.com'
 *     },
 *     {
 *       number: '$400B',
 *       description: 'Another stat description'
 *     }
 *   ]}
 *   columns={4}
 *   numberColor="text-goos-blue-700"
 * />
 * ```
 */

export interface StatItem {
  number: string
  description: string
  linkText?: string
  linkUrl?: string
}

interface StatsGridProps {
  stats: StatItem[]
  columns?: 2 | 4
  title?: string
  hasLine?: boolean
  lineColor?: string
  titleColor?: string
  numberColor?: string
  textColor?: string
  linkColor?: string
  className?: string
}

export default function StatsGrid({
  stats,
  columns = 2,
  title,
  hasLine = false,
  lineColor = 'bg-goos-orange-500',
  titleColor = 'text-goos-blue-700',
  numberColor = 'text-goos-blue-700',
  textColor = 'text-goos-gray-800',
  linkColor = 'text-goos-gray-800',
  className = '',
}: StatsGridProps) {
  const gridColsClass = columns === 4 ? 'grid-cols-4' : 'grid-cols-2'

  return (
    <div className={className}>
      {/* Optional decorative line */}
      {hasLine && <div className={`${lineColor} h-2 w-32 mb-6`}></div>}

      {/* Optional title */}
      {title && (
        <h3 className={`text-4xl font-extrabold ${titleColor} leading-10 mb-16`}>
          {title}
        </h3>
      )}

      {/* Stats Grid */}
      <div className={`grid ${gridColsClass} gap-8`}>
      {stats.map((stat, index) => (
        <div key={index} className="flex flex-col gap-2">
          {/* Stat Number */}
          <p className={`text-5xl font-light ${numberColor}`}>
            {stat.number}
          </p>

          {/* Stat Description */}
          <p className={`text-base font-normal ${textColor} leading-[1.5]`}>
            {stat.description}
          </p>

          {/* Optional External Link */}
          {stat.linkText && stat.linkUrl && (
            <a
              href={stat.linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-base ${linkColor} underline decoration-dotted flex items-center gap-1 hover:opacity-70 transition-opacity`}
            >
              {stat.linkText} <span className="text-xs">⧉</span>
            </a>
          )}
        </div>
      ))}
      </div>
    </div>
  )
}
