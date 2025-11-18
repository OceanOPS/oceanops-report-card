/**
 * SatelliteTable Component
 *
 * Displays a timeline table of Satellite Essential Climate Variables from 1990-2030.
 * Shows the status of each variable with color-coded gradient bars representing
 * adequacy levels: ADEQUATE (orange-500), MARGINAL (orange-300), INADEQUATE (orange-100).
 *
 * @example
 * ```tsx
 * <SatelliteTable />
 * ```
 */

import { useTranslation } from 'react-i18next'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Button from './Button'

gsap.registerPlugin(ScrollTrigger)

export default function SatelliteTable() {
  const { t } = useTranslation()
  const tableRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  // Satellite modal collapsible states
  const [expandedVariables, setExpandedVariables] = useState({
    sst: false,
    sss: false,
    seaLevel: false,
    winds: false,
    seaIce: false,
    seaState: false,
    oceanColor: false,
  })

  const toggleVariable = (variable: keyof typeof expandedVariables) => {
    setExpandedVariables(prev => ({
      ...prev,
      [variable]: !prev[variable]
    }))
  }

  // Data for satellite variables
  const satelliteData = [
    {
      name: t('satelliteObservations.variableNames.seaIce'),
      gradient: 'linear-gradient(to right, #F48B25 0%, #F48B25 90%, #F9BF86 95%, #F9BF86 100%)',
    },
    {
      name: t('satelliteObservations.variableNames.oceanColor'),
      gradient: 'linear-gradient(to right, transparent 0%, transparent 15%, #F9BF86 15%, #F9BF86 20%, #F48B25 23%, #F48B25 66%, #F48B25 66%, #F9BF86 70%, #F9BF86 82%, #F48B25 86%, #F48B25 100%)',
    },
    {
      name: t('satelliteObservations.variableNames.seaLevel'),
      gradient: 'linear-gradient(to right, transparent 0%, transparent 5%, #F48B25 5%, #F48B25 100%)',
    },
    {
      name: t('satelliteObservations.variableNames.seaSurfaceTemperature'),
      gradient: 'linear-gradient(to right, #F48B25 0%, #F48B25 90%, #F9BF86 94%, #F9BF86 100%)',
    },
    {
      name: t('satelliteObservations.variableNames.seaSurfaceSalinity'),
      gradient: 'linear-gradient(to right, transparent 0%, transparent 50%, #F9BF86 50%, #F9BF86 90%, #FEF2E7 92%, #FEF2E7 95%, #F9BF86 97%, #F9BF86 100%)',
    },
    {
      name: t('satelliteObservations.variableNames.seaState'),
      gradient: 'linear-gradient(to right, transparent 0%, transparent 5%, #F9BF86 5%, #F9BF86 100%)',
    },
    {
      name: t('satelliteObservations.variableNames.wind'),
      gradient: 'linear-gradient(to right, #FEF2E7 0%, #FEF2E7 30%, #F9BF86 35%, #F9BF86 100%)',
    },
  ]

  // Animate timeline bars on scroll (for both table and cards)
  useEffect(() => {
    // Respect user's motion preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      // Select mobile and desktop bars separately
      const mobileBars = cardsRef.current?.querySelectorAll('.timeline-bar')
      const desktopBars = tableRef.current?.querySelectorAll('.timeline-bar')

      if (prefersReducedMotion) {
        // No animations - show bars at full width immediately
        if (mobileBars) gsap.set(mobileBars, { width: '100%' })
        if (desktopBars) gsap.set(desktopBars, { width: '100%' })
      } else {
        // Animate mobile bars
        if (mobileBars && mobileBars.length > 0) {
          gsap.set(mobileBars, { width: 0 })
          gsap.to(mobileBars, {
            width: '100%',
            duration: 0.5,
            stagger: 0.05,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: mobileBars[0],
              start: 'top 85%',
              once: true,
            },
          })
        }

        // Animate desktop bars
        if (desktopBars && desktopBars.length > 0) {
          gsap.set(desktopBars, { width: 0 })
          gsap.to(desktopBars, {
            width: '100%',
            duration: 0.5,
            stagger: 0.05,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: desktopBars[0],
              start: 'top 85%',
              once: true,
            },
          })
        }
      }
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="bg-goos-blue-900 w-full px-4 sm:px-8 md:px-12 lg:px-16 py-6 sm:py-8">
      {/* Mobile Card View - Only visible on mobile */}
      <div ref={cardsRef} className="md:hidden space-y-4">
        {/* Header */}
        <div className="mb-4">
          <h3 className="text-base font-bold text-white mb-1">
            {t('satelliteObservations.tableTitle')}
          </h3>
          <p className="text-sm text-white">{t('satelliteObservations.timelineRange')}</p>
        </div>

        {/* Cards */}
        {satelliteData.map((variable, index) => (
          <div key={index} className="bg-goos-blue-800 rounded p-4 space-y-3">
            {/* Variable Name */}
            <h4 className="text-sm font-bold text-white">{variable.name}</h4>

            {/* Timeline Bar */}
            <div className="relative h-10 bg-goos-blue-900 rounded overflow-hidden">
              <div
                className="timeline-bar h-full"
                style={{
                  width: '100%',
                  background: variable.gradient,
                }}
              ></div>
              {/* 2025 marker line */}
              <div className="absolute top-0 bottom-0 w-0.5 border-l-2 border-dashed border-white" style={{ left: '85%' }}></div>
            </div>

            {/* Years - Compact */}
            <div className="flex justify-between text-xs text-white opacity-75">
              <span>1990</span>
              <span>2000</span>
              <span>2010</span>
              <span>2020</span>
              <span className="opacity-50">2030</span>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table View - Hidden on mobile */}
      <div ref={tableRef} className="hidden md:block w-full overflow-x-auto">
        <table className="w-full border-collapse border border-goos-white">
          {/* Header */}
          <thead>
            <tr className="bg-goos-blue-900 p-0">
              <th className="text-white text-left px-3 sm:px-4 md:px-6 py-3 sm:py-4 border-b-2 border-goos-white font-bold w-1/3">
                <div className="text-base sm:text-lg md:text-xl">Essential Ocean and Climate Variables</div>
                <div className="text-sm sm:text-base font-normal">Measured from space</div>
              </th>
              <th className="text-white py-3 sm:py-4 pr-3 sm:pr-4 border-b-2 border-goos-white font-medium w-2/3">
              </th>
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {/* Sea Ice - Starts 1990 (0%) */}
            <tr>
              <td className="bg-goos-blue-900 text-white px-3 sm:px-4 md:px-6 border-b border-goos-white text-sm sm:text-base md:text-lg">
                Sea Ice
              </td>
              <td className="border-b border-goos-white p-0">
                <div className="h-14 relative overflow-hidden">
                  <div
                    className="timeline-bar h-full"
                    style={{
                      width: '100%',
                      background: 'linear-gradient(to right, #F48B25 0%, #F48B25 90%, #F9BF86 95%, #F9BF86 100%)'
                    }}
                  ></div>
                  {/* 2025 marker line */}
                  <div className="absolute top-0 bottom-0 w-0.5 border-l-2 border-dashed border-white" style={{ left: '85%' }}></div>
                </div>
              </td>
            </tr>

            {/* Ocean Color - Starts 1996 (15%) */}
            <tr>
              <td className="bg-goos-blue-900 text-white px-3 sm:px-4 md:px-6 border-b border-goos-white text-sm sm:text-base md:text-lg">
                Ocean Color
              </td>
              <td className="bg-goos-blue-900 border-b border-goos-white p-0">
                <div className="h-14 relative overflow-hidden">
                  <div
                    className="timeline-bar h-full"
                    style={{
                      width: '100%',
                      background: 'linear-gradient(to right, transparent 0%, transparent 15%, #F9BF86 15%, #F9BF86 20%, #F48B25 23%, #F48B25 66%, #F48B25 66%, #F9BF86 70%, #F9BF86 82%, #F48B25 86%, #F48B25 100%)'
                    }}
                  ></div>
                  {/* 2025 marker line */}
                  <div className="absolute top-0 bottom-0 w-0.5 border-l-2 border-dashed border-white" style={{ left: '85%' }}></div>
                </div>
              </td>
            </tr>

            {/* Sea Level - Starts 1992 (5%) */}
            <tr>
              <td className="bg-goos-blue-900 text-white px-3 sm:px-4 md:px-6 border-b border-goos-white text-sm sm:text-base md:text-lg">
                Sea Level
              </td>
              <td className="bg-goos-blue-900 border-b border-goos-white p-0">
                <div className="h-14 relative overflow-hidden">
                  <div
                    className="timeline-bar h-full"
                    style={{
                      width: '100%',
                      background: 'linear-gradient(to right, transparent 0%, transparent 5%, #F48B25 5%, #F48B25 100%)'
                    }}
                  ></div>
                  {/* 2025 marker line */}
                  <div className="absolute top-0 bottom-0 w-0.5 border-l-2 border-dashed border-white" style={{ left: '85%' }}></div>
                </div>
              </td>
            </tr>

            {/* Sea Surface Temperature - Starts 1990 (0%) */}
            <tr>
              <td className="bg-goos-blue-900 text-white px-3 sm:px-4 md:px-6 border-b border-goos-white text-sm sm:text-base md:text-lg">
                Sea Surface Temperature
              </td>
              <td className="bg-goos-blue-900 border-b border-goos-white p-0">
                <div className="h-14 relative overflow-hidden">
                  <div
                    className="timeline-bar h-full"
                    style={{
                      width: '100%',
                      background: 'linear-gradient(to right, #F48B25 0%, #F48B25 90%, #F9BF86 94%, #F9BF86 100%)'
                    }}
                  ></div>
                  {/* 2025 marker line */}
                  <div className="absolute top-0 bottom-0 w-0.5 border-l-2 border-dashed border-white" style={{ left: '85%' }}></div>
                </div>
              </td>
            </tr>

            {/* Sea Surface Salinity - Starts 2010 (50%) */}
            <tr>
              <td className="bg-goos-blue-900 text-white px-3 sm:px-4 md:px-6 border-b border-goos-white text-sm sm:text-base md:text-lg">
                Sea Surface Salinity
              </td>
              <td className="bg-goos-blue-900 border-b border-goos-white p-0">
                <div className="h-14 relative overflow-hidden">
                  <div
                    className="timeline-bar h-full"
                    style={{
                      width: '100%',
                      background: 'linear-gradient(to right, transparent 0%, transparent 50%, #F9BF86 50%, #F9BF86 90%, #FEF2E7 92%, #FEF2E7 95%, #F9BF86 97%, #F9BF86 100%)'
                    }}
                  ></div>
                  {/* 2025 marker line */}
                  <div className="absolute top-0 bottom-0 w-0.5 border-l-2 border-dashed border-white" style={{ left: '85%' }}></div>
                </div>
              </td>
            </tr>

            {/* Sea State - Starts 1992 (5%) */}
            <tr>
              <td className="bg-goos-blue-900 text-white px-3 sm:px-4 md:px-6 border-b border-goos-white text-sm sm:text-base md:text-lg">
                Sea State
              </td>
              <td className="bg-goos-blue-900 border-b border-goos-white p-0">
                <div className="h-14 relative overflow-hidden">
                  <div
                    className="timeline-bar h-full"
                    style={{
                      width: '100%',
                      background: 'linear-gradient(to right, transparent 0%, transparent 5%, #F9BF86 5%, #F9BF86 100%)'
                    }}
                  ></div>
                  {/* 2025 marker line */}
                  <div className="absolute top-0 bottom-0 w-0.5 border-l-2 border-dashed border-white" style={{ left: '85%' }}></div>
                </div>
              </td>
            </tr>

            {/* Wind - Starts 1990 (0%) */}
            <tr>
              <td className="bg-goos-blue-900 text-white px-3 sm:px-4 md:px-6 border-b border-goos-white text-sm sm:text-base md:text-lg">
                Wind
              </td>
              <td className="bg-goos-blue-900 border-b border-goos-white p-0">
                <div className="h-14 relative overflow-hidden">
                  <div
                    className="timeline-bar h-full"
                    style={{
                      width: '100%',
                      background: 'linear-gradient(to right, #FEF2E7 0%, #FEF2E7 30%, #F9BF86 35%, #F9BF86 100%)'
                    }}
                  ></div>
                  {/* 2025 marker line */}
                  <div className="absolute top-0 bottom-0 w-0.5 border-l-2 border-dashed border-white" style={{ left: '85%' }}></div>
                </div>
              </td>
            </tr>
          </tbody>

          {/* Footer with years */}
          <tfoot>
            <tr className="bg-goos-blue-900 p-0">
              <td className="text-white text-left px-3 sm:px-4 md:px-6 py-3 sm:py-4 border-t-2 border-goos-white font-bold w-1/3">
                {t('satelliteObservations.yearLabel')}
              </td>
              <td className="text-white py-3 sm:py-4 pr-3 sm:pr-4 border-t-2 border-goos-white font-medium w-2/3">
                <div className="flex justify-between text-xs sm:text-sm whitespace-nowrap p-0">
                  <span>90</span>
                  <span>92</span>
                  <span>94</span>
                  <span>96</span>
                  <span>98</span>
                  <span>00</span>
                  <span>02</span>
                  <span>04</span>
                  <span>06</span>
                  <span>08</span>
                  <span>10</span>
                  <span>12</span>
                  <span>14</span>
                  <span>16</span>
                  <span>18</span>
                  <span>20</span>
                  <span>22</span>
                  <span>24</span>
                  <span className="opacity-50">26</span>
                  <span className="opacity-50">28</span>
                  <span className="opacity-50">30</span>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Legend - Shared between mobile and desktop */}
      <div className="flex gap-4 sm:gap-6 mt-4 sm:mt-6 items-center flex-wrap text-white">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 sm:w-4 sm:h-4 bg-goos-orange-100"></div>
            <span className="text-xs sm:text-sm">{t('satelliteObservations.legend.inadequate')}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 sm:w-4 sm:h-4 bg-goos-orange-300"></div>
            <span className="text-xs sm:text-sm">{t('satelliteObservations.legend.marginal')}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 sm:w-4 sm:h-4 bg-goos-orange-500"></div>
            <span className="text-xs sm:text-sm">{t('satelliteObservations.legend.adequate')}</span>
          </div>
        </div>

        {/* Platform Definition Button */}
        <div className="flex justify-center mt-12 sm:mt-14 md:mt-10">
          <Button
            variant="modal"
            label={t('satelliteObservations.platformButton')}
            modalTitle={t('satelliteObservations.platformModal.title')}
            modalMaxWidth="lg"
            modalBackgroundColor="bg-goos-blue-900"
            modalContent={
              <div className="flex flex-col gap-4 sm:gap-6">
                {/* Introduction */}
                <div>
                  <p className="text-base sm:text-lg text-white leading-relaxed">
                    {t('satelliteObservations.platformModal.introduction')}
                  </p>
                </div>

                {/* SST */}
                <div>
                  <h3 className="text-base sm:text-lg text-goos-orange-500 mb-2 sm:mb-3">
                    {t('satelliteObservations.platformModal.variables.sst.title')}
                  </h3>
                  <p className="text-sm sm:text-base leading-relaxed text-white mb-2">
                    {t('satelliteObservations.platformModal.variables.sst.description')}
                  </p>

                  {/* More button when collapsed */}
                  {!expandedVariables.sst && (
                    <button
                      onClick={() => toggleVariable('sst')}
                      className="text-goos-orange-500 hover:underline focus:outline-none text-sm sm:text-base"
                    >
                      {t('satelliteObservations.platformModal.moreButton')}
                    </button>
                  )}

                  {/* Collapsible Content */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      expandedVariables.sst ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className="text-sm sm:text-base leading-relaxed mb-3 text-white whitespace-pre-line">
                      {t('satelliteObservations.platformModal.variables.sst.detailedContent')}
                    </p>
                    <p className="text-xs sm:text-sm italic text-white mb-3">
                      {t('satelliteObservations.platformModal.variables.sst.author')}
                    </p>

                    {/* Less button at the end of expanded content */}
                    <button
                      onClick={() => toggleVariable('sst')}
                      className="text-goos-orange-500 hover:underline focus:outline-none text-sm sm:text-base"
                    >
                      Less...
                    </button>
                  </div>
                </div>

                {/* SSS */}
                <div>
                  <h3 className="text-base sm:text-lg text-goos-orange-500 mb-2 sm:mb-3">
                    {t('satelliteObservations.platformModal.variables.sss.title')}
                  </h3>
                  <p className="text-sm sm:text-base leading-relaxed text-white mb-2">
                    {t('satelliteObservations.platformModal.variables.sss.description')}
                  </p>

                  {!expandedVariables.sss && (
                    <button
                      onClick={() => toggleVariable('sss')}
                      className="text-goos-orange-500 hover:underline focus:outline-none text-sm sm:text-base"
                    >
                      {t('satelliteObservations.platformModal.moreButton')}
                    </button>
                  )}

                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      expandedVariables.sss ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className="text-sm sm:text-base leading-relaxed mb-3 text-white whitespace-pre-line">
                      {t('satelliteObservations.platformModal.variables.sss.detailedContent')}
                    </p>
                    <p className="text-xs sm:text-sm italic text-white mb-3">
                      {t('satelliteObservations.platformModal.variables.sss.author')}
                    </p>
                    <button
                      onClick={() => toggleVariable('sss')}
                      className="text-goos-orange-500 hover:underline focus:outline-none text-sm sm:text-base"
                    >
                      Less...
                    </button>
                  </div>
                </div>

                {/* Sea Level */}
                <div>
                  <h3 className="text-base sm:text-lg text-goos-orange-500 mb-2 sm:mb-3">
                    {t('satelliteObservations.platformModal.variables.seaLevel.title')}
                  </h3>
                  <p className="text-sm sm:text-base leading-relaxed text-white mb-2">
                    {t('satelliteObservations.platformModal.variables.seaLevel.description')}
                  </p>

                  {!expandedVariables.seaLevel && (
                    <button
                      onClick={() => toggleVariable('seaLevel')}
                      className="text-goos-orange-500 hover:underline focus:outline-none text-sm sm:text-base"
                    >
                      {t('satelliteObservations.platformModal.moreButton')}
                    </button>
                  )}

                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      expandedVariables.seaLevel ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className="text-sm sm:text-base leading-relaxed mb-3 text-white whitespace-pre-line">
                      {t('satelliteObservations.platformModal.variables.seaLevel.detailedContent')}
                    </p>
                    <p className="text-xs sm:text-sm italic text-white mb-3">
                      {t('satelliteObservations.platformModal.variables.seaLevel.author')}
                    </p>
                    <button
                      onClick={() => toggleVariable('seaLevel')}
                      className="text-goos-orange-500 hover:underline focus:outline-none text-sm sm:text-base"
                    >
                      Less...
                    </button>
                  </div>
                </div>

                {/* Winds */}
                <div>
                  <h3 className="text-base sm:text-lg text-goos-orange-500 mb-2 sm:mb-3">
                    {t('satelliteObservations.platformModal.variables.winds.title')}
                  </h3>
                  <p className="text-sm sm:text-base leading-relaxed text-white mb-2">
                    {t('satelliteObservations.platformModal.variables.winds.description')}
                  </p>

                  {!expandedVariables.winds && (
                    <button
                      onClick={() => toggleVariable('winds')}
                      className="text-goos-orange-500 hover:underline focus:outline-none text-sm sm:text-base"
                    >
                      {t('satelliteObservations.platformModal.moreButton')}
                    </button>
                  )}

                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      expandedVariables.winds ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className="text-sm sm:text-base leading-relaxed mb-3 text-white whitespace-pre-line">
                      {t('satelliteObservations.platformModal.variables.winds.detailedContent')}
                    </p>
                    <p className="text-xs sm:text-sm italic text-white mb-3">
                      {t('satelliteObservations.platformModal.variables.winds.author')}
                    </p>
                    <button
                      onClick={() => toggleVariable('winds')}
                      className="text-goos-orange-500 hover:underline focus:outline-none text-sm sm:text-base"
                    >
                      Less...
                    </button>
                  </div>
                </div>

                {/* Sea Ice */}
                <div>
                  <h3 className="text-base sm:text-lg text-goos-orange-500 mb-2 sm:mb-3">
                    {t('satelliteObservations.platformModal.variables.seaIce.title')}
                  </h3>
                  <p className="text-sm sm:text-base leading-relaxed text-white mb-2">
                    {t('satelliteObservations.platformModal.variables.seaIce.description')}
                  </p>

                  {!expandedVariables.seaIce && (
                    <button
                      onClick={() => toggleVariable('seaIce')}
                      className="text-goos-orange-500 hover:underline focus:outline-none text-sm sm:text-base"
                    >
                      {t('satelliteObservations.platformModal.moreButton')}
                    </button>
                  )}

                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      expandedVariables.seaIce ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className="text-sm sm:text-base leading-relaxed mb-3 text-white whitespace-pre-line">
                      {t('satelliteObservations.platformModal.variables.seaIce.detailedContent')}
                    </p>
                    <p className="text-xs sm:text-sm italic text-white mb-3">
                      {t('satelliteObservations.platformModal.variables.seaIce.author')}
                    </p>
                    <button
                      onClick={() => toggleVariable('seaIce')}
                      className="text-goos-orange-500 hover:underline focus:outline-none text-sm sm:text-base"
                    >
                      Less...
                    </button>
                  </div>
                </div>

                {/* Sea State */}
                <div>
                  <h3 className="text-base sm:text-lg text-goos-orange-500 mb-2 sm:mb-3">
                    {t('satelliteObservations.platformModal.variables.seaState.title')}
                  </h3>
                  <p className="text-sm sm:text-base leading-relaxed text-white mb-2">
                    {t('satelliteObservations.platformModal.variables.seaState.description')}
                  </p>

                  {!expandedVariables.seaState && (
                    <button
                      onClick={() => toggleVariable('seaState')}
                      className="text-goos-orange-500 hover:underline focus:outline-none text-sm sm:text-base"
                    >
                      {t('satelliteObservations.platformModal.moreButton')}
                    </button>
                  )}

                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      expandedVariables.seaState ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className="text-sm sm:text-base leading-relaxed mb-3 text-white whitespace-pre-line">
                      {t('satelliteObservations.platformModal.variables.seaState.detailedContent')}
                    </p>
                    <p className="text-xs sm:text-sm italic text-white mb-3">
                      {t('satelliteObservations.platformModal.variables.seaState.author')}
                    </p>
                    <button
                      onClick={() => toggleVariable('seaState')}
                      className="text-goos-orange-500 hover:underline focus:outline-none text-sm sm:text-base"
                    >
                      Less...
                    </button>
                  </div>
                </div>

                {/* Ocean Color */}
                <div>
                  <h3 className="text-base sm:text-lg text-goos-orange-500 mb-2 sm:mb-3">
                    {t('satelliteObservations.platformModal.variables.oceanColor.title')}
                  </h3>
                  <p className="text-sm sm:text-base leading-relaxed text-white mb-2">
                    {t('satelliteObservations.platformModal.variables.oceanColor.description')}
                  </p>

                  {!expandedVariables.oceanColor && (
                    <button
                      onClick={() => toggleVariable('oceanColor')}
                      className="text-goos-orange-500 hover:underline focus:outline-none text-sm sm:text-base"
                    >
                      {t('satelliteObservations.platformModal.moreButton')}
                    </button>
                  )}

                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      expandedVariables.oceanColor ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className="text-sm sm:text-base leading-relaxed mb-3 text-white whitespace-pre-line">
                      {t('satelliteObservations.platformModal.variables.oceanColor.detailedContent')}
                    </p>
                    <p className="text-xs sm:text-sm italic text-white mb-3">
                      {t('satelliteObservations.platformModal.variables.oceanColor.author')}
                    </p>
                    <button
                      onClick={() => toggleVariable('oceanColor')}
                      className="text-goos-orange-500 hover:underline focus:outline-none text-sm sm:text-base"
                    >
                      Less...
                    </button>
                  </div>
                </div>
              </div>
            }
            textColor="text-goos-white"
            bgColor="bg-goos-orange-600"
            iconColor="text-goos-orange-600"
            iconBgColor="bg-goos-white"
          />
        </div>
    </div>
  )
}
