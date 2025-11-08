import React, { useRef, useEffect } from 'react';
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
  stripeHeight = '150vh' // 3 pantallas de altura para máximo dramatismo
}: ColorStripesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stripesRef = useRef<(HTMLDivElement | null)[]>([]);
  const wordsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Función para agregar referencias a los stripes
  const addToStripesRefs = (el: HTMLDivElement | null, index: number) => {
    stripesRef.current[index] = el;
  };

  // Función para agregar referencias a las palabras
  const addToWordsRefs = (el: HTMLDivElement | null, index: number) => {
    wordsRef.current[index] = el;
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ENTRADA ESCALONADA DRAMÁTICA - Cada tira entra con delay
      stripesRef.current.forEach((stripe, index) => {
        if (!stripe) return;

        // ENTRADA ESCALONADA - Cada tira entra 15% después de la anterior
        gsap.fromTo(stripe, 
          {
            y: '50vh', // Comienzan MÁS abajo para mayor dramatismo
          },
          {
            y: '0vh',
            ease: "power2.out",
            duration: 2,
            scrollTrigger: {
              trigger: containerRef.current,
              start: `top+=${index * 15}% bottom`, // Entrada muy escalonada
              end: `top+=${20 + index * 5}% top`, 
              scrub: 1,
              markers: false, // Puedes activar markers para debug
            }
          }
        );

        // SALIDA ESCALONADA DRAMÁTICA - Cada tira sale con delay
        gsap.fromTo(stripe,
          {
            y: '0vh',
          },
          {
            y: '-50vh', // Salen MÁS arriba para mayor dramatismo
            ease: "power2.in",
            duration: 2,
            scrollTrigger: {
              trigger: containerRef.current,
              start: `top+=${100 + index * 40}% top`, // Salida muy escalonada (10% de diferencia)
              end: `top+=${180 + index * 40}% top`, 
              scrub: 1,
            }
          }
        );
      });

      // ANIMACIÓN DE PALABRAS (la que te gustaba) - en la zona media
      wordsRef.current.forEach((word, index) => {
        if (!word) return;

        // ENTRADA de palabras - después de que las tiras estén en posición
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
              start: `top+=${0 + index * 8}% top`, // Aparecen escalonadas
              end: `top+=${10 + index * 8}% top`, 
              scrub: 1,
            }
          }
        );

        // Las palabras permanecen visibles por un buen rato
        // SALIDA de palabras - antes de que salgan las tiras
        gsap.to(word, {
          opacity: 0,
          y: -80,
          scale: 0.8,
          ease: "power2.in",
          scrollTrigger: {
            trigger: containerRef.current,
            start: `top+=${65}% top`, // Comienzan a desaparecer
            end: `top+=${75}% top`,   // Todas desaparecen juntas
            scrub: 1,
          }
        });
      });

      // Scroll más largo para aprovechar las 300vh
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: false,
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