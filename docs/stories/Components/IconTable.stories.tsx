import type { Meta, StoryObj } from '@storybook/react';
import IconTable from '../../../src/components/IconTable';

const meta = {
  title: 'Components/Data/IconTable',
  component: IconTable,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
Table with icons and legends for visual data representation.

## Figma Design

<iframe
  style="border: 1px solid rgba(0, 0, 0, 0.1); border-radius: 8px; margin-top: 20px; margin-bottom: 20px;"
  width="100%"
  height="450"
  src="https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/design/JdNQkdV9E6lLtXAY15GM1L/Goos-Report-Card?node-id=2193-13399"
  allowfullscreen
></iframe>

**[→ Open in Figma](https://www.figma.com/design/JdNQkdV9E6lLtXAY15GM1L/Goos-Report-Card?node-id=2193-13399&t=lyDcrmhzDWxp62H7-4)**
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    columns: {
      control: 'select',
      options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      description: 'Number of columns (1-12)',
    },
    headers: {
      control: 'object',
      description: 'Array of header texts (length should match columns)',
    },
    rows: {
      control: 'object',
      description: 'Array of row data, each row contains IconTableCell objects',
    },
    borderColor: {
      control: 'select',
      options: [
        'border-goos-blue-100', 'border-goos-blue-200', 'border-goos-blue-300', 'border-goos-blue-400', 'border-goos-blue-500',
        'border-goos-blue-600', 'border-goos-blue-700', 'border-goos-blue-800', 'border-goos-blue-900',
        'border-goos-cyan-100', 'border-goos-cyan-200', 'border-goos-cyan-300', 'border-goos-cyan-400', 'border-goos-cyan-500',
        'border-goos-cyan-600', 'border-goos-cyan-700', 'border-goos-cyan-800', 'border-goos-cyan-900',
        'border-goos-orange-100', 'border-goos-orange-200', 'border-goos-orange-300', 'border-goos-orange-400', 'border-goos-orange-500',
        'border-goos-orange-600', 'border-goos-orange-700', 'border-goos-orange-800', 'border-goos-orange-900',
        'border-goos-green-100', 'border-goos-green-200', 'border-goos-green-300', 'border-goos-green-400', 'border-goos-green-500',
        'border-goos-green-600', 'border-goos-green-700', 'border-goos-green-800', 'border-goos-green-900',
        'border-goos-gray-100', 'border-goos-gray-200', 'border-goos-gray-300', 'border-goos-gray-400', 'border-goos-gray-500',
        'border-goos-gray-600', 'border-goos-gray-700', 'border-goos-gray-800', 'border-goos-gray-900',
      ],
      description: 'Border color',
    },
    headerBgColor: {
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
      description: 'Header background color',
    },
    headerTextColor: {
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
      description: 'Header text color',
    },
    rowBgColor: {
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
      description: 'Row background color',
    },
    rowTextColor: {
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
      description: 'Row text color',
    },
    className: {
      control: 'text',
      description: 'Additional Tailwind classes',
    },
  },
} satisfies Meta<typeof IconTable>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * IconTable - Table with icons and legends
 *
 * Features:
 * - **Configurable columns** (1-12)
 * - **Icon support** with customizable sizes
 * - **Text legends** below icons
 * - **Mixed content** (icon + legend OR text only)
 * - **Animated entrance** with GSAP pop-up effect
 * - **Customizable colors** from GOOS palette
 *
 * Use the controls to customize:
 * - Number of columns
 * - Headers and rows data
 * - All colors from GOOS palette
 *
 * **Note**: Animations trigger on scroll (disabled in Storybook)
 */
export const Default: Story = {
  args: {
    columns: 3,
    headers: ['Platform', 'Type', 'Coverage'],
    rows: [
      [
        { icon: '/icons/biology_and_ecosystems/Fish.png', iconSize: 'w-12 h-12', legend: 'Argo Float' },
        { legend: 'Autonomous' },
        { legend: 'Global' },
      ],
      [
        { icon: '/icons/climate.png', iconSize: 'w-12 h-12', legend: 'Mooring' },
        { legend: 'Fixed' },
        { legend: 'Regional' },
      ],
      [
        { icon: '/icons/operational_services.png', iconSize: 'w-12 h-12', legend: 'Glider' },
        { legend: 'Autonomous' },
        { legend: 'Coastal' },
      ],
    ],
    borderColor: 'border-goos-blue-700',
    headerBgColor: 'bg-gray-100',
    headerTextColor: 'text-goos-blue-700',
    rowBgColor: 'bg-gray-100',
    rowTextColor: 'text-goos-blue-700',
  },
};
