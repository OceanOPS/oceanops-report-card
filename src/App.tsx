import { useTranslation } from 'react-i18next'
import CoverModule from './components/CoverModule'
import LanguageSwitcher from './components/LanguageSwitcher'
import ImageGrid from './components/ImageGrid'

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
    </div>
  )
}

export default App
