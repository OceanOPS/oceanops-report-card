import { useState, type KeyboardEvent, type MouseEvent } from 'react'
import { useTranslation } from 'react-i18next'
import NetworkCard from './NetworkCard'
import NetworkDetailsPanel from './NetworkDetailsPanel'
import { asset } from '../utils/assets'
import type { InSituNetwork } from '../types/inSituNetworks'

/** Stacked cards — common “flip card” affordance */
function FlipCardsIcon({ className = '' }: { className?: string }) {
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
}

export default function FlipNetworkCard({
  network,
  backgroundColor = 'bg-goos-blue-800',
  textColor = 'text-white',
  accentColor = 'text-goos-orange-500',
  tooltipBgColor = 'bg-goos-blue-900',
  tooltipTextColor = 'text-goos-white',
  className = '',
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

  const caption = isFlipped
    ? t('networks.comparison.tapForRatings')
    : t('networks.comparison.tapForDetails')

  return (
    <div className={`w-full flex flex-col ${className}`}>
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
            <div className="relative [backface-visibility:hidden]">
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
              className={`absolute inset-0 overflow-y-auto overscroll-contain [backface-visibility:hidden] [transform:rotateY(180deg)] ${backgroundColor} p-6 flex flex-col gap-5`}
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
            </div>
          </div>
        </div>
      </div>

      <p
        className={`${accentColor} mt-3 shrink-0 flex items-center justify-center gap-2 text-sm font-medium px-1`}
      >
        <FlipCardsIcon className={accentColor} />
        <span>{caption}</span>
      </p>
    </div>
  )
}
