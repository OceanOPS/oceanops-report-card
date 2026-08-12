import { useTranslation } from 'react-i18next'
import {
  formatDeploymentDate,
  useExportMetadata,
  yearFromIso,
} from '../utils/exportMetadata'

export default function OperationalPlatformDefinitionsModal() {
  const { t, i18n } = useTranslation()
  const metadata = useExportMetadata()
  const locale = i18n.language

  const xbtYear = yearFromIso(metadata.SOOP_XBT_SAMPLED_SINCE)
  const goShipYear = yearFromIso(metadata.GOSHIP_SAMPLED_SINCE)
  const glidersDate = formatDeploymentDate(metadata.OCEAN_GLIDERS_MIN_LOC_DATE, locale)
  const fvonDate = formatDeploymentDate(metadata.FVON_MIN_LOC_DATE, locale)
  const anibosDate = formatDeploymentDate(metadata.ANIBOS_MIN_LOC_DATE, locale)

  return (
    <div className="flex flex-col gap-4 sm:gap-6">
      <p className="text-base sm:text-lg leading-relaxed text-white">
        {t('operationalPlatforms.platformModal.intro')}
      </p>

      <div>
        <h3 className="text-base sm:text-lg text-goos-orange-500 mb-2 sm:mb-3 uppercase">
          {t('operationalPlatforms.platformModal.categories.shipBased.title')}
        </h3>
        <ul className="space-y-3 sm:space-y-4 list-disc pl-5 sm:pl-6">
          <li className="text-white">
            <h4 className="text-base sm:text-lg font-semibold mb-1 text-white">
              {t('operationalPlatforms.platformModal.categories.shipBased.meteorological.title')}
            </h4>
            <p className="text-sm sm:text-base leading-relaxed text-white">
              {t('operationalPlatforms.platformModal.categories.shipBased.meteorological.content')}
            </p>
          </li>
          <li className="text-white">
            <h4 className="text-base sm:text-lg font-semibold mb-1 text-white">
              {t('operationalPlatforms.platformModal.categories.shipBased.oceanographic.title')}
            </h4>
            <p className="text-sm sm:text-base leading-relaxed text-white">
              {t('operationalPlatforms.platformModal.categories.shipBased.oceanographic.content', {
                year: xbtYear,
              })}
            </p>
          </li>
          <li className="text-white">
            <h4 className="text-base sm:text-lg font-semibold mb-1 text-white">
              {t('operationalPlatforms.platformModal.categories.shipBased.aerological.title')}
            </h4>
            <p className="text-sm sm:text-base leading-relaxed text-white">
              {t('operationalPlatforms.platformModal.categories.shipBased.aerological.content')}
            </p>
          </li>
          <li className="text-white">
            <h4 className="text-base sm:text-lg font-semibold mb-1 text-white">
              {t('operationalPlatforms.platformModal.categories.fixedPlatforms.repeatedTransects.title')}
            </h4>
            <p className="text-sm sm:text-base leading-relaxed text-white">
              {t('operationalPlatforms.platformModal.categories.fixedPlatforms.repeatedTransects.content', {
                year: goShipYear,
              })}
            </p>
          </li>
          <li className="text-white">
            <h4 className="text-base sm:text-lg font-semibold mb-1 text-white">
              {t('operationalPlatforms.platformModal.categories.fixedPlatforms.fishingVessels.title')}
            </h4>
            <p className="text-sm sm:text-base leading-relaxed text-white">
              {t('operationalPlatforms.platformModal.categories.fixedPlatforms.fishingVessels.content', {
                date: fvonDate,
              })}
            </p>
          </li>
        </ul>
      </div>

      <div>
        <h3 className="text-base sm:text-lg text-goos-orange-500 mb-2 sm:mb-3 uppercase">
          {t('operationalPlatforms.platformModal.categories.fixedPlatforms.title')}
        </h3>
        <ul className="space-y-3 sm:space-y-4 list-disc pl-5 sm:pl-6">
          <li className="text-white">
            <h4 className="text-base sm:text-lg font-semibold mb-1 text-white">
              {t('operationalPlatforms.platformModal.categories.fixedPlatforms.seaLevelGauges.title')}
            </h4>
            <p className="text-sm sm:text-base leading-relaxed text-white">
              {t('operationalPlatforms.platformModal.categories.fixedPlatforms.seaLevelGauges.content')}
            </p>
          </li>
          <li className="text-white">
            <h4 className="text-base sm:text-lg font-semibold mb-1 text-white">
              {t('operationalPlatforms.platformModal.categories.fixedPlatforms.timeSeriesSites.title')}
            </h4>
            <p className="text-sm sm:text-base leading-relaxed text-white">
              {t('operationalPlatforms.platformModal.categories.fixedPlatforms.timeSeriesSites.content')}
            </p>
          </li>
          <li className="text-white">
            <h4 className="text-base sm:text-lg font-semibold mb-1 text-white">
              {t('operationalPlatforms.platformModal.categories.fixedPlatforms.mooredBuoys.title')}
            </h4>
            <p className="text-sm sm:text-base leading-relaxed text-white">
              {t('operationalPlatforms.platformModal.categories.fixedPlatforms.mooredBuoys.content')}
            </p>
          </li>
          <li className="text-white">
            <h4 className="text-base sm:text-lg font-semibold mb-1 text-white">
              {t('operationalPlatforms.platformModal.categories.fixedPlatforms.tsunamiBuoys.title')}
            </h4>
            <p className="text-sm sm:text-base leading-relaxed text-white">
              {t('operationalPlatforms.platformModal.categories.fixedPlatforms.tsunamiBuoys.content')}
            </p>
          </li>
          <li className="text-white">
            <h4 className="text-base sm:text-lg font-semibold mb-1 text-white">
              {t('operationalPlatforms.platformModal.categories.fixedPlatforms.hfRadars.title')}
            </h4>
            <p className="text-sm sm:text-base leading-relaxed text-white">
              {t('operationalPlatforms.platformModal.categories.fixedPlatforms.hfRadars.content')}
            </p>
          </li>
        </ul>
      </div>

      <div>
        <h3 className="text-base sm:text-lg text-goos-orange-500 mb-2 sm:mb-3 uppercase">
          {t('operationalPlatforms.platformModal.categories.mobilePlatforms.title')}
        </h3>
        <ul className="space-y-3 sm:space-y-4 list-disc pl-5 sm:pl-6">
          <li className="text-white">
            <h4 className="text-base sm:text-lg font-semibold mb-1 text-white">
              {t('operationalPlatforms.platformModal.categories.mobilePlatforms.driftingBuoys.title')}
            </h4>
            <p className="text-sm sm:text-base leading-relaxed text-white">
              {t('operationalPlatforms.platformModal.categories.mobilePlatforms.driftingBuoys.content')}
            </p>
          </li>
          <li className="text-white">
            <h4 className="text-base sm:text-lg font-semibold mb-1 text-white">
              {t('operationalPlatforms.platformModal.categories.mobilePlatforms.profilingFloats.title')}
            </h4>
            <p className="text-sm sm:text-base leading-relaxed text-white">
              {t('operationalPlatforms.platformModal.categories.mobilePlatforms.profilingFloats.content')}
            </p>
          </li>
          <li className="text-white">
            <h4 className="text-base sm:text-lg font-semibold mb-1 text-white">
              {t('operationalPlatforms.platformModal.categories.mobilePlatforms.gliders.title')}
            </h4>
            <p className="text-sm sm:text-base leading-relaxed text-white">
              {t('operationalPlatforms.platformModal.categories.mobilePlatforms.gliders.content', {
                date: glidersDate,
              })}
            </p>
          </li>
          <li className="text-white">
            <h4 className="text-base sm:text-lg font-semibold mb-1 text-white">
              {t('operationalPlatforms.platformModal.categories.mobilePlatforms.animalBorne.title')}
            </h4>
            <p className="text-sm sm:text-base leading-relaxed text-white">
              {t('operationalPlatforms.platformModal.categories.mobilePlatforms.animalBorne.content', {
                date: anibosDate,
              })}
            </p>
          </li>
        </ul>
      </div>
    </div>
  )
}
