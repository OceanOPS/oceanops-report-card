/**
 * ImageGrid Component
 *
 * A flexible grid component that displays images in equal columns with no gaps.
 * Each image maintains a square aspect ratio and covers its container.
 *
 * @param images - Array of image objects with src and alt text
 * @param columns - Number of columns (1-6, default: 3)
 * @param backgroundColor - Tailwind background color class (default: 'bg-goos-white')
 * @param className - Optional Tailwind classes for custom styling
 *
 * @example
 * ```tsx
 * // 3-column grid
 * <ImageGrid
 *   images={[
 *     { src: '/images/photo1.jpg', alt: 'Photo 1' },
 *     { src: '/images/photo2.jpg', alt: 'Photo 2' },
 *     { src: '/images/photo3.jpg', alt: 'Photo 3' }
 *   ]}
 *   columns={3}
 * />
 *
 * // 2-column grid with custom background
 * <ImageGrid
 *   images={[...]}
 *   columns={2}
 *   backgroundColor="bg-goos-blue-900"
 * />
 * ```
 */

interface ImageGridImage {
  src: string
  alt: string
}

interface ImageGridProps {
  images: ImageGridImage[]
  columns?: 1 | 2 | 3 | 4 | 5 | 6
  backgroundColor?: string
  className?: string
}

export default function ImageGrid({
  images,
  columns = 3,
  backgroundColor = 'bg-goos-white',
  className = '',
}: ImageGridProps) {
  // Generate grid column classes based on columns prop
  const gridColsClass = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-5',
    6: 'grid-cols-6',
  }[columns]

  return (
    <section className={`${backgroundColor} ${className}`}>
      <div className={`grid ${gridColsClass} gap-0 w-full`}>
        {images.map((image, index) => (
          <div key={index} className="relative aspect-square">
            <img
              src={image.src}
              alt={image.alt}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  )
}
