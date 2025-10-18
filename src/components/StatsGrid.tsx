/**
 * StatsGrid Component
 *
 * A 2x2 grid of statistics, each with a number, description, and optional link.
 * Designed to be used within ContentModule or other content sections.
 *
 * @param stats - Array of stat objects (required, 1-4 items)
 * @param numberColor - Tailwind text color for the numbers (default: 'text-goos-blue-700')
 * @param textColor - Tailwind text color for descriptions (default: 'text-goos-gray-800')
 * @param linkColor - Tailwind text color for links (default: 'text-goos-gray-800')
 * @param className - Optional additional Tailwind classes
 *
 * @example
 * ```tsx
 * <StatsGrid
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
  numberColor?: string
  textColor?: string
  linkColor?: string
  className?: string
}

export default function StatsGrid({
  stats,
  numberColor = 'text-goos-blue-700',
  textColor = 'text-goos-gray-800',
  linkColor = 'text-goos-gray-800',
  className = '',
}: StatsGridProps) {
  return (
    <div className={`grid grid-cols-2 gap-8 ${className}`}>
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
  )
}
