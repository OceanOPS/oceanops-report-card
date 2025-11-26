import type { Meta, StoryObj } from '@storybook/react';
import Tooltip from '../../src/components/Tooltip';

const meta = {
  title: 'Components/Tooltip',
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
      control: 'select',
      options: [
        'bg-goos-blue-900', 'bg-goos-blue-800', 'bg-goos-blue-700', 'bg-goos-blue-600', 'bg-goos-blue-500', 'bg-goos-blue-400', 'bg-goos-blue-300', 'bg-goos-blue-200', 'bg-goos-blue-100',
        'bg-goos-cyan-900', 'bg-goos-cyan-800', 'bg-goos-cyan-700', 'bg-goos-cyan-600', 'bg-goos-cyan-500', 'bg-goos-cyan-400', 'bg-goos-cyan-300', 'bg-goos-cyan-200', 'bg-goos-cyan-100',
        'bg-goos-orange-900', 'bg-goos-orange-800', 'bg-goos-orange-700', 'bg-goos-orange-600', 'bg-goos-orange-500', 'bg-goos-orange-400', 'bg-goos-orange-300', 'bg-goos-orange-200', 'bg-goos-orange-100',
        'bg-goos-green-900', 'bg-goos-green-800', 'bg-goos-green-700', 'bg-goos-green-600', 'bg-goos-green-500', 'bg-goos-green-400', 'bg-goos-green-300', 'bg-goos-green-200', 'bg-goos-green-100',
        'bg-goos-gray-900', 'bg-goos-gray-800', 'bg-goos-gray-700', 'bg-goos-gray-600', 'bg-goos-gray-500', 'bg-goos-gray-400', 'bg-goos-gray-300', 'bg-goos-gray-200', 'bg-goos-gray-100',
      ],
      description: 'GOOS color palette for tooltip background',
    },
    textColor: {
      control: 'select',
      options: [
        'text-white',
        'text-goos-blue-900', 'text-goos-blue-800', 'text-goos-blue-700', 'text-goos-blue-600', 'text-goos-blue-500', 'text-goos-blue-400', 'text-goos-blue-300', 'text-goos-blue-200', 'text-goos-blue-100',
        'text-goos-cyan-900', 'text-goos-cyan-800', 'text-goos-cyan-700', 'text-goos-cyan-600', 'text-goos-cyan-500', 'text-goos-cyan-400', 'text-goos-cyan-300', 'text-goos-cyan-200', 'text-goos-cyan-100',
        'text-goos-orange-900', 'text-goos-orange-800', 'text-goos-orange-700', 'text-goos-orange-600', 'text-goos-orange-500', 'text-goos-orange-400', 'text-goos-orange-300', 'text-goos-orange-200', 'text-goos-orange-100',
        'text-goos-green-900', 'text-goos-green-800', 'text-goos-green-700', 'text-goos-green-600', 'text-goos-green-500', 'text-goos-green-400', 'text-goos-green-300', 'text-goos-green-200', 'text-goos-green-100',
        'text-goos-gray-900', 'text-goos-gray-800', 'text-goos-gray-700', 'text-goos-gray-600', 'text-goos-gray-500', 'text-goos-gray-400', 'text-goos-gray-300', 'text-goos-gray-200', 'text-goos-gray-100',
      ],
      description: 'Text color (usually white for dark backgrounds)',
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
  args: {
    content: 'Climate',
    backgroundColor: 'bg-goos-blue-900',
    textColor: 'text-white',
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default Tooltip
 *
 * Tooltips follow the cursor on hover and are commonly used for:
 * - **GOOS Delivery Area icons**: Climate, Operational Services, Ocean Health
 * - **Acronyms and abbreviations**: Expand terms like "GOOS" on hover
 *
 * Use the controls below to customize:
 * - **content**: Tooltip text
 * - **backgroundColor**: GOOS background color
 * - **textColor**: Text color (usually white for dark backgrounds)
 *
 * Hover over the icon to see the tooltip.
 */
export const Default: Story = {
  args: {
    content: 'Climate',
    backgroundColor: 'bg-goos-blue-900',
    textColor: 'text-white',
    children: (
      <div className="w-14 h-14 bg-goos-cyan-200 rounded-full flex items-center justify-center cursor-pointer transition-transform hover:scale-110">
        <span className="text-2xl">🌊</span>
      </div>
    ),
  },
};
