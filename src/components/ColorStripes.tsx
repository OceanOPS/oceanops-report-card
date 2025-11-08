import { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Registrar el plugin de ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

interface DeliveryArea {
  iconSrc: string;
  iconAlt: string;
  textKey: string;
}

interface ColorStripesProps {
  stripeColors: string[];
  className?: string;
  deliveryAreas?: DeliveryArea[];
  stripeHeight?: string;
}

export default function ColorStripes({
  stripeColors,
  className = '',
  deliveryAreas = [
    { iconSrc: '/icons/climate.png', iconAlt: 'Climate', textKey: 'networks.deliveryAreas.climate' },
    { iconSrc: '/icons/operational_services.png', iconAlt: 'Operational Services', textKey: 'networks.deliveryAreas.operational' },
    { iconSrc: '/icons/ocean_health.png', iconAlt: 'Ocean Health', textKey: 'networks.deliveryAreas.oceanhealth' },
  ],
  stripeHeight = '150vh'
}: ColorStripesProps) {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const stripesRef = useRef<(HTMLDivElement | null)[]>([]);
  const deliveryAreasRef = useRef<(HTMLDivElement | null)[]>([]);

  // Función para agregar referencias a los stripes
  const addToStripesRefs = (el: HTMLDivElement | null, index: number) => {
    stripesRef.current[index] = el;
  };

  // Función para agregar referencias a las delivery areas
  const addToDeliveryAreasRefs = (el: HTMLDivElement | null, index: number) => {
    deliveryAreasRef.current[index] = el;
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

        // SALIDA SINCRONIZADA - Todas terminan al mismo tiempo
        gsap.fromTo(stripe,
          {
            y: '0vh',
          },
          {
            y: '-100vh',
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: `top+=${80}% top`,
              end: `top+=${180}% top`,
              scrub: 1,
            }
          }
        );
      });

      // ANIMACIÓN DE DELIVERY AREAS
      deliveryAreasRef.current.forEach((area, index) => {
        if (!area) return;

        // ENTRADA de delivery areas
        gsap.fromTo(area, 
          {
            opacity: 0,
            y: 100,
            scale: 0.5
          },
          {
            opacity: 1,
            y: 0,
            scale: 0.6,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: containerRef.current,
              start: `top+=${0 + index * 8}% top`,
              end: `top+=${10 + index * 8}% top`, 
              scrub: 1,
            }
          }
        );

        // SALIDA de delivery areas
        gsap.to(area, {
          opacity: 0,
          y: -80,
          scale: 0.7,
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
  }, [stripeColors, deliveryAreas]);

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
          {/* Contenedor para delivery area (icono + texto) */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              ref={(el) => addToDeliveryAreasRefs(el, index)}
              className="flex flex-col items-center justify-center gap-6 opacity-0"
            >
              {/* Icono */}
              <img
                src={deliveryAreas[index].iconSrc}
                alt={deliveryAreas[index].iconAlt}
                className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 object-contain"
              />
              {/* Texto */}
              <p className="text-goos-blue-700 text-2xl md:text-3xl lg:text-4xl font-semibold text-center uppercase tracking-wide font-roboto-condensed"
              >
                {t(deliveryAreas[index].textKey)}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}