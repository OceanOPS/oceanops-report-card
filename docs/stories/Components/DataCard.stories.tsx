import type { Meta, StoryObj } from '@storybook/react';
import DataCard from '../../../src/components/DataCard';

const meta = {
  title: 'Components/DataCard',
  component: DataCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    number: {
      control: 'text',
      description: 'Large display number (e.g., "108", "3,800")',
    },
    tagKey: {
      control: 'text',
      description: 'Translation key for tag label',
    },
    iconSrc: {
      control: 'text',
      description: 'Path to icon image',
    },
    iconAlt: {
      control: 'text',
      description: 'Alt text for icon',
    },
    titleKey: {
      control: 'text',
      description: 'Translation key for card title',
    },
    backgroundColor: {
      control: 'select',
      options: [
        'bg-goos-blue-900', 'bg-goos-blue-800', 'bg-goos-blue-700', 'bg-goos-blue-600', 'bg-goos-blue-500',
        'bg-goos-cyan-900', 'bg-goos-cyan-800', 'bg-goos-cyan-700', 'bg-goos-cyan-600',
        'bg-goos-orange-700', 'bg-goos-orange-600', 'bg-goos-green-700', 'bg-goos-green-600',
      ],
      description: 'Card background color',
    },
    textColor: {
      control: 'select',
      options: ['text-white', 'text-goos-gray-100'],
      description: 'Text color',
    },
    numberColor: {
      control: 'select',
      options: ['text-white', 'text-goos-orange-500', 'text-goos-cyan-500'],
      description: 'Number color',
    },
    tagColor: {
      control: 'select',
      options: ['text-white', 'text-goos-gray-200'],
      description: 'Tag color',
    },
    iconBgColor: {
      control: 'select',
      options: [
        'bg-goos-green-700', 'bg-goos-green-600', 'bg-goos-orange-700', 'bg-goos-orange-600',
        'bg-goos-cyan-700', 'bg-goos-blue-700',
      ],
      description: 'Icon circle background color',
    },
  },
} satisfies Meta<typeof DataCard>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * DataCard - Animated data display card
 *
 * Features:
 * - **Animated counter** that counts up to number on scroll
 * - **Large display number** with customizable color
 * - **Tag label** in top-right corner
 * - **Icon** with circular background
 * - **Title** at bottom
 *
 * Use the controls to customize:
 * - Number, tag, and title (use translation keys)
 * - All colors from GOOS palette
 * - Icon source
 *
 * **Note**: Number animation triggers on scroll (disabled in Storybook preview)
 */
export const Default: Story = {
  args: {
    number: '108',
    tagKey: 'Programmes',
    iconSrc: '/icons/biology_and_ecosystems/Fish.png',
    iconAlt: 'Marine biology icon',
    titleKey: 'MARINE BIOLOGICAL PROGRAMMES',
    backgroundColor: 'bg-goos-blue-800',
    textColor: 'text-white',
    numberColor: 'text-white',
    tagColor: 'text-white',
    iconBgColor: 'bg-goos-green-700',
  },
};
