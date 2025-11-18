/**
 * Button Component
 *
 * A flexible button component with three variants: external link, video modal, and content modal.
 * Each variant displays a unique icon with circular background.
 *
 * @param variant - Button type: 'link' | 'video' | 'modal'
 * @param label - Button label text (required)
 * @param textColor - Tailwind text color class (default: 'text-white')
 * @param bgColor - Tailwind background color class (default: 'bg-goos-blue-700')
 * @param iconColor - Tailwind text color class for the icon (default: inverted bgColor)
 * @param iconBgColor - Tailwind background color class for the icon circle (default: inverted textColor)
 * @param url - External URL (required for 'link' variant)
 * @param videoType - Video type: 'youtube' | 'local' (required for 'video' variant)
 * @param videoId - YouTube video ID or local video URL (required for 'video' variant)
 * @param previewImage - Preview image URL (required for 'video' variant)
 * @param previewAlt - Preview image alt text (optional for 'video' variant)
 * @param modalTitle - Modal title (optional for 'modal' variant)
 * @param modalContent - Modal content (required for 'modal' variant)
 * @param modalMaxWidth - Modal max width: 'sm' | 'md' | 'lg' | 'xl' | '2xl' (default: 'lg')
 * @param modalBackgroundColor - Tailwind background color class for modal (default: 'bg-goos-white')
 * @param className - Optional additional Tailwind classes
 *
 * @example
 * ```tsx
 * // External link button
 * <Button
 *   variant="link"
 *   label="View Report"
 *   url="https://example.com"
 *   textColor="text-white"
 *   bgColor="bg-goos-blue-700"
 * />
 *
 * // Video modal button with custom icon colors
 * <Button
 *   variant="video"
 *   label="Watch Video"
 *   videoType="youtube"
 *   videoId="dQw4w9WgXcQ"
 *   previewImage="/images/preview.jpg"
 *   textColor="text-white"
 *   bgColor="bg-goos-orange-500"
 *   iconColor="text-goos-blue-700"
 *   iconBgColor="bg-white"
 * />
 *
 * // Content modal button
 * <Button
 *   variant="modal"
 *   label="Learn More"
 *   modalTitle="Additional Information"
 *   modalContent={<div>Your content here</div>}
 *   textColor="text-white"
 *   bgColor="bg-goos-green-700"
 * />
 * ```
 */

import { ReactNode, useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { gsap } from 'gsap'
import VideoModal from './VideoModal'
import ContentModal from './ContentModal'

type ButtonProps =
  | {
      variant: 'link'
      label: string
      url: string
      textColor?: string
      bgColor?: string
      iconColor?: string
      iconBgColor?: string
      className?: string
    }
  | {
      variant: 'video'
      label: string
      videoType: 'youtube' | 'local'
      videoId: string
      previewImage: string
      previewAlt?: string
      textColor?: string
      bgColor?: string
      iconColor?: string
      iconBgColor?: string
      className?: string
    }
  | {
      variant: 'modal'
      label: string
      modalTitle?: string
      modalContent: ReactNode
      modalMaxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
      modalBackgroundColor?: string
      textColor?: string
      bgColor?: string
      iconColor?: string
      iconBgColor?: string
      className?: string
    }
  | {
      variant: 'action'
      label: string
      onClick: () => void
      textColor?: string
      bgColor?: string
      iconColor?: string
      iconBgColor?: string
      className?: string
    }
  | {
      variant: 'download'
      label: string
      onClick: () => void
      textColor?: string
      bgColor?: string
      iconColor?: string
      iconBgColor?: string
      className?: string
    }

export default function Button(props: ButtonProps) {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
  const [isContentModalOpen, setIsContentModalOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null)
  const iconRef = useRef<HTMLDivElement>(null)

  const defaultTextColor = props.textColor || 'text-white'
  const defaultBgColor = props.bgColor || 'bg-goos-blue-700'

  // Icon colors: use custom colors if provided, otherwise invert button colors
  const iconColor = props.iconColor || defaultBgColor.replace('bg-', 'text-')
  const iconBgColor = props.iconBgColor || defaultTextColor.replace('text-', 'bg-')

  const baseClasses = `inline-flex items-center gap-2 px-4 sm:px-5 py-2 ${defaultTextColor} ${defaultBgColor} font-roboto-condensed uppercase text-base sm:text-lg font-semibold transition-all cursor-pointer ${props.className || ''}`

  // Hover animation with GSAP
  useEffect(() => {
    if (!buttonRef.current || !iconRef.current) return

    // Respect user's motion preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      // No hover animations
      return
    }

    const button = buttonRef.current
    const icon = iconRef.current

    const handleMouseEnter = () => {
      gsap.to(button, {
        y: -2,
        duration: 0.2,
        ease: 'power2.out',
      })
      gsap.to(icon, {
        scale: 1.1,
        duration: 0.2,
        ease: 'back.out(2)',
      })
    }

    const handleMouseLeave = () => {
      gsap.to(button, {
        y: 0,
        duration: 0.2,
        ease: 'power2.out',
      })
      gsap.to(icon, {
        scale: 1,
        duration: 0.2,
        ease: 'power2.out',
      })
    }

    button.addEventListener('mouseenter', handleMouseEnter)
    button.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      button.removeEventListener('mouseenter', handleMouseEnter)
      button.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  // External link button
  if (props.variant === 'link') {
    return (
      <a
        ref={buttonRef as React.RefObject<HTMLAnchorElement>}
        href={props.url}
        target="_blank"
        rel="noopener noreferrer"
        className={baseClasses}
      >
        {props.label}
        {/* Right arrow icon with circular background */}
        <div ref={iconRef} className={`w-5 h-5 ${iconBgColor} rounded-full flex items-center justify-center`}>
          <svg
            className={`w-3 h-3 ${iconColor}`}
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
          </svg>
        </div>
      </a>
    )
  }

  // Video modal button
  if (props.variant === 'video') {
    return (
      <>
        <button ref={buttonRef as React.RefObject<HTMLButtonElement>} onClick={() => setIsVideoModalOpen(true)} className={baseClasses}>
          {props.label}
          {/* Play icon with circular background */}
          <div ref={iconRef} className={`w-5 h-5 ${iconBgColor} rounded-full flex items-center justify-center`}>
            <svg
              className={`w-3 h-3 ${iconColor}`}
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </button>
        {createPortal(
          <VideoModal
            videoType={props.videoType}
            videoId={props.videoId}
            previewImage={props.previewImage}
            previewAlt={props.previewAlt || props.label}
            isOpen={isVideoModalOpen}
            onClose={() => setIsVideoModalOpen(false)}
          />,
          document.body
        )}
      </>
    )
  }

  // Content modal button
  if (props.variant === 'modal') {
    return (
      <>
        <button ref={buttonRef as React.RefObject<HTMLButtonElement>} onClick={() => setIsContentModalOpen(true)} className={baseClasses}>
          {props.label}
          {/* Plus icon with circular background */}
          <div ref={iconRef} className={`w-5 h-5 ${iconBgColor} rounded-full flex items-center justify-center`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className={`w-3 h-3 ${iconColor}`}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </div>
        </button>
        {createPortal(
          <ContentModal
            isOpen={isContentModalOpen}
            onClose={() => setIsContentModalOpen(false)}
            title={props.modalTitle}
            maxWidth={props.modalMaxWidth}
            backgroundColor={props.modalBackgroundColor}
          >
            {props.modalContent}
          </ContentModal>,
          document.body
        )}
      </>
    )
  }

  // Action button (custom onClick with plus icon)
  if (props.variant === 'action') {
    return (
      <button ref={buttonRef as React.RefObject<HTMLButtonElement>} onClick={props.onClick} className={baseClasses}>
        {props.label}
        {/* Plus icon with circular background */}
        <div ref={iconRef} className={`w-5 h-5 ${iconBgColor} rounded-full flex items-center justify-center`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className={`w-3 h-3 ${iconColor}`}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </div>
      </button>
    )
  }

  // Download button (custom onClick with chevron down icon)
  if (props.variant === 'download') {
    return (
      <button ref={buttonRef as React.RefObject<HTMLButtonElement>} onClick={props.onClick} className={baseClasses}>
        {props.label}
        {/* Chevron down icon with circular background */}
        <div ref={iconRef} className={`w-5 h-5 ${iconBgColor} rounded-full flex items-center justify-center`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className={`w-3 h-3 ${iconColor}`}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </div>
      </button>
    )
  }

  return null
}
