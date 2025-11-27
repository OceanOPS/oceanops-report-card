import type { Meta, StoryObj } from '@storybook/react';
import StatsGrid from '../../../src/components/StatsGrid';

const meta = {
  title: '05. Components/Data/StatsGrid',
  component: StatsGrid,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    columns: {
      control: 'select',
      options: [2, 4],
      description: 'Number of columns in grid',
    },
    title: {
      control: 'text',
      description: 'Optional title above grid',
    },
    hasLine: {
      control: 'boolean',
      description: 'Show decorative line above title',
    },
    lineColor: {
      control: 'select',
      options: [
        'bg-goos-orange-500', 'bg-goos-blue-500', 'bg-goos-cyan-500', 'bg-goos-green-500',
      ],
      description: 'Line color',
    },
    titleColor: {
      control: 'select',
      options: [
        'text-goos-blue-900', 'text-goos-blue-800', 'text-goos-blue-700',
        'text-goos-cyan-700', 'text-goos-orange-700',
      ],
      description: 'Title text color',
    },
    numberColor: {
      control: 'select',
      options: [
        'text-goos-blue-900', 'text-goos-blue-800', 'text-goos-blue-700',
        'text-goos-cyan-700', 'text-goos-orange-700',
      ],
      description: 'Number text color',
    },
    textColor: {
      control: 'select',
      options: [
        'text-goos-gray-900', 'text-goos-gray-800', 'text-goos-gray-700',
        'text-goos-blue-800',
      ],
      description: 'Description text color',
    },
    linkColor: {
      control: 'select',
      options: [
        'text-goos-gray-900', 'text-goos-gray-800', 'text-goos-blue-700',
      ],
      description: 'Link text color',
    },
  },
} satisfies Meta<typeof StatsGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * StatsGrid - Flexible statistics grid
 *
 * Features:
 * - **2 or 4 column layout** (responsive)
 * - **Optional title** with decorative line
 * - **External links** with icon
 * - **Customizable colors** from GOOS palette
 *
 * Use the controls to customize:
 * - Number of columns (2 or 4)
 * - Title and decorative line
 * - All colors
 * - Stats data (number, description, links)
 */
export const Default: Story = {
  args: {
    title: 'Networks by the numbers',
    hasLine: true,
    lineColor: 'bg-goos-orange-500',
    columns: 2,
    stats: [
      {
        number: '$45M',
        description: 'Annual investment in ocean monitoring infrastructure',
        linkText: 'Learn more',
        linkUrl: 'https://www.goosocean.org',
      },
      {
        number: '3,800',
        description: 'Active ocean observing platforms worldwide',
      },
      {
        number: '129',
        description: 'Countries contributing to global ocean observations',
      },
      {
        number: '85%',
        description: 'Global ocean coverage achieved',
      },
    ],
    titleColor: 'text-goos-blue-700',
    numberColor: 'text-goos-blue-700',
    textColor: 'text-goos-gray-800',
    linkColor: 'text-goos-gray-800',
  },
};
