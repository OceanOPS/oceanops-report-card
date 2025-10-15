/**
 * EmergingNetworkCard Component
 *
 * A horizontal card component for emerging networks with image on the left and content on the right.
 * Features network icon, title, description, modal button, and GOOS delivery areas.
 *
 * @param imageSrc - URL to the network image (required)
 * @param imageAlt - Alt text for image (translatable key) (required)
 * @param iconSrc - URL to network icon (required)
 * @param iconAlt - Alt text for icon (translatable key) (required)
 * @param titleKey - Translation key for network title (required)
 * @param descriptionKey - Translation key for description text (required)
 * @param modalTitle - Title for the modal (translatable key) (required)
 * @param modalContent - React node content for the modal (required)
 * @param viewMoreTextKey - Translation key for "View More" button text (required)
 * @param deliveryAreasLabelKey - Translation key for "GOOS delivery areas" label text (required)
 * @param deliveryAreas - Array of 1-3 delivery area keys: 'climate', 'operational', 'oceanhealth' (required)
 * @param backgroundColor - Tailwind background color (default: 'bg-goos-blue-800')
 * @param textColor - Tailwind text color (default: 'text-white')
 * @param buttonBgColor - Tailwind background color for button (default: 'bg-goos-white')
 * @param buttonTextColor - Tailwind text color for button (default: 'text-goos-deep-blue')
 * @param buttonIconBgColor - Tailwind background color for button icon (default: 'bg-goos-deep-blue')
 * @param buttonIconColor - Tailwind text color for button icon SVG (default: 'text-goos-white')
 * @param tooltipBgColor - Tailwind background color for tooltip (default: 'bg-goos-blue-900')
 * @param tooltipTextColor - Tailwind text color for tooltip (default: 'text-white')
 * @param className - Optional additional Tailwind classes
 *
 * @example
 * ```tsx
 * <EmergingNetworkCard
 *   imageSrc="/images/smart-cables.jpg"
 *   imageAlt="emerging.smartCables.imageAlt"
 *   iconSrc="/icons/smart-cables.png"
 *   iconAlt="emerging.smartCables.iconAlt"
 *   titleKey="emerging.smartCables.title"
 *   descriptionKey="emerging.smartCables.description"
 *   modalTitle="emerging.smartCables.modalTitle"
 *   modalContent={<div>Modal content here</div>}
 *   viewMoreTextKey="emerging.viewMore"
 *   deliveryAreasLabelKey="networks.deliveryAreasLabel"
 *   deliveryAreas={['climate', 'operational']}
 * />
 * ```
 */

import { useTranslation } from 'react-i18next'
import { ReactNode } from 'react'
import Button from './Button'
import Tooltip from './Tooltip'

// Reuse the same delivery areas configuration from NetworkCard
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

interface EmergingNetworkCardProps {
  imageSrc: string
  imageAlt: string
  iconSrc: string
  iconAlt: string
  titleKey: string
  descriptionKey: string
  modalTitle: string
  modalContent: ReactNode
  viewMoreTextKey: string
  deliveryAreasLabelKey: string
  deliveryAreas: DeliveryAreaKey[]
  backgroundColor?: string
  textColor?: string
  buttonBgColor?: string
  buttonTextColor?: string
  buttonIconBgColor?: string
  buttonIconColor?: string
  tooltipBgColor?: string
  tooltipTextColor?: string
  className?: string
}

export default function EmergingNetworkCard({
  imageSrc,
  imageAlt,
  iconSrc,
  iconAlt,
  titleKey,
  descriptionKey,
  modalTitle,
  modalContent,
  viewMoreTextKey,
  deliveryAreasLabelKey,
  deliveryAreas,
  backgroundColor = 'bg-goos-blue-800',
  textColor = 'text-white',
  buttonBgColor = 'bg-goos-white',
  buttonTextColor = 'text-goos-deep-blue',
  buttonIconBgColor = 'bg-goos-deep-blue',
  buttonIconColor = 'text-goos-white',
  tooltipBgColor = 'bg-goos-blue-900',
  tooltipTextColor = 'text-white',
  className = '',
}: EmergingNetworkCardProps) {
  const { t } = useTranslation()

  // Limit delivery areas to 1-3
  const limitedAreas = deliveryAreas.slice(0, 3)

  return (
    <article className={`${backgroundColor} flex w-full max-w-6xl h-[542px] overflow-hidden ${className}`}>
      {/* Left Section - Image */}
      <div className="flex-1 relative">
        <img
          src={imageSrc}
          alt={t(imageAlt)}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* Right Section - Content */}
      <div className="flex-1 flex flex-col justify-center">
        <div className="px-[53px] py-8 space-y-8">
          {/* Header Section */}
          <div className="space-y-5">
            {/* Network Icon */}
            <div className="w-[90px] h-[92px]">
              <img
                src={iconSrc}
                alt={t(iconAlt)}
                className="object-contain"
              />
            </div>

            {/* Title */}
            <h2 className={`${textColor} text-3xl font-extrabold leading-9`}>
              {t(titleKey)}
            </h2>
          </div>

          {/* Description and Button */}
          <div className="space-y-6">
            {/* Description */}
            <p className={`${textColor} text-base leading-6`}>
              {t(descriptionKey)}
            </p>

            {/* View More Button */}
            <div className="flex">
              <Button
                variant="modal"
                label={t(viewMoreTextKey)}
                modalTitle={t(modalTitle)}
                modalContent={modalContent}
                bgColor={buttonBgColor}
                textColor={buttonTextColor}
                iconBgColor={buttonIconBgColor}
                iconColor={buttonIconColor}
              />
            </div>
          </div>

          {/* GOOS Delivery Areas */}
          <div className="space-y-4">
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
                    <div className="bg-goos-cyan-200 rounded-full p-2 w-12 h-12 flex items-center justify-center cursor-pointer transition-transform hover:scale-110">
                      <img
                        src={area.icon}
                        alt={t(area.labelKey)}
                        className="w-6 h-6 object-contain"
                      />
                    </div>
                  </Tooltip>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
