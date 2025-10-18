/**
 * ImageGallery Component
 *
 * An interactive image gallery with navigation arrows and Instagram-style dot indicators.
 * Supports multiple images with optional captions.
 * Designed to be used within ContentModule or other content sections.
 *
 * @param images - Array of image objects with src, alt, and optional caption
 * @param aspectRatio - Aspect ratio: 'video' | 'square' | 'portrait' | 'auto' (default: 'video')
 * @param objectFit - How image should fit: 'cover' | 'contain' | 'fill' (default: 'cover')
 * @param captionColor - Tailwind text color for caption (default: 'text-goos-gray-800')
 * @param arrowColor - Tailwind text color for arrows (default: 'text-goos-white')
 * @param arrowBgColor - Tailwind background color for arrow buttons (default: 'bg-goos-blue-700')
 * @param dotColor - Tailwind background color for inactive dots (default: 'bg-gray-400')
 * @param activeDotColor - Tailwind background color for active dot (default: 'bg-goos-orange-500')
 * @param className - Optional additional Tailwind classes
 *
 * @example
 * ```tsx
 * <ImageGallery
 *   images={[
 *     { src: '/images/1.jpg', alt: 'Image 1', caption: 'First image' },
 *     { src: '/images/2.jpg', alt: 'Image 2', caption: 'Second image' },
 *     { src: '/images/3.jpg', alt: 'Image 3' }
 *   ]}
 * />
 * ```
 */

import { useState } from 'react'

export interface GalleryImage {
  src: string
  alt: string
  caption?: string
}

interface ImageGalleryProps {
  images: GalleryImage[]
  aspectRatio?: 'video' | 'square' | 'portrait' | 'auto'
  objectFit?: 'cover' | 'contain' | 'fill'
  captionColor?: string
  arrowColor?: string
  arrowBgColor?: string
  dotColor?: string
  activeDotColor?: string
  className?: string
}

export default function ImageGallery({
  images,
  aspectRatio = 'video',
  objectFit = 'cover',
  captionColor = 'text-goos-gray-800',
  arrowColor = 'text-goos-white',
  arrowBgColor = 'bg-goos-blue-700',
  dotColor = 'bg-gray-400',
  activeDotColor = 'bg-goos-orange-500',
  className = '',
}: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Handle navigation
  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const goToIndex = (index: number) => {
    setCurrentIndex(index)
  }

  // Map aspect ratios to Tailwind classes
  const aspectRatioMap = {
    video: 'aspect-video',
    square: 'aspect-square',
    portrait: 'aspect-[3/4]',
    auto: '',
  }

  const aspectClass = aspectRatioMap[aspectRatio]

  // Map object-fit values
  const objectFitMap = {
    cover: 'object-cover',
    contain: 'object-contain',
    fill: 'object-fill',
  }

  const objectFitClass = objectFitMap[objectFit]

  const currentImage = images[currentIndex]

  // Only show navigation if more than 1 image
  const showNavigation = images.length > 1

  return (
    <div className={`bg-goos-white w-full ${className}`}>
      {/* Image Container with Navigation */}
      <div className={`relative w-full ${aspectClass} bg-gray-300 flex items-center justify-center overflow-hidden`}>
        {/* Current Image */}
        <img
          src={currentImage.src}
          alt={currentImage.alt}
          className={`w-full h-full ${objectFitClass}`}
        />

        {/* Navigation Arrows - Only show if more than 1 image */}
        {showNavigation && (
          <>
            {/* Previous Arrow */}
            <button
              onClick={goToPrevious}
              className={`absolute left-4 top-1/2 -translate-y-1/2 ${arrowBgColor} ${arrowColor} w-10 h-10 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity shadow-lg`}
              aria-label="Previous image"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>

            {/* Next Arrow */}
            <button
              onClick={goToNext}
              className={`absolute right-4 top-1/2 -translate-y-1/2 ${arrowBgColor} ${arrowColor} w-10 h-10 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity shadow-lg`}
              aria-label="Next image"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>

            {/* Dot Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex ? `${activeDotColor} w-6` : dotColor
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Caption */}
      {currentImage.caption && (
        <p className={`text-sm ${captionColor} mt-2`}>
          {currentImage.caption}
        </p>
      )}
    </div>
  )
}
