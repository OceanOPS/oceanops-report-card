import type { Meta, StoryObj } from '@storybook/react';
import EmergingNetworkCard from '../../../src/components/EmergingNetworkCard';

const meta = {
  title: '05. Components/Network/EmergingNetworkCard',
  component: EmergingNetworkCard,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
Horizontal card for emerging ocean observing networks with image, gallery, or video support.

## Figma Design

<iframe
  style="border: 1px solid rgba(0, 0, 0, 0.1); border-radius: 8px; margin-top: 20px; margin-bottom: 20px;"
  width="100%"
  height="450"
  src="https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/design/JdNQkdV9E6lLtXAY15GM1L/Goos-Report-Card?node-id=1866-13223"
  allowfullscreen
></iframe>

**[→ Open in Figma](https://www.figma.com/design/JdNQkdV9E6lLtXAY15GM1L/Goos-Report-Card?node-id=1866-13223&t=lyDcrmhzDWxp62H7-4)**
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    mediaType: {
      control: 'select',
      options: ['image', 'gallery', 'video'],
      description: 'Type of media to display',
    },
    imageSrc: {
      control: 'text',
      description: 'URL to single image (for mediaType="image")',
    },
    imageAlt: {
      control: 'text',
      description: 'Alt text for image',
    },
    images: {
      control: 'object',
      description: 'Array of images for gallery (for mediaType="gallery")',
    },
    videoType: {
      control: 'select',
      options: ['youtube', 'local'],
      description: 'Type of video (for mediaType="video")',
    },
    videoId: {
      control: 'text',
      description: 'YouTube ID or local video URL (for mediaType="video")',
    },
    previewImage: {
      control: 'text',
      description: 'Video thumbnail/preview image',
    },
    iconSrc: {
      control: 'text',
      description: 'URL to network icon',
    },
    iconAlt: {
      control: 'text',
      description: 'Alt text for icon',
    },
    titleKey: {
      control: 'text',
      description: 'Network title',
    },
    paragraph1Key: {
      control: 'text',
      description: 'First paragraph text',
    },
    paragraph2Key: {
      control: 'text',
      description: 'Second paragraph text',
    },
    deliveryAreasLabelKey: {
      control: 'text',
      description: 'Label for delivery areas section',
    },
    deliveryAreas: {
      control: 'object',
      description: 'Array of delivery area keys (1-3): climate, operational, oceanhealth',
    },
    externalLinkUrl: {
      control: 'text',
      description: 'External link URL',
    },
    externalLinkTextKey: {
      control: 'text',
      description: 'External link button text',
    },
    backgroundColor: {
      control: 'select',
      options: [
        'bg-goos-blue-700', 'bg-goos-blue-800', 'bg-goos-blue-900',
        'bg-goos-cyan-700', 'bg-goos-cyan-800',
        'bg-goos-orange-700', 'bg-goos-green-700',
      ],
      description: 'Card background color',
    },
    textColor: {
      control: 'select',
      options: ['text-white', 'text-goos-gray-100'],
      description: 'Text color',
    },
  },
} satisfies Meta<typeof EmergingNetworkCard>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * EmergingNetworkCard - Horizontal card for emerging networks
 *
 * Features:
 * - **Three media types**: Single image, image gallery, or video
 * - **Horizontal layout**: Media left, content right
 * - **Delivery areas** (1-3): Climate, Operational Services, Ocean Health
 * - **Tooltips** on delivery area icons
 * - **Optional external link** button
 * - **Modal support** for gallery/video
 * - **Responsive** layout (stacks on mobile)
 *
 * Use the controls to customize:
 * - Media type and content
 * - Network icon, title, and paragraphs
 * - Delivery areas
 * - Colors
 */
export const WithImage: Story = {
  args: {
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
    backgroundColor: 'bg-goos-blue-800',
    textColor: 'text-white',
  },
};

/**
 * With video - YouTube embed
 */
export const WithVideo: Story = {
  args: {
    mediaType: 'video',
    videoType: 'local',
    videoId: '/videos/belbeoch.mp4',
    previewImage: '/images/climate1.webp',
    iconSrc: '/icons/ocean_health.png',
    iconAlt: 'Ocean Health Network',
    titleKey: 'MARINE BIODIVERSITY NETWORK',
    paragraph1Key: 'Monitoring marine biodiversity is essential for understanding and protecting ocean ecosystems in the face of climate change.',
    paragraph2Key: 'This emerging network focuses on integrating biological observations with physical and chemical measurements.',
    deliveryAreasLabelKey: 'GOOS Delivery Areas',
    deliveryAreas: ['oceanhealth'],
    externalLinkUrl: 'https://www.goosocean.org',
    externalLinkTextKey: 'Learn More',
    backgroundColor: 'bg-goos-blue-800',
    textColor: 'text-white',
  },
};

/**
 * With image gallery
 */
export const WithGallery: Story = {
  args: {
    mediaType: 'gallery',
    images: [
      { src: '/images/climate1.webp', alt: 'Research vessel', caption: 'Ocean monitoring platform' },
      { src: '/images/climate2.webp', alt: 'Ocean waves' },
      { src: '/images/climate3.webp', alt: 'Marine ecosystem', caption: 'Coral reef observation' },
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
    backgroundColor: 'bg-goos-blue-800',
    textColor: 'text-white',
  },
};
