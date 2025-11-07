/**
 * EmergingNetworkCard Component
 *
 * A horizontal card component for emerging networks with media on the left and content on the right.
 * Supports three media types: single image, image gallery, or video with interactive overlays.
 *
 * @param mediaType - Type of media: 'image' | 'gallery' | 'video' (required)
 * @param imageSrc - URL to single image (for mediaType='image') (optional)
 * @param imageAlt - Alt text for image (translatable key) (optional)
 * @param images - Array of images for gallery (for mediaType='gallery') (optional)
 * @param videoType - Type of video: 'youtube' | 'local' (for mediaType='video') (optional)
 * @param videoId - YouTube video ID or local video URL (for mediaType='video') (optional)
 * @param previewImage - Preview/thumbnail for video (for mediaType='video') (optional)
 * @param iconSrc - URL to network icon (required)
 * @param iconAlt - Alt text for icon (translatable key) (required)
 * @param titleKey - Translation key for network title (required)
 * @param descriptionKey - Translation key for description text (required)
 * @param modalTitle - Title for the modal (translatable key) (required)
 * @param modalContent - React node content for the modal (required)
 * @param viewMoreTextKey - Translation key for "View More" button text (required)
 * @param deliveryAreasLabelKey - Translation key for "GOOS delivery areas" label text (required)
 * @param deliveryAreas - Array of 1-3 delivery area keys: 'climate', 'operational', 'oceanhealth' (required)
 * @param backgroundColor - Tailwind background color (default: 'bg-goos-blue-800')
 * @param textColor - Tailwind text color (default: 'text-white')
 * @param buttonBgColor - Tailwind background color for button (default: 'bg-goos-white')
 * @param buttonTextColor - Tailwind text color for button (default: 'text-goos-deep-blue')
 * @param buttonIconBgColor - Tailwind background color for button icon (default: 'bg-goos-deep-blue')
 * @param buttonIconColor - Tailwind text color for button icon SVG (default: 'text-goos-white')
 * @param tooltipBgColor - Tailwind background color for tooltip (default: 'bg-goos-blue-900')
 * @param tooltipTextColor - Tailwind text color for tooltip (default: 'text-white')
 * @param overlayIconColor - Tailwind background color for overlay play/gallery icons (default: 'bg-goos-orange-500')
 * @param className - Optional additional Tailwind classes
 *
 * @example
 * ```tsx
 * // Single image
 * <EmergingNetworkCard
 *   mediaType="image"
 *   imageSrc="/images/smart-cables.jpg"
 *   imageAlt="emerging.smartCables.imageAlt"
 *   // ... other props
 * />
 *
 * // Image gallery
 * <EmergingNetworkCard
 *   mediaType="gallery"
 *   images={[
 *     { src: '/images/1.jpg', alt: 'Image 1', caption: 'Caption 1' },
 *     { src: '/images/2.jpg', alt: 'Image 2' }
 *   ]}
 *   // ... other props
 * />
 *
 * // Video
 * <EmergingNetworkCard
 *   mediaType="video"
 *   videoType="youtube"
 *   videoId="dQw4w9WgXcQ"
 *   previewImage="/images/preview.jpg"
 *   // ... other props
 * />
 * ```
 */

import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { createPortal } from 'react-dom'
import Button from './Button'
import Tooltip from './Tooltip'
import { GalleryImage } from './ImageGallery'
import ContentModal from './ContentModal'

// Reuse the same delivery areas configuration from NetworkCard
const DELIVERY_AREAS_CONFIG = {
  climate: {
    icon: '/icons/climate.png',
    labelKey: 'networks.deliveryAreas.climate',
  },
  operational: {
    icon: '/icons/operational_services.png',
    labelKey: 'networks.deliveryAreas.operational',
  },
  oceanhealth: {
    icon: '/icons/ocean_health.png',
    labelKey: 'networks.deliveryAreas.oceanhealth',
  },
} as const

type DeliveryAreaKey = keyof typeof DELIVERY_AREAS_CONFIG

interface EmergingNetworkCardProps {
  // Media configuration
  mediaType: 'image' | 'gallery' | 'video'
  // For single image
  imageSrc?: string
  imageAlt?: string
  // For gallery
  images?: GalleryImage[]
  modalTitle?: string
  modalContent?: React.ReactNode
  // For video
  videoType?: 'youtube' | 'local'
  videoId?: string
  previewImage?: string
  // Common props
  iconSrc: string
  iconAlt: string
  titleKey: string
  paragraph1Key: string
  paragraph2Key: string
  deliveryAreasLabelKey: string
  deliveryAreas: DeliveryAreaKey[]
  // Optional external link
  externalLinkUrl?: string
  externalLinkTextKey?: string
  backgroundColor?: string
  textColor?: string
  buttonBgColor?: string
  buttonTextColor?: string
  buttonIconBgColor?: string
  buttonIconColor?: string
  tooltipBgColor?: string
  tooltipTextColor?: string
  overlayIconColor?: string
  className?: string
}

export default function EmergingNetworkCard({
  mediaType,
  imageSrc,
  imageAlt,
  images,
  modalTitle,
  modalContent,
  videoType,
  videoId,
  previewImage,
  iconSrc,
  iconAlt,
  titleKey,
  paragraph1Key,
  paragraph2Key,
  deliveryAreasLabelKey,
  deliveryAreas,
  externalLinkUrl,
  externalLinkTextKey,
  backgroundColor = 'bg-goos-blue-800',
  textColor = 'text-white',
  buttonBgColor = 'bg-goos-white',
  buttonTextColor = 'text-goos-deep-blue',
  buttonIconBgColor = 'bg-goos-deep-blue',
  buttonIconColor = 'text-goos-white',
  tooltipBgColor = 'bg-goos-blue-900',
  tooltipTextColor = 'text-white',
  overlayIconColor = 'bg-goos-orange-500',
  className = '',
}: EmergingNetworkCardProps) {
  const { t } = useTranslation()
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false)
  const [isContentModalOpen, setIsContentModalOpen] = useState(false)

  // Limit delivery areas to 1-3
  const limitedAreas = deliveryAreas.slice(0, 3)

  // Get first sentence from paragraph
  const getFirstSentence = (text: string) => {
    // Remove HTML tags for sentence detection
    const plainText = text.replace(/<[^>]*>/g, '')
    // Find first sentence ending with . ! or ?
    const match = plainText.match(/^[^.!?]+[.!?]/)
    return match ? match[0] : plainText.substring(0, 200) // Fallback to 200 chars
  }

  const truncatedText = getFirstSentence(t(paragraph1Key))

  // Get the preview image for the media section
  const getPreviewImageSrc = () => {
    if (mediaType === 'image') return imageSrc || ''
    if (mediaType === 'gallery') return images?.[0]?.src || imageSrc || ''
    if (mediaType === 'video') return previewImage || ''
    return ''
  }

  return (
    <article className={`${backgroundColor} flex w-full h-full overflow-hidden ${className}`}>
      {/* Left Section - Media */}
      <div className="flex-1 relative">
        {/* Preview Image */}
        <img
          src={getPreviewImageSrc()}
          alt={t(imageAlt || images?.[0]?.alt || 'Media preview')}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Overlay for gallery or video */}
        {(mediaType === 'gallery' || mediaType === 'video') && (
          <div
            className="absolute inset-0 flex items-center justify-center cursor-pointer group"
            onClick={() => setIsMediaModalOpen(true)}
          >
            {/* Semi-transparent overlay on hover */}
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity" />

            {/* Icon */}
            <div className={`relative z-10 w-20 h-20 ${overlayIconColor} rounded-full flex items-center justify-center shadow-lg hover:opacity-90 transition-opacity`}>
              {mediaType === 'video' ? (
                // Play icon for video
                <svg
                  className="w-8 h-8 text-white ml-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              ) : (
                // Gallery icon (overlapping images)
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 23 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18.5 3.25H22.25V21.75H3.75V18.5H0V0H18.5V3.25ZM18.5 18.5H5.75V19.75H20.25V5.25H18.5V18.5Z"
                    fill="#F0F0F0"
                  />
                </svg>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Right Section - Content */}
      <div className="flex-1 flex flex-col justify-center">
        <div className="px-12 py-16 space-y-8">
          {/* Header Section */}
          <div className="space-y-5">
            {/* Network Icon */}
            <div className="w-[85px] h-[72px]">
              <img
                src={iconSrc}
                alt={t(iconAlt)}
                className="object-contain"
              />
            </div>

            {/* Title */}
            <h2 className={`${textColor} text-2xl font-extrabold leading-9`}>
              {t(titleKey)}
            </h2>
          </div>

          {/* Description - First sentence with inline more link */}
          <p className={`${textColor} text-lg leading-6`}>
            {truncatedText}..{' '}
            <button
              onClick={() => setIsContentModalOpen(true)}
              className="text-goos-orange-500 hover:underline cursor-pointer"
            >
              more
            </button>
          </p>

          {/* External Link Button (if provided) */}
          {externalLinkUrl && externalLinkTextKey && (
            <div className="flex">
              <Button
                variant="link"
                label={t(externalLinkTextKey)}
                url={externalLinkUrl}
                bgColor={buttonBgColor}
                textColor={buttonTextColor}
                iconBgColor={buttonIconBgColor}
                iconColor={buttonIconColor}
              />
            </div>
          )}

          {/* GOOS Delivery Areas */}
          <div className="space-y-4">
            <p className={`${textColor} text-sm`}>{t(deliveryAreasLabelKey)}:</p>

            <div className="flex gap-4">
              {limitedAreas.map((areaKey) => {
                const area = DELIVERY_AREAS_CONFIG[areaKey]
                return (
                  <Tooltip
                    key={areaKey}
                    content={area.labelKey}
                    backgroundColor={tooltipBgColor}
                    textColor={tooltipTextColor}
                  >
                    <div className="bg-goos-cyan-200 rounded-full p-2 w-14 h-14 flex items-center justify-center cursor-pointer transition-transform hover:scale-110">
                      <img
                        src={area.icon}
                        alt={t(area.labelKey)}
                        className="object-contain"
                      />
                    </div>
                  </Tooltip>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Media Modal - Gallery uses ContentModal, Video uses simple modal */}
      {mediaType === 'gallery' && createPortal(
        <ContentModal
          isOpen={isMediaModalOpen}
          onClose={() => setIsMediaModalOpen(false)}
          title={modalTitle ? t(modalTitle) : ''}
          maxWidth="2xl"
        >
          {modalContent}
        </ContentModal>,
        document.body
      )}

      {mediaType === 'video' && isMediaModalOpen && videoId && videoType && createPortal(
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-80 p-4"
          onClick={() => setIsMediaModalOpen(false)}
        >
          <div
            className="relative w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsMediaModalOpen(false)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-10"
              aria-label="Close video"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Video Container */}
            <div className="aspect-video w-full bg-black">
              {videoType === 'youtube' ? (
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0`}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="YouTube video player"
                />
              ) : (
                <video
                  src={videoId}
                  controls
                  autoPlay
                  className="w-full h-full"
                >
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Content Modal - Full text */}
      {createPortal(
        <ContentModal
          isOpen={isContentModalOpen}
          onClose={() => setIsContentModalOpen(false)}
          title="Emerging Networks"
          maxWidth="lg"
        >
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-goos-blue-700">{t(titleKey)}</h3>
            <p
              className="text-base leading-6"
              dangerouslySetInnerHTML={{ __html: t(paragraph1Key) }}
            />
            <p className="text-base leading-6">
              {t(paragraph2Key)}
            </p>
          </div>
        </ContentModal>,
        document.body
      )}
    </article>
  )
}
