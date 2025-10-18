/**
 * Tooltip Component
 *
 * A small tooltip that follows the cursor on hover.
 * Used for displaying additional information on interactive elements.
 *
 * @param children - The element that triggers the tooltip
 * @param content - The text content to display in the tooltip (translation key)
 * @param backgroundColor - Tailwind background color (default: 'bg-goos-blue-900')
 * @param textColor - Tailwind text color (default: 'text-white')
 * @param className - Optional additional Tailwind classes
 */

import { useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'

interface TooltipProps {
  children: React.ReactNode
  content: string
  backgroundColor?: string
  textColor?: string
  className?: string
}

export default function Tooltip({
  children,
  content,
  backgroundColor = 'bg-goos-blue-900',
  textColor = 'text-white',
  className = '',
}: TooltipProps) {
  const { t } = useTranslation()
  const [isVisible, setIsVisible] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMouseEnter = () => {
    setIsVisible(true)
  }

  const handleMouseLeave = () => {
    setIsVisible(false)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      setPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }
  }

  return (
    <div
      ref={containerRef}
      className={`relative inline-block ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      {children}

      {isVisible && (
        <div
          className={`absolute z-50 pointer-events-none whitespace-nowrap ${backgroundColor} ${textColor} px-3 py-1.5 text-xs font-roboto-condensed uppercase font-extrabold shadow-lg`}
          style={{
            left: `${position.x + 12}px`,
            top: `${position.y + 12}px`,
          }}
        >
          {t(content)}
        </div>
      )}
    </div>
  )
}
