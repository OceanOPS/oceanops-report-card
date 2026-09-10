import { useTranslation } from 'react-i18next'
import { formatDeploymentDate, useExportMetadata } from '../utils/exportMetadata'

/** Legend order (oceanops-simple-map/src/categories.ts), excluding legendHidden companions. */
const NETWORK_IDS = [
  'vos',
  'oceantrax',
  'asap',
  'soconet',
  'goship',
  'fvon',
  'gloss',
  'oceansites',
  'moored_buoys',
  'tsunami_buoys',
  'hf_radars',
  'drifting_buoys',
  'argo',
  'oceangliders',
  'anibos',
] as const

export default function OperationalPlatformDefinitionsModal() {
  const { t, i18n } = useTranslation()
  const metadata = useExportMetadata()
  const locale = i18n.language

  const rollingSince = formatDeploymentDate(
    metadata.ROLLING_12M_SINCE ?? metadata.FVON_MIN_LOC_DATE,
    locale,
  )

  const contentParams = (id: (typeof NETWORK_IDS)[number]) => {
    switch (id) {
      case 'goship':
      case 'fvon':
      case 'oceangliders':
      case 'anibos':
        return { date: rollingSince }
      default:
        return {}
    }
  }

  return (
    <div className="flex flex-col gap-4 sm:gap-6">
      <p className="text-base sm:text-lg leading-relaxed text-white">
        {t('operationalPlatforms.platformModal.intro')}
      </p>

      <ul className="space-y-3 sm:space-y-4 list-disc pl-5 sm:pl-6">
        {NETWORK_IDS.map((id) => (
          <li key={id} className="text-white">
            <h4 className="text-base sm:text-lg font-semibold mb-1 text-white">
              {t(`operationalPlatforms.platformModal.networks.${id}.title`)}
            </h4>
            <p className="text-sm sm:text-base leading-relaxed text-white">
              {t(`operationalPlatforms.platformModal.networks.${id}.content`, contentParams(id))}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}
