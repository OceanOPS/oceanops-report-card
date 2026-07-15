import { useCallback, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import useEmblaCarousel from 'embla-carousel-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CarouselArrow from './CarouselArrow'
import FlipNetworkCard from './FlipNetworkCard'
import NetworkComparisonMatrix from './NetworkComparisonMatrix'
import type { MatureNetwork } from '../types/matureNetworks'

gsap.registerPlugin(ScrollTrigger)

interface MatureNetworksSectionProps {
  networks: MatureNetwork[]
  backgroundColor?: string
  titleColor?: string
  cardBackgroundColor?: string
  cardTextColor?: string
  cardAccentColor?: string
  tooltipBgColor?: string
  tooltipTextColor?: string
  arrowColor?: string
  lineColor?: string
}

export default function MatureNetworksSection({
  networks,
  backgroundColor = 'bg-goos-blue-900',
  titleColor = 'text-white',
  cardBackgroundColor = 'bg-goos-blue-800',
  cardTextColor = 'text-white',
  cardAccentColor = 'text-goos-orange-500',
  tooltipBgColor = 'text-goos-white',
  tooltipTextColor = 'bg-goos-blue-900',
  arrowColor = '#F0F0F0',
  lineColor = 'bg-goos-orange-500',
}: MatureNetworksSectionProps) {
  const { t } = useTranslation()
  const carouselRef = useRef<HTMLDivElement>(null)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    loop: false,
    slidesToScroll: 1,
  })

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

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext()
  }, [emblaApi])

  const scrollTo = useCallback(
    (index: number) => {
      emblaApi?.scrollTo(index)
    },
    [emblaApi],
  )

  useEffect(() => {
    if (!carouselRef.current) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      const cardElements = carouselRef.current?.querySelectorAll('.network-card-slide')
      if (!cardElements || cardElements.length === 0) return

      gsap.fromTo(
        Array.from(cardElements),
        { opacity: 0, x: -100 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: carouselRef.current,
            start: 'top 80%',
            once: true,
          },
        },
      )
    }, carouselRef)

    return () => ctx.revert()
  }, [networks.length])

  return (
    <div id="networks-section">
      {/* Desktop: comparison matrix */}
      <div className="hidden md:block">
        <NetworkComparisonMatrix networks={networks} />
      </div>

      {/* Mobile: flip cards carousel */}
      <section className={`md:hidden ${backgroundColor} py-0`}>
        <div className="mx-auto flex flex-col gap-5">
          <div className="h-4 sm:h-6 w-5 opacity-75" />
          <div className="px-4 sm:px-8">
            <div className="flex flex-col gap-4 sm:gap-5">
              <div className={`${lineColor} h-2 w-20 sm:w-24`} />
              <h3
                className={`text-2xl sm:text-3xl font-extrabold ${titleColor} leading-tight`}
                dangerouslySetInnerHTML={{ __html: t('networks.title') }}
              />
              <p className={`${titleColor} opacity-80 text-sm`}>
                {t('networks.comparison.mobileHint')}
              </p>
            </div>
          </div>
          <div className="h-4 sm:h-6 w-5 opacity-75" />
        </div>

        <div className="overflow-hidden px-4 sm:px-8 pb-3" ref={emblaRef}>
          <div ref={carouselRef} className="flex gap-6 cursor-grab active:cursor-grabbing items-stretch">
            {networks.map((network) => (
              <div
                key={network.id}
                className="network-card-slide flex-[0_0_100%] min-w-0 flex"
              >
                <FlipNetworkCard
                  network={network}
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

        <div className="flex justify-between items-center px-4 sm:px-8 py-3">
          <div className="flex gap-2">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                type="button"
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
          <div className="flex gap-4">
            <button
              type="button"
              onClick={scrollPrev}
              disabled={!canScrollPrev}
              className={`transition-opacity ${!canScrollPrev ? 'opacity-30 cursor-not-allowed' : 'opacity-100'}`}
            >
              <CarouselArrow direction="left" color={arrowColor} onClick={() => {}} />
            </button>
            <button
              type="button"
              onClick={scrollNext}
              disabled={!canScrollNext}
              className={`transition-opacity ${!canScrollNext ? 'opacity-30 cursor-not-allowed' : 'opacity-100'}`}
            >
              <CarouselArrow direction="right" color={arrowColor} onClick={() => {}} />
            </button>
          </div>
        </div>

        <div className="h-4 sm:h-6 w-5 opacity-75" />
      </section>
    </div>
  )
}
