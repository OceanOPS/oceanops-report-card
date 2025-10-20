/**
 * NetworkCard Component
 *
 * A card component that displays network information with ratings and delivery areas.
 * Designed to be used within NetworkCarousel or standalone.
 * Supports half-star ratings (0, 0.5, 1, 1.5, 2, 2.5, 3).
 *
 * @param iconSrc - URL to network icon/logo image (required)
 * @param iconAlt - Alt text for icon (translatable key) (required)
 * @param titleKey - Translation key for network title (required)
 * @param networkUrl - URL to network page (required)
 * @param networkLinkKey - Translation key for "View Network" link text (required)
 * @param ratings - Object with rating values (0-3, supports 0.5 increments) (required)
 * @param deliveryAreasLabelKey - Translation key for "GOOS delivery areas" label text (required)
 * @param deliveryAreas - Array of 1-3 delivery area keys: 'climate', 'operational', 'oceanhealth' (required)
 * @param backgroundColor - Tailwind background color (default: 'bg-goos-blue-800')
 * @param textColor - Tailwind text color (default: 'text-white')
 * @param accentColor - Tailwind color for stars and links (default: 'text-goos-orange-500')
 * @param iconBgColor - Tailwind background color for delivery area icons (default: 'bg-goos-light-blue-shade-200')
 * @param iconTextColor - Tailwind text color for delivery area icon SVGs (default: 'text-goos-deep-blue')
 * @param tooltipBgColor - Tailwind background color for tooltip (default: 'bg-goos-blue-900')
 * @param tooltipTextColor - Tailwind text color for tooltip (default: 'text-white')
 * @param className - Optional additional Tailwind classes
 *
 * @example
 * ```tsx
 * <NetworkCard
 *   iconSrc="/images/network-icon.png"
 *   iconAlt="networks.argo.iconAlt"
 *   titleKey="networks.argo.title"
 *   networkUrl="https://example.com/argo"
 *   networkLinkKey="networks.viewNetwork"
 *   ratings={{
 *     implementationStatus: 3,
 *     realTime: 2.5,
 *     archivedHighQuality: 3,
 *     metadata: 2,
 *     bestPractices: 1.5
 *   }}
 *   deliveryAreasLabelKey="networks.deliveryAreasLabel"
 *   deliveryAreas={['climate', 'operational', 'oceanhealth']}
 *   backgroundColor="bg-goos-blue-800"
 *   textColor="text-white"
 *   accentColor="text-goos-orange-500"
 * />
 * ```
 */

import { useTranslation } from 'react-i18next'
import Tooltip from './Tooltip'

// Fixed GOOS delivery areas configuration
const DELIVERY_AREAS_CONFIG = {
  climate: {
    icon: '/icons/climate.png',
    labelKey: 'networks.deliveryAreas.climate',
  },
  operational: {
    icon: '/icons/operational_services.png',
    labelKey: 'networks.deliveryAreas.operational',
  },
  oceanhealth: {
    icon: '/icons/ocean_health.png',
    labelKey: 'networks.deliveryAreas.oceanhealth',
  },
} as const

type DeliveryAreaKey = keyof typeof DELIVERY_AREAS_CONFIG

interface NetworkRatings {
  implementationStatus: number
  realTime: number
  archivedHighQuality: number
  metadata: number
  bestPractices: number
}

interface NetworkCardProps {
  iconSrc: string
  iconAlt: string
  titleKey: string
  networkUrl: string
  networkLinkKey: string
  ratings: NetworkRatings
  deliveryAreasLabelKey: string
  deliveryAreas: DeliveryAreaKey[]
  backgroundColor?: string
  textColor?: string
  accentColor?: string
  iconBgColor?: string
  iconTextColor?: string
  tooltipBgColor?: string
  tooltipTextColor?: string
  className?: string
}

export default function NetworkCard({
  iconSrc,
  iconAlt,
  titleKey,
  networkUrl,
  networkLinkKey,
  ratings,
  deliveryAreasLabelKey,
  deliveryAreas,
  backgroundColor = 'bg-goos-blue-800',
  textColor = 'text-white',
  accentColor = 'text-goos-orange-500',
  iconBgColor = 'bg-goos-cyan-200',
  iconTextColor = 'text-goos-deep-blue',
  tooltipBgColor = 'bg-goos-blue-900',
  tooltipTextColor = 'text-white',
  className = '',
}: NetworkCardProps) {
  const { t } = useTranslation()

  // Limit delivery areas to 1-3
  const limitedAreas = deliveryAreas.slice(0, 3)

  // Helper function to render stars (supports half stars)
  const renderStars = (rating: number) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={`full-${i}`} className={accentColor}>
          ★
        </span>
      )
    }

    // Half star
    if (hasHalfStar) {
      stars.push(
        <span key="half" className={`relative ${accentColor}`}>
          <span className="text-gray-100">★</span>
          <span className="absolute inset-0 overflow-hidden w-1/2">★</span>
        </span>
      )
    }

    // Empty stars
    const emptyStars = 3 - Math.ceil(rating)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span key={`empty-${i}`} className="text-gray-100">
          ★
        </span>
      )
    }

    return stars
  }

  return (
    <article className={`${backgroundColor} p-6 flex flex-col gap-6 w-[420px] ${className}`}>
      {/* Icon and Title */}
      <div className="flex flex-col gap-4 min-h-[88px]">
        <div className="h-[71px] w-[70px]">
          <img
            src={iconSrc}
            alt={t(iconAlt)}
            className="w-full h-full object-contain"
          />
        </div>

        <div className="flex flex-col gap-2">
          <h4 className={`${textColor} text-xl font-semibold`}>
            {t(titleKey)}
          </h4>
          <a
            href={networkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`${accentColor} text-base underline decoration-dotted`}
          >
            {t(networkLinkKey)} <span className="text-xs">⧉</span>
          </a>
        </div>
      </div>

      {/* Divider */}
      <div className="h-[1px] bg-white opacity-20"></div>

      {/* Ratings */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <p className={`flex-1 ${textColor} text-base`}>
            {t('networks.ratings.implementationStatus')}:
          </p>
          <div className="flex gap-1">
            {renderStars(ratings.implementationStatus)}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <p className={`flex-1 ${textColor} text-base`}>
            {t('networks.ratings.realTime')}:
          </p>
          <div className="flex gap-1">{renderStars(ratings.realTime)}</div>
        </div>

        <div className="flex justify-between items-center">
          <p className={`flex-1 ${textColor} text-base`}>
            {t('networks.ratings.archivedHighQuality')}:
          </p>
          <div className="flex gap-1">
            {renderStars(ratings.archivedHighQuality)}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <p className={`flex-1 ${textColor} text-base`}>
            {t('networks.ratings.metadata')}:
          </p>
          <div className="flex gap-1">{renderStars(ratings.metadata)}</div>
        </div>

        <div className="flex justify-between items-center">
          <p className={`flex-1 ${textColor} text-base`}>
            {t('networks.ratings.bestPractices')}:
          </p>
          <div className="flex gap-1">
            {renderStars(ratings.bestPractices)}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="h-[1px] bg-white opacity-20"></div>

      {/* GOOS Delivery Areas */}
      <div className="flex flex-col gap-4">
        <p className={`${textColor} text-sm`}>{t(deliveryAreasLabelKey)}:</p>

        <div className="flex gap-4">
          {limitedAreas.map((areaKey) => {
            const area = DELIVERY_AREAS_CONFIG[areaKey]
            return (
              <Tooltip
                key={areaKey}
                content={area.labelKey}
                backgroundColor={tooltipBgColor}
                textColor={tooltipTextColor}
              >
                <div
                  className={`${iconBgColor} rounded-full p-2 w-12 h-12 flex items-center justify-center cursor-pointer transition-transform hover:scale-110`}
                >
                  <img
                    src={area.icon}
                    alt={t(area.labelKey)}
                    className={`w-6 h-6 object-contain ${iconTextColor}`}
                  />
                </div>
              </Tooltip>
            )
          })}
        </div>
      </div>
    </article>
  )
}
