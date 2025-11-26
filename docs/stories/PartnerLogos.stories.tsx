import type { Meta, StoryObj } from '@storybook/react';
import PartnerLogos from '../../src/components/PartnerLogos';

const meta = {
  title: 'Brand/PartnerLogos',
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
  args: {
    variant: 'color',
  },
} satisfies Meta<typeof PartnerLogos>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default Partner Logos
 *
 * Shows UNESCO IOC, WMO, UN Environment, ISC on the left,
 * and OceanOPS with "Powered by" label on the right.
 *
 * Use the controls below to:
 * - Switch between white and color variants
 * - Customize spacing with className (e.g., 'gap-8', 'gap-12')
 */
export const Default: Story = {
  args: {
    variant: 'color',
  },
};
