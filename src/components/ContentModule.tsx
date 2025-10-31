/**
 * ContentModule Component
 *
 * A flexible content module with two layout options and customizable title section.
 *
 * Layout options:
 * - 'split' (default): Two columns with sticky title on left, content on right
 * - 'full-width': Title at top (not sticky), content in two columns below
 *
 * @param layout - Layout type: 'split' | 'full-width' (default: 'split')
 * @param titleLevel - Heading level: 'h2' or 'h3' (affects title size)
 * @param kicker - Optional kicker text above the main title
 * @param title - Main title text (required)
 * @param subtitle - Optional subtitle text below the main title
 * @param introduction - Optional introduction text
 * @param button - Optional button configuration
 * @param hasLine - Show decorative line above title (default: true)
 * @param backgroundColor - Tailwind background color class (default: 'bg-goos-white')
 * @param titleColor - Tailwind text color for titles (default: 'text-goos-blue-900')
 * @param textColor - Tailwind text color for body text (default: 'text-goos-gray-800')
 * @param lineColor - Tailwind background color for decorative line (default: 'bg-goos-orange-500')
 * @param children - Content blocks to display
 * @param className - Optional additional Tailwind classes
 *
 * @example
 * ```tsx
 * // Split layout (default) - Sticky title on left, content on right
 * <ContentModule
 *   layout="split"
 *   title="Section Title"
 * >
 *   <p>Content in right column...</p>
 * </ContentModule>
 *
 * // Full-width layout - Title at top, content in two columns below
 * <ContentModule
 *   layout="full-width"
 *   title="Section Title"
 *   rightColumn={
 *     <>
 *       <p>Content in right column...</p>
 *       <p>More right column content...</p>
 *     </>
 *   }
 * >
 *   <p>Content in left column...</p>
 *   <p>More left column content...</p>
 * </ContentModule>
 *
 * // With button
 * <ContentModule
 *   title="Section Title"
 *   button={{
 *     type: 'link',
 *     label: 'View Report',
 *     url: 'https://example.com',
 *     textColor: 'text-white',
 *     bgColor: 'bg-goos-blue-700'
 *   }}
 * >
 *   <p>Content...</p>
 * </ContentModule>
 * ```
 */

import { ReactNode, useState } from 'react'
import { useTranslation } from 'react-i18next'
import VideoModal from './VideoModal'
import ContentModal from './ContentModal'

// Button configuration types
type ButtonConfig =
  | {
      type: 'link'
      label: string
      url: string
      textColor?: string
      bgColor?: string
    }
  | {
      type: 'video'
      label: string
      videoType: 'youtube' | 'local'
      videoId: string
      previewImage: string
      previewAlt?: string
      textColor?: string
      bgColor?: string
    }
  | {
      type: 'modal'
      label: string
      modalTitle?: string
      modalContent: ReactNode
      modalMaxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
      textColor?: string
      bgColor?: string
    }

interface ContentModuleProps {
  layout?: 'split' | 'full-width'
  titleLevel?: 'h2' | 'h3'
  kicker?: string
  title?: string
  subtitle?: string
  introduction?: string
  introductionKeys?: string[]  // Array of translation keys for multiple paragraphs
  button?: ButtonConfig
  hasLine?: boolean
  backgroundColor?: string
  titleColor?: string
  textColor?: string
  lineColor?: string
  children?: ReactNode
  rightColumn?: ReactNode  // Only for full-width layout
  className?: string
}

export default function ContentModule({
  layout = 'split',
  titleLevel = 'h2',
  kicker,
  title,
  subtitle,
  introduction,
  introductionKeys,
  button,
  hasLine = true,
  backgroundColor = 'bg-goos-white',
  titleColor = 'text-goos-blue-900',
  textColor = 'text-goos-gray-800',
  lineColor = 'bg-goos-orange-500',
  children,
  rightColumn,
  className = '',
}: ContentModuleProps) {
  const { t } = useTranslation()
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
  const [isContentModalOpen, setIsContentModalOpen] = useState(false)

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

  // Render button based on type
  const renderButton = () => {
    if (!button) return null

    const defaultTextColor = button.textColor || 'text-white'
    const defaultBgColor = button.bgColor || 'bg-goos-blue-700'

    const baseClasses = `inline-flex items-center gap-2 px-5 py-2 ${defaultTextColor} ${defaultBgColor} font-roboto-condensed uppercase text-lg font-semibold hover:opacity-90 transition-opacity`

    // External link button
    if (button.type === 'link') {
      // Circle should have inverted colors - text color as bg, bg color as text
      return (
        <a
          href={button.url}
          target="_blank"
          rel="noopener noreferrer"
          className={baseClasses}
        >
          {button.label}
          {/* Right arrow icon with circular background (inverted colors) */}
          <div className={`w-5 h-5 ${defaultTextColor.replace('text-', 'bg-')} rounded-full flex items-center justify-center`}>
            <svg
              className={`w-3 h-3 ${defaultBgColor.replace('bg-', 'text-')}`}
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
            </svg>
          </div>
        </a>
      )
    }

    // Video modal button
    if (button.type === 'video') {
      return (
        <>
          <button onClick={() => setIsVideoModalOpen(true)} className={baseClasses}>
            {button.label}
            {/* Play icon with circular background (inverted colors) */}
            <div className={`w-5 h-5 ${defaultTextColor.replace('text-', 'bg-')} rounded-full flex items-center justify-center`}>
              <svg
                className={`w-3 h-3 ${defaultBgColor.replace('bg-', 'text-')}`}
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </button>
          <VideoModal
            videoType={button.videoType}
            videoId={button.videoId}
            previewImage={button.previewImage}
            previewAlt={button.previewAlt || button.label}
            isOpen={isVideoModalOpen}
            onClose={() => setIsVideoModalOpen(false)}
          />
        </>
      )
    }

    // Content modal button
    if (button.type === 'modal') {
      return (
        <>
          <button onClick={() => setIsContentModalOpen(true)} className={baseClasses}>
            {button.label}
            {/* Plus icon with circular background (inverted colors) */}
            <div className={`w-5 h-5 ${defaultTextColor.replace('text-', 'bg-')} rounded-full flex items-center justify-center`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className={`w-3 h-3 ${defaultBgColor.replace('bg-', 'text-')}`}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </div>
          </button>
          <ContentModal
            isOpen={isContentModalOpen}
            onClose={() => setIsContentModalOpen(false)}
            title={button.modalTitle}
            maxWidth={button.modalMaxWidth}
          >
            {button.modalContent}
          </ContentModal>
        </>
      )
    }

    return null
  }

  // Check if there's any title content to render
  const hasTitleContent = title || kicker || subtitle || introduction || introductionKeys || button

  // Render title section (reusable for both layouts)
  const renderTitleSection = () => {
    if (!hasTitleContent) return null

    return (
      <div className="flex flex-col gap-6 mb-24">
        {/* Decorative Line */}
        {hasLine && <div className={`${lineColor} h-2 w-32`}></div>}

        {/* Titles */}
        <div className="flex flex-col gap-1">
          {kicker && (
            <p className={`${sizes.main} font-normal ${titleColor} ${sizes.lineHeight}`}>
              {kicker}
            </p>
          )}

          {title && (
            <p className={`${sizes.main} font-extrabold ${titleColor} ${sizes.lineHeight}`}>
              {title}
            </p>
          )}

          {subtitle && (
            <p className={`${sizes.main} font-normal ${titleColor} ${sizes.lineHeight}`}>
              {subtitle}
            </p>
          )}

          {/* Single introduction paragraph (legacy support) */}
          {introduction && !introductionKeys && (
            <p className={`text-xl font-normal ${textColor} mt-1`}>
              {introduction}
            </p>
          )}

          {/* Multiple introduction paragraphs from translation keys */}
          {introductionKeys && introductionKeys.length > 0 && (
            <div className="flex flex-col gap-4 mt-8">
              {introductionKeys.map((key, index) => (
                <p key={index} className={`text-xl font-normal ${textColor} leading-relaxed`}>
                  {t(key)}
                </p>
              ))}
            </div>
          )}
        </div>

        {/* Optional Button */}
        {button && <div className="mt-1">{renderButton()}</div>}
      </div>
    )
  }

  // Split layout (default): Sticky title on left, content on right
  if (layout === 'split') {
    return (
      <section className={`${backgroundColor} px-12 md:px-16 py-0 ${className}`}>
        <div className="mx-auto flex gap-16 flex-col lg:flex-row">
          {/* Left Column - Sticky Title (only if has title content) */}
          {hasTitleContent && (
            <div className="lg:basis-1/2 flex flex-col gap-5 lg:sticky lg:top-0 lg:self-start z-10">
              {/* Top spacer */}
              <div className="h-8 w-5 opacity-75"></div>

              {renderTitleSection()}
            </div>
          )}

          {/* Right Column - Content */}
          <div className={`${hasTitleContent ? 'lg:basis-1/2' : 'w-full'} flex flex-col gap-5`}>
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

  // Full-width layout: Title at top, content in two columns below
  return (
    <section className={`${backgroundColor} px-12 md:px-16 py-0 ${className}`}>
      <div className="mx-auto flex flex-col gap-5">
        {/* Title Section - Full Width (only if has title content) */}
        {hasTitleContent && (
          <div className="flex flex-col gap-5 max-w-2xl">
            <div className="h-8 w-5 opacity-75"></div>
            {renderTitleSection()}
          </div>
        )}

        {/* Content in 2 Columns */}
        <div className={`flex gap-16 flex-col lg:flex-row ${hasTitleContent ? '-mt-24' : ''}`}>
          {/* Left Column */}
          <div className="lg:basis-1/2 flex flex-col gap-5">
            {!hasTitleContent && <div className="h-8 w-5 opacity-75"></div>}

            {children}
          </div>

          {/* Right Column */}
          <div className="lg:basis-1/2 flex flex-col gap-5">
            {!hasTitleContent && <div className="h-8 w-5 opacity-75"></div>}

            {rightColumn}
          </div>
        </div>

        <div className="h-8 w-5 opacity-75"></div>
      </div>
    </section>
  )
}
