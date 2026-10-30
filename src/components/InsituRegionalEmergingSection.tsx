import { useTranslation } from 'react-i18next'
import ImageCaption from './ImageCaption'
import Spacer from './Spacer'
import { asset } from '../utils/assets'
import { insituBodyClass, insituOrangeHeadingClass } from './insituProseClasses'

export default function InsituRegionalEmergingSection() {
  const { t } = useTranslation()
  const base = 'content.section1.regionalEmergingProse'

  return (
    <>
      <h3 className={insituOrangeHeadingClass}>
        {t(`${base}.title`)}
      </h3>

      <p className={insituBodyClass}>{t(`${base}.paragraph1`)}</p>
      <p className={insituBodyClass}>{t(`${base}.paragraph2`)}</p>
      <p className={insituBodyClass}>{t(`${base}.paragraph3`)}</p>

      <Spacer size="xs" />

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
