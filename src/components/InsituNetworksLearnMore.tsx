import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import ContentBox from './ContentBox'
import Spacer from './Spacer'
import {
  totalObservingPlatforms,
  totalReferenceObservatories,
} from '../utils/partnerCountryStats'
import { insituProseParagraphClass } from './insituProseClasses'

const fmt = (n: number) => n.toLocaleString('en-US')

function LearnMoreNetworkList({
  theyIncludeKey,
  networkKeys,
  summaryKey,
  summaryVars,
  maxExpandedHeight = 'max-h-[2000px]',
}: {
  theyIncludeKey: string
  networkKeys: string[]
  summaryKey: string
  summaryVars: Record<string, string>
  maxExpandedHeight?: string
}) {
  const { t } = useTranslation()
  const [expanded, setExpanded] = useState(false)

  return (
    <>
      <p className={insituProseParagraphClass}>
        {t(theyIncludeKey)}{' '}
        {!expanded && (
          <button
            type="button"
            onClick={() => setExpanded(true)}
            className="text-goos-orange-500 hover:underline focus:outline-none align-baseline"
          >
            {t('networks.indicatorsModal.moreButton')}
          </button>
        )}
      </p>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          expanded ? `${maxExpandedHeight} opacity-100` : 'max-h-0 opacity-0'
        }`}
      >
        <ul className="list-disc list-inside text-base sm:text-lg md:text-xl leading-relaxed space-y-1 mb-3 sm:mb-4">
          {networkKeys.map((key) => (
            <li key={key}>{t(key)}</li>
          ))}
        </ul>
        <p
          className={insituProseParagraphClass}
          dangerouslySetInnerHTML={{ __html: t(summaryKey, summaryVars) }}
        />
        <button
          type="button"
          onClick={() => setExpanded(false)}
          className="text-goos-orange-500 hover:underline focus:outline-none text-sm sm:text-base"
        >
          Less...
        </button>
      </div>
    </>
  )
}

/** Learn-more accordion for in situ network organization (state kept local to avoid ContentModule scroll re-anim). */
export default function InsituNetworksLearnMore() {
  const { t } = useTranslation()
  const base = 'content.section1.learnMore'

  return (
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
      <p
        className={`${insituProseParagraphClass} text-goos-white`}
        dangerouslySetInnerHTML={{ __html: t(`${base}.intro`) }}
      />

      <p
        className={`${insituProseParagraphClass} text-goos-white`}
        dangerouslySetInnerHTML={{ __html: t(`${base}.globalArrays.description`) }}
      />

      <LearnMoreNetworkList
        theyIncludeKey={`${base}.globalArrays.theyInclude`}
        networkKeys={[
          `${base}.globalArrays.network1`,
          `${base}.globalArrays.network2`,
          `${base}.globalArrays.network3`,
          `${base}.globalArrays.network4`,
        ]}
        summaryKey={`${base}.globalArrays.summary`}
        summaryVars={{ platformCount: fmt(totalObservingPlatforms) }}
      />

      <Spacer size="xs" />

      <p
        className={`${insituProseParagraphClass} text-goos-white`}
        dangerouslySetInnerHTML={{ __html: t(`${base}.referenceObservatories.description`) }}
      />

      <LearnMoreNetworkList
        theyIncludeKey={`${base}.referenceObservatories.theyInclude`}
        networkKeys={[
          `${base}.referenceObservatories.network1`,
          `${base}.referenceObservatories.network2`,
          `${base}.referenceObservatories.network3`,
          `${base}.referenceObservatories.network4`,
          `${base}.referenceObservatories.network5`,
        ]}
        summaryKey={`${base}.referenceObservatories.summary`}
        summaryVars={{ referenceCount: fmt(totalReferenceObservatories) }}
      />

      <Spacer size="xs" />

      <p
        className={`${insituProseParagraphClass} text-goos-white`}
        dangerouslySetInnerHTML={{ __html: t(`${base}.regionalSystems.description`) }}
      />

      <LearnMoreNetworkList
        theyIncludeKey={`${base}.regionalSystems.theyInclude`}
        networkKeys={[
          `${base}.regionalSystems.network1`,
          `${base}.regionalSystems.network2`,
          `${base}.regionalSystems.network3`,
          `${base}.regionalSystems.network4`,
          `${base}.regionalSystems.network5`,
          `${base}.regionalSystems.network6`,
          `${base}.regionalSystems.network7`,
          `${base}.regionalSystems.network8`,
          `${base}.regionalSystems.network9`,
        ]}
        summaryKey={`${base}.regionalSystems.summary`}
        summaryVars={{ platformCount: fmt(totalObservingPlatforms) }}
        maxExpandedHeight="max-h-[3000px]"
      />
    </ContentBox>
  )
}
