import { useTranslation } from 'react-i18next'
import ContentBox from './ContentBox'
import Spacer from './Spacer'

/** Expandable “Did you know…” block after regional / FVON content (2026). */
export default function InsituAtmosphereLearnMore() {
  const { t } = useTranslation()
  const base = 'content.section1.atmosphereLearnMore'

  return (
    <>
      <Spacer size="sm" />

      <ContentBox
        titleKey={`${base}.title`}
        collapsible={true}
        defaultCollapsed={true}
        backgroundColor="bg-goos-blue-800"
        textColor="text-goos-white"
        titleColor="text-goos-white"
        buttonBgColor="bg-goos-blue-800"
        buttonTextColor="text-goos-white"
        buttonHoverBgColor="hover:bg-goos-blue-700"
        buttonIconColor="text-goos-white"
        buttonIconBgColor="bg-goos-blue-700"
        buttonLeftBorderColor="border-goos-orange-500"
        buttonIconBorderColor="border-goos-white/40"
        padding="p-6"
      >
        <p className="text-base sm:text-lg md:text-xl leading-relaxed font-semibold">
          {t(`${base}.lead`)}
        </p>
        <p className="text-base sm:text-lg md:text-xl leading-relaxed">
          {t(`${base}.paragraph1`)}
        </p>
      </ContentBox>
    </>
  )
}
