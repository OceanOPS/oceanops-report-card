/**
 * NetworkCarousel Component
 *
 * A horizontal scrolling carousel that displays NetworkCard components.
 * Features optional title with decorative line and customizable colors.
 *
 * @param title - Optional section title (translation key)
 * @param hasLine - Show decorative line above title (default: true)
 * @param lineColor - Tailwind background color for decorative line (default: 'bg-goos-orange-500')
 * @param cards - Array of network card data (required)
 * @param backgroundColor - Tailwind background color for section (default: 'bg-goos-blue-700')
 * @param titleColor - Tailwind text color for title (default: 'text-white')
 * @param cardBackgroundColor - Tailwind background color for cards (default: 'bg-goos-blue-800')
 * @param cardTextColor - Tailwind text color for card text (default: 'text-white')
 * @param cardAccentColor - Tailwind color for stars and links (default: 'text-goos-orange-500')
 * @param tooltipBgColor - Tailwind background color for tooltips (default: 'bg-goos-blue-900')
 * @param tooltipTextColor - Tailwind text color for tooltips (default: 'text-white')
 * @param arrowColor - Color for navigation arrows in hex format (default: '#F0F0F0')
 * @param className - Optional additional Tailwind classes
 *
 * @example
 * ```tsx
 * <NetworkCarousel
 *   title="networks.title"
 *   hasLine={true}
 *   lineColor="bg-goos-orange-500"
 *   cards={[
 *     {
 *       iconSrc: '/images/argo.png',
 *       iconAlt: 'networks.argo.iconAlt',
 *       titleKey: 'networks.argo.title',
 *       networkUrl: 'https://argo.ucsd.edu',
 *       networkLinkKey: 'networks.viewNetwork',
 *       ratings: {
 *         implementationStatus: 3,
 *         realTime: 3,
 *         archivedHighQuality: 3,
 *         metadata: 2.5,
 *         bestPractices: 2
 *       },
 *       deliveryAreasLabelKey: 'networks.deliveryAreasLabel',
 *       deliveryAreas: ['climate', 'operational', 'oceanhealth']
 *     },
 *     // ... more cards
 *   ]}
 *   backgroundColor="bg-goos-blue-700"
 *   titleColor="text-white"
 *   cardBackgroundColor="bg-goos-blue-800"
 *   cardTextColor="text-white"
 *   cardAccentColor="text-goos-orange-500"
 *   tooltipBgColor="bg-goos-blue-900"
 *   tooltipTextColor="text-white"
 *   arrowColor="#F0F0F0"
 * />
 * ```
 */

import { useTranslation } from 'react-i18next'
import NetworkCard from './NetworkCard'
import CarouselArrow from './CarouselArrow'

interface NetworkRatings {
  implementationStatus: number
  realTime: number
  archivedHighQuality: number
  metadata: number
  bestPractices: number
}

type DeliveryAreaKey = 'climate' | 'operational' | 'oceanhealth'

interface NetworkCardData {
  iconSrc: string
  iconAlt: string
  titleKey: string
  networkUrl: string
  networkLinkKey: string
  ratings: NetworkRatings
  deliveryAreasLabelKey: string
  deliveryAreas: DeliveryAreaKey[]
}

interface NetworkCarouselProps {
  title?: string
  hasLine?: boolean
  lineColor?: string
  cards: NetworkCardData[]
  backgroundColor?: string
  titleColor?: string
  cardBackgroundColor?: string
  cardTextColor?: string
  cardAccentColor?: string
  tooltipBgColor?: string
  tooltipTextColor?: string
  arrowColor?: string
  className?: string
}

export default function NetworkCarousel({
  title,
  hasLine = true,
  lineColor = 'bg-goos-orange-500',
  cards,
  backgroundColor = 'bg-goos-blue-700',
  titleColor = 'text-white',
  cardBackgroundColor = 'bg-goos-blue-800',
  cardTextColor = 'text-white',
  cardAccentColor = 'text-goos-orange-500',
  tooltipBgColor = 'bg-goos-blue-900',
  tooltipTextColor = 'text-white',
  arrowColor = '#F0F0F0',
  className = '',
}: NetworkCarouselProps) {
  const { t } = useTranslation()

  return (
    <section className={`${backgroundColor} py-0 ${className}`}>
      <div className="mx-auto flex flex-col gap-5">
        {/* Top spacer */}
        <div className="h-8 w-5 opacity-75"></div>

        {/* Title Section */}
        {title && (
          <div className="px-12 md:px-16">
            <div className="flex justify-between items-start gap-8">
              <div className="flex flex-col gap-6">
                {hasLine && <div className={`${lineColor} h-2 w-32`}></div>}
                <h3 className={`text-4xl font-extrabold ${titleColor} leading-10`}>
                  {t(title)}
                </h3>
              </div>
              <div className="flex gap-4 mt-8">
                <CarouselArrow direction="left" color={arrowColor} />
                <CarouselArrow direction="right" color={arrowColor} />
              </div>
            </div>
          </div>
        )}

        <div className="h-8 w-5 opacity-75"></div>
      </div>

      {/* Horizontal Scroll Container */}
      <div className="overflow-x-auto pb-4 px-12 md:px-16">
        <div className="flex gap-8 min-w-max items-stretch">
          {cards.map((card, index) => (
            <NetworkCard
              key={index}
              {...card}
              backgroundColor={cardBackgroundColor}
              textColor={cardTextColor}
              accentColor={cardAccentColor}
              tooltipBgColor={tooltipBgColor}
              tooltipTextColor={tooltipTextColor}
            />
          ))}
        </div>
      </div>

      {/* Bottom spacer */}
      <div className="h-8 w-5 opacity-75"></div>
    </section>
  )
}
