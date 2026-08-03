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
}

function rowBackgroundClass(isEmerging: boolean, isExpanded: boolean): string {
  if (isEmerging) {
    return isExpanded
      ? 'bg-goos-blue-500/50'
      : 'bg-goos-blue-600/45 hover:bg-goos-blue-500/45'
  }
  return isExpanded ? 'bg-goos-blue-800' : 'hover:bg-goos-blue-800/50'
}

export default function NetworkComparisonMatrix({
  networks,
  className = '',
}: NetworkComparisonMatrixProps) {
  const { t } = useTranslation()
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState<DeliveryAreaFilter>('all')
  const [activeVariableFilter, setActiveVariableFilter] =
    useState<EssentialVariableFilter>('all')
  const [expandedNetworkId, setExpandedNetworkId] = useState<string | null>(null)

  const essentialVariableOptions = useMemo(
    () => collectEssentialVariableOptions(networks),
    [networks],
  )

  const filteredNetworks = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()

    return networks.filter((network) => {
      const matchesDeliveryFilter =
        activeFilter === 'all' || network.deliveryAreas.includes(activeFilter)

      const matchesVariableFilter =
        activeVariableFilter === 'all' ||
        network.essentialVariables.includes(activeVariableFilter)

      if (!matchesDeliveryFilter || !matchesVariableFilter) return false
      if (!query) return true

      const searchableText = [
        t(network.titleKey),
        t(network.detailsKeys.applications),
        t(network.detailsKeys.coverage),
        network.detailsKeys.targets ? t(network.detailsKeys.targets) : '',
        network.detailsKeys.maturity ? t(network.detailsKeys.maturity) : '',
        ...network.essentialVariables.map((key) => t(essentialVariableLabelKey(key))),
      ]
        .join(' ')
        .toLowerCase()

      return searchableText.includes(query)
    })
  }, [networks, activeFilter, activeVariableFilter, searchQuery, t])

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
          <p className="text-white/60 text-sm">
            {t('networks.comparison.desktopExpandHint')}
          </p>
        </div>
      </div>

      <div className="px-4 sm:px-8 md:px-12 lg:px-16 pb-6 flex flex-col gap-4">
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t('networks.comparison.searchPlaceholder')}
          className="w-full max-w-md bg-goos-blue-800 border border-white/20 text-white placeholder:text-white/50 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-goos-orange-500"
          aria-label={t('networks.comparison.searchPlaceholder')}
        />

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

        <p className="text-white/70 text-sm">
          {t('networks.comparison.networksShown', { count: filteredNetworks.length })}
        </p>
      </div>

      <div className="px-4 sm:px-8 md:px-12 lg:px-16 pb-10 overflow-x-auto">
        <table className="w-full min-w-[1100px] border-collapse">
          <thead>
            <tr className="border-b border-white/20">
              <th className="text-left text-white text-sm font-semibold p-3 min-w-[220px] align-bottom">
                <div className="flex flex-col gap-2">
                  <span>{t('networks.comparison.columns.network')}</span>
                  <div
                    className="flex flex-col gap-1.5 text-xs font-normal text-white/70"
                    role="group"
                    aria-label={t('networks.comparison.legendLabel')}
                  >
                    <span className="inline-flex items-center gap-2">
                      <span
                        className="inline-block h-3 w-5 shrink-0 rounded-sm bg-goos-blue-800 border border-white/20"
                        aria-hidden="true"
                      />
                      {t('networks.comparison.legendMature')}
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <span
                        className="inline-block h-3 w-5 shrink-0 rounded-sm bg-goos-blue-500/50 border border-goos-blue-300/70"
                        aria-hidden="true"
                      />
                      {t('networks.comparison.legendEmerging')}
                    </span>
                  </div>
                </div>
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
            {filteredNetworks.map((network) => {
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
                      isEmerging,
                      isExpanded,
                    )}`}
                  >
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        <span
                          className={`text-goos-orange-500 text-xs shrink-0 transition-transform ${
                            isExpanded ? 'rotate-90' : ''
                          }`}
                          aria-hidden="true"
                        >
                          ▶
                        </span>
                        <img
                          src={asset(network.iconPath)}
                          alt={t(network.iconAlt)}
                          className="w-10 h-10 object-contain shrink-0"
                        />
                        <div>
                          <p className="text-white text-sm font-medium">{t(network.titleKey)}</p>
                          {isEmerging && (
                            <p className="text-goos-blue-200 text-[11px] font-medium uppercase tracking-wide">
                              {t('networks.comparison.emergingBadge')}
                            </p>
                          )}
                          <a
                            href={network.networkUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-goos-orange-500 text-xs underline decoration-dotted"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {t('networks.viewNetwork')}
                          </a>
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
                    <tr
                      key={`${network.id}-details`}
                      className={`border-b border-white/10 ${
                        isEmerging ? 'bg-goos-blue-500/50' : 'bg-goos-blue-800'
                      }`}
                    >
                      <td colSpan={COLUMN_COUNT} className="p-4 md:p-6">
                        <NetworkDetailsPanel network={network} layout="grid" />
                      </td>
                    </tr>
                  )}
                </Fragment>
              )
            })}
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
