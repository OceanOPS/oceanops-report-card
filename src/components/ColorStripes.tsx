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
  sectionId?: string; // ID de la sección a la que navegar
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
    { iconSrc: '/icons/climate.png', iconAlt: 'Climate', textKey: 'networks.deliveryAreas.climate', sectionId: 'amoc-section' },
    { iconSrc: '/icons/operational_services.png', iconAlt: 'Operational Services', textKey: 'networks.deliveryAreas.operational', sectionId: 'elnino-section' },
    { iconSrc: '/icons/ocean_health.png', iconAlt: 'Ocean Health', textKey: 'networks.deliveryAreas.oceanhealth', sectionId: 'oceanhealth-section' },
  ],
  stripeHeight = ''
}: ColorStripesProps) {
  const { t } = useTranslation();

  // Función para scroll suave a la sección
  const scrollToSection = (sectionId?: string) => {
    if (!sectionId) return;

    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Colores más claros para el fade: cada tira va a un tono más claro
  const fadeColors = ['bg-goos-cyan-200', 'bg-goos-cyan-100', 'bg-white'];
  const containerRef = useRef<HTMLDivElement>(null);
  const stripesRef = useRef<(HTMLButtonElement | null)[]>([]);
  const deliveryAreasRef = useRef<(HTMLDivElement | null)[]>([]);
  const whiteLayersRef = useRef<(HTMLDivElement | null)[]>([]);

  // Función para agregar referencias a los stripes
  const addToStripesRefs = (el: HTMLButtonElement | null, index: number) => {
    stripesRef.current[index] = el;
  };

  // Función para agregar referencias a las delivery areas
  const addToDeliveryAreasRefs = (el: HTMLDivElement | null, index: number) => {
    deliveryAreasRef.current[index] = el;
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

        // ENTRADA de delivery areas - usar bottom para que aparezcan antes en todos los tamaños
        gsap.fromTo(area,
          {
            opacity: 0,
            y: 20,
            scale: 0.5
          },
          {
            opacity: 1,
            y: 0,
            scale: 0.6,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: containerRef.current,
              start: `top+=${index * 8}% bottom`,
              end: `top+=${10 + index * 8}% center`,
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
      className={`w-full flex flex-row relative overflow-hidden bg-goos-white h-[100vh] ${className}`}
      style={stripeHeight ? { height: stripeHeight } : undefined}
    >
      {stripeColors.map((color, index) => (
        <button
          key={index}
          ref={(el) => addToStripesRefs(el, index)}
          onClick={() => scrollToSection(deliveryAreas[index]?.sectionId)}
          className={`${color} w-full relative h-[100vh] cursor-pointer transition-opacity hover:opacity-90`}
          style={stripeHeight ? { height: stripeHeight } : undefined}
          aria-label={`Navigate to ${deliveryAreas[index]?.iconAlt}`}
        >
          {/* Capa de color claro para fade */}
          <div
            ref={(el) => addToWhiteLayersRefs(el, index)}
            className={`absolute inset-0 ${fadeColors[index]} opacity-0 pointer-events-none`}
          />

          {/* Contenedor para delivery area (icono + texto) */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              ref={(el) => addToDeliveryAreasRefs(el, index)}
              className="flex flex-col items-center justify-center gap-3 sm:gap-4 md:gap-6 opacity-0"
            >
              {/* Icono */}
              <img
                src={deliveryAreas[index].iconSrc}
                alt={deliveryAreas[index].iconAlt}
                className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 object-contain pointer-events-none"
              />
              {/* Texto */}
              <p className="text-goos-blue-700 text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-center uppercase tracking-wide font-roboto-condensed pointer-events-none"
              >
                {t(deliveryAreas[index].textKey)}
              </p>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}