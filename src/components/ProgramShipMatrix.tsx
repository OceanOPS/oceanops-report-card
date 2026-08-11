import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { getGeoCountryLabel } from '../utils/geoCountryLabels'
import {
  buildProgramShipMatrixFromGeojson,
  filterProgramShipPairs,
  type ProgramShipPair,
  type ProgramShipMatrix,
} from '../utils/programShipMatrix'

interface ProgramShipMatrixProps {
  mapBaseUrl: string
  className?: string
}

function PairsTable({ pairs }: { pairs: ProgramShipPair[] }) {
  const { t } = useTranslation()

  if (pairs.length === 0) {
    return (
      <p className="text-sm text-white/70">{t('operationalPlatforms.programShipMatrix.empty')}</p>
    )
  }

  return (
    <div className="overflow-auto max-h-[min(58vh,520px)] border border-white/15 rounded">
      <table className="w-full border-collapse text-xs sm:text-sm">
        <thead>
          <tr className="bg-goos-blue-800/90">
            <th scope="col" className="px-3 py-2 text-left font-semibold text-white border border-white/10">
              {t('operationalPlatforms.programShipMatrix.programCountry')}
            </th>
            <th scope="col" className="px-3 py-2 text-left font-semibold text-white border border-white/10">
              {t('operationalPlatforms.programShipMatrix.shipCountry')}
            </th>
            <th scope="col" className="px-3 py-2 text-right font-semibold text-white border border-white/10">
              {t('operationalPlatforms.programShipMatrix.platforms')}
            </th>
          </tr>
        </thead>
        <tbody>
          {pairs.map(({ program, ship, count }) => (
            <tr
              key={`${program}-${ship}`}
              className={program !== ship ? 'bg-sky-400/10' : 'bg-goos-orange-500/10'}
            >
              <td className="px-3 py-1.5 text-white border border-white/10">
                {getGeoCountryLabel(program)}
              </td>
              <td className="px-3 py-1.5 text-white border border-white/10">
                {getGeoCountryLabel(ship)}
              </td>
              <td className="px-3 py-1.5 text-right font-semibold tabular-nums text-white border border-white/10">
                {count.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function ProgramShipMatrix({
  mapBaseUrl,
  className = '',
}: ProgramShipMatrixProps) {
  const { t } = useTranslation()
  const [matrix, setMatrix] = useState<ProgramShipMatrix | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [mismatchesOnly, setMismatchesOnly] = useState(false)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)

    buildProgramShipMatrixFromGeojson(mapBaseUrl)
      .then((data) => {
        if (!cancelled) setMatrix(data)
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setMatrix(null)
          setError(err instanceof Error ? err.message : 'Failed to load matrix')
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [mapBaseUrl])

  const pairs = useMemo(
    () => (matrix ? filterProgramShipPairs(matrix, mismatchesOnly) : []),
    [matrix, mismatchesOnly],
  )

  return (
    <section
      className={`bg-goos-blue-900 px-4 sm:px-8 md:px-12 lg:px-16 pb-8 sm:pb-10 md:pb-12 ${className}`}
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div className="bg-goos-orange-500 h-2 w-20 sm:w-24 md:w-32" />
          <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white leading-tight">
            {t('operationalPlatforms.programShipMatrix.title')}
          </h3>
          <p className="text-sm sm:text-base text-white/80 max-w-3xl">
            {t('operationalPlatforms.programShipMatrix.description')}
          </p>
        </div>

        {loading && (
          <p className="text-sm text-white/70">{t('operationalPlatforms.programShipMatrix.loading')}</p>
        )}

        {error && !loading && (
          <p className="text-sm text-white/70">{t('operationalPlatforms.programShipMatrix.error')}</p>
        )}

        {matrix && !loading && !error && (
          <>
            <p className="text-sm text-white/85">
              {t('operationalPlatforms.programShipMatrix.summary', {
                total: matrix.totalPlatforms.toLocaleString(),
                mismatches: matrix.mismatchCount.toLocaleString(),
              })}
            </p>

            <label className="inline-flex items-center gap-2 text-sm text-white/90 cursor-pointer w-fit">
              <input
                type="checkbox"
                checked={mismatchesOnly}
                onChange={(event) => setMismatchesOnly(event.target.checked)}
                className="accent-goos-orange-500"
              />
              {t('operationalPlatforms.programShipMatrix.mismatchesOnly')}
            </label>

            <PairsTable pairs={pairs} />

            <p className="text-xs text-white/60 max-w-3xl">
              {t('operationalPlatforms.programShipMatrix.footnote')}
            </p>
          </>
        )}
      </div>
    </section>
  )
}
