/**
 * ColorStripes Component
 *
 * A full-width, full-height module displaying vertical color stripes.
 * Each stripe takes up equal width within the container.
 *
 * @param stripeColors - Array of Tailwind background colors for each stripe (required)
 * @param className - Optional additional classes for the container
 *
 * @example
 * ```tsx
 * <ColorStripes stripeColors={['bg-goos-cyan-600', 'bg-goos-cyan-500', 'bg-goos-cyan-400']} />
 * ```
 */

interface ColorStripesProps {
  stripeColors: string[]
  className?: string
}

export default function ColorStripes({
  stripeColors,
  className = '',
}: ColorStripesProps) {
  return (
    <div className={`w-full h-screen flex flex-row ${className}`}>
      {stripeColors.map((color, index) => (
        <div
          key={index}
          className={`${color} h-full flex-1`}
        />
      ))}
    </div>
  )
}
