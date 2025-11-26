import type { Meta, StoryObj } from '@storybook/react';
import GoosLogo from '../../src/components/GoosLogo';

const meta = {
  title: 'Utility/GoosLogo',
  component: GoosLogo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['white', 'color'],
      description: 'Logo color variant',
    },
    url: {
      control: 'text',
      description: 'Optional external URL to link to',
    },
    className: {
      control: 'text',
      description: 'Optional Tailwind classes for custom styling',
    },
  },
} satisfies Meta<typeof GoosLogo>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * White logo variant - ideal for dark backgrounds
 */
export const WhiteLogo: Story = {
  args: {
    variant: 'white',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

/**
 * Color logo variant - ideal for light backgrounds
 */
export const ColorLogo: Story = {
  args: {
    variant: 'color',
  },
};

/**
 * Logo with external link - clickable and opens in new tab
 */
export const WithLink: Story = {
  args: {
    variant: 'color',
    url: 'https://goosocean.org/',
  },
};

/**
 * Custom size using className
 */
export const CustomSize: Story = {
  args: {
    variant: 'color',
    className: 'h-40',
  },
};

/**
 * Small size
 */
export const Small: Story = {
  args: {
    variant: 'color',
    className: 'h-12',
  },
};
