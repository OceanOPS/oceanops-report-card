/**
 * SatelliteTable Component
 *
 * Timeline of Essential Ocean and Climate Variables (1990–2034).
 * Adequacy: ADEQUATE / MARGINAL / INADEQUATE (2026 edition, orange palette).
 */

import { useTranslation } from 'react-i18next'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Button from './Button'
import {
  SATELLITE_VARIABLE_ROWS,
  SATELLITE_YEAR_LABELS,
  isSatelliteFutureYearLabel,
  satelliteEditionMarkerLeftPercent,
  satelliteYearLabelLeftPercent,
} from '../data/satelliteTableData'

gsap.registerPlugin(ScrollTrigger)

const EDITION_MARKER_LEFT = `${satelliteEditionMarkerLeftPercent()}%`

export default function SatelliteTable() {
  const { t } = useTranslation()
  const tableRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

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
    setExpandedVariables((prev) => ({
      ...prev,
      [variable]: !prev[variable],
    }))
  }

  const satelliteData = SATELLITE_VARIABLE_ROWS.map((row) => ({
    name: t(`satelliteObservations.variableNames.${row.id}`),
    gradient: row.gradient,
  }))

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      const mobileBars = cardsRef.current?.querySelectorAll('.timeline-bar')
      const desktopBars = tableRef.current?.querySelectorAll('.timeline-bar')

      if (prefersReducedMotion) {
        if (mobileBars) gsap.set(mobileBars, { width: '100%' })
        if (desktopBars) gsap.set(desktopBars, { width: '100%' })
      } else {
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

  const renderEditionMarker = () => (
    <div
      className="absolute top-0 bottom-0 -translate-x-1/2 border-l-2 border-dashed border-white"
      style={{ left: EDITION_MARKER_LEFT }}
      aria-hidden="true"
    />
  )

  return (
    <div className="bg-goos-blue-900 w-full px-4 sm:px-8 md:px-12 lg:px-16 py-6 sm:py-8">
      {/* Mobile */}
      <div ref={cardsRef} className="md:hidden space-y-4">
        <div className="mb-4">
          <h3 className="text-base font-bold text-white mb-1">
            {t('satelliteObservations.tableTitle')}
          </h3>
          <p className="text-sm text-white">{t('satelliteObservations.timelineRange')}</p>
        </div>

        {satelliteData.map((variable) => (
          <div key={variable.name} className="bg-goos-blue-800 rounded p-4 space-y-3">
            <h4 className="text-sm font-bold text-white">{variable.name}</h4>
            <div className="relative h-10 bg-goos-blue-900 rounded overflow-hidden">
              <div
                className="timeline-bar h-full"
                style={{ width: '100%', background: variable.gradient }}
              />
              {renderEditionMarker()}
            </div>
            <div className="flex justify-between text-xs text-white opacity-75">
              <span>1990</span>
              <span>2000</span>
              <span>2010</span>
              <span>2020</span>
              <span className="opacity-50">2034</span>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop */}
      <div ref={tableRef} className="hidden md:block w-full overflow-x-auto">
        <table className="w-full border-collapse border border-goos-white">
          <thead>
            <tr className="bg-goos-blue-900 p-0">
              <th className="text-white text-left px-3 sm:px-4 md:px-6 py-3 sm:py-4 border-b-2 border-goos-white font-bold w-1/3">
                <div className="text-base sm:text-lg md:text-xl">
                  {t('satelliteObservations.tableTitle')}
                </div>
                <div className="text-sm sm:text-base font-normal">
                  {t('satelliteObservations.timelineRange')}
                </div>
              </th>
              <th className="text-white py-3 sm:py-4 border-b-2 border-goos-white font-medium w-2/3 p-0" />
            </tr>
          </thead>

          <tbody>
            {satelliteData.map((variable) => (
              <tr key={variable.name}>
                <td className="bg-goos-blue-900 text-white px-3 sm:px-4 md:px-6 border-b border-goos-white text-sm sm:text-base md:text-lg">
                  {variable.name}
                </td>
                <td className="bg-goos-blue-900 border-b border-goos-white p-0">
                  <div className="h-14 relative overflow-hidden">
                    <div
                      className="timeline-bar h-full"
                      style={{ width: '100%', background: variable.gradient }}
                    />
                    {renderEditionMarker()}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>

          <tfoot>
            <tr className="bg-goos-blue-900 p-0">
              <td className="text-white text-left px-3 sm:px-4 md:px-6 py-3 sm:py-4 border-t-2 border-goos-white font-bold w-1/3">
                {t('satelliteObservations.yearLabel')}
              </td>
              <td className="text-white py-3 sm:py-4 border-t-2 border-goos-white font-medium w-2/3 p-0">
                <div className="relative h-5 text-xs sm:text-sm whitespace-nowrap">
                  {SATELLITE_YEAR_LABELS.map((year) => {
                    const left = satelliteYearLabelLeftPercent(year)
                    const alignClass =
                      left <= 0 ? 'translate-x-0' : left >= 100 ? '-translate-x-full' : '-translate-x-1/2'
                    return (
                      <span
                        key={year}
                        className={`absolute ${alignClass} ${isSatelliteFutureYearLabel(year) ? 'opacity-50' : ''}`}
                        style={{ left: `${left}%` }}
                      >
                        {year}
                      </span>
                    )
                  })}
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Legend */}
      <div className="flex gap-4 sm:gap-6 mt-4 sm:mt-6 items-center flex-wrap text-white">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 sm:w-4 sm:h-4 bg-goos-orange-100" />
          <span className="text-xs sm:text-sm">{t('satelliteObservations.legend.inadequate')}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 sm:w-4 sm:h-4 bg-goos-orange-300" />
          <span className="text-xs sm:text-sm">{t('satelliteObservations.legend.marginal')}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 sm:w-4 sm:h-4 bg-goos-orange-500" />
          <span className="text-xs sm:text-sm">{t('satelliteObservations.legend.adequate')}</span>
        </div>
      </div>

      {/* About Essential Variables modal — content in locale files */}
      <div className="flex justify-center mt-12 sm:mt-14 md:mt-10">
        <Button
          variant="modal"
          label={t('satelliteObservations.platformButton')}
          modalTitle={t('satelliteObservations.platformModal.title')}
          modalMaxWidth="lg"
          modalBackgroundColor="bg-goos-blue-900"
          modalContent={
            <div className="flex flex-col gap-4 sm:gap-6">
              <div>
                <p className="text-base sm:text-lg text-white leading-relaxed">
                  {t('satelliteObservations.platformModal.introduction')}
                </p>
              </div>

              {(
                [
                  ['sst', 'sst'],
                  ['sss', 'sss'],
                  ['seaLevel', 'seaLevel'],
                  ['winds', 'winds'],
                  ['seaIce', 'seaIce'],
                  ['seaState', 'seaState'],
                  ['oceanColor', 'oceanColor'],
                ] as const
              ).map(([key, localeKey]) => (
                <div key={key}>
                  <h3 className="text-base sm:text-lg text-goos-orange-500 mb-2 sm:mb-3">
                    {t(`satelliteObservations.platformModal.variables.${localeKey}.title`)}
                  </h3>
                  <p className="text-sm sm:text-base leading-relaxed text-white mb-2">
                    {t(`satelliteObservations.platformModal.variables.${localeKey}.description`)}
                  </p>

                  {!expandedVariables[key] && (
                    <button
                      type="button"
                      onClick={() => toggleVariable(key)}
                      className="text-goos-orange-500 hover:underline focus:outline-none text-sm sm:text-base"
                    >
                      {t('satelliteObservations.platformModal.moreButton')}
                    </button>
                  )}

                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      expandedVariables[key] ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className="text-sm sm:text-base leading-relaxed mb-3 text-white whitespace-pre-line">
                      {t(`satelliteObservations.platformModal.variables.${localeKey}.detailedContent`)}
                    </p>
                    <p className="text-xs sm:text-sm italic text-white mb-3">
                      {t(`satelliteObservations.platformModal.variables.${localeKey}.author`)}
                    </p>
                    <button
                      type="button"
                      onClick={() => toggleVariable(key)}
                      className="text-goos-orange-500 hover:underline focus:outline-none text-sm sm:text-base"
                    >
                      Less...
                    </button>
                  </div>
                </div>
              ))}
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
