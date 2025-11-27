import type { Meta, StoryObj } from '@storybook/react';
import DataCardGrid from '../../../src/components/DataCardGrid';

const meta = {
  title: '05. Components/Data/DataCardGrid',
  component: DataCardGrid,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    cards: {
      control: 'object',
      description: 'Array of DataCard objects (max 12)',
    },
    backgroundColor: {
      control: 'select',
      options: [
        'bg-goos-blue-100', 'bg-goos-blue-200', 'bg-goos-blue-300', 'bg-goos-blue-400', 'bg-goos-blue-500',
        'bg-goos-blue-600', 'bg-goos-blue-700', 'bg-goos-blue-800', 'bg-goos-blue-900',
        'bg-goos-cyan-100', 'bg-goos-cyan-200', 'bg-goos-cyan-300', 'bg-goos-cyan-400', 'bg-goos-cyan-500',
        'bg-goos-cyan-600', 'bg-goos-cyan-700', 'bg-goos-cyan-800', 'bg-goos-cyan-900',
        'bg-goos-orange-100', 'bg-goos-orange-200', 'bg-goos-orange-300', 'bg-goos-orange-400', 'bg-goos-orange-500',
        'bg-goos-orange-600', 'bg-goos-orange-700', 'bg-goos-orange-800', 'bg-goos-orange-900',
        'bg-goos-green-100', 'bg-goos-green-200', 'bg-goos-green-300', 'bg-goos-green-400', 'bg-goos-green-500',
        'bg-goos-green-600', 'bg-goos-green-700', 'bg-goos-green-800', 'bg-goos-green-900',
        'bg-goos-gray-100', 'bg-goos-gray-200', 'bg-goos-gray-300', 'bg-goos-gray-400', 'bg-goos-gray-500',
        'bg-goos-gray-600', 'bg-goos-gray-700', 'bg-goos-gray-800', 'bg-goos-gray-900',
        'bg-transparent',
      ],
      description: 'Grid background color',
    },
    className: {
      control: 'text',
      description: 'Additional Tailwind classes',
    },
  },
} satisfies Meta<typeof DataCardGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * DataCardGrid - Grid of animated DataCards
 *
 * Features:
 * - **2-column grid** on all screen sizes
 * - **Parallax effect** (alternating speeds)
 * - **Up to 12 cards** maximum
 * - **Animated counters** on each card
 * - **Responsive gaps** (smaller on mobile)
 * - **GSAP ScrollTrigger** parallax animations
 *
 * Use the controls to customize:
 * - Cards array (number, tag, icon, title, colors)
 * - Background color from GOOS palette
 *
 * **Note**: Parallax animations trigger on scroll (limited in Storybook)
 */
export const Default: Story = {
  args: {
    cards: [
      {
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
      {
        number: '3,800',
        tagKey: 'Platforms',
        iconSrc: '/icons/climate.png',
        iconAlt: 'Ocean platform icon',
        titleKey: 'ACTIVE OCEAN PLATFORMS',
        backgroundColor: 'bg-goos-blue-700',
        textColor: 'text-white',
        numberColor: 'text-white',
        tagColor: 'text-white',
        iconBgColor: 'bg-goos-orange-700',
      },
      {
        number: '129',
        tagKey: 'Countries',
        iconSrc: '/icons/operational_services.png',
        iconAlt: 'Global icon',
        titleKey: 'CONTRIBUTING COUNTRIES',
        backgroundColor: 'bg-goos-cyan-700',
        textColor: 'text-white',
        numberColor: 'text-white',
        tagColor: 'text-white',
        iconBgColor: 'bg-goos-blue-600',
      },
      {
        number: '85%',
        tagKey: 'Coverage',
        iconSrc: '/icons/ocean_health.png',
        iconAlt: 'Coverage icon',
        titleKey: 'GLOBAL OCEAN COVERAGE',
        backgroundColor: 'bg-goos-orange-700',
        textColor: 'text-white',
        numberColor: 'text-white',
        tagColor: 'text-white',
        iconBgColor: 'bg-goos-green-700',
      },
    ],
    backgroundColor: 'bg-transparent',
  },
};
