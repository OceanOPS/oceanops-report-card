import { Fragment, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Tooltip from './Tooltip'
import NetworkDetailsPanel from './NetworkDetailsPanel'
import { asset } from '../utils/assets'
import { RatingCell } from '../utils/networkRatings'
import type { DeliveryAreaFilter, EssentialVariableFilter, InSituNetwork } from '../types/inSituNetworks'
import {
  collectEssentialVariableOptions,
  essentialVariableLabelKey,
} from '../utils/essentialVariables'
import { hasEmergingNetworkMedia } from '../data/emergingNetworkMedia'

const DELIVERY_AREAS_CONFIG = {
  climate: {
    icon: asset('/icons/climate.png'),
    labelKey: 'networks.deliveryAreas.climate',
  },
  operational: {
    icon: asset('/icons/operational_services.png'),
    labelKey: 'networks.deliveryAreas.operational',
  },
  oceanhealth: {
    icon: asset('/icons/ocean_health.png'),
    labelKey: 'networks.deliveryAreas.oceanhealth',
  },
} as const

const FILTER_OPTIONS: DeliveryAreaFilter[] = [
  'all',
  'climate',
  'operational',
  'oceanhealth',
]

const COLUMN_COUNT = 7

interface NetworkComparisonMatrixProps {
  networks: InSituNetwork[]
  className?: string
  onOpenEmergingMedia?: (networkId: string) => void
}

function rowBackgroundClass(isExpanded: boolean): string {
  return isExpanded ? 'bg-goos-blue-800' : 'hover:bg-goos-blue-800/50'
}

function SectionHeaderRow({ label }: { label: string }) {
  return (
    <tr className="border-b border-white/10">
      <td colSpan={COLUMN_COUNT} className="px-3 pt-6 pb-3">
        <div className="flex items-center gap-3">
          <span className="bg-goos-orange-500 h-1.5 w-10 shrink-0" aria-hidden="true" />
          <p className="text-goos-orange-500 text-xs font-bold uppercase tracking-[0.14em]">
            {label}
          </p>
        </div>
      </td>
    </tr>
  )
}

export default function NetworkComparisonMatrix({
  networks,
  className = '',
  onOpenEmergingMedia,
}: NetworkComparisonMatrixProps) {
  const { t } = useTranslation()
  const [activeFilter, setActiveFilter] = useState<DeliveryAreaFilter>('all')
  const [activeVariableFilter, setActiveVariableFilter] =
    useState<EssentialVariableFilter>('all')
  const [expandedNetworkId, setExpandedNetworkId] = useState<string | null>(null)

  const essentialVariableOptions = useMemo(
    () => collectEssentialVariableOptions(networks),
    [networks],
  )

  const filteredNetworks = useMemo(() => {
    return networks.filter((network) => {
      const matchesDeliveryFilter =
        activeFilter === 'all' || network.deliveryAreas.includes(activeFilter)

      const matchesVariableFilter =
        activeVariableFilter === 'all' ||
        network.essentialVariables.includes(activeVariableFilter)

      return matchesDeliveryFilter && matchesVariableFilter
    })
  }, [networks, activeFilter, activeVariableFilter])

  const matureNetworks = useMemo(
    () => filteredNetworks.filter((network) => network.maturity !== 'emerging'),
    [filteredNetworks],
  )

  const emergingNetworks = useMemo(
    () => filteredNetworks.filter((network) => network.maturity === 'emerging'),
    [filteredNetworks],
  )

  const toggleExpanded = (networkId: string) => {
    setExpandedNetworkId((current) => (current === networkId ? null : networkId))
  }

  const ratingColumns = [
    {
      key: 'implementationStatus' as const,
      labelKey: 'networks.ratings.implementationStatus',
      tooltipKey: 'networks.ratingsTooltips.implementationStatus',
    },
    {
      key: 'realTime' as const,
      labelKey: 'networks.ratings.realTime',
      tooltipKey: 'networks.ratingsTooltips.realTime',
    },
    {
      key: 'archivedHighQuality' as const,
      labelKey: 'networks.ratings.archivedHighQuality',
      tooltipKey: 'networks.ratingsTooltips.archivedHighQuality',
    },
    {
      key: 'metadata' as const,
      labelKey: 'networks.ratings.metadata',
      tooltipKey: 'networks.ratingsTooltips.metadata',
    },
    {
      key: 'bestPractices' as const,
      labelKey: 'networks.ratings.bestPractices',
      tooltipKey: 'networks.ratingsTooltips.bestPractices',
    },
  ]

  const renderNetworkRows = (sectionNetworks: InSituNetwork[]) =>
    sectionNetworks.map((network) => {
      const isExpanded = expandedNetworkId === network.id
      const isEmerging = network.maturity === 'emerging'

      return (
        <Fragment key={network.id}>
          <tr
            role="button"
            tabIndex={0}
            aria-expanded={isExpanded}
            onClick={() => toggleExpanded(network.id)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault()
                toggleExpanded(network.id)
              }
            }}
            className={`border-b border-white/10 transition-colors cursor-pointer ${rowBackgroundClass(
              isExpanded,
            )}`}
          >
            <td className="p-3">
              <div className="flex items-center gap-3">
                <span
                  className="text-goos-orange-500 text-base font-bold leading-none shrink-0 w-4 text-center tabular-nums"
                  aria-hidden="true"
                >
                  {isExpanded ? '−' : '+'}
                </span>
                <img
                  src={asset(network.iconPath)}
                  alt={t(network.iconAlt)}
                  className="w-10 h-10 object-contain shrink-0"
                />
                <div>
                  <p className="text-white text-sm font-medium">{t(network.titleKey)}</p>
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                    <a
                      href={network.networkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-goos-orange-500 text-xs underline decoration-dotted"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {t('networks.viewNetwork')}
                    </a>
                    {isEmerging &&
                      hasEmergingNetworkMedia(network.id) &&
                      onOpenEmergingMedia && (
                        <>
                          <span className="text-white/30 text-xs" aria-hidden="true">
                            ·
                          </span>
                          <button
                            type="button"
                            className="text-goos-orange-500 text-xs underline decoration-dotted hover:opacity-90"
                            onClick={(event) => {
                              event.stopPropagation()
                              onOpenEmergingMedia(network.id)
                            }}
                          >
                            {t('emerging.moreLink')}
                          </button>
                        </>
                      )}
                  </div>
                </div>
              </div>
            </td>
            {ratingColumns.map((column) => (
              <td key={column.key} className="p-3 text-center align-middle">
                <div className="flex justify-center">
                  <RatingCell
                    rating={network.ratings[column.key]}
                    t={t}
                    accentColor="text-goos-orange-500"
                    textColor="text-white"
                    compact
                  />
                </div>
              </td>
            ))}
            <td className="p-3">
              <div className="flex justify-center gap-2">
                {network.deliveryAreas.map((areaKey) => {
                  const area = DELIVERY_AREAS_CONFIG[areaKey]
                  return (
                    <Tooltip
                      key={areaKey}
                      content={area.labelKey}
                      backgroundColor="bg-goos-blue-900"
                      textColor="text-goos-white"
                    >
                      <div className="bg-goos-cyan-200 rounded-full p-1.5 w-9 h-9 flex items-center justify-center">
                        <img
                          src={area.icon}
                          alt={t(area.labelKey)}
                          className="object-contain text-goos-deep-blue"
                        />
                      </div>
                    </Tooltip>
                  )
                })}
              </div>
            </td>
          </tr>
          {isExpanded && (
            <tr key={`${network.id}-details`} className="border-b border-white/10 bg-goos-blue-800">
              <td colSpan={COLUMN_COUNT} className="p-4 md:p-6">
                <div className="flex flex-col gap-4">
                  {isEmerging &&
                    hasEmergingNetworkMedia(network.id) &&
                    onOpenEmergingMedia && (
                      <div>
                        <button
                          type="button"
                          onClick={() => onOpenEmergingMedia(network.id)}
                          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-goos-orange-500 text-white hover:bg-goos-orange-600 transition-colors"
                        >
                          {t('emerging.viewMore')}
                        </button>
                      </div>
                    )}
                  <NetworkDetailsPanel network={network} layout="grid" />
                </div>
              </td>
            </tr>
          )}
        </Fragment>
      )
    })

  return (
    <section className={`bg-goos-blue-900 ${className}`}>
      <div className="px-4 sm:px-8 md:px-12 lg:px-16 pt-8 pb-4">
        <div className="flex flex-col gap-4 sm:gap-5 md:gap-6">
          <div className="bg-goos-orange-500 h-2 w-20 sm:w-24 md:w-32" />
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight">
            {t('networks.comparison.title')}
          </h3>
          <p
            className="text-white/80 text-sm sm:text-base max-w-4xl"
            dangerouslySetInnerHTML={{ __html: t('networks.comparison.description') }}
          />
        </div>
      </div>

      <div className="px-4 sm:px-8 md:px-12 lg:px-16 pb-6 flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <p className="text-white/80 text-xs font-semibold uppercase tracking-wide">
            {t('networks.deliveryAreasLabel')}
          </p>
          <div className="flex flex-wrap gap-2">
            {FILTER_OPTIONS.map((filter) => {
              const isActive = activeFilter === filter
              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-goos-orange-500 text-white'
                      : 'bg-goos-blue-800 text-white border border-white/20 hover:border-white/40'
                  }`}
                >
                  {t(`networks.comparison.filters.${filter}`)}
                </button>
              )
            })}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-white/80 text-xs font-semibold uppercase tracking-wide">
            {t('networks.essentialVariablesLabel')}
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setActiveVariableFilter('all')}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                activeVariableFilter === 'all'
                  ? 'bg-goos-orange-500 text-white'
                  : 'bg-goos-blue-800 text-white border border-white/20 hover:border-white/40'
              }`}
            >
              {t('networks.comparison.filters.all')}
            </button>
            {essentialVariableOptions.map((variableKey) => {
              const isActive = activeVariableFilter === variableKey
              return (
                <button
                  key={variableKey}
                  type="button"
                  onClick={() => setActiveVariableFilter(variableKey)}
                  className={`px-4 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-goos-orange-500 text-white'
                      : 'bg-goos-blue-800 text-white border border-white/20 hover:border-white/40'
                  }`}
                >
                  {t(essentialVariableLabelKey(variableKey))}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-8 md:px-12 lg:px-16 pb-10 overflow-x-auto">
        <table className="w-full min-w-[1100px] border-collapse">
          <thead>
            <tr className="border-b border-white/20">
              <th className="text-left text-white text-sm font-semibold p-3 min-w-[220px] align-bottom">
                {t('networks.comparison.columns.network')}
              </th>
              {ratingColumns.map((column) => (
                <th
                  key={column.key}
                  className="text-center text-white text-sm font-semibold p-3 min-w-[120px]"
                >
                  <Tooltip
                    content={t(column.tooltipKey)}
                    backgroundColor="bg-goos-blue-900"
                    textColor="text-goos-white"
                  >
                    <span className="underline decoration-dotted decoration-white/30 cursor-help">
                      {t(column.labelKey)}
                    </span>
                  </Tooltip>
                </th>
              ))}
              <th className="text-center text-white text-sm font-semibold p-3 min-w-[140px]">
                {t('networks.deliveryAreasLabel')}
              </th>
            </tr>
          </thead>
          <tbody>
            {matureNetworks.length > 0 && (
              <>
                <SectionHeaderRow label={t('networks.comparison.sectionMature')} />
                {renderNetworkRows(matureNetworks)}
              </>
            )}
            {emergingNetworks.length > 0 && (
              <>
                <SectionHeaderRow label={t('networks.comparison.sectionEmerging')} />
                {renderNetworkRows(emergingNetworks)}
              </>
            )}
          </tbody>
        </table>

        {filteredNetworks.length === 0 && (
          <p className="text-white/70 text-center py-10 text-sm">
            {t('networks.comparison.noResults')}
          </p>
        )}
      </div>
    </section>
  )
}
