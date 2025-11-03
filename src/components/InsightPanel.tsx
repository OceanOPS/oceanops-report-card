/**
 * InsightPanel Component
 *
 * A panel component that displays a large featured number with description and button,
 * alongside either a grid of statistics (2x2) or custom content (e.g., text paragraph).
 * Perfect for showcasing key metrics and insights.
 *
 * @param title - Optional panel title
 * @param hasLine - Show decorative line above title (default: true)
 * @param lineColor - Tailwind background color for decorative line (default: 'bg-goos-orange-500')
 * @param largeNumber - The main featured number/text (required)
 * @param largeNumberDescription - Description text below the large number (optional)
 * @param button - Optional button configuration (uses Button component)
 * @param stats - Array of stat objects (up to 4) for the 2x2 grid (optional)
 * @param rightContent - Custom content to display on right side instead of stats (optional)
 * @param backgroundColor - Tailwind background color (default: 'bg-goos-blue-700')
 * @param titleColor - Tailwind text color for title (default: 'text-white')
 * @param textColor - Tailwind text color for body text (default: 'text-white')
 * @param numberColor - Tailwind text color for numbers (default: 'text-white')
 * @param linkColor - Tailwind text color for links (default: 'text-white')
 * @param className - Optional additional Tailwind classes
 *
 * @example
 * // With stats grid
 * ```tsx
 * <InsightPanel
 *   title="Insight Panel Optional Heading"
 *   largeNumber="129"
 *   largeNumberDescription="Lorem ipsum dolor sit amet aliqua."
 *   button={{
 *     variant: 'link',
 *     label: 'VIEW FULL LIST',
 *     url: 'https://example.com',
 *     textColor: 'text-white',
 *     bgColor: 'bg-goos-blue-900'
 *   }}
 *   stats={[
 *     {
 *       number: '$45M',
 *       description: 'Lorem ipsum dolor sit amet...',
 *       linkText: 'External Link',
 *       linkUrl: 'https://example.com'
 *     },
 *     // ... up to 4 stats
 *   ]}
 *   backgroundColor="bg-goos-blue-700"
 * />
 * ```
 *
 * @example
 * // With custom text content
 * ```tsx
 * <InsightPanel
 *   title="Insight Panel with Text"
 *   largeNumber="129"
 *   largeNumberDescription="Countries contributing to GOOS"
 *   rightContent={
 *     <p className="text-xl">
 *       This is custom text content that appears on the right side
 *       instead of the stats grid.
 *     </p>
 *   }
 * />
 * ```
 */

import { ReactNode } from 'react'
import Button from './Button'

// Button configuration types (from Button component)
type ButtonConfig =
  | {
      variant: 'link'
      label: string
      url: string
      textColor?: string
      bgColor?: string
      iconColor?: string
      iconBgColor?: string
    }
  | {
      variant: 'video'
      label: string
      videoType: 'youtube' | 'local'
      videoId: string
      previewImage: string
      previewAlt?: string
      textColor?: string
      bgColor?: string
      iconColor?: string
      iconBgColor?: string
    }
  | {
      variant: 'modal'
      label: string
      modalTitle?: string
      modalContent: ReactNode
      modalMaxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
      textColor?: string
      bgColor?: string
      iconColor?: string
      iconBgColor?: string
    }
  | {
      variant: 'action'
      label: string
      onClick: () => void
      textColor?: string
      bgColor?: string
      iconColor?: string
      iconBgColor?: string
    }

interface StatItem {
  number: string
  description: string
  linkText?: string
  linkUrl?: string
}

interface InsightPanelProps {
  title?: string
  hasLine?: boolean
  lineColor?: string
  largeNumber: string
  largeNumberDescription?: string
  button?: ButtonConfig
  stats?: StatItem[]
  rightContent?: ReactNode
  backgroundColor?: string
  titleColor?: string
  textColor?: string
  numberColor?: string
  linkColor?: string
  className?: string
}

export default function InsightPanel({
  title,
  hasLine = true,
  lineColor = 'bg-goos-orange-500',
  largeNumber,
  largeNumberDescription,
  button,
  stats,
  rightContent,
  backgroundColor = 'bg-goos-blue-700',
  titleColor = 'text-white',
  textColor = 'text-white',
  numberColor = 'text-white',
  linkColor = 'text-white',
  className = '',
}: InsightPanelProps) {
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

        {/* Content: Large Number + Stats Grid */}
        <div className="flex gap-5 flex-col lg:flex-row">
          {/* Left: Large Number with Button - 50% width */}
          <div className="lg:basis-1/2 flex flex-col gap-4">
            <div className={`flex flex-col gap-2 ${textColor}`}>
              <p className={`text-8xl font-light leading-[96px] ${numberColor}`}>
                {largeNumber}
              </p>
              {largeNumberDescription && (
                <p className="text-base font-normal">{largeNumberDescription}</p>
              )}
            </div>

            {/* Optional Button */}
            {button && (
              <div className="self-start">
                <Button {...button} />
              </div>
            )}
          </div>

          {/* Right: Stats Grid 2x2 or Custom Content - 50% width */}
          <div className="lg:basis-1/2 flex flex-col gap-8">
            {rightContent ? (
              // Custom content (e.g., text paragraph)
              <div className={`${textColor}`}>
                {rightContent}
              </div>
            ) : stats ? (
              // Stats Grid 2x2
              <>
                {/* Top Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {stats.slice(0, 2).map((stat, index) => (
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

                {/* Bottom Row */}
                {stats.length > 2 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {stats.slice(2, 4).map((stat, index) => (
                      <div key={index + 2} className="flex flex-col gap-2">
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
                )}
              </>
            ) : null}
          </div>
        </div>

        {/* Bottom spacers */}
        <div className="h-8 w-5 opacity-75"></div>
        <div className="h-8 w-5 opacity-75"></div>
      </div>
    </section>
  )
}
