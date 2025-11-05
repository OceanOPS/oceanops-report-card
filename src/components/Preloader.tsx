/**
 * Preloader Component
 *
 * An impactful loading screen with ocean-themed animations.
 * Features three phases:
 * 1. Ocean Pulse: Concentric waves pulsing from GOOS logo
 * 2. Data Preview: Key statistics appear briefly
 * 3. Reveal: Waves expand and fade to main content
 *
 * @param onComplete - Callback function when preloader finishes
 *
 * @example
 * ```tsx
 * <Preloader onComplete={() => setIsLoading(false)} />
 * ```
 */

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import GoosLogo from './GoosLogo'

interface PreloaderProps {
  onComplete: () => void
  videoUrl?: string  // Optional video to preload
}

export default function Preloader({ onComplete, videoUrl }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const wave1Ref = useRef<HTMLDivElement>(null)
  const wave2Ref = useRef<HTMLDivElement>(null)
  const wave3Ref = useRef<HTMLDivElement>(null)
  const progressCircleRef = useRef<HTMLDivElement>(null)
  const progressTextRef = useRef<HTMLSpanElement>(null)

  const [progress, setProgress] = useState(0)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const circlePos = useRef({ x: 0, y: 0 })

  // Mouse tracking effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Smooth circle follow with delay
  useEffect(() => {
    if (!progressCircleRef.current) return

    const animate = () => {
      // Lerp (linear interpolation) for smooth following
      circlePos.current.x += (mousePos.x - circlePos.current.x) * 0.1
      circlePos.current.y += (mousePos.y - circlePos.current.y) * 0.1

      if (progressCircleRef.current) {
        progressCircleRef.current.style.transform = `translate(${circlePos.current.x}px, ${circlePos.current.y}px)`
      }

      requestAnimationFrame(animate)
    }

    const animationId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationId)
  }, [mousePos])

  // Preload video and simulate progress
  useEffect(() => {
    // Respect user's motion preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      // Skip preloader for reduced motion
      setTimeout(onComplete, 500)
      return
    }

    let progressInterval: ReturnType<typeof setInterval>
    let videoLoaded = false

    // Simulate initial progress (0-80% while loading)
    progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 80 && !videoLoaded) {
          return prev + Math.random() * 5
        }
        if (videoLoaded && prev < 100) {
          return Math.min(prev + 10, 100)
        }
        return prev
      })
    }, 100)

    // Preload video if URL provided
    if (videoUrl) {
      const video = document.createElement('video')
      video.src = videoUrl
      video.preload = 'auto'

      video.addEventListener('canplaythrough', () => {
        videoLoaded = true
        setProgress(100)
      })

      video.addEventListener('error', () => {
        // Even if video fails, continue
        videoLoaded = true
        setProgress(100)
      })

      video.load()
    } else {
      // No video to load, just simulate progress
      setTimeout(() => {
        videoLoaded = true
        setProgress(100)
      }, 1500)
    }

    return () => {
      clearInterval(progressInterval)
    }
  }, [videoUrl])

  // Start exit animation when progress reaches 100%
  useEffect(() => {
    if (progress >= 100) {
      // Longer delay to show 100% completion
      setTimeout(() => {
        startExitAnimation()
      }, 800)
    }
  }, [progress])

  const startExitAnimation = () => {
    // Respect user's motion preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      onComplete()
      return
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          // Fade out entire preloader including progress circle
          gsap.to([containerRef.current, progressCircleRef.current], {
            opacity: 0,
            duration: 0.5,
            onComplete: onComplete,
          })
        },
      })

      // Fade out logo and waves
      tl.to([logoRef.current, wave1Ref.current, wave2Ref.current, wave3Ref.current], {
        opacity: 0,
        scale: 1.1,
        duration: 0.4,
        ease: 'power2.in'
      })
    })

    return () => ctx.revert()
  }

  return (
    <>
      <div
        ref={containerRef}
        className="fixed inset-0 z-50 bg-goos-blue-900 flex items-center justify-center"
      >
        {/* Animated waves */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          <div
            ref={wave1Ref}
            className="absolute w-96 h-96 rounded-full border-4 border-goos-cyan-600"
            style={{ opacity: 0 }}
          />
          <div
            ref={wave2Ref}
            className="absolute w-96 h-96 rounded-full border-4 border-goos-cyan-500"
            style={{ opacity: 0 }}
          />
          <div
            ref={wave3Ref}
            className="absolute w-96 h-96 rounded-full border-4 border-goos-cyan-400"
            style={{ opacity: 0 }}
          />
        </div>

        {/* Content container */}
        <div className="relative z-10 flex flex-col items-center">
          {/* GOOS Logo */}
          <div ref={logoRef} className="w-56" style={{ opacity: 1 }}>
            <GoosLogo variant="white" />
          </div>
        </div>
      </div>

      {/* Progress circle that follows mouse */}
      <div
        ref={progressCircleRef}
        className="fixed z-[60] pointer-events-none"
        style={{
          top: 0,
          left: 0,
          width: '100px',
          height: '100px',
          marginLeft: '-50px',
          marginTop: '-50px',
        }}
      >
        {/* Outer circle with border */}
        <div className="relative w-full h-full">
          {/* Progress ring */}
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            {/* Background circle with blue fill */}
            <circle
              cx="50"
              cy="50"
              r="38"
              fill="#184596"
              stroke="#184596"
              strokeWidth="1"
            />
            {/* Progress circle */}
            <circle
              cx="50"
              cy="50"
              r="38"
              fill="none"
              stroke="#184596"
              strokeWidth="1"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 38}`}
              strokeDashoffset={`${2 * Math.PI * 38 * (1 - progress / 100)}`}
              style={{ transition: 'stroke-dashoffset 0.3s ease' }}
            />
          </svg>

          {/* Percentage text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span ref={progressTextRef} className="text-lg font-normal text-goos-white font-roboto-condensed">
              {Math.round(progress)}%
            </span>
          </div>
        </div>
      </div>
    </>
  )
}
