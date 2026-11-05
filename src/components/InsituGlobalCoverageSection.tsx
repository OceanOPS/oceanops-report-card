import { useTranslation } from 'react-i18next'
import { insituBodyClass, insituOrangeHeadingClass } from './insituProseClasses'

export default function InsituGlobalCoverageSection() {
  const { t } = useTranslation()
  const base = 'content.section1.globalCoverageProse'

  return (
    <>
      <h3 className={insituOrangeHeadingClass}>
        {t(`${base}.title`)}
      </h3>

      <p className={insituBodyClass}>{t(`${base}.paragraph1`)}</p>
      <p className={insituBodyClass}>{t(`${base}.paragraph2`)}</p>
      <p className={insituBodyClass}>{t(`${base}.paragraph3`)}</p>
      <p className={insituBodyClass}>{t(`${base}.paragraph4`)}</p>
    </>
  )
}
