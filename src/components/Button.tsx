/**
 * Button Component
 *
 * A flexible button component with three variants: external link, video modal, and content modal.
 * Each variant displays a unique icon with circular background (inverted colors).
 *
 * @param variant - Button type: 'link' | 'video' | 'modal'
 * @param label - Button label text (required)
 * @param textColor - Tailwind text color class (default: 'text-white')
 * @param bgColor - Tailwind background color class (default: 'bg-goos-blue-700')
 * @param url - External URL (required for 'link' variant)
 * @param videoType - Video type: 'youtube' | 'local' (required for 'video' variant)
 * @param videoId - YouTube video ID or local video URL (required for 'video' variant)
 * @param previewImage - Preview image URL (required for 'video' variant)
 * @param previewAlt - Preview image alt text (optional for 'video' variant)
 * @param modalTitle - Modal title (optional for 'modal' variant)
 * @param modalContent - Modal content (required for 'modal' variant)
 * @param modalMaxWidth - Modal max width: 'sm' | 'md' | 'lg' | 'xl' | '2xl' (default: 'lg')
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
 * // Video modal button
 * <Button
 *   variant="video"
 *   label="Watch Video"
 *   videoType="youtube"
 *   videoId="dQw4w9WgXcQ"
 *   previewImage="/images/preview.jpg"
 *   textColor="text-white"
 *   bgColor="bg-goos-orange-500"
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

import { ReactNode, useState } from 'react'
import VideoModal from './VideoModal'
import ContentModal from './ContentModal'

type ButtonProps =
  | {
      variant: 'link'
      label: string
      url: string
      textColor?: string
      bgColor?: string
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
      className?: string
    }
  | {
      variant: 'modal'
      label: string
      modalTitle?: string
      modalContent: ReactNode
      modalMaxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
      textColor?: string
      bgColor?: string
      className?: string
    }

export default function Button(props: ButtonProps) {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
  const [isContentModalOpen, setIsContentModalOpen] = useState(false)

  const defaultTextColor = props.textColor || 'text-white'
  const defaultBgColor = props.bgColor || 'bg-goos-blue-700'

  const baseClasses = `inline-flex items-center gap-2 px-5 py-2 ${defaultTextColor} ${defaultBgColor} font-roboto-condensed uppercase text-lg font-semibold hover:opacity-90 transition-opacity ${props.className || ''}`

  // External link button
  if (props.variant === 'link') {
    return (
      <a
        href={props.url}
        target="_blank"
        rel="noopener noreferrer"
        className={baseClasses}
      >
        {props.label}
        {/* Right arrow icon with circular background (inverted colors) */}
        <div className={`w-5 h-5 ${defaultTextColor.replace('text-', 'bg-')} rounded-full flex items-center justify-center`}>
          <svg
            className={`w-3 h-3 ${defaultBgColor.replace('bg-', 'text-')}`}
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
        <button onClick={() => setIsVideoModalOpen(true)} className={baseClasses}>
          {props.label}
          {/* Play icon with circular background (inverted colors) */}
          <div className={`w-5 h-5 ${defaultTextColor.replace('text-', 'bg-')} rounded-full flex items-center justify-center`}>
            <svg
              className={`w-3 h-3 ${defaultBgColor.replace('bg-', 'text-')}`}
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </button>
        <VideoModal
          videoType={props.videoType}
          videoId={props.videoId}
          previewImage={props.previewImage}
          previewAlt={props.previewAlt || props.label}
          isOpen={isVideoModalOpen}
          onClose={() => setIsVideoModalOpen(false)}
        />
      </>
    )
  }

  // Content modal button
  if (props.variant === 'modal') {
    return (
      <>
        <button onClick={() => setIsContentModalOpen(true)} className={baseClasses}>
          {props.label}
          {/* Plus icon with circular background (inverted colors) */}
          <div className={`w-5 h-5 ${defaultTextColor.replace('text-', 'bg-')} rounded-full flex items-center justify-center`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className={`w-3 h-3 ${defaultBgColor.replace('bg-', 'text-')}`}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </div>
        </button>
        <ContentModal
          isOpen={isContentModalOpen}
          onClose={() => setIsContentModalOpen(false)}
          title={props.modalTitle}
          maxWidth={props.modalMaxWidth}
        >
          {props.modalContent}
        </ContentModal>
      </>
    )
  }

  return null
}
