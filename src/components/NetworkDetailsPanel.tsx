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

  return (
    <div
      className={`${
        layout === 'grid'
          ? 'grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6'
          : 'flex flex-col gap-4'
      } ${className}`}
    >
      {fields.map((field) => (
        <div key={field.key}>
          <p className={`${accentColor} text-sm font-semibold uppercase tracking-wide`}>
            {t(field.labelKey)}
          </p>
          <p className={`${textColor} text-sm mt-2 leading-relaxed`}>
            {t(field.valueKey)}
          </p>
        </div>
      ))}
    </div>
  )
}
