import { useRef } from 'react'
import { createPortal } from 'react-dom'
import { useTranslation } from 'react-i18next'
import Plyr from 'plyr-react'
import 'plyr-react/plyr.css'
import Button from './Button'
import ContentModal from './ContentModal'
import {
  getEmergingNetworkMedia,
  type EmergingNetworkMediaConfig,
} from '../data/emergingNetworkMedia'

interface EmergingNetworkMediaModalProps {
  networkId: string | null
  onClose: () => void
}

function ModalBody({ config }: { config: EmergingNetworkMediaConfig }) {
  const { t } = useTranslation()
  const plyrRef = useRef<any>(null)

  const plyrOptions = {
    controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'fullscreen'],
    settings: [],
    clickToPlay: true,
    hideControls: true,
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="w-full">
        {config.mediaType === 'image' && config.imageSrc && (
          <img
            src={config.imageSrc}
            alt={t(config.imageAltKey)}
            className="w-full h-auto object-cover rounded"
          />
        )}
        {config.mediaType === 'video' && config.videoSrc && config.videoType === 'local' && (
          <div className="aspect-video w-full bg-black rounded overflow-hidden">
            <div className="plyr-card-wrapper w-full h-full">
              <style>{`
                .plyr-card-wrapper {
                  display: flex;
                  align-items: center;
                  justify-content: center;
                }
                .plyr-card-wrapper .plyr {
                  width: 100% !important;
                  height: 100% !important;
                  --plyr-color-main: #F48B25;
                }
                .plyr-card-wrapper .plyr video {
                  width: 100% !important;
                  height: 100% !important;
                  object-fit: contain !important;
                }
                .plyr-card-wrapper .plyr__video-wrapper {
                  padding-bottom: 0 !important;
                  height: 100% !important;
                }
                .plyr-card-wrapper .plyr__controls {
                  position: absolute !important;
                  bottom: 0 !important;
                  left: 0 !important;
                  right: 0 !important;
                }
              `}</style>
              <Plyr
                ref={plyrRef}
                source={{
                  type: 'video',
                  sources: [{ src: config.videoSrc, type: 'video/mp4' }],
                }}
                options={plyrOptions}
              />
            </div>
          </div>
        )}
        {config.mediaType === 'video' && config.videoType === 'youtube' && config.videoSrc && (
          <div className="aspect-video w-full bg-black rounded overflow-hidden">
            <iframe
              src={`https://www.youtube.com/embed/${config.videoSrc}?modestbranding=1&rel=0`}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              title="YouTube video player"
            />
          </div>
        )}
      </div>

      <div className="space-y-3 sm:space-y-4">
        <h3 className="text-xl sm:text-2xl font-bold text-goos-orange-500">{t(config.titleKey)}</h3>
        <p
          className="text-base sm:text-lg md:text-xl font-normal text-white leading-relaxed"
          dangerouslySetInnerHTML={{ __html: t(config.paragraph1Key) }}
        />
        <p className="text-base sm:text-lg md:text-xl font-normal text-white leading-relaxed">
          {t(config.paragraph2Key)}
        </p>
      </div>

      <div className="flex">
        <Button
          variant="link"
          label={t('networks.viewNetwork')}
          url={config.externalLinkUrl}
          bgColor="bg-goos-orange-600"
          textColor="text-white"
          iconBgColor="bg-white"
          iconColor="text-goos-orange-600"
        />
      </div>
    </div>
  )
}

export default function EmergingNetworkMediaModal({
  networkId,
  onClose,
}: EmergingNetworkMediaModalProps) {
  const { t } = useTranslation()
  const config = networkId ? getEmergingNetworkMedia(networkId) : null
  const isOpen = Boolean(config)

  if (typeof document === 'undefined') return null

  return createPortal(
    <ContentModal
      isOpen={isOpen}
      onClose={onClose}
      title={t('emerging.modalTitle')}
      maxWidth="lg"
      backgroundColor="bg-goos-blue-900"
    >
      {config ? <ModalBody config={config} /> : null}
    </ContentModal>,
    document.body,
  )
}
