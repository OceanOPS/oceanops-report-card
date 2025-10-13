/**
 * Spacer Component
 *
 * A simple spacer component to add vertical spacing between modules.
 * Provides preset sizes and custom height option.
 *
 * @param size - Preset size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' (optional)
 * @param height - Custom height in pixels or Tailwind spacing (overrides size)
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
 * ```
 */

interface SpacerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  height?: string
  className?: string
}

export default function Spacer({ size = 'md', height, className = '' }: SpacerProps) {
  // Preset size mappings
  const sizeMap = {
    xs: 'h-4',   // 1rem / 16px
    sm: 'h-8',   // 2rem / 32px
    md: 'h-16',  // 4rem / 64px
    lg: 'h-24',  // 6rem / 96px
    xl: 'h-32',  // 8rem / 128px
    '2xl': 'h-40', // 10rem / 160px
  }

  // If custom height is provided, use it; otherwise use preset size
  const heightClass = height ? (height.startsWith('h-') ? height : '') : sizeMap[size]
  const customStyle = height && !height.startsWith('h-') ? { height } : undefined

  return <div className={`w-full ${heightClass} ${className}`} style={customStyle} />
}
