import { asset } from '../utils/assets'

export type EmergingNetworkMediaConfig = {
  mediaType: 'image' | 'video'
  videoType?: 'youtube' | 'local'
  /** Local mp4 path or YouTube id */
  videoSrc?: string
  imageSrc?: string
  imageAltKey: string
  titleKey: string
  paragraph1Key: string
  paragraph2Key: string
  externalLinkUrl: string
}

/** Rich media + long-form copy for the four emerging GOOS networks (former carousel). */
export const EMERGING_NETWORK_MEDIA: Record<string, EmergingNetworkMediaConfig> = {
  fvon: {
    mediaType: 'video',
    videoType: 'local',
    videoSrc: asset('/videos/fvon.mp4'),
    imageAltKey: 'emerging.fvon.imageAlt',
    titleKey: 'emerging.fvon.title',
    paragraph1Key: 'emerging.fvon.paragraph1',
    paragraph2Key: 'emerging.fvon.paragraph2',
    externalLinkUrl: 'https://www.fvon.org/',
  },
  smartCables: {
    mediaType: 'video',
    videoType: 'local',
    videoSrc: asset('/videos/smart-cables.mp4'),
    imageAltKey: 'emerging.smartCables.imageAlt',
    titleKey: 'emerging.smartCables.title',
    paragraph1Key: 'emerging.smartCables.paragraph1',
    paragraph2Key: 'emerging.smartCables.paragraph2',
    externalLinkUrl: 'https://www.smartcables.org/',
  },
  soconet: {
    mediaType: 'image',
    imageSrc: asset('/images/soconet.webp'),
    imageAltKey: 'emerging.soconet.imageAlt',
    titleKey: 'emerging.soconet.title',
    paragraph1Key: 'emerging.soconet.paragraph1WithLink',
    paragraph2Key: 'emerging.soconet.paragraph2',
    externalLinkUrl: 'https://www.ioccp.org/soconet',
  },
  sunFleet: {
    mediaType: 'image',
    imageSrc: asset('/images/sunfleet.webp'),
    imageAltKey: 'emerging.sunFleet.imageAlt',
    titleKey: 'emerging.sunFleet.title',
    paragraph1Key: 'emerging.sunFleet.paragraph1',
    paragraph2Key: 'emerging.sunFleet.paragraph2',
    externalLinkUrl: 'https://airseaobs.org/sun-fleet',
  },
}

export function getEmergingNetworkMedia(
  networkId: string,
): EmergingNetworkMediaConfig | null {
  return EMERGING_NETWORK_MEDIA[networkId] ?? null
}

export function hasEmergingNetworkMedia(networkId: string): boolean {
  return networkId in EMERGING_NETWORK_MEDIA
}
