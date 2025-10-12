/**
 * QuoteBlock Component
 *
 * A styled quote block with optional attribution (name, title) and logo.
 * Supports two variants: 'quote' (with icon) and 'highlight' (with left border).
 * Designed to be used within ContentModule or other content sections.
 *
 * @param variant - Style variant: 'quote' (icon) or 'highlight' (border) (default: 'quote')
 * @param quote - The quote text (required)
 * @param authorName - Name of the person quoted (optional)
 * @param authorTitle - Title/position of the person quoted (optional)
 * @param logoSrc - URL to organization logo (optional)
 * @param logoAlt - Alt text for logo (optional)
 * @param quoteColor - Tailwind text color for the quote (default: 'text-goos-blue-900')
 * @param authorColor - Tailwind text color for author info (default: 'text-goos-blue-900')
 * @param iconColor - Tailwind fill color class for quote icon (default: 'fill-goos-orange-500')
 * @param borderColor - Tailwind border color class for highlight variant (default: 'border-goos-orange-500')
 * @param className - Optional additional Tailwind classes
 *
 * @example
 * ```tsx
 * // Quote variant with icon
 * <QuoteBlock
 *   variant="quote"
 *   quote="In the face of climate change..."
 *   authorName="Mathieu Belbéoch"
 *   authorTitle="OceanOPS Manager"
 *   logoSrc="/logos/oceanops.png"
 * />
 *
 * // Highlight variant with left border
 * <QuoteBlock
 *   variant="highlight"
 *   quote="This is a highlighted text"
 *   borderColor="border-goos-orange-500"
 * />
 * ```
 */

interface QuoteBlockProps {
  variant?: 'quote' | 'highlight'
  quote: string
  authorName?: string
  authorTitle?: string
  logoSrc?: string
  logoAlt?: string
  quoteColor?: string
  authorColor?: string
  iconColor?: string
  borderColor?: string
  className?: string
}

export default function QuoteBlock({
  variant = 'quote',
  quote,
  authorName,
  authorTitle,
  logoSrc,
  logoAlt = 'Logo',
  quoteColor = 'text-goos-blue-900',
  authorColor = 'text-goos-blue-900',
  iconColor = 'fill-goos-orange-500',
  borderColor = 'border-goos-orange-500',
  className = '',
}: QuoteBlockProps) {
  return (
    <div
      className={`flex flex-col gap-5 max-w-xl ${
        variant === 'highlight' ? `border-l-8 ${borderColor} pl-6` : ''
      } ${className}`}
    >
      {/* Quote Icon - only for 'quote' variant */}
      {variant === 'quote' && (
        <div className="w-10 h-9">
          <svg viewBox="0 0 39 35" fill="none" xmlns="http://www.w3.org/2000/svg" className={iconColor}>
            <path d="M18.0781 0.233398V10.1631C18.0093 10.1612 17.9403 10.1582 17.8711 10.1582C13.8288 10.1583 10.5413 13.3797 10.4316 17.3955H18.0781V34.9736H0.5V17.3955H0.50293C0.613895 7.89713 8.34643 0.231473 17.8711 0.231445C17.9402 0.231445 18.0092 0.232594 18.0781 0.233398ZM38.5 0.233398V10.1631C38.4313 10.1612 38.3621 10.1582 38.293 10.1582C34.2508 10.1584 30.9632 13.3798 30.8535 17.3955H38.5V34.9736H20.9219V17.3955H20.9248C21.0358 7.89713 28.7683 0.231473 38.293 0.231445C38.3619 0.23145 38.4312 0.232595 38.5 0.233398Z"/>
          </svg>
        </div>
      )}

      {/* Quote Text */}
      <p className={`text-3xl font-semibold ${quoteColor} leading-[1.4] font-roboto-condensed`}>
        {quote}
      </p>

      {/* Author Attribution */}
      {(authorName || authorTitle) && (
        <div className={`flex flex-col ${authorColor}`}>
          {authorName && <p className="text-xl font-semibold">{authorName}</p>}
          {authorTitle && <p className="text-base font-normal">{authorTitle}</p>}
        </div>
      )}

      {/* Organization Logo */}
      {logoSrc && (
        <div className="w-52 h-16">
          <img src={logoSrc} alt={logoAlt} className="w-full h-full object-contain object-left" />
        </div>
      )}
    </div>
  )
}
