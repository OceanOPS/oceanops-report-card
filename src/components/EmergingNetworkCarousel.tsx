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
import { ReactNode, useCallback, useEffect, useState, useRef } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import EmergingNetworkCard from './EmergingNetworkCard'
import CarouselArrow from './CarouselArrow'
import { GalleryImage } from './ImageGallery'

gsap.registerPlugin(ScrollTrigger)

type DeliveryAreaKey = 'climate' | 'operational' | 'oceanhealth'

interface EmergingNetworkCardData {
  // Media configuration
  mediaType: 'image' | 'gallery' | 'video'
  // For single image
  imageSrc?: string
  imageAlt?: string
  // For gallery
  images?: GalleryImage[]
  modalTitle?: string
  modalContent?: ReactNode
  // For video
  videoType?: 'youtube' | 'local'
  videoId?: string
  previewImage?: string
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
  const carouselRef = useRef<HTMLDivElement>(null)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

  // Embla Carousel setup - Simple and standard
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    loop: false,
    slidesToScroll: 1,
    breakpoints: {
      '(min-width: 768px)': { slidesToScroll: 1 },
      '(min-width: 1024px)': { slidesToScroll: 1 },
    },
  })

  // Update selected index, scroll snaps, and arrow states
  useEffect(() => {
    if (!emblaApi) return

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap())
      setCanScrollPrev(emblaApi.canScrollPrev())
      setCanScrollNext(emblaApi.canScrollNext())
    }

    const onInit = () => {
      setScrollSnaps(emblaApi.scrollSnapList())
      setCanScrollPrev(emblaApi.canScrollPrev())
      setCanScrollNext(emblaApi.canScrollNext())
    }

    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onInit)

    onSelect()
    onInit()

    return () => {
      emblaApi.off('select', onSelect)
      emblaApi.off('reInit', onInit)
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

  // Animate cards cascading from left on scroll
  useEffect(() => {
    if (!carouselRef.current) return

    // Respect user's motion preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      // No animations for users who prefer reduced motion
      return
    }

    const ctx = gsap.context(() => {
      const cardElements = carouselRef.current?.querySelectorAll('.emerging-card-slide')
      if (!cardElements || cardElements.length === 0) return

      gsap.fromTo(
        Array.from(cardElements),
        {
          opacity: 0,
          x: -100,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.15, // 150ms between each card
          ease: 'power2.out',
          scrollTrigger: {
            trigger: carouselRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      )
    }, carouselRef)

    return () => ctx.revert()
  }, [cards.length])

  return (
    <section className={`${backgroundColor} py-6 sm:py-8 md:py-12 ${className}`}>
      {/* Header Section */}
      <div className="px-4 sm:px-8 md:px-12 lg:px-16 mx-auto flex flex-col gap-5">
        <div className="h-4 sm:h-6 md:h-8 w-5 opacity-75"></div>

        {/* Title Section */}
        {title && (
          <div className="flex flex-col gap-4 sm:gap-5 md:gap-6">
            {hasLine && <div className={`${lineColor} h-2 w-20 sm:w-24 md:w-32`}></div>}
            <h3 className={`text-2xl sm:text-3xl md:text-4xl font-extrabold ${titleColor} leading-tight`}>
              {t(title)}
            </h3>
          </div>
        )}

        <div className="h-4 sm:h-6 md:h-8 w-5 opacity-75"></div>
      </div>

      {/* Embla Carousel Container */}
      <div className="overflow-hidden px-4 sm:px-8 md:px-12 lg:px-16 pb-3 sm:pb-4" ref={emblaRef}>
        <div ref={carouselRef} className="flex cursor-grab active:cursor-grabbing items-stretch">
          {cards.map((card, index) => (
            <div
              key={index}
              className="emerging-card-slide flex-[0_0_100%] min-w-0 mr-12 flex"
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

      {/* Navigation Controls: Dots (left) + Arrows (right) */}
      <div className="flex justify-between items-center px-4 sm:px-8 md:px-12 lg:px-16 py-3 sm:py-4">
        {/* Pagination Dots - Left aligned - One dot per snap point */}
        <div className="flex gap-2">
          {scrollSnaps.map((_, index) => (
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
          <button
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            className={`transition-opacity ${!canScrollPrev ? 'opacity-30 cursor-not-allowed' : 'opacity-100'}`}
          >
            <CarouselArrow
              direction="left"
              color={arrowColor}
              onClick={() => {}}
            />
          </button>
          <button
            onClick={scrollNext}
            disabled={!canScrollNext}
            className={`transition-opacity ${!canScrollNext ? 'opacity-30 cursor-not-allowed' : 'opacity-100'}`}
          >
            <CarouselArrow
              direction="right"
              color={arrowColor}
              onClick={() => {}}
            />
          </button>
        </div>
      </div>
    </section>
  )
}
