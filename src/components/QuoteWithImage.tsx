/**
 * QuoteWithImage Component
 *
 * A full-width quote component with an image on one side and quote content on the other.
 * Designed for impactful testimonials and quotes with visual context.
 *
 * @param quote - The main quote text (required)
 * @param authorName - Name of the person quoted (optional)
 * @param authorTitle - Title/position of the person quoted (optional)
 * @param imageSrc - URL of the image to display (optional - if not provided, quote takes full width)
 * @param imageAlt - Alt text for the image (default: '')
 * @param imagePosition - Position of image: 'left' | 'right' (default: 'left')
 * @param height - Height variant: 'fullscreen' | 'auto' (default: 'fullscreen')
 *   - 'fullscreen': Uses full viewport height (h-screen)
 *   - 'auto': Height adapts to content (responsive based on text amount)
 * @param logoSrc - Optional logo image URL
 * @param logoAlt - Alt text for logo (default: 'Logo')
 * @param backgroundColor - Tailwind background color for quote section (default: 'bg-goos-white')
 * @param quoteColor - Tailwind text color for quote text (default: 'text-goos-blue-700')
 * @param authorColor - Tailwind text color for author info (default: 'text-goos-blue-700')
 * @param iconColor - SVG fill color for quote icon (default: 'fill-goos-orange-500')
 * @param showIcon - Show quote icon (default: true)
 * @param className - Optional additional Tailwind classes
 *
 * @example
 * ```tsx
 * // Fullscreen with image on left (default)
 * <QuoteWithImage
 *   quote="In the face of climate change, the global community must work together..."
 *   authorName="Mathieu Belbéoch"
 *   authorTitle="OceanOPS Manager"
 *   imageSrc="/images/ocean-research.jpg"
 *   imageAlt="Ocean research professional"
 *   logoSrc="/logos/oceanops.png"
 *   logoAlt="OceanOPS Logo"
 * />
 *
 * // Auto height with image on right
 * <QuoteWithImage
 *   quote="Ocean observations are critical for understanding our planet."
 *   authorName="Jane Smith"
 *   authorTitle="Marine Scientist"
 *   imageSrc="/images/ocean.jpg"
 *   imagePosition="right"
 *   height="auto"
 *   backgroundColor="bg-goos-blue-900"
 *   quoteColor="text-white"
 *   authorColor="text-white"
 *   iconColor="fill-goos-cyan-500"
 * />
 *
 * // Without logo and icon
 * <QuoteWithImage
 *   quote="The ocean is the heart of our planet."
 *   imageSrc="/images/ocean-waves.jpg"
 *   showIcon={false}
 * />
 *
 * // Without image - full width quote
 * <QuoteWithImage
 *   quote="The ocean connects us all."
 *   authorName="Jane Smith"
 *   authorTitle="Marine Biologist"
 *   backgroundColor="bg-goos-blue-700"
 *   quoteColor="text-white"
 *   authorColor="text-white"
 *   iconColor="fill-goos-orange-500"
 * />
 * ```
 */

interface QuoteWithImageProps {
  quote: string
  authorName?: string
  authorTitle?: string
  imageSrc?: string
  imageAlt?: string
  imagePosition?: 'left' | 'right'
  height?: 'fullscreen' | 'auto'
  logoSrc?: string
  logoAlt?: string
  backgroundColor?: string
  quoteColor?: string
  authorColor?: string
  iconColor?: string
  showIcon?: boolean
  className?: string
}

export default function QuoteWithImage({
  quote,
  authorName,
  authorTitle,
  imageSrc,
  imageAlt = '',
  imagePosition = 'left',
  height = 'fullscreen',
  logoSrc,
  logoAlt = 'Logo',
  backgroundColor = 'bg-goos-white',
  quoteColor = 'text-goos-blue-700',
  authorColor = 'text-goos-blue-700',
  iconColor = 'fill-goos-orange-500',
  showIcon = true,
  className = '',
}: QuoteWithImageProps) {
  // Height class based on variant
  const heightClass = height === 'fullscreen' ? 'h-screen' : 'min-h-[400px]'

  // Image section - 50% width (only if imageSrc is provided)
  const imageSection = imageSrc ? (
    <div className={`w-full lg:w-1/2 relative h-[40vh] lg:h-auto`}>
      <img
        src={imageSrc}
        alt={imageAlt}
        className="absolute inset-0 w-full h-full object-cover"
      />
    </div>
  ) : null

  // Quote content section - 50% width with image, full width without image
  const quoteSection = (
    <div className={`${imageSrc ? 'w-full lg:w-1/2' : 'w-full'} ${backgroundColor} flex items-center justify-center p-6 sm:p-8 md:p-12 lg:p-16 ${height === 'fullscreen' && imageSrc ? 'lg:min-h-screen' : ''}`}>
      <div className="flex flex-col gap-4 sm:gap-5 max-w-[830px]">
        {/* Quote Icon */}
        {showIcon && (
          <div className="w-8 h-7 sm:w-9 sm:h-8 md:w-10 md:h-9">
            <svg viewBox="0 0 39 35" fill="none" xmlns="http://www.w3.org/2000/svg" className={iconColor}>
              <path d="M18.0781 0.233398V10.1631C18.0093 10.1612 17.9403 10.1582 17.8711 10.1582C13.8288 10.1583 10.5413 13.3797 10.4316 17.3955H18.0781V34.9736H0.5V17.3955H0.50293C0.613895 7.89713 8.34643 0.231473 17.8711 0.231445C17.9402 0.231445 18.0092 0.232594 18.0781 0.233398ZM38.5 0.233398V10.1631C38.4313 10.1612 38.3621 10.1582 38.293 10.1582C34.2508 10.1584 30.9632 13.3798 30.8535 17.3955H38.5V34.9736H20.9219V17.3955H20.9248C21.0358 7.89713 28.7683 0.231473 38.293 0.231445C38.3619 0.23145 38.4312 0.232595 38.5 0.233398Z"/>
            </svg>
          </div>
        )}

        {/* Quote Text */}
        <p className={`text-xl sm:text-2xl md:text-3xl font-semibold ${quoteColor} leading-[1.4] font-roboto-condensed`}>
          {quote}
        </p>

        {/* Author Info */}
        {(authorName || authorTitle) && (
          <div className={`flex flex-col ${authorColor}`}>
            {authorName && <p className="text-lg sm:text-xl font-semibold">{authorName}</p>}
            {authorTitle && <p className="text-sm sm:text-base font-normal">{authorTitle}</p>}
          </div>
        )}

        {/* Logo */}
        {logoSrc && (
          <div className="w-40 h-12 sm:w-48 sm:h-14 md:w-52 md:h-16">
            <img
              src={logoSrc}
              alt={logoAlt}
              className="w-full h-full object-contain object-left"
            />
          </div>
        )}
      </div>
    </div>
  )

  return (
    <section className={`${backgroundColor} ${height === 'fullscreen' ? 'min-h-screen' : ''} ${className}`}>
      <div className={`flex w-full ${height === 'fullscreen' ? 'lg:h-screen' : heightClass} flex-col lg:flex-row`}>
        {imageSrc && imagePosition === 'left' && imageSection}
        {quoteSection}
        {imageSrc && imagePosition === 'right' && imageSection}
      </div>
    </section>
  )
}
