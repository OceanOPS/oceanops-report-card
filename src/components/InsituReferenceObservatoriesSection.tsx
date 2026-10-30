import { useTranslation } from 'react-i18next'
import { insituBodyClass, insituOrangeHeadingClass } from './insituProseClasses'

export default function InsituReferenceObservatoriesSection() {
  const { t } = useTranslation()
  const base = 'content.section1.referenceObservatoriesProse'

  return (
    <>
      <h3 className={insituOrangeHeadingClass}>
        {t(`${base}.title`)}
      </h3>

      <p className={insituBodyClass}>{t(`${base}.paragraph1`)}</p>
      <p className={insituBodyClass}>{t(`${base}.paragraph2`)}</p>
      <p className={insituBodyClass}>{t(`${base}.paragraph3`)}</p>
    </>
  )
}
