import { useTranslation } from 'react-i18next'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * DataCard Component
 *
 * Individual data card displaying a number, tag, icon, and title.
 * Used within ContentModule to show statistical or categorical data.
 *
 * @param number - Large display number (e.g., "108", "3,800")
 * @param tagKey - Translation key for the tag label (top right)
 * @param iconSrc - Path to the icon image
 * @param iconAlt - Alt text for the icon
 * @param titleKey - Translation key for the card title (bottom)
 * @param backgroundColor - Tailwind background color class (default: 'bg-goos-blue-800')
 * @param textColor - Tailwind text color class (default: 'text-goos-white')
 * @param numberColor - Tailwind color class for the number (default: 'text-goos-white')
 * @param tagColor - Tailwind color class for the tag (default: 'text-goos-white')
 * @param iconBgColor - Tailwind background color for icon circle (default: 'bg-goos-green-700')
 * @param className - Additional CSS classes
 *
 * @example
 * ```tsx
 * <DataCard
 *   number="108"
 *   tagKey="dataCards.programmes.tag"
 *   iconSrc="/icons/biology_and_ecosystems/Seabirds.png"
 *   iconAlt="Marine birds icon"
 *   titleKey="dataCards.programmes.title"
 * />
 * ```
 */

interface DataCardProps {
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
  className?: string
}

export default function DataCard({
  number,
  tagKey,
  iconSrc,
  iconAlt,
  titleKey,
  backgroundColor = 'bg-goos-blue-800',
  textColor = 'text-goos-white',
  numberColor = 'text-goos-white',
  tagColor = 'text-goos-white',
  iconBgColor = 'bg-goos-green-700',
  className = '',
}: DataCardProps) {
  const { t } = useTranslation()
  const cardRef = useRef<HTMLDivElement>(null)
  const numberRef = useRef<HTMLHeadingElement>(null)

  // Helper function to extract numeric value from string (e.g., "129" from "129" or "45" from "3,800")
  const extractNumber = (text: string): number => {
    const match = text.match(/[\d,]+/)
    return match ? parseFloat(match[0].replace(/,/g, '')) : 0
  }

  // Helper function to format number with original formatting
  const formatNumber = (original: string, value: number): string => {
    // Check if original has comma formatting
    const hasComma = original.includes(',')
    const formatted = hasComma ? Math.round(value).toLocaleString() : Math.round(value).toString()
    return formatted
  }

  useEffect(() => {
    if (!cardRef.current || !numberRef.current) return

    const ctx = gsap.context(() => {
      const targetValue = extractNumber(number)
      const tempObj = { value: 0 }

      gsap.to(tempObj, {
        value: targetValue,
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 80%',
          once: true,
        },
        onUpdate: () => {
          if (numberRef.current) {
            numberRef.current.textContent = formatNumber(number, tempObj.value)
          }
        },
      })
    }, cardRef)

    return () => ctx.revert()
  }, [number])

  return (
    <div
      ref={cardRef}
      className={`${backgroundColor} w-full aspect-[15/16] p-4 flex flex-col justify-between ${className}`}
    >
      {/* Header Section - Number and Tag */}
      <div className="flex items-start justify-between">
        <h1 ref={numberRef} className={`text-6xl font-light leading-[72px] ${numberColor}`}>
          {number}
        </h1>
        <span className={`text-md ${tagColor} mt-1`}>
          {t(tagKey)}
        </span>
      </div>

      {/* Footer Section - Icon and Title */}
      <div className="flex flex-col gap-2">
        {/* Icon */}
        <div className={`w-14 h-14 ${iconBgColor} rounded-full flex items-center justify-center flex-shrink-0 mb-2`}>
          <img
            src={iconSrc}
            alt={iconAlt}
            className="object-contain"
          />
        </div>

        {/* Title */}
        <p className={`text-md font-roboto-condensed font-semibold ${textColor} uppercase leading-5 tracking-wide min-h-[40px]`}>
          {t(titleKey)}
        </p>
      </div>
    </div>
  )
}
