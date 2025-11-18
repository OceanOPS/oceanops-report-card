/**
 * ImageCaption Component
 *
 * A flexible image component with optional caption/credits below.
 * Supports different aspect ratios and object-fit modes.
 * Designed to be used within ContentModule or other content sections.
 *
 * @param src - Image source URL (required)
 * @param alt - Alt text for the image (required)
 * @param caption - Caption text (author credits, description, etc.) (optional)
 * @param aspectRatio - Aspect ratio: 'video' | 'square' | 'portrait' | 'auto' (default: 'video')
 * @param objectFit - How image should fit: 'cover' | 'contain' | 'fill' (default: 'cover')
 * @param captionColor - Tailwind text color for caption (default: 'text-goos-gray-800')
 * @param className - Optional additional Tailwind classes
 *
 * @example
 * ```tsx
 * <ImageCaption
 *   src={asset("/images/ocean-research.jpg")}
 *   alt="Ocean research vessel"
 *   caption="Photo by John Doe / Ocean Institute"
 * />
 *
 * // Square image with contain fit
 * <ImageCaption
 *   src={asset("/images/logo.png")}
 *   alt="Organization logo"
 *   aspectRatio="square"
 *   objectFit="contain"
 * />
 *
 * // No caption
 * <ImageCaption
 *   src={asset("/images/chart.jpg")}
 *   alt="Data chart"
 * />
 * ```
 */

interface ImageCaptionProps {
  src: string
  alt: string
  caption?: string
  aspectRatio?: 'video' | 'square' | 'portrait' | 'auto'
  objectFit?: 'cover' | 'contain' | 'fill'
  captionColor?: string
  className?: string
}

export default function ImageCaption({
  src,
  alt,
  caption,
  aspectRatio = 'video',
  objectFit = 'cover',
  captionColor = 'text-goos-gray-800',
  className = '',
}: ImageCaptionProps) {
  // Map aspect ratios to Tailwind classes
  const aspectRatioMap = {
    video: 'aspect-video',      // 16:9
    square: 'aspect-square',     // 1:1
    portrait: 'aspect-[3/4]',    // 3:4
    auto: '',                    // No aspect ratio constraint
  }

  const aspectClass = aspectRatioMap[aspectRatio]

  // Map object-fit values
  const objectFitMap = {
    cover: 'object-cover',
    contain: 'object-contain',
    fill: 'object-fill',
  }

  const objectFitClass = objectFitMap[objectFit]

  return (
    <div className={`w-full ${className}`}>
      {/* Image Container */}
      <div className={`w-full ${aspectClass} bg-gray-300 flex items-center justify-center overflow-hidden`}>
        <img
          src={src}
          alt={alt}
          className={`w-full h-full ${objectFitClass}`}
        />
      </div>

      {/* Caption/Credits */}
      {caption && (
        <p className={`text-sm ${captionColor} mt-2 px-4 sm:px-0`}>
          {caption}
        </p>
      )}
    </div>
  )
}
