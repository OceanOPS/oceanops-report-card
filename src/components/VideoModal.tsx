/**
 * VideoModal Component
 *
 * A video component that shows a preview image with play button.
 * Clicking opens a modal with the video (YouTube or local file).
 * Automatically stops video when modal is closed.
 *
 * @param videoType - Type of video: 'youtube' | 'local' (default: 'youtube')
 * @param videoId - YouTube video ID (e.g., 'dQw4w9WgXcQ') or local video URL
 * @param previewImage - Preview/thumbnail image URL (required)
 * @param previewAlt - Alt text for preview image (required)
 * @param caption - Optional caption below preview
 * @param aspectRatio - Aspect ratio: 'video' | 'square' | 'portrait' (default: 'video')
 * @param playButtonColor - Tailwind background color for play button (default: 'bg-goos-orange-500')
 * @param captionColor - Tailwind text color for caption (default: 'text-goos-gray-800')
 * @param className - Optional additional Tailwind classes
 *
 * @example
 * ```tsx
 * // YouTube video
 * <VideoModal
 *   videoType="youtube"
 *   videoId="dQw4w9WgXcQ"
 *   previewImage="/images/video-preview.jpg"
 *   previewAlt="Video preview"
 *   caption="Watch the full presentation"
 * />
 *
 * // Local video file
 * <VideoModal
 *   videoType="local"
 *   videoId="/videos/ocean-research.mp4"
 *   previewImage="/images/preview.jpg"
 *   previewAlt="Ocean research video"
 * />
 * ```
 */

import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useTranslation } from 'react-i18next'
import { gsap } from 'gsap'
import Plyr from 'plyr-react'
import 'plyr-react/plyr.css'

interface VideoModalProps {
  videoType?: 'youtube' | 'local'
  videoId: string
  previewImage: string
  previewAlt: string
  caption?: string
  aspectRatio?: 'video' | 'square' | 'portrait'
  playButtonColor?: string
  captionColor?: string
  className?: string
  // Optional controlled mode
  isOpen?: boolean
  onClose?: () => void
}

export default function VideoModal({
  videoType = 'youtube',
  videoId,
  previewImage,
  previewAlt,
  caption,
  aspectRatio = 'video',
  playButtonColor = 'bg-goos-orange-500',
  captionColor = 'text-goos-gray-800',
  className = '',
  isOpen: controlledIsOpen,
  onClose: controlledOnClose,
}: VideoModalProps) {
  const { t } = useTranslation()
  const [internalIsOpen, setInternalIsOpen] = useState(false)

  // Use controlled or internal state
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen
  const plyrRef = useRef<any>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)

  // Map aspect ratios
  const aspectRatioMap = {
    video: 'aspect-video',
    square: 'aspect-square',
    portrait: 'aspect-[3/4]',
  }

  const aspectClass = aspectRatioMap[aspectRatio]

  // Open modal
  const openModal = () => {
    if (controlledOnClose) {
      // Controlled mode - do nothing, parent handles it
      return
    }
    setInternalIsOpen(true)
  }

  // Close modal and stop video
  const closeModal = () => {
    if (controlledOnClose) {
      controlledOnClose()
    } else {
      setInternalIsOpen(false)
    }

    // Stop local video (Plyr)
    if (videoType === 'local' && plyrRef.current?.plyr) {
      plyrRef.current.plyr.pause()
      plyrRef.current.plyr.currentTime = 0
    }

    // Stop YouTube video by reloading iframe
    if (videoType === 'youtube' && iframeRef.current) {
      const src = iframeRef.current.src
      iframeRef.current.src = ''
      iframeRef.current.src = src
    }
  }

  // Close on ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeModal()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen])

  // Animate modal open/close
  useEffect(() => {
    if (!overlayRef.current || !modalRef.current) return

    // Respect user's motion preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      // No animations - show immediately
      if (isOpen) {
        gsap.set(overlayRef.current, { opacity: 1 })
        gsap.set(modalRef.current, { opacity: 1, scale: 1 })
      }
      return
    }

    if (isOpen) {
      // Animate in
      const tl = gsap.timeline()

      // Overlay fade in
      tl.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.2, ease: 'power2.out' }
      )

      // Modal scale + fade in
      tl.fromTo(
        modalRef.current,
        { opacity: 0, scale: 0.9, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: 'power2.out' },
        '-=0.1' // Overlap slightly with overlay
      )
    }
  }, [isOpen])

  // Build YouTube embed URL
  const youtubeEmbedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0`

  // Plyr options - hide download, pip, and settings
  const plyrOptions = {
    controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'fullscreen'],
    settings: [], // Hide settings menu (removes playback speed)
    autoplay: true,
    clickToPlay: true,
    hideControls: true,
  }

  return (
    <>
      {/* Preview with Play Button - Only show if not controlled */}
      {controlledIsOpen === undefined && (
        <div className={`w-full ${className}`}>
          <div
            className={`relative ${aspectClass} w-full bg-gray-200 flex items-center justify-center overflow-hidden cursor-pointer group`}
            onClick={openModal}
          >
            {/* Preview Image */}
            <img
              src={previewImage}
              alt={previewAlt}
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className={`w-20 h-20 ${playButtonColor} rounded-full flex items-center justify-center shadow-lg hover:opacity-90 transition-opacity`}
              >
                <svg
                  className="w-8 h-8 text-white ml-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Caption */}
          {caption && (
            <p className={`text-sm ${captionColor} mt-2`}>{caption}</p>
          )}
        </div>
      )}

      {/* Modal */}
      {isOpen && createPortal(
        <div
          ref={overlayRef}
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-black bg-opacity-80 p-4"
          onClick={closeModal}
        >
          <div
            ref={modalRef}
            className="relative w-full max-w-5xl max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Video Container */}
            <div className="relative w-full aspect-video bg-black flex items-center justify-center" style={{ maxHeight: '90vh' }}>
              {/* Close Button - Inside video container */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-[100] bg-black bg-opacity-50 rounded-full p-2"
                aria-label={t('common.closeVideo')}
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


              {videoType === 'youtube' ? (
                <iframe
                  ref={iframeRef}
                  src={youtubeEmbedUrl}
                  className="w-full h-full max-h-[90vh]"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="YouTube video player"
                />
              ) : (
                <div className="plyr-video-wrapper aspect-video w-full" style={{
                  maxHeight: '90vh',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <style>{`
                    .plyr-video-wrapper .plyr {
                      width: 100% !important;
                      height: 100% !important;
                      max-height: 90vh !important;
                      --plyr-color-main: #F48B25;
                    }
                    .plyr-video-wrapper .plyr video {
                      width: 100% !important;
                      height: 100% !important;
                      max-height: 90vh !important;
                      object-fit: contain !important;
                    }
                    .plyr-video-wrapper .plyr__video-wrapper {
                      padding-bottom: 0 !important;
                      height: 100% !important;
                    }
                  `}</style>
                  <Plyr
                    ref={plyrRef}
                    source={{
                      type: 'video',
                      sources: [
                        {
                          src: videoId,
                          type: 'video/mp4',
                        },
                      ],
                    }}
                    options={plyrOptions}
                  />
                </div>
              )}
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  )
}
