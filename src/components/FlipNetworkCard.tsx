import { useState, type KeyboardEvent, type MouseEvent, type WheelEvent } from 'react'
import { useTranslation } from 'react-i18next'
import NetworkCard from './NetworkCard'
import NetworkDetailsPanel from './NetworkDetailsPanel'
import { asset } from '../utils/assets'
import type { InSituNetwork } from '../types/inSituNetworks'
import { hasEmergingNetworkMedia } from '../data/emergingNetworkMedia'

/** Stacked cards — common “flip card” affordance */
export function FlipCardsIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
      aria-hidden
    >
      <rect
        x="2"
        y="4"
        width="11"
        height="11"
        rx="1"
        stroke="currentColor"
        strokeWidth="1.25"
        opacity="0.45"
      />
      <rect
        x="5"
        y="2"
        width="11"
        height="11"
        rx="1"
        stroke="currentColor"
        strokeWidth="1.25"
        fill="none"
      />
    </svg>
  )
}

interface FlipNetworkCardProps {
  network: InSituNetwork
  backgroundColor?: string
  textColor?: string
  accentColor?: string
  tooltipBgColor?: string
  tooltipTextColor?: string
  className?: string
  onOpenEmergingMedia?: (networkId: string) => void
}

export default function FlipNetworkCard({
  network,
  backgroundColor = 'bg-goos-blue-800',
  textColor = 'text-white',
  accentColor = 'text-goos-orange-500',
  tooltipBgColor = 'bg-goos-blue-900',
  tooltipTextColor = 'text-goos-white',
  className = '',
  onOpenEmergingMedia,
}: FlipNetworkCardProps) {
  const { t } = useTranslation()
  const [isFlipped, setIsFlipped] = useState(false)

  const toggleFlip = () => setIsFlipped((prev) => !prev)

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      toggleFlip()
    }
  }

  const stopPropagation = (event: MouseEvent<HTMLAnchorElement>) => {
    event.stopPropagation()
  }

  const handleBackWheel = (event: WheelEvent<HTMLDivElement>) => {
    const back = event.currentTarget
    const canScrollVertically = back.scrollHeight > back.clientHeight + 1
    if (!canScrollVertically) return

    const scrollingUp = event.deltaY < 0 && back.scrollTop <= 0
    const scrollingDown =
      event.deltaY > 0 &&
      back.scrollTop + back.clientHeight >= back.scrollHeight - 1

    if (scrollingUp || scrollingDown) {
      event.preventDefault()
      window.scrollBy({ top: event.deltaY, behavior: 'auto' })
    }
  }

  return (
    <div className={`w-full flex flex-col ${className}`}>
      <p
        className={`mb-2 px-1 font-bold uppercase tracking-[0.14em] ${
          network.maturity === 'emerging'
            ? 'text-goos-cyan-300 text-sm sm:text-base'
            : 'text-goos-blue-500 text-sm'
        }`}
      >
        {t(
          network.maturity === 'emerging'
            ? 'networks.comparison.emergingNetworkLabel'
            : 'networks.comparison.matureNetworkLabel',
        )}
      </p>
      <div
        role="button"
        tabIndex={0}
        onClick={toggleFlip}
        onKeyDown={handleKeyDown}
        className="w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-goos-orange-500 rounded-sm cursor-pointer active:scale-[0.995] transition-transform"
        aria-label={
          isFlipped
            ? t('networks.comparison.flipBack')
            : t('networks.comparison.flipToDetails')
        }
      >
        <div className="relative w-full [perspective:1000px]">
          <div
            className={`relative w-full transition-transform duration-500 [transform-style:preserve-3d] ${
              isFlipped ? '[transform:rotateY(180deg)]' : ''
            }`}
          >
            {/* Front — in flow so card height matches content (no fixed min-height) */}
            <div
              className={`relative [backface-visibility:hidden] ${
                isFlipped ? 'pointer-events-none' : 'pointer-events-auto'
              }`}
            >
              <NetworkCard
                iconSrc={asset(network.iconPath)}
                iconAlt={network.iconAlt}
                titleKey={network.titleKey}
                networkUrl={network.networkUrl}
                networkLinkKey="networks.viewNetwork"
                ratings={network.ratings}
                deliveryAreasLabelKey="networks.deliveryAreasLabel"
                deliveryAreas={network.deliveryAreas}
                essentialVariables={network.essentialVariables}
                showEssentialVariables
                backgroundColor={backgroundColor}
                textColor={textColor}
                accentColor={accentColor}
                tooltipBgColor={tooltipBgColor}
                tooltipTextColor={tooltipTextColor}
                onNetworkLinkClick={stopPropagation}
              />
            </div>

            {/* Back — fills front height; scroll if details are longer */}
            <div
              className={`absolute inset-0 overflow-y-auto overscroll-y-auto [backface-visibility:hidden] [transform:rotateY(180deg)] ${backgroundColor} p-6 flex flex-col gap-5 ${
                isFlipped ? 'pointer-events-auto' : 'pointer-events-none'
              }`}
              onWheel={handleBackWheel}
            >
              <div className="flex items-start gap-4 shrink-0">
                <img
                  src={asset(network.iconPath)}
                  alt={t(network.iconAlt)}
                  className="w-14 h-14 object-contain shrink-0"
                />
                <div>
                  <h4 className={`${textColor} text-lg font-semibold`}>{t(network.titleKey)}</h4>
                </div>
              </div>

              <div className="h-[1px] bg-white opacity-20 shrink-0" />

              <NetworkDetailsPanel
                network={network}
                textColor={textColor}
                accentColor={accentColor}
              />

              {network.maturity === 'emerging' &&
                hasEmergingNetworkMedia(network.id) &&
                onOpenEmergingMedia && (
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation()
                      onOpenEmergingMedia(network.id)
                    }}
                    className="shrink-0 inline-flex items-center justify-center px-4 py-2 text-sm font-medium bg-goos-orange-500 text-white hover:bg-goos-orange-600 transition-colors mt-auto"
                  >
                    {t('emerging.viewMore')}
                  </button>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
