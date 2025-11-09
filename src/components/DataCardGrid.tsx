import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import DataCard from './DataCard'

gsap.registerPlugin(ScrollTrigger)

/**
 * DataCardGrid Component
 *
 * Container for displaying multiple DataCards in a 2-column responsive grid.
 * Typically used within ContentModule's right column to show up to 12 data cards.
 *
 * @param cards - Array of card data objects (up to 12)
 * @param backgroundColor - Tailwind background color class for overall container (default: 'bg-transparent')
 * @param className - Additional CSS classes
 *
 * @example
 * ```tsx
 * <DataCardGrid
 *   cards={[
 *     {
 *       number: "108",
 *       tagKey: "dataCards.programmes.tag",
 *       iconSrc: "/icons/biology_and_ecosystems/Seabirds.png",
 *       iconAlt: "Marine birds icon",
 *       titleKey: "dataCards.programmes.title"
 *     },
 *     {
 *       number: "3,800",
 *       tagKey: "dataCards.platforms.tag",
 *       iconSrc: "/icons/network/argo.svg",
 *       iconAlt: "Argo floats icon",
 *       titleKey: "dataCards.platforms.title"
 *     },
 *     // ... up to 12 cards
 *   ]}
 * />
 * ```
 */

interface DataCardData {
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
}

interface DataCardGridProps {
  cards: DataCardData[]
  backgroundColor?: string
  className?: string
}

export default function DataCardGrid({
  cards,
  backgroundColor = 'bg-transparent',
  className = '',
}: DataCardGridProps) {
  const gridRef = useRef<HTMLDivElement>(null)

  // Limit to 12 cards maximum
  const limitedCards = cards.slice(0, 12)

  // Parallax effect on cards
  useEffect(() => {
    if (!gridRef.current) return

    // Respect user's motion preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      // No parallax for users who prefer reduced motion
      return
    }

    const ctx = gsap.context(() => {
      const cards = gridRef.current?.querySelectorAll('.data-card')
      if (!cards || cards.length === 0) return

      cards.forEach((card, index) => {
        // Left column (even): slower movement (background layer)
        // Right column (odd): faster movement (foreground layer)
        // Both move in same direction for consistent vertical spacing
        const speed = index % 2 === 0 ? 20 : 80

        // Ensure cards start at y: 0 to prevent layout shift
        gsap.set(card, { y: 0, willChange: 'transform' })

        gsap.fromTo(card,
          { y: 0 },
          {
            y: speed,
            ease: 'none',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1, // Smooth scrubbing effect (1 second lag)
            },
          }
        )
      })
    }, gridRef)

    return () => ctx.revert()
  }, [limitedCards.length])

  return (
    <div className={`${backgroundColor} ${className}`}>
      {/* 2-column grid on all screen sizes with responsive gap */}
      <div ref={gridRef} className="grid grid-cols-2 gap-4 sm:gap-6 md:gap-10">
        {limitedCards.map((card, index) => (
          <DataCard
            key={index}
            number={card.number}
            tagKey={card.tagKey}
            iconSrc={card.iconSrc}
            iconAlt={card.iconAlt}
            titleKey={card.titleKey}
            backgroundColor={card.backgroundColor}
            textColor={card.textColor}
            numberColor={card.numberColor}
            tagColor={card.tagColor}
            iconBgColor={card.iconBgColor}
            className="data-card"
          />
        ))}
      </div>
    </div>
  )
}

// Export the interface for use in other components
export type { DataCardData }
