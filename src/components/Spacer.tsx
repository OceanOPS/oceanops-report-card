/**
 * Spacer Component
 *
 * A simple spacer component to add vertical spacing between modules.
 * Provides preset sizes and custom height option.
 *
 * @param size - Preset size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' (optional)
 * @param height - Custom height in pixels or Tailwind spacing (overrides size)
 * @param backgroundColor - Tailwind background color class (default: transparent)
 * @param className - Optional additional Tailwind classes
 *
 * Preset sizes:
 * - xs: 1rem (16px)
 * - sm: 2rem (32px)
 * - md: 4rem (64px)
 * - lg: 6rem (96px)
 * - xl: 8rem (128px)
 * - 2xl: 10rem (160px)
 *
 * @example
 * ```tsx
 * // Using preset size
 * <Spacer size="md" />
 *
 * // Using custom height with pixels
 * <Spacer height="100px" />
 *
 * // Using custom height with Tailwind spacing
 * <Spacer height="h-24" />
 *
 * // With background color to match surrounding modules
 * <Spacer size="lg" backgroundColor="bg-goos-blue-900" />
 * ```
 */

interface SpacerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  height?: string
  backgroundColor?: string
  className?: string
}

export default function Spacer({ size = 'md', height, backgroundColor = '', className = '' }: SpacerProps) {
  // Preset size mappings with responsive values
  const sizeMap = {
    xs: 'h-2 sm:h-3 md:h-4',        // 8px -> 12px -> 16px
    sm: 'h-4 sm:h-6 md:h-8',        // 16px -> 24px -> 32px
    md: 'h-6 sm:h-10 md:h-16',      // 24px -> 40px -> 64px
    lg: 'h-8 sm:h-12 md:h-24',      // 32px -> 48px -> 96px
    xl: 'h-12 sm:h-20 md:h-32',     // 48px -> 80px -> 128px
    '2xl': 'h-16 sm:h-28 md:h-40',  // 64px -> 112px -> 160px
  }

  // If custom height is provided, use it; otherwise use preset size
  const heightClass = height ? (height.startsWith('h-') ? height : '') : sizeMap[size]
  const customStyle = height && !height.startsWith('h-') ? { height } : undefined

  return <div className={`w-full ${heightClass} ${backgroundColor} ${className}`} style={customStyle} />
}
