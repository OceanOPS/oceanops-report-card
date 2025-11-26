import type { Meta, StoryObj } from '@storybook/react';
import ContentBox from '../../../src/components/ContentBox';

const meta = {
  title: 'Components/ContentBox',
  component: ContentBox,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    titleKey: {
      control: 'text',
      description: 'Title text (or translation key)',
    },
    backgroundColor: {
      control: 'select',
      options: [
        'bg-goos-blue-900', 'bg-goos-blue-800', 'bg-goos-blue-700',
        'bg-goos-cyan-700', 'bg-goos-orange-700', 'bg-goos-green-700',
      ],
      description: 'Box background color',
    },
    textColor: {
      control: 'select',
      options: ['text-white', 'text-goos-gray-100', 'text-goos-blue-900'],
      description: 'Content text color',
    },
    titleColor: {
      control: 'select',
      options: ['text-white', 'text-goos-gray-100', 'text-goos-orange-500'],
      description: 'Title text color',
    },
    padding: {
      control: 'select',
      options: ['p-4', 'p-6', 'p-8', 'p-10', 'p-12'],
      description: 'Box padding',
    },
    collapsible: {
      control: 'boolean',
      description: 'Make box collapsible (accordion)',
    },
    defaultCollapsed: {
      control: 'boolean',
      description: 'Start collapsed (if collapsible)',
    },
    buttonTextColor: {
      control: 'select',
      options: ['text-white', 'text-goos-blue-900'],
      description: 'Button text color',
    },
    buttonBgColor: {
      control: 'select',
      options: ['bg-goos-blue-900', 'bg-goos-blue-800', 'bg-goos-cyan-700'],
      description: 'Button background color',
    },
    buttonIconColor: {
      control: 'select',
      options: ['text-white', 'text-goos-orange-500'],
      description: 'Plus/minus icon color',
    },
    buttonIconBgColor: {
      control: 'select',
      options: ['bg-goos-blue-700', 'bg-goos-orange-500', 'bg-white'],
      description: 'Icon circle background',
    },
    buttonLeftBorderColor: {
      control: 'select',
      options: ['', 'border-goos-orange-500', 'border-goos-blue-700', 'border-goos-cyan-500'],
      description: 'Left border color (optional accent)',
    },
  },
} satisfies Meta<typeof ContentBox>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * ContentBox - Flexible content container
 *
 * Two modes:
 * - **Regular**: Simple content box with optional title
 * - **Collapsible**: Accordion-style with expand/collapse button
 *
 * Features:
 * - **Customizable colors** from GOOS palette
 * - **Flexible padding** options
 * - **Optional left border** accent
 * - **Smooth animations** for collapse/expand
 * - **Plus/minus icon** with circular background
 *
 * Use the controls to customize:
 * - Collapsible mode
 * - All colors and padding
 * - Border accents
 */
export const Default: Story = {
  args: {
    titleKey: 'Content Box Title',
    backgroundColor: 'bg-goos-blue-800',
    textColor: 'text-white',
    titleColor: 'text-white',
    padding: 'p-8',
    collapsible: false,
    children: (
      <div>
        <p className="mb-4">This is a regular content box with some example content.</p>
        <p>It can contain any React children components.</p>
      </div>
    ),
  },
};

/**
 * Collapsible variant - "Learn More" accordion style
 */
export const Collapsible: Story = {
  args: {
    titleKey: 'LEARN MORE',
    backgroundColor: 'bg-goos-blue-800',
    textColor: 'text-white',
    padding: 'p-8',
    collapsible: true,
    defaultCollapsed: true,
    buttonTextColor: 'text-white',
    buttonBgColor: 'bg-goos-blue-900',
    buttonIconColor: 'text-white',
    buttonIconBgColor: 'bg-goos-blue-700',
    buttonLeftBorderColor: 'border-goos-orange-500',
    children: (
      <div className="space-y-4">
        <p>Hidden content that reveals when clicking the button.</p>
        <p>Perfect for "Learn More" sections or additional details.</p>
        <ul className="list-disc list-inside space-y-2">
          <li>Smooth expand/collapse animations</li>
          <li>Customizable colors and styling</li>
          <li>Left border accent option</li>
        </ul>
      </div>
    ),
  },
};
