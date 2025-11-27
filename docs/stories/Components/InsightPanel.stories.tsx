import type { Meta, StoryObj } from '@storybook/react';
import InsightPanel from '../../../src/components/InsightPanel';

const meta = {
  title: '05. Components/Data/InsightPanel',
  component: InsightPanel,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
Featured stat panel with large number and supporting statistics.

## Figma Design

<iframe
  style="border: 1px solid rgba(0, 0, 0, 0.1); border-radius: 8px; margin-top: 20px; margin-bottom: 20px;"
  width="100%"
  height="450"
  src="https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/design/JdNQkdV9E6lLtXAY15GM1L/Goos-Report-Card?node-id=1631-2091"
  allowfullscreen
></iframe>

**[→ Open in Figma](https://www.figma.com/design/JdNQkdV9E6lLtXAY15GM1L/Goos-Report-Card?node-id=1631-2091&t=lyDcrmhzDWxp62H7-4)**
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Panel title (optional)',
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
    largeNumber: {
      control: 'text',
      description: 'Main featured number',
    },
    largeNumberDescription: {
      control: 'text',
      description: 'Description below number',
    },
    backgroundColor: {
      control: 'select',
      options: [
        'bg-goos-blue-900', 'bg-goos-blue-800', 'bg-goos-blue-700', 'bg-goos-blue-600',
        'bg-goos-cyan-700', 'bg-goos-green-700', 'bg-goos-orange-700',
      ],
      description: 'Panel background color',
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
      options: ['text-white', 'text-goos-orange-500', 'text-goos-cyan-500'],
      description: 'Number text color',
    },
    linkColor: {
      control: 'select',
      options: ['text-white', 'text-goos-cyan-300'],
      description: 'Link text color',
    },
  },
} satisfies Meta<typeof InsightPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * InsightPanel - Large featured number with stats grid
 *
 * Two-column layout:
 * - **Left**: Large number, description, optional button
 * - **Right**: 2x2 grid of statistics OR custom content
 *
 * Features:
 * - **Animated counters** for all numbers
 * - **Optional decorative line** above title
 * - **Links** with external link icon
 * - **Info modals** for additional details
 * - **Button** with video/modal/link support
 *
 * Use the controls to customize:
 * - Title and numbers
 * - All colors from GOOS palette
 * - Decorative line
 *
 * **Note**: Animations trigger on scroll (disabled in Storybook)
 */
export const Default: Story = {
  args: {
    title: 'Global Ocean Observing',
    hasLine: true,
    lineColor: 'bg-goos-orange-500',
    largeNumber: '129',
    largeNumberDescription: 'Countries contributing to ocean observations',
    stats: [
      {
        number: '$45M',
        description: 'Annual investment in ocean monitoring',
        linkText: 'View details',
        linkUrl: 'https://www.goosocean.org',
      },
      {
        number: '3,800',
        description: 'Active ocean observing platforms',
      },
      {
        number: '85%',
        description: 'Global ocean coverage achieved',
      },
      {
        number: '12',
        description: 'International partnerships',
      },
    ],
    backgroundColor: 'bg-goos-blue-700',
    titleColor: 'text-white',
    textColor: 'text-white',
    numberColor: 'text-white',
    linkColor: 'text-white',
  },
};
