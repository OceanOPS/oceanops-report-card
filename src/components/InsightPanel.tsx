/**
 * InsightPanel Component
 *
 * A panel component that displays a large featured number with description and button,
 * alongside either a grid of statistics (2x2) or custom content (e.g., text paragraph).
 * Perfect for showcasing key metrics and insights.
 *
 * @param title - Optional panel title
 * @param hasLine - Show decorative line above title (default: true)
 * @param lineColor - Tailwind background color for decorative line (default: 'bg-goos-orange-500')
 * @param largeNumber - The main featured number/text (required)
 * @param largeNumberDescription - Description text below the large number (optional)
 * @param button - Optional button configuration (uses Button component)
 * @param stats - Array of stat objects (up to 4) for the 2x2 grid (optional)
 * @param rightContent - Custom content to display on right side instead of stats (optional)
 * @param backgroundColor - Tailwind background color (default: 'bg-goos-blue-700')
 * @param titleColor - Tailwind text color for title (default: 'text-white')
 * @param textColor - Tailwind text color for body text (default: 'text-white')
 * @param numberColor - Tailwind text color for numbers (default: 'text-white')
 * @param linkColor - Tailwind text color for links (default: 'text-white')
 * @param className - Optional additional Tailwind classes
 *
 * @example
 * // With stats grid
 * ```tsx
 * <InsightPanel
 *   title="Insight Panel Optional Heading"
 *   largeNumber="129"
 *   largeNumberDescription="Lorem ipsum dolor sit amet aliqua."
 *   button={{
 *     variant: 'link',
 *     label: 'VIEW FULL LIST',
 *     url: 'https://example.com',
 *     textColor: 'text-white',
 *     bgColor: 'bg-goos-blue-900'
 *   }}
 *   stats={[
 *     {
 *       number: '$45M',
 *       description: 'Lorem ipsum dolor sit amet...',
 *       linkText: 'External Link',
 *       linkUrl: 'https://example.com'
 *     },
 *     // ... up to 4 stats
 *   ]}
 *   backgroundColor="bg-goos-blue-700"
 * />
 * ```
 *
 * @example
 * // With custom text content
 * ```tsx
 * <InsightPanel
 *   title="Insight Panel with Text"
 *   largeNumber="129"
 *   largeNumberDescription="Countries contributing to GOOS"
 *   rightContent={
 *     <p className="text-xl">
 *       This is custom text content that appears on the right side
 *       instead of the stats grid.
 *     </p>
 *   }
 * />
 * ```
 */

import { ReactNode, useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Button from './Button'
import ContentModal from './ContentModal'
import Tooltip from './Tooltip'

gsap.registerPlugin(ScrollTrigger)

// Button configuration types (from Button component)
type ButtonConfig =
  | {
      variant: 'link'
      label: string
      url: string
      textColor?: string
      bgColor?: string
      iconColor?: string
      iconBgColor?: string
    }
  | {
      variant: 'video'
      label: string
      videoType: 'youtube' | 'local'
      videoId: string
      previewImage: string
      previewAlt?: string
      textColor?: string
      bgColor?: string
      iconColor?: string
      iconBgColor?: string
    }
  | {
      variant: 'modal'
      label: string
      modalTitle?: string
      modalContent: ReactNode
      modalMaxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
      textColor?: string
      bgColor?: string
      iconColor?: string
      iconBgColor?: string
    }
  | {
      variant: 'action'
      label: string
      onClick: () => void
      textColor?: string
      bgColor?: string
      iconColor?: string
      iconBgColor?: string
    }

interface StatItem {
  number: string
  description: string
  /** Secondary line under description (e.g. averaging period). */
  descriptionDetail?: string
  numberClassName?: string
  evolution?: string
  evolutionDirection?: 'up' | 'down' | 'neutral'
  evolutionDetail?: ReactNode
  linkText?: string
  linkUrl?: string
  infoModal?: {
    title: string
    content: ReactNode
  }
}

function StatEvolutionBadge({
  evolution,
  direction = 'up',
}: {
  evolution: string
  direction?: 'up' | 'down' | 'neutral'
}) {
  const arrow = direction === 'up' ? '↑' : direction === 'down' ? '↓' : null
  const baseClass =
    'inline-flex shrink-0 items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] sm:text-xs font-semibold tabular-nums whitespace-nowrap'
  const toneClass =
    direction === 'down'
      ? 'text-goos-blue-300 border-goos-blue-300/30 bg-goos-blue-300/10'
      : direction === 'neutral'
        ? 'text-white/70 border-white/10 bg-white/[0.06]'
        : 'text-goos-cyan-400 border-goos-cyan-400/35 bg-goos-cyan-500/10'

  return (
    <span className={`${baseClass} ${toneClass}`}>
      {arrow && <span aria-hidden="true">{arrow}</span>}
      <span>{evolution}</span>
    </span>
  )
}

function StatBlock({
  stat,
  numberRef,
  numberColor,
  textColor,
  linkColor,
  onInfoClick,
}: {
  stat: StatItem
  numberRef: (el: HTMLParagraphElement | null) => void
  numberColor: string
  textColor: string
  linkColor: string
  onInfoClick?: () => void
}) {
  const block = (
    <div
      className={`flex h-full flex-col gap-1.5 ${stat.evolutionDetail ? 'cursor-help' : ''}`}
    >
      <div className="flex items-center gap-1.5">
        <p
          className={`text-[11px] sm:text-xs font-bold uppercase tracking-[0.14em] opacity-60 ${textColor}`}
        >
          {stat.description}
        </p>
        {stat.infoModal && onInfoClick && (
          <button
            onClick={onInfoClick}
            className={`${textColor} shrink-0 opacity-50 transition-opacity hover:opacity-100`}
            aria-label="More information"
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
          </button>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <p
          ref={numberRef}
          className={`font-light tabular-nums leading-none tracking-tight ${stat.numberClassName ?? 'text-5xl sm:text-6xl'} ${numberColor}`}
        >
          {stat.number}
        </p>
        {stat.evolution && (
          <StatEvolutionBadge
            evolution={stat.evolution}
            direction={stat.evolutionDirection}
          />
        )}
      </div>

      {stat.descriptionDetail && (
        <p className={`text-xs sm:text-sm leading-snug opacity-55 ${textColor}`}>
          {stat.descriptionDetail}
        </p>
      )}

      {stat.linkText && stat.linkUrl && (
        <a
          href={stat.linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`mt-1 text-sm ${linkColor} underline decoration-dotted underline-offset-2 flex items-center gap-1`}
        >
          {stat.linkText} <span className="text-xs">⧉</span>
        </a>
      )}
    </div>
  )

  if (stat.evolutionDetail) {
    return (
      <Tooltip
        contentNode={stat.evolutionDetail}
        maxWidthClass="max-w-[380px]"
        placement="left"
        className="block w-full h-full"
        backgroundColor="bg-goos-blue-900"
        textColor="text-goos-white"
      >
        {block}
      </Tooltip>
    )
  }

  return block
}

interface InsightPanelProps {
  title?: string
  hasLine?: boolean
  lineColor?: string
  largeNumber?: string
  largeNumberDescription?: string
  button?: ButtonConfig
  stats?: StatItem[]
  rightContent?: ReactNode
  leftContent?: ReactNode
  backgroundColor?: string
  titleColor?: string
  textColor?: string
  numberColor?: string
  linkColor?: string
  className?: string
}

export default function InsightPanel({
  title,
  hasLine = true,
  lineColor = 'bg-goos-orange-500',
  largeNumber,
  largeNumberDescription,
  button,
  stats,
  rightContent,
  leftContent,
  backgroundColor = 'bg-goos-blue-700',
  titleColor = 'text-white',
  textColor = 'text-white',
  numberColor = 'text-white',
  linkColor = 'text-white',
  className = '',
}: InsightPanelProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const largeNumberRef = useRef<HTMLParagraphElement>(null)
  const statNumberRefs = useRef<(HTMLParagraphElement | null)[]>([])
  const [openModalIndex, setOpenModalIndex] = useState<number | null>(null)

  // Helper function to extract numeric value from string (e.g., "129" from "129" or "45" from "$45M")
  const extractNumber = (text: string): number => {
    const match = text.match(/[\d,]+/)
    return match ? parseFloat(match[0].replace(/,/g, '')) : 0
  }

  // Helper function to format number with original suffix (e.g., "M", "K", "$")
  const formatNumber = (original: string, value: number): string => {
    const hasPrefix = /^[^\d]/.test(original) // Check if starts with non-digit (e.g., "$")
    const hasSuffix = /[^\d,.]$/.test(original) // Check if ends with non-digit (e.g., "M", "K")
    const prefix = hasPrefix ? original[0] : ''
    const suffix = hasSuffix ? original.match(/[^\d,]+$/)?.[0] || '' : ''

    // Format with commas for thousands
    const formatted = Math.round(value).toLocaleString()
    return `${prefix}${formatted}${suffix}`
  }

  useEffect(() => {
    if (!sectionRef.current) return

    // Respect user's motion preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        // No animations - show final numbers immediately
        if (largeNumberRef.current && largeNumber) {
          const targetValue = extractNumber(largeNumber)
          largeNumberRef.current.textContent = formatNumber(largeNumber, targetValue)
        }

        stats?.forEach((stat, index) => {
          const ref = statNumberRefs.current[index]
          if (ref && stat.number) {
            const targetValue = extractNumber(stat.number)
            ref.textContent = formatNumber(stat.number, targetValue)
          }
        })
      } else {
        // Animate normally
        // Animate large number
        if (largeNumberRef.current && largeNumber) {
          const targetValue = extractNumber(largeNumber)
          const tempObj = { value: 0 }

          gsap.to(tempObj, {
            value: targetValue,
            duration: 2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              once: true,
            },
            onUpdate: () => {
              if (largeNumberRef.current) {
                largeNumberRef.current.textContent = formatNumber(largeNumber, tempObj.value)
              }
            },
          })
        }

        // Animate stat numbers
        stats?.forEach((stat, index) => {
          const ref = statNumberRefs.current[index]
          if (ref && stat.number) {
            const targetValue = extractNumber(stat.number)
            const tempObj = { value: 0 }

            gsap.to(tempObj, {
              value: targetValue,
              duration: 2,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: ref,
                start: 'top 80%',
                once: true,
              },
              onUpdate: () => {
                if (ref) {
                  ref.textContent = formatNumber(stat.number, tempObj.value)
                }
              },
            })
          }
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [largeNumber, stats])
  return (
    <section ref={sectionRef} className={`${backgroundColor} px-4 sm:px-8 md:px-12 lg:px-16 py-0 ${className}`}>
      <div className="mx-auto flex flex-col gap-5">
        {/* Top spacer */}
        <div className="h-4 sm:h-6 md:h-8 w-5 opacity-75"></div>

        {/* Content: left copy + stats */}
        <div className="flex flex-col lg:flex-row lg:items-end gap-8 md:gap-10 lg:gap-12">
          {/* Left: title, large number, or custom content */}
          <div className="lg:basis-1/2 flex flex-col gap-4 sm:gap-5">
            {title && (
              <div className="flex flex-col gap-4 sm:gap-5">
                {hasLine && <div className={`${lineColor} h-2 w-20 sm:w-24 md:w-32`}></div>}
                <h3
                  className={`text-2xl sm:text-3xl md:text-4xl font-extrabold ${titleColor} leading-tight`}
                  dangerouslySetInnerHTML={{ __html: title }}
                />
              </div>
            )}
            {leftContent ? (
              <div className={`${textColor}`}>
                {leftContent}
              </div>
            ) : (
              <>
                <div className={`flex flex-col gap-2 ${textColor}`}>
                  {largeNumber && (
                    <p ref={largeNumberRef} className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light leading-tight ${numberColor}`}>
                      {largeNumber}
                    </p>
                  )}
                  {largeNumberDescription && (
                    <p className="text-sm sm:text-base font-normal">{largeNumberDescription}</p>
                  )}
                </div>

                {button && (
                  <div className="self-start">
                    <Button {...button} />
                  </div>
                )}
              </>
            )}
          </div>

          {/* Right: stats or custom content — left-aligned, bottom-aligned with copy */}
          <div className="lg:basis-1/2 w-full">
            {rightContent ? (
              <div className={`${textColor}`}>
                {rightContent}
              </div>
            ) : stats ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 justify-items-start gap-x-10 gap-y-5 sm:gap-y-6 text-left">
                {stats.slice(0, 4).map((stat, index) => (
                  <StatBlock
                    key={index}
                    stat={stat}
                    numberRef={(el) => {
                      statNumberRefs.current[index] = el
                    }}
                    numberColor={numberColor}
                    textColor={textColor}
                    linkColor={linkColor}
                    onInfoClick={
                      stat.infoModal ? () => setOpenModalIndex(index) : undefined
                    }
                  />
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {/* Info Modals */}
      {stats?.map((stat, index) =>
        stat.infoModal ? (
          <ContentModal
            key={index}
            isOpen={openModalIndex === index}
            onClose={() => setOpenModalIndex(null)}
            title={stat.infoModal.title}
            maxWidth="lg"
            backgroundColor="bg-goos-blue-900"
          >
            {stat.infoModal.content}
          </ContentModal>
        ) : null
      )}
    </section>
  )
}
