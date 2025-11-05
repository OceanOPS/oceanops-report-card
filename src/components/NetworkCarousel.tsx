/**
 * NetworkCarousel Component
 *
 * A horizontal scrolling carousel that displays NetworkCard components.
 * Features optional title with decorative line and customizable colors.
 * Uses Embla Carousel for smooth scrolling, drag support, and arrow navigation.
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
import { useCallback, useEffect, useState, useRef } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import NetworkCard from './NetworkCard'
import CarouselArrow from './CarouselArrow'

gsap.registerPlugin(ScrollTrigger)

interface NetworkRatings {
  implementationStatus: number | string
  realTime: number | string
  archivedHighQuality: number | string
  metadata: number | string
  bestPractices: number | string
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
      '(min-width: 768px)': { slidesToScroll: 2 },
      '(min-width: 1024px)': { slidesToScroll: 3 },
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

  // Scroll to specific snap point
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
      const cardElements = carouselRef.current?.querySelectorAll('.network-card-slide')
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
    <section className={`${backgroundColor} py-0 ${className}`}>
      <div className="mx-auto flex flex-col gap-5">
        {/* Top spacer */}
        <div className="h-8 w-5 opacity-75"></div>

        {/* Title Section */}
        {title && (
          <div className="px-12 md:px-16">
            <div className="flex flex-col gap-6">
              {hasLine && <div className={`${lineColor} h-2 w-32`}></div>}
              <h3 className={`text-4xl font-extrabold ${titleColor} leading-10`}>
                {t(title)}
              </h3>
            </div>
          </div>
        )}

        <div className="h-8 w-5 opacity-75"></div>
      </div>

      {/* Embla Carousel Container */}
      <div className="overflow-hidden px-12 md:px-16 pb-4" ref={emblaRef}>
        <div ref={carouselRef} className="flex cursor-grab active:cursor-grabbing items-stretch">
          {cards.map((card, index) => (
            <div
              key={index}
              className="network-card-slide flex-[0_0_100%] min-w-0 mr-10 flex sm:flex-[0_0_100%] md:flex-[0_0_calc(50%-20px)] lg:flex-[0_0_calc(33.333%-27px)]"
            >
              <NetworkCard
                {...card}
                backgroundColor={cardBackgroundColor}
                textColor={cardTextColor}
                accentColor={cardAccentColor}
                tooltipBgColor={tooltipBgColor}
                tooltipTextColor={tooltipTextColor}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Controls: Dots (left) + Arrows (right) */}
      <div className="flex justify-between items-center px-12 md:px-16 py-4">
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

      {/* Bottom spacer */}
      <div className="h-8 w-5 opacity-75"></div>
    </section>
  )
}
