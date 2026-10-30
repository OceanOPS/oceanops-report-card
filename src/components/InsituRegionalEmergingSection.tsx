import { useTranslation } from 'react-i18next'
import ImageCaption from './ImageCaption'
import Spacer from './Spacer'
import { asset } from '../utils/assets'

const bodyClass =
  'text-base sm:text-lg md:text-xl font-normal text-goos-white leading-[1.5] mb-3 sm:mb-4'

export default function InsituRegionalEmergingSection() {
  const { t } = useTranslation()
  const base = 'content.section1.regionalEmergingProse'

  return (
    <>
      <Spacer size="md" />

      <h3 className="text-xl sm:text-2xl font-bold text-goos-orange-500 mb-3 sm:mb-4">
        {t(`${base}.title`)}
      </h3>

      <p className={bodyClass}>{t(`${base}.paragraph1`)}</p>
      <p className={bodyClass}>{t(`${base}.paragraph2`)}</p>
      <p className={bodyClass}>{t(`${base}.paragraph3`)}</p>

      <Spacer size="sm" />

      <div className="-mx-4 sm:mx-0">
        <ImageCaption
          src={asset('/images/report-2026/FVON.jpg')}
          alt={t(`${base}.fvonImageAlt`)}
          caption={t(`${base}.fvonImageCaption`)}
          aspectRatio="auto"
          objectFit="contain"
          captionColor="text-goos-gray-300"
        />
      </div>
    </>
  )
}
