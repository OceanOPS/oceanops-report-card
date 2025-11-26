import type { Meta, StoryObj } from '@storybook/react';
import Spacer from '../../src/components/Spacer';

const meta = {
  title: 'Utility/Spacer',
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
      control: 'text',
      description: 'Tailwind background color class',
    },
    className: {
      control: 'text',
      description: 'Optional additional Tailwind classes',
    },
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
 * Extra small spacing - 4px to 16px responsive
 */
export const ExtraSmall: Story = {
  args: {
    size: 'xs',
  },
};

/**
 * Small spacing - 8px to 32px responsive
 */
export const Small: Story = {
  args: {
    size: 'sm',
  },
};

/**
 * Medium spacing - 12px to 64px responsive (default)
 */
export const Medium: Story = {
  args: {
    size: 'md',
  },
};

/**
 * Large spacing - 16px to 96px responsive
 */
export const Large: Story = {
  args: {
    size: 'lg',
  },
};

/**
 * Extra large spacing - 24px to 128px responsive
 */
export const ExtraLarge: Story = {
  args: {
    size: 'xl',
  },
};

/**
 * 2X Large spacing - 32px to 160px responsive
 */
export const TwoExtraLarge: Story = {
  args: {
    size: '2xl',
  },
};

/**
 * Custom height with pixels
 */
export const CustomPixels: Story = {
  args: {
    height: '100px',
  },
};

/**
 * Custom height with Tailwind class
 */
export const CustomTailwind: Story = {
  args: {
    height: 'h-32',
  },
};

/**
 * With background color to match surrounding modules
 */
export const WithBackground: Story = {
  args: {
    size: 'lg',
    backgroundColor: 'bg-goos-blue-700',
  },
};

/**
 * All sizes comparison - shows visual difference between all preset sizes
 */
export const AllSizes: Story = {
  render: () => (
    <div className="p-4">
      <div className="space-y-8">
        <div>
          <p className="text-sm mb-2 font-semibold">XS (4-16px)</p>
          <div className="bg-blue-100 p-2">Section 1</div>
          <Spacer size="xs" backgroundColor="bg-red-200" />
          <div className="bg-blue-100 p-2">Section 2</div>
        </div>

        <div>
          <p className="text-sm mb-2 font-semibold">SM (8-32px)</p>
          <div className="bg-blue-100 p-2">Section 1</div>
          <Spacer size="sm" backgroundColor="bg-red-200" />
          <div className="bg-blue-100 p-2">Section 2</div>
        </div>

        <div>
          <p className="text-sm mb-2 font-semibold">MD (12-64px)</p>
          <div className="bg-blue-100 p-2">Section 1</div>
          <Spacer size="md" backgroundColor="bg-red-200" />
          <div className="bg-blue-100 p-2">Section 2</div>
        </div>

        <div>
          <p className="text-sm mb-2 font-semibold">LG (16-96px)</p>
          <div className="bg-blue-100 p-2">Section 1</div>
          <Spacer size="lg" backgroundColor="bg-red-200" />
          <div className="bg-blue-100 p-2">Section 2</div>
        </div>

        <div>
          <p className="text-sm mb-2 font-semibold">XL (24-128px)</p>
          <div className="bg-blue-100 p-2">Section 1</div>
          <Spacer size="xl" backgroundColor="bg-red-200" />
          <div className="bg-blue-100 p-2">Section 2</div>
        </div>

        <div>
          <p className="text-sm mb-2 font-semibold">2XL (32-160px)</p>
          <div className="bg-blue-100 p-2">Section 1</div>
          <Spacer size="2xl" backgroundColor="bg-red-200" />
          <div className="bg-blue-100 p-2">Section 2</div>
        </div>
      </div>
    </div>
  ),
};
