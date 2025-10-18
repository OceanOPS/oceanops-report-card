import DataCard from './DataCard'

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
  // Limit to 12 cards maximum
  const limitedCards = cards.slice(0, 12)

  return (
    <div className={`${backgroundColor} ${className}`}>
      {/* 2-column grid on all screen sizes */}
      <div className="grid grid-cols-2 gap-4">
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
          />
        ))}
      </div>
    </div>
  )
}

// Export the interface for use in other components
export type { DataCardData }
