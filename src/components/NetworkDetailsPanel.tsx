import { useTranslation } from 'react-i18next'
import type { MatureNetwork } from '../types/matureNetworks'

interface NetworkDetailsPanelProps {
  network: MatureNetwork
  layout?: 'stack' | 'grid'
  textColor?: string
  accentColor?: string
  className?: string
}

export default function NetworkDetailsPanel({
  network,
  layout = 'stack',
  textColor = 'text-white',
  accentColor = 'text-goos-orange-500',
  className = '',
}: NetworkDetailsPanelProps) {
  const { t } = useTranslation()

  const fields = [
    {
      key: 'applications',
      labelKey: 'networks.comparison.applications',
      valueKey: network.detailsKeys.applications,
    },
    {
      key: 'coverage',
      labelKey: 'networks.comparison.coverage',
      valueKey: network.detailsKeys.coverage,
    },
    ...(network.detailsKeys.targets
      ? [{
          key: 'targets',
          labelKey: 'networks.comparison.targets',
          valueKey: network.detailsKeys.targets,
        }]
      : []),
    ...(network.detailsKeys.maturity
      ? [{
          key: 'maturity',
          labelKey: 'networks.comparison.maturity',
          valueKey: network.detailsKeys.maturity,
        }]
      : []),
  ]

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
