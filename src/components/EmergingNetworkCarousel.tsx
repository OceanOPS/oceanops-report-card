/**
 * EmergingNetworkCarousel Component
 *
 * A horizontal scrolling carousel that displays EmergingNetworkCard components.
 * Features optional title with decorative line, navigation arrows, and customizable colors.
 * Uses Embla Carousel for smooth scrolling, drag support, and infinite loop.
 *
 * @param title - Optional section title (translation key)
 * @param hasLine - Show decorative line above title (default: true)
 * @param lineColor - Tailwind background color for decorative line (default: 'bg-goos-orange-500')
 * @param cards - Array of emerging network card data (required)
 * @param backgroundColor - Tailwind background color for section (default: 'bg-goos-deep-blue')
 * @param titleColor - Tailwind text color for title (default: 'text-white')
 * @param cardBackgroundColor - Tailwind background color for cards (default: 'bg-goos-blue-800')
 * @param cardTextColor - Tailwind text color for card text (default: 'text-white')
 * @param buttonBgColor - Tailwind background color for buttons (default: 'bg-goos-white')
 * @param buttonTextColor - Tailwind text color for buttons (default: 'text-goos-deep-blue')
 * @param buttonIconBgColor - Tailwind background color for button icons (default: 'bg-goos-deep-blue')
 * @param buttonIconColor - Tailwind text color for button icons (default: 'text-goos-white')
 * @param tooltipBgColor - Tailwind background color for tooltips (default: 'bg-goos-blue-900')
 * @param tooltipTextColor - Tailwind text color for tooltips (default: 'text-white')
 * @param arrowColor - Color for navigation arrows in hex format (default: '#F0F0F0')
 * @param className - Optional additional Tailwind classes
 *
 * @example
 * ```tsx
 * <EmergingNetworkCarousel
 *   title="emerging.title"
 *   hasLine={true}
 *   lineColor="bg-goos-orange-500"
 *   cards={[
 *     {
 *       imageSrc: '/images/smart-cables.jpg',
 *       imageAlt: 'emerging.smartCables.imageAlt',
 *       iconSrc: '/icons/smart-cables.png',
 *       iconAlt: 'emerging.smartCables.iconAlt',
 *       titleKey: 'emerging.smartCables.title',
 *       descriptionKey: 'emerging.smartCables.description',
 *       viewMoreUrl: 'https://example.com',
 *       viewMoreTextKey: 'emerging.viewMore',
 *       videoUrl: 'https://example.com/video',
 *       videoTextKey: 'emerging.watchVideo',
 *       deliveryAreasLabelKey: 'networks.deliveryAreasLabel',
 *       deliveryAreas: ['climate', 'operational']
 *     },
 *     // ... more cards
 *   ]}
 *   backgroundColor="bg-goos-deep-blue"
 *   arrowColor="#F0F0F0"
 * />
 * ```
 */

import { useTranslation } from 'react-i18next'
import { ReactNode, useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import EmergingNetworkCard from './EmergingNetworkCard'
import CarouselArrow from './CarouselArrow'
import { GalleryImage } from './ImageGallery'

type DeliveryAreaKey = 'climate' | 'operational' | 'oceanhealth'

interface EmergingNetworkCardData {
  // Media configuration
  mediaType: 'image' | 'gallery' | 'video'
  // For single image
  imageSrc?: string
  imageAlt?: string
  // For gallery
  images?: GalleryImage[]
  // For video
  videoType?: 'youtube' | 'local'
  videoId?: string
  previewImage?: string
  // Common props
  iconSrc: string
  iconAlt: string
  titleKey: string
  descriptionKey: string
  modalTitle: string
  modalContent: ReactNode
  viewMoreTextKey: string
  deliveryAreasLabelKey: string
  deliveryAreas: DeliveryAreaKey[]
}

interface EmergingNetworkCarouselProps {
  title?: string
  hasLine?: boolean
  lineColor?: string
  cards: EmergingNetworkCardData[]
  backgroundColor?: string
  titleColor?: string
  cardBackgroundColor?: string
  cardTextColor?: string
  buttonBgColor?: string
  buttonTextColor?: string
  buttonIconBgColor?: string
  buttonIconColor?: string
  tooltipBgColor?: string
  tooltipTextColor?: string
  overlayIconColor?: string
  arrowColor?: string
  className?: string
}

export default function EmergingNetworkCarousel({
  title,
  hasLine = true,
  lineColor = 'bg-goos-orange-500',
  cards,
  backgroundColor = 'bg-goos-deep-blue',
  titleColor = 'text-white',
  cardBackgroundColor = 'bg-goos-blue-800',
  cardTextColor = 'text-white',
  buttonBgColor = 'bg-goos-white',
  buttonTextColor = 'text-goos-deep-blue',
  buttonIconBgColor = 'bg-goos-deep-blue',
  buttonIconColor = 'text-goos-white',
  tooltipBgColor = 'bg-goos-blue-900',
  tooltipTextColor = 'text-white',
  overlayIconColor = 'bg-goos-orange-500',
  arrowColor = '#F0F0F0',
  className = '',
}: EmergingNetworkCarouselProps) {
  const { t } = useTranslation()

  // Embla Carousel setup
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    loop: true, // Infinite loop
    slidesToScroll: 1, // Scroll one card at a time
  })

  // Arrow navigation handlers
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  return (
    <section className={`${backgroundColor} py-12 ${className}`}>
      {/* Header Section */}
      <div className="px-12 md:px-16 mx-auto flex flex-col gap-5">
        <div className="h-8 w-5 opacity-75"></div>

        {/* Title Section */}
        {title && (
          <div>
            <div className="flex justify-between items-start gap-8">
              <div className="flex flex-col gap-6">
                {hasLine && <div className={`${lineColor} h-2 w-32`}></div>}
                <h3 className={`text-4xl font-extrabold ${titleColor} leading-10`}>
                  {t(title)}
                </h3>
              </div>
              <div className="flex gap-4 mt-8">
                <CarouselArrow
                  direction="left"
                  color={arrowColor}
                  onClick={scrollPrev}
                />
                <CarouselArrow
                  direction="right"
                  color={arrowColor}
                  onClick={scrollNext}
                />
              </div>
            </div>
          </div>
        )}

        <div className="h-8 w-5 opacity-75"></div>
      </div>

      {/* Embla Carousel Container */}
      <div className="overflow-hidden px-12 md:px-16 pb-4" ref={emblaRef}>
        <div className="flex cursor-grab active:cursor-grabbing">
          {cards.map((card, index) => (
            <div
              key={index}
              className="flex-[0_0_auto] min-w-0 mr-12"
              style={{ flexBasis: 'calc(100vw - 200px)' }}
            >
              <EmergingNetworkCard
                {...card}
                backgroundColor={cardBackgroundColor}
                textColor={cardTextColor}
                buttonBgColor={buttonBgColor}
                buttonTextColor={buttonTextColor}
                buttonIconBgColor={buttonIconBgColor}
                buttonIconColor={buttonIconColor}
                tooltipBgColor={tooltipBgColor}
                tooltipTextColor={tooltipTextColor}
                overlayIconColor={overlayIconColor}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
