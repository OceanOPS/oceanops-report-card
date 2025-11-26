import type { Meta, StoryObj } from '@storybook/react';
import PartnerLogos from '../../src/components/PartnerLogos';

const meta = {
  title: 'Utility/PartnerLogos',
  component: PartnerLogos,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['white', 'color'],
      description: 'Logo color variant',
    },
    className: {
      control: 'text',
      description: 'Optional Tailwind classes for custom styling',
    },
  },
} satisfies Meta<typeof PartnerLogos>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * White logos variant - ideal for dark backgrounds.
 * Shows UNESCO IOC, WMO, UN Environment, ISC on the left,
 * and OceanOPS with "Powered by" label on the right.
 */
export const WhiteLogos: Story = {
  args: {
    variant: 'white',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

/**
 * Color logos variant - ideal for light backgrounds.
 */
export const ColorLogos: Story = {
  args: {
    variant: 'color',
  },
};

/**
 * With custom gap spacing between logos
 */
export const CustomSpacing: Story = {
  args: {
    variant: 'color',
    className: 'gap-8',
  },
};
