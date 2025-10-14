/**
 * InsightGrid Component
 *
 * A flexible grid component that displays insights/statistics in a horizontal row.
 * Each insight shows a number, description, and optional link.
 * Supports 1-4 insights maximum. For more insights, use multiple InsightGrid modules.
 *
 * @param title - Optional section title
 * @param hasLine - Show decorative line above title (default: true)
 * @param lineColor - Tailwind background color for decorative line (default: 'bg-goos-orange-500')
 * @param insights - Array of insight objects (required)
 * @param backgroundColor - Tailwind background color (default: 'bg-goos-blue-700')
 * @param titleColor - Tailwind text color for title (default: 'text-white')
 * @param textColor - Tailwind text color for body text (default: 'text-white')
 * @param numberColor - Tailwind text color for numbers (default: 'text-white')
 * @param linkColor - Tailwind text color for links (default: 'text-white')
 * @param className - Optional additional Tailwind classes
 *
 * @example
 * ```tsx
 * // 3 insights with title
 * <InsightGrid
 *   title="Key Metrics"
 *   insights={[
 *     {
 *       number: '1,234',
 *       description: 'Active platforms worldwide',
 *       linkText: 'View Details',
 *       linkUrl: 'https://example.com'
 *     },
 *     {
 *       number: '$45M',
 *       description: 'Annual funding'
 *     },
 *     {
 *       number: '567',
 *       description: 'Research publications'
 *     }
 *   ]}
 *   backgroundColor="bg-goos-blue-700"
 * />
 *
 * // 4 insights without title
 * <InsightGrid
 *   hasLine={false}
 *   insights={[
 *     { number: '100', description: 'Countries participating' },
 *     { number: '2,847', description: 'Data points collected' },
 *     { number: '15', description: 'Years of operation' },
 *     { number: '98%', description: 'Data accuracy rate' }
 *   ]}
 *   backgroundColor="bg-goos-cyan-700"
 * />
 * ```
 */

interface InsightItem {
  number: string
  description: string
  linkText?: string
  linkUrl?: string
}

interface InsightGridProps {
  title?: string
  hasLine?: boolean
  lineColor?: string
  insights: InsightItem[]
  backgroundColor?: string
  titleColor?: string
  textColor?: string
  numberColor?: string
  linkColor?: string
  className?: string
}

export default function InsightGrid({
  title,
  hasLine = true,
  lineColor = 'bg-goos-orange-500',
  insights,
  backgroundColor = 'bg-goos-blue-700',
  titleColor = 'text-white',
  textColor = 'text-white',
  numberColor = 'text-white',
  linkColor = 'text-white',
  className = '',
}: InsightGridProps) {
  // Limit to maximum 4 insights
  const limitedInsights = insights.slice(0, 4)
  const insightCount = limitedInsights.length

  // Grid columns based on insight count (1-4)
  const gridColsClass = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 lg:grid-cols-2',
    3: 'grid-cols-1 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  }[insightCount] || 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'

  return (
    <section className={`${backgroundColor} px-12 md:px-16 py-0 ${className}`}>
      <div className="mx-auto flex flex-col gap-5">
        {/* Top spacer */}
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

        <div className="h-8 w-5 opacity-75"></div>

        {/* Insights Grid - Adaptive columns based on count */}
        <div className={`grid ${gridColsClass} gap-8`}>
          {limitedInsights.map((insight, index) => (
            <div key={index} className="flex flex-col gap-2">
              <p className={`text-5xl font-light ${numberColor}`}>
                {insight.number}
              </p>
              <p className={`text-base font-normal ${textColor}`}>
                {insight.description}
              </p>
              {insight.linkText && insight.linkUrl && (
                <a
                  href={insight.linkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-base ${linkColor} underline decoration-dotted flex items-center gap-1`}
                >
                  {insight.linkText} <span className="text-xs">⧉</span>
                </a>
              )}
            </div>
          ))}
        </div>

        {/* Bottom spacers */}
        <div className="h-8 w-5 opacity-75"></div>
        <div className="h-8 w-5 opacity-75"></div>
      </div>
    </section>
  )
}
