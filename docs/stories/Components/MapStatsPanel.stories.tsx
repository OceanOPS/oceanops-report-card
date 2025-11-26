import type { Meta, StoryObj } from '@storybook/react';
import MapStatsPanel from '../../../src/components/MapStatsPanel';

const meta = {
  title: 'Components/MapStatsPanel',
  component: MapStatsPanel,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Optional panel title',
    },
    hasLine: {
      control: 'boolean',
      description: 'Show decorative line above title',
    },
    lineColor: {
      control: 'select',
      options: [
        'bg-goos-blue-500', 'bg-goos-cyan-500', 'bg-goos-orange-500', 'bg-goos-green-500',
      ],
      description: 'Decorative line color',
    },
    stats: {
      control: 'object',
      description: 'Array of exactly 4 stat objects for 2x2 grid (optional)',
    },
    mapSrc: {
      control: 'text',
      description: 'URL to map image or iframe src',
    },
    mapAlt: {
      control: 'text',
      description: 'Alt text for map image',
    },
    mapType: {
      control: 'select',
      options: ['image', 'iframe'],
      description: 'Type of map',
    },
    mapHeight: {
      control: 'number',
      description: 'Height of map in pixels (or "full" for viewport height)',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Remove horizontal padding for edge-to-edge display',
    },
    backgroundColor: {
      control: 'select',
      options: [
        'bg-goos-blue-700', 'bg-goos-blue-800', 'bg-goos-blue-900',
        'bg-goos-cyan-700', 'bg-goos-cyan-800',
        'bg-goos-orange-700', 'bg-goos-green-700',
      ],
      description: 'Background color',
    },
    titleColor: {
      control: 'select',
      options: ['text-white', 'text-goos-gray-100'],
      description: 'Title text color',
    },
    textColor: {
      control: 'select',
      options: ['text-white', 'text-goos-gray-100'],
      description: 'Body text color',
    },
    numberColor: {
      control: 'select',
      options: [
        'text-white', 'text-goos-orange-500', 'text-goos-cyan-500',
      ],
      description: 'Number text color',
    },
    linkColor: {
      control: 'select',
      options: [
        'text-white', 'text-goos-orange-500', 'text-goos-cyan-500',
      ],
      description: 'Link text color',
    },
  },
} satisfies Meta<typeof MapStatsPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * MapStatsPanel - Map with stats grid
 *
 * Features:
 * - **Two layouts**: 50/50 split (with stats) or full-width map (without stats)
 * - **2x2 stats grid** (exactly 4 stats)
 * - **Map types**: Image or iframe embed
 * - **Customizable height**: Pixels or full viewport
 * - **Optional title** with decorative line
 * - **External links** in stats
 * - **Full-width option** for edge-to-edge display
 *
 * Use the controls to customize:
 * - Title and decorative line
 * - Stats data (4 items)
 * - Map source and type
 * - All colors from GOOS palette
 */
export const WithStats: Story = {
  args: {
    title: 'Global Ocean Observation Network',
    hasLine: true,
    lineColor: 'bg-goos-orange-500',
    stats: [
      {
        number: '$45M',
        description: 'Annual funding for ocean research',
        linkText: 'View Details',
        linkUrl: 'https://www.goosocean.org',
      },
      {
        number: '$400B',
        description: 'Economic value of ocean data',
      },
      {
        number: '234K',
        description: 'Data points collected daily',
      },
      {
        number: '71%',
        description: 'Global ocean coverage',
      },
    ],
    mapSrc: '/images/climate1.webp',
    mapAlt: 'Global ocean observation map',
    mapType: 'image',
    mapHeight: 500,
    fullWidth: false,
    backgroundColor: 'bg-goos-blue-700',
    titleColor: 'text-white',
    textColor: 'text-white',
    numberColor: 'text-goos-orange-500',
    linkColor: 'text-goos-orange-500',
  },
};

/**
 * Full-width map without stats panel
 */
export const FullWidthMap: Story = {
  args: {
    title: 'Platform Distribution',
    hasLine: true,
    lineColor: 'bg-goos-orange-500',
    mapSrc: '/images/climate2.webp',
    mapAlt: 'Platform distribution map',
    mapType: 'image',
    mapHeight: 600,
    fullWidth: true,
    backgroundColor: 'bg-goos-blue-700',
    titleColor: 'text-white',
    textColor: 'text-white',
  },
};
