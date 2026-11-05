/**
 * Tooltip Component
 *
 * A small tooltip that follows the cursor on hover.
 * Used for displaying additional information on interactive elements.
 *
 * @param children - The element that triggers the tooltip
 * @param content - The text content to display in the tooltip (can be translation key or plain text)
 * @param backgroundColor - Tailwind background color (default: 'bg-goos-blue-900')
 * @param textColor - Tailwind text color (default: 'text-goos-white')
 * @param allowHtml - Allow HTML content with clickable links (default: false)
 * @param className - Optional additional Tailwind classes
 */

import { useState, useRef, ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

interface TooltipProps {
  children: React.ReactNode
  content?: string
  contentNode?: ReactNode
  backgroundColor?: string
  textColor?: string
  allowHtml?: boolean
  className?: string
  maxWidthClass?: string
  /** Tooltip anchor relative to cursor (default: right). */
  placement?: 'left' | 'right'
}

export default function Tooltip({
  children,
  content,
  contentNode,
  backgroundColor = 'bg-goos-blue-900',
  textColor = 'text-goos-white',
  allowHtml = false,
  className = '',
  maxWidthClass = 'max-w-[300px]',
  placement = 'right',
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
    const interactive = allowHtml || Boolean(contentNode)
    if (interactive && tooltipRef.current) {
      const rect = tooltipRef.current.getBoundingClientRect()
      const mouseX = e.clientX
      const mouseY = e.clientY

      if (
        mouseX >= rect.left - 5 &&
        mouseX <= rect.right + 5 &&
        mouseY >= rect.top - 5 &&
        mouseY <= rect.bottom + 5
      ) {
        return
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

  const displayContent = content ? t(content) : ''
  const processedContent = processContent(displayContent)
  const hasTooltip = Boolean(contentNode ?? content)

  const tooltipOffset = 12
  const tooltipStyle =
    placement === 'left'
      ? {
          left: `${position.x - tooltipOffset}px`,
          top: `${position.y + tooltipOffset}px`,
          transform: 'translateX(-100%)',
        }
      : {
          left: `${position.x + tooltipOffset}px`,
          top: `${position.y + tooltipOffset}px`,
        }

  return (
    <div
      ref={containerRef}
      className={`relative inline-block ${className}`}
      onMouseEnter={hasTooltip ? handleMouseEnter : undefined}
      onMouseLeave={hasTooltip ? handleMouseLeave : undefined}
      onMouseMove={hasTooltip ? handleMouseMove : undefined}
    >
      {children}

      {isVisible && hasTooltip && (
        <div
          ref={tooltipRef}
          className={`absolute z-[100] ${allowHtml || contentNode ? 'pointer-events-auto' : 'pointer-events-none'} w-max ${maxWidthClass} ${backgroundColor} ${textColor} px-3 py-2.5 text-sm shadow-lg leading-normal rounded border border-goos-blue-700`}
          style={tooltipStyle}
          onMouseEnter={allowHtml || contentNode ? handleTooltipMouseEnter : undefined}
          onMouseLeave={allowHtml || contentNode ? handleTooltipMouseLeave : undefined}
        >
          {contentNode ? (
            contentNode
          ) : allowHtml ? (
            <div dangerouslySetInnerHTML={{ __html: processedContent }} />
          ) : (
            <span className="font-roboto-condensed">{displayContent}</span>
          )}
        </div>
      )}
    </div>
  )
}
