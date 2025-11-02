import { useTranslation } from 'react-i18next'
import { useState } from 'react'

/**
 * ContentBox Component
 *
 * A container box for displaying content with customizable styling.
 * Can optionally work as a collapsible accordion.
 *
 * @param titleKey - Translation key for the box title (optional)
 * @param backgroundColor - Tailwind background color class (default: 'bg-goos-blue-800')
 * @param textColor - Tailwind text color class for content (default: 'text-white')
 * @param titleColor - Tailwind text color class for title (default: 'text-white')
 * @param padding - Tailwind padding class (default: 'p-8')
 * @param collapsible - If true, makes the box collapsible with a button (default: false)
 * @param defaultCollapsed - If collapsible, whether to start collapsed (default: true)
 * @param buttonTextColor - Text color for the collapsible button (default: 'text-white')
 * @param buttonBgColor - Background color for the collapsible button (default: 'bg-goos-blue-900')
 * @param buttonIconColor - Color for the expand/collapse icon (default: 'text-white')
 * @param buttonBorderColor - Border color for the collapsible button (optional, e.g., 'border-goos-gray-300')
 * @param children - Content to display inside the box
 *
 * @example
 * ```tsx
 * // Regular ContentBox
 * <ContentBox
 *   titleKey="contentBox.title"
 *   backgroundColor="bg-goos-blue-800"
 *   textColor="text-white"
 * >
 *   <p>Some content here</p>
 * </ContentBox>
 *
 * // Collapsible ContentBox
 * <ContentBox
 *   titleKey="contentBox.learnMore"
 *   collapsible={true}
 *   defaultCollapsed={true}
 *   backgroundColor="bg-goos-blue-800"
 * >
 *   <p>Hidden content that shows on click</p>
 * </ContentBox>
 * ```
 */

interface ContentBoxProps {
  titleKey?: string
  backgroundColor?: string
  textColor?: string
  titleColor?: string
  padding?: string
  collapsible?: boolean
  defaultCollapsed?: boolean
  buttonTextColor?: string
  buttonBgColor?: string
  buttonIconColor?: string
  buttonBorderColor?: string
  children: React.ReactNode
}

export default function ContentBox({
  titleKey,
  backgroundColor = 'bg-goos-blue-800',
  textColor = 'text-white',
  titleColor = 'text-white',
  padding = 'p-8',
  collapsible = false,
  defaultCollapsed = true,
  buttonTextColor = 'text-white',
  buttonBgColor = 'bg-goos-blue-900',
  buttonIconColor = 'text-white',
  buttonBorderColor = '',
  children,
}: ContentBoxProps) {
  const { t } = useTranslation()
  const [isExpanded, setIsExpanded] = useState(!defaultCollapsed)

  // Collapsible version
  if (collapsible && titleKey) {
    return (
      <div className="w-full">
        {/* Collapsible Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`${buttonBgColor} ${buttonTextColor} ${buttonBorderColor ? `border ${buttonBorderColor}` : ''} px-8 py-4 w-full text-left font-regular text-lg font-roboto-condensed flex items-center justify-between hover:opacity-90 transition-opacity`}
        >
          <span>{t(titleKey)}</span>
          <svg
            className={`w-6 h-6 transform transition-transform duration-300 ${buttonIconColor} ${
              isExpanded ? 'rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {/* Collapsible Content */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className={`${backgroundColor} ${textColor} ${padding} w-full`}>
            <div className="space-y-4">
              {children}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Regular version (non-collapsible)
  return (
    <div className={`${backgroundColor} ${textColor} ${padding} w-full`}>
      {/* Title (optional) */}
      {titleKey && (
        <h2 className={`text-2xl font-bold ${titleColor} mb-6`}>
          {t(titleKey)}
        </h2>
      )}

      {/* Content */}
      <div className="space-y-4">
        {children}
      </div>
    </div>
  )
}
