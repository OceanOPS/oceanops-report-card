import type { Meta, StoryObj } from '@storybook/react';
import EmergingNetworkCarousel from '../../../src/components/EmergingNetworkCarousel';

const meta = {
  title: '06. Layout/EmergingNetworkCarousel',
  component: EmergingNetworkCarousel,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
Horizontal scrolling carousel for emerging ocean observing networks with rich media.

## Figma Design

<iframe
  style="border: 1px solid rgba(0, 0, 0, 0.1); border-radius: 8px; margin-top: 20px; margin-bottom: 20px;"
  width="100%"
  height="450"
  src="https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/design/JdNQkdV9E6lLtXAY15GM1L/Goos-Report-Card?node-id=1853-12728"
  allowfullscreen
></iframe>

**[→ Open in Figma](https://www.figma.com/design/JdNQkdV9E6lLtXAY15GM1L/Goos-Report-Card?node-id=1853-12728&t=lyDcrmhzDWxp62H7-4)**
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Optional section title',
    },
    hasLine: {
      control: 'boolean',
      description: 'Show decorative line above title',
    },
    lineColor: {
      control: 'select',
      options: ['bg-goos-blue-500', 'bg-goos-cyan-500', 'bg-goos-orange-500', 'bg-goos-green-500'],
      description: 'Decorative line color',
    },
    cards: {
      control: 'object',
      description: 'Array of EmergingNetworkCard data objects',
    },
    backgroundColor: {
      control: 'select',
      options: ['bg-goos-blue-700', 'bg-goos-blue-800', 'bg-goos-blue-900', 'bg-goos-cyan-700'],
      description: 'Section background color',
    },
    arrowColor: {
      control: 'color',
      description: 'Navigation arrow color (hex)',
    },
  },
} satisfies Meta<typeof EmergingNetworkCarousel>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * EmergingNetworkCarousel - Horizontal carousel of EmergingNetworkCards
 *
 * Features:
 * - **Embla Carousel**: Smooth scrolling, drag support, infinite loop
 * - **Navigation arrows**: Previous/next with custom colors
 * - **Pagination dots**: Visual indicator of current position
 * - **Full-width cards**: calc(100vw - 200px) responsive width
 * - **Media support**: Images, galleries, or videos
 * - **Optional title** with decorative line
 *
 * Use the controls to customize:
 * - Title and decorative line
 * - Cards array (emerging networks with media)
 * - Colors (background, arrows, buttons)
 */
export const Default: Story = {
  args: {
    title: 'Emerging Networks',
    hasLine: true,
    lineColor: 'bg-goos-orange-500',
    cards: [
      {
        mediaType: 'image',
        imageSrc: '/images/climate1.webp',
        imageAlt: 'Smart Cables Network',
        iconSrc: '/icons/operational_services.png',
        iconAlt: 'Smart Cables Icon',
        titleKey: 'SMART OCEAN-SMART INDUSTRIES',
        paragraph1Key: 'Smart cables represent an innovative approach to ocean monitoring by leveraging existing subsea telecommunications infrastructure.',
        paragraph2Key: 'These cables can be equipped with sensors to measure ocean temperature, pressure, and seismic activity along key oceanic pathways.',
        deliveryAreasLabelKey: 'GOOS Delivery Areas',
        deliveryAreas: ['climate', 'operational'],
        externalLinkUrl: 'https://www.goosocean.org',
        externalLinkTextKey: 'Learn More',
      },
      {
        mediaType: 'video',
        videoType: 'local',
        videoId: '/videos/belbeoch.mp4',
        previewImage: '/images/climate2.webp',
        iconSrc: '/icons/ocean_health.png',
        iconAlt: 'Ocean Health Network',
        titleKey: 'MARINE BIODIVERSITY NETWORK',
        paragraph1Key: 'Monitoring marine biodiversity is essential for understanding and protecting ocean ecosystems in the face of climate change.',
        paragraph2Key: 'This emerging network focuses on integrating biological observations with physical and chemical measurements.',
        deliveryAreasLabelKey: 'GOOS Delivery Areas',
        deliveryAreas: ['oceanhealth'],
        externalLinkUrl: 'https://www.goosocean.org',
        externalLinkTextKey: 'Learn More',
      },
      {
        mediaType: 'gallery',
        images: [
          { src: '/images/operational1.webp', alt: 'Research vessel', caption: 'Ocean monitoring platform' },
          { src: '/images/operational2.webp', alt: 'Ocean waves' },
          { src: '/images/operational3.webp', alt: 'Marine ecosystem' },
        ],
        iconSrc: '/icons/climate.png',
        iconAlt: 'Climate Network',
        titleKey: 'COASTAL OBSERVING NETWORK',
        paragraph1Key: 'Coastal regions are critical interfaces between land and ocean, requiring comprehensive monitoring systems.',
        paragraph2Key: 'This network brings together various observing platforms to provide integrated coastal ocean data.',
        deliveryAreasLabelKey: 'GOOS Delivery Areas',
        deliveryAreas: ['climate', 'operational', 'oceanhealth'],
        externalLinkUrl: 'https://www.goosocean.org',
        externalLinkTextKey: 'Learn More',
      },
    ],
    backgroundColor: 'bg-goos-blue-700',
    titleColor: 'text-white',
    cardBackgroundColor: 'bg-goos-blue-800',
    cardTextColor: 'text-white',
    arrowColor: '#F0F0F0',
  },
};
