import { useTranslation } from 'react-i18next'

/**
 * ContentBox Component
 *
 * A simple container box for displaying content with customizable styling.
 * Can contain any React components as children (text, images, embeds, etc.).
 *
 * @param titleKey - Translation key for the box title (optional)
 * @param backgroundColor - Tailwind background color class (default: 'bg-goos-blue-800')
 * @param textColor - Tailwind text color class for content (default: 'text-white')
 * @param titleColor - Tailwind text color class for title (default: 'text-white')
 * @param padding - Tailwind padding class (default: 'p-8')
 * @param children - Content to display inside the box
 *
 * @example
 * ```tsx
 * <ContentBox
 *   titleKey="contentBox.title"
 *   backgroundColor="bg-goos-blue-800"
 *   textColor="text-white"
 * >
 *   <p>Some content here</p>
 *   <SpotifyEmbed embedId="..." embedType="episode" />
 * </ContentBox>
 * ```
 */

interface ContentBoxProps {
  titleKey?: string
  backgroundColor?: string
  textColor?: string
  titleColor?: string
  padding?: string
  children: React.ReactNode
}

export default function ContentBox({
  titleKey,
  backgroundColor = 'bg-goos-blue-800',
  textColor = 'text-white',
  titleColor = 'text-white',
  padding = 'p-8',
  children,
}: ContentBoxProps) {
  const { t } = useTranslation()

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
