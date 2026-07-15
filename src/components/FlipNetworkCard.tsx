import { useState, type KeyboardEvent, type MouseEvent } from 'react'
import { useTranslation } from 'react-i18next'
import NetworkCard from './NetworkCard'
import NetworkDetailsPanel from './NetworkDetailsPanel'
import { asset } from '../utils/assets'
import type { MatureNetwork } from '../types/matureNetworks'

interface FlipNetworkCardProps {
  network: MatureNetwork
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

  return (
    <div className={`w-full h-full ${className}`}>
      <div
        role="button"
        tabIndex={0}
        onClick={toggleFlip}
        onKeyDown={handleKeyDown}
        className="w-full h-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-goos-orange-500 rounded-sm cursor-pointer"
        aria-label={
          isFlipped
            ? t('networks.comparison.flipBack')
            : t('networks.comparison.flipToDetails')
        }
      >
        <div className="relative w-full h-full min-h-[520px] [perspective:1000px]">
          <div
            className={`relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] ${
              isFlipped ? '[transform:rotateY(180deg)]' : ''
            }`}
          >
            {/* Front */}
            <div className="absolute inset-0 [backface-visibility:hidden]">
              <NetworkCard
                iconSrc={asset(network.iconPath)}
                iconAlt={network.iconAlt}
                titleKey={network.titleKey}
                networkUrl={network.networkUrl}
                networkLinkKey="networks.viewNetwork"
                ratings={network.ratings}
                deliveryAreasLabelKey="networks.deliveryAreasLabel"
                deliveryAreas={network.deliveryAreas}
                backgroundColor={backgroundColor}
                textColor={textColor}
                accentColor={accentColor}
                tooltipBgColor={tooltipBgColor}
                tooltipTextColor={tooltipTextColor}
                onNetworkLinkClick={stopPropagation}
                className="h-full"
              />
              <p className={`${accentColor} text-xs text-center mt-2 opacity-80`}>
                {t('networks.comparison.tapForDetails')}
              </p>
            </div>

            {/* Back */}
            <div
              className={`absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] ${backgroundColor} p-6 flex flex-col gap-5 h-full`}
            >
              <div className="flex items-start gap-4">
                <img
                  src={asset(network.iconPath)}
                  alt={t(network.iconAlt)}
                  className="w-14 h-14 object-contain shrink-0"
                />
                <div>
                  <h4 className={`${textColor} text-lg font-semibold`}>{t(network.titleKey)}</h4>
                  <p className={`${accentColor} text-sm mt-1`}>
                    {t('networks.comparison.tapToReturn')}
                  </p>
                </div>
              </div>

              <div className="h-[1px] bg-white opacity-20" />

              <NetworkDetailsPanel
                network={network}
                textColor={textColor}
                accentColor={accentColor}
                className="overflow-y-auto flex-1"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
