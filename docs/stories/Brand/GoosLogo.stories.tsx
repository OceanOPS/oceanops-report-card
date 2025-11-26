import type { Meta, StoryObj } from '@storybook/react';
import GoosLogo from '../../../src/components/GoosLogo';

const meta = {
  title: 'Brand/GoosLogo',
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
      description: 'Optional additional Tailwind classes (e.g., margins, borders)',
    },
  },
  args: {
    variant: 'color',
  },
} satisfies Meta<typeof GoosLogo>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default GOOS Logo
 *
 * The logo has fixed responsive heights (h-16 on mobile → h-28 on desktop).
 *
 * Use the controls below to:
 * - **variant**: Switch between white and color versions
 * - **url**: Add an optional URL to make it clickable
 * - **className**: Add additional styling (margins, borders, etc.)
 */
export const Default: Story = {
  args: {
    variant: 'color',
  },
};
