import type { Meta, StoryObj } from '@storybook/react';
import NetworkCard from '../../../src/components/NetworkCard';

const meta = {
  title: 'Components/Network/NetworkCard',
  component: NetworkCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Network information card with ratings and GOOS delivery areas.

## Figma Design

<iframe
  style="border: 1px solid rgba(0, 0, 0, 0.1); border-radius: 8px; margin-top: 20px; margin-bottom: 20px;"
  width="100%"
  height="450"
  src="https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/design/JdNQkdV9E6lLtXAY15GM1L/Goos-Report-Card?node-id=1698-34737"
  allowfullscreen
></iframe>

**[→ Open in Figma](https://www.figma.com/design/JdNQkdV9E6lLtXAY15GM1L/Goos-Report-Card?node-id=1698-34737&t=lyDcrmhzDWxp62H7-4)**
        `,
      },
    },
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

/**
 * All Delivery Areas
 *
 * Shows a network that contributes to all three GOOS delivery areas:
 * - Climate
 * - Operational Services
 * - Ocean Health
 */
export const AllDeliveryAreas: Story = {
  args: {
    iconSrc: '/icons/climate.png',
    iconAlt: 'Global Network',
    titleKey: 'GLOBAL OCEAN OBSERVING NETWORK',
    networkUrl: 'https://www.goosocean.org',
    networkLinkKey: 'View Network',
    ratings: {
      implementationStatus: 3,
      realTime: 3,
      archivedHighQuality: 2.5,
      metadata: 3,
      bestPractices: 2,
    },
    deliveryAreasLabelKey: 'GOOS Delivery Areas',
    deliveryAreas: ['climate', 'operational', 'oceanhealth'],
    backgroundColor: 'bg-goos-blue-800',
    textColor: 'text-white',
    accentColor: 'text-goos-orange-500',
  },
};

/**
 * Different Color Schemes
 *
 * Shows network cards with different GOOS color backgrounds
 */
export const ColorVariants: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <NetworkCard
        iconSrc="/icons/climate.png"
        iconAlt="Climate Network"
        titleKey="CLIMATE NETWORK"
        networkUrl="https://www.goosocean.org"
        networkLinkKey="View Network"
        ratings={{
          implementationStatus: 3,
          realTime: 2.5,
          archivedHighQuality: 3,
          metadata: 2,
          bestPractices: 1.5,
        }}
        deliveryAreasLabelKey="GOOS Delivery Areas"
        deliveryAreas={['climate']}
        backgroundColor="bg-goos-blue-800"
        textColor="text-white"
        accentColor="text-goos-orange-500"
      />
      <NetworkCard
        iconSrc="/icons/operational_services.png"
        iconAlt="Operational Network"
        titleKey="OPERATIONAL SERVICES NETWORK"
        networkUrl="https://www.goosocean.org"
        networkLinkKey="View Network"
        ratings={{
          implementationStatus: 2.5,
          realTime: 3,
          archivedHighQuality: 2,
          metadata: 2.5,
          bestPractices: 2,
        }}
        deliveryAreasLabelKey="GOOS Delivery Areas"
        deliveryAreas={['operational']}
        backgroundColor="bg-goos-cyan-700"
        textColor="text-white"
        accentColor="text-goos-orange-500"
      />
      <NetworkCard
        iconSrc="/icons/ocean_health.png"
        iconAlt="Ocean Health Network"
        titleKey="OCEAN HEALTH NETWORK"
        networkUrl="https://www.goosocean.org"
        networkLinkKey="View Network"
        ratings={{
          implementationStatus: 2,
          realTime: 2,
          archivedHighQuality: 2.5,
          metadata: 1.5,
          bestPractices: 2,
        }}
        deliveryAreasLabelKey="GOOS Delivery Areas"
        deliveryAreas={['oceanhealth']}
        backgroundColor="bg-goos-green-700"
        textColor="text-white"
        accentColor="text-goos-cyan-500"
      />
      <NetworkCard
        iconSrc="/icons/climate.png"
        iconAlt="Dark Network"
        titleKey="DEEP OCEAN NETWORK"
        networkUrl="https://www.goosocean.org"
        networkLinkKey="View Network"
        ratings={{
          implementationStatus: 1.5,
          realTime: 1,
          archivedHighQuality: 2,
          metadata: 1,
          bestPractices: 1.5,
        }}
        deliveryAreasLabelKey="GOOS Delivery Areas"
        deliveryAreas={['climate', 'operational']}
        backgroundColor="bg-goos-blue-900"
        textColor="text-white"
        accentColor="text-goos-orange-500"
      />
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};
