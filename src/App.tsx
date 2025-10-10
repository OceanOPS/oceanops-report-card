import { useTranslation } from 'react-i18next'
import CoverModule from './components/CoverModule'
import LanguageSwitcher from './components/LanguageSwitcher'
import ImageGrid from './components/ImageGrid'
import ContentModule from './components/ContentModule'
import QuoteBlock from './components/QuoteBlock'

function App() {
  const { t } = useTranslation()

  return (
    <div>
      {/* Language Switcher - temporary fixed position */}
      <LanguageSwitcher className="fixed top-4 right-4 z-50" />

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

      {/* Hero Image Grid */}
      <ImageGrid
        images={[
          {
            src: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=800&h=800&fit=crop',
            alt: t('hero.images.image1'),
          },
          {
            src: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=800&h=800&fit=crop',
            alt: t('hero.images.image2'),
          },
          {
            src: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=800&fit=crop',
            alt: t('hero.images.image3'),
          },
        ]}
        columns={3}
      />

      {/* Content Module Example - H3 with translations */}
      <ContentModule
        titleLevel="h2"
        kicker={t('content.section1.kicker')}
        title={t('content.section1.title')}
        subtitle={t('content.section1.subtitle')}
        introduction={t('content.section1.introduction')}
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

        {/* Quote Block with translations */}
        <QuoteBlock
          quote={t('content.section1.quote.text')}
          authorName={t('content.section1.quote.authorName')}
          authorTitle={t('content.section1.quote.authorTitle')}
          logoSrc="/logos/oceanops.png"
          logoAlt={t('content.section1.quote.logoAlt')}
          quoteColor="text-goos-blue-700"
          authorColor="text-goos-blue-700"
          iconColor="fill-goos-orange-500"
        />
      </ContentModule>
    </div>
  )
}

export default App
