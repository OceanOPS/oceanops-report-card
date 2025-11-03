/**
 * DeliveryAreasNav Component
 *
 * Fixed navigation bar that appears when viewing "Value of ocean observations" sections.
 * Shows three delivery areas (Climate/AMOC, Operational Services/El Niño, Ocean Health)
 * with icons and allows quick navigation between sections.
 *
 * Features:
 * - Fixed positioning at top of page (100% width)
 * - Only visible when in AMOC, El Niño, or Ocean Health sections
 * - Highlights current section
 * - Smooth scroll navigation to each section
 */

import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

// Delivery area configuration matching NetworkCard component
const DELIVERY_AREAS = [
  {
    key: 'climate',
    icon: '/icons/climate.png',
    labelKey: 'networks.deliveryAreas.climate',
    sectionId: 'amoc-section',
  },
  {
    key: 'operational',
    icon: '/icons/operational_services.png',
    labelKey: 'networks.deliveryAreas.operational',
    sectionId: 'elnino-section',
  },
  {
    key: 'oceanhealth',
    icon: '/icons/ocean_health.png',
    labelKey: 'networks.deliveryAreas.oceanhealth',
    sectionId: 'oceanhealth-section',
  },
] as const

export default function DeliveryAreasNav() {
  const { t } = useTranslation()
  const [isVisible, setIsVisible] = useState(false)
  const [activeSection, setActiveSection] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      // Get all section elements
      const sections = DELIVERY_AREAS.map(area => ({
        id: area.key,
        element: document.getElementById(area.sectionId),
      })).filter(s => s.element !== null)

      if (sections.length === 0) {
        setIsVisible(false)
        return
      }

      // Check if we're in any of the value sections
      const scrollPosition = window.scrollY + 200 // Offset for better UX
      let inValueSection = false
      let currentSection: string | null = null

      for (const section of sections) {
        if (!section.element) continue

        const rect = section.element.getBoundingClientRect()
        const elementTop = rect.top + window.scrollY
        const elementBottom = elementTop + rect.height

        // Check if we're within this section
        if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
          inValueSection = true
          currentSection = section.id
          break
        }
      }

      setIsVisible(inValueSection)
      setActiveSection(currentSection)
    }

    // Initial check
    handleScroll()

    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.scrollY

      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth',
      })
    }
  }

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-20 bg-goos-cyan-100 transition-transform duration-300 ease-in-out ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="w-full">
        <nav className="flex">
          {DELIVERY_AREAS.map((area) => (
            <button
              key={area.key}
              onClick={() => scrollToSection(area.sectionId)}
              className={`flex-1 flex items-center justify-center gap-3 px-6 py-3 transition-all duration-200 text-goos-blue-800 font-roboto-condensed ${
                activeSection === area.key
                  ? 'bg-goos-cyan-200'
                  : 'bg-goos-cyan-100 hover:bg-goos-cyan-200'
              }`}
            >
              <img
                src={area.icon}
                alt=""
                className="w-8 h-8 object-contain"
              />
              <span className="text-sm font-semibold uppercase tracking-wide">
                {t(area.labelKey)}
              </span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  )
}
