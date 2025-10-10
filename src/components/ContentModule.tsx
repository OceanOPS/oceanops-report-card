/**
 * ContentModule Component
 *
 * A flexible two-column content module with customizable title section and dynamic content blocks.
 * The left column displays a sticky title section with optional decorative line, kicker, title, subtitle, and introduction.
 * The right column contains dynamic content blocks (paragraphs, quotes, stats, etc).
 *
 * @param titleLevel - Heading level: 'h2' or 'h3' (affects title size)
 * @param kicker - Optional kicker text above the main title
 * @param title - Main title text (required)
 * @param subtitle - Optional subtitle text below the main title
 * @param introduction - Optional introduction text
 * @param hasLine - Show decorative line above title (default: true)
 * @param backgroundColor - Tailwind background color class (default: 'bg-goos-white')
 * @param titleColor - Tailwind text color for titles (default: 'text-goos-blue-900')
 * @param textColor - Tailwind text color for body text (default: 'text-goos-gray-800')
 * @param lineColor - Tailwind background color for decorative line (default: 'bg-goos-orange-500')
 * @param children - Content blocks to display in the right column
 * @param className - Optional additional Tailwind classes
 *
 * @example
 * ```tsx
 * <ContentModule
 *   titleLevel="h2"
 *   kicker="Kicker line:"
 *   title="This is the H2"
 *   subtitle="Subhead"
 *   introduction="Introduction text goes here"
 *   hasLine={true}
 *   backgroundColor="bg-goos-white"
 *   titleColor="text-goos-blue-900"
 *   textColor="text-goos-gray-800"
 *   lineColor="bg-goos-orange-500"
 * >
 *   <p>Content blocks go here...</p>
 * </ContentModule>
 * ```
 */

import { ReactNode } from 'react'

interface ContentModuleProps {
  titleLevel: 'h2' | 'h3'
  kicker?: string
  title: string
  subtitle?: string
  introduction?: string
  hasLine?: boolean
  backgroundColor?: string
  titleColor?: string
  textColor?: string
  lineColor?: string
  children?: ReactNode
  className?: string
}

export default function ContentModule({
  titleLevel = 'h2',
  kicker,
  title,
  subtitle,
  introduction,
  hasLine = true,
  backgroundColor = 'bg-goos-white',
  titleColor = 'text-goos-blue-900',
  textColor = 'text-goos-gray-800',
  lineColor = 'bg-goos-orange-500',
  children,
  className = '',
}: ContentModuleProps) {
  // Title sizes based on level
  const titleSizes = {
    h2: {
      main: 'text-5xl',
      lineHeight: 'leading-[1.2]',
    },
    h3: {
      main: 'text-4xl',
      lineHeight: 'leading-10',
    },
  }

  const sizes = titleSizes[titleLevel]

  return (
    <section className={`${backgroundColor} px-12 md:px-16 py-0 ${className}`}>
      <div className="mx-auto flex gap-5 flex-col lg:flex-row">
        {/* Left Column - Sticky Title */}
        <div className="lg:basis-1/2 flex flex-col gap-5 lg:sticky lg:top-0 lg:self-start">
          {/* Top spacer */}
          <div className="h-8 w-5 opacity-75"></div>

          <div className="flex flex-col gap-6">
            {/* Decorative Line */}
            {hasLine && <div className={`${lineColor} h-2 w-32`}></div>}

            {/* Titles */}
            <div className="flex flex-col gap-1">
              {kicker && (
                <p className={`${sizes.main} font-normal ${titleColor} ${sizes.lineHeight}`}>
                  {kicker}
                </p>
              )}

              <p className={`${sizes.main} font-extrabold ${titleColor} ${sizes.lineHeight}`}>
                {title}
              </p>

              {subtitle && (
                <p className={`${sizes.main} font-normal ${titleColor} ${sizes.lineHeight}`}>
                  {subtitle}
                </p>
              )}

              {introduction && (
                <p className={`text-xl font-semibold ${textColor} mt-1`}>
                  {introduction}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Content */}
        <div className="lg:basis-1/2 flex flex-col gap-5">
          {/* Top spacer */}
          <div className="h-8 w-5 opacity-75"></div>

          {/* Dynamic content blocks */}
          {children}

          {/* Bottom spacer */}
          <div className="h-8 w-5 opacity-75"></div>
        </div>
      </div>
    </section>
  )
}
