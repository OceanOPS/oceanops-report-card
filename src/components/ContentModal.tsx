/**
 * ContentModal Component
 *
 * A generic modal for displaying custom content (text, images, components, etc.).
 * Used internally by ContentModule button or can be used standalone.
 *
 * @param isOpen - Whether the modal is open
 * @param onClose - Function to call when modal should close
 * @param children - Content to display in the modal
 * @param title - Optional title for the modal
 * @param maxWidth - Max width of modal: 'sm' | 'md' | 'lg' | 'xl' | '2xl' (default: 'lg')
 * @param className - Optional additional Tailwind classes
 *
 * @example
 * ```tsx
 * const [isOpen, setIsOpen] = useState(false)
 *
 * <ContentModal
 *   isOpen={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   title="Additional Information"
 * >
 *   <p>Your custom content here...</p>
 * </ContentModal>
 * ```
 */

import { useEffect } from 'react'

interface ContentModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  title?: string
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  className?: string
}

export default function ContentModal({
  isOpen,
  onClose,
  children,
  title,
  maxWidth = 'lg',
  className = '',
}: ContentModalProps) {
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

  const maxWidthMap = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    '2xl': 'max-w-6xl',
  }

  const maxWidthClass = maxWidthMap[maxWidth]

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50 p-4"
      onClick={onClose}
    >
      <div
        className={`relative w-full ${maxWidthClass} bg-goos-white shadow-xl max-h-[90vh] overflow-y-auto ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with close button */}
        <div className="sticky top-0 bg-goos-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
          {title && (
            <h2 className="text-2xl font-extrabold text-goos-blue-700">{title}</h2>
          )}
          <button
            onClick={onClose}
            className="ml-auto text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Close modal"
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
        <div className="px-8 py-8">
          {children}
        </div>
      </div>
    </div>
  )
}
