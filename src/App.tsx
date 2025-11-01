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
import InsightGrid from './components/InsightGrid'
import MapStatsPanel from './components/MapStatsPanel'
import LogoStrip from './components/LogoStrip'
import NetworkCarousel from './components/NetworkCarousel'
import EmergingNetworkCarousel from './components/EmergingNetworkCarousel'
import Spacer from './components/Spacer'
import StatsGrid from './components/StatsGrid'
import DataTable from './components/DataTable'
import IconTable from './components/IconTable'
import SpotifyEmbed from './components/SpotifyEmbed'
import ImageCaption from './components/ImageCaption'
import ImageGallery from './components/ImageGallery'
import VideoModal from './components/VideoModal'
import Button from './components/Button'
import DataCardGrid from './components/DataCardGrid'
import ContentBox from './components/ContentBox'
import MenuSidebar from './components/MenuSidebar'

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
      'map-section',
      'networks-section',
      'emerging-section',
      'data-section'
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
          { id: 'map-section', titleKey: 'content.section1.title', accentColor: 'bg-goos-orange-500' },
          { id: 'networks-section', titleKey: 'networks.title', accentColor: 'bg-goos-cyan-500' },
          { id: 'emerging-section', titleKey: 'emerging.title', accentColor: 'bg-goos-green-500' },
          { id: 'data-section', titleKey: 'content.section1.stats.stat1.description', accentColor: 'bg-goos-blue-500' },
        ]}
      />

      {/* Cover */}
      <CoverModule
        title={t('cover.title')}
        year={t('cover.year')}
        yearColor="text-goos-orange-500"
        backgroundColor="bg-goos-blue-900"
        goosLogoVariant="white"
        partnerLogosVariant="white"
        // Background Media Options
        backgroundOpacity={40}
        backgroundSize="cover"
        backgroundBlendMode="luminosity"   // Uses luminosity of video with color of background
        // Background Image or Video
        mediaType="video"
        backgroundMedia="/videos/stock-footage-a-newborn-baby-whale-seeks-protection-from-its-mother-by-swimming-close-to-her-side-drone-view.webm"
      />

      {/* Spacer */}
      <Spacer size="md" backgroundColor="bg-goos-blue-900"/>


      {/* Intro */}
      <ContentModule
        layout="full-width"
        backgroundColor="bg-goos-blue-900"
        textColor="text-goos-gray-900"
        rightColumn={
          <>
            <p className="text-xl font-normal text-goos-white leading-[1.5]">
              {t('intro.paragraph2')}
            </p>
            <p className="text-xl font-normal text-goos-white leading-[1.5]">
              {t('intro.paragraph3')}
            </p>
          </>
        }
      >
        <p className="text-xl font-normal text-goos-white leading-[1.5]">
          {t('intro.paragraph1')}
        </p>
      </ContentModule>

      {/* In situ observing system status and updates */}
      <ContentModule
        titleLevel="h2"
        title={t('content.section1.title')}
        hasLine={true}
        backgroundColor="bg-goos-blue-900"
        titleColor="text-goos-white"
        textColor="text-goos-white"
        lineColor="bg-goos-orange-600"
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

        <h4 className="text-2xl font-extrabold text-goos-white leading-8">
          {t('content.section1.heading1')}
        </h4>

        <p className="text-xl font-normal text-goos-white leading-[1.5]">
          {t('content.section1.paragraph7')}
        </p>

        <p className="text-xl font-normal text-goos-white leading-[1.5]">
          {t('content.section1.paragraph8')}
        </p>

        <Spacer size="sm" />

        <h4 className="text-2xl font-extrabold text-goos-white leading-8">
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
          authorColor="text-goos-white"
        />
      </ContentModule>

      {/* Stats Grid - 4x1 */}
      <div className="bg-goos-blue-900 px-12 md:px-16 py-16">
        <StatsGrid
          title={t('content.section1.statsTitle')}
          hasLine={true}
          lineColor="bg-goos-orange-600"
          titleColor="text-goos-white"
          columns={4}
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
          numberColor="text-goos-orange-500"
          textColor="text-goos-white"
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
            deliveryAreas: ['operational', 'climate'],
          },
          {
            iconSrc: '/icons/network/soop.svg',
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
            deliveryAreas: ['operational', 'climate'],
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
            deliveryAreas: ['operational', 'climate'],
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
            deliveryAreas: ['operational', 'climate'],
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
            deliveryAreas: ['climate', 'oceanhealth', 'operational'],
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
            deliveryAreas: ['operational', 'climate', 'oceanhealth'],
          },
          {
            iconSrc: '/icons/network/dbcp_moored.svg',
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
            deliveryAreas: ['operational', 'climate'],
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
            deliveryAreas: ['operational', 'climate'],
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
            deliveryAreas: ['operational', 'climate', 'oceanhealth'],
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
            deliveryAreas: ['operational', 'climate', 'oceanhealth'],
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
            deliveryAreas: ['operational', 'climate', 'oceanhealth'],
          },
        ]}
        backgroundColor="bg-goos-blue-900"
        titleColor="text-white"
        cardBackgroundColor="bg-goos-blue-800"
        cardTextColor="text-white"
        cardAccentColor="text-goos-orange-500"
        tooltipBgColor="bg-goos-white"
        tooltipTextColor="text-blue-800"
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
            // FVON - First
            imageSrc: '/images/content.jpg',
            imageAlt: 'emerging.fvon.imageAlt',
            iconSrc: '/icons/network/fvon.svg',
            iconAlt: 'emerging.fvon.iconAlt',
            titleKey: 'emerging.fvon.title',
            paragraph1Key: 'emerging.fvon.paragraph1',
            paragraph2Key: 'emerging.fvon.paragraph2',
            externalLinkUrl: 'https://www.fvon.org/',
            externalLinkTextKey: 'networks.viewNetwork',
            youtubeVideoId: '-MKKMU3_siw',
            videoButtonTextKey: 'emerging.watchVideo',
            deliveryAreasLabelKey: 'networks.deliveryAreasLabel',
            deliveryAreas: ['operational', 'climate'],
          },
          {
            // SMART Cables - Second
            imageSrc: '/images/content.jpg',
            imageAlt: 'emerging.smartCables.imageAlt',
            iconSrc: '/icons/network/smart_cables.svg',
            iconAlt: 'emerging.smartCables.iconAlt',
            titleKey: 'emerging.smartCables.title',
            paragraph1Key: 'emerging.smartCables.paragraph1',
            paragraph2Key: 'emerging.smartCables.paragraph2',
            externalLinkUrl: 'https://www.smartcables.org/',
            externalLinkTextKey: 'networks.viewNetwork',
            youtubeVideoId: 'NoEK7XwOMeU',
            videoButtonTextKey: 'emerging.watchVideo',
            deliveryAreasLabelKey: 'networks.deliveryAreasLabel',
            deliveryAreas: ['climate', 'operational'],
          },
          {
            // SOCONET - Third
            imageSrc: '/images/content.jpg',
            imageAlt: 'emerging.soconet.imageAlt',
            iconSrc: '/icons/network/soconet.svg',
            iconAlt: 'emerging.soconet.iconAlt',
            titleKey: 'emerging.soconet.title',
            paragraph1Key: 'emerging.soconet.paragraph1',
            paragraph2Key: 'emerging.soconet.paragraph2',
            deliveryAreasLabelKey: 'networks.deliveryAreasLabel',
            deliveryAreas: ['climate', 'oceanhealth'],
          },
          {
            // SUN Fleet - Fourth
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
        tooltipBgColor="bg-goos-white"
        tooltipTextColor="text-blue-800"
        arrowColor="#F0F0F0"
      />
      </div>

      {/* Content Module Example 1 - With External Link Button */}
      <ContentModule
        titleLevel="h2"
        kicker={t('content.section1.kicker')}
        title={t('content.section1.title')}
        subtitle={t('content.section1.subtitle')}
        introduction={t('content.section1.introduction')}
        button={{
          type: 'link',
          label: t('content.section1.buttons.externalLink'),
          url: 'https://www.ocean-ops.org',
          textColor: 'text-white',
          bgColor: 'bg-goos-blue-700',
        }}
        hasLine={true}
        backgroundColor="bg-goos-white"
        titleColor="text-goos-blue-700"
        textColor="text-goos-gray-900"
        lineColor="bg-goos-orange-500"
      >
        <h4 className="text-2xl font-extrabold text-goos-blue-700 leading-8">
          {t('content.section1.heading')}
        </h4>

        <p className="text-xl font-normal text-goos-gray-800 leading-[1.5]">
          {t('content.section1.paragraph1')}
        </p>

        <p className="text-xl font-normal text-goos-gray-800 leading-[1.5]">
          {t('content.section1.paragraph2')}
        </p>

        <p className="text-xl font-normal text-goos-gray-800 leading-[1.5]">
          {t('content.section1.paragraph2')}
        </p>

        <p className="text-xl font-normal text-goos-gray-800 leading-[1.5]">
          {t('content.section1.paragraph2')}
        </p>

        {/* Spacer between modules */}
         <Spacer size="sm" />

        {/* Quote Block with translations - variant 'quote' */}
        <QuoteBlock
          variant="quote"
          quote={t('content.section1.quote.text')}
          authorName={t('content.section1.quote.authorName')}
          authorTitle={t('content.section1.quote.authorTitle')}
          logoSrc="/logos/oceanops.png"
          logoAlt={t('content.section1.quote.logoAlt')}
          quoteColor="text-goos-blue-700"
          authorColor="text-goos-blue-700"
          iconColor="fill-goos-orange-500"
        />

         {/* Spacer between modules */}
         <Spacer size="sm" />

        {/* Highlight variant - with left border */}
        <QuoteBlock
          variant="highlight"
          quote={t('content.section1.quote.text')}
          quoteColor="text-goos-blue-700"
          borderColor="border-goos-orange-500"
          authorName={t('content.section1.quote.authorName')}
          authorTitle={t('content.section1.quote.authorTitle')}
          authorColor="text-goos-blue-700"
        />

        {/* Spacer between modules */}
         <Spacer size="sm" />

        {/* Stats Grid 2x2 */}
        <StatsGrid
          stats={[
            {
              number: t('content.section1.stats.stat1.number'),
              description: t('content.section1.stats.stat1.description'),
              linkText: t('content.section1.stats.stat1.linkText'),
              linkUrl: t('content.section1.stats.stat1.linkUrl'),
            },
            {
              number: t('content.section1.stats.stat2.number'),
              description: t('content.section1.stats.stat2.description'),
              linkText: t('content.section1.stats.stat2.linkText'),
              linkUrl: t('content.section1.stats.stat2.linkUrl'),
            },
            {
              number: t('content.section1.stats.stat3.number'),
              description: t('content.section1.stats.stat3.description'),
              linkText: t('content.section1.stats.stat3.linkText'),
              linkUrl: t('content.section1.stats.stat3.linkUrl'),
            },
            {
              number: t('content.section1.stats.stat4.number'),
              description: t('content.section1.stats.stat4.description'),
              linkText: t('content.section1.stats.stat4.linkText'),
              linkUrl: t('content.section1.stats.stat4.linkUrl'),
            },
          ]}
          numberColor="text-goos-blue-700"
          textColor="text-goos-gray-900"
          linkColor="text-goos-gray-900"
        />

        {/* Spacer between modules */}
         <Spacer size="sm" />

        {/* Data Table */}
        <DataTable
          columns={4}
          headers={[
            t('content.section1.table.headers.col1'),
            t('content.section1.table.headers.col2'),
            t('content.section1.table.headers.col3'),
            t('content.section1.table.headers.col4'),
          ]}
          rows={[
            [
              t('content.section1.table.rows.row1.col1'),
              t('content.section1.table.rows.row1.col2'),
              t('content.section1.table.rows.row1.col3'),
              t('content.section1.table.rows.row1.col4'),
            ],
            [
              t('content.section1.table.rows.row2.col1'),
              t('content.section1.table.rows.row2.col2'),
              t('content.section1.table.rows.row2.col3'),
              t('content.section1.table.rows.row2.col4'),
            ],
            [
              t('content.section1.table.rows.row3.col1'),
              t('content.section1.table.rows.row3.col2'),
              t('content.section1.table.rows.row3.col3'),
              t('content.section1.table.rows.row3.col4'),
            ],
            [
              t('content.section1.table.rows.row4.col1'),
              t('content.section1.table.rows.row4.col2'),
              t('content.section1.table.rows.row4.col3'),
              t('content.section1.table.rows.row4.col4'),
            ],
          ]}
          firstColumnBold={true}
          borderColor="border-goos-white"
          headerBgColor="bg-goos-blue-700"
          headerTextColor="text-goos-white"
          rowBgColor="bg-goos-blue-700"
          rowTextColor="text-goos-white"
        />

        {/* Spacer between modules */}
         <Spacer size="sm" />

        {/* Icon Table with images */}
        <IconTable
          columns={4}
          headers={[
            t('content.section1.iconTable.headers.col1'),
          ]}
          rows={[
            [
              { icon: '/images/surface-temperature.png', iconSize: 'h-16', legend: t('content.section1.iconTable.rows.row1.col1') },
              { icon: '/images/surface-temperature.png', iconSize: 'h-16', legend: t('content.section1.iconTable.rows.row1.col2') },
              { icon: '/images/surface-temperature.png', iconSize: 'h-16', legend: t('content.section1.iconTable.rows.row1.col3') },
              { icon: '/images/surface-temperature.png', iconSize: 'h-16', legend: t('content.section1.iconTable.rows.row1.col3') },              
            ],
          ]}
          borderColor="border-goos-blue-700"
          headerBgColor="bg-goos-white"
          headerTextColor="text-goos-blue-700"
          rowBgColor="bg-goos-white"
          rowTextColor="text-goos-blue-700"
        />

        {/* Spacer between modules */}
         <Spacer size="sm" />

        {/* Spotify Podcast Embed */}
        <SpotifyEmbed
          spotifyId="3AjTpnz2G7RZofpSOtiDa1"
          type="episode"
          height={352}
        />

        {/* Spacer between modules */}
         <Spacer size="sm" />

        {/* Image with Caption */}
        <ImageCaption
          src="/images/content3.jpg"
          alt={t('content.section1.image.alt')}
          caption={t('content.section1.image.caption')}
          aspectRatio="video"
          objectFit="cover"
          captionColor="text-goos-gray-800"
        />

        {/* Spacer between modules */}
         <Spacer size="sm" />

        {/* Image Gallery with Navigation */}
        <ImageGallery
          images={[
            {
              src: '/images/content.jpg',
              alt: t('content.section1.gallery.image1.alt'),
              caption: t('content.section1.gallery.image1.caption'),
            },
            {
              src: '/images/content2.jpg',
              alt: t('content.section1.gallery.image2.alt'),
              caption: t('content.section1.gallery.image2.caption'),
            },
            {
              src: '/images/content3.jpg',
              alt: t('content.section1.gallery.image3.alt'),
              caption: t('content.section1.gallery.image3.caption'),
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

        {/* Video Modal - YouTube Example */}
        <VideoModal
          videoType="youtube"
          videoId="dQw4w9WgXcQ"
          previewImage="/images/content2.jpg"
          previewAlt={t('content.section1.video.previewAlt')}
          caption={t('content.section1.video.caption')}
          playButtonColor="bg-goos-orange-500"
          captionColor="text-goos-gray-800"
        />

        {/* Spacer between modules */}
         <Spacer size="sm" />

         {/* Video Modal - Local Video Example */}
        <VideoModal
          videoType="local"
          videoId="/videos/stock-footage-a-newborn-baby-whale-seeks-protection-from-its-mother-by-swimming-close-to-her-side-drone-view.webm"
          previewImage="/images/content3.jpg"
          previewAlt={t('content.section1.video.previewAlt')}
          caption={t('content.section1.video.caption')}
          playButtonColor="bg-goos-orange-500"
          captionColor="text-goos-gray-800"
        />

        {/* Spacer between modules */}
         <Spacer size="sm" />

        <h4 className="text-2xl font-extrabold text-goos-blue-700 leading-8">
          {t('content.section1.buttons.examplesTitle')}
        </h4>

        <p className="text-xl font-normal text-goos-gray-800 leading-[1.5]">
          {t('content.section1.buttons.examplesDescription')}
        </p>

        {/* Button Examples - External Link */}
        <div className="flex">
          <Button
            variant="link"
            label={t('content.section1.buttons.externalLink')}
            url="https://www.ocean-ops.org"
            textColor="text-white"
            bgColor="bg-goos-blue-700"
            iconColor="text-goos-blue-700"
            iconBgColor="bg-white" 
          />
        </div>

        {/* Button Examples - Video Modal */}
        <div className="flex">
          <Button
            variant="video"
            label={t('content.section1.buttons.watchVideo')}
            videoType="youtube"
            videoId="dQw4w9WgXcQ"
            previewImage="/images/content.jpg"
            textColor="text-white"
            bgColor="bg-goos-orange-600"
            iconColor="text-goos-orange-600"
            iconBgColor="bg-white" 
          />
        </div>

        {/* Button Examples - Content Modal with Multiple Components */}
        <div className="flex gap-3">
          {/* Modal 1 - Full featured with all components */}
          <Button
            variant="modal"
            label={t('content.section1.buttons.learnMore')}
            modalTitle={t('content.section1.modal.title')}
            modalContent={
              <div className="flex flex-col gap-5">
                <div className="text-5xl font-extrabold text-goos-blue-700">This is the title</div>
                {/* Paragraphs with translations */}
                <p className="text-xl font-normal text-goos-gray-800 leading-[1.5]">
                  {t('content.section1.modal.paragraph1')}
                </p>

                <p className="text-xl font-normal text-goos-gray-800 leading-[1.5]">
                  {t('content.section1.modal.paragraph2')}
                </p>

                {/* Heading */}
                <h3 className="text-2xl font-extrabold text-goos-blue-700 leading-8 mt-2">
                  {t('content.section1.modal.heading')}
                </h3>

                {/* List with translations */}
                <ul className="list-disc list-inside text-xl text-goos-gray-800 space-y-2">
                  <li>{t('content.section1.modal.listItems.item1')}</li>
                  <li>{t('content.section1.modal.listItems.item2')}</li>
                  <li>{t('content.section1.modal.listItems.item3')}</li>
                  <li>{t('content.section1.modal.listItems.item4')}</li>
                </ul>

                {/* Spacer */}
                <Spacer size="sm" />

                {/* Image with Caption */}
                <ImageCaption
                  src="/images/content.jpg"
                  alt={t('content.section1.image.alt')}
                  caption={t('content.section1.image.caption')}
                  aspectRatio="video"
                  objectFit="cover"
                  captionColor="text-goos-gray-800"
                />

                {/* Spacer */}
                <Spacer size="sm" />

                {/* Quote Block */}
                <QuoteBlock
                  variant="highlight"
                  quote={t('content.section1.quote.text')}
                  quoteColor="text-goos-blue-700"
                  borderColor="border-goos-orange-500"
                  authorName={t('content.section1.quote.authorName')}
                  authorTitle={t('content.section1.quote.authorTitle')}
                  authorColor="text-goos-blue-700"
                />

                {/* Spacer */}
                <Spacer size="sm" />

                {/* Stats Grid */}
                <StatsGrid
                  stats={[
                    {
                      number: t('content.section1.stats.stat1.number'),
                      description: t('content.section1.stats.stat1.description'),
                      linkText: t('content.section1.stats.stat1.linkText'),
                      linkUrl: t('content.section1.stats.stat1.linkUrl'),
                    },
                    {
                      number: t('content.section1.stats.stat2.number'),
                      description: t('content.section1.stats.stat2.description'),
                      linkText: t('content.section1.stats.stat2.linkText'),
                      linkUrl: t('content.section1.stats.stat2.linkUrl'),
                    },
                  ]}
                  numberColor="text-goos-blue-700"
                  textColor="text-goos-gray-900"
                  linkColor="text-goos-gray-900"
                />

                {/* Spacer */}
                <Spacer size="sm" />

                {/* Button inside modal */}
                <div className="flex">
                  <Button
                    variant="link"
                    label={t('content.section1.buttons.externalLink')}
                    url="https://www.ocean-ops.org"
                    textColor="text-white"
                    bgColor="bg-goos-blue-700"
                  />
                </div>
              </div>
            }
            modalMaxWidth="xl"
            textColor="text-white"
            bgColor="bg-goos-orange-600"
            iconColor="text-goos-orange-600"
            iconBgColor="bg-white" 
          />

          {/* Modal 2 - Simple with just text and table */}
          <Button
            variant="modal"
            label="Data Overview"
            modalTitle="Platform Data Overview"
            modalContent={
              <div className="flex flex-col gap-5">
                <p className="text-xl font-normal text-goos-gray-800 leading-[1.5]">
                  {t('content.section1.paragraph1')}
                </p>

                <Spacer size="sm" />

                <DataTable
                  columns={4}
                  headers={[
                    t('content.section1.table.headers.col1'),
                    t('content.section1.table.headers.col2'),
                    t('content.section1.table.headers.col3'),
                    t('content.section1.table.headers.col4'),
                  ]}
                  rows={[
                    [
                      t('content.section1.table.rows.row1.col1'),
                      t('content.section1.table.rows.row1.col2'),
                      t('content.section1.table.rows.row1.col3'),
                      t('content.section1.table.rows.row1.col4'),
                    ],
                    [
                      t('content.section1.table.rows.row2.col1'),
                      t('content.section1.table.rows.row2.col2'),
                      t('content.section1.table.rows.row2.col3'),
                      t('content.section1.table.rows.row2.col4'),
                    ],
                  ]}
                  firstColumnBold={true}
                  borderColor="border-goos-white"
                  headerBgColor="bg-goos-blue-700"
                  headerTextColor="text-goos-white"
                  rowBgColor="bg-goos-blue-700"
                  rowTextColor="text-goos-white"
                />
              </div>
            }
            modalMaxWidth="lg"
            textColor="text-white"
            bgColor="bg-goos-orange-600"
            iconColor="text-goos-orange-600"
            iconBgColor="bg-white" 
          />

          {/* Modal 3 - Gallery focused */}
          <Button
            variant="modal"
            label="Image Gallery"
            modalTitle="Ocean Observation Platforms"
            modalContent={
              <div className="flex flex-col gap-5">
                <ImageGallery
                  images={[
                    {
                      src: '/images/content.jpg',
                      alt: t('content.section1.gallery.image1.alt'),
                      caption: t('content.section1.gallery.image1.caption'),
                    },
                    {
                      src: '/images/content2.jpg',
                      alt: t('content.section1.gallery.image2.alt'),
                      caption: t('content.section1.gallery.image2.caption'),
                    },
                    {
                      src: '/images/content3.jpg',
                      alt: t('content.section1.gallery.image3.alt'),
                      caption: t('content.section1.gallery.image3.caption'),
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
              </div>
            }
            modalMaxWidth="2xl"
            textColor="text-white"
            bgColor="bg-goos-orange-600"
            iconColor="text-goos-orange-600"
            iconBgColor="bg-white" 
          />
        </div>

        {/* Spacer between modules */}
         <Spacer size="sm" />

          {/* ContentBox Example - Simple container with title, paragraph, and Spotify embed */}
      <ContentBox
        titleKey="contentBox.example.title"
        backgroundColor="bg-goos-blue-800"
        textColor="text-white"
        titleColor="text-white"
        padding="p-8"
      >
        <p className="text-lg leading-relaxed">
          {t('contentBox.example.paragraph')}
        </p>

            {/* Spotify Podcast Embed */}
        <SpotifyEmbed
          spotifyId="3AjTpnz2G7RZofpSOtiDa1"
          type="episode"
          height={252}
        />
      </ContentBox>

      </ContentModule>
      

       <div className="px-16 bg-goos-white">
        {/* Data Table */}
        <DataTable
          columns={4}
          headers={[
            t('content.section1.table.headers.col1'),
            t('content.section1.table.headers.col2'),
            t('content.section1.table.headers.col3'),
            t('content.section1.table.headers.col4'),
          ]}
          rows={[
            [
              t('content.section1.table.rows.row1.col1'),
              t('content.section1.table.rows.row1.col2'),
              t('content.section1.table.rows.row1.col3'),
              t('content.section1.table.rows.row1.col4'),
            ],
            [
              t('content.section1.table.rows.row2.col1'),
              t('content.section1.table.rows.row2.col2'),
              t('content.section1.table.rows.row2.col3'),
              t('content.section1.table.rows.row2.col4'),
            ],
            [
              t('content.section1.table.rows.row3.col1'),
              t('content.section1.table.rows.row3.col2'),
              t('content.section1.table.rows.row3.col3'),
              t('content.section1.table.rows.row3.col4'),
            ],
            [
              t('content.section1.table.rows.row4.col1'),
              t('content.section1.table.rows.row4.col2'),
              t('content.section1.table.rows.row4.col3'),
              t('content.section1.table.rows.row4.col4'),
            ],
          ]}
          firstColumnBold={true}
          borderColor="border-goos-white"
          headerBgColor="bg-goos-blue-700"
          headerTextColor="text-goos-white"
          rowBgColor="bg-goos-blue-700"
          rowTextColor="text-goos-white"
        />
         {/* Spacer between modules */}
         <Spacer size="sm" />
      </div>
      

      {/* Content Module Example - Full Width Layout */}
      <ContentModule
        layout="full-width"
        titleLevel="h2"
        kicker={t('content.section1.kicker')}
        title="Full Width Layout Example"
        subtitle="Content in Two Columns"
        introduction="This layout displays the title at the top with content distributed in two columns below."
        hasLine={true}
        backgroundColor="bg-goos-white"
        titleColor="text-goos-blue-700"
        textColor="text-goos-gray-900"
        lineColor="bg-goos-orange-500"
        rightColumn={
          <>
            <p className="text-xl font-normal text-goos-gray-800 leading-[1.5]">
              {t('content.section1.paragraph1')}
            </p>

            <p className="text-xl font-normal text-goos-gray-800 leading-[1.5]">
              {t('content.section1.paragraph2')}
            </p>
          </>
        }
      >
        <p className="text-xl font-normal text-goos-gray-800 leading-[1.5]">
          {t('content.section1.paragraph1')}
        </p>

        <p className="text-xl font-normal text-goos-gray-800 leading-[1.5]">
          {t('content.section1.paragraph2')}
        </p>

        <Spacer size="sm" />

      </ContentModule>
 
 <div className="px-16 bg-goos-white">
       {/* Image Gallery with Navigation */}
        <ImageGallery
          images={[
            {
              src: '/images/content.jpg',
              alt: t('content.section1.gallery.image1.alt'),
              caption: t('content.section1.gallery.image1.caption'),
            },
            {
              src: '/images/content2.jpg',
              alt: t('content.section1.gallery.image2.alt'),
              caption: t('content.section1.gallery.image2.caption'),
            },
            {
              src: '/images/content3.jpg',
              alt: t('content.section1.gallery.image3.alt'),
              caption: t('content.section1.gallery.image3.caption'),
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

      {/* QuoteWithImage Examples */}

      {/* Example 1: Fullscreen with image on left (default) */}
      <QuoteWithImage
        quote={t('content.section1.quote.text')}
        authorName={t('content.section1.quote.authorName')}
        authorTitle={t('content.section1.quote.authorTitle')}
        imageSrc="/images/content.jpg"
        imageAlt="Ocean research professional"
        logoSrc="/logos/oceanops.png"
        logoAlt="OceanOPS Logo"
        height="fullscreen"
        imagePosition="left"
        backgroundColor="bg-goos-cyan-200"
        quoteColor="text-goos-blue-700"
        authorColor="text-goos-blue-700"
        iconColor="fill-goos-cyan-600"
      />

      {/* Example 2: Auto height with image on right */}
      <QuoteWithImage
        quote={t('content.section1.quote.text')}
        authorName={t('content.section1.quote.authorName')}
        authorTitle={t('content.section1.quote.authorTitle')}
        imageSrc="/images/content2.jpg"
        imageAlt="Marine scientist at work"
        height="auto"
        imagePosition="right"
        backgroundColor="bg-goos-blue-900"
        quoteColor="text-white"
        authorColor="text-white"
        iconColor="fill-goos-cyan-500"
      />

      {/* Example 3: Without logo, custom colors */}
      <QuoteWithImage
        quote={t('content.section1.quote.text')}
        authorName={t('content.section1.quote.authorName')}
        authorTitle={t('content.section1.quote.authorTitle')}
        imageSrc="/images/content3.jpg"
        imageAlt="Ocean waves"
        height="fullscreen"
        imagePosition="left"
        backgroundColor="bg-goos-orange-500"
        quoteColor="text-white"
        authorColor="text-white"
        iconColor="fill-white"
      />

      {/* Example 5: No image - full width quote */}
      <QuoteWithImage
        quote={t('content.section1.quote.text')}
        authorName={t('content.section1.quote.authorName')}
        authorTitle={t('content.section1.quote.authorTitle')}
        logoSrc="/logos/oceanops.png"
        height="auto"
        backgroundColor="bg-goos-blue-700"
        quoteColor="text-white"
        authorColor="text-white"
        iconColor="fill-goos-orange-500"
      />

      {/* InsightPanel Examples */}

      {/* Example 1: Full featured with title, button, and 4 stats */}
      <InsightPanel
        title="Insight Panel Optional Heading"
        hasLine={true}
        lineColor="bg-goos-orange-500"
        largeNumber="129"
        largeNumberDescription="Lorem ipsum dolor sit amet aliqua."
        button={{
          variant: 'action',
          label: 'VIEW FULL LIST',
          onClick: () => setIsPartnerModalOpen(true),
          textColor: 'text-white',
          bgColor: 'bg-goos-blue-900',
        }}
        stats={[
          {
            number: '$45M',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod aliqua.',
            linkText: 'External Link',
            linkUrl: 'https://example.com',
          },
          {
            number: '$400B',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod aliqua.',
            linkText: 'External Link',
            linkUrl: 'https://example.com',
          },
          {
            number: '$400B',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod aliqua.',
            linkText: 'External Link',
            linkUrl: 'https://example.com',
          },
          {
            number: '$45M',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod aliqua.',
            linkText: 'External Link',
            linkUrl: 'https://example.com',
          },
        ]}
        backgroundColor="bg-goos-blue-700"
        titleColor="text-white"
        textColor="text-white"
        numberColor="text-white"
        linkColor="text-white"
      />

      {/* Example 3: With translations */}
      <InsightPanel
        title={t('content.section1.heading')}
        largeNumber={t('content.section1.stats.stat1.number')}
        largeNumberDescription={t('content.section1.stats.stat1.description')}
        button={{
          variant: 'link',
          label: 'LEARN MORE',
          url: 'https://www.ocean-ops.org',
          textColor: 'text-white',
          bgColor: 'bg-goos-orange-500',
        }}
        stats={[
          {
            number: t('content.section1.stats.stat2.number'),
            description: t('content.section1.stats.stat2.description'),
            linkText: t('content.section1.stats.stat2.linkText'),
            linkUrl: t('content.section1.stats.stat2.linkUrl'),
          },
          {
            number: t('content.section1.stats.stat3.number'),
            description: t('content.section1.stats.stat3.description'),
            linkText: t('content.section1.stats.stat3.linkText'),
            linkUrl: t('content.section1.stats.stat3.linkUrl'),
          },
          {
            number: t('content.section1.stats.stat4.number'),
            description: t('content.section1.stats.stat4.description'),
            linkText: t('content.section1.stats.stat4.linkText'),
            linkUrl: t('content.section1.stats.stat4.linkUrl'),
          },
        ]}
        backgroundColor="bg-goos-blue-900"
        lineColor="bg-goos-orange-500"
        numberColor="text-goos-orange-500"
      />

      {/* InsightGrid Examples */}

      {/* Example 1: 4 insights with title and links */}
      <InsightGrid
        title="Key Metrics Overview"
        hasLine={true}
        lineColor="bg-goos-orange-500"
        insights={[
          {
            number: '2,847',
            description: 'Active ocean observation platforms worldwide',
            linkText: 'View Details',
            linkUrl: 'https://www.ocean-ops.org',
          },
          {
            number: '$45M',
            description: 'Annual funding for ocean research programs',
            linkText: 'Learn More',
            linkUrl: 'https://example.com',
          },
          {
            number: '567',
            description: 'Research publications based on ocean data',
            linkText: 'Read Papers',
            linkUrl: 'https://example.com',
          },
          {
            number: '98%',
            description: 'Data accuracy rate across all platforms',
            linkText: 'View Report',
            linkUrl: 'https://example.com',
          },
        ]}
        backgroundColor="bg-goos-blue-700"
        titleColor="text-white"
        textColor="text-white"
        numberColor="text-white"
        linkColor="text-white"
      />

      {/* Example 4: With translations */}
      <InsightGrid
        title={t('content.section1.heading')}
        insights={[
          {
            number: t('content.section1.stats.stat1.number'),
            description: t('content.section1.stats.stat1.description'),
            linkText: t('content.section1.stats.stat1.linkText'),
            linkUrl: t('content.section1.stats.stat1.linkUrl'),
          },
          {
            number: t('content.section1.stats.stat2.number'),
            description: t('content.section1.stats.stat2.description'),
            linkText: t('content.section1.stats.stat2.linkText'),
            linkUrl: t('content.section1.stats.stat2.linkUrl'),
          },
          {
            number: t('content.section1.stats.stat3.number'),
            description: t('content.section1.stats.stat3.description'),
            linkText: t('content.section1.stats.stat3.linkText'),
            linkUrl: t('content.section1.stats.stat3.linkUrl'),
          },
        ]}
        backgroundColor="bg-goos-orange-500"
        titleColor="text-white"
        textColor="text-white"
        numberColor="text-white"
        linkColor="text-white"
      />

      {/* Partner Modal Example - View Full List Button */}
      <div className="bg-goos-blue-700 py-12 px-12 flex justify-center">
        <button
          onClick={() => setIsPartnerModalOpen(true)}
          className="bg-goos-orange-500 hover:bg-goos-orange-600 text-white font-bold py-4 px-8 rounded-lg text-xl transition-colors"
        >
          View Full Partner List
        </button>
      </div>

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
        backgroundColor="bg-goos-blue-700"
      />

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

    </div>
  )
}

export default App
