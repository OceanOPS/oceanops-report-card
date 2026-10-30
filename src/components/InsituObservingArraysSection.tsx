import { useTranslation } from 'react-i18next'
import Spacer from './Spacer'

const ONE_ARGO_URL =
  'https://drive.google.com/file/d/1QgcsBXR3AImNOtGtH30SGwyx4gWkvLOP/view'

const bodyClass =
  'text-base sm:text-lg md:text-xl font-normal text-goos-white leading-[1.5] mb-3 sm:mb-4'

/** Orange-headed prose block after the in situ “Learn more” accordion (2026 editorial). */
export default function InsituObservingArraysSection() {
  const { t } = useTranslation()
  const base = 'content.section1.observingArrays'

  return (
    <>
      <Spacer size="sm" />

      <h3 className="text-xl sm:text-2xl font-bold text-goos-orange-500 mb-3 sm:mb-4">
        {t(`${base}.title`)}
      </h3>

      <p className={bodyClass}>{t(`${base}.paragraph1`)}</p>

      <p className={bodyClass}>
        {t(`${base}.paragraph2a`)}{' '}
        <a
          href={ONE_ARGO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-goos-orange-500 underline hover:text-goos-orange-400 transition-colors"
        >
          {t(`${base}.paragraph2link`)}
        </a>{' '}
        {t(`${base}.paragraph2b`)}
      </p>

      <p className={bodyClass}>{t(`${base}.paragraph3`)}</p>
      <p className={bodyClass}>{t(`${base}.paragraph4`)}</p>
      <p className={bodyClass}>{t(`${base}.paragraph5`)}</p>
      <p className={bodyClass}>{t(`${base}.paragraph6`)}</p>
      <p
        className={bodyClass}
        dangerouslySetInnerHTML={{ __html: t(`${base}.paragraph7`) }}
      />
    </>
  )
}
