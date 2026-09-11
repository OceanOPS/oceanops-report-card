import { useTranslation } from 'react-i18next'
import type { InSituNetwork, InSituNetworkDetailsKeys } from '../types/inSituNetworks'

interface NetworkDetailsPanelProps {
  network: InSituNetwork
  layout?: 'stack' | 'grid'
  textColor?: string
  accentColor?: string
  className?: string
}

const DETAIL_FIELD_ORDER: {
  key: keyof InSituNetworkDetailsKeys
  labelKey: string
}[] = [
  { key: 'applications', labelKey: 'networks.comparison.applications' },
  { key: 'coverage', labelKey: 'networks.comparison.coverage' },
  { key: 'essentialVariablesMeasured', labelKey: 'networks.comparison.essentialVariablesMeasured' },
  { key: 'implementationProgress', labelKey: 'networks.comparison.implementationProgress' },
  { key: 'platformType', labelKey: 'networks.comparison.platformType' },
  { key: 'samplingFrequency', labelKey: 'networks.comparison.samplingFrequency' },
  { key: 'activityTrend', labelKey: 'networks.comparison.activityTrend' },
  { key: 'targets', labelKey: 'networks.comparison.targets' },
  { key: 'maturity', labelKey: 'networks.comparison.maturity' },
  { key: 'challenges', labelKey: 'networks.comparison.challenges' },
  { key: 'opportunities', labelKey: 'networks.comparison.opportunities' },
]

/** Desktop matrix: two stacked columns (not row-major grid) — matches flip-card reading order. */
const GRID_LEFT_COLUMN_KEYS: (keyof InSituNetworkDetailsKeys)[] = [
  'applications',
  'coverage',
  'essentialVariablesMeasured',
  'platformType',
  'activityTrend',
  'opportunities',
]

const GRID_RIGHT_COLUMN_KEYS: (keyof InSituNetworkDetailsKeys)[] = [
  'implementationProgress',
  'samplingFrequency',
  'targets',
  'maturity',
  'challenges',
]

const DETAIL_FIELD_BY_KEY = Object.fromEntries(
  DETAIL_FIELD_ORDER.map((field) => [field.key, field]),
) as Record<keyof InSituNetworkDetailsKeys, (typeof DETAIL_FIELD_ORDER)[number]>

export default function NetworkDetailsPanel({
  network,
  layout = 'stack',
  textColor = 'text-white',
  accentColor = 'text-goos-orange-500',
  className = '',
}: NetworkDetailsPanelProps) {
  const { t } = useTranslation()

  const fields = DETAIL_FIELD_ORDER.flatMap(({ key, labelKey }) => {
    const valueKey = network.detailsKeys[key]
    if (!valueKey) return []
    return [{ key, labelKey, valueKey }]
  })

  const fieldsForColumnKeys = (columnKeys: (keyof InSituNetworkDetailsKeys)[]) =>
    columnKeys.flatMap((key) => {
      const valueKey = network.detailsKeys[key]
      if (!valueKey) return []
      const meta = DETAIL_FIELD_BY_KEY[key]
      return [{ key, labelKey: meta.labelKey, valueKey }]
    })

  const renderField = (field: { key: string; labelKey: string; valueKey: string }) => (
    <div key={field.key}>
      <p className={`${accentColor} text-sm font-semibold uppercase tracking-wide`}>
        {t(field.labelKey)}
      </p>
      <p className={`${textColor} text-sm mt-2 leading-relaxed`}>{t(field.valueKey)}</p>
    </div>
  )

  if (layout === 'grid') {
    const leftFields = fieldsForColumnKeys(GRID_LEFT_COLUMN_KEYS)
    const rightFields = fieldsForColumnKeys(GRID_RIGHT_COLUMN_KEYS)

    return (
      <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 ${className}`}>
        <div className="flex flex-col gap-4 md:gap-6">{leftFields.map(renderField)}</div>
        <div className="flex flex-col gap-4 md:gap-6">{rightFields.map(renderField)}</div>
      </div>
    )
  }

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      {fields.map(renderField)}
    </div>
  )
}
