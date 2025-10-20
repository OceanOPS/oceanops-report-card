import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'

/**
 * MenuSidebar Component
 *
 * A slide-in sidebar menu that opens from the right side of the screen.
 * Includes language selector, navigation items, download button, and social links.
 *
 * @param menuItems - Array of menu items with title keys and accent colors
 * @param isOpen - Control open/close state externally (optional)
 * @param onClose - Callback when menu closes (optional)
 *
 * @example
 * ```tsx
 * <MenuSidebar
 *   menuItems={[
 *     { titleKey: 'menu.section1', accentColor: 'bg-goos-orange-500' },
 *     { titleKey: 'menu.section2', accentColor: 'bg-goos-cyan-500' }
 *   ]}
 * />
 * ```
 */

export interface MenuItem {
  id?: string // Section ID for smooth scrolling
  titleKey: string
  accentColor: string
  onClick?: () => void
}

interface MenuSidebarProps {
  menuItems: MenuItem[]
  isOpen?: boolean
  onClose?: () => void
}

export default function MenuSidebar({
  menuItems,
  isOpen: externalIsOpen,
  onClose,
}: MenuSidebarProps) {
  const { t, i18n } = useTranslation()
  const [internalIsOpen, setInternalIsOpen] = useState(false)
  const [isPastReportsExpanded, setIsPastReportsExpanded] = useState(false)
  const sidebarRef = useRef<HTMLDivElement>(null)

  // Use external control if provided, otherwise use internal state
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen
  const setIsOpen = onClose ? onClose : () => setInternalIsOpen(false)

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, setIsOpen])

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target as Node)
      ) {
        setIsOpen()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen, setIsOpen])

  // Prevent body scroll when menu is open
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

  const handleMenuItemClick = (item: MenuItem) => {
    if (item.onClick) {
      item.onClick()
      setIsOpen()
    } else if (item.id) {
      // Store ID in local variable for setTimeout closure
      const sectionId = item.id

      // Close menu first to see the scroll animation
      setIsOpen()

      // Small delay to let menu close animation start
      setTimeout(() => {
        // Update URL hash for deep linking
        window.location.hash = sectionId
        // Scroll to section if ID is provided
        const element = document.getElementById(sectionId)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 300) // Match menu transition duration
    } else {
      setIsOpen()
    }
  }

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang)
  }

  return (
    <>
      {/* Hamburger Menu Button - Fixed Top Right */}
      <button
        onClick={() => externalIsOpen !== undefined ? onClose?.() : setInternalIsOpen(true)}
        className="fixed top-6 right-6 z-50 w-12 h-12 bg-goos-blue-700 hover:bg-goos-blue-600 transition-colors flex flex-col items-center justify-center gap-1.5 rounded-full"
        aria-label="Open menu"
      >
        <span className="w-6 h-0.5 bg-goos-white"></span>
        <span className="w-6 h-0.5 bg-goos-white"></span>
        <span className="w-6 h-0.5 bg-goos-white"></span>
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
          onClick={() => setIsOpen()}
        />
      )}

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 right-0 h-screen bg-goos-blue-900 text-goos-white w-full max-w-[665px] z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6 md:p-8">
          {/* Close Button */}
          <button
            onClick={() => setIsOpen()}
            className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center text-goos-white hover:bg-goos-blue-800 rounded-full transition-colors"
            aria-label="Close menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>

          {/* Language Selector */}
          <div className="mb-6">
            <div className="flex gap-1.5 text-lg">
              <button
                onClick={() => changeLanguage('en')}
                className={`hover:opacity-100 transition-opacity ${i18n.language === 'en' ? 'opacity-100' : 'opacity-70'}`}
              >
                English
              </button>
              <span>/</span>
              <button
                onClick={() => changeLanguage('fr')}
                className={`hover:opacity-100 transition-opacity ${i18n.language === 'fr' ? 'opacity-100' : 'opacity-70'}`}
              >
                Français
              </button>
              <span>/</span>
              <button
                onClick={() => changeLanguage('es')}
                className={`hover:opacity-100 transition-opacity ${i18n.language === 'es' ? 'opacity-100' : 'opacity-70'}`}
              >
                Español
              </button>
            </div>
            <div className="w-full h-px bg-goos-white opacity-20 mt-6"></div>
          </div>

          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-extrabold leading-tight">{t('menu.title')}</h1>
              <p className="text-4xl font-normal">{t('menu.year')}</p>
            </div>
            <button className="bg-goos-blue-700 px-3 py-1.5 flex items-center gap-1 hover:bg-goos-blue-600 transition-colors">
              <span className="font-semibold text-lg">{t('menu.downloadPdf')}</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 12L3 7H6V2H10V7H13L8 12Z" fill="currentColor"/>
                <path d="M2 14H14V16H2V14Z" fill="currentColor"/>
              </svg>
            </button>
          </div>

          <div className="w-full h-px bg-goos-white opacity-20 mb-6"></div>

          {/* Menu Items */}
          <nav className="space-y-4 mb-6">
            {menuItems.map((item, index) => (
              <div
                key={index}
                onClick={() => handleMenuItemClick(item)}
                className="cursor-pointer hover:opacity-80 transition-opacity"
              >
                <div className={`${item.accentColor} h-1 w-8 mb-1`}></div>
                <h2 className="text-2xl font-normal">{t(item.titleKey)}</h2>
              </div>
            ))}
          </nav>

          <div className="w-full h-px bg-goos-white opacity-20 mb-6"></div>

          {/* Past Reports */}
          <div className="mb-6">
            <div
              className="flex items-center justify-between cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => setIsPastReportsExpanded(!isPastReportsExpanded)}
            >
              <h2 className="text-2xl font-normal">{t('menu.pastReports')}</h2>
              <button className="w-8 h-8 rounded-full bg-goos-white flex items-center justify-center text-goos-blue-900 text-2xl font-light">
                {isPastReportsExpanded ? '−' : '+'}
              </button>
            </div>

            {/* Past Reports Links */}
            {isPastReportsExpanded && (
              <div className="mt-4 space-y-2">
                <a
                  href="/report-2024"
                  className="block text-lg hover:underline transition-all"
                >
                  {t('menu.pastReportsLinks.2024')}
                </a>
                <a
                  href="/report-2023"
                  className="block text-lg hover:underline transition-all"
                >
                  {t('menu.pastReportsLinks.2023')}
                </a>
                <a
                  href="/report-2022"
                  className="block text-lg hover:underline transition-all"
                >
                  {t('menu.pastReportsLinks.2022')}
                </a>
                <a
                  href="/report-2021"
                  className="block text-lg hover:underline transition-all"
                >
                  {t('menu.pastReportsLinks.2021')}
                </a>
              </div>
            )}
          </div>

          <div className="w-full h-px bg-goos-white opacity-20 mb-6"></div>

          {/* Social Media Links */}
          <div className="flex gap-1.5 text-lg">
            <a
              href={t('menu.social.instagram.url')}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              {t('menu.social.instagram.label')}
            </a>
            <span>/</span>
            <a
              href={t('menu.social.linkedin.url')}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              {t('menu.social.linkedin.label')}
            </a>
            <span>/</span>
            <a
              href={t('menu.social.youtube.url')}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              {t('menu.social.youtube.label')}
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
