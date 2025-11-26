import type { Meta, StoryObj } from '@storybook/react';
import InsightGrid from '../../../src/components/InsightGrid';

const meta = {
  title: 'Components/InsightGrid',
  component: InsightGrid,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Optional section title',
    },
    hasLine: {
      control: 'boolean',
      description: 'Show decorative line above title',
    },
    lineColor: {
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
      ],
      description: 'Decorative line color',
    },
    insights: {
      control: 'object',
      description: 'Array of insight objects (max 4)',
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
      ],
      description: 'Background color',
    },
    titleColor: {
      control: 'select',
      options: [
        'text-goos-blue-100', 'text-goos-blue-200', 'text-goos-blue-300', 'text-goos-blue-400', 'text-goos-blue-500',
        'text-goos-blue-600', 'text-goos-blue-700', 'text-goos-blue-800', 'text-goos-blue-900',
        'text-goos-cyan-100', 'text-goos-cyan-200', 'text-goos-cyan-300', 'text-goos-cyan-400', 'text-goos-cyan-500',
        'text-goos-cyan-600', 'text-goos-cyan-700', 'text-goos-cyan-800', 'text-goos-cyan-900',
        'text-goos-orange-100', 'text-goos-orange-200', 'text-goos-orange-300', 'text-goos-orange-400', 'text-goos-orange-500',
        'text-goos-orange-600', 'text-goos-orange-700', 'text-goos-orange-800', 'text-goos-orange-900',
        'text-goos-green-100', 'text-goos-green-200', 'text-goos-green-300', 'text-goos-green-400', 'text-goos-green-500',
        'text-goos-green-600', 'text-goos-green-700', 'text-goos-green-800', 'text-goos-green-900',
        'text-goos-gray-100', 'text-goos-gray-200', 'text-goos-gray-300', 'text-goos-gray-400', 'text-goos-gray-500',
        'text-goos-gray-600', 'text-goos-gray-700', 'text-goos-gray-800', 'text-goos-gray-900',
        'text-white',
      ],
      description: 'Title text color',
    },
    textColor: {
      control: 'select',
      options: [
        'text-goos-blue-100', 'text-goos-blue-200', 'text-goos-blue-300', 'text-goos-blue-400', 'text-goos-blue-500',
        'text-goos-blue-600', 'text-goos-blue-700', 'text-goos-blue-800', 'text-goos-blue-900',
        'text-goos-cyan-100', 'text-goos-cyan-200', 'text-goos-cyan-300', 'text-goos-cyan-400', 'text-goos-cyan-500',
        'text-goos-cyan-600', 'text-goos-cyan-700', 'text-goos-cyan-800', 'text-goos-cyan-900',
        'text-goos-orange-100', 'text-goos-orange-200', 'text-goos-orange-300', 'text-goos-orange-400', 'text-goos-orange-500',
        'text-goos-orange-600', 'text-goos-orange-700', 'text-goos-orange-800', 'text-goos-orange-900',
        'text-goos-green-100', 'text-goos-green-200', 'text-goos-green-300', 'text-goos-green-400', 'text-goos-green-500',
        'text-goos-green-600', 'text-goos-green-700', 'text-goos-green-800', 'text-goos-green-900',
        'text-goos-gray-100', 'text-goos-gray-200', 'text-goos-gray-300', 'text-goos-gray-400', 'text-goos-gray-500',
        'text-goos-gray-600', 'text-goos-gray-700', 'text-goos-gray-800', 'text-goos-gray-900',
        'text-white',
      ],
      description: 'Body text color',
    },
    numberColor: {
      control: 'select',
      options: [
        'text-goos-blue-100', 'text-goos-blue-200', 'text-goos-blue-300', 'text-goos-blue-400', 'text-goos-blue-500',
        'text-goos-blue-600', 'text-goos-blue-700', 'text-goos-blue-800', 'text-goos-blue-900',
        'text-goos-cyan-100', 'text-goos-cyan-200', 'text-goos-cyan-300', 'text-goos-cyan-400', 'text-goos-cyan-500',
        'text-goos-cyan-600', 'text-goos-cyan-700', 'text-goos-cyan-800', 'text-goos-cyan-900',
        'text-goos-orange-100', 'text-goos-orange-200', 'text-goos-orange-300', 'text-goos-orange-400', 'text-goos-orange-500',
        'text-goos-orange-600', 'text-goos-orange-700', 'text-goos-orange-800', 'text-goos-orange-900',
        'text-goos-green-100', 'text-goos-green-200', 'text-goos-green-300', 'text-goos-green-400', 'text-goos-green-500',
        'text-goos-green-600', 'text-goos-green-700', 'text-goos-green-800', 'text-goos-green-900',
        'text-goos-gray-100', 'text-goos-gray-200', 'text-goos-gray-300', 'text-goos-gray-400', 'text-goos-gray-500',
        'text-goos-gray-600', 'text-goos-gray-700', 'text-goos-gray-800', 'text-goos-gray-900',
        'text-white',
      ],
      description: 'Number text color',
    },
    linkColor: {
      control: 'select',
      options: [
        'text-goos-blue-100', 'text-goos-blue-200', 'text-goos-blue-300', 'text-goos-blue-400', 'text-goos-blue-500',
        'text-goos-blue-600', 'text-goos-blue-700', 'text-goos-blue-800', 'text-goos-blue-900',
        'text-goos-cyan-100', 'text-goos-cyan-200', 'text-goos-cyan-300', 'text-goos-cyan-400', 'text-goos-cyan-500',
        'text-goos-cyan-600', 'text-goos-cyan-700', 'text-goos-cyan-800', 'text-goos-cyan-900',
        'text-goos-orange-100', 'text-goos-orange-200', 'text-goos-orange-300', 'text-goos-orange-400', 'text-goos-orange-500',
        'text-goos-orange-600', 'text-goos-orange-700', 'text-goos-orange-800', 'text-goos-orange-900',
        'text-goos-green-100', 'text-goos-green-200', 'text-goos-green-300', 'text-goos-green-400', 'text-goos-green-500',
        'text-goos-green-600', 'text-goos-green-700', 'text-goos-green-800', 'text-goos-green-900',
        'text-goos-gray-100', 'text-goos-gray-200', 'text-goos-gray-300', 'text-goos-gray-400', 'text-goos-gray-500',
        'text-goos-gray-600', 'text-goos-gray-700', 'text-goos-gray-800', 'text-goos-gray-900',
        'text-white',
      ],
      description: 'Link text color',
    },
    className: {
      control: 'text',
      description: 'Additional Tailwind classes',
    },
  },
} satisfies Meta<typeof InsightGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * InsightGrid - Insights/statistics grid
 *
 * Features:
 * - **Flexible layout**: 1-4 insights (adaptive columns)
 * - **Optional title** with decorative line
 * - **Large numbers** with descriptions
 * - **External links** with icon
 * - **Responsive** layout (stacks on mobile)
 * - **GOOS color palette** support
 *
 * Use the controls to customize:
 * - Title and decorative line
 * - Insights data (number, description, links)
 * - All colors from GOOS palette
 */
export const Default: Story = {
  args: {
    title: 'Global Ocean Monitoring',
    hasLine: true,
    lineColor: 'bg-goos-orange-500',
    insights: [
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
    ],
    backgroundColor: 'bg-goos-blue-700',
    titleColor: 'text-white',
    textColor: 'text-white',
    numberColor: 'text-white',
    linkColor: 'text-white',
  },
};
