import type { Meta, StoryObj } from '@storybook/react';
import Tooltip from '../../src/components/Tooltip';

const meta = {
  title: 'Utility/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    content: {
      control: 'text',
      description: 'Tooltip text content (can be translation key)',
    },
    backgroundColor: {
      control: 'text',
      description: 'Tailwind background color class',
    },
    textColor: {
      control: 'text',
      description: 'Tailwind text color class',
    },
    allowHtml: {
      control: 'boolean',
      description: 'Allow HTML content with clickable links',
    },
    className: {
      control: 'text',
      description: 'Optional additional Tailwind classes',
    },
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Basic tooltip - follows cursor on hover
 */
export const Basic: Story = {
  args: {
    content: 'This is a basic tooltip that follows your cursor',
    children: (
      <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Hover over me
      </button>
    ),
  },
};

/**
 * Tooltip on icon - common use case for delivery area icons
 */
export const OnIcon: Story = {
  args: {
    content: 'Climate Delivery Area',
    children: (
      <div className="w-12 h-12 bg-goos-cyan-200 rounded-full flex items-center justify-center cursor-pointer">
        <svg className="w-6 h-6 text-goos-blue-700" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9v-2h2v2zm0-4H9V5h2v4z" />
        </svg>
      </div>
    ),
  },
};

/**
 * Custom colors - orange tooltip
 */
export const CustomColors: Story = {
  args: {
    content: 'Custom styled tooltip with orange background',
    backgroundColor: 'bg-goos-orange-500',
    textColor: 'text-white',
    children: (
      <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded">
        Custom colored tooltip
      </button>
    ),
  },
};

/**
 * Blue tooltip variant
 */
export const BlueTooltip: Story = {
  args: {
    content: 'This tooltip has a blue background',
    backgroundColor: 'bg-goos-blue-700',
    textColor: 'text-white',
    children: (
      <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded">
        Blue tooltip
      </button>
    ),
  },
};

/**
 * Long text - automatically wraps at max-width
 */
export const LongText: Story = {
  args: {
    content: 'This is a much longer tooltip text that will automatically wrap when it reaches the maximum width of 300 pixels. It ensures readability even with longer descriptions.',
    children: (
      <button className="px-4 py-2 bg-blue-500 text-white rounded">
        Long text tooltip
      </button>
    ),
  },
};

/**
 * With HTML content - allows clickable links
 */
export const WithHtmlLinks: Story = {
  args: {
    content: 'Visit our website at https://goosocean.org for more information',
    allowHtml: true,
    children: (
      <button className="px-4 py-2 bg-green-500 text-white rounded">
        Tooltip with link
      </button>
    ),
  },
};

/**
 * Multiple tooltips - showing different use cases together
 */
export const MultipleTooltips: Story = {
  render: () => (
    <div className="flex gap-4 items-center flex-wrap">
      <Tooltip content="Operational Services">
        <div className="w-14 h-14 bg-goos-cyan-200 rounded-full flex items-center justify-center cursor-pointer transition-transform hover:scale-110">
          <span className="text-2xl">🌊</span>
        </div>
      </Tooltip>

      <Tooltip content="Climate Monitoring" backgroundColor="bg-goos-orange-500">
        <div className="w-14 h-14 bg-goos-orange-200 rounded-full flex items-center justify-center cursor-pointer transition-transform hover:scale-110">
          <span className="text-2xl">🌡️</span>
        </div>
      </Tooltip>

      <Tooltip content="Ocean Health" backgroundColor="bg-goos-green-700">
        <div className="w-14 h-14 bg-goos-green-200 rounded-full flex items-center justify-center cursor-pointer transition-transform hover:scale-110">
          <span className="text-2xl">🐠</span>
        </div>
      </Tooltip>
    </div>
  ),
};

/**
 * On text - tooltip can wrap any element
 */
export const OnText: Story = {
  args: {
    content: 'Global Ocean Observing System',
    children: (
      <span className="text-blue-600 underline cursor-help">
        GOOS
      </span>
    ),
  },
};
