import { useTranslation } from 'react-i18next'
import CoverModule from './components/CoverModule'
import LanguageSwitcher from './components/LanguageSwitcher'

function App() {
  const { t } = useTranslation()

  return (
    <div>
      {/* Language Switcher - temporary fixed position */}
      <LanguageSwitcher className="fixed top-4 right-4 z-50" />

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
        // Blend Mode - uncomment to test different effects:
        // backgroundBlendMode="multiply"     // Darker, multiplies colors
        // backgroundBlendMode="screen"       // Lighter, inverted multiply
        // backgroundBlendMode="overlay"      // Combines multiply and screen
        backgroundBlendMode="luminosity"   // Uses luminosity of video with color of background
        // backgroundBlendMode="color"        // Uses color of background with luminosity of video
        // backgroundBlendMode="soft-light"   // Subtle lighting effect
        // Background Image or Video
        mediaType="video"
        backgroundMedia="/videos/stock-footage-a-newborn-baby-whale-seeks-protection-from-its-mother-by-swimming-close-to-her-side-drone-view.webm"
      />
    </div>
  )
}

export default App
