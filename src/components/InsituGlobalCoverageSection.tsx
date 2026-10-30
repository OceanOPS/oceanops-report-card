import { useTranslation } from 'react-i18next'
import Spacer from './Spacer'

const bodyClass =
  'text-base sm:text-lg md:text-xl font-normal text-goos-white leading-[1.5] mb-3 sm:mb-4'

export default function InsituGlobalCoverageSection() {
  const { t } = useTranslation()
  const base = 'content.section1.globalCoverageProse'

  return (
    <>
      <Spacer size="md" />

      <h3 className="text-xl sm:text-2xl font-bold text-goos-orange-500 mb-3 sm:mb-4">
        {t(`${base}.title`)}
      </h3>

      <p className={bodyClass}>{t(`${base}.paragraph1`)}</p>
      <p className={bodyClass}>{t(`${base}.paragraph2`)}</p>
      <p className={bodyClass}>{t(`${base}.paragraph3`)}</p>
      <p className={bodyClass}>{t(`${base}.paragraph4`)}</p>
    </>
  )
}
