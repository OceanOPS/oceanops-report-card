import { useTranslation } from 'react-i18next'
import type { ContributingCountriesYoy, NetworkYoyRow } from '../utils/editionYoy'
import { resolveCountryDisplayName } from '../utils/countryDisplayName'
import { formatNetworkAvgPerDay } from '../utils/formatObservationsPerDay'

export function NetworkYoyDetail({
  networks,
  year,
}: {
  networks: NetworkYoyRow[]
  year: number | string
}) {
  const { t } = useTranslation()

  if (networks.length === 0) return null

  return (
    <div className="space-y-2 text-left text-goos-white">
      <p className="text-xs font-semibold uppercase tracking-wide text-goos-white/90">
        {t('content.section1.stats.evolutionDetail.networksTitle', { year })}
      </p>
      <ul className="space-y-1.5">
        {networks.map((row) => {
          const previousAvg = row.previous?.avgPerDay ?? 0
          const currentAvg = row.current?.avgPerDay ?? 0
          const delta = row.deltaAvg ?? currentAvg - previousAvg
          const changeLabel = t('content.section1.stats.evolutionDetail.networkAvgRange', {
            previous: formatNetworkAvgPerDay(previousAvg),
            current: formatNetworkAvgPerDay(currentAvg),
          })

          return (
            <li key={row.id} className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-3">
              <span className="text-sm text-goos-white/90">{row.label}</span>
              <span
                className={`shrink-0 text-sm font-medium tabular-nums ${
                  delta >= 0 ? 'text-goos-green-300' : 'text-red-300'
                }`}
              >
                {changeLabel}
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export function CountriesYoyDetail({ data }: { data: ContributingCountriesYoy }) {
  const { t, i18n } = useTranslation()

  if (data.baselineMissing) return null
  if (data.appeared.length === 0 && data.disappeared.length === 0) return null

  const countryLabel = (entry: { iso: string; name: string }) =>
    resolveCountryDisplayName(entry.iso, entry.name, i18n.language)

  return (
    <div className="space-y-3 text-left text-goos-white">
      <p className="text-xs font-semibold uppercase tracking-wide text-goos-white/90">
        {t('content.section1.stats.evolutionDetail.countriesTitle', {
          year: data.previousYear,
        })}
      </p>
      {data.appeared.length > 0 && (
        <div>
          <p className="text-xs font-medium text-goos-green-300 mb-1">
            {t('content.section1.stats.evolutionDetail.appeared', {
              count: data.appeared.length,
            })}
          </p>
          <ul className="text-sm opacity-90 space-y-0.5">
            {data.appeared.map((entry) => (
              <li key={entry.iso}>+ {countryLabel(entry)}</li>
            ))}
          </ul>
        </div>
      )}
      {data.disappeared.length > 0 && (
        <div>
          <p className="text-xs font-medium text-red-300 mb-1">
            {t('content.section1.stats.evolutionDetail.disappeared', {
              count: data.disappeared.length,
            })}
          </p>
          <ul className="text-sm opacity-90 space-y-0.5">
            {data.disappeared.map((entry) => (
              <li key={entry.iso}>− {countryLabel(entry)}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
