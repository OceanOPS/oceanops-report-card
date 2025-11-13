/**
 * GoosLogo Component
 *
 * Displays the GOOS logo with support for white and color variants.
 *
 * @param variant - Logo color variant: 'white' or 'color' (default: 'white')
 * @param className - Optional Tailwind classes for custom styling
 * @param url - Optional external URL to link to (default: none)
 *
 * @example
 * ```tsx
 * // White logo (for dark backgrounds)
 * <GoosLogo variant="white" />
 *
 * // Color logo (for light backgrounds)
 * <GoosLogo variant="color" />
 *
 * // Logo with external link
 * <GoosLogo variant="white" url="https://goosocean.org/" />
 *
 * // Custom styling
 * <GoosLogo variant="color" className="h-32" />
 * ```
 */

import { useTranslation } from 'react-i18next'

interface GoosLogoProps {
  variant?: 'white' | 'color'
  className?: string
  url?: string
}

export default function GoosLogo({ variant = 'white', className = '', url }: GoosLogoProps) {
  const { t } = useTranslation()

  const logoSuffix = variant === 'white' ? '-w' : ''
  const logoSrc = `/logos/goos-logo${logoSuffix}.png`

  const logoImage = (
    <img
      src={logoSrc}
      alt={t('cover.logos.goos')}
      className="h-full w-auto object-contain"
    />
  )

  if (url) {
    return (
      <div className={`h-16 sm:h-20 md:h-24 lg:h-28 ${className}`}>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="h-full inline-block hover:opacity-80 transition-opacity"
        >
          {logoImage}
        </a>
      </div>
    )
  }

  return (
    <div className={`h-16 sm:h-20 md:h-24 lg:h-28 ${className}`}>
      {logoImage}
    </div>
  )
}
