import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import CountryNameCell from './CountryNameCell'
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

function pctOf(value: number, total: number): number {
  if (total <= 0) return 0
  return (value / total) * 100
}

/** Numeric value for i18n strings that append their own "%". */
function formatPctNumber(value: number, total: number): number {
  const pct = pctOf(value, total)
  return pct >= 10 ? Math.round(pct) : Math.round(pct * 10) / 10
}

function formatPctDisplay(value: number, total: number): string {
  const pct = pctOf(value, total)
  if (pct >= 10) return `${Math.round(pct)}%`
  if (pct >= 1) return `${pct.toFixed(1)}%`
  return `${pct.toFixed(1)}%`
}

function PairsTable({
  pairs,
  totalPlatforms,
  getProgramTotal,
}: {
  pairs: ProgramShipPair[]
  totalPlatforms: number
  getProgramTotal: (program: string) => number
}) {
  const { t } = useTranslation()

  if (pairs.length === 0) {
    return (
      <p className="text-sm text-white/70">{t('operationalPlatforms.programShipMatrix.empty')}</p>
    )
  }

  return (
    <div className="w-full">
      <div className="flex flex-col gap-2 mb-3">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs sm:text-sm text-white/70">
          <span className="inline-flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-sm bg-goos-orange-500/70 shrink-0" aria-hidden />
            {t('operationalPlatforms.programShipMatrix.legendSame')}
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-sm bg-sky-400/50 shrink-0" aria-hidden />
            {t('operationalPlatforms.programShipMatrix.legendDifferent')}
          </span>
        </div>
        <p className="text-xs text-white/55">
          {t('operationalPlatforms.programShipMatrix.columnGuide')}
        </p>
      </div>

      <div className="overflow-auto max-h-[min(58vh,540px)] border border-white/15 rounded-md">
        <table className="w-full border-collapse text-sm table-fixed">
          <colgroup>
            <col className="w-[30%]" />
            <col className="w-[30%]" />
            <col className="w-[14%]" />
            <col className="w-[13%]" />
            <col className="w-[13%]" />
          </colgroup>
          <thead className="sticky top-0 z-10">
            <tr className="bg-goos-blue-800 text-white/90">
              <th scope="col" className="px-3 py-2.5 text-left font-semibold">
                {t('operationalPlatforms.programShipMatrix.programCountry')}
              </th>
              <th scope="col" className="px-3 py-2.5 text-left font-semibold">
                {t('operationalPlatforms.programShipMatrix.shipCountry')}
              </th>
              <th scope="col" className="px-3 py-2.5 text-right font-semibold">
                {t('operationalPlatforms.programShipMatrix.platforms')}
              </th>
              <th
                scope="col"
                className="px-3 py-2.5 text-right font-semibold whitespace-nowrap"
                title={t('operationalPlatforms.programShipMatrix.shareTotalHint')}
              >
                {t('operationalPlatforms.programShipMatrix.shareTotal')}
              </th>
              <th
                scope="col"
                className="px-3 py-2.5 text-right font-semibold whitespace-nowrap hidden sm:table-cell"
                title={t('operationalPlatforms.programShipMatrix.shareProgramHint')}
              >
                {t('operationalPlatforms.programShipMatrix.shareProgram')}
              </th>
            </tr>
          </thead>
          <tbody>
            {pairs.map(({ program, ship, count }) => {
              const isMatch = program === ship
              const programTotal = getProgramTotal(program)

              return (
                <tr
                  key={`${program}-${ship}`}
                  className={isMatch ? 'bg-goos-orange-500/10' : 'bg-sky-400/10'}
                >
                  <td className="px-3 py-2 text-white border-t border-white/10">
                    <CountryNameCell country={program} />
                  </td>
                  <td className="px-3 py-2 text-white border-t border-white/10">
                    <CountryNameCell country={ship} />
                  </td>
                  <td className="px-3 py-2 text-right font-semibold tabular-nums text-white border-t border-white/10">
                    {count.toLocaleString()}
                  </td>
                  <td className="px-3 py-2 text-right tabular-nums text-white/80 border-t border-white/10 whitespace-nowrap">
                    {formatPctDisplay(count, totalPlatforms)}
                  </td>
                  <td className="px-3 py-2 text-right tabular-nums text-white/80 border-t border-white/10 whitespace-nowrap hidden sm:table-cell">
                    {formatPctDisplay(count, programTotal)}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
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

  const mismatchPct = matrix
    ? formatPctNumber(matrix.mismatchCount, matrix.totalPlatforms)
    : 0
  const samePct = matrix
    ? formatPctNumber(matrix.totalPlatforms - matrix.mismatchCount, matrix.totalPlatforms)
    : 0

  return (
    <section
      className={`bg-goos-blue-900 px-4 sm:px-8 md:px-12 lg:px-16 pt-8 sm:pt-10 md:pt-12 pb-8 sm:pb-10 md:pb-12 ${className}`}
    >
      <div className="flex flex-col gap-6 sm:gap-8">
        <div className="flex flex-col gap-2 w-full">
          <div className="bg-goos-orange-500 h-2 w-20 sm:w-24 md:w-32" />
          <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white leading-tight">
            {t('operationalPlatforms.programShipMatrix.title')}
          </h3>
          <p className="text-sm sm:text-base text-white/80">
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
          <div className="flex flex-col gap-4 sm:gap-5">
            <div className="flex flex-col gap-4 w-full">
              <div className="flex flex-wrap gap-2.5">
                <span className="inline-flex items-center px-3 py-1.5 rounded-md bg-goos-blue-800 text-sm text-white/90 tabular-nums">
                  {matrix.totalPlatforms.toLocaleString()} platforms
                </span>
                <span className="inline-flex items-center px-3 py-1.5 rounded-md bg-goos-blue-800 text-sm text-white/90 tabular-nums">
                  {t('operationalPlatforms.programShipMatrix.statsPairs', {
                    count: matrix.pairs.length,
                  })}
                </span>
                <span className="inline-flex items-center px-3 py-1.5 rounded-md bg-goos-orange-500/15 text-sm text-goos-orange-400 tabular-nums">
                  {t('operationalPlatforms.programShipMatrix.statsSameShare', { pct: samePct })}
                </span>
                <span className="inline-flex items-center px-3 py-1.5 rounded-md bg-sky-400/10 text-sm text-sky-300 tabular-nums">
                  {t('operationalPlatforms.programShipMatrix.statsMismatchShare', {
                    pct: mismatchPct,
                  })}
                </span>
              </div>

              <label className="inline-flex items-center gap-2.5 text-sm text-white/90 cursor-pointer w-fit">
                <input
                  type="checkbox"
                  checked={mismatchesOnly}
                  onChange={(event) => setMismatchesOnly(event.target.checked)}
                  className="accent-goos-orange-500"
                />
                {t('operationalPlatforms.programShipMatrix.mismatchesOnly')}
              </label>
            </div>

            <PairsTable
              pairs={pairs}
              totalPlatforms={matrix.totalPlatforms}
              getProgramTotal={matrix.getProgramTotal}
            />

            <p className="text-xs sm:text-sm text-white/60 w-full">
              {t('operationalPlatforms.programShipMatrix.footnote')}
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
