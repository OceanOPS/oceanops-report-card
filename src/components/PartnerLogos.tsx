/**
 * PartnerLogos Component
 *
 * Displays a horizontal list of partner organization logos with links.
 * Supports both white and color versions of logos.
 * Logos have a hover effect that reduces opacity to 0.7.
 *
 * @param variant - Logo color variant: 'white' or 'color' (default: 'white')
 * @param className - Optional Tailwind classes for custom positioning/styling
 *
 * @example
 * ```tsx
 * // White logos (for dark backgrounds)
 * <PartnerLogos variant="white" />
 *
 * // Color logos (for light backgrounds)
 * <PartnerLogos variant="color" />
 *
 * // Custom styling
 * <PartnerLogos variant="color" className="gap-4" />
 * ```
 */

import { useTranslation } from 'react-i18next'

interface PartnerLogosProps {
  variant?: 'white' | 'color'
  className?: string
}

export default function PartnerLogos({ variant = 'white', className = '' }: PartnerLogosProps) {
  const { t } = useTranslation()

  // Define logo paths based on variant
  const logoSuffix = variant === 'white' ? '-w' : ''

  const leftLogos = [
    {
      src: `/logos/unesco${logoSuffix}.png`,
      alt: t('cover.logos.unesco'),
      url: 'http://www.ioc-unesco.org/',
    },
    {
      src: `/logos/wmo${logoSuffix}.png`,
      alt: t('cover.logos.wmo'),
      url: 'http://www.wmo.int/',
    },
    {
      src: `/logos/unep${logoSuffix}.png`,
      alt: t('cover.logos.unep'),
      url: 'https://www.unep.org/',
    },
    {
      src: `/logos/isc${logoSuffix}.png`,
      alt: t('cover.logos.isc'),
      url: 'https://council.science/',
    },
  ]

  const rightLogo = {
    src: `/logos/oceanops${logoSuffix}.png`,
    alt: t('cover.logos.oceanops'),
    url: 'https://www.ocean-ops.org/',
  }

  return (
    <div className={`w-full flex flex-col sm:flex-row justify-between items-start gap-4 sm:gap-0 ${className}`}>
      {/* Left side logos */}
      <div className="flex gap-3 sm:gap-4 md:gap-6 lg:gap-8 items-center flex-wrap justify-start">
        {leftLogos.map((logo, index) => (
          <a
            key={index}
            href={logo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="h-12 sm:h-14 md:h-16 lg:h-20 transition-opacity hover:opacity-70"
          >
            <img
              src={logo.src}
              alt={logo.alt}
              className="h-full w-auto object-contain opacity-90"
            />
          </a>
        ))}
      </div>

      {/* Right side logo - OceanOPS with "Powered by" */}
      <div className="flex flex-col items-start gap-2 sm:items-end">
        <span className="text-xs sm:text-sm text-white opacity-70 font-light">Powered by:</span>
        <a
          href={rightLogo.url}
          target="_blank"
          rel="noopener noreferrer"
          className="h-12 sm:h-14 md:h-16 lg:h-20 transition-opacity hover:opacity-70"
        >
          <img
            src={rightLogo.src}
            alt={rightLogo.alt}
            className="h-full w-auto object-contain opacity-90"
          />
        </a>
      </div>
    </div>
  )
}
