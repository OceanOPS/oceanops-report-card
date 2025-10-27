/**
 * GoosLogo Component
 *
 * Displays the GOOS logo with support for white and color variants.
 *
 * @param variant - Logo color variant: 'white' or 'color' (default: 'white')
 * @param className - Optional Tailwind classes for custom styling
 *
 * @example
 * ```tsx
 * // White logo (for dark backgrounds)
 * <GoosLogo variant="white" />
 *
 * // Color logo (for light backgrounds)
 * <GoosLogo variant="color" />
 *
 * // Custom styling
 * <GoosLogo variant="color" className="h-32" />
 * ```
 */

import { useTranslation } from 'react-i18next'
import { asset } from '../utils/assets'

interface GoosLogoProps {
  variant?: 'white' | 'color'
  className?: string
}

export default function GoosLogo({ variant = 'white', className = '' }: GoosLogoProps) {
  const { t } = useTranslation()

  const logoSuffix = variant === 'white' ? '-w' : ''
  const logoSrc = asset(`/logos/goos-logo${logoSuffix}.png`)

  return (
    <div className={`h-28 ${className}`}>
      <img
        src={logoSrc}
        alt={t('cover.logos.goos')}
        className="h-full w-auto object-contain"
      />
    </div>
  )
}
