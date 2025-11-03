/**
 * Tooltip Component
 *
 * A small tooltip that follows the cursor on hover.
 * Used for displaying additional information on interactive elements.
 *
 * @param children - The element that triggers the tooltip
 * @param content - The text content to display in the tooltip (can be translation key or plain text)
 * @param backgroundColor - Tailwind background color (default: 'bg-goos-deep-blue')
 * @param textColor - Tailwind text color (default: 'text-goos-white')
 * @param allowHtml - Allow HTML content with clickable links (default: false)
 * @param className - Optional additional Tailwind classes
 */

import { useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'

interface TooltipProps {
  children: React.ReactNode
  content: string
  backgroundColor?: string
  textColor?: string
  allowHtml?: boolean
  className?: string
}

export default function Tooltip({
  children,
  content,
  backgroundColor = 'bg-goos-deep-blue',
  textColor = 'text-goos-white',
  allowHtml = false,
  className = '',
}: TooltipProps) {
  const { t } = useTranslation()
  const [isVisible, setIsVisible] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)

  const handleMouseEnter = () => {
    setIsVisible(true)
  }

  const handleMouseLeave = (e: React.MouseEvent) => {
    // If allowHtml, check if mouse is moving to tooltip
    if (allowHtml && tooltipRef.current) {
      const rect = tooltipRef.current.getBoundingClientRect()
      const mouseX = e.clientX
      const mouseY = e.clientY

      // Give a small buffer to move to tooltip
      if (
        mouseX >= rect.left - 5 &&
        mouseX <= rect.right + 5 &&
        mouseY >= rect.top - 5 &&
        mouseY <= rect.bottom + 5
      ) {
        return // Don't hide if moving to tooltip
      }
    }
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

  const handleTooltipMouseEnter = () => {
    setIsVisible(true)
  }

  const handleTooltipMouseLeave = () => {
    setIsVisible(false)
  }

  // Convert URLs in text to clickable links
  const processContent = (text: string): string => {
    if (!allowHtml) return text

    // Regex to find URLs
    const urlRegex = /(https?:\/\/[^\s,]+)/g
    return text.replace(urlRegex, '<a href="$1" target="_blank" rel="noopener noreferrer" class="underline hover:opacity-80">$1</a>')
  }

  const displayContent = t(content)
  const processedContent = processContent(displayContent)

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
          ref={tooltipRef}
          className={`absolute z-[100] ${allowHtml ? 'pointer-events-auto' : 'pointer-events-none'} w-max max-w-[300px] ${backgroundColor} ${textColor} px-3 py-2 text-sm shadow-lg leading-normal`}
          style={{
            left: `${position.x + 12}px`,
            top: `${position.y + 12}px`,
          }}
          onMouseEnter={allowHtml ? handleTooltipMouseEnter : undefined}
          onMouseLeave={allowHtml ? handleTooltipMouseLeave : undefined}
        >
          {allowHtml ? (
            <div dangerouslySetInnerHTML={{ __html: processedContent }} />
          ) : (
            <span className="font-roboto-condensed">{displayContent}</span>
          )}
        </div>
      )}
    </div>
  )
}
