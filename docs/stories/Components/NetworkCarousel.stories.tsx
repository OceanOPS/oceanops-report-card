import type { Meta, StoryObj } from '@storybook/react';
import NetworkCarousel from '../../../src/components/NetworkCarousel';

const meta = {
  title: 'Components/NetworkCarousel',
  component: NetworkCarousel,
  parameters: {
    layout: 'fullscreen',
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
      description: 'Array of NetworkCard data objects',
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
} satisfies Meta<typeof NetworkCarousel>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * NetworkCarousel - Horizontal carousel of NetworkCards
 *
 * Features:
 * - **Embla Carousel**: Smooth scrolling, drag support, infinite loop
 * - **Navigation arrows**: Previous/next with custom colors
 * - **Pagination dots**: Visual indicator of current position
 * - **Responsive cards**: 400px wide with 48px spacing
 * - **Optional title** with decorative line
 * - **Star ratings** and delivery areas for each network
 *
 * Use the controls to customize:
 * - Title and decorative line
 * - Cards array (networks with ratings)
 * - Colors (background, arrows)
 */
export const Default: Story = {
  args: {
    title: 'Ocean Observing Networks',
    hasLine: true,
    lineColor: 'bg-goos-orange-500',
    cards: [
      {
        iconSrc: '/icons/climate.png',
        iconAlt: 'Argo Network',
        titleKey: 'ARGO FLOATS NETWORK',
        networkUrl: 'https://www.goosocean.org',
        networkLinkKey: 'View Network',
        ratings: {
          implementationStatus: 3,
          realTime: 3,
          archivedHighQuality: 3,
          metadata: 2.5,
          bestPractices: 2,
        },
        deliveryAreasLabelKey: 'GOOS Delivery Areas',
        deliveryAreas: ['climate', 'operational', 'oceanhealth'],
      },
      {
        iconSrc: '/icons/operational_services.png',
        iconAlt: 'Drifter Network',
        titleKey: 'SURFACE DRIFTER NETWORK',
        networkUrl: 'https://www.goosocean.org',
        networkLinkKey: 'View Network',
        ratings: {
          implementationStatus: 3,
          realTime: 2.5,
          archivedHighQuality: 3,
          metadata: 2,
          bestPractices: 2,
        },
        deliveryAreasLabelKey: 'GOOS Delivery Areas',
        deliveryAreas: ['climate', 'operational'],
      },
      {
        iconSrc: '/icons/ocean_health.png',
        iconAlt: 'Mooring Network',
        titleKey: 'OCEAN MOORING NETWORK',
        networkUrl: 'https://www.goosocean.org',
        networkLinkKey: 'View Network',
        ratings: {
          implementationStatus: 2.5,
          realTime: 2,
          archivedHighQuality: 2.5,
          metadata: 2,
          bestPractices: 1.5,
        },
        deliveryAreasLabelKey: 'GOOS Delivery Areas',
        deliveryAreas: ['climate', 'oceanhealth'],
      },
    ],
    backgroundColor: 'bg-goos-blue-700',
    titleColor: 'text-white',
    cardBackgroundColor: 'bg-goos-blue-800',
    cardTextColor: 'text-white',
    cardAccentColor: 'text-goos-orange-500',
    arrowColor: '#F0F0F0',
  },
};
