/**
 * CoverModule Component
 *
 * A full-screen cover module with customizable backgrounds, logos, and text.
 *
 * @param title - Main title text (e.g., "Report Card")
 * @param year - Year to display (e.g., "2025")
 * @param yearColor - Tailwind color class for the year text (default: 'text-goos-white')
 * @param backgroundColor - Tailwind background color class (default: 'bg-goos-deep-blue')
 * @param backgroundMedia - Optional URL for background image or video
 * @param mediaType - Type of background media: 'image' or 'video' (default: 'image')
 * @param backgroundOpacity - Opacity of background media from 0-100 (default: 100)
 * @param backgroundPosition - CSS object-position: 'center' | 'top right' | '75% 50%' | etc. (default: 'center')
 * @param backgroundSize - CSS object-fit: 'cover' | 'contain' | 'fill' | '50%' | '80% auto' | etc. (default: 'cover')
 * @param goosLogoVariant - Color variant for GOOS logo: 'white' or 'color' (default: 'white')
 * @param partnerLogosVariant - Color variant for partner logos: 'white' or 'color' (default: 'white')
 *
 * @example
 * ```tsx
 * <CoverModule
 *   title="Report Card"
 *   year="2025"
 *   yearColor="text-goos-orange"
 *   backgroundColor="bg-goos-blue-900"
 *   backgroundMedia="/backgrounds/ocean.jpg"
 *   backgroundOpacity={50}
 *   backgroundPosition="top right"
 *   backgroundSize="cover"
 *   mediaType="image"
 *   goosLogoVariant="white"
 *   partnerLogosVariant="white"
 * />
 * ```
 */

import PartnerLogos from './PartnerLogos'
import GoosLogo from './GoosLogo'

interface CoverModuleProps {
  title: string
  year: string
  yearColor?: string
  backgroundColor?: string
  backgroundMedia?: string
  mediaType?: 'image' | 'video'
  backgroundOpacity?: number
  backgroundPosition?: string
  backgroundSize?: string
  goosLogoVariant?: 'white' | 'color'
  partnerLogosVariant?: 'white' | 'color'
}

export default function CoverModule({
  title,
  year,
  yearColor = 'text-goos-white',
  backgroundColor = 'bg-goos-deep-blue',
  backgroundMedia,
  mediaType = 'image',
  backgroundOpacity = 100,
  backgroundPosition = 'center',
  backgroundSize = 'cover',
  goosLogoVariant = 'white',
  partnerLogosVariant = 'white',
}: CoverModuleProps) {
  // Para imágenes usamos background-image para mejor control, videos usan tag video
  const backgroundStyles: React.CSSProperties = mediaType === 'image' && backgroundMedia
    ? {
        backgroundImage: `url(${backgroundMedia})`,
        backgroundSize: backgroundSize,
        backgroundPosition: backgroundPosition,
        backgroundRepeat: 'no-repeat',
        opacity: backgroundOpacity / 100,
      }
    : {}

  const videoStyles: React.CSSProperties = {
    objectFit: backgroundSize as any,
    objectPosition: backgroundPosition,
    opacity: backgroundOpacity / 100,
  }

  // Detectar el tipo de video por extensión
  const getVideoType = (url: string) => {
    if (url.endsWith('.webm')) return 'video/webm'
    if (url.endsWith('.mp4')) return 'video/mp4'
    if (url.endsWith('.ogg')) return 'video/ogg'
    return 'video/mp4' // default
  }

  return (
    <section className={`relative w-full min-h-screen ${backgroundColor} p-12 md:p-16 flex flex-col overflow-hidden`}>
      {/* Background Media */}
      {backgroundMedia && (
        <div className="absolute inset-0 pointer-events-none">
          {mediaType === 'video' ? (
            <video
              autoPlay
              loop
              muted
              playsInline
              style={videoStyles}
              className="absolute w-full h-full"
            >
              <source src={backgroundMedia} type={getVideoType(backgroundMedia)} />
            </video>
          ) : (
            <div className="absolute w-full h-full" style={backgroundStyles} />
          )}
        </div>
      )}

      <div className="relative z-10 flex flex-col justify-between flex-1">
        {/* Top: GOOS Logo */}
        <GoosLogo variant={goosLogoVariant} />

        {/* Middle: Main Title */}
        <div className="flex flex-col gap-4 my-auto">
          <h1 className="text-6xl font-extrabold text-goos-white">{title}</h1>
          <p className={`text-6xl font-normal ${yearColor}`}>{year}</p>
        </div>

        {/* Bottom: Partner Logos */}
        <PartnerLogos variant={partnerLogosVariant} />
      </div>
    </section>
  )
}
