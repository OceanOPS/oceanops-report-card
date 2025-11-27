import type { Meta, StoryObj } from '@storybook/react';
import Spacer from '../../../src/components/Spacer';

const meta = {
  title: '05. Components/Utility/Spacer',
  component: Spacer,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Preset size for vertical spacing',
    },
    height: {
      control: 'text',
      description: 'Custom height (pixels or Tailwind class)',
    },
    backgroundColor: {
      control: 'select',
      options: [
        'transparent',
        'bg-goos-blue-900', 'bg-goos-blue-800', 'bg-goos-blue-700', 'bg-goos-blue-600', 'bg-goos-blue-500', 'bg-goos-blue-400', 'bg-goos-blue-300', 'bg-goos-blue-200', 'bg-goos-blue-100',
        'bg-goos-cyan-900', 'bg-goos-cyan-800', 'bg-goos-cyan-700', 'bg-goos-cyan-600', 'bg-goos-cyan-500', 'bg-goos-cyan-400', 'bg-goos-cyan-300', 'bg-goos-cyan-200', 'bg-goos-cyan-100',
        'bg-goos-orange-900', 'bg-goos-orange-800', 'bg-goos-orange-700', 'bg-goos-orange-600', 'bg-goos-orange-500', 'bg-goos-orange-400', 'bg-goos-orange-300', 'bg-goos-orange-200', 'bg-goos-orange-100',
        'bg-goos-green-900', 'bg-goos-green-800', 'bg-goos-green-700', 'bg-goos-green-600', 'bg-goos-green-500', 'bg-goos-green-400', 'bg-goos-green-300', 'bg-goos-green-200', 'bg-goos-green-100',
        'bg-goos-gray-900', 'bg-goos-gray-800', 'bg-goos-gray-700', 'bg-goos-gray-600', 'bg-goos-gray-500', 'bg-goos-gray-400', 'bg-goos-gray-300', 'bg-goos-gray-200', 'bg-goos-gray-100',
      ],
      description: 'GOOS background color (use lighter shades for dividers)',
    },
    className: {
      control: 'text',
      description: 'Optional additional Tailwind classes',
    },
  },
  args: {
    size: 'md',
  },
  decorators: [
    (Story) => (
      <div>
        <div className="bg-blue-100 p-4">Section Above</div>
        <Story />
        <div className="bg-blue-100 p-4">Section Below</div>
      </div>
    ),
  ],
} satisfies Meta<typeof Spacer>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default Spacer
 *
 * Creates vertical spacing between sections.
 *
 * Use the controls below to:
 * - Select preset size: xs, sm, md, lg, xl, 2xl (responsive spacing)
 * - Set custom height: '100px' or 'h-32'
 * - Add background color: 'bg-goos-blue-700'
 * - Add custom classes with className
 *
 * Preset sizes (mobile → desktop):
 * - xs: 4px → 16px
 * - sm: 8px → 32px
 * - md: 12px → 64px (default)
 * - lg: 16px → 96px
 * - xl: 24px → 128px
 * - 2xl: 32px → 160px
 */
export const Default: Story = {
  args: {
    size: 'md',
  },
};
