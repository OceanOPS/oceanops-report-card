import { useTranslation } from 'react-i18next'

/**
 * DataCard Component
 *
 * Individual data card displaying a number, tag, icon, and title.
 * Used within ContentModule to show statistical or categorical data.
 *
 * @param number - Large display number (e.g., "108", "3,800")
 * @param tagKey - Translation key for the tag label (top right)
 * @param iconSrc - Path to the icon image
 * @param iconAlt - Alt text for the icon
 * @param titleKey - Translation key for the card title (bottom)
 * @param backgroundColor - Tailwind background color class (default: 'bg-goos-blue-800')
 * @param textColor - Tailwind text color class (default: 'text-goos-white')
 * @param numberColor - Tailwind color class for the number (default: 'text-goos-white')
 * @param tagColor - Tailwind color class for the tag (default: 'text-goos-white')
 * @param iconBgColor - Tailwind background color for icon circle (default: 'bg-goos-green-700')
 * @param className - Additional CSS classes
 *
 * @example
 * ```tsx
 * <DataCard
 *   number="108"
 *   tagKey="dataCards.programmes.tag"
 *   iconSrc="/icons/biology_and_ecosystems/Seabirds.png"
 *   iconAlt="Marine birds icon"
 *   titleKey="dataCards.programmes.title"
 * />
 * ```
 */

interface DataCardProps {
  number: string
  tagKey: string
  iconSrc: string
  iconAlt: string
  titleKey: string
  backgroundColor?: string
  textColor?: string
  numberColor?: string
  tagColor?: string
  iconBgColor?: string
  className?: string
}

export default function DataCard({
  number,
  tagKey,
  iconSrc,
  iconAlt,
  titleKey,
  backgroundColor = 'bg-goos-blue-800',
  textColor = 'text-goos-white',
  numberColor = 'text-goos-white',
  tagColor = 'text-goos-white',
  iconBgColor = 'bg-goos-green-700',
  className = '',
}: DataCardProps) {
  const { t } = useTranslation()

  return (
    <div
      className={`${backgroundColor} w-full aspect-[7/8] p-4 flex flex-col justify-between ${className}`}
    >
      {/* Header Section - Number and Tag */}
      <div className="flex items-start justify-between">
        <h1 className={`text-6xl font-light leading-[72px] ${numberColor}`}>
          {number}
        </h1>
        <span className={`text-md ${tagColor} mt-1`}>
          {t(tagKey)}
        </span>
      </div>

      {/* Footer Section - Icon and Title */}
      <div className="flex flex-col gap-2">
        {/* Icon */}
        <div className={`w-12 h-12 ${iconBgColor} rounded-full flex items-center justify-center flex-shrink-0`}>
          <img
            src={iconSrc}
            alt={iconAlt}
            className="w-7 h-7 object-contain"
          />
        </div>

        {/* Title */}
        <p className={`text-md font-roboto-condensed font-semibold ${textColor} uppercase leading-5 tracking-wide min-h-[60px]`}>
          {t(titleKey)}
        </p>
      </div>
    </div>
  )
}
