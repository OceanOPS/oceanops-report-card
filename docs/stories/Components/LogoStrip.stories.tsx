import type { Meta, StoryObj } from '@storybook/react';
import LogoStrip from '../../../src/components/LogoStrip';

const meta = {
  title: '05. Components/Utility/LogoStrip',
  component: LogoStrip,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    logos: {
      control: 'object',
      description: 'Array of logo objects with src, altKey, and url',
    },
    backgroundColor: {
      control: 'select',
      options: [
        'bg-goos-blue-100', 'bg-goos-blue-200', 'bg-goos-blue-300', 'bg-goos-blue-700', 'bg-goos-blue-800', 'bg-goos-blue-900',
        'bg-goos-cyan-100', 'bg-goos-cyan-200', 'bg-goos-cyan-700',
        'bg-goos-orange-100', 'bg-goos-orange-200', 'bg-goos-orange-700',
        'bg-goos-green-100', 'bg-goos-green-700',
        'bg-goos-gray-100', 'bg-goos-gray-200', 'bg-goos-gray-700',
        'bg-white',
      ],
      description: 'Background color',
    },
    className: {
      control: 'text',
      description: 'Additional Tailwind classes',
    },
  },
} satisfies Meta<typeof LogoStrip>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * LogoStrip - Horizontal logo strip
 *
 * Features:
 * - **Full viewport width** (edge-to-edge)
 * - **Clickable logos** (open in new tab)
 * - **Responsive sizing** (adapts to screen size)
 * - **Single horizontal row** (no wrapping)
 * - **Hover effects** (opacity transition)
 * - **i18n support** for alt text
 *
 * Use the controls to customize:
 * - Logos array (src, altKey, url)
 * - Background color from GOOS palette
 */
export const Default: Story = {
  args: {
    logos: [
      { src: '/icons/climate.png', altKey: 'Climate', url: 'https://www.goosocean.org' },
      { src: '/icons/operational_services.png', altKey: 'Operational Services', url: 'https://www.goosocean.org' },
      { src: '/icons/ocean_health.png', altKey: 'Ocean Health', url: 'https://www.goosocean.org' },
      { src: '/icons/biology_and_ecosystems/Fish.png', altKey: 'Biology', url: 'https://www.goosocean.org' },
    ],
    backgroundColor: 'bg-white',
  },
};

/**
 * Dark background variant
 */
export const DarkBackground: Story = {
  args: {
    logos: [
      { src: '/icons/climate.png', altKey: 'Climate', url: 'https://www.goosocean.org' },
      { src: '/icons/operational_services.png', altKey: 'Operational Services', url: 'https://www.goosocean.org' },
      { src: '/icons/ocean_health.png', altKey: 'Ocean Health', url: 'https://www.goosocean.org' },
      { src: '/icons/biology_and_ecosystems/Fish.png', altKey: 'Biology', url: 'https://www.goosocean.org' },
    ],
    backgroundColor: 'bg-goos-blue-900',
  },
};
