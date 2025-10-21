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

// Fixed network types with their icons and translation keys
const FIXED_NETWORKS = [
  { key: 'driftingBuoys', icon: '/icons/network/dbcp_drifters.svg', labelKey: 'partners.networks.driftingBuoys' },
  { key: 'argo', icon: '/icons/network/argo.svg', labelKey: 'partners.networks.argo' },
  { key: 'oceanGliders', icon: '/icons/network/ocean_gliders.svg', labelKey: 'partners.networks.oceanGliders' },
  { key: 'aniBOS', icon: '/icons/network/ani_bos.svg', labelKey: 'partners.networks.aniBOS' },
  { key: 'fvon', icon: '/icons/network/soop.svg', labelKey: 'partners.networks.fvon' },
  { key: 'sotVos', icon: '/icons/network/vos.svg', labelKey: 'partners.networks.sotVos' },
  { key: 'sotAsap', icon: '/icons/network/asap.svg', labelKey: 'partners.networks.sotAsap' },
  { key: 'sot', icon: '/icons/network/soop.svg', labelKey: 'partners.networks.sot' },
  { key: 'goShip', icon: '/icons/network/go_ship.svg', labelKey: 'partners.networks.goShip' },
  { key: 'gloss', icon: '/icons/network/gloss.svg', labelKey: 'partners.networks.gloss' },
  { key: 'oceanSites', icon: '/icons/network/ocean_sites.svg', labelKey: 'partners.networks.oceanSites' },
  { key: 'mooredBuoys', icon: '/icons/network/dbcp_moored.svg', labelKey: 'partners.networks.mooredBuoys' },
  { key: 'tsunamiBuoys', icon: '/icons/network/dbcp_moored.svg', labelKey: 'partners.networks.tsunamiBuoys' },
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
  description?: string
  networks: CountryNetworks
}

interface PartnerModalProps {
  isOpen: boolean
  onClose: () => void
  countries: CountryData[]
  titleKey?: string
}

export default function PartnerModal({
  isOpen,
  onClose,
  countries,
  titleKey = 'partners.title',
}: PartnerModalProps) {
  const { t } = useTranslation()
  const [expandedCountry, setExpandedCountry] = useState<string | null>(null)
  const countryRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

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
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50 p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-7xl bg-goos-blue-900 shadow-xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-goos-blue-900 border-b border-goos-blue-800 px-12 py-6 flex items-center justify-between z-10">
          <h1 className="text-2xl font-extrabold text-goos-white">{t(titleKey)}</h1>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-goos-white flex items-center justify-center hover:bg-gray-200 transition-colors"
            aria-label="Close modal"
          >
            <span className="text-goos-blue-900 text-2xl leading-none">×</span>
          </button>
        </div>

        {/* Content */}
        <div className="px-12 py-6 space-y-2">
          {countries.map((country) => {
            const { activeNetworks, totalPlatforms } = getCountryTotals(country.networks)
            const isExpanded = expandedCountry === country.name

            return (
              <div
                key={country.name}
                ref={(el) => (countryRefs.current[country.name] = el)}
                className="w-full overflow-hidden"
              >
                {isExpanded ? (
                  // Expanded Card
                  <div className="bg-goos-white p-8 space-y-8 animate-expandIn">
                    {/* Country Header - Entire header is clickable */}
                    <div
                      onClick={() => setExpandedCountry(null)}
                      className="flex items-center justify-between animate-fadeInDown cursor-pointer hover:opacity-90 transition-opacity"
                    >
                      <div className="flex items-center gap-2">
                        <h2 className="text-4xl text-goos-blue-700 font-normal">{country.name}</h2>
                        <span className="bg-goos-blue-700 text-goos-white px-3 py-1 rounded-full text-sm font-semibold">
                          {activeNetworks} {t('partners.networksLabel')}
                        </span>
                        <span className="bg-goos-cyan-200 text-goos-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                          {totalPlatforms} {t('partners.platformsLabel')}
                        </span>
                      </div>
                      <div className="w-10 h-10 flex items-center justify-center rounded-full">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path d="M19 13H5v-2h14v2z" fill="#184596" />
                        </svg>
                      </div>
                    </div>

                    {/* Description - Only show if country has one */}
                    {country.description && (
                      <p className="text-goos-gray-800 text-xl leading-relaxed animate-fadeInUp animation-delay-100">
                        {country.description}
                      </p>
                    )}

                    {/* Platform Cards Grid */}
                    <div className="grid grid-cols-4 gap-6 animate-fadeInUp animation-delay-200">
                      {FIXED_NETWORKS.map((network) => {
                        const platformCount = country.networks[network.key as NetworkKey]

                        // Only show networks with platforms (> 0 or -1 for X)
                        if (platformCount === 0) return null

                        // Display "X" for -1, otherwise show the number
                        const displayValue = platformCount === -1 ? 'X' : platformCount

                        return (
                          <div
                            key={network.key}
                            className="bg-goos-blue-800 p-4 flex flex-col justify-between h-[290px]"
                          >
                            <div className="flex items-start justify-between">
                              <span className="text-7xl font-light text-goos-white leading-none">
                                {displayValue}
                              </span>
                              <span className="text-xs text-goos-white uppercase">
                                {platformCount === -1 ? '' : t('partners.platformsLabel')}
                              </span>
                            </div>
                            <div className="space-y-2">
                              <img
                                src={network.icon}
                                alt={t(network.labelKey)}
                                className="w-12 h-12 object-contain"
                              />
                              <p className="text-goos-white text-base font-semibold uppercase leading-tight">
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
                    className="bg-goos-blue-800 py-4 px-8 animate-fadeIn cursor-pointer hover:opacity-90 transition-opacity"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <h3 className="text-4xl text-goos-white font-normal">{country.name}</h3>
                        <span className="bg-goos-blue-700 text-goos-white px-3 py-1 rounded-full text-sm font-semibold">
                          {activeNetworks} {t('partners.networksLabel')}
                        </span>
                        <span className="bg-goos-cyan-200 text-goos-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                          {totalPlatforms} {t('partners.platformsLabel')}
                        </span>
                      </div>
                      <div className="w-10 h-10 flex items-center justify-center rounded-full">
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
      </div>
    </div>
  )
}
