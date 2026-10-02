import { useTranslation } from 'react-i18next'
import type { ContributingCountriesYoy, CountryYoyEntry, NetworkYoyRow, ObservationsNetworkYoy } from '../utils/editionYoy'
import { resolveCountryDisplayName } from '../utils/countryDisplayName'
import {
  formatExportPeriodRange,
  formatNetworkAvgPerDay,
  formatObservationsDeltaPct,
  formatAlignedYoyPeriods,
} from '../utils/formatObservationsPerDay'
import {
  OBSERVATIONS_PER_DAY_AVG,
  OBSERVATIONS_PER_DAY_AVG_LAST_YEAR,
  OBSERVATIONS_PER_DAY_DELTA_VS_LAST_YEAR,
} from '../data/editionStats'
import { partnerNetworkLabelKey, sortCountryYoyNetworks } from '../utils/partnerNetworkLabels'

export function ObservationsYoyDetail({
  data,
  networks,
}: {
  data: ObservationsNetworkYoy
  networks: NetworkYoyRow[]
}) {
  const { t, i18n } = useTranslation()
  const locale =
    i18n.language === 'fr' ? 'fr-FR' : i18n.language === 'es' ? 'es-ES' : 'en-US'

  const fallbackPeriods = formatAlignedYoyPeriods(locale)
  const currentRange = data.currentPeriod
    ? formatExportPeriodRange(data.currentPeriod, locale)
    : fallbackPeriods.currentRange
  const previousRange = data.previousPeriod
    ? formatExportPeriodRange(data.previousPeriod, locale)
    : fallbackPeriods.previousRange

  const currentAvg = data.headline?.currentAvgPerDay ?? OBSERVATIONS_PER_DAY_AVG
  const previousAvg = data.headline?.previousAvgPerDay ?? OBSERVATIONS_PER_DAY_AVG_LAST_YEAR
  const deltaAvg = data.headline?.deltaAvg ?? OBSERVATIONS_PER_DAY_DELTA_VS_LAST_YEAR
  const deltaPct = formatObservationsDeltaPct(deltaAvg)

  return (
    <div className="space-y-3 text-left text-goos-white">
      <div className="space-y-1.5">
        <p className="text-xs font-semibold uppercase tracking-wide text-goos-white/90">
          {t('content.section1.stats.evolutionDetail.observationsPeriodTitle')}
        </p>
        <p className="text-xs leading-relaxed text-goos-white/75">
          {t('content.section1.stats.evolutionDetail.observationsPeriodIntro')}
        </p>
        <ul className="space-y-1 text-sm">
          <li className="tabular-nums">
            {t('content.section1.stats.evolutionDetail.observationsPeriodLine', {
              year: data.currentYear ?? new Date().getFullYear(),
              range: currentRange,
              avg: formatNetworkAvgPerDay(currentAvg, i18n.language),
            })}
          </li>
          <li className="tabular-nums">
            {t('content.section1.stats.evolutionDetail.observationsPeriodLine', {
              year: data.previousYear,
              range: previousRange,
              avg: formatNetworkAvgPerDay(previousAvg, i18n.language),
            })}
          </li>
        </ul>
        <p
          className={`text-sm font-medium tabular-nums ${
            deltaAvg >= 0 ? 'text-goos-cyan-400' : 'text-goos-blue-300'
          }`}
        >
          {t('content.section1.stats.evolutionDetail.observationsPeriodChange', {
            signedDelta: `${deltaAvg >= 0 ? '+' : '−'}${formatNetworkAvgPerDay(Math.abs(deltaAvg), i18n.language)}`,
            pct: deltaPct,
            year: data.previousYear,
          })}
        </p>
      </div>

      {networks.length > 0 && (
        <NetworkYoyDetail networks={networks} year={data.previousYear} nested />
      )}
    </div>
  )
}

export function NetworkYoyDetail({
  networks,
  year,
  nested = false,
}: {
  networks: NetworkYoyRow[]
  year: number | string
  nested?: boolean
}) {
  const { t, i18n } = useTranslation()

  if (networks.length === 0) return null

  return (
    <div className={`space-y-2 text-left text-goos-white ${nested ? 'pt-1 border-t border-white/10' : ''}`}>
      <p className="text-xs font-semibold uppercase tracking-wide text-goos-white/90">
        {t('content.section1.stats.evolutionDetail.networksTitle', { year })}
      </p>
      <ul className="space-y-1.5">
        {networks.map((row) => {
          const previousAvg = row.previous?.avgPerDay ?? 0
          const currentAvg = row.current?.avgPerDay ?? 0
          const delta = row.deltaAvg ?? currentAvg - previousAvg
          const changeLabel = t('content.section1.stats.evolutionDetail.networkAvgRange', {
            previous: formatNetworkAvgPerDay(previousAvg, i18n.language),
            current: formatNetworkAvgPerDay(currentAvg, i18n.language),
          })

          return (
            <li key={row.id} className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-3">
              <span className="text-sm text-goos-white/90">{row.label}</span>
              <span
                className={`shrink-0 text-sm font-medium tabular-nums ${
                  delta >= 0 ? 'text-goos-cyan-400' : 'text-goos-blue-300'
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

  const countryLabel = (entry: CountryYoyEntry) =>
    resolveCountryDisplayName(entry.iso, entry.name, i18n.language)

  const renderCountryRow = (entry: CountryYoyEntry, prefix: string) => {
    const networks = entry.networks?.length
      ? sortCountryYoyNetworks(entry.networks)
      : null

    return (
      <li key={entry.iso} className="space-y-0.5">
        <div>
          {prefix} {countryLabel(entry)}
        </div>
        {networks && networks.length > 0 && (
          <ul className="pl-3 text-xs text-goos-white/70 space-y-0.5">
            {networks.map(({ id, count }) => (
              <li key={id}>
                −{' '}
                {t('content.section1.stats.evolutionDetail.countryNetworkCount', {
                  network: t(partnerNetworkLabelKey(id)),
                  count,
                })}
              </li>
            ))}
          </ul>
        )}
      </li>
    )
  }

  return (
    <div className="space-y-3 text-left text-goos-white">
      <p className="text-xs font-semibold uppercase tracking-wide text-goos-white/90">
        {t('content.section1.stats.evolutionDetail.countriesTitle', {
          year: data.previousYear,
        })}
      </p>
      {data.appeared.length > 0 && (
        <div>
          <p className="text-xs font-medium text-goos-cyan-400 mb-1">
            {t('content.section1.stats.evolutionDetail.appeared', {
              count: data.appeared.length,
            })}
          </p>
          <ul className="text-sm opacity-90 space-y-1">
            {data.appeared.map((entry) => renderCountryRow(entry, '+'))}
          </ul>
        </div>
      )}
      {data.disappeared.length > 0 && (
        <div>
          <p className="text-xs font-medium text-goos-blue-300 mb-1">
            {t('content.section1.stats.evolutionDetail.disappeared', {
              count: data.disappeared.length,
            })}
          </p>
          <ul className="text-sm opacity-90 space-y-1">
            {data.disappeared.map((entry) => renderCountryRow(entry, '−'))}
          </ul>
        </div>
      )}
    </div>
  )
}
