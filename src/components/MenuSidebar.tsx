import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { gsap } from 'gsap'
import Button from './Button'

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
  subItems?: MenuItem[] // Optional sub-items for hierarchical menu
}

interface MenuSidebarProps {
  menuItems: MenuItem[]
  isOpen?: boolean
  onClose?: () => void
  show?: boolean  // Controls visibility and entrance animation
}

export default function MenuSidebar({
  menuItems,
  isOpen: externalIsOpen,
  onClose,
  show = true,
}: MenuSidebarProps) {
  const { t, i18n } = useTranslation()
  const [internalIsOpen, setInternalIsOpen] = useState(false)
  const [isPastReportsExpanded, setIsPastReportsExpanded] = useState(false)
  const sidebarRef = useRef<HTMLDivElement>(null)
  const menuItemsRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

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

  // Animate button entrance when show becomes true
  useEffect(() => {
    if (!buttonRef.current) return

    // Respect user's motion preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      // No animation - just show/hide
      gsap.set(buttonRef.current, { opacity: show ? 1 : 0, scale: 1, x: 0 })
    } else {
      if (show) {
        // Animate from right with bounce - delayed to appear after cover animations
        gsap.fromTo(
          buttonRef.current,
          { opacity: 0, scale: 0.5, x: 100 },
          {
            opacity: 1,
            scale: 1,
            x: 0,
            duration: 0.6,
            ease: 'back.out(1.7)',
            delay: 1.8  // Wait longer for cover animations to finish
          }
        )
      } else {
        gsap.set(buttonRef.current, { opacity: 0 })
      }
    }
  }, [show])

  // Animate menu items when sidebar opens
  useEffect(() => {
    if (!isOpen || !menuItemsRef.current) return

    // Respect user's motion preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      const items = menuItemsRef.current?.querySelectorAll('.menu-item')
      if (!items || items.length === 0) return

      if (prefersReducedMotion) {
        // No animations - show items immediately
        gsap.set(items, { opacity: 1, x: 0 })
      } else {
        // Animate items with stagger
        gsap.fromTo(
          items,
          { opacity: 0, x: 20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.3,
            stagger: 0.05, // 50ms between each item
            ease: 'power2.out',
            delay: 0.1, // Small delay to let sidebar slide in first
          }
        )
      }
    }, menuItemsRef)

    return () => ctx.revert()
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
        // Mark that we're scrolling programmatically to prevent scroll spy from updating hash
        (window as any).isScrollingProgrammatically = true

        // Update URL hash for deep linking using replaceState to avoid history clutter
        window.history.replaceState(null, '', `#${sectionId}`)

        // Scroll to section if ID is provided
        const element = document.getElementById(sectionId)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }

        // Reset flag after scroll animation completes
        setTimeout(() => {
          (window as any).isScrollingProgrammatically = false
        }, 1000)
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
        ref={buttonRef}
        onClick={() => externalIsOpen !== undefined ? onClose?.() : setInternalIsOpen(true)}
        className="fixed top-16 right-16 z-50 w-16 h-16 bg-goos-blue-700 hover:bg-goos-blue-600 transition-colors flex flex-col items-center justify-center gap-2 rounded-full"
        style={{ opacity: 0 }}
        aria-label="Open menu"
      >
        <span className="w-8 h-0.5 bg-goos-white"></span>
        <span className="w-8 h-0.5 bg-goos-white"></span>
        <span className="w-8 h-0.5 bg-goos-white"></span>
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
            className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center text-goos-white hover:bg-goos-blue-800 rounded-full transition-colors z-10"
            aria-label="Close menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>

          {/* Language Selector - Hidden for now, will be enabled in future release */}
          <div className="mb-6 hidden">
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
          <div className="mb-6">
            <div
              onClick={() => {
                // Close menu first
                setIsOpen()
                // Navigate to home (top of page)
                setTimeout(() => {
                  (window as any).isScrollingProgrammatically = true
                  window.history.replaceState(null, '', '#home')
                  // Scroll to top of page
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                  setTimeout(() => {
                    (window as any).isScrollingProgrammatically = false
                  }, 1000)
                }, 300)
              }}
              className="cursor-pointer hover:opacity-80 transition-opacity mb-8 pr-12"
            >
              <h1 className="text-4xl font-extrabold leading-tight">{t('menu.title')}</h1>
              <p className="text-4xl font-normal">{t('menu.year')}</p>
            </div>
            {/* Download PDF button - hidden for now, will be enabled later */}
            {/* <Button
              variant="download"
              label={t('menu.downloadPdf')}
              onClick={() => {
                // TODO: Implement PDF download
                console.log('Download PDF')
              }}
              textColor="text-white"
              bgColor="bg-goos-blue-700"
              iconColor="text-goos-blue-700"
              iconBgColor="bg-white"
            /> */}
          </div>

          <div className="w-full h-px bg-goos-white opacity-20 mb-6"></div>

          {/* Menu Items */}
          <nav ref={menuItemsRef} className="space-y-4 mb-6">
            {menuItems.map((item, index) => (
              <div key={index} className="menu-item">
                {/* Main Item */}
                <div
                  onClick={() => handleMenuItemClick(item)}
                  className="cursor-pointer hover:opacity-80 transition-opacity pt-2"
                >
                  <div className={`${item.accentColor} h-1 w-8 mb-1`}></div>
                  <h2 className="text-2xl font-normal">{t(item.titleKey)}</h2>
                </div>

                {/* Sub Items */}
                {item.subItems && item.subItems.length > 0 && (
                  <div className="mt-2 space-y-2">
                    {item.subItems.map((subItem, subIndex) => (
                      <div
                        key={subIndex}
                        onClick={() => handleMenuItemClick(subItem)}
                        className="cursor-pointer opacity-80 hover:opacity-100 transition-opacity"
                      >
                        <h3 className="text-lg font-light">{t(subItem.titleKey)}</h3>
                      </div>
                    ))}
                  </div>
                )}
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
