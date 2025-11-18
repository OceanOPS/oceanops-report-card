/**
 * PartnerModal Component
 *
 * A modal displaying partner countries and their ocean observing platforms.
 * Shows countries in collapsed state with total networks and platforms.
 * Expands to show detailed platform breakdown across 14 fixed network types.
 *
 * @param isOpen - Whether the modal is open
 * @param onClose - Function to call when modal should close
 * @param countries - Array of country data with platform counts per network
 * @param titleKey - Translation key for modal title (default: 'partners.title')
 * @param descriptionKey - Translation key for expanded description (default: 'partners.description')
 *
 * @example
 * ```tsx
 * const [isOpen, setIsOpen] = useState(false)
 *
 * <PartnerModal
 *   isOpen={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   countries={[
 *     {
 *       name: "France",
 *       networks: {
 *         driftingBuoys: 150,
 *         argo: 200,
 *         oceanGliders: 10,
 *         aniBOS: 0,
 *         fvon: 5,
 *         sotVos: 30,
 *         sotAsap: 15,
 *         sot: 25,
 *         goShip: 8,
 *         gloss: 12,
 *         oceanSites: 6,
 *         mooredBuoys: 45,
 *         tsunamiBuoys: 0,
 *         hfRadars: 4
 *       }
 *     }
 *   ]}
 * />
 * ```
 */

import { useEffect, useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { gsap } from 'gsap'

// Fixed network types with their icons and translation keys
const FIXED_NETWORKS = [
  { key: 'driftingBuoys', icon: '/icons/network/dbcp_drifters.svg', labelKey: 'partners.networks.driftingBuoys' },
  { key: 'argo', icon: '/icons/network/argo.svg', labelKey: 'partners.networks.argo' },
  { key: 'oceanGliders', icon: '/icons/network/ocean_gliders.svg', labelKey: 'partners.networks.oceanGliders' },
  { key: 'aniBOS', icon: '/icons/network/ani_bos.svg', labelKey: 'partners.networks.aniBOS' },
  { key: 'fvon', icon: '/icons/network/soop.svg', labelKey: 'partners.networks.fvon' },
  { key: 'sotVos', icon: '/icons/network/vos.svg', labelKey: 'partners.networks.sotVos' },
  { key: 'sotAsap', icon: '/icons/network/asap.svg', labelKey: 'partners.networks.sotAsap' },
  { key: 'sot', icon: '/icons/network/xbt-soop.svg', labelKey: 'partners.networks.sot' },
  { key: 'goShip', icon: '/icons/network/go_ship.svg', labelKey: 'partners.networks.goShip' },
  { key: 'gloss', icon: '/icons/network/gloss.svg', labelKey: 'partners.networks.gloss' },
  { key: 'oceanSites', icon: '/icons/network/ocean_sites.svg', labelKey: 'partners.networks.oceanSites' },
  { key: 'mooredBuoys', icon: '/icons/network/dbcp_moored.svg', labelKey: 'partners.networks.mooredBuoys' },
  { key: 'tsunamiBuoys', icon: '/icons/network/tsunami_buoys.svg', labelKey: 'partners.networks.tsunamiBuoys' },
  { key: 'hfRadars', icon: '/icons/network/hf_radar.svg', labelKey: 'partners.networks.hfRadars' },
] as const

type NetworkKey = typeof FIXED_NETWORKS[number]['key']

interface CountryNetworks {
  driftingBuoys: number
  argo: number
  oceanGliders: number
  aniBOS: number
  fvon: number
  sotVos: number
  sotAsap: number
  sot: number
  goShip: number
  gloss: number
  oceanSites: number
  mooredBuoys: number
  tsunamiBuoys: number
  hfRadars: number
}

interface CountryData {
  name: string
  countryCode?: string // ISO 3166-1 alpha-2 code for flag display
  description?: string
  networks: CountryNetworks
}

interface PartnerModalProps {
  isOpen: boolean
  onClose: () => void
  countries: CountryData[]
  titleKey?: string
  showFlags?: boolean // Show country flags (default: false)
}

export default function PartnerModal({
  isOpen,
  onClose,
  countries,
  titleKey = 'partners.title',
  showFlags = false,
}: PartnerModalProps) {
  const { t } = useTranslation()
  const [expandedCountry, setExpandedCountry] = useState<string | null>(null)
  const [failedFlags, setFailedFlags] = useState<Set<string>>(new Set())
  const countryRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})
  const cardsGridRef = useRef<{ [key: string]: HTMLDivElement | null }>({})
  const expandedContentRef = useRef<{ [key: string]: HTMLDivElement | null }>({})
  const overlayRef = useRef<HTMLDivElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)

  // Handle flag load error
  const handleFlagError = (countryCode: string) => {
    setFailedFlags(prev => new Set(prev).add(countryCode))
  }

  // Close on ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  // Prevent scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // Animate modal open
  useEffect(() => {
    if (!overlayRef.current || !modalRef.current) return

    // Respect user's motion preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      // No animations - show immediately
      if (isOpen) {
        gsap.set(overlayRef.current, { opacity: 1 })
        gsap.set(modalRef.current, { opacity: 1, scale: 1 })
      }
      return
    }

    if (isOpen) {
      // Animate in
      const tl = gsap.timeline()

      // Overlay fade in
      tl.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.2, ease: 'power2.out' }
      )

      // Modal scale + fade in
      tl.fromTo(
        modalRef.current,
        { opacity: 0, scale: 0.9, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: 'power2.out' },
        '-=0.1' // Overlap slightly with overlay
      )
    }
  }, [isOpen])

  // GSAP animation when country expands
  useEffect(() => {
    if (!expandedCountry) return

    const expandedContent = expandedContentRef.current[expandedCountry]
    const cardsGrid = cardsGridRef.current[expandedCountry]

    if (!expandedContent || !cardsGrid) return

    // Respect user's motion preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      const cards = cardsGrid.querySelectorAll('.platform-card')

      if (prefersReducedMotion) {
        // No animations - show content immediately
        gsap.set(expandedContent, { height: 'auto' })
        if (cards.length > 0) {
          gsap.set(cards, { opacity: 1 })
        }
      } else {
        // Animate normally
        const tl = gsap.timeline()

        // 1. Expand container - MUY RÁPIDO, casi instantáneo
        tl.to(expandedContent, {
          height: 'auto',
          duration: 0.2,
          ease: 'none', // Linear, sin curva
        })

        // 2. Fade in cards - SOLO opacity, super simple
        if (cards.length > 0) {
          // Initial state
          gsap.set(cards, { opacity: 0 })

          // Animate ONLY opacity - más ligero y fluido
          tl.to(
            Array.from(cards),
            {
              opacity: 1,
              duration: 0.3,
              stagger: 0.02, // 20ms entre cards
              ease: 'none', // Linear para máxima fluidez
            },
            '-=0.15' // Overlap con expansión
          )
        }
      }
    }, expandedContent)

    return () => ctx.revert()
  }, [expandedCountry])

  if (!isOpen) return null

  // Calculate total networks and platforms for a country
  const getCountryTotals = (networks: CountryNetworks) => {
    const values = Object.values(networks)
    // Count networks: include -1 (X) as active, but exclude 0
    const activeNetworks = values.filter(v => v !== 0).length
    // Sum platforms: exclude -1 (X) from total, only count actual numbers
    const totalPlatforms = values.reduce((sum, v) => sum + (v > 0 ? v : 0), 0)
    return { activeNetworks, totalPlatforms }
  }

  // Handle expand with auto-scroll
  const handleExpand = (countryName: string) => {
    setExpandedCountry(countryName)

    // Scroll to country after expansion with offset for sticky header
    setTimeout(() => {
      const element = countryRefs.current[countryName]
      if (element) {
        const modalContent = element.closest('.overflow-y-auto')
        if (modalContent) {
          const elementTop = element.offsetTop
          const headerHeight = 80 // Approximate height of sticky header
          modalContent.scrollTo({
            top: elementTop - headerHeight,
            behavior: 'smooth'
          })
        }
      }
    }, 100)
  }

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-black bg-opacity-50 p-4"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-7xl bg-goos-white shadow-xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-goos-blue-900 border-b border-goos-blue-300 px-4 sm:px-6 md:px-8 py-4 sm:py-6 md:py-8 flex items-center justify-between z-10">
          <h2 className="text-base sm:text-lg font-extrabold text-goos-white">{t(titleKey)}</h2>
          <button
            onClick={onClose}
            className="ml-auto text-white hover:text-gray-200 transition-colors"
            aria-label={t('common.closeModal')}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="space-y-1 bg-goos-blue-900">
          {countries.map((country) => {
            const { activeNetworks, totalPlatforms } = getCountryTotals(country.networks)
            const isExpanded = expandedCountry === country.name

            return (
              <div
                key={country.name}
                ref={(el) => (countryRefs.current[country.name] = el)}
                className="w-full overflow-hidden transition-all duration-500 ease-in-out"
              >
                {isExpanded ? (
                  // Expanded Card
                  <div
                    ref={(el) => (expandedContentRef.current[country.name] = el)}
                    className="bg-goos-blue-900 border-t border-goos-blue-900 px-4 sm:px-6 md:px-8 py-4 sm:py-6 md:py-8 space-y-4 sm:space-y-6 md:space-y-8"
                  >
                    {/* Country Header - Entire header is clickable */}
                    <div
                      onClick={() => setExpandedCountry(null)}
                      className="flex items-center justify-between w-full cursor-pointer hover:opacity-90 transition-opacity duration-200"
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-4">
                        <div className="flex items-center gap-2 sm:gap-3">
                          {showFlags && country.countryCode && !failedFlags.has(country.countryCode) && (
                            <div className="flex-shrink-0 w-8 h-5 sm:w-10 sm:h-6 transition-transform duration-300 hover:scale-110">
                              <img
                                src={`https://flagcdn.com/w40/${country.countryCode.toLowerCase()}.png`}
                                alt={`${country.name} ${t('common.flag')}`}
                                className="w-full h-full object-cover"
                                onError={() => handleFlagError(country.countryCode!)}
                              />
                            </div>
                          )}
                          <h2 className="text-2xl sm:text-3xl md:text-4xl text-goos-white font-normal">{country.name}</h2>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="bg-goos-blue-700 text-goos-white px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium transition-all duration-200 hover:scale-105">
                            {activeNetworks} {t('partners.networksLabel')}
                          </span>
                          <span className="bg-goos-cyan-200 text-goos-blue-700 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium transition-all duration-200 hover:scale-105">
                            {totalPlatforms} {t('partners.platformsLabel')}
                          </span>
                        </div>
                      </div>
                      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-goos-blue-800 flex-shrink-0">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path d="M19 13H5v-2h14v2z" fill="#f0f0f0" />
                        </svg>
                      </div>
                    </div>

                    {/* Description - Only show if country has one */}
                    {country.description && (
                      <p className="text-goos-white text-base sm:text-lg md:text-xl leading-relaxed">
                        {country.description}
                      </p>
                    )}

                    {/* Platform Cards Grid */}
                    <div
                      ref={(el) => (cardsGridRef.current[country.name] = el)}
                      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6"
                    >
                      {FIXED_NETWORKS.map((network) => {
                        const platformCount = country.networks[network.key as NetworkKey]

                        // Only show networks with platforms (> 0 or -1 for X)
                        if (platformCount === 0) return null

                        // Display "X" for -1, otherwise show the number
                        const displayValue = platformCount === -1 ? 'X' : platformCount

                        return (
                          <div
                            key={network.key}
                            className="platform-card bg-goos-blue-800 p-3 sm:p-4 flex flex-col justify-between h-[200px] sm:h-[240px] md:h-[290px] opacity-0"
                          >
                            <div className="flex items-start justify-between">
                              <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-goos-white leading-none">
                                {displayValue}
                              </span>
                              <span className="text-[10px] sm:text-xs text-goos-white uppercase">
                                {platformCount === -1 ? '' : t('partners.platformsLabel')}
                              </span>
                            </div>
                            <div className="space-y-1 sm:space-y-2">
                              <img
                                src={network.icon}
                                alt={t(network.labelKey)}
                                className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 object-contain transition-transform duration-300 hover:scale-110"
                              />
                              <p className="text-goos-white text-xs sm:text-sm md:text-xl font-semibold leading-tight">
                                {t(network.labelKey)}
                              </p>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                ) : (
                  // Collapsed Card - Entire card is clickable
                  <div
                    onClick={() => handleExpand(country.name)}
                    className="bg-goos-blue-900 border-t border-goos-blue-200 px-4 sm:px-6 md:px-8 py-4 sm:py-6 md:py-8 animate-fadeInScale cursor-pointer hover:opacity-90 transition-all duration-300 hover:shadow-md"
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-4">
                        <div className="flex items-center gap-2 sm:gap-3">
                          {showFlags && country.countryCode && !failedFlags.has(country.countryCode) && (
                            <div className="flex-shrink-0 w-8 h-5 sm:w-10 sm:h-6 transition-transform duration-300 hover:scale-110">
                              <img
                                src={`https://flagcdn.com/w40/${country.countryCode.toLowerCase()}.png`}
                                alt={`${country.name} ${t('common.flag')}`}
                                className="w-full h-full object-cover"
                                onError={() => handleFlagError(country.countryCode!)}
                              />
                            </div>
                          )}
                          <h3 className="text-2xl sm:text-3xl md:text-4xl text-goos-white font-normal">{country.name}</h3>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="bg-goos-blue-700 text-goos-white px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium transition-all duration-200 hover:scale-105">
                            {activeNetworks} {t('partners.networksLabel')}
                          </span>
                          <span className="bg-goos-cyan-200 text-goos-blue-700 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium transition-all duration-200 hover:scale-105">
                            {totalPlatforms} {t('partners.platformsLabel')}
                          </span>
                        </div>
                      </div>
                      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-goos-blue-800 flex-shrink-0">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" fill="#f0f0f0" />
                        </svg>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Disclaimer */}
        <div className="bg-goos-blue-800 px-8 sm:px-8 md:px-8 lg:px-8 py-8 sm:py-4">
          <p
            className="text-xs sm:text-sm text-goos-white/80 italic leading-relaxed"
            dangerouslySetInnerHTML={{ __html: t('partners.disclaimer') }}
          />
        </div>
      </div>
    </div>
  )
}
