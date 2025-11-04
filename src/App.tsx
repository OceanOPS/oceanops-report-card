import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'
import CoverModule from './components/CoverModule'
import PartnerModal from './components/PartnerModal'
import { partnerCountries } from './data/partnerCountries'
import ImageGrid from './components/ImageGrid'
import ContentModule from './components/ContentModule'
import QuoteBlock from './components/QuoteBlock'
import QuoteWithImage from './components/QuoteWithImage'
import InsightPanel from './components/InsightPanel'
import MapStatsPanel from './components/MapStatsPanel'
import LogoStrip from './components/LogoStrip'
import NetworkCarousel from './components/NetworkCarousel'
import EmergingNetworkCarousel from './components/EmergingNetworkCarousel'
import Spacer from './components/Spacer'
import IconTable from './components/IconTable'
import SpotifyEmbed from './components/SpotifyEmbed'
import ImageCaption from './components/ImageCaption'
import ImageGallery from './components/ImageGallery'
import VideoModal from './components/VideoModal'
import SatelliteTable from './components/SatelliteTable'
import Button from './components/Button'
import DataCardGrid from './components/DataCardGrid'
import ContentBox from './components/ContentBox'
import MenuSidebar from './components/MenuSidebar'
import DeliveryAreasNav from './components/DeliveryAreasNav'

function App() {
  const { t } = useTranslation()
  const [isPartnerModalOpen, setIsPartnerModalOpen] = useState(false)

  // Handle deep linking - scroll to section if hash is present in URL
  useEffect(() => {
    const hash = window.location.hash.slice(1) // Remove the #
    if (hash) {
      // Delay to ensure DOM is fully rendered and page is ready
      setTimeout(() => {
        (window as any).isScrollingProgrammatically = true
        const element = document.getElementById(hash)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
        // Reset flag after scroll animation completes
        setTimeout(() => {
          (window as any).isScrollingProgrammatically = false
        }, 1000)
      }, 500)
    }
  }, [])

  // Scroll spy - update URL hash based on visible section
  useEffect(() => {
    const sections = [
      'cover-section',
      'overview-section',
      'insitu-section',
      'stats-section',
      'networks-section',
      'satellite-section',
      'data-section',
      'emerging-section',
      'value-section',
      'amoc-section',
      'elnino-section',
      'oceanhealth-section',
      'strengthening-section',
      'southafrica-section',
      'ships-section',
      'calltoaction-section',
      'contact-section'
    ]

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px', // Trigger when section is in the middle-upper part of viewport
      threshold: 0
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      // Don't update hash if we're scrolling programmatically (from menu click or deep link)
      if ((window as any).isScrollingProgrammatically) return

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id
          // Only update if hash is different to avoid unnecessary updates
          if (window.location.hash !== `#${id}`) {
            window.history.replaceState(null, '', `#${id}`)
          }
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    // Observe all sections
    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId)
      if (element) {
        observer.observe(element)
      }
    })

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <div>
      {/* MenuSidebar - Fixed Menu Button with Slide-in Sidebar */}
      <MenuSidebar
        menuItems={[
          { id: 'overview-section', titleKey: 'menu.overview', accentColor: 'bg-goos-orange-600' },
          {
            id: 'insitu-section',
            titleKey: 'menu.inSituStatus',
            accentColor: 'bg-goos-orange-600',
            subItems: [
              { id: 'stats-section', titleKey: 'menu.networksByNumbers', accentColor: 'bg-goos-orange-600' },
              { id: 'networks-section', titleKey: 'networks.title', accentColor: 'bg-goos-orange-500' },
              { id: 'data-section', titleKey: 'dataBlock.title', accentColor: 'bg-goos-orange-500' },
              { id: 'emerging-section', titleKey: 'emerging.title', accentColor: 'bg-goos-orange-500' },
            ],
          },
          {
            id: 'value-section',
            titleKey: 'valueOfObservations.title',
            accentColor: 'bg-goos-cyan-600',
            subItems: [
              { id: 'amoc-section', titleKey: 'amoc.kicker', accentColor: 'bg-goos-cyan-600' },
              { id: 'elnino-section', titleKey: 'elNino.kicker', accentColor: 'bg-goos-cyan-600' },
              { id: 'oceanhealth-section', titleKey: 'oceanHealth.kicker', accentColor: 'bg-goos-cyan-600' },
            ],
          },
          {
            id: 'strengthening-section',
            titleKey: 'strengtheningSystem.title',
            accentColor: 'bg-goos-green-700',
            subItems: [
              { id: 'southafrica-section', titleKey: 'southAfrica.title', accentColor: 'bg-goos-green-700' },
              { id: 'ships-section', titleKey: 'tenThousandShips.title', accentColor: 'bg-goos-green-700' },
            ],
          },
          { id: 'calltoaction-section', titleKey: 'callToAction.title', accentColor: 'bg-goos-orange-600' },
          { id: 'contact-section', titleKey: 'contact.title', accentColor: 'bg-goos-blue-900' },
        ]}
      />

      {/* DeliveryAreasNav - Fixed navigation for Value of Ocean Observations sections */}
      <DeliveryAreasNav />

      {/* Cover */}
      <div id="cover-section">
      <CoverModule
        title={t('cover.title')}
        year={t('cover.year')}
        yearColor="text-goos-orange-500"
        backgroundColor="bg-goos-blue-900"
        goosLogoVariant="white"
        partnerLogosVariant="white"
        // Background Media Options
        backgroundOpacity={70}
        backgroundSize="cover"
        backgroundBlendMode="normal"   // Uses luminosity of video with color of background
        // Background Image or Video
        mediaType="video"
        backgroundMedia="/videos/video.mp4"
      />
      </div>

      {/* Spacer */}
      <Spacer size="md" backgroundColor="bg-goos-blue-900"/>


      {/* Intro */}
      <div id="overview-section">
      <ContentModule
        layout="full-width"
        backgroundColor="bg-goos-blue-900"
        titleColor="text-goos-white"
        textColor="text-goos-white"
        lineColor="bg-goos-orange-600"
         titleLevel="h2"
        title={t('Overview')}
        rightColumn={
          <>
            <p className="text-xl font-normal text-goos-white leading-[1.5] mt-4">
              {t('intro.paragraph2')}
            </p>
            <p className="text-xl font-normal text-goos-white leading-[1.5]">
              {t('intro.paragraph3')}
            </p>
          </>
        }
      >
        <p className="text-xl font-normal text-goos-white leading-[1.5] mt-4">
          {t('intro.paragraph1')}
        </p>
      </ContentModule>
      </div>

              <Spacer size="sm" backgroundColor="bg-goos-blue-900" />

      {/* In situ observing system status and updates */}
      <div id="insitu-section">
      <ContentModule
        titleLevel="h2"
        title={t('content.section1.title')}
        hasLine={true}
        backgroundColor="bg-goos-blue-900"
        titleColor="text-goos-white"
        textColor="text-goos-white"
        lineColor="bg-goos-orange-500"
        layout="split"
      >
        <p className="text-xl font-normal text-goos-white leading-[1.5]">
          {t('content.section1.paragraph1')}
        </p>

        <p className="text-xl font-normal text-goos-white leading-[1.5]">
          {t('content.section1.paragraph2')}
        </p>

        <p className="text-xl font-normal text-goos-white leading-[1.5]">
          {t('content.section1.paragraph3')}
        </p>

        <p className="text-xl font-normal text-goos-white leading-[1.5]">
          {t('content.section1.paragraph4a')}{' '}
          <a
            href="https://drive.google.com/file/d/1QgcsBXR3AImNOtGtH30SGwyx4gWkvLOP/view"
            target="_blank"
            rel="noopener noreferrer"
            className="text-goos-orange-500 underline hover:text-goos-orange-400 transition-colors"
          >
            OneArgo
          </a>{' '}
          {t('content.section1.paragraph4b')}
        </p>

        <p className="text-xl font-normal text-goos-white leading-[1.5]">
          {t('content.section1.paragraph5')}
        </p>

        <p className="text-xl font-normal text-goos-white leading-[1.5]">
          {t('content.section1.paragraph6')}
        </p>

        <Spacer size="sm" />

        <h4 className="text-2xl font-extrabold text-goos-orange-500 leading-8">
          {t('content.section1.heading1')}
        </h4>

        <p className="text-xl font-normal text-goos-white leading-[1.5]">
          {t('content.section1.paragraph7')}
        </p>

        <p className="text-xl font-normal text-goos-white leading-[1.5]">
          {t('content.section1.paragraph8')}
        </p>

        <Spacer size="sm" />

        <h4 className="text-2xl font-extrabold text-goos-orange-500 leading-8">
          {t('content.section1.heading2')}
        </h4>

        <p className="text-xl font-normal text-goos-white leading-[1.5]">
          {t('content.section1.paragraph9')}
        </p>

        <p className="text-xl font-normal text-goos-white leading-[1.5]">
          {t('content.section1.paragraph10')}
        </p>

        <p className="text-xl font-normal text-goos-white leading-[1.5]">
          {t('content.section1.paragraph11')}
        </p>

        <Spacer size="sm" />

        {/* Quote Block */}
        <QuoteBlock
          variant="quote"
          quote={t('content.section1.quote.text')}
          quoteColor="text-goos-white"
          borderColor="border-goos-orange-600"
          authorName={t('content.section1.quote.authorName')}
          authorTitle={t('content.section1.quote.authorTitle')}
          authorColor="text-goos-orange-500"
        />
      </ContentModule>
      </div>

      {/* Stats Grid - 4x1 */}
      <div id="stats-section">
        <InsightPanel
          title={t('content.section1.statsTitle')}
          hasLine={true}
          lineColor="bg-goos-orange-600"
          leftContent={
            <p className="text-xl leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>
          }
          stats={[
            {
              number: t('content.section1.stats.stat1.number'),
              description: t('content.section1.stats.stat1.description'),
            },
            {
              number: t('content.section1.stats.stat2.number'),
              description: t('content.section1.stats.stat2.description'),
            },
            {
              number: t('content.section1.stats.stat3.number'),
              description: t('content.section1.stats.stat3.description'),
            },
            {
              number: t('content.section1.stats.stat4.number'),
              description: t('content.section1.stats.stat4.description'),
            },
          ]}
          backgroundColor="bg-goos-blue-900"
          titleColor="text-goos-white"
          textColor="text-goos-white"
          numberColor="text-goos-orange-500"
          linkColor="text-goos-white"
        />
      </div>

      <div id="map-section">
      {/* Interactive ArcGIS map - Full width */}
      <MapStatsPanel
        mapSrc="https://www.ocean-ops.org/demos/simple-arcgis-map/"
        mapAlt="Global platform distribution map"
        mapType="iframe"
        mapHeight={1000}
        fullWidth={true}
        backgroundColor="bg-goos-blue-900"
      />
      </div>

      {/* NetworkCarousel */}
      <div id="networks-section">
        <NetworkCarousel
          title="networks.title"
          hasLine={true}
          lineColor="bg-goos-orange-500"
        cards={[
          {
            iconSrc: '/icons/network/vos.svg',
            iconAlt: 'networks.sotVos.iconAlt',
            titleKey: 'networks.sotVos.title',
            networkUrl: 'https://www.ocean-ops.org/sot/programmes.html#VOS',
            networkLinkKey: 'networks.viewNetwork',
            ratings: {
              implementationStatus: 3,
              realTime: 2.5,
              archivedHighQuality: 2,
              metadata: 2,
              bestPractices: 2,
            },
            deliveryAreasLabelKey: 'networks.deliveryAreasLabel',
            deliveryAreas: ['climate', 'operational'],
          },
          {
            iconSrc: '/icons/network/xbt-soop.svg',
            iconAlt: 'networks.sotXbt.iconAlt',
            titleKey: 'networks.sotXbt.title',
            networkUrl: 'https://www.ocean-ops.org/sot/programmes.html#ASAP',
            networkLinkKey: 'networks.viewNetwork',
            ratings: {
              implementationStatus: 2,
              realTime: 2.5,
              archivedHighQuality: 3,
              metadata: 2,
              bestPractices: 3,
            },
            deliveryAreasLabelKey: 'networks.deliveryAreasLabel',
            deliveryAreas: ['climate', 'operational'],
          },
          {
            iconSrc: '/icons/network/asap.svg',
            iconAlt: 'networks.sotAsap.iconAlt',
            titleKey: 'networks.sotAsap.title',
            networkUrl: 'https://www.ocean-ops.org',
            networkLinkKey: 'networks.viewNetwork',
            ratings: {
              implementationStatus: "No target",
              realTime: 2.5,
              archivedHighQuality: "No archive",
              metadata: 2,
              bestPractices: 2,
            },
            deliveryAreasLabelKey: 'networks.deliveryAreasLabel',
            deliveryAreas: ['operational'],
          },
          {
            iconSrc: '/icons/network/go_ship.svg',
            iconAlt: 'networks.goShip.iconAlt',
            titleKey: 'networks.goShip.title',
            networkUrl: 'http://www.go-ship.org/',
            networkLinkKey: 'networks.viewNetwork',
            ratings: {
              implementationStatus: 2.5,
              realTime: "Not applicable",
              archivedHighQuality: 2.5,
              metadata: 1.5,
              bestPractices: 3,
            },
            deliveryAreasLabelKey: 'networks.deliveryAreasLabel',
            deliveryAreas: ['climate', 'operational'],
          },
          {
            iconSrc: '/icons/network/gloss.svg',
            iconAlt: 'networks.gloss.iconAlt',
            titleKey: 'networks.gloss.title',
            networkUrl: 'http://www.gloss-sealevel.org/',
            networkLinkKey: 'networks.viewNetwork',
            ratings: {
              implementationStatus: 1.5,
              realTime: 2,
              archivedHighQuality: 3,
              metadata: 0.5,
              bestPractices: 2,
            },
            deliveryAreasLabelKey: 'networks.deliveryAreasLabel',
            deliveryAreas: ['climate', 'operational'],
          },
          {
            iconSrc: '/icons/network/ocean_sites.svg',
            iconAlt: 'networks.oceanSites.iconAlt',
            titleKey: 'networks.oceanSites.title',
            networkUrl: 'https://www.ocean-ops.org/board?modules=[{%22id%22:6}]&t=oceansites',
            networkLinkKey: 'networks.viewNetwork',
            ratings: {
              implementationStatus: 2.5,
              realTime: "Not a core mission but existent",
              archivedHighQuality: 2.5,
              metadata: 3,
              bestPractices: 2,
            },
            deliveryAreasLabelKey: 'networks.deliveryAreasLabel',
            deliveryAreas: ['climate', 'operational', 'oceanhealth'],
          },
          {
            iconSrc: '/icons/network/dbcp_moored.svg',
            iconAlt: 'networks.dbcpMoored.iconAlt',
            titleKey: 'networks.dbcpMoored.title',
            networkUrl: 'https://www.ocean-ops.org/DBCP',
            networkLinkKey: 'networks.viewNetwork',
            ratings: {
              implementationStatus: "No target",
              realTime: 2.5,
              archivedHighQuality: 3,
              metadata: 2,
              bestPractices: 2.5,
            },
            deliveryAreasLabelKey: 'networks.deliveryAreasLabel',
            deliveryAreas: ['climate', 'operational', 'oceanhealth'],
          },
          {
            iconSrc: '/icons/network/tsunami_buoys.svg',
            iconAlt: 'networks.dbcpTsunami.iconAlt',
            titleKey: 'networks.dbcpTsunami.title',
            networkUrl: 'https://www.ocean-ops.org/DBCP',
            networkLinkKey: 'networks.viewNetwork',
            ratings: {
              implementationStatus: 2.5,
              realTime: 3,
              archivedHighQuality: 3,
              metadata: 2,
              bestPractices: 3,
            },
            deliveryAreasLabelKey: 'networks.deliveryAreasLabel',
            deliveryAreas: ['operational'],
          },
          {
            iconSrc: '/icons/network/hf_radar.svg',
            iconAlt: 'networks.hfRadar.iconAlt',
            titleKey: 'networks.hfRadar.title',
            networkUrl: 'http://www.global-hfradar.org/',
            networkLinkKey: 'networks.viewNetwork',
            ratings: {
              implementationStatus: 1.5,
              realTime: 1.5,
              archivedHighQuality: 0.5,
              metadata: 0.5,
              bestPractices: 3,
            },
            deliveryAreasLabelKey: 'networks.deliveryAreasLabel',
            deliveryAreas: ['climate', 'operational'],
          },
          {
            iconSrc: '/icons/network/dbcp_drifters.svg',
            iconAlt: 'networks.dbcpDrifting.iconAlt',
            titleKey: 'networks.dbcpDrifting.title',
            networkUrl: 'https://www.ocean-ops.org/DBCP',
            networkLinkKey: 'networks.viewNetwork',
            ratings: {
              implementationStatus: 2.5,
              realTime: 2.5,
              archivedHighQuality: 2.5,
              metadata: 2,
              bestPractices: 3,
            },
            deliveryAreasLabelKey: 'networks.deliveryAreasLabel',
            deliveryAreas: ['climate', 'operational'],
          },
          {
            iconSrc: '/icons/network/argo.svg',
            iconAlt: 'networks.argo.iconAlt',
            titleKey: 'networks.argo.title',
            networkUrl: 'http://www.argo.ucsd.edu/',
            networkLinkKey: 'networks.viewNetwork',
            ratings: {
              implementationStatus: 3,
              realTime: 3,
              archivedHighQuality: 3,
              metadata: 3,
              bestPractices: 2.5,
            },
            deliveryAreasLabelKey: 'networks.deliveryAreasLabel',
            deliveryAreas: ['climate', 'operational', 'oceanhealth'],
          },
          {
            iconSrc: '/icons/network/ocean_gliders.svg',
            iconAlt: 'networks.gliders.iconAlt',
            titleKey: 'networks.gliders.title',
            networkUrl: 'http://www.oceangliders.org/',
            networkLinkKey: 'networks.viewNetwork',
            ratings: {
              implementationStatus: 1.5,
              realTime: 2,
              archivedHighQuality: 1.5,
              metadata: 3,
              bestPractices: 2,
            },
            deliveryAreasLabelKey: 'networks.deliveryAreasLabel',
            deliveryAreas: ['climate', 'operational', 'oceanhealth'],
          },
          {
            iconSrc: '/icons/network/ani_bos.svg',
            iconAlt: 'networks.anibos.iconAlt',
            titleKey: 'networks.anibos.title',
            networkUrl: 'http://www.meop.net/',
            networkLinkKey: 'networks.viewNetwork',
            ratings: {
              implementationStatus: 0.5,
              realTime: 1.5,
              archivedHighQuality: 1.5,
              metadata: 1.5,
              bestPractices: 2,
            },
            deliveryAreasLabelKey: 'networks.deliveryAreasLabel',
            deliveryAreas: ['climate', 'operational', 'oceanhealth'],
          },
        ]}
        backgroundColor="bg-goos-blue-900"
        titleColor="text-white"
        cardBackgroundColor="bg-goos-blue-800"
        cardTextColor="text-white"
        cardAccentColor="text-goos-orange-500"
        tooltipBgColor="text-goos-white"
        tooltipTextColor="bg-goos-blue-900"
      />
      </div>

      {/* Indicators Definition Button */}
      <div className="flex justify-center py-8 bg-goos-blue-900">
        <Button
          variant="modal"
          label={t('networks.indicatorsButton')}
          modalTitle={t('networks.indicatorsModal.title')}
          modalContent={
            <div className="flex flex-col gap-6">
              {/* Introduction */}
              <p className="text-lg text-goos-gray-800 leading-relaxed">
                {t('networks.indicatorsModal.intro')}
              </p>

              {/* Implementation Status */}
              <div>
                <h3 className="text-xl font-bold text-goos-blue-700 mb-2">
                  {t('networks.indicatorsModal.implementationStatus.title')}
                </h3>
                <p className="text-base text-goos-gray-800 leading-relaxed">
                  {t('networks.indicatorsModal.implementationStatus.description')}
                </p>
              </div>

              {/* Real Time */}
              <div>
                <h3 className="text-xl font-bold text-goos-blue-700 mb-2">
                  {t('networks.indicatorsModal.realTime.title')}
                </h3>
                <p className="text-base text-goos-gray-800 leading-relaxed">
                  {t('networks.indicatorsModal.realTime.description')}
                </p>
              </div>

              {/* Archived High Quality */}
              <div>
                <h3 className="text-xl font-bold text-goos-blue-700 mb-2">
                  {t('networks.indicatorsModal.archivedHighQuality.title')}
                </h3>
                <p className="text-base text-goos-gray-800 leading-relaxed">
                  {t('networks.indicatorsModal.archivedHighQuality.description')}
                </p>
              </div>

              {/* Metadata */}
              <div>
                <h3 className="text-xl font-bold text-goos-blue-700 mb-2">
                  {t('networks.indicatorsModal.metadata.title')}
                </h3>
                <p className="text-base text-goos-gray-800 leading-relaxed">
                  {t('networks.indicatorsModal.metadata.description')}
                </p>
              </div>

              {/* Best Practices */}
              <div>
                <h3 className="text-xl font-bold text-goos-blue-700 mb-2">
                  {t('networks.indicatorsModal.bestPractices.title')}
                </h3>
                <p className="text-base text-goos-gray-800 leading-relaxed">
                  {t('networks.indicatorsModal.bestPractices.description')}
                </p>
              </div>
            </div>
          }
          bgColor="bg-goos-orange-600"
          textColor="text-white"
          iconColor="text-goos-orange-600"
          iconBgColor="bg-white"
        />
        
      </div>
        <Spacer size="lg" backgroundColor="bg-goos-blue-900"/>

      {/* Satellite Observations */}
      <div id="satellite-section">
        {/* Title and Introduction - Split Layout */}
        <ContentModule
          title={t('satelliteObservations.title')}
          titleLevel="h3"
          titleColor="text-goos-white"
          layout="split"
          backgroundColor="bg-goos-blue-900"
          textColor="text-goos-white"
        >
          <p className="text-xl text-goos-white">
            {t('satelliteObservations.introduction')}
          </p>
        </ContentModule>

        {/* Full Width Table Module */}
        <SatelliteTable />
      </div>

        <Spacer size="lg" backgroundColor="bg-goos-blue-900"/>

      {/* Biological and Ecosystem Observations */}
      <div id="data-section">
        <ContentModule
          title={t('dataBlock.title')}
        titleLevel="h3"
        titleColor="text-goos-white"
        introductionKeys={[
          'dataBlock.introduction.paragraph1'
        ]}
        layout="split"
        backgroundColor="bg-goos-blue-900"
        textColor="text-goos-white"
      >

        <DataCardGrid
          cards={[
            {
              number: "108",
              tagKey: "dataCards.card1.tag",
              iconSrc: "/icons/biology_and_ecosystems/Seabirds.png",
              iconAlt: "Seabird icon representing marine bird observation programmes",
              titleKey: "dataCards.card1.title",
            },
            {
              number: "224",
              tagKey: "dataCards.card2.tag",
              iconSrc: "/icons/biology_and_ecosystems/Fish.png",
              iconAlt: "Fish icon representing fish abundance monitoring programmes",
              titleKey: "dataCards.card2.title",
            },
            {
              number: "59",
              tagKey: "dataCards.card3.tag",
              iconSrc: "/icons/biology_and_ecosystems/Hard-coral.png",
              iconAlt: "Hard coral icon representing coral reef monitoring programmes",
              titleKey: "dataCards.card3.title",
            },
            {
              number: "192",
              tagKey: "dataCards.card4.tag",
              iconSrc: "/icons/biology_and_ecosystems/Invertebrates.png",
              iconAlt: "Invertebrate icon representing marine invertebrate observation programmes",
              titleKey: "dataCards.card4.title",
            },
            {
              number: "120",
              tagKey: "dataCards.card5.tag",
              iconSrc: "/icons/biology_and_ecosystems/Macroalgae.png",
              iconAlt: "Macroalgae icon representing seaweed and kelp monitoring programmes",
              titleKey: "dataCards.card5.title",
            },
            {
              number: "184",
              tagKey: "dataCards.card6.tag",
              iconSrc: "/icons/biology_and_ecosystems/Marine-mammals.png",
              iconAlt: "Marine mammal icon representing whale and dolphin observation programmes",
              titleKey: "dataCards.card6.title",
            },
            {
              number: "18",
              tagKey: "dataCards.card7.tag",
              iconSrc: "/icons/biology_and_ecosystems/Mangroves.png",
              iconAlt: "Mangrove icon representing mangrove forest monitoring programmes",
              titleKey: "dataCards.card7.title",
            },
            {
              number: "99",
              tagKey: "dataCards.card8.tag",
              iconSrc: "/icons/biology_and_ecosystems/Microbes.png",
              iconAlt: "Microbe icon representing marine microbial observation programmes",
              titleKey: "dataCards.card8.title",
            },
            {
              number: "230",
              tagKey: "dataCards.card9.tag",
              iconSrc: "/icons/biology_and_ecosystems/Phytoplankton.png",
              iconAlt: "Phytoplankton icon representing microscopic algae monitoring programmes",
              titleKey: "dataCards.card9.title",
            },
            {
              number: "75",
              tagKey: "dataCards.card10.tag",
              iconSrc: "/icons/biology_and_ecosystems/Seagrass.png",
              iconAlt: "Seagrass icon representing underwater grass meadow monitoring programmes",
              titleKey: "dataCards.card10.title",
            },
            {
              number: "78",
              tagKey: "dataCards.card11.tag",
              iconSrc: "/icons/biology_and_ecosystems/Sea-turtles.png",
              iconAlt: "Sea turtle icon representing marine turtle observation programmes",
              titleKey: "dataCards.card11.title",
            },
            {
              number: "188",
              tagKey: "dataCards.card12.tag",
              iconSrc: "/icons/biology_and_ecosystems/Zooplankton.png",
              iconAlt: "Zooplankton icon representing microscopic animal monitoring programmes",
              titleKey: "dataCards.card12.title",
            },
          ]}
        />
          <Spacer size="sm" />
        </ContentModule>
      </div>

      {/* EmergingNetworkCarousel - Emerging GOOS Networks */}
      <div id="emerging-section">
        <EmergingNetworkCarousel
          title="emerging.title"
          hasLine={true}
          lineColor="bg-goos-orange-500"
        cards={[
          {
            // FVON - First (Video)
            mediaType: 'video',
            videoType: 'youtube',
            videoId: '-MKKMU3_siw',
            previewImage: '/images/content.jpg',
            imageAlt: 'emerging.fvon.imageAlt',
            iconSrc: '/icons/network/fishing_vessels.svg',
            iconAlt: 'emerging.fvon.iconAlt',
            titleKey: 'emerging.fvon.title',
            paragraph1Key: 'emerging.fvon.paragraph1',
            paragraph2Key: 'emerging.fvon.paragraph2',
            externalLinkUrl: 'https://www.fvon.org/',
            externalLinkTextKey: 'networks.viewNetwork',
            deliveryAreasLabelKey: 'networks.deliveryAreasLabel',
            deliveryAreas: ['operational', 'climate'],
          },
          {
            // SMART Cables - Second (Video)
            mediaType: 'video',
            videoType: 'youtube',
            videoId: 'NoEK7XwOMeU',
            previewImage: '/images/content.jpg',
            imageAlt: 'emerging.smartCables.imageAlt',
            iconSrc: '/icons/network/smart_cables.svg',
            iconAlt: 'emerging.smartCables.iconAlt',
            titleKey: 'emerging.smartCables.title',
            paragraph1Key: 'emerging.smartCables.paragraph1',
            paragraph2Key: 'emerging.smartCables.paragraph2',
            externalLinkUrl: 'https://www.smartcables.org/',
            externalLinkTextKey: 'networks.viewNetwork',
            deliveryAreasLabelKey: 'networks.deliveryAreasLabel',
            deliveryAreas: ['climate', 'operational'],
          },
          {
            // SOCONET - Third (Gallery with sample images - replace with final content)
            mediaType: 'gallery',
            images: [
              {
                src: '/images/content.jpg',
                alt: 'SOCONET Image 1',
                caption: 'Sample caption 1 - Replace with actual image and caption'
              },
              {
                src: '/images/content.jpg',
                alt: 'SOCONET Image 2',
                caption: 'Sample caption 2 - Replace with actual image and caption'
              },
              {
                src: '/images/content.jpg',
                alt: 'SOCONET Image 3',
                caption: 'Sample caption 3 - Replace with actual image and caption'
              },
              {
                src: '/images/content.jpg',
                alt: 'SOCONET Image 4',
                caption: 'Sample caption 4 - Replace with actual image and caption'
              }
            ],
            imageSrc: '/images/content.jpg', // Fallback image (first image preview)
            imageAlt: 'emerging.soconet.imageAlt',
            modalTitle: 'emerging.soconet.title',
            modalContent: (
              <div className="flex flex-col gap-5">
                <ImageGallery
                  images={[
                    {
                      src: '/images/content.jpg',
                      alt: 'SOCONET Image 1',
                      caption: 'Sample caption 1 - Replace with actual image and caption'
                    },
                    {
                      src: '/images/content.jpg',
                      alt: 'SOCONET Image 2',
                      caption: 'Sample caption 2 - Replace with actual image and caption'
                    },
                    {
                      src: '/images/content.jpg',
                      alt: 'SOCONET Image 3',
                      caption: 'Sample caption 3 - Replace with actual image and caption'
                    },
                    {
                      src: '/images/content.jpg',
                      alt: 'SOCONET Image 4',
                      caption: 'Sample caption 4 - Replace with actual image and caption'
                    }
                  ]}
                  aspectRatio="video"
                  objectFit="cover"
                />
                <div className="flex flex-col gap-4 mt-4">
                  <p
                    className="text-xl font-normal text-goos-gray-800 leading-[1.5]"
                    dangerouslySetInnerHTML={{ __html: t('emerging.soconet.paragraph1WithLink') }}
                  />
                  <p className="text-xl font-normal text-goos-gray-800 leading-[1.5]">
                    {t('emerging.soconet.paragraph2')}
                  </p>
                </div>
              </div>
            ),
            iconSrc: '/icons/network/surface_ocean_co2.svg',
            iconAlt: 'emerging.soconet.iconAlt',
            titleKey: 'emerging.soconet.title',
            paragraph1Key: 'emerging.soconet.paragraph1WithLink',
            paragraph2Key: 'emerging.soconet.paragraph2',
            deliveryAreasLabelKey: 'networks.deliveryAreasLabel',
            deliveryAreas: ['climate', 'oceanhealth'],
          },
          {
            // SUN Fleet - Fourth (Simple image)
            mediaType: 'image',
            imageSrc: '/images/content.jpg',
            imageAlt: 'emerging.sunFleet.imageAlt',
            iconSrc: '/icons/network/sun_fleet.svg',
            iconAlt: 'emerging.sunFleet.iconAlt',
            titleKey: 'emerging.sunFleet.title',
            paragraph1Key: 'emerging.sunFleet.paragraph1',
            paragraph2Key: 'emerging.sunFleet.paragraph2',
            deliveryAreasLabelKey: 'networks.deliveryAreasLabel',
            deliveryAreas: ['climate', 'operational', 'oceanhealth'],
          },
        ]}
        backgroundColor="bg-goos-blue-900"
        titleColor="text-white"
        cardBackgroundColor="bg-goos-blue-800"
        cardTextColor="text-white"
        buttonBgColor="bg-goos-blue-900"
        buttonTextColor="text-white"
        buttonIconBgColor="bg-goos-white"
        buttonIconColor="text-goos-blue-900"
        tooltipBgColor="text-goos-white"
        tooltipTextColor="bg-goos-blue-900"
        arrowColor="#F0F0F0"
      />
      </div>

        <Spacer size="md" backgroundColor="bg-goos-white"/>

      {/* Value of Ocean Observations */}
      <div id="value-section">
      <ContentModule
        title={t('valueOfObservations.title')}
        titleLevel="h2"
        titleColor="text-goos-blue-700"
        layout="split"
        backgroundColor="bg-goos-white"
        textColor="text-goos-black"
        lineColor="bg-goos-cyan-600"
      >
        <p className="text-goos-black text-xl leading-relaxed">
          {t('valueOfObservations.content')}
        </p>
      </ContentModule>
      </div>

      {/* AMOC Climate Story */}
      <div id="amoc-section" className="pt-16 bg-goos-white">
      <ContentModule
        kicker={t('amoc.kicker')}
        title={t('amoc.title')}
        titleLevel="h3"
        introduction={t('amoc.contributors')}
        layout="split"
        backgroundColor="bg-goos-white"
        titleColor="text-goos-blue-700"
        textColor="text-goos-gray-800"
        lineColor="bg-goos-cyan-600"
      >
        {/* Quick Summary - Collapsible */}
        <ContentBox
          titleKey="amoc.quickSummary.title"
          collapsible={true}
          defaultCollapsed={true}
          backgroundColor="bg-goos-white"
          textColor="text-goos-gray-800"
          titleColor="text-goos-blue-700"
          buttonBgColor="bg-goos-white"
           buttonTextColor="text-goos-blue-700"
          buttonIconColor="text-goos-blue-700"
          buttonIconBgColor="bg-goos-white"
          buttonLeftBorderColor="border-goos-cyan-600" 
          buttonIconBorderColor = "border-goos-blue-600"
          padding="p-6"
          
        >
          <div className="space-y-4">
            <p className="text-xl leading-relaxed" dangerouslySetInnerHTML={{ __html: t('amoc.quickSummary.climateStability') }} />
            <p className="text-xl leading-relaxed" dangerouslySetInnerHTML={{ __html: t('amoc.quickSummary.predictingFuture') }} />
            <p className="text-xl leading-relaxed" dangerouslySetInnerHTML={{ __html: t('amoc.quickSummary.globalPreparedness') }} />
          </div>
        </ContentBox>

        <Spacer size="sm" />

        {/* Main paragraphs */}
        <p className="text-xl leading-relaxed mb-4">{t('amoc.paragraph1')}</p>
        <p className="text-xl leading-relaxed mb-8">{t('amoc.paragraph2')}</p>

        {/* Observations & Benefits */}
        <h3 className="text-2xl font-bold text-goos-blue-700 mb-4">{t('amoc.observationsTitle')}</h3>
        <p className="text-xl leading-relaxed mb-4">{t('amoc.paragraph3')}</p>
        <p className="text-xl leading-relaxed mb-4">{t('amoc.paragraph4')}</p>
        <p className="text-xl leading-relaxed mb-6">{t('amoc.paragraph5')}</p>

        {/* Image 1 - AMOC time series */}
        <ImageCaption
          src="/images/content.jpg"
          alt={t('amoc.imageCaption')}
          caption={t('amoc.imageCaption')}
          aspectRatio="video"
          objectFit="cover"
        />

        <Spacer size="sm" />

        {/* Quote 1 */}
        <QuoteBlock
          variant="quote"
          quote={t('amoc.quote1.text')}
          authorName={t('amoc.quote1.author')}
          authorTitle={t('amoc.quote1.position')}
          quoteColor="text-goos-blue-700"
          authorColor="text-goos-blue-700"
          iconColor="fill-goos-cyan-600"
        />

        <Spacer size="sm" />

        {/* Image 2 - RAPID buoy */}
        <ImageCaption
          src="/images/content.jpg"
          alt={t('amoc.imageCaption2')}
          caption={t('amoc.imageCaption2')}
          aspectRatio="video"
          objectFit="cover"
        />

        <Spacer size="xs" />

        {/* Learn More Content Box */}
        <ContentBox
          titleKey="amoc.learnMore.title"
          backgroundColor="bg-goos-white"
          textColor="text-goos-blue-700"
          titleColor="text-goos-blue-700"
          collapsible={true}
          defaultCollapsed={true}
          buttonBgColor="bg-goos-white"
          buttonTextColor="text-goos-blue-700"
          buttonIconColor="text-goos-blue-700"
          buttonIconBgColor="bg-goos-white"
          buttonLeftBorderColor="border-goos-cyan-600"
          buttonIconBorderColor="border-goos-blue-600"
        >
          <div className="italic mb-6">
            <p className="text-lg leading-relaxed mb-4">
              "{t('amoc.learnMore.content1')}
            </p>
            <p className="text-lg leading-relaxed">
              {t('amoc.learnMore.content2')}"
            </p>
          </div>
          <div className="border-goos-blue-700">
            <p className="text-base font-semibold text-goos-blue-700">
              {t('amoc.learnMore.authorName')}
            </p>
            <p className="text-sm opacity-90">
              {t('amoc.learnMore.authorPosition')}
            </p>
          </div>
        </ContentBox>

        <Spacer size="sm" />

        {/* EOV Table */}
        <div className="mb-6">
          <h4 className="text-xl font-bold text-goos-blue-700 mb-4">{t('amoc.eovTable.title')}</h4>

          {/* Physics Table */}
          <IconTable
            columns={4}
            headers={[t('amoc.eovTable.physicsTitle')]}
            rows={[
              [
                { icon: '/icons/physics/Surface-temperature.png', legend: 'Sea surface temperature', iconSize: 'w-16 h-16' },
                { icon: '/icons/physics/Subsurface-temperature.png', legend: 'Subsurface temperature', iconSize: 'w-16 h-16' },
                { icon: '/icons/physics/Surface-currents.png', legend: 'Surface currents', iconSize: 'w-16 h-16' },
                { icon: '/icons/physics/Subsurface-currents.png', legend: 'Subsurface currents', iconSize: 'w-16 h-16' },
              ],
              [
                { icon: '/icons/physics/Surface-salinity.png', legend: 'Sea surface salinity', iconSize: 'w-16 h-16' },
                { icon: '/icons/physics/Subsurface-salinity.png', legend: 'Subsurface salinity', iconSize: 'w-16 h-16' },
                { icon: '/icons/physics/Surface-height.png', legend: 'Sea surface height', iconSize: 'w-16 h-16' },
                { icon: '/icons/physics/Surface-heat-flux.png', legend: 'Surface heat flux', iconSize: 'w-16 h-16' },
              ]
            ]}
            borderColor="border-goos-blue-700"
            headerBgColor="bg-goos-white"
            headerTextColor="text-goos-blue-700"
            rowBgColor="bg-goos-white"
            rowTextColor="text-goos-gray-800"
          />

          <Spacer size="sm" />

          {/* Additional Variables Section */}
           <h4 className="text-xl font-bold text-goos-blue-700 mb-4">{t('amoc.eovTable.additionalTitle')}</h4>

          {/* Biogeochemistry Table */}
          <IconTable
            columns={4}
            headers={[t('amoc.eovTable.biogeochemistryTitle')]}
            rows={[
              [
                { icon: '/icons/biogeochemistry/Oxygen.png', legend: 'Oxygen', iconSize: 'w-16 h-16' },
                { icon: '/icons/biogeochemistry/Inorganic-carbon.png', legend: 'Inorganic carbon', iconSize: 'w-16 h-16' },
                { icon: '/icons/biogeochemistry/Dissolved-organic-carbon.png', legend: 'Dissolved organic carbon', iconSize: 'w-16 h-16' },
                { icon: '/icons/biogeochemistry/Nutrients.png', legend: 'Nutrients', iconSize: 'w-16 h-16' },
              ]
            ]}
            borderColor="border-goos-orange-600"
            headerBgColor="bg-goos-white"
            headerTextColor="text-goos-orange-600"
            rowBgColor="bg-goos-white"
            rowTextColor="text-goos-orange-600"
          />
        </div>

        {/* What's Next */}
        <h3 className="text-2xl font-bold text-goos-blue-700 mb-4">{t('amoc.whatsNext.title')}</h3>
        <p className="text-xl leading-relaxed mb-4">{t('amoc.whatsNext.paragraph1')}</p>
        <p className="text-xl leading-relaxed mb-6">{t('amoc.whatsNext.paragraph2')}</p>
      </ContentModule>

      {/* Dr. Yao Fu Quote with Image */}
      <QuoteWithImage
        quote={t('amoc.quote2.text')}
        authorName={t('amoc.quote2.author')}
        authorTitle={t('amoc.quote2.position')}
        imageSrc="/images/content.jpg"
        imageAlt="Dr. Yao Fu"
        height="fullscreen"
        imagePosition="left"
        backgroundColor="bg-goos-cyan-200"
        quoteColor="text-goos-blue-700"
        authorColor="text-goos-blue-700"
        iconColor="fill-goos-cyan-600"
      />
      </div>

      {/* El Niño Operational Services Story */}
      <div id="elnino-section" className="pt-16 bg-goos-white">
      <ContentModule
        kicker={t('elNino.kicker')}
        title={t('elNino.title')}
        titleLevel="h3"
        introduction={t('elNino.contributors')}
        layout="split"
        backgroundColor="bg-goos-white"
        titleColor="text-goos-blue-700"
        textColor="text-goos-gray-800"
        lineColor="bg-goos-cyan-600"
      >
        {/* Quick Summary - Collapsible */}
        <ContentBox
          titleKey="elNino.quickSummary.title"
          collapsible={true}
          defaultCollapsed={true}
          backgroundColor="bg-goos-white"
          textColor="text-goos-gray-800"
          titleColor="text-goos-blue-700"
          buttonBgColor="bg-goos-white"
          buttonTextColor="text-goos-blue-700"
          buttonIconColor="text-goos-blue-700"
          buttonIconBgColor="bg-goos-white"
          buttonLeftBorderColor="border-goos-cyan-600"
          buttonIconBorderColor="border-goos-blue-600"
          padding="p-6"
        >
          <div className="space-y-4">
            <p className="text-xl leading-relaxed" dangerouslySetInnerHTML={{ __html: t('elNino.quickSummary.betterForecasts') }} />
            <p className="text-xl leading-relaxed" dangerouslySetInnerHTML={{ __html: t('elNino.quickSummary.earlyWarnings') }} />
            <p className="text-xl leading-relaxed" dangerouslySetInnerHTML={{ __html: t('elNino.quickSummary.protectingLivelihoods') }} />
          </div>
        </ContentBox>

        <Spacer size="sm" />

        {/* Main paragraphs */}
        <p className="text-xl leading-relaxed mb-4">{t('elNino.paragraph1')}</p>
        <p className="text-xl leading-relaxed mb-4">{t('elNino.paragraph2')}</p>
        <p className="text-xl leading-relaxed mb-8">{t('elNino.paragraph3')}</p>

        {/* Quote 1 - Juan Miguel Quintana Arena */}
        <QuoteBlock
          variant="quote"
          quote={t('elNino.quote1.text')}
          authorName={t('elNino.quote1.author')}
          authorTitle={t('elNino.quote1.position')}
          quoteColor="text-goos-blue-700"
          authorColor="text-goos-blue-700"
          iconColor="fill-goos-cyan-600"
        />

        <Spacer size="sm" />

        {/* Observations & Benefits */}
        <h3 className="text-2xl font-bold text-goos-blue-700 mb-4">{t('elNino.observationsTitle')}</h3>
        <p className="text-xl leading-relaxed mb-4">{t('elNino.paragraph4')}</p>
        <p className="text-xl leading-relaxed mb-6">{t('elNino.paragraph5')}</p>

        {/* Learn More Content Box - Monica Alvarado Niño */}
        <ContentBox
          titleKey="elNino.learnMore.title"
          backgroundColor="bg-goos-white"
          textColor="text-goos-blue-700"
          titleColor="text-goos-blue-700"
          collapsible={true}
          defaultCollapsed={true}
          buttonBgColor="bg-goos-white"
          buttonTextColor="text-goos-blue-700"
          buttonIconColor="text-goos-blue-700"
          buttonIconBgColor="bg-goos-white"
          buttonLeftBorderColor="border-goos-cyan-600"
          buttonIconBorderColor="border-goos-blue-600"
        >
          <div className="italic mb-6">
            <p className="text-lg leading-relaxed mb-4">
              "{t('elNino.learnMore.content1')}
            </p>
            <p className="text-lg leading-relaxed">
              {t('elNino.learnMore.content2')}"
            </p>
          </div>
          <div className="pt-4">
            <p className="text-base font-semibold">
              {t('elNino.learnMore.authorName')}
            </p>
            <p className="text-sm opacity-90">
              {t('elNino.learnMore.authorPosition')}
            </p>
          </div>
        </ContentBox>

        <Spacer size="sm" />

        {/* Quote 2 - Albert Fischer */}
        <QuoteBlock
          variant="quote"
          quote={t('elNino.quote2.text')}
          authorName={t('elNino.quote2.author')}
          authorTitle={t('elNino.quote2.position')}
          quoteColor="text-goos-blue-700"
          authorColor="text-goos-blue-700"
          iconColor="fill-goos-cyan-600"
        />

        <Spacer size="sm" />

        {/* Image - El Niño Forecast */}
        <ImageCaption
          src="/images/content.jpg"
          alt={t('elNino.imageCaption')}
          caption={t('elNino.imageCaption')}
          aspectRatio="video"
          objectFit="cover"
        />

        <Spacer size="sm" />

        {/* EOV Table */}
        <div className="mb-6">
          <h4 className="text-xl font-bold text-goos-blue-700 mb-4">{t('elNino.eovTable.title')}</h4>

          {/* Physics Table */}
          <IconTable
            columns={4}
            headers={[t('elNino.eovTable.physicsTitle')]}
            rows={[
              [
                { icon: '/icons/physics/Surface-temperature.png', legend: 'Sea surface temperature', iconSize: 'w-16 h-16' },
                { icon: '/icons/physics/Subsurface-temperature.png', legend: 'Subsurface temperature', iconSize: 'w-16 h-16' },
                { icon: '/icons/physics/Surface-currents.png', legend: 'Surface currents', iconSize: 'w-16 h-16' },
                { icon: '/icons/physics/Subsurface-currents.png', legend: 'Subsurface currents', iconSize: 'w-16 h-16' },
              ],
              [
                { icon: '/icons/physics/Surface-salinity.png', legend: 'Sea surface salinity', iconSize: 'w-16 h-16' },
                { icon: '/icons/physics/Subsurface-salinity.png', legend: 'Subsurface salinity', iconSize: 'w-16 h-16' },
                { icon: '/icons/physics/Surface-height.png', legend: 'Sea surface height', iconSize: 'w-16 h-16' },
                { icon: '', legend: '' },
              ]
            ]}
            borderColor="border-goos-blue-700"
            headerBgColor="bg-goos-white"
            headerTextColor="text-goos-blue-700"
            rowBgColor="bg-goos-white"
            rowTextColor="text-goos-blue-700"
          />

          <Spacer size="sm" />

          {/* Additional Variables Section */}
          <h4 className="text-xl font-bold text-goos-blue-700 mb-4">{t('elNino.eovTable.additionalTitle')}</h4>

          {/* Biology Table */}
          <IconTable
            columns={1}
            headers={[t('elNino.eovTable.biologyTitle')]}
            rows={[
              [
                { icon: '/icons/biology_and_ecosystems/Fish.png', legend: 'Fish abundance and distribution', iconSize: 'w-16 h-16' },
              ]
            ]}
            borderColor="border-goos-green-700"
            headerBgColor="bg-goos-white"
            headerTextColor="text-goos-green-700"
            rowBgColor="bg-goos-white"
            rowTextColor="text-goos-green-700"
          />
        </div>

        {/* What's Next */}
        <h3 className="text-2xl font-bold text-goos-blue-700 mb-4">{t('elNino.whatsNext.title')}</h3>
        <p className="text-xl leading-relaxed mb-6">{t('elNino.whatsNext.paragraph')}</p>
      </ContentModule>

      {/* Monica Alvarado Niño Quote with Image */}
      <QuoteWithImage
        quote={t('elNino.quote3.text')}
        authorName={t('elNino.quote3.author')}
        authorTitle={t('elNino.quote3.position')}
        imageSrc="/images/content.jpg"
        imageAlt="Monica Alvarado Niño"
        height="fullscreen"
        imagePosition="left"
        backgroundColor="bg-goos-cyan-200"
        quoteColor="text-goos-blue-700"
        authorColor="text-goos-blue-700"
        iconColor="fill-goos-cyan-600"
      />
      </div>

      {/* Ocean Health - Seal Data Story */}
      <div id="oceanhealth-section" className="pt-16 bg-goos-white">
      <ContentModule
        kicker={t('oceanHealth.kicker')}
        title={t('oceanHealth.title')}
        titleLevel="h3"
        introduction={t('oceanHealth.contributors')}
        layout="split"
        backgroundColor="bg-goos-white"
        titleColor="text-goos-blue-700"
        textColor="text-goos-gray-800"
        lineColor="bg-goos-cyan-600"
      >
        {/* Quick Summary - Collapsible */}
        <ContentBox
          titleKey="oceanHealth.quickSummary.title"
          collapsible={true}
          defaultCollapsed={true}
          backgroundColor="bg-goos-white"
          textColor="text-goos-gray-800"
          titleColor="text-goos-blue-700"
          buttonBgColor="bg-goos-white"
          buttonTextColor="text-goos-blue-700"
          buttonIconColor="text-goos-blue-700"
          buttonIconBgColor="bg-goos-white"
          buttonLeftBorderColor="border-goos-cyan-600"
          buttonIconBorderColor="border-goos-blue-600"
          padding="p-6"
        >
          <div className="space-y-4">
            <p className="text-xl leading-relaxed" dangerouslySetInnerHTML={{ __html: t('oceanHealth.quickSummary.realTimeInsights') }} />
            <p className="text-xl leading-relaxed" dangerouslySetInnerHTML={{ __html: t('oceanHealth.quickSummary.conservation') }} />
            <p className="text-xl leading-relaxed" dangerouslySetInnerHTML={{ __html: t('oceanHealth.quickSummary.globalCollaboration') }} />
          </div>
        </ContentBox>

        <Spacer size="sm" />

        {/* Main paragraphs */}
        <p className="text-xl leading-relaxed mb-4">{t('oceanHealth.paragraph1')}</p>
        <p className="text-xl leading-relaxed mb-4">{t('oceanHealth.paragraph2')}</p>
        <p className="text-xl leading-relaxed mb-8">{t('oceanHealth.paragraph3')}</p>

        {/* Observations & Benefits */}
        <h3 className="text-2xl font-bold text-goos-blue-700 mb-4">{t('oceanHealth.observationsTitle')}</h3>
        <p className="text-xl leading-relaxed mb-4">{t('oceanHealth.paragraph4')}</p>
        <p className="text-xl leading-relaxed mb-6">{t('oceanHealth.paragraph5')}</p>

        {/* Image - Seal foraging trips */}
        <ImageCaption
          src="/images/content.jpg"
          alt={t('oceanHealth.imageCaption')}
          caption={t('oceanHealth.imageCaption')}
          aspectRatio="video"
          objectFit="cover"
        />

        <Spacer size="sm" />

        {/* Quote 1 - Dr. Clive McMahon */}
        <QuoteBlock
          variant="quote"
          quote={t('oceanHealth.quote1.text')}
          authorName={t('oceanHealth.quote1.author')}
          authorTitle={t('oceanHealth.quote1.position')}
          quoteColor="text-goos-blue-700"
          authorColor="text-goos-blue-700"
          iconColor="fill-goos-cyan-600"
        />

        <Spacer size="sm" />

        <p className="text-xl leading-relaxed mb-6">{t('oceanHealth.paragraph6')}</p>

        {/* EOV Table */}
        <div className="mb-6">
          <h4 className="text-xl font-bold text-goos-blue-700 mb-4">{t('oceanHealth.eovTable.title')}</h4>

          {/* Biology and Ecosystems Table */}
          <IconTable
            columns={4}
            headers={[t('oceanHealth.eovTable.biologyTitle')]}
            rows={[
              [
                { icon: '/icons/biology_and_ecosystems/Marine-mammals.png', legend: 'Marine mammals', iconSize: 'w-16 h-16' },
                { icon: '/icons/biology_and_ecosystems/Sea-turtles.png', legend: 'Sea turtles', iconSize: 'w-16 h-16' },
                { icon: '/icons/biology_and_ecosystems/Seabirds.png', legend: 'Seabirds', iconSize: 'w-16 h-16' },
                { icon: '/icons/biology_and_ecosystems/Fish.png', legend: 'Fish', iconSize: 'w-16 h-16' },
              ]
            ]}
            borderColor="border-goos-green-700"
            headerBgColor="bg-goos-white"
            headerTextColor="text-goos-green-700"
            rowBgColor="bg-goos-white"
            rowTextColor="text-goos-green-700"
          />

          <Spacer size="sm" />

          {/* Physics Table */}
          <IconTable
            columns={4}
            headers={[t('oceanHealth.eovTable.physicsTitle')]}
            rows={[
              [
                { icon: '/icons/physics/Surface-temperature.png', legend: 'Sea surface temperature', iconSize: 'w-16 h-16' },
                { icon: '/icons/physics/Subsurface-temperature.png', legend: 'Subsurface temperature', iconSize: 'w-16 h-16' },
                { icon: '/icons/physics/Surface-salinity.png', legend: 'Sea surface salinity', iconSize: 'w-16 h-16' },
                { icon: '/icons/physics/Subsurface-salinity.png', legend: 'Subsurface salinity', iconSize: 'w-16 h-16' },
              ]
            ]}
            borderColor="border-goos-blue-700"
            headerBgColor="bg-goos-white"
            headerTextColor="text-goos-blue-700"
            rowBgColor="bg-goos-white"
            rowTextColor="text-goos-blue-700"
          />
        </div>

        {/* Learn More Content Box */}
        <ContentBox
          titleKey="oceanHealth.learnMore.title"
          backgroundColor="bg-goos-white"
          textColor="text-goos-blue-700"
          titleColor="text-goos-white"
          collapsible={true}
          defaultCollapsed={true}
          buttonBgColor="bg-goos-white"
          buttonTextColor="text-goos-blue-700"
          buttonIconColor="text-goos-blue-700"
          buttonIconBgColor="bg-goos-white"
          buttonLeftBorderColor="border-goos-cyan-600"
          buttonIconBorderColor="border-goos-blue-600"
        >
          <div className="italic mb-6">
            <p className="text-lg leading-relaxed mb-4">
              "{t('oceanHealth.learnMore.content1')}
            </p>
            <p className="text-lg leading-relaxed">
              {t('oceanHealth.learnMore.content2')}"
            </p>
          </div>
          <div className="pt-4">
            <p className="text-base font-semibold">
              {t('oceanHealth.learnMore.authorName')}
            </p>
            <p className="text-sm opacity-90">
              {t('oceanHealth.learnMore.authorPosition')}
            </p>
          </div>
        </ContentBox>

        <Spacer size="sm" />

        {/* What's Next */}
        <h3 className="text-2xl font-bold text-goos-blue-700 mb-4">{t('oceanHealth.whatsNext.title')}</h3>
        <p className="text-xl leading-relaxed mb-4">{t('oceanHealth.whatsNext.paragraph1')}</p>
        <p className="text-xl leading-relaxed mb-4">{t('oceanHealth.whatsNext.paragraph2')}</p>
        <p className="text-xl leading-relaxed mb-6">{t('oceanHealth.whatsNext.paragraph3')}</p>

        <Spacer size="sm" />

        {/* Learn More Podcast Content Box */}
        <ContentBox
          titleKey="oceanHealth.podcastBox.title"
          backgroundColor="bg-goos-blue-700"
          textColor="text-white"
          titleColor="text-white"
        >
          <p className="text-lg leading-relaxed mb-8">
            {t('oceanHealth.podcastBox.content')}
          </p>

          {/* Spotify Podcast Embed */}
          <SpotifyEmbed
            spotifyId="https://open.spotify.com/episode/7brfq0OYXFWUoILZJaqaSA?si=09ea24d816c44d45"
            type="episode"
            height={252}
          />
        </ContentBox>
      </ContentModule>

      {/* Dr. Clive McMahon Quote with Image */}
      <QuoteWithImage
        quote={t('oceanHealth.quote2.text')}
        authorName={t('oceanHealth.quote2.author')}
        authorTitle={t('oceanHealth.quote2.position')}
        imageSrc="/images/content.jpg"
        imageAlt="Dr. Clive McMahon"
        height="fullscreen"
        imagePosition="left"
        backgroundColor="bg-goos-cyan-200"
        quoteColor="text-goos-blue-700"
        authorColor="text-goos-blue-700"
        iconColor="fill-goos-cyan-600"
      />
      </div>
        <Spacer size="md" backgroundColor="bg-goos-green-100"/>

      {/* Strengthening and Expanding the System */}
      <div id="strengthening-section">
      <ContentModule
        title={t('strengtheningSystem.title')}
        titleLevel="h2"
        titleColor="text-goos-blue-700"
        layout="split"
        backgroundColor="bg-goos-green-100"
        textColor="text-goos-black"
        lineColor="bg-goos-green-700"
      >
        <p className="text-goos-black text-xl leading-relaxed">
          {t('strengtheningSystem.content')}
        </p>
      </ContentModule>
      </div>

        <Spacer size="md" backgroundColor="bg-goos-green-100"/>

      {/* South Africa - Agulhas Current Story */}
      <div id="southafrica-section">
      <ContentModule
        title={t('southAfrica.title')}
        titleLevel="h3"
        introduction={t('southAfrica.contributors')}
        layout="split"
        backgroundColor="bg-goos-green-100"
        titleColor="text-goos-blue-700"
        textColor="text-goos-gray-800"
        lineColor="bg-goos-green-700"
      >
        {/* Paragraphs distributed in two columns */}
        <p className="text-xl leading-relaxed mb-4">{t('southAfrica.paragraph1')}</p>
        <p className="text-xl leading-relaxed mb-4">{t('southAfrica.paragraph2')}</p>
        <p className="text-xl leading-relaxed mb-4">{t('southAfrica.paragraph3')}</p>
        <p className="text-xl leading-relaxed mb-4">{t('southAfrica.paragraph4')}</p>
        <p className="text-xl leading-relaxed mb-4">{t('southAfrica.paragraph5')}</p>
      </ContentModule>

       <div className="px-16 bg-goos-green-100">
       {/* Image Gallery with Navigation */}
        <ImageGallery
          images={[
            {
              src: '/images/content.jpg',
              alt: t('content.section1.gallery.image1.alt'),
              caption: t('content.section1.gallery.image1.caption'),
            },
          ]}
          aspectRatio="video"
          objectFit="cover"
          captionColor="text-goos-gray-800"
          arrowColor="text-goos-white"
          arrowBgColor="bg-goos-orange-600"
          dotColor="bg-gray-200"
          activeDotColor="bg-goos-orange-600"
        />
        {/* Spacer between modules */}
         <Spacer size="sm" />
      </div>
      </div>

        <Spacer size="md" backgroundColor="bg-goos-green-100"/>

      {/* 10,000 Ships for the Ocean Initiative */}
      <div id="ships-section">
      <ContentModule
        title={t('tenThousandShips.title')}
        titleLevel="h3"
        // introduction={t('tenThousandShips.contributors')}
        layout="split"
        backgroundColor="bg-goos-green-100"
        titleColor="text-goos-blue-700"
        textColor="text-goos-gray-800"
        lineColor="bg-goos-green-700"
        button={{
          type: 'link',
          label: t('tenThousandShips.buttonLabel'),
          url: 'https://10000ships.org',
          textColor: 'text-white',
          bgColor: 'bg-goos-green-700',
        }}
      >
        <p className="text-xl leading-relaxed mb-4">{t('tenThousandShips.paragraph1')}</p>
        <p className="text-xl leading-relaxed mb-4">{t('tenThousandShips.paragraph2')}</p>
        <p className="text-2xl leading-relaxed mb-4 text-goos-green-700 font-roboto-condensed font-normal" dangerouslySetInnerHTML={{ __html: t('tenThousandShips.paragraph3') }} />
      </ContentModule>

 <div className="px-16 bg-goos-green-100">
        {/* YouTube Video */}
        <VideoModal
          videoType="youtube"
          videoId="dQw4w9WgXcQ"
          previewImage="/images/content.jpg"
          previewAlt="10,000 Ships for the Ocean video"
          caption="Watch the launch of 10,000 Ships for the Ocean initiative"
          aspectRatio="video"
          playButtonColor="bg-goos-orange-500"
          captionColor="text-goos-gray-800"
        />
        {/* Spacer between modules */}
         <Spacer size="sm" />
      </div>
      </div>
      <Spacer size="md" backgroundColor="bg-goos-green-100"/>
      <Spacer size="md" backgroundColor="bg-goos-blue-900"/>

      {/* Call to Action */}
      <div id="calltoaction-section">
      <ContentModule
        title={t('callToAction.title')}
        titleLevel="h2"
        layout="split"
        backgroundColor="bg-goos-blue-900"
        titleColor="text-goos-white"
        textColor="text-goos-white"
        lineColor="bg-goos-orange-600"
      >
        <p className="text-xl font-normal text-goos-white leading-[1.5] mb-4">{t('callToAction.paragraph1')}</p>
        <p className="text-xl font-normal text-goos-white leading-[1.5] mb-4">{t('callToAction.paragraph2')}</p>
        <QuoteBlock
          quote={t('callToAction.quote')}
          authorName={t('callToAction.quoteAuthor')}
          authorTitle={t('callToAction.quotePosition')}
          quoteColor="text-goos-white"
          authorColor="text-goos-orange-500"
        />
      </ContentModule>
      </div>

      {/* Acknowledgments Panel */}
      <InsightPanel
        largeNumber="129"
        largeNumberDescription="Lorem ipsum dolor sit amet aliqua."
        button={{
          variant: 'action',
          label: 'VIEW FULL LIST',
          onClick: () => setIsPartnerModalOpen(true),
          textColor: 'text-white',
          bgColor: 'bg-goos-blue-700',
        }}
        rightContent={
          <p className="text-2xl leading-relaxed text-goos-orange-500 font-roboto-condensed font-normal">
            We acknowledge all the funders for their continued support, as well as the dedicated observing system implementers for their outstanding efforts in advancing the development of our global ocean observing system!
          </p>
        }
        backgroundColor="bg-goos-blue-900"
        textColor="text-goos-white"
        numberColor="text-goos-orange-500"
      />
      <Spacer size="xl" backgroundColor="bg-goos-blue-900"/>
      {/* Hero Image Grid */}
      <ImageGrid
        images={[
          {
            src: '/images/content.jpg',
            alt: t('hero.images.image1'),
          },
          {
            src: '/images/content2.jpg',
            alt: t('hero.images.image2'),
          },
          {
            src: '/images/content3.jpg',
            alt: t('hero.images.image3'),
          },
        ]}
        columns={3}
      />

      {/* Partner Modal Component */}
      <PartnerModal
        isOpen={isPartnerModalOpen}
        onClose={() => setIsPartnerModalOpen(false)}
        countries={partnerCountries}
        showFlags={true}
      />

      {/* LogoStrip Examples */}
      {/* Example 1: 9 logos with blue background */}
      <LogoStrip
        logos={[
          { src: '/logos/oceanops-w.png', altKey: 'logos.oceanops', url: 'https://www.ocean-ops.org' },
          { src: '/logos/oceanops-w.png', altKey: 'logos.partner1', url: 'https://example.com' },
          { src: '/logos/oceanops-w.png', altKey: 'logos.partner2', url: 'https://example.com' },
          { src: '/logos/oceanops-w.png', altKey: 'logos.partner3', url: 'https://example.com' },
          { src: '/logos/oceanops-w.png', altKey: 'logos.partner4', url: 'https://example.com' },
          { src: '/logos/oceanops-w.png', altKey: 'logos.partner5', url: 'https://example.com' },
          { src: '/logos/oceanops-w.png', altKey: 'logos.partner6', url: 'https://example.com' },
          { src: '/logos/oceanops-w.png', altKey: 'logos.partner7', url: 'https://example.com' },
          { src: '/logos/oceanops-w.png', altKey: 'logos.partner8', url: 'https://example.com' },
        ]}
        backgroundColor="bg-goos-blue-900"
      />

      {/* Contact Information */}
      <div id="contact-section">
      <ContentModule
        title={t('contact.title')}
        titleLevel="h3"
        layout="split"
        backgroundColor="bg-goos-blue-900"
        titleColor="text-goos-white"
        textColor="text-goos-white"
        hasLine={false}
      >
        <p className="text-xl font-normal text-goos-white leading-[1.5] mb-4" dangerouslySetInnerHTML={{ __html: t('contact.paragraph1') }} />
        <p className="text-xl font-normal text-goos-white leading-[1.5] mb-4" dangerouslySetInnerHTML={{ __html: t('contact.paragraph2') }} />
        <p className="text-base font-normal text-goos-white leading-[1.5] mb-4">{t('contact.paragraph3')}</p>
      </ContentModule>
      </div>

    </div>
  )
}

export default App
