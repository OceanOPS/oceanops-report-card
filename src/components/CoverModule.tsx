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
 * @param backgroundBlendMode - CSS mix-blend-mode for the background media: 'normal' | 'multiply' | 'screen' | 'overlay' | 'darken' | 'lighten' | 'color-dodge' | 'color-burn' | 'hard-light' | 'soft-light' | 'difference' | 'exclusion' | 'hue' | 'saturation' | 'color' | 'luminosity' (default: 'normal')
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
 *   backgroundBlendMode="multiply"
 *   mediaType="image"
 *   goosLogoVariant="white"
 *   partnerLogosVariant="white"
 * />
 * ```
 */

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import PartnerLogos from './PartnerLogos'
import GoosLogo from './GoosLogo'

gsap.registerPlugin(ScrollTrigger)

type BlendMode = 'normal' | 'multiply' | 'screen' | 'overlay' | 'darken' | 'lighten' | 'color-dodge' | 'color-burn' | 'hard-light' | 'soft-light' | 'difference' | 'exclusion' | 'hue' | 'saturation' | 'color' | 'luminosity'

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
  backgroundBlendMode?: BlendMode
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
  backgroundBlendMode = 'normal',
  goosLogoVariant = 'white',
  partnerLogosVariant = 'white',
}: CoverModuleProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const fadeOverlayRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const partnerLogosRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Respect user's motion preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        // No animations - show all content immediately
        gsap.set([logoRef.current, titleRef.current, partnerLogosRef.current], {
          opacity: 1,
          y: 0,
          scale: 1,
        })
      } else {
        // Animate normally with improved dynamics
        // Create a timeline for sequential animations
        const tl = gsap.timeline({ defaults: { ease: 'power2.out' } })

        // Animate logo from top with slight bounce
        tl.fromTo(
          logoRef.current,
          { opacity: 0, y: -30, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'back.out(1.2)' }
        )

        // Animate title with scale and fade
        tl.fromTo(
          titleRef.current,
          { opacity: 0, scale: 0.95, y: 20 },
          { opacity: 1, scale: 1, y: 0, duration: 0.7 },
          '-=0.4' // Overlap with previous animation
        )

        // Animate partner logos from bottom
        tl.fromTo(
          partnerLogosRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6 },
          '-=0.3' // Overlap with previous animation
        )

        // Wait for entrance animations to complete, then set up scroll animations
        tl.add(() => {
          // Fade overlay effect: Cover fades to dark blue as content scrolls over it
          if (fadeOverlayRef.current) {
            gsap.fromTo(
              fadeOverlayRef.current,
              { opacity: 0 },
              {
                opacity: 1,
                scrollTrigger: {
                  trigger: sectionRef.current,
                  start: 'top top',
                  end: 'bottom top',
                  scrub: true,
                },
              }
            )
          }

          // Animate logo out: fade and move up on scroll
          if (logoRef.current) {
            gsap.fromTo(
              logoRef.current,
              { opacity: 1, y: 0 },
              {
                opacity: 0,
                y: -50,
                scrollTrigger: {
                  trigger: sectionRef.current,
                  start: 'top top',
                  end: 'center top',
                  scrub: true,
                },
              }
            )
          }

          // Animate title out: fade and move up on scroll
          if (titleRef.current) {
            gsap.fromTo(
              titleRef.current,
              { opacity: 1, y: 0 },
              {
                opacity: 0,
                y: -80,
                scrollTrigger: {
                  trigger: sectionRef.current,
                  start: 'top top',
                  end: 'center top',
                  scrub: true,
                },
              }
            )
          }

          // Animate partner logos out: fade and move down on scroll
          if (partnerLogosRef.current) {
            gsap.fromTo(
              partnerLogosRef.current,
              { opacity: 1, y: 0 },
              {
                opacity: 0,
                y: 50,
                scrollTrigger: {
                  trigger: sectionRef.current,
                  start: 'top top',
                  end: 'center top',
                  scrub: true,
                },
              }
            )
          }
        })
      }
    })

    return () => ctx.revert()
  }, [])
  // Para imágenes usamos background-image para mejor control, videos usan tag video
  const backgroundStyles: React.CSSProperties = mediaType === 'image' && backgroundMedia
    ? {
        backgroundImage: `url(${backgroundMedia})`,
        backgroundSize: backgroundSize,
        backgroundPosition: backgroundPosition,
        backgroundRepeat: 'no-repeat',
        opacity: backgroundOpacity / 100,
        mixBlendMode: backgroundBlendMode,
      }
    : {}

  const videoStyles: React.CSSProperties = {
    objectFit: backgroundSize as any,
    objectPosition: backgroundPosition,
    opacity: backgroundOpacity / 100,
    mixBlendMode: backgroundBlendMode,
  }

  // Detectar el tipo de video por extensión
  const getVideoType = (url: string) => {
    if (url.endsWith('.webm')) return 'video/webm'
    if (url.endsWith('.mp4')) return 'video/mp4'
    if (url.endsWith('.ogg')) return 'video/ogg'
    return 'video/mp4' // default
  }

  return (
    <section ref={sectionRef} className={`relative w-full h-screen ${backgroundColor} p-12 md:p-16 flex flex-col overflow-hidden`}>
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

      {/* Fade overlay - transitions to dark blue as content scrolls over */}
      <div
        ref={fadeOverlayRef}
        className="absolute inset-0 bg-goos-blue-900 pointer-events-none"
        style={{ opacity: 0 }}
      />

      <div className="relative z-10 flex flex-col justify-between flex-1">
        {/* Top: GOOS Logo */}
        <div ref={logoRef}>
          <GoosLogo variant={goosLogoVariant} />
        </div>

        {/* Middle: Main Title */}
        <div ref={titleRef} className="flex flex-col gap-4 my-auto">
          <h1 className="text-6xl font-extrabold text-goos-white">{title}</h1>
          <p className={`text-6xl font-normal ${yearColor}`}>{year}</p>
        </div>

        {/* Bottom: Partner Logos */}
        <div ref={partnerLogosRef}>
          <PartnerLogos variant={partnerLogosVariant} />
        </div>
      </div>
    </section>
  )
}
