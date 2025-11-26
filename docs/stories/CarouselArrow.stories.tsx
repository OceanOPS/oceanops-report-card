import type { Meta, StoryObj } from '@storybook/react';
import CarouselArrow from '../../src/components/CarouselArrow';
import { fn } from '@storybook/test';

const meta = {
  title: 'Utility/CarouselArrow',
  component: CarouselArrow,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    direction: {
      control: 'select',
      options: ['left', 'right'],
      description: 'Arrow direction',
    },
    color: {
      control: 'color',
      description: 'Fill color for the arrow',
    },
    className: {
      control: 'text',
      description: 'Optional additional Tailwind classes',
    },
  },
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof CarouselArrow>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Left arrow - for previous navigation
 */
export const LeftArrow: Story = {
  args: {
    direction: 'left',
  },
};

/**
 * Right arrow - for next navigation
 */
export const RightArrow: Story = {
  args: {
    direction: 'right',
  },
};

/**
 * Orange arrow - matches GOOS brand color
 */
export const OrangeArrow: Story = {
  args: {
    direction: 'right',
    color: '#F48B25',
  },
};

/**
 * Blue arrow - for blue themed carousels
 */
export const BlueArrow: Story = {
  args: {
    direction: 'right',
    color: '#184596',
  },
};

/**
 * White arrow - for dark backgrounds
 */
export const WhiteArrow: Story = {
  args: {
    direction: 'right',
    color: '#FFFFFF',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

/**
 * Carousel navigation pair - shows both arrows together
 */
export const NavigationPair: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <CarouselArrow direction="left" onClick={() => console.log('Previous')} />
      <div className="px-8 py-4 bg-gray-100 rounded">Content Area</div>
      <CarouselArrow direction="right" onClick={() => console.log('Next')} />
    </div>
  ),
};

/**
 * With custom styling - positioned absolutely
 */
export const PositionedArrows: Story = {
  render: () => (
    <div className="relative w-96 h-64 bg-gradient-to-r from-blue-500 to-blue-700 rounded-lg flex items-center justify-center">
      <p className="text-white text-xl font-bold">Carousel Slide</p>

      <CarouselArrow
        direction="left"
        color="#FFFFFF"
        className="absolute left-4 top-1/2 -translate-y-1/2"
        onClick={() => console.log('Previous')}
      />

      <CarouselArrow
        direction="right"
        color="#FFFFFF"
        className="absolute right-4 top-1/2 -translate-y-1/2"
        onClick={() => console.log('Next')}
      />
    </div>
  ),
};

/**
 * Different colors - showing color customization
 */
export const ColorVariants: Story = {
  render: () => (
    <div className="flex gap-8 items-center">
      <div className="text-center">
        <CarouselArrow direction="right" color="#F48B25" />
        <p className="text-xs mt-2">Orange</p>
      </div>
      <div className="text-center">
        <CarouselArrow direction="right" color="#184596" />
        <p className="text-xs mt-2">Blue</p>
      </div>
      <div className="text-center">
        <CarouselArrow direction="right" color="#189669" />
        <p className="text-xs mt-2">Green</p>
      </div>
      <div className="text-center">
        <CarouselArrow direction="right" color="#157FD2" />
        <p className="text-xs mt-2">Cyan</p>
      </div>
      <div className="text-center">
        <CarouselArrow direction="right" color="#333333" />
        <p className="text-xs mt-2">Gray</p>
      </div>
    </div>
  ),
};

/**
 * Keyboard accessible - can be navigated with Tab and activated with Enter/Space
 */
export const KeyboardAccessible: Story = {
  args: {
    direction: 'right',
  },
  parameters: {
    docs: {
      description: {
        story: 'This arrow is fully keyboard accessible. Use Tab to focus and Enter or Space to activate.',
      },
    },
  },
};
