import { useTranslation } from 'react-i18next'

interface LanguageSwitcherProps {
  className?: string
}

/**
 * LanguageSwitcher Component
 *
 * Provides buttons to switch between available languages (EN, ES, FR).
 *
 * @param className - Optional Tailwind classes for custom positioning/styling
 *
 * @example
 * ```tsx
 * // Fixed position (current usage)
 * <LanguageSwitcher className="fixed top-4 right-4 z-50" />
 *
 * // In a menu
 * <LanguageSwitcher className="flex gap-2" />
 * ```
 */
export default function LanguageSwitcher({ className = '' }: LanguageSwitcherProps) {
  const { i18n } = useTranslation()

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
  }

  return (
    <div className={`flex gap-2 ${className}`}>
      <button
        onClick={() => changeLanguage('en')}
        className="px-4 py-2 bg-goos-orange text-white rounded font-semibold hover:bg-goos-orange-600 transition-colors"
      >
        EN
      </button>
      <button
        onClick={() => changeLanguage('es')}
        className="px-4 py-2 bg-goos-orange text-white rounded font-semibold hover:bg-goos-orange-600 transition-colors"
      >
        ES
      </button>
      <button
        onClick={() => changeLanguage('fr')}
        className="px-4 py-2 bg-goos-orange text-white rounded font-semibold hover:bg-goos-orange-600 transition-colors"
      >
        FR
      </button>
    </div>
  )
}
