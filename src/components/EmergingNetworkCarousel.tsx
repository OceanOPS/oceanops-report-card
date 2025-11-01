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
import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import EmergingNetworkCard from './EmergingNetworkCard'
import CarouselArrow from './CarouselArrow'

type DeliveryAreaKey = 'climate' | 'operational' | 'oceanhealth'

interface EmergingNetworkCardData {
  // Media/Image
  imageSrc: string
  imageAlt: string
  // Common props
  iconSrc: string
  iconAlt: string
  titleKey: string
  paragraph1Key: string
  paragraph2Key: string
  deliveryAreasLabelKey: string
  deliveryAreas: DeliveryAreaKey[]
  // Optional external link
  externalLinkUrl?: string
  externalLinkTextKey?: string
  // Optional video button (YouTube)
  youtubeVideoId?: string
  videoButtonTextKey?: string
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
  arrowColor = '#F0F0F0',
  className = '',
}: EmergingNetworkCarouselProps) {
  const { t } = useTranslation()
  const [selectedIndex, setSelectedIndex] = useState(0)

  // Embla Carousel setup
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    loop: true, // Infinite loop
    slidesToScroll: 1, // Scroll one card at a time
  })

  // Update selected index on slide change
  useEffect(() => {
    if (!emblaApi) return

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap())
    }

    emblaApi.on('select', onSelect)
    onSelect() // Set initial value

    return () => {
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi])

  // Arrow navigation handlers
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  // Scroll to specific index
  const scrollTo = useCallback((index: number) => {
    if (emblaApi) emblaApi.scrollTo(index)
  }, [emblaApi])

  return (
    <section className={`${backgroundColor} py-12 ${className}`}>
      {/* Header Section */}
      <div className="px-12 md:px-16 mx-auto flex flex-col gap-5">
        <div className="h-8 w-5 opacity-75"></div>

        {/* Title Section */}
        {title && (
          <div className="flex flex-col gap-6">
            {hasLine && <div className={`${lineColor} h-2 w-32`}></div>}
            <h3 className={`text-4xl font-extrabold ${titleColor} leading-10`}>
              {t(title)}
            </h3>
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
              />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Controls: Dots (left) + Arrows (right) */}
      <div className="flex justify-between items-center px-12 md:px-16 py-4">
        {/* Pagination Dots - Left aligned */}
        <div className="flex gap-2">
          {cards.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === selectedIndex
                  ? 'bg-white w-8'
                  : 'bg-white opacity-30 hover:opacity-50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Navigation Arrows - Right aligned */}
        <div className="flex gap-4">
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
    </section>
  )
}
