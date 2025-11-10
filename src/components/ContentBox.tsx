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
 * @param buttonIconColor - Color for the plus/minus icon (default: 'text-white')
 * @param buttonIconBgColor - Background color for the icon circle (default: 'bg-goos-blue-700')
 * @param buttonLeftBorderColor - Left border color for the collapsible button (optional, e.g., 'border-goos-blue-700')
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
  buttonIconBgColor?: string
  buttonIconBorderColor?: string
  buttonLeftBorderColor?: string
  children: React.ReactNode
}

export default function ContentBox({
  titleKey,
  backgroundColor = 'bg-goos-blue-800',
  textColor = 'text-white',
  titleColor = 'text-white',
  padding = 'p-6',
  collapsible = false,
  defaultCollapsed = true,
  buttonTextColor = 'text-white',
  buttonBgColor = 'bg-goos-blue-900',
  buttonIconColor = 'text-white',
  buttonIconBgColor = 'bg-goos-blue-700',
  buttonIconBorderColor = '',
  buttonLeftBorderColor = '',
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
          className={`${buttonBgColor} ${buttonTextColor} ${buttonLeftBorderColor ? `border-l-4 ${buttonLeftBorderColor}` : ''} px-4 sm:px-6 py-3 sm:py-4 w-full text-left font-regular text-lg sm:text-xl md:text-2xl font-roboto-condensed flex justify-between hover:bg-gray-100 transition-colors duration-200`}
        >
          <span>{t(titleKey)}</span>
          {/* Plus/Minus icon with circular background */}
          <div className={`w-6 h-6 ${buttonIconBgColor} ${buttonIconBorderColor ? `border-2 ${buttonIconBorderColor}` : ''} rounded-full flex items-center justify-center flex-shrink-0 mt-1`}>
            <div className={`${buttonIconColor}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5 transition-transform duration-300"
              >
                {isExpanded ? (
                  // Minus icon when expanded
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                ) : (
                  // Plus icon when collapsed
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                )}
              </svg>
            </div>
          </div>
        </button>

        {/* Collapsible Content */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className={`${backgroundColor} ${textColor} ${padding} w-full ${buttonLeftBorderColor ? `border-l-4 ${buttonLeftBorderColor}` : ''}`}>
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
        <h2 className={`text-lg sm:text-xl md:text-2xl font-bold ${titleColor} mb-4 sm:mb-6`}>
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
