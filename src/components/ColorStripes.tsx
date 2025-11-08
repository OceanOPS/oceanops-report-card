import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Registrar el plugin de ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

interface ColorStripesProps {
  stripeColors: string[];
  className?: string;
  words?: string[];
  stripeHeight?: string;
}

export default function ColorStripes({
  stripeColors,
  className = '',
  words = ['CREATIVIDAD', 'INNOVACIÓN', 'IMPACTO'],
  stripeHeight = '150vh'
}: ColorStripesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stripesRef = useRef<(HTMLDivElement | null)[]>([]);
  const wordsRef = useRef<(HTMLDivElement | null)[]>([]);
  const whiteLayersRef = useRef<(HTMLDivElement | null)[]>([]);

  // Función para agregar referencias a los stripes
  const addToStripesRefs = (el: HTMLDivElement | null, index: number) => {
    stripesRef.current[index] = el;
  };

  // Función para agregar referencias a las palabras
  const addToWordsRefs = (el: HTMLDivElement | null, index: number) => {
    wordsRef.current[index] = el;
  };

  // Función para agregar referencias a las capas blancas
  const addToWhiteLayersRefs = (el: HTMLDivElement | null, index: number) => {
    whiteLayersRef.current[index] = el;
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ENTRADA ESCALONADA DRAMÁTICA - Cada tira entra con delay
      stripesRef.current.forEach((stripe, index) => {
        if (!stripe) return;

        // ENTRADA ESCALONADA - Cada tira entra 15% después de la anterior
        gsap.fromTo(stripe, 
          {
            y: '50vh',
          },
          {
            y: '0vh',
            ease: "power2.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: `top+=${index * 15}% bottom`,
              end: `top+=${20 + index * 5}% top`, 
              scrub: 1,
            }
          }
        );

        // SALIDA ESCALONADA - Empiezan desfasadas pero terminan alineadas
        const exitDelay = (2 - index) * 20;

        gsap.fromTo(stripe,
          {
            y: '0vh',
          },
          {
            y: '-100vh',
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: `top+=${80 + exitDelay}% top`,
              end: `top+=${180}% top`,
              scrub: 1,
            }
          }
        );
      });

      // FADE A BLANCO con capas blancas encima
      whiteLayersRef.current.forEach((layer) => {
        if (!layer) return;

        gsap.to(layer, {
          opacity: 1,
          scrollTrigger: {
            trigger: containerRef.current,
            start: `top+=${150}% top`,
            end: `top+=${180}% top`,
            scrub: 1,
          }
        });
      });

      // ANIMACIÓN DE PALABRAS
      wordsRef.current.forEach((word, index) => {
        if (!word) return;

        // ENTRADA de palabras
        gsap.fromTo(word, 
          {
            opacity: 0,
            y: 100,
            scale: 0.7
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: containerRef.current,
              start: `top+=${0 + index * 8}% top`,
              end: `top+=${10 + index * 8}% top`, 
              scrub: 1,
            }
          }
        );

        // SALIDA de palabras
        gsap.to(word, {
          opacity: 0,
          y: -80,
          scale: 0.8,
          ease: "power2.in",
          scrollTrigger: {
            trigger: containerRef.current,
            start: `top+=${65}% top`,
            end: `top+=${75}% top`,
            scrub: 1,
          }
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, [stripeColors, words]);

  return (
    <div 
      ref={containerRef} 
      className={`w-full flex flex-row relative overflow-hidden bg-goos-white ${className}`}
      style={{ height: stripeHeight }}
    >
      {stripeColors.map((color, index) => (
        <div
          key={index}
          ref={(el) => addToStripesRefs(el, index)}
          className={`${color} w-full relative`}
          style={{ height: stripeHeight }}
        >
          {/* Capa blanca para fade a color claro */}
          <div
            ref={(el) => addToWhiteLayersRefs(el, index)}
            className="absolute inset-0 bg-white opacity-0 pointer-events-none"
          />

          {/* Contenedor para la palabra */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              ref={(el) => addToWordsRefs(el, index)}
              className="text-white text-4xl md:text-6xl lg:text-7xl font-bold opacity-0 text-center px-4"
              style={{
                textShadow: '2px 2px 8px rgba(0,0,0,0.6)',
                fontFamily: 'system-ui, sans-serif'
              }}
            >
              {words[index]}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}