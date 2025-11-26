import type { Meta, StoryObj } from '@storybook/react';
import NetworkCard from '../../../src/components/NetworkCard';

const meta = {
  title: 'Components/NetworkCard',
  component: NetworkCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    iconSrc: {
      control: 'text',
      description: 'URL to network icon/logo',
    },
    iconAlt: {
      control: 'text',
      description: 'Alt text for icon',
    },
    titleKey: {
      control: 'text',
      description: 'Network title',
    },
    networkUrl: {
      control: 'text',
      description: 'URL to network page',
    },
    networkLinkKey: {
      control: 'text',
      description: 'Link text',
    },
    ratings: {
      control: 'object',
      description: 'Ratings object (0-3 for stars, or string for text)',
    },
    deliveryAreasLabelKey: {
      control: 'text',
      description: 'Label for delivery areas section',
    },
    deliveryAreas: {
      control: 'object',
      description: 'Array of delivery area keys (1-3): climate, operational, oceanhealth',
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
    accentColor: {
      control: 'select',
      options: [
        'text-goos-orange-500', 'text-goos-cyan-500', 'text-goos-blue-500',
      ],
      description: 'Star and link accent color',
    },
  },
} satisfies Meta<typeof NetworkCard>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * NetworkCard - Network information card
 *
 * Features:
 * - **Star ratings** (0-3 with half-star support)
 * - **Text ratings** (e.g., "Not applicable")
 * - **Five rating categories**: Implementation Status, Real-Time, Archived, Metadata, Best Practices
 * - **Delivery areas** (1-3): Climate, Operational Services, Ocean Health
 * - **Tooltips** on rating labels
 * - **External link** to network page
 * - **Responsive** layout
 *
 * Use the controls to customize:
 * - Network icon and title
 * - Ratings (numeric for stars, string for text)
 * - Delivery areas
 * - Colors
 */
export const Default: Story = {
  args: {
    iconSrc: '/icons/climate.png',
    iconAlt: 'Argo Network',
    titleKey: 'ARGO FLOATS NETWORK',
    networkUrl: 'https://www.goosocean.org',
    networkLinkKey: 'View Network',
    ratings: {
      implementationStatus: 3,
      realTime: 2.5,
      archivedHighQuality: 3,
      metadata: 2,
      bestPractices: 1.5,
    },
    deliveryAreasLabelKey: 'GOOS Delivery Areas',
    deliveryAreas: ['climate', 'operational', 'oceanhealth'],
    backgroundColor: 'bg-goos-blue-800',
    textColor: 'text-white',
    accentColor: 'text-goos-orange-500',
  },
};

/**
 * With text ratings - for emerging networks
 */
export const WithTextRatings: Story = {
  args: {
    iconSrc: '/icons/ocean_health.png',
    iconAlt: 'Emerging Network',
    titleKey: 'SMART OCEAN-SMART INDUSTRIES',
    networkUrl: 'https://www.goosocean.org',
    networkLinkKey: 'View Network',
    ratings: {
      implementationStatus: 'Not applicable',
      realTime: 2,
      archivedHighQuality: 'N/A',
      metadata: 1,
      bestPractices: 'Not applicable',
    },
    deliveryAreasLabelKey: 'GOOS Delivery Areas',
    deliveryAreas: ['climate', 'oceanhealth'],
    backgroundColor: 'bg-goos-blue-800',
    textColor: 'text-white',
    accentColor: 'text-goos-orange-500',
  },
};
