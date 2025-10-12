/**
 * ContentModule Component
 *
 * A flexible two-column content module with customizable title section and dynamic content blocks.
 * The left column displays a sticky title section with optional decorative line, kicker, title, subtitle, introduction, and button.
 * The right column contains dynamic content blocks (paragraphs, quotes, stats, etc).
 *
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
 * @param children - Content blocks to display in the right column
 * @param className - Optional additional Tailwind classes
 *
 * @example
 * ```tsx
 * // With external link button
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
 *
 * // With video modal button
 * <ContentModule
 *   title="Section Title"
 *   button={{
 *     type: 'video',
 *     label: 'Watch Video',
 *     videoType: 'youtube',
 *     videoId: 'dQw4w9WgXcQ',
 *     previewImage: '/images/preview.jpg'
 *   }}
 * >
 *   <p>Content...</p>
 * </ContentModule>
 *
 * // With content modal button
 * <ContentModule
 *   title="Section Title"
 *   button={{
 *     type: 'modal',
 *     label: 'Learn More',
 *     modalTitle: 'Additional Information',
 *     modalContent: <div>Your content here</div>
 *   }}
 * >
 *   <p>Content...</p>
 * </ContentModule>
 * ```
 */

import { ReactNode, useState } from 'react'
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
  titleLevel: 'h2' | 'h3'
  kicker?: string
  title: string
  subtitle?: string
  introduction?: string
  button?: ButtonConfig
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
  button,
  hasLine = true,
  backgroundColor = 'bg-goos-white',
  titleColor = 'text-goos-blue-900',
  textColor = 'text-goos-gray-800',
  lineColor = 'bg-goos-orange-500',
  children,
  className = '',
}: ContentModuleProps) {
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

  return (
    <section className={`${backgroundColor} px-12 md:px-16 py-0 ${className}`}>
      <div className="mx-auto flex gap-5 flex-col lg:flex-row">
        {/* Left Column - Sticky Title */}
        <div className="lg:basis-1/2 flex flex-col gap-5 lg:sticky lg:top-0 lg:self-start z-10">
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

            {/* Optional Button */}
            {button && <div className="mt-1">{renderButton()}</div>}
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
