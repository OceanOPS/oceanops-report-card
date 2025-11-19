/**
 * CarouselArrow Component
 *
 * Navigation arrow for carousels, supports left and right directions.
 *
 * @param direction - Arrow direction: 'left' or 'right'
 * @param color - Fill color for the arrow (default: '#F0F0F0')
 * @param onClick - Click handler function
 * @param className - Optional additional Tailwind classes
 *
 * @example
 * ```tsx
 * <CarouselArrow
 *   direction="right"
 *   color="#FF6B35"
 *   onClick={() => console.log('Next')}
 * />
 * ```
 */

interface CarouselArrowProps {
  direction: 'left' | 'right'
  color?: string
  onClick?: () => void
  className?: string
}

export default function CarouselArrow({
  direction,
  color = '#F0F0F0',
  onClick,
  className = '',
}: CarouselArrowProps) {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer transition-opacity hover:opacity-70 ${className}`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick?.()
        }
      }}
    >
      <svg
        width="38"
        height="38"
        viewBox="0 0 38 38"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={direction === 'left' ? 'rotate-180' : ''}
      >
        <path
          d="M19 0C29.4934 6.44258e-08 38 8.50659 38 19C38 29.4934 29.4934 38 19 38C8.50659 38 6.44299e-08 29.4934 0 19C0 8.50659 8.50659 0 19 0ZM19 2.23535C9.74111 2.23535 2.23535 9.74111 2.23535 19C2.23535 28.2589 9.74111 35.7646 19 35.7646C28.2589 35.7646 35.7646 28.2589 35.7646 19C35.7646 9.74111 28.2589 2.23535 19 2.23535ZM20.04 11.0967C20.4763 10.6604 21.1836 10.6608 21.6201 11.0967L28.7334 18.21C29.1699 18.6464 29.1699 19.3536 28.7334 19.79L21.6201 26.9033C21.1836 27.3392 20.4763 27.3396 20.04 26.9033C19.6038 26.4671 19.6042 25.7598 20.04 25.3232L25.2451 20.1172H10.0605C9.4435 20.1169 8.94336 19.6171 8.94336 19C8.94337 18.3829 9.4435 17.8831 10.0605 17.8828H25.2451L20.04 12.6768C19.6042 12.2402 19.6038 11.5329 20.04 11.0967Z"
          fill={color}
        />
      </svg>
    </div>
  )
}
