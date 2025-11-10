/**
 * LogoStrip Component
 *
 * A horizontal strip component that displays a row of clickable logos at full viewport width.
 * All logos appear in a single line and adapt to the container width.
 * Each logo is a link that opens in a new tab.
 * Logo alt text is translatable via i18n.
 *
 * @param logos - Array of logo objects with src, altKey, and url (required)
 * @param backgroundColor - Tailwind background color (default: 'bg-white')
 * @param className - Optional additional Tailwind classes
 *
 * @example
 * ```tsx
 * <LogoStrip
 *   logos={[
 *     { src: '/logos/logo1.png', altKey: 'logos.logo1', url: 'https://example.com' },
 *     { src: '/logos/logo2.png', altKey: 'logos.logo2', url: 'https://example.com' },
 *     { src: '/logos/logo3.png', altKey: 'logos.logo3', url: 'https://example.com' },
 *     { src: '/logos/logo4.png', altKey: 'logos.logo4', url: 'https://example.com' },
 *     { src: '/logos/logo5.png', altKey: 'logos.logo5', url: 'https://example.com' },
 *     { src: '/logos/logo6.png', altKey: 'logos.logo6', url: 'https://example.com' },
 *     { src: '/logos/logo7.png', altKey: 'logos.logo7', url: 'https://example.com' },
 *     { src: '/logos/logo8.png', altKey: 'logos.logo8', url: 'https://example.com' },
 *     { src: '/logos/logo9.png', altKey: 'logos.logo9', url: 'https://example.com' },
 *   ]}
 *   backgroundColor="bg-goos-blue-700"
 * />
 *
 * // With fewer logos
 * <LogoStrip
 *   logos={[
 *     { src: '/logos/partner1.png', altKey: 'partners.partner1', url: 'https://partner1.com' },
 *     { src: '/logos/partner2.png', altKey: 'partners.partner2', url: 'https://partner2.com' },
 *     { src: '/logos/partner3.png', altKey: 'partners.partner3', url: 'https://partner3.com' },
 *   ]}
 *   backgroundColor="bg-white"
 * />
 * ```
 */

import { useTranslation } from 'react-i18next'

interface LogoItem {
  src: string
  altKey: string
  url: string
}

interface LogoStripProps {
  logos: LogoItem[]
  backgroundColor?: string
  className?: string
}

export default function LogoStrip({
  logos,
  backgroundColor = 'bg-white',
  className = '',
}: LogoStripProps) {
  const { t } = useTranslation()

  return (
    <section className={`${backgroundColor} w-screen relative left-1/2 right-1/2 -mx-[50vw] px-4 sm:px-8 md:px-12 lg:px-16 py-1 sm:py-2 md:py-0 ${className}`}>
      <div className="mx-auto flex items-center justify-center gap-1 sm:gap-2 md:gap-3 lg:gap-6 h-8 sm:h-12 md:h-16 lg:h-20">
        {logos.map((logo, index) => (
          <a
            key={index}
            href={logo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-12 sm:w-16 md:w-20 lg:w-24 h-full transition-opacity hover:opacity-70"
          >
            <img
              src={logo.src}
              alt={t(logo.altKey)}
              className="max-h-full max-w-full object-contain"
            />
          </a>
        ))}
      </div>
    </section>
  )
}
